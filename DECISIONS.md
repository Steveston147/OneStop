# OneStop — Architecture & Product Decisions

> Status: Canonical decision log. Read together with `AGENTS.md`.

## ADR-001 — Canonical production architecture

Approved baseline: Next.js App Router, TypeScript/React/Tailwind, Vercel, Resend, Japanese/English public site, email-based enquiry intake, no enquiry database, no production admin dashboard, and no sensitive-document upload.

## ADR-002 — Legacy database/admin removed

The earlier Postgres/Neon admin prototype and shared-password admin model are not part of the approved product and have been removed. Reintroduction requires a new explicit ADR covering security, privacy, operations, and rollback.

## ADR-003 — PR #2

DO NOT MERGE / CLOSED AS SUPERSEDED. It represented the obsolete database/admin architecture.

## ADR-004 — PR #6

CLOSED AS SUPERSEDED BY MAIN. Its reusable routing/content direction is represented in later main code; the old branch is historical only.

## ADR-005 — PR #15

DO NOT MERGE / CLOSED AS SUPERSEDED. It increased CSS override complexity and bilingual regression risk.

## ADR-006 — Main is the single implementation baseline

Old PR branches, comments, and prototypes are historical context only.

## ADR-007 — Vercel usage

Vercel is the primary deployment and preview platform. Pro Preview Deployments should be used actively. A Vercel success result is evidence, not by itself merge approval.

## ADR-008 — Public form hardening

Implemented V1 baseline: secure request IDs, server-side allowlists/validation, email and length checks, date/numeric validation, consent, honeypot, best-effort burst limiting, Resend timeout, and privacy-safe errors/logging.

The current in-memory limiter is a documented V1 limitation and is not global distributed protection.

## ADR-009 — Reproducible CI / regression baseline

Required engineering gate: committed lockfile, `npm ci`, typecheck, ESLint zero-warning, Vitest, production build, Playwright E2E, and Vercel Preview where applicable.

## ADR-010 — Supported toolchain

OneStop uses Next.js 15.5 maintenance/security line, React 19, Node.js 22 in CI, and ESLint 9 CLI. Major framework upgrades require dedicated tested PRs.

## ADR-011 — Release candidate vs institutional V1

Core engineering remediation is sufficient for a controlled release candidate. Institutional V1 completion additionally requires owner approval of public wording, product/mailbox ownership, retention/deletion/incident handling, approved sender identity, approved institutional imagery, and final human UAT.

Unknown organisational policy must be recorded as pending rather than invented.

## ADR-012 — Temporary imagery

Current Pexels images are design-review placeholders. Searches of the connected Drive did not identify an approved production image set suitable for automatic substitution. Arbitrary web images must not be represented as approved institutional assets.

## ADR-013 — V1 readiness record

`V1_READINESS.md` is the canonical record for production UAT, business-content review, operational/privacy/retention decisions, smoke-test/rollback principles, and final release blockers.

## ADR-014 — English document-language declaration

Production UAT found that English visible content is currently delivered under a root document marked as Japanese. This is an open accessibility correctness item and must be fixed with regression coverage before V1 COMPLETE.

## Decision precedence

1. `AGENTS.md`
2. `DECISIONS.md`
3. `V1_READINESS.md`
4. `README.md`
5. current implementation on `main`
