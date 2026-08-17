# Creotech Global Welcome / OneStop International Support MVP

A bilingual public website and enquiry flow for international faculty, researchers, guests, accompanying families, host offices, APU, and Ritsumeikan affiliated schools.

## Project identity

This repository is the **public international faculty/researcher support website and enquiry intake service** currently branded in the application as **Creotech Global Welcome** / **OneStop International Support**.

It is **not** the internal **OneStop AI Platform** that serves as an entry point to separate business applications such as Program Manager, Program Assign, Manual Q&A, RSJP FAQ AI, VISA, and finance/estimate tools. Those systems must remain separate repositories/applications unless an explicit architecture decision says otherwise.

This distinction is canonical. Future AI or developer work must not turn this repository into a general internal app hub or merge unrelated business applications into it.

## V1 status

- **V1 engineering complete** on `main` after PR #24 and PR #25.
- **Controlled V1 pilot: GO** when operated under `OPERATIONS.md` with an organisation-managed recipient mailbox.
- **Institutional production: HOLD only on verified organisational sender-domain setup** for `ENQUIRY_FROM_EMAIL`.
- PR #23 was closed as superseded and must not be merged or used as the current readiness baseline.

See `V1_READINESS.md` and `OPERATIONS.md` for the release and operating gates.

## Current MVP architecture

- Next.js App Router
- TypeScript
- Tailwind CSS
- Vercel deployment
- Public enquiries delivered by email through the Resend API
- No database or web admin dashboard

The canonical production model is deliberately email-only. The earlier Postgres/Neon admin prototype has been removed from the active codebase. Reintroducing database persistence, an admin dashboard, authentication, or case management requires an explicit architecture decision under `AGENTS.md` and `DECISIONS.md`.

## Included in the MVP

- `/ja` and `/en` public websites
- Service, timeline, accommodation, fees, FAQ, visitor, and contact pages
- Four-step bilingual enquiry form
- Ritsumeikan University, APU, and affiliated-school selection
- Review-before-submit screen
- Server-side email delivery to a private recipient configured in Vercel
- Generated reference number such as `CGW-20260813-ABC12`
- Applicant email set as Reply-To so the coordinator can reply directly
- No passport, COE, or sensitive-document upload

## Enquiry security baseline

The server, not the browser, is authoritative for enquiry acceptance. Current controls include:

- cryptographically secure request-ID randomness
- allowlists for language, role, host institution, and requested services
- strict required-field and email checks
- free-text length limits
- semantic date validation and arrival/departure ordering
- family-member integer/range validation
- consent validation
- duplicate/invalid service rejection
- a bot-trap field contract for scripted submissions
- best-effort per-IP rate limiting within the active server runtime
- a 10-second Resend timeout
- privacy-safe delivery-error logging that does not dump enquiry contents or provider response bodies

The in-process rate limiter reduces simple bursts but is not a globally distributed rate limiter across all Vercel instances. If abuse risk increases, introduce an approved distributed rate-limit service or Vercel-native control as a separate architecture/security decision.

## Email environment variables

Create `.env.local` for local development, and add the same variables in Vercel Project Settings → Environment Variables.

```bash
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxx"
ENQUIRY_TO_EMAIL="recipient@example.com"
ENQUIRY_FROM_EMAIL="Creotech Global Welcome <onboarding@resend.dev>"
```

- `RESEND_API_KEY` is required.
- `ENQUIRY_TO_EMAIL` is required and stores the private recipient address outside the public repository.
- `ENQUIRY_FROM_EMAIL` is optional. The code uses the Resend onboarding sender when it is omitted.

For institutional public operation, use a verified organisational domain and replace `ENQUIRY_FROM_EMAIL` with the approved sender address.

The recipient is read only on the server. It is not supplied by the browser and cannot be changed through the enquiry form.

## Public enquiry flow

1. The user completes the four-step form.
2. The server independently validates the complete submission.
3. A reference number is generated without a database.
4. The enquiry is sent to the private recipient by the Resend API.
5. The user sees the reference number on the confirmation page only after Resend accepts the request.

If `RESEND_API_KEY` or `ENQUIRY_TO_EMAIL` is missing, the public form displays a user-friendly email-configuration message.

## Reproducible installs and automated tests

`package-lock.json` is committed and is the dependency lock. Use `npm ci` for clean installs in CI and when you want the exact dependency set recorded in the repository.

The automated quality gate has two layers:

- Vitest checks the enquiry validation logic without opening a browser.
- Playwright opens Chromium and operates the Japanese and English enquiry form like a user. It stops at the review screen and does not send a real enquiry email.

GitHub Actions must pass `npm ci`, typecheck, lint, unit tests, build, and Playwright E2E before merge approval.

## Run locally

```bash
npm ci
npm run typecheck
npm run lint
npm test
npm run build
npm run dev
```

For browser E2E tests, install Chromium once and run Playwright:

```bash
npx playwright install chromium
npm run test:e2e
```

Open `http://localhost:3000`.

## Vercel Preview review checklist

Use Vercel Preview for meaningful UI, routing, form, runtime, or deployment changes. Documentation-only changes should be batched into a single PR/commit to avoid unnecessary preview builds and Build CPU usage.

- GitHub Actions quality and Playwright E2E checks are Green.
- Vercel Preview deployment succeeds when the change affects deployed behaviour.
- `/ja`, `/en`, and all public routes render correctly.
- `/ja/contact` and `/en/contact` show all four steps.
- `/admin` is not an application route and returns not found.
- No `DATABASE_URL` or `ADMIN_PASSWORD` is required.
- The host-institution list includes Ritsumeikan University, APU, the four affiliated schools, and Other.
- Invalid enums, malformed email, reversed dates, excessive family count, missing consent, and oversized text are rejected server-side.
- A test submission arrives at the configured recipient address when Preview email delivery is intentionally enabled.
- Replying to the message addresses the applicant email.
- The confirmation screen displays the same request ID as the received email.
- Mobile layout and the review-before-submit screen are checked.

A successful Vercel deployment is evidence, not by itself a merge approval. Applicable type-check, lint, test, build, security/privacy, bilingual, and regression checks remain required by `AGENTS.md`.

## Before institutional public launch

- Use a verified organisational sender domain for email delivery.
- Confirm the production recipient is an organisation-managed business mailbox.
- Follow the retention, deletion, sensitive-information, incident, smoke-test, and rollback rules in `OPERATIONS.md`.
- Keep sensitive immigration documents outside this form and ordinary email unless an approved secure process is provided.
