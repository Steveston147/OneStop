# OneStop — Architecture & Product Decisions

> Status: Canonical decision log
>
> This file records approved architecture/product decisions that define the OneStop baseline. It must be read together with `AGENTS.md`.

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
**Status:** Approved / Deprecated

The earlier Postgres-backed admin prototype (`/admin`, `lib/db.ts`, `db/schema.sql`, `ADMIN_PASSWORD`, `DATABASE_URL`) is not part of the approved production baseline.

It must not be reactivated, extended, or connected to the public enquiry flow without a new approved ADR covering authentication, authorization, audit logging, privacy, retention, and operational ownership.

Target direction: isolate and then remove legacy admin/database code after confirming no production dependency remains.

## ADR-003 — PR #2 disposition

**PR:** #2 — Add bilingual Next.js MVP site with request form, admin dashboard, and Postgres backend  
**Decision:** DO NOT MERGE / CLOSE AS SUPERSEDED

Reasons:

1. It represents the obsolete DB-backed/admin architecture.
2. Its shared-password admin model is not acceptable for production institutional use.
3. The current main branch has moved to an email-based enquiry architecture.
4. Merging it would reintroduce deprecated scope and create conflicting product models.

Useful historical work may be consulted for reference only; code must not be revived wholesale.

## ADR-004 — PR #6 disposition

**PR:** #6 — Refactor one-stop content into reusable module and update routing/navigation  
**Decision:** CLOSE AS SUPERSEDED BY MAIN

Reasons:

1. Its central idea—route-based pages and reusable `oneStopContent` architecture—is already represented in current main.
2. Current main contains later bilingual page metadata, hero details, route handling, and content/component evolution beyond the PR head.
3. The PR is no longer mergeable cleanly and merging an older branch would risk rollback or conflict.

The architectural direction of #6 is accepted; the PR branch itself is obsolete.

## ADR-005 — PR #15 disposition

**PR:** #15 — Lighten Japanese page headers and pastel UI  
**Decision:** DO NOT MERGE / CLOSE AS SUPERSEDED

Reasons:

1. Current main has already evolved the visual system through later shared CSS and page-hero work.
2. The PR introduces another large phase-specific override stylesheet, conflicting with the styling-governance rule to reduce CSS override layers.
3. It contains hard-coded Japanese CTA labels (`相談する`, `トップへ戻る`) in a shared bilingual route component, creating English-page regression risk.
4. It was not locally tested and relies on visual preview confirmation only.
5. Merging it now would increase styling entropy rather than consolidate the codebase.

Desired visual ideas may be reimplemented later as small, bilingual, tested changes against the current baseline.

## ADR-006 — Main is the single baseline after PR cleanup

**Date:** 2026-08-13  
**Status:** Approved

After closing PRs #2, #6, and #15, `main` plus the canonical documents below define the only approved development baseline:

1. `AGENTS.md` — governing specification and AI/developer rules
2. `DECISIONS.md` — approved architecture/product decisions
3. `README.md` — operational/project overview, subordinate to the two documents above
4. current code on `main`

Old PR branches, comments, prototypes, and previous implementation descriptions are historical context only and must not override the canonical baseline.

## ADR-007 — Vercel usage policy

**Date:** 2026-08-13  
**Status:** Approved

Vercel is the primary deployment and preview platform for OneStop. Since the project has Vercel Pro available, development should make active use of Preview Deployments for meaningful UI, routing, form, and integration changes.

However, a successful Vercel deployment is not sufficient evidence for merge approval. The required merge evidence remains:

- lint
- type-check
- automated tests appropriate to the change
- production build
- bilingual review where applicable
- security/privacy review for form/data/auth changes
- Vercel Preview smoke test for user-visible changes

Preview environments must not expose production secrets or real sensitive applicant data unnecessarily.

## Decision precedence

If a future PR conflicts with this file or `AGENTS.md`, the PR must be changed unless a new explicit approved decision supersedes the relevant ADR.
