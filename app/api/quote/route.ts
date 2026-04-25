import { NextResponse } from "next/server";

type QuotePayload = {
  createdAt?: string;
  make: string;
  model: string;
  year: string;
  color?: string;
  name: string;
  phone: string;
  email?: string;
  service?: string;
  notes?: string;
  contacted?: string;
};

function clean(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function validatePayload(body: unknown): { valid: true; data: QuotePayload } | { valid: false; error: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Invalid request body." };
  }

  const data: QuotePayload = {
    make: clean((body as Record<string, unknown>).make),
    model: clean((body as Record<string, unknown>).model),
    year: clean((body as Record<string, unknown>).year),
    color: clean((body as Record<string, unknown>).color),
    name: clean((body as Record<string, unknown>).name),
    phone: clean((body as Record<string, unknown>).phone),
    email: clean((body as Record<string, unknown>).email),
    service: clean((body as Record<string, unknown>).service),
    notes: clean((body as Record<string, unknown>).notes),
    contacted: "",
  };

  if (!data.make || !data.model || !data.year || !data.name || !data.phone) {
    return { valid: false, error: "Missing required fields." };
  }

  return { valid: true, data };
}

async function postToGoogleSheets(payload: QuotePayload) {
  const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhook) {
    return false;
  }

  const payloadText = JSON.stringify(payload);
  const response = await fetch(webhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payloadText,
    redirect: "follow",
  });

  const bodyText = await response.text();
  const contentType = response.headers.get("content-type") || "";

  if (response.redirected) {
    console.info(
      `Google Sheets webhook redirected to ${response.url} (status ${response.status}) from ${webhook}`,
    );
  }

  if (!response.ok) {
    const bodyPreview = bodyText.slice(0, 180).replace(/\s+/g, " ").trim();
    const isHtmlPage = /^<[\s\S]{0,40}html/i.test(bodyText) || /Google/.test(bodyText);

    const hint = isHtmlPage
      ? "This looks like an HTML access/permission page, not a script endpoint. Check Google Apps Script web app deployment and access permissions."
      : "Check webhook URL and auth.";
    throw new Error(
      `Google Sheets webhook failed (${response.status} ${response.statusText}). ${hint} ${bodyPreview}`,
    );
  }

  const isJson = contentType.includes("application/json");
  if (isJson) {
    try {
      const parsed = JSON.parse(bodyText);
      if (parsed && typeof parsed === "object" && "ok" in parsed && parsed.ok !== true) {
        const detail = (parsed as { error?: string }).error ?? "No details.";
        throw new Error(`Google Sheets webhook returned ok=false: ${detail}`);
      }
    } catch (error) {
      throw new Error(
        `Google Sheets webhook responded with invalid JSON: ${(error as Error)?.message || "Unable to parse response."}`,
      );
    }
  } else if (bodyText.trim()) {
    const isHtml = /^<!DOCTYPE html>/i.test(bodyText.trim());
    if (isHtml) {
      throw new Error(`Google Sheets webhook returned HTML instead of JSON: ${bodyText.slice(0, 160)}`);
    }
  }

  return true;
}

async function sendEmailNotification(payload: QuotePayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.QUOTE_NOTIFICATION_EMAIL;

  if (!apiKey || !toEmail) {
    return false;
  }

  const fromEmail = process.env.QUOTE_FROM_EMAIL || "onboarding@resend.dev";
  const subject = `New Quote Request - ${payload.make} ${payload.model}`;
  const lines = [
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email || "N/A"}`,
    `Vehicle: ${payload.year} ${payload.make} ${payload.model}`,
    `Color: ${payload.color || "N/A"}`,
    `Service: ${payload.service || "Not specified"}`,
    `Notes: ${payload.notes || "N/A"}`,
  ];

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject,
      text: lines.join("\n"),
    }),
  });

  if (!response.ok) {
    throw new Error("Email notification failed.");
  }

  return true;
}

function summarizeError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error.";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = validatePayload(body);

    if (!result.valid) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const payload: QuotePayload = {
      ...result.data,
      createdAt: new Date().toISOString(),
      notes: `${result.data.notes || ""}`.trim(),
      contacted: "No",
    };

    const channels: string[] = [];
    const failures: string[] = [];

    const [sheetsResult, emailResult] = await Promise.all([
      postToGoogleSheets(payload)
        .then(() => ({ channel: "google_sheets" as const, ok: true }))
        .catch((error) => ({ channel: "google_sheets" as const, ok: false, error: summarizeError(error) })),
      sendEmailNotification(payload)
        .then(() => ({ channel: "email" as const, ok: true }))
        .catch((error) => ({ channel: "email" as const, ok: false, error: summarizeError(error) })),
    ]);

    if (sheetsResult.ok) {
      channels.push(sheetsResult.channel);
    } else {
      failures.push(`Google Sheets: ${sheetsResult.error}`);
    }

    if (emailResult.ok) {
      channels.push(emailResult.channel);
    } else {
      failures.push(`Email: ${emailResult.error}`);
    }

    if (channels.length === 0) {
      const reason = failures.length > 0 ? failures.join(" | ") : "No delivery channel configured.";
      return NextResponse.json(
        { error: `No delivery channels succeeded. ${reason}` },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, channels });
  } catch (error) {
    console.error("Quote route error:", error);
    const message = error instanceof Error ? error.message : "Unable to process quote request.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
