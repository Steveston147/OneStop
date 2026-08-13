# OneStop — Architecture & Product Decisions

> Status: Canonical decision log
>
> Read together with `AGENTS.md`. A future PR that conflicts with either document must be changed unless a new explicit approved decision supersedes the relevant rule.

## ADR-001 — Canonical production architecture

**Date:** 2026-08-13  
**Status:** Approved

The approved production baseline is:

- Next.js App Router
- TypeScript / React
- Tailwind CSS
- Vercel deployment
- Resend for server-side enquiry email delivery
- bilingual Japanese / English public site
- email-based enquiry intake
- no production database persistence for enquiries
- no production admin dashboard
- no passport / COE / sensitive-document upload

The public enquiry form sends initial enquiry data to a private operational mailbox. Staff workflow continues outside OneStop unless a future architecture decision explicitly approves a case-management system.

## ADR-002 — Legacy Postgres/Admin prototype is non-canonical

**Date:** 2026-08-13  
**Status:** Approved / Removed from active code

The earlier Postgres-backed admin prototype (`/admin`, `lib/db.ts`, `db/schema.sql`, `ADMIN_PASSWORD`, `DATABASE_URL`) is not part of the approved production baseline and has been physically removed from the active codebase.

It must not be reactivated, extended, or connected to the public enquiry flow without a new approved ADR covering authentication, authorization, audit logging, privacy, retention, operational ownership, and rollback.

## ADR-003 — PR #2 disposition

**PR:** #2 — Add bilingual Next.js MVP site with request form, admin dashboard, and Postgres backend  
**Decision:** DO NOT MERGE / CLOSED AS SUPERSEDED

Reasons:

1. It represented the obsolete DB-backed/admin architecture.
2. Its shared-password admin model was not acceptable for production institutional use.
3. Main moved to an email-based enquiry architecture.
4. Merging it would have reintroduced deprecated scope.

## ADR-004 — PR #6 disposition

**PR:** #6 — Refactor one-stop content into reusable module and update routing/navigation  
**Decision:** CLOSED AS SUPERSEDED BY MAIN

Its central route/content direction was accepted, but current main evolved beyond that branch. The old branch is historical reference only.

## ADR-005 — PR #15 disposition

**PR:** #15 — Lighten Japanese page headers and pastel UI  
**Decision:** DO NOT MERGE / CLOSED AS SUPERSEDED

Reasons included additional CSS override entropy and hard-coded Japanese CTA labels in shared bilingual code.

## ADR-006 — Main is the single baseline after PR cleanup

**Date:** 2026-08-13  
**Status:** Approved

Canonical order is defined in `AGENTS.md`. Old PR branches, comments, prototypes, and previous implementation descriptions are historical context only.

## ADR-007 — Vercel usage policy

**Date:** 2026-08-13  
**Status:** Approved

Vercel is the primary deployment and preview platform. Vercel Pro Preview Deployments should be used actively for meaningful UI, routing, form, and integration changes.

A successful Vercel deployment is evidence, not by itself merge approval. Required evidence also includes typecheck, lint, automated tests, production build, bilingual review where applicable, and security/privacy review for form/data/auth changes.

## ADR-008 — Public form hardening baseline

**Date:** 2026-08-13  
**Status:** Approved / Implemented

The V1 public form baseline includes:

- cryptographically secure request IDs,
- server-side allowlists and validation,
- strict email validation,
- text-length limits on client and server,
- semantic date and numeric validation,
- consent validation,
- hidden honeypot,
- best-effort per-IP burst/rate limiting,
- 10-second Resend timeout,
- privacy-safe error/log behavior.

The in-memory limiter is explicitly accepted as a V1 limitation and is not represented as globally distributed protection.

## ADR-009 — Reproducible CI and automated regression baseline

**Date:** 2026-08-13  
**Status:** Approved / Implemented

The required V1 engineering gate is:

- committed `package-lock.json`,
- `npm ci`,
- TypeScript `tsc --noEmit`,
- ESLint CLI with zero-warning policy,
- Vitest unit tests,
- production build,
- Playwright Chromium E2E,
- Vercel Preview for applicable changes.

Merge approval must not bypass these checks.

## ADR-010 — Supported framework/toolchain baseline

**Date:** 2026-08-13  
**Status:** Approved / Implemented

OneStop moved from unsupported Next.js 14 to the supported Next.js 15.5 security/maintenance line and React 19. CI uses Node.js 22. ESLint uses the ESLint 9 CLI/flat-config path rather than deprecated `next lint`.

Framework major upgrades must remain dedicated, tested PRs.

## ADR-011 — V1 release is an engineering-complete release candidate, not yet institutional final

**Date:** 2026-08-13  
**Status:** Approved

The core engineering remediation is considered complete enough for a controlled V1 release candidate.

Final institutional V1 completion is intentionally separated from engineering completion. It requires owner confirmation of:

- public service/fee/contact wording,
- official product/service owner,
- operational mailbox owner/access group,
- retention/archive/deletion handling,
- incident/sensitive-information escalation,
- approved Resend sender domain/address,
- approved institutional image assets,
- final owner UAT acceptance.

Unknown organizational policy must be documented as pending; it must not be invented by AI or code.

## ADR-012 — Temporary imagery must not be silently treated as approved brand assets

**Date:** 2026-08-13  
**Status:** Approved

Current Pexels images are design-review placeholders. Searches of the connected project Drive did not identify an approved institutional image set suitable for silent substitution.

Therefore:

- temporary images remain explicitly marked as samples,
- they are not considered a V1 institutional-approval pass,
- replacement requires an approved source/asset set,
- no AI agent may scrape or substitute arbitrary Ritsumeikan/Creotech imagery and represent it as approved.

## ADR-013 — UAT evidence and operational readiness documents are canonical release artifacts

**Date:** 2026-08-13  
**Status:** Approved

`V1_READINESS.md` records production-route/UAT evidence and release blockers. `OPERATIONS.md` records operational, privacy, retention, incident, sender, smoke-test, and rollback responsibilities.

These documents are part of V1 Definition of Done and must be updated when related decisions change.

## Decision precedence

Current precedence:

1. `AGENTS.md`
2. `DECISIONS.md`
3. `OPERATIONS.md`
4. `V1_READINESS.md`
5. `README.md`
6. current implementation on `main`

A future ADR may explicitly supersede an earlier decision.
