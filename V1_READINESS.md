# OneStop V1 Readiness

Updated: 2026-08-13.

This file records UAT evidence, business-content review, operating decisions, and remaining release blockers.

## Release judgement

**Current judgement: ENGINEERING RELEASE CANDIDATE / NOT YET INSTITUTIONAL V1 COMPLETE.**

Core engineering controls are in place. Final institutional completion still requires owner decisions and approved production assets.

## Production UAT evidence

Production alias checked: `https://one-stop-rho.vercel.app`

- `/ja` — 200 OK; Japanese home content and navigation present.
- `/en` — 200 OK; English home content and navigation present.
- `/ja/fees` — 200 OK; fee categories render without invented fixed prices.
- `/ja/contact` — 200 OK; four-step form, host-institution choices, sensitive-document warning, and honeypot present.
- `/admin` — 404; legacy admin is not an application route.
- `/en/does-not-exist` — 404; invalid route is rejected.
- `/robots.txt` — currently 404. Historical Vercel runtime errors showed older requests to this path being misrouted, but the current deployment has no runtime error group in the most recent 3-hour check.

### UAT finding — document language

The English route currently returns English visible content but the root HTML element is still emitted as `lang="ja"`. This is an accessibility/SEO correctness issue.

**Status: OPEN V1 TECHNICAL FOLLOW-UP.** A code change is required so the document/content language matches the active route. This should receive a regression test before final V1 completion.

## Runtime health

Vercel runtime-error check:

- 7-day view contained an older error group associated with `/robots.txt` and a previous deployment.
- a focused recent 3-hour check returned **no runtime errors** for the current production period.

The historical group should be monitored but is not treated as proof of a current production failure.

## Business-content review

The current site makes these substantive claims and they require owner approval before institutional V1 sign-off:

- service name/branding: `Creotech Global Welcome` and `Ritsumeikan Academy × Creotech` presentation,
- audience: Ritsumeikan University, APU, affiliated schools, international faculty/researchers/guests/families and host offices,
- support areas: COE/visa guidance, accommodation, flights/arrival, settling-in support, and short-term guest support,
- operating identity shown in the footer,
- fee/payment descriptions,
- no guarantee of COE/visa approval, bookings, or contracts.

### Fee review

The current public fee page uses categories rather than numerical public prices. It states case-by-case confirmation/quotation and identifies possible visitor or host-office cost responsibility. This is safer than publishing invented amounts, but the wording still requires business-owner sign-off.

### Contact / response commitment

The current site does not promise a fixed response time. No service-level promise should be added without owner approval.

### Data-minimization owner check

The form currently contains optional `current country` and `nationality` fields. Before final institutional approval, the owner should confirm that both are necessary at the initial-enquiry stage.

## Production image status

Current Pexels images are clearly marked as design/sample imagery.

Searches of the connected Google Drive for Creotech/Ritsumeikan-approved photo/logo assets did not identify an approved production image set suitable for automatic substitution.

**Status: BLOCKED ON APPROVED ASSETS.**

Do not silently scrape or substitute arbitrary web imagery and represent it as official institutional material. Approved assets should be provided or identified by the brand/content owner, then replaced in a dedicated tested PR.

## Operational / privacy decisions

OneStop itself does not persist enquiries in a database; the receiving mailbox becomes the operational system holding submitted enquiry data.

The following must be confirmed by the responsible owner before institutional V1 completion:

- product/service owner — **PENDING OWNER DECISION**
- operational mailbox owner — **PENDING OWNER DECISION**
- authorized mailbox access group — **PENDING OWNER DECISION**
- retention/archive/deletion period — **PENDING OWNER DECISION**
- deletion-request handling — **PENDING OWNER DECISION**
- misdirected/sensitive-information escalation — **PENDING OWNER DECISION**
- privacy/incident escalation contact — **PENDING OWNER DECISION**
- approved Resend organisational sender domain/address — **PENDING OWNER DECISION / CONFIGURATION**
- business-content approver — **PENDING OWNER DECISION**
- brand/image approver — **PENDING OWNER DECISION**

Unknown organisational policy must not be guessed by AI or encoded as fact.

## Sensitive-information operating rule

The public form must not request file uploads of passports, COEs, residence cards, visa scans, banking documents, medical records, or equivalent sensitive documents.

If a user nevertheless places sensitive material in free text or later email, staff should avoid copying it into GitHub, Vercel comments, analytics, or other unnecessary systems and follow the organisation's approved handling/deletion process once confirmed.

## Production smoke-test checklist

After a production release:

- [ ] Vercel deployment is READY.
- [ ] GitHub Actions is Green.
- [ ] `/ja` loads.
- [ ] `/en` loads.
- [ ] language switching works.
- [ ] Japanese and English contact flows work.
- [ ] sensitive-document warning is visible.
- [ ] `/admin` remains unavailable.
- [ ] invalid route returns 404.
- [ ] recent Vercel runtime errors contain no release blocker.
- [ ] real email receipt is tested only after mailbox/sender approval.

## Rollback principle

If a production release introduces a material problem, return to the last known-good Vercel deployment or revert the responsible Git change, then re-run CI and the production smoke test. Any privacy/delivery incident should be escalated to the approved owner once that role is confirmed.

## Final V1 blockers

- [ ] Correct the English route document-language declaration and add regression coverage.
- [ ] Obtain business-owner approval of service/audience/fee/contact wording.
- [ ] Confirm product and mailbox ownership.
- [ ] Confirm retention/archive/deletion and incident handling.
- [ ] Confirm whether current-country and nationality are required at initial enquiry.
- [ ] Configure approved organisational sender identity.
- [ ] Replace sample imagery with approved institutional assets.
- [ ] Complete final human owner UAT and acceptance.

When all items above are cleared and CI/Vercel remain Green, the correct release decision is **V1 COMPLETE**.
