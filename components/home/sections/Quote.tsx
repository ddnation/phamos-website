"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckIcon } from "@/components/home/Icons";
import { serviceOptions } from "@/components/home/data";

type QuotePayload = {
  make: string;
  model: string;
  year: string;
  color: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  notes: string;
};

type Errors = Partial<Record<keyof QuotePayload, boolean>>;

const initialForm: QuotePayload = {
  make: "",
  model: "",
  year: "",
  color: "",
  name: "",
  phone: "",
  email: "",
  service: "",
  notes: "",
};

const QUOTE_PHONE_DISPLAY = "(713) 555-0000";
const QUOTE_PHONE_TEL = "+17135550000";
const SUBMIT_FAILURE_MESSAGE =
  "There was an issue submitting your quote. Please try again, or call us for a quote.";

function formatPhone(value: string) {
  let digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length >= 7) {
    digits = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  } else if (digits.length >= 4) {
    digits = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  } else if (digits.length > 0) {
    digits = `(${digits}`;
  }

  return digits;
}

function requiredFieldsByStep(step: number): (keyof QuotePayload)[] {
  if (step === 1) {
    return ["make", "model", "year"];
  }

  if (step === 2) {
    return ["name", "phone"];
  }

  return [];
}

export function Quote() {
  const searchParams = useSearchParams();
  const maxYear = new Date().getFullYear();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState<QuotePayload>(initialForm);
  const [errors, setErrors] = useState<Errors>({});

  const stepLabels = useMemo(() => ["Your vehicle", "Contact", "Details"], []);
  const selectedServiceFromUrl = searchParams.get("service")?.trim() ?? "";

  const selectedService = useMemo(() => {
    if (!selectedServiceFromUrl) {
      return "";
    }

    return serviceOptions.find((option) => option === selectedServiceFromUrl) ?? "";
  }, [selectedServiceFromUrl]);
  const effectiveService = form.service || selectedService;

  const validateCurrentStep = () => {
    const requiredFields = requiredFieldsByStep(step);
    const nextErrors: Errors = {};

    requiredFields.forEach((field) => {
      if (!form[field].trim()) {
        nextErrors[field] = true;
      }
    });

    setErrors((prev) => ({ ...prev, ...nextErrors }));
    return requiredFields.every((field) => !nextErrors[field]);
  };

  const updateField = (key: keyof QuotePayload, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: false }));
    }
  };

  const goNext = (): boolean => {
    if (!validateCurrentStep()) {
      return false;
    }

    if (step < 3) {
      setStep((prev) => prev + 1);
      return false;
    }

    return true;
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (step < 3) {
      goNext();
      return;
    }

    if (!goNext()) {
      return;
    }

    const payload = { ...form, service: effectiveService };
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error || "Unable to submit quote request.");
      }

      setSubmitted(true);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      } else {
        console.error("Quote form submission error:", error);
      }

      setSubmitError(SUBMIT_FAILURE_MESSAGE);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="quote" className="section">
      <div className="container form-wrap">
        <div className="card soft quote-copy">
          <div className="kicker">No Obligation</div>
          <h2 className="h2 section-title">Request a <em>quote.</em></h2>
          <p className="p section-copy">
            Three quick steps. We&apos;ll text you back within hours, usually the same day.
          </p>
          <div className="quote-bullets">
            <div><span>•</span> Reply within 2 hours</div>
            <div><span>•</span> 100% free, zero obligation</div>
            <div><span>•</span> Drop-off service at our shop</div>
            <div><span>•</span> Your info stays private</div>
          </div>
        </div>

        <form className="card form" aria-label="Quote form" onSubmit={onSubmit}>
          {!submitted ? (
            <>
              <div className="progress">
                {stepLabels.map((label, index) => {
                  const current = index + 1;
                  const state = step === current ? "active" : step > current ? "done" : "";

                  return (
                    <button
                      key={label}
                      type="button"
                      className={`pstep ${state}`.trim()}
                      onClick={() => {
                        if (current <= step) {
                          setStep(current);
                        }
                      }}
                    >
                      <div className="pnum">{current}</div>
                      <div>{label}</div>
                    </button>
                  );
                })}
              </div>

              <div className="form-body">
                {selectedService ? (
                  <div className="selected-service-banner">
                    Selected package: <strong>{selectedService}</strong>
                  </div>
                ) : null}
                {step === 1 ? (
                  <div className="step active">
                    <h3>Your vehicle</h3>
                    <p>Basic details so we can quote it correctly.</p>

                    <div className="field-grid">
                      <div className="field">
                        <label htmlFor="q-make">Make *</label>
                        <input
                          id="q-make"
                          className={`input ${errors.make ? "is-invalid" : ""}`.trim()}
                          value={form.make}
                          placeholder="e.g. Toyota"
                          onChange={(event) => updateField("make", event.target.value)}
                          required
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="q-model">Model *</label>
                        <input
                          id="q-model"
                          className={`input ${errors.model ? "is-invalid" : ""}`.trim()}
                          value={form.model}
                          placeholder="e.g. Camry"
                          onChange={(event) => updateField("model", event.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="field-grid">
                      <div className="field">
                        <label htmlFor="q-year">Year *</label>
                        <input
                          id="q-year"
                          className={`input ${errors.year ? "is-invalid" : ""}`.trim()}
                          type="number"
                          min="1980"
                          max={maxYear}
                          value={form.year}
                          placeholder="2021"
                          onChange={(event) => updateField("year", event.target.value)}
                          required
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="q-color">Color</label>
                        <input
                          id="q-color"
                          className="input"
                          value={form.color}
                          placeholder="e.g. Black"
                          onChange={(event) => updateField("color", event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="help">* Required fields</div>
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className="step active">
                    <h3>Contact</h3>
                    <p>We&apos;ll text you back. Email is optional.</p>

                    <div className="field-grid">
                      <div className="field">
                        <label htmlFor="q-name">Full name *</label>
                        <input
                          id="q-name"
                          className={`input ${errors.name ? "is-invalid" : ""}`.trim()}
                          value={form.name}
                          placeholder="John Smith"
                          onChange={(event) => updateField("name", event.target.value)}
                          required
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="q-phone">Phone *</label>
                        <input
                          id="q-phone"
                          className={`input ${errors.phone ? "is-invalid" : ""}`.trim()}
                          value={form.phone}
                          placeholder="(555) 000-0000"
                          onChange={(event) => updateField("phone", formatPhone(event.target.value))}
                          required
                        />
                      </div>
                    </div>

                    <div className="field-grid one">
                      <div className="field">
                        <label htmlFor="q-email">Email (optional)</label>
                        <input
                          id="q-email"
                          className="input"
                          type="email"
                          value={form.email}
                          placeholder="john@example.com"
                          onChange={(event) => updateField("email", event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="help">We never share your info.</div>
                  </div>
                ) : null}

                {step === 3 ? (
                  <div className="step active">
                    <h3>Details</h3>
                    <p>Pick a service and add any notes.</p>

                    <div className="field-grid one">
                      <div className="field">
                        <label htmlFor="q-service">Service</label>
                        <select
                          id="q-service"
                          className="select"
                          value={effectiveService}
                          onChange={(event) => updateField("service", event.target.value)}
                        >
                          <option value="">- Choose -</option>
                          {serviceOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="field-grid one">
                      <div className="field">
                        <label htmlFor="q-notes">Notes</label>
                        <textarea
                          id="q-notes"
                          className="textarea"
                          value={form.notes}
                          placeholder="Scratches, water spots, add-ons you want, etc."
                          onChange={(event) => updateField("notes", event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="help">Want add-ons? List them in Notes.</div>
                  </div>
                ) : null}
              </div>

              <div className="form-nav">
                <div className="dots" aria-label="Step indicator">
                  {[1, 2, 3].map((dot) => (
                    <div key={dot} className={`dot ${step === dot ? "active" : ""}`.trim()} />
                  ))}
                </div>

                <div className="form-actions">
                  {step > 1 ? (
                    <button type="button" className="btn-link" onClick={() => setStep((prev) => prev - 1)}>
                      Back
                    </button>
                  ) : null}
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {step === 3 ? (isSubmitting ? "Sending..." : "Send") : "Next"}
                  </button>
                </div>
              </div>
              {submitError ? (
                <div className="form-error">
                  <p>{submitError}</p>
                  <p>
                    Call{" "}
                    <a href={`tel:${QUOTE_PHONE_TEL}`}>{QUOTE_PHONE_DISPLAY}</a>{" "}
                    to request a quote by phone.
                  </p>
                </div>
              ) : null}
            </>
          ) : (
            <div className="success show">
              <div className="check" aria-hidden="true">
                <CheckIcon className="icon" />
              </div>
              <h3>Request received</h3>
              <p>We&apos;ll text you back within a few hours, usually same day.</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
