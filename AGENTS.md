# OneStop — Canonical Development & Audit Specification

> Status: **Canonical / Governing document**  
> Baseline date: **2026-08-13**

This file is the primary specification for all future human and AI-assisted development in this repository. If implementation, PR text, old branches, comments, or older documentation conflicts with this file, **this file takes precedence unless an explicit approved decision in `DECISIONS.md` supersedes it**.

## 1. Purpose

OneStop is a bilingual public information and enquiry-intake service for Creotech / Ritsumeikan-related international support. Primary audiences include international faculty/researchers/guests, accompanying family members, host offices, Ritsumeikan University, APU, and affiliated schools.

Priorities: correctness, privacy, human control, bilingual parity, maintainability, and evidence-based release decisions.

## 2. Approved V1 architecture

- Next.js App Router / TypeScript / React / Tailwind CSS
- Vercel deployment
- Resend server-side enquiry email delivery
- Japanese and English public pages
- email-based enquiry intake
- **no production enquiry database**
- **no admin dashboard**
- **no user accounts / SSO**
- **no sensitive-document upload**

The earlier Postgres/Neon admin prototype has been physically removed. `/admin`, `lib/db.ts`, `db/schema.sql`, `DATABASE_URL`, `ADMIN_PASSWORD`, database persistence, CSV admin export, and shared-password admin authentication must not be silently reintroduced.

A future admin/case-management design requires a new ADR covering authentication, authorization, audit, privacy, retention, ownership, and rollback.

## 3. Current audit verdict

**Engineering baseline: PASS for a controlled V1 release candidate, but V1 is not yet institutionally complete.**

Major P0 findings from the original 56/100 audit have been remediated: governance, legacy architecture, form hardening, locked dependencies, test baseline, CI, browser E2E, supported Next.js, and CI warning cleanup.

Remaining release items:

- English document-language declaration is incorrect (`/en` visible content is English but root HTML is currently `lang="ja"`) — **technical follow-up required**.
- approved institutional imagery — **pending approved assets**.
- business wording / service / fee / contact owner approval — **pending owner sign-off**.
- product and mailbox ownership, retention, deletion, and incident handling — **pending owner decisions**.
- approved Resend organisational sender identity — **pending decision/configuration**.
- final human owner UAT — **pending**.

Current best-effort IP rate limiting is not globally distributed across all Vercel instances; do not represent it as such.

## 4. Non-negotiable product rules

Do not add without explicit approval and an ADR:

- accounts or SSO,
- database persistence,
- admin dashboards,
- file uploads or sensitive-document storage,
- payment handling,
- automated immigration decisions,
- CRM synchronization,
- AI legal/immigration conclusions,
- personal-data analytics.

OneStop may organize and route support. It must not claim legal/immigration determinations.

## 5. Public form security/privacy baseline

The server is authoritative. Required/current V1 controls include:

- required-field validation,
- allowlists for controlled fields,
- strict email validation,
- client/server text-length limits,
- calendar-date and arrival/departure checks,
- family-count range validation,
- duplicate/invalid service rejection,
- consent validation,
- honeypot,
- best-effort rate limiting,
- cryptographically secure request ID,
- Resend timeout,
- user-safe errors,
- no provider-response or full enquiry-body dumps.

The form must never request uploads of passports, COEs, residence cards, visa scans, banking or medical documents. Operational handling for unexpected sensitive information and unresolved retention decisions is recorded in `V1_READINESS.md`.

Never commit API keys, private mailbox addresses, passwords, tokens, Vercel secrets, or private document URLs.

## 6. Bilingual and content rules

Japanese and English are equal production languages. Every user-visible change must be checked for meaning, navigation, fee/service claims, disclaimers, and form parity.

Do not invent or alter service eligibility, fees, payment responsibility, response guarantees, immigration claims, official names, sender/contact identity, or brand usage without owner confirmation.

The document/content language must correctly identify the active language for accessibility. The current `/en` root-language mismatch is an open V1 issue and requires regression coverage when fixed.

## 7. Architecture/toolchain baseline

- Next.js 15.5 maintenance/security line
- React 19
- Node.js 22 in CI
- committed `package-lock.json`
- `npm ci`
- Vitest
- Playwright / Chromium
- ESLint 9 CLI with `--max-warnings=0`

Major framework upgrades require dedicated tested PRs. New dependencies must be justified.

Temporary Pexels images are design-review placeholders, not approved institutional assets. Do not silently substitute arbitrary web images as official material.

## 8. Test / CI merge gate

Applicable meaningful PRs must pass:

1. `npm ci`
2. `npm run typecheck`
3. `npm run lint`
4. `npm test`
5. `npm run build`
6. `npm run test:e2e` for critical user-flow changes
7. Vercel Preview for meaningful UI/routing/form/deployment changes

A successful build or Vercel deployment alone is not approval. Every reasonable bug fix should add/update a regression test.

Merge decisions: **APPROVE**, **APPROVE WITH FOLLOW-UP**, **REQUEST CHANGES**, or **DO NOT MERGE**.

## 9. V1 UAT baseline

Before V1 completion verify:

- `/ja` and `/en`,
- navigation/language switching,
- bilingual four-step contact form,
- review and required-field behavior,
- sensitive-document warning,
- invalid route behavior,
- mobile usability,
- `/admin` unavailable,
- Vercel READY,
- no current release-blocking runtime error,
- correct document/content language.

Real email delivery should only be tested intentionally when mailbox and sender configuration are approved.

UAT evidence and business/operational blockers are recorded in `V1_READINESS.md`.

## 10. Operational readiness

Before institutional V1 sign-off, `V1_READINESS.md` must record or mark pending:

- product/service owner,
- mailbox owner and access,
- retention/archive/deletion rules,
- sensitive/misdirected enquiry handling,
- incident escalation contact,
- approved Resend sender identity,
- business-content approval,
- image/brand approval,
- smoke-test/rollback principles.

Unknown organisational policy must be marked **PENDING OWNER DECISION**, never guessed.

## 11. AI rules

AI agents MUST read `AGENTS.md` and `DECISIONS.md`, inspect the actual implementation, preserve approved behavior, avoid inventing policy, prefer reversible changes, add tests for behavior changes, preserve bilingual parity, keep secrets out of the repo, and never silently reactivate DB/Admin behavior.

AI agents must not weaken validation or CI merely to pass checks.

## 12. Definition of Done

A feature is done only when behavior matches specification, bilingual/security/privacy impact is reviewed, tests cover key behavior, CI is Green, Vercel evidence exists where applicable, errors/mobile states are usable, docs are updated, and rollback is understood.

## 13. Roadmap status

### Completed engineering baseline

- [x] Canonical governance and decision log
- [x] Close superseded PRs #2, #6, #15
- [x] Remove Admin/Postgres/Neon
- [x] Harden public enquiry form
- [x] Secure request IDs / bot trap / best-effort rate limit / provider timeout
- [x] Vitest / typecheck / GitHub Actions
- [x] lockfile + `npm ci`
- [x] Playwright E2E
- [x] Next.js 15.5 security upgrade
- [x] ESLint/Node/Actions warning cleanup
- [x] Next.js CI build caching
- [x] Synchronize AGENTS/README/DECISIONS with the current baseline
- [x] Run production UAT and record findings
- [x] Record business-copy and operating-decision checklist

### V1 completion blockers

- [ ] Fix English document-language declaration and add regression test
- [ ] Obtain business owner sign-off for wording/services/fees/contact identity
- [ ] Confirm product/mailbox ownership and retention/incident handling
- [ ] Confirm approved organisational sender identity
- [ ] Replace sample imagery with approved institutional assets
- [ ] Final human owner UAT / acceptance
- [ ] Issue **V1 COMPLETE** decision

## 14. Canonical order

1. `AGENTS.md`
2. `DECISIONS.md`
3. `V1_READINESS.md`
4. `README.md`
5. current implementation on `main`

Historical PRs, obsolete branches, and old comments are context only.
