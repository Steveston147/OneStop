# OneStop — Canonical Development & Audit Specification

> Status: **Canonical / Governing document**
>
> This document is the primary specification for all future human and AI-assisted development in this repository. If implementation, PR text, comments, legacy code, or older documentation conflicts with this file, **this file takes precedence unless an explicit approved decision updates it**.

---

## 1. Purpose

OneStop is an internal/public-facing international support intake system for Creotech / Ritsumeikan-related users.

Its purpose is to provide a reliable bilingual entry point for international faculty, researchers, guests, accompanying family members, and host-side staff to request support, while keeping operations safe, understandable, maintainable, and suitable for institutional use.

The system must prioritize:

1. Correctness over feature count.
2. Privacy and operational safety over convenience.
3. Clear ownership and traceability over hidden automation.
4. Maintainability over one-off implementation speed.
5. Explicit human decisions over AI assumptions.

---

## 2. Current Product Decision

### 2.1 Current production model

The **current approved MVP is email-based enquiry intake**.

Public enquiry flow:

1. User opens `/ja` or `/en`.
2. User reviews service information.
3. User completes the bilingual enquiry form.
4. Server validates required inputs and consent.
5. Server sends the enquiry to a private operational mailbox.
6. User receives a generated reference ID on screen.
7. Staff handle the case outside the web application unless a separately approved workflow is introduced.

### 2.2 Database/admin status

The repository contains a **legacy Postgres-backed admin prototype**.

Until explicitly re-approved:

- `/admin` is **legacy / non-canonical**.
- `lib/db.ts` is **legacy / non-canonical**.
- `db/schema.sql` is **legacy / non-canonical**.
- database-backed request persistence is **not part of the approved production MVP**.
- future AI changes must not silently reconnect the public enquiry form to Postgres.
- future AI changes must not expand the admin feature set without an approved architecture decision.

The legacy code may remain temporarily for reference, but it must be treated as deprecated and isolated.

---

## 3. Audit Verdict — 2026-08-12

### Overall score: **56 / 100 — NOT YET APPROVED FOR MISSION-CRITICAL BUSINESS USE**

The current site is a credible prototype/MVP and has a sensible public enquiry concept, but governance, security boundaries, test coverage, and legacy isolation are not yet strong enough for institutional operational dependence.

### Category scores

| Area | Score | Verdict |
|---|---:|---|
| Product purpose / UX direction | 78 | Good foundation |
| Code organisation | 62 | Usable but duplicated / legacy-heavy |
| Security | 48 | Needs remediation before admin use |
| Privacy / data governance | 52 | Principles visible, operational rules incomplete |
| Reliability / error handling | 58 | Basic handling exists, production controls incomplete |
| Testing / CI | 28 | Major weakness |
| Maintainability | 55 | Significant CSS/content and legacy complexity |
| AI-change safety | 35 | No prior canonical guardrails |
| Deployment readiness | 64 | Public MVP plausible, institutional production controls incomplete |
| Documentation / governance | 42 | README exists but was insufficient as a governing specification |

### Release classification

- **Public informational pages:** CONDITIONAL PASS
- **Public enquiry form:** CONDITIONAL PASS after security/privacy hardening
- **Legacy admin dashboard:** FAIL / DO NOT USE FOR PRODUCTION
- **Database-backed case management:** FAIL / NOT APPROVED
- **Institutional mission-critical use:** FAIL until Phase 0 and Phase 1 below are completed

---

## 4. Non-Negotiable Rules

All future developers and AI agents MUST follow these rules.

### 4.1 No silent scope expansion

Do not add:

- user accounts,
- SSO,
- database persistence,
- file uploads,
- passport/COE/document storage,
- payment handling,
- automated immigration decisions,
- external CRM synchronization,
- AI-generated immigration/legal advice,
- admin dashboards,
- analytics containing personal data,

unless the change is explicitly approved and documented.

### 4.2 Sensitive documents

The public form must never request or accept passport images, residence cards, COE documents, visa scans, bank statements, medical documents, or equivalent sensitive files.

If future secure document transfer is required, it must be designed as a separate approved system with authentication, access control, retention policy, deletion policy, audit logs, and security review.

### 4.3 Immigration guidance

OneStop may provide operational guidance and routing information but must not present automated output as legal or immigration advice.

Where legal interpretation is required, wording must clearly direct the user to the appropriate qualified/institutional authority.

### 4.4 Human control

The application supports staff decisions. It must not make irreversible operational decisions automatically.

### 4.5 Bilingual parity

Japanese and English are equal production languages.

A change to one language must be reviewed for the other language unless the feature is intentionally language-specific and documented.

### 4.6 No secrets in repository

Never commit:

- API keys,
- passwords,
- private email addresses intended to remain confidential,
- database credentials,
- auth tokens,
- Vercel secrets,
- private document URLs.

Use environment variables or approved secret storage.

---

## 5. Security Requirements

### 5.1 Public enquiry endpoint

Before full production approval, the enquiry submission must have:

- server-side schema validation,
- strict email validation,
- input length limits,
- enum allowlists for controlled fields,
- date validation,
- safe normalization,
- anti-spam / rate limiting,
- bot mitigation appropriate to operational risk,
- timeout handling for Resend,
- no leakage of provider/API error details to users,
- structured server-side logging without sensitive body dumps.

### 5.2 Request IDs

Request IDs are convenience references, not authentication tokens.

They must never grant access to private information.

Generation should use a cryptographically secure random source rather than `Math.random()` before the identifier is relied on operationally.

### 5.3 Admin authentication

The current legacy implementation derives a reusable cookie token directly from `ADMIN_PASSWORD`.

This design is **not approved for production**.

If admin functionality is revived, minimum acceptable design is:

- institutional SSO or a mature authentication provider preferred,
- named user identities,
- role-based access,
- short-lived sessions,
- CSRF-safe mutations,
- brute-force protection,
- logout/session revocation,
- audit logging,
- no shared password as the long-term production model.

### 5.4 Authorization

Authentication alone is not sufficient.

Every administrative read, export, update, and delete operation must enforce authorization server-side.

### 5.5 CSV export

If CSV export remains in any future admin system:

- access must be authenticated and authorized,
- exported fields must be explicitly allowlisted,
- spreadsheet formula injection must be neutralized,
- export actions should be auditable,
- retention and local-storage handling must be documented.

---

## 6. Privacy & Data Governance

Before institutional production use, the product owner must approve a documented data lifecycle covering:

1. What personal data is collected.
2. Why each field is necessary.
3. Legal/organizational basis for handling it.
4. Who receives enquiry emails.
5. Where email data is stored.
6. Who may access it.
7. Retention period.
8. Deletion process.
9. Escalation process for misdirected or sensitive submissions.
10. Incident response contact.

### Data minimization

Every field must have a business purpose.

Do not add a field merely because it "may be useful later".

### Logging

Do not log full enquiry bodies, passport numbers, visa identifiers, or other sensitive values to application logs.

---

## 7. Architecture Rules

### 7.1 Approved stack

Current approved baseline:

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- Vercel
- Resend for server-side enquiry email delivery

A framework or major-version migration requires a dedicated PR and regression review.

### 7.2 Dependency policy

New dependencies must be justified.

Before adding a dependency, confirm:

- existing platform APIs cannot reasonably solve the problem,
- package is actively maintained,
- package does not create unnecessary client bundle size,
- package does not introduce avoidable security/data-processing risk.

### 7.3 Legacy isolation

Legacy admin/database code must not be imported by the public enquiry path.

Target state:

- clearly mark legacy folders/files,
- preferably remove them after archival confirmation,
- remove unused DB dependencies after legacy removal,
- keep production architecture single-purpose.

### 7.4 Content architecture

Avoid multiple competing content sources.

There must be one clearly defined canonical content layer for bilingual site copy.

Do not duplicate the same user-facing text across large components unless necessary.

### 7.5 Styling

The repository currently contains multiple large phase-specific CSS files and a large global stylesheet.

Future work should reduce styling entropy rather than add another override layer.

Do not create `*-fix.css`, `*-final.css`, `*-polish2.css`, or similar cascading patch files as a normal development method.

Prefer:

- shared tokens,
- reusable components,
- scoped styles,
- deliberate deletion of obsolete CSS.

---

## 8. Form Contract

The enquiry form is a business contract between UI and server.

### Required fields

At minimum, current required fields include:

- preferred language,
- applicant category,
- host institution,
- full name,
- email,
- at least one requested service,
- consent.

### Server authority

Client validation is convenience only.

The server must independently validate every submitted value.

### Controlled values

Fields represented by UI options must be allowlisted server-side. Never trust arbitrary browser-posted strings.

### Length limits

All free-text fields must have explicit maximum lengths on both client and server.

### Email header safety

User-supplied values used in subject, reply-to, or other email metadata must be validated and normalized against header injection and malformed address input.

### Confirmation

A successful confirmation screen must only appear after the email provider accepts the request.

Do not claim successful receipt if delivery failed.

---

## 9. Error Handling

User-facing errors must:

- explain what the user can do next,
- avoid raw stack traces,
- avoid infrastructure names where unnecessary,
- avoid exposing API response bodies or secret configuration.

Operational logs may contain technical diagnostics but must avoid sensitive form payloads.

External API calls must define reasonable timeouts and failure behavior.

---

## 10. Accessibility & UX Requirements

Production pages should meet WCAG 2.1 AA as the minimum practical target.

Required checks include:

- keyboard navigation,
- visible focus,
- semantic headings,
- proper labels,
- form error association,
- sufficient color contrast,
- responsive layout,
- readable Japanese and English typography,
- no essential interaction dependent on hover only.

The enquiry form must preserve entered values when recoverable validation errors occur.

---

## 11. Testing Policy

### Current audit finding

The project relies too heavily on build/manual checking. This is not sufficient for a business workflow.

### Mandatory test layers

Before production-grade approval, add:

#### Unit tests

Cover at least:

- validation,
- localization helpers,
- request ID generation,
- date handling,
- email payload construction,
- unsafe input escaping.

#### Integration tests

Cover at least:

- valid enquiry submission,
- missing required fields,
- malformed email,
- invalid enum values,
- missing consent,
- provider failure,
- rate limit behavior.

#### End-to-end tests

Cover at least:

- `/ja` journey,
- `/en` journey,
- mobile form journey,
- review screen,
- confirmation screen,
- broken/invalid route handling.

### Regression rule

Every bug fix must include a regression test when technically reasonable.

---

## 12. CI / Merge Gate

No PR may be considered merge-ready unless the applicable checks pass.

Minimum target CI:

1. install with locked dependencies,
2. lint,
3. TypeScript type-check,
4. unit/integration tests,
5. production build,
6. dependency/security scan,
7. E2E smoke test for critical paths when feasible.

### Merge decision

Use one of these outcomes:

- **APPROVE** — safe to merge.
- **APPROVE WITH FOLLOW-UP** — no material release risk; tracked debt exists.
- **REQUEST CHANGES** — material defect/risk must be fixed first.
- **DO NOT MERGE** — architecture/security/spec conflict.

AI must never approve its own PR solely because the build succeeds.

---

## 13. PR Requirements

Every non-trivial PR must state:

- Problem being solved.
- Scope.
- Explicit non-scope.
- User-visible changes.
- Data/security impact.
- Test evidence.
- Deployment/configuration impact.
- Rollback method.

For changes touching forms, auth, data, exports, email, or infrastructure, include a specific security/privacy note.

---

## 14. AI Agent Rules

AI agents working on this repository MUST:

1. Read this file before making changes.
2. Inspect the actual implementation before proposing architecture changes.
3. Preserve current approved business behavior unless instructed otherwise.
4. Never infer legal, privacy, or university policy.
5. Ask for or document unresolved business decisions rather than fabricate them.
6. Prefer small reversible changes.
7. Avoid broad refactors mixed with feature work.
8. Add or update tests with behavior changes.
9. Never expose secrets.
10. Never reactivate legacy admin/database behavior silently.
11. Never alter Japanese/English meaning casually.
12. Report uncertainty and risk explicitly.

### Forbidden AI behavior

AI must not:

- redesign architecture because it is "cleaner" without approval,
- replace libraries across the project incidentally,
- delete working business logic without evidence,
- change fee/legal/service claims without owner approval,
- add tracking/analytics automatically,
- add user data collection automatically,
- weaken validation to make tests pass,
- bypass CI or security checks,
- declare production-ready based only on visual appearance.

---

## 15. Definition of Done

A feature is done only when:

- behavior matches approved specification,
- Japanese and English are reviewed where applicable,
- server validation exists,
- security/privacy impact is understood,
- tests cover key behavior,
- lint/type-check/build pass,
- no new secrets or sensitive data leak,
- error states are usable,
- mobile behavior is checked,
- documentation is updated,
- rollout/rollback is understood.

---

## 16. Required Remediation Roadmap

### Phase 0 — Governance freeze (P0)

Complete before significant new feature development.

- [x] Add canonical governing specification (`AGENTS.md`).
- [ ] Decide whether legacy admin/database functionality will be permanently removed or rebuilt later.
- [ ] Mark legacy code explicitly or remove it.
- [ ] Create `DECISIONS.md` for architecture/product decisions.
- [ ] Add PR template with test/security/privacy fields.
- [ ] Define production owner and operational mailbox owner.

### Phase 1 — Public form hardening (P0)

- [ ] Replace `Math.random()` request ID entropy with secure randomness.
- [ ] Add schema-based server validation.
- [ ] Add strict email validation.
- [ ] Add field length limits.
- [ ] Add enum allowlists.
- [ ] Validate date relationships and numeric fields.
- [ ] Add rate limiting / anti-spam control.
- [ ] Add external API timeout.
- [ ] Ensure provider error bodies are not exposed to users/logged unsafely.
- [ ] Add structured, privacy-safe operational logging.

### Phase 2 — Test baseline (P0)

- [ ] Introduce test framework.
- [ ] Add validation unit tests.
- [ ] Add submission integration tests.
- [ ] Add bilingual critical-path E2E tests.
- [ ] Add explicit `typecheck` script.
- [ ] Establish CI merge gate.

### Phase 3 — Codebase simplification (P1)

- [ ] Consolidate bilingual content architecture.
- [ ] Reduce large/overlapping CSS override files.
- [ ] Remove unused DB package if admin legacy is removed.
- [ ] Remove dead code/assets.
- [ ] Upgrade dependencies in a dedicated tested PR.

### Phase 4 — Institutional readiness (P1)

- [ ] Document privacy/data-retention policy.
- [ ] Document incident handling.
- [ ] Confirm accessibility baseline.
- [ ] Confirm approved organisation sender domain.
- [ ] Define mailbox retention/label/deletion workflow.
- [ ] Create production smoke-test checklist.
- [ ] Create rollback procedure.

### Phase 5 — Optional case-management system (P2, separate project decision)

Only if business need is approved:

- [ ] Decide build vs existing institutional tool.
- [ ] Design named-user authentication/SSO.
- [ ] Define roles and permissions.
- [ ] Define audit log.
- [ ] Define record retention/deletion.
- [ ] Define secure document transfer separately.
- [ ] Conduct security/privacy review before implementation.

---

## 17. Known Audit Findings

### P0 / Critical-to-high priority

1. **Legacy admin auth is not production-grade.** Shared password + deterministic password-derived cookie token is insufficient for institutional case management.
2. **No automated test suite is visible in package scripts.** Build success is not enough to protect business behavior.
3. **Server-side form validation is incomplete.** Presence checks exist, but strong type/schema/enum/length/email/date validation is required.
4. **No visible anti-spam/rate-limit layer.** Public email endpoint can be abused.
5. **Legacy DB/admin and email-only MVP coexist.** This creates architecture ambiguity and AI-change risk.

### P1 / Significant

6. Request IDs currently rely on non-cryptographic randomness in the public email flow.
7. Styling is spread across multiple large phase/polish CSS files, increasing regression risk.
8. Content is split across large code/content modules, creating drift risk.
9. No clear formal data retention/deletion policy is encoded in project governance.
10. No formal CI merge gate is documented in the repository.

### P2 / Improvement

11. Repository metadata lacks a clear description/license decision.
12. Branch/merge governance should be tightened for production work.
13. Dependency lifecycle/upgrade policy was previously undefined.

---

## 18. Production Approval Checklist

OneStop must not be labelled "production-ready for institutional operational dependence" until all P0 items are complete.

Final approval should verify:

- [ ] Canonical specification current.
- [ ] No unapproved legacy path active.
- [ ] Security P0 complete.
- [ ] Privacy/data lifecycle approved.
- [ ] Automated tests pass.
- [ ] CI passes.
- [ ] Bilingual smoke test passes.
- [ ] Mobile smoke test passes.
- [ ] Mail delivery verified with approved sender.
- [ ] Error/failure behavior tested.
- [ ] Rollback path documented.
- [ ] Human operational owner identified.

---

## 19. Decision Hierarchy

When documents disagree, use this order:

1. Explicit current owner instruction / approved decision.
2. `AGENTS.md` (this document).
3. `DECISIONS.md` once created.
4. Current product-specific specifications.
5. README.
6. PR descriptions/comments.
7. Existing code behavior.
8. AI assumptions — never authoritative.

---

## 20. Final Principle

**OneStop is a business support system, not a coding experiment.**

A change is valuable only when it makes the service safer, clearer, more reliable, or easier to operate.

When speed and safety conflict, choose safety.
When cleverness and maintainability conflict, choose maintainability.
When automation and human accountability conflict, preserve human accountability.
