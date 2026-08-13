# OneStop International Support

A bilingual public information and enquiry-intake service for international faculty, researchers, invited guests, accompanying families, host offices, APU, and Ritsumeikan affiliated schools.

## Current release status

**Engineering baseline: V1 release candidate. Institutional V1: not yet complete.**

Completed technical baseline:

- legacy Postgres/Neon admin architecture removed,
- public form hardened server-side,
- committed dependency lockfile and `npm ci`,
- TypeScript / ESLint zero-warning / Vitest / production build / Playwright E2E,
- GitHub Actions and Vercel Preview merge gates,
- Next.js 15.5 security line / React 19,
- Node.js 22 CI and Next.js build cache.

Current final blockers are recorded in `V1_READINESS.md`, including the English document-language declaration, approved production imagery, business wording/owner approval, mailbox/retention ownership, sender identity, and final human UAT.

## Production Vercel domain

- `https://one-stop-rho.vercel.app`
- Vercel project: `one-stop`

## Canonical documents

1. `AGENTS.md` — governing specification
2. `DECISIONS.md` — architecture/product decision log
3. `V1_READINESS.md` — UAT, business/operational checklist, release blockers
4. `README.md` — practical overview

Historical PRs and branches do not override these documents.

## Current architecture

- Next.js App Router / TypeScript / React 19 / Tailwind CSS
- Vercel
- Resend for server-side enquiry email delivery
- no enquiry database
- no web admin dashboard
- no user accounts / SSO
- no sensitive-document uploads

Reintroducing persistence, admin, authentication, or case management requires an explicit ADR.

## Included in V1

- `/ja` and `/en` public websites
- service, timeline, accommodation, fees, FAQ, visitor, and contact pages
- four-step bilingual enquiry form
- Ritsumeikan University, APU, and affiliated-school selection
- review-before-submit screen
- private server-controlled email recipient
- generated reference number
- applicant email as Reply-To
- explicit warning not to send passport/COE/sensitive immigration documents

## Enquiry security baseline

- secure request-ID randomness
- server-side allowlists and required-field/email validation
- client/server free-text limits
- semantic date / arrival-departure validation
- family-member range validation
- consent validation
- duplicate/invalid service rejection
- honeypot
- best-effort per-IP burst/rate limiting
- Resend timeout
- privacy-safe error logging

The current in-process limiter is not globally distributed across all Vercel instances.

## Environment variables

```bash
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxx"
ENQUIRY_TO_EMAIL="recipient@example.com"
ENQUIRY_FROM_EMAIL="Creotech Global Welcome <onboarding@resend.dev>"
```

`RESEND_API_KEY` and `ENQUIRY_TO_EMAIL` are required. An approved organisational `ENQUIRY_FROM_EMAIL` is required before institutional V1 sign-off.

## Quality gate

```bash
npm ci
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
```

GitHub Actions runs the applicable gate and Vercel Preview is required for meaningful user-visible/deployment changes.

## Current UAT status

Verified on production:

- `/ja` — 200
- `/en` — 200
- `/ja/fees` — 200
- `/ja/contact` — 200
- `/admin` — 404
- invalid English route — 404
- recent focused Vercel runtime check — no current error group

Open technical finding: English visible pages are currently emitted under root `<html lang="ja">`. This must be corrected with regression coverage before final V1 completion.

Detailed evidence and all owner decisions are in `V1_READINESS.md`.

## Before institutional V1 COMPLETE

- fix English document-language declaration,
- approve service/fee/contact wording,
- confirm product and mailbox ownership,
- confirm retention/archive/deletion and incident handling,
- confirm whether current-country/nationality are needed at initial enquiry,
- configure approved organisational sender identity,
- replace sample Pexels imagery with approved institutional assets,
- complete final human owner UAT.

Unknown policy must be recorded as pending, not invented in code.
