# OneStop International Support

A bilingual public information and enquiry-intake service for international faculty, researchers, invited guests, accompanying families, host offices, APU, and Ritsumeikan affiliated schools.

## Current release status

**Engineering baseline: V1 release candidate**

The core technical remediation is complete:

- legacy Postgres/Neon admin architecture removed,
- public form hardened server-side,
- dependency lockfile committed,
- `npm ci` used in CI,
- TypeScript, ESLint, Vitest, production build, and Playwright E2E are automated,
- Vercel Preview is part of the merge gate,
- Next.js is on the supported 15.5 security line,
- CI warning/tooling cleanup is complete.

V1 is **not yet declared institutionally complete** because a small number of business-owner sign-offs remain: approved production imagery, sender identity/domain, mailbox retention/ownership, and final business-copy approval. See `V1_READINESS.md` and `OPERATIONS.md`.

## Production / canonical Vercel domain

Current production alias used for UAT:

- `https://one-stop-rho.vercel.app`

Vercel project:

- project: `one-stop`
- deployment platform: Vercel

## Canonical documents

Read in this order:

1. `AGENTS.md` — governing specification
2. `DECISIONS.md` — architecture/product decision log
3. `OPERATIONS.md` — operational/privacy/retention checklist
4. `V1_READINESS.md` — UAT and release-readiness evidence
5. `README.md` — practical project overview

Historical PRs/branches do not override these documents.

## Current architecture

- Next.js App Router
- TypeScript
- React 19
- Tailwind CSS
- Node.js 22 in GitHub Actions
- Vercel deployment
- Resend for server-side enquiry email delivery
- no enquiry database
- no web admin dashboard
- no user accounts / SSO
- no sensitive-document uploads

The production model is deliberately email-only. Reintroducing database persistence, an admin dashboard, authentication, or case management requires an explicit architecture decision under `AGENTS.md` and `DECISIONS.md`.

## Included in V1

- `/ja` and `/en` public websites
- service, timeline, accommodation, fees, FAQ, visitor, and contact pages
- four-step bilingual enquiry form
- Ritsumeikan University, APU, and affiliated-school selection
- review-before-submit screen
- server-side email delivery to a private recipient configured in Vercel
- generated reference number such as `CGW-20260813-ABC12`
- applicant email set as Reply-To
- explicit warning not to send passport/COE/sensitive immigration documents

## Enquiry security baseline

The server, not the browser, is authoritative for enquiry acceptance. Current controls include:

- cryptographically secure request-ID randomness
- allowlists for language, role, host institution, and requested services
- required-field and email validation
- free-text length limits on client and server
- semantic date validation and arrival/departure ordering
- family-member integer/range validation
- consent validation
- duplicate/invalid service rejection
- hidden bot-trap field
- best-effort per-IP burst/rate limiting within the active server runtime
- 10-second Resend timeout
- privacy-safe delivery-error logging
- no full enquiry-body or provider-response-body dumping

The in-process rate limiter is not a globally distributed rate limiter across all Vercel instances. If abuse risk increases, introduce an approved distributed/Vercel-native control in a separate security decision.

## Email environment variables

Create `.env.local` for local development and configure equivalent values in Vercel Project Settings → Environment Variables.

```bash
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxx"
ENQUIRY_TO_EMAIL="recipient@example.com"
ENQUIRY_FROM_EMAIL="Creotech Global Welcome <onboarding@resend.dev>"
```

- `RESEND_API_KEY` is required.
- `ENQUIRY_TO_EMAIL` is required and stays outside the repository.
- `ENQUIRY_FROM_EMAIL` is optional in code, but an **approved organisational sender domain/address is required before institutional V1 sign-off**.

The recipient is server-controlled and cannot be changed from the browser.

## Public enquiry flow

1. User completes the four-step form.
2. Server independently validates the complete submission.
3. A reference number is generated without a database.
4. Enquiry is sent to the private recipient through Resend.
5. Confirmation is shown only after Resend accepts the request.

## Reproducible installs and automated tests

`package-lock.json` is committed and is the dependency lock. Use `npm ci` for clean reproducible installs.

Quality gate:

- `npm ci`
- `npm run typecheck`
- `npm run lint` (zero-warning gate)
- `npm test` (Vitest)
- `npm run build`
- `npm run test:e2e` (Playwright / Chromium)
- Vercel Preview for meaningful user-visible/deployment changes

GitHub Actions caches Next.js build output and runs on Node.js 22.

## Run locally

```bash
npm ci
npm run typecheck
npm run lint
npm test
npm run build
npm run dev
```

For browser E2E:

```bash
npx playwright install chromium
npm run test:e2e
```

Open `http://localhost:3000`.

## Vercel / UAT checklist

For meaningful releases:

- GitHub Actions is Green.
- Vercel deployment is READY.
- `/ja` and `/en` render.
- public routes render and language switching works.
- `/ja/contact` and `/en/contact` show the four-step flow.
- invalid inputs are rejected server-side.
- `/admin` is not an application route.
- mobile/review states are checked.
- temporary design images remain clearly marked until approved assets are supplied.
- production runtime logs contain no release-blocking error cluster.

Detailed evidence is recorded in `V1_READINESS.md`.

## Before final institutional V1 sign-off

The following are **business/operational approval items, not unfinished core engineering**:

- approve public-facing service/fee/contact wording,
- confirm official service/product owner,
- confirm operational mailbox owner and access group,
- confirm retention/archive/deletion period,
- confirm sensitive-information incident/escalation process,
- configure an approved verified organisational Resend sender domain/address,
- replace temporary Pexels design-review imagery with approved institutional assets,
- complete final owner UAT acceptance.

Do not invent these policies in code. Unknown items are tracked explicitly in `OPERATIONS.md`.
