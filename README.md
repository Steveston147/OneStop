# OneStop International Support MVP

A bilingual public website and enquiry flow for international faculty, researchers, guests, accompanying families, host offices, APU, and Ritsumeikan affiliated schools.

## Current MVP architecture

- Next.js App Router
- TypeScript
- Tailwind CSS
- Vercel deployment
- Public enquiries delivered by email through the Resend API
- No database is required for the public enquiry form

The repository still contains the earlier database-backed admin prototype. That admin area is optional and is not required for the current email-only MVP enquiry flow.

## Included in the MVP

- `/ja` and `/en` public websites
- Service, timeline, accommodation, fees, FAQ, visitor, and contact pages
- Four-step bilingual enquiry form
- Ritsumeikan University, APU, and affiliated-school selection
- Review-before-submit screen
- Server-side email delivery to `eltontanaka@gmail.com`
- Generated reference number such as `OS-20260712-ABC12`
- Applicant email set as Reply-To so the coordinator can reply directly
- No passport, COE, or sensitive-document upload

## Email environment variables

Create `.env.local` for local development, and add the same variables in Vercel Project Settings → Environment Variables.

```bash
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxx"
ENQUIRY_FROM_EMAIL="OneStop <onboarding@resend.dev>"
```

`ENQUIRY_FROM_EMAIL` is optional. The code uses `OneStop <onboarding@resend.dev>` when it is omitted.

For an initial Resend test, create the Resend account using the recipient address and use the Resend onboarding sender. For public operation, use a verified organisation domain and replace `ENQUIRY_FROM_EMAIL` with the approved sender address.

The recipient is intentionally fixed in server-side code:

```text
eltontanaka@gmail.com
```

It is not supplied by the browser and cannot be changed through the enquiry form.

## Public enquiry flow

1. The user completes the four-step form.
2. The server validates the required fields, consent, and requested support.
3. A reference number is generated without a database.
4. The enquiry is sent to the fixed recipient by the Resend API.
5. The user sees the reference number on the confirmation page.

If `RESEND_API_KEY` is missing, the public form displays a user-friendly email-configuration message. It no longer displays a `DATABASE_URL` error.

## Optional legacy admin prototype

The existing `/admin` prototype still uses Postgres and the following optional variables:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST/db?sslmode=require"
ADMIN_PASSWORD="change-this-admin-password"
```

Do not configure these variables unless the database-backed admin workflow is intentionally reactivated. The email-only public form works without them.

## Run locally

```bash
npm install
npm run build
npm run dev
```

Open `http://localhost:3000`.

## Vercel review checklist

- `npm run build` completes successfully.
- `/ja`, `/en`, and all public routes render correctly.
- `/ja/contact` and `/en/contact` show all four steps.
- The host-institution list includes Ritsumeikan University, APU, the four affiliated schools, and Other.
- A test submission arrives at `eltontanaka@gmail.com`.
- Replying to the message addresses the applicant email.
- The confirmation screen displays the same request ID as the received email.
- No `DATABASE_URL` error appears on the public form.
- Mobile layout and the review-before-submit screen are checked.

## Before public launch

- Replace temporary design-review photos with approved institutional assets.
- Use a verified organisational sender domain for email delivery.
- Decide how enquiry emails will be retained, labelled, and deleted.
- Keep sensitive immigration documents outside this form and ordinary email unless an approved secure process is provided.
