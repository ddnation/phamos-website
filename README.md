This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Quote Form Delivery (Low Cost)

The quote form posts to `POST /api/quote`.

Set at least one delivery channel:

```bash
# Option 1 (recommended cheapest): Google Apps Script webhook -> Google Sheets
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfycbyvqci2ooOINlotXPzG2KE32sBHqO4NHLgVjU0FrEGPptSIAX6nKY8IvYIFD4XTySVe/exec

# Option 2 (optional): Email notification via Resend
RESEND_API_KEY=re_xxxxx
QUOTE_NOTIFICATION_EMAIL=you@example.com
QUOTE_FROM_EMAIL=onboarding@resend.dev
```

If no channel is configured, the API returns an error so leads are not silently lost.

## Cloudflare Workers Deployment

This project is configured for Cloudflare Workers using the OpenNext adapter.

1. Install dependencies with npm:

```bash
npm install
```

2. Log in to Cloudflare:

```bash
npx wrangler login
```

3. Preview the app in the Workers runtime:

```bash
npm run preview
```

4. Deploy manually:

```bash
npm run deploy
```

For GitHub-based deploys, push this repo to GitHub and create a Worker in the Cloudflare dashboard connected to the repository. Use npm for installs/builds in Cloudflare, since this repo currently includes both `package-lock.json` and `pnpm-lock.yaml`.
