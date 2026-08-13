# OneStop — Canonical Development & Audit Specification

> Status: **Canonical / Governing document**  
> Baseline date: **2026-08-13**

This file is the primary specification for all future human and AI-assisted development in this repository. If implementation, PR text, old branches, comments, or older documentation conflicts with this file, **this file takes precedence unless an explicit approved decision in `DECISIONS.md` supersedes it**.

---

## 1. Purpose

OneStop is a bilingual public information and enquiry-intake service for Creotech / Ritsumeikan-related international support.

Primary audiences:

- international faculty and researchers,
- invited guests,
- accompanying family members,
- host offices and faculty,
- Ritsumeikan University,
- Ritsumeikan Asia Pacific University (APU),
- affiliated schools.

The product must prioritize:

1. Correctness over feature count.
2. Privacy and operational safety over convenience.
3. Human decision-making over hidden automation.
4. Bilingual parity.
5. Maintainability and reversibility.
6. Clear evidence before merge or release.

---

## 2. Current Approved Production Model

The approved V1/MVP architecture is deliberately simple:

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- Vercel
- Resend for server-side enquiry email delivery
- Japanese and English public pages
- email-based enquiry intake
- **no production enquiry database**
- **no admin dashboard**
- **no user account / SSO**
- **no passport, COE, visa, residence-card, bank, medical, or other sensitive-document upload**

Public enquiry flow:

1. User opens `/ja` or `/en`.
2. User reviews service information.
3. User completes the four-step bilingual enquiry form.
4. Server independently validates the submission.
5. Server sends the enquiry to a private operational mailbox through Resend.
6. A cryptographically generated reference ID is shown only after the provider accepts the request.
7. Staff handle the case outside OneStop unless a future ADR explicitly approves case-management functionality.

### Database / admin status

The earlier Postgres/Neon admin prototype has been **removed from the active codebase**.

The following are not part of V1 and must not be silently reintroduced:

- `/admin`
- `lib/db.ts`
- `db/schema.sql`
- `DATABASE_URL`
- `ADMIN_PASSWORD`
- database-backed enquiry persistence
- CSV admin export
- shared-password admin authentication

Any future admin/case-management design requires a new ADR covering authentication, authorization, audit logging, privacy, retention, operational ownership, and rollback.

---

## 3. Current Audit Verdict — 2026-08-13

### Engineering baseline: **PASS for controlled V1 release candidate**

The original 2026-08-12 audit scored 56/100 and identified governance, legacy architecture, form security, testing, CI, and dependency risk. Those major P0 engineering findings have now been remediated.

Current status:

| Area | Current status |
|---|---|
| Governance / canonical docs | PASS |
| Legacy Admin / DB removal | PASS |
| Public form server validation | PASS |
| Secure request ID | PASS |
| Input limits / allowlists / date validation | PASS |
| Honeypot / basic burst protection | PASS WITH LIMITATION |
| Resend timeout / error hygiene | PASS |
| Locked dependencies / `npm ci` | PASS |
| TypeScript gate | PASS |
| ESLint zero-warning gate | PASS |
| Unit tests | PASS |
| Browser E2E | PASS |
| GitHub Actions CI | PASS |
| Vercel Preview gate | PASS |
| Supported Next.js security line | PASS |
| Institutional privacy/retention ownership | PENDING BUSINESS SIGN-OFF |
| Approved production imagery / brand assets | PENDING BUSINESS ASSET APPROVAL |
| Formal V1 owner acceptance | PENDING |

### Important limitation

The current in-memory/IP rate limiter is best-effort and is **not a distributed global rate limit across every Vercel instance**. If abuse risk increases, a Vercel-native or approved distributed control should be introduced in a dedicated security decision.

---

## 4. Non-Negotiable Product Rules

Do not add the following without explicit product approval and a documented ADR:

- user accounts,
- SSO,
- database persistence,
- admin dashboards,
- file uploads,
- sensitive-document storage,
- payment handling,
- automated immigration decisions,
- CRM synchronization,
- AI-generated legal/immigration conclusions,
- analytics containing personal data.

OneStop may organize information and route cases. It must not claim to provide legal or immigration determinations.

---

## 5. Privacy & Security Rules

### Public form

The server is authoritative. Client validation is convenience only.

Required controls, all currently part of the V1 baseline:

- required-field validation,
- controlled-field allowlists,
- strict email validation,
- explicit text-length limits on client and server,
- valid calendar-date checking,
- arrival/departure relationship checking,
- family-count range validation,
- duplicate/invalid service rejection,
- consent validation,
- bot-trap field,
- best-effort burst/rate limiting,
- cryptographically secure request ID,
- Resend timeout,
- user-safe error messages,
- no provider response-body dumps,
- no full enquiry-body logging.

### Sensitive information

The public form must never ask for or accept file uploads of passports, COEs, residence cards, visa scans, bank statements, medical records, or equivalent sensitive documents.

If users send sensitive information in free text or later by email, staff must follow the operational handling rules in `OPERATIONS.md`.

### Secrets

Never commit API keys, mailbox addresses intended to remain private, tokens, passwords, Vercel secrets, or private document URLs. Use environment variables / approved secret storage.

---

## 6. Bilingual & Content Rules

Japanese and English are equal production languages.

Every user-visible change must be checked for:

- meaning parity,
- correct audience,
- navigation parity,
- fee/service claim parity,
- disclaimers,
- form labels and validation copy.

Do not invent or change:

- service eligibility,
- fees,
- payment responsibility,
- response guarantees,
- immigration claims,
- official organization names,
- approved sender/contact identity,
- brand usage,

without owner confirmation.

Content that is intentionally provisional must be clearly identified in documentation and must not be represented as institutionally approved.

---

## 7. Architecture & Dependency Rules

Current approved baseline:

- Next.js 15.5 maintenance/security line
- React 19
- Node.js 22 in CI
- `package-lock.json` committed
- `npm ci` for reproducible CI installs
- Vitest for unit validation tests
- Playwright / Chromium for critical bilingual E2E
- ESLint 9 CLI with `--max-warnings=0`

Framework major upgrades require a dedicated PR and regression review.

New dependencies must be justified and must not be added merely for convenience.

### Styling

Reduce styling entropy. Do not create chains of `*-fix.css`, `*-final.css`, `*-polish2.css`, etc. Prefer reusable components/tokens and deletion of obsolete rules.

### Images

Temporary design-review images are not approved production institutional assets. They must remain visibly identifiable as temporary until approved replacements are supplied and ownership/usage is confirmed.

---

## 8. Testing & CI Merge Gate

Every meaningful PR must pass applicable checks:

1. `npm ci`
2. `npm run typecheck`
3. `npm run lint`
4. `npm test`
5. `npm run build`
6. `npm run test:e2e` for critical user-flow changes
7. Vercel Preview for meaningful UI/routing/form/deployment changes

Current CI also restores the Next.js build cache and disables framework telemetry in CI.

### Merge decisions

Use one of:

- **APPROVE** — safe to merge.
- **APPROVE WITH FOLLOW-UP** — no material release risk; tracked debt remains.
- **REQUEST CHANGES** — material defect/risk must be fixed first.
- **DO NOT MERGE** — architecture/security/spec conflict.

A successful build or Vercel deployment alone is never sufficient for approval.

### Regression rule

Every technically reasonable bug fix must add or update a regression test.

---

## 9. V1 UAT Requirements

Before declaring V1 complete, verify the production domain and/or release-candidate Preview for:

- `/ja` loads correctly,
- `/en` loads correctly,
- all public navigation routes return the expected page,
- language switching works,
- contact form shows four steps in both languages,
- required fields block progress/acceptance correctly,
- host-institution options are correct,
- review-before-submit works,
- sensitive-document warning is visible,
- invalid route returns a usable not-found page,
- mobile layout remains usable,
- no `/admin` route exists,
- Vercel deployment is READY,
- no production runtime error cluster indicates a release blocker.

Real email delivery should be tested intentionally only when the operational mailbox and sender domain are confirmed.

Record UAT evidence in `V1_READINESS.md`.

---

## 10. Operational Readiness

Before institutional/public V1 sign-off, `OPERATIONS.md` must identify or explicitly mark pending:

- product/service owner,
- operational mailbox owner,
- who may access enquiry mail,
- retention period,
- label/archive workflow,
- deletion process,
- misdirected enquiry handling,
- sensitive-information handling,
- incident escalation contact,
- approved Resend sender domain/address,
- production smoke-test procedure,
- rollback procedure.

Unknown organizational policy must be marked **PENDING OWNER DECISION** rather than guessed.

---

## 11. AI Agent Rules

AI agents MUST:

1. Read `AGENTS.md` and `DECISIONS.md` first.
2. Inspect the actual implementation before changing architecture.
3. Preserve approved business behavior unless explicitly instructed otherwise.
4. Never invent university, privacy, legal, fee, retention, or brand policy.
5. Prefer small reversible changes.
6. Add/update tests for behavior changes.
7. Preserve Japanese/English parity.
8. Never expose secrets.
9. Never silently reactivate DB/Admin behavior.
10. Report unresolved business decisions as explicit blockers or follow-ups.

AI agents MUST NOT weaken validation or CI merely to make a build pass.

---

## 12. Definition of Done

A feature is done only when:

- behavior matches approved specification,
- bilingual impact is reviewed,
- security/privacy impact is understood,
- validation exists where applicable,
- tests cover key behavior,
- CI is Green,
- Vercel evidence exists where applicable,
- no secrets/sensitive data leak,
- error and mobile states are usable,
- documentation is updated,
- rollback is understood.

---

## 13. Roadmap Status

### Completed engineering baseline

- [x] Canonical `AGENTS.md`
- [x] `DECISIONS.md`
- [x] Close superseded PRs #2, #6, #15
- [x] Remove legacy Admin/Postgres/Neon architecture
- [x] Harden public enquiry form
- [x] Secure request IDs
- [x] Add bot trap and best-effort rate limiting
- [x] Add provider timeout and privacy-safe errors/logging
- [x] Add Vitest baseline
- [x] Add explicit typecheck
- [x] Add GitHub Actions quality gate
- [x] Commit dependency lockfile and use `npm ci`
- [x] Add Playwright E2E
- [x] Upgrade to supported Next.js 15.5 security line
- [x] Modernize ESLint/Node/Actions and reduce CI warnings
- [x] Add Next.js build caching in CI

### V1 release-readiness work

- [x] Synchronize canonical documentation with current code baseline
- [x] Perform production-route UAT / release audit and record findings
- [x] Perform business-copy risk review and record owner-sign-off items
- [ ] Replace temporary imagery with approved institutional assets — **PENDING APPROVED ASSETS**
- [x] Document privacy/retention/operational checklist with unknown policy marked pending
- [ ] Obtain owner sign-off on business content, sender identity, retention, and imagery
- [ ] Issue final V1 COMPLETE decision after the owner-sign-off blockers are cleared

---

## 14. Canonical Document Order

1. `AGENTS.md` — governing specification
2. `DECISIONS.md` — approved architecture/product decisions
3. `OPERATIONS.md` — production operations/privacy checklist
4. `V1_READINESS.md` — UAT/release evidence and remaining blockers
5. `README.md` — practical project overview
6. current implementation on `main`

Historical PRs, obsolete branches, and old comments are context only and do not override this baseline.
