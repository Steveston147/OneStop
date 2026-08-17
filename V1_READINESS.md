# OneStop V1 Readiness

Updated: 2026-08-17

## Canonical product identity

This repository is the public **Creotech Global Welcome / OneStop International Support** website and enquiry intake service for international faculty, researchers, guests, accompanying families, host offices, APU, and Ritsumeikan affiliated schools.

It is not the internal **OneStop AI Platform** used as a portal to separate business applications. Future development must keep those responsibilities separate unless an explicit architecture decision changes this boundary.

## Release decision

### V1 engineering complete

PR #24 and PR #25 are merged to `main`. The final SSR document-language defect was resolved in PR #25, and its CI / Vercel deployment were Green.

PR #23 has been closed as superseded and must not be merged or treated as the current readiness baseline.

### Controlled V1 pilot: GO

The controlled pilot may operate with the current Resend sandbox sender only for limited owner-managed testing/early operation, provided the recipient is an organisation-managed business mailbox and the operational rules in `OPERATIONS.md` are followed.

### Institutional production: HOLD only on verified sender-domain setup

A fully institutional public launch requires a Resend-verified organisational sender configured in `ENQUIRY_FROM_EMAIL`. The repository must not claim that this external DNS/account step is complete until it is actually confirmed.

## Completed V1 items

- [x] Legacy Admin/Postgres/Neon implementation removed.
- [x] Server-side form validation and secure request IDs.
- [x] Honeypot, basic burst limiting, Resend timeout and privacy-safe logs.
- [x] `package-lock.json` and `npm ci`.
- [x] Typecheck, ESLint zero-warning gate, Vitest and production build.
- [x] Playwright E2E.
- [x] Supported Next.js 15.5 / React 19 / Node 22 baseline.
- [x] Japanese and English document-language regression checks.
- [x] Initial SSR `<html lang>` correctness completed in PR #25.
- [x] Third-party Pexels design samples removed from V1 and replaced with repository-owned abstract visuals.
- [x] OneStop operational/privacy/retention runbook added.
- [x] Personal consumer mailboxes prohibited for production enquiry intake by policy.
- [x] 180-day post-completion OneStop mailbox retention rule defined, subject to stricter company/university policy.
- [x] Sensitive-information incident handling defined.
- [x] Stale V1 readiness PR #23 closed as superseded.
- [x] Public support site identity separated from the internal OneStop AI Platform concept in canonical documentation.

## Business/content decision

The V1 site may describe the service as a Creotech-operated international faculty/researcher support coordination service for the Ritsumeikan Academy context. Fixed fees, guaranteed immigration outcomes, or legal determinations must not be invented.

`Current country` and `Nationality` remain optional intake fields because they can materially affect initial COE/visa-support routing. They are not required fields and must not be used for unrelated profiling.

## Image decision

Approved institutional photography was not sufficiently evidenced for silent reuse. Instead of leaving launch blocked, V1 removes third-party sample photography and uses repository-owned non-photographic abstract visuals. This avoids third-party image licensing and false institutional-photo representation.

Future Ritsumeikan/Creotech photography may replace these visuals only after explicit usage approval.

## Email decision

### Recipient

Production recipient must be an organisation-managed International Business Section / Ritsumeikan Study Abroad Center mailbox. The address remains a Vercel secret (`ENQUIRY_TO_EMAIL`) and is not committed to GitHub.

### Sender

- Development / controlled pilot: Resend sandbox sender may be used temporarily.
- Institutional production: `ENQUIRY_FROM_EMAIL` must use a Resend-verified organisational domain/address.
- The repository must not silently treat `onboarding@resend.dev` as an institutional sender.

## Current validation baseline

The V1 engineering baseline is represented by `main` after PR #25. Meaningful runtime/UI changes must continue to pass:

1. `npm ci`
2. typecheck
3. lint
4. Vitest
5. production build
6. Playwright bilingual regression coverage
7. Vercel Preview READY when deployed behaviour changes
8. no release-blocking runtime errors

After production changes, smoke-test `/ja`, `/en`, `/ja/contact`, `/en/contact`, invalid routes, `/admin`, and runtime errors as defined in `OPERATIONS.md`.

## Cost-conscious development rule

To reduce unnecessary Vercel Build CPU usage:

- batch related low-risk changes into one branch and one PR;
- avoid push/deploy cycles for every small wording or documentation edit;
- complete local/static review first where possible;
- use Vercel Preview primarily for changes that can affect UI, routing, runtime behaviour, forms, or deployment configuration;
- do not weaken CI, testing, security, or production gates merely to save build cost.

## Final status vocabulary

- **V1 ENGINEERING COMPLETE**: code, tests, imagery and runbook complete.
- **CONTROLLED V1 PILOT GO**: engineering complete and owner-managed operational use permitted.
- **INSTITUTIONAL PRODUCTION GO**: controlled V1 plus verified organisational Resend sender and organisation-managed production recipient confirmed.
