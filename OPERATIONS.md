# OneStop V1 Operations & Privacy Runbook

Updated: 2026-08-13
Status: V1 operational baseline approved for OneStop.

## 1. Ownership

- Service / business owner: Creotech International Business Section / Ritsumeikan Study Abroad Center.
- Day-to-day data-management responsibility: the section manager or a formally delegated staff member.
- Technical owner: the maintainer of the OneStop GitHub/Vercel project.

This runbook applies to OneStop only. If a company-wide or Ritsumeikan policy is stricter, the stricter policy overrides this document.

## 2. Operational mailbox

Production enquiries must be delivered only to an organisation-managed business mailbox controlled by the International Business Section.

Rules:

- personal Gmail or other personal consumer mailboxes are not approved for production enquiry intake;
- mailbox access is limited to staff who need it for enquiry handling;
- the recipient address remains a Vercel secret (`ENQUIRY_TO_EMAIL`) and must not be committed to the repository;
- access changes must be reflected promptly when staff responsibilities change.

## 3. Sender identity

Production email must use a Resend-verified organisational sender domain/address configured through `ENQUIRY_FROM_EMAIL`.

- `onboarding@resend.dev` is permitted for development/UAT only;
- it is not an approved institutional production sender;
- sender-domain DNS verification and the production environment variable are deployment-owner responsibilities.

## 4. Retention and deletion

OneStop enquiry email is an intake record, not a permanent case-management database.

V1 retention rule:

- keep an enquiry in the operational mailbox while the case is active;
- after the last substantive action / case completion, retain it for up to **180 days** for follow-up and operational traceability;
- after 180 days, delete the enquiry from the operational mailbox unless it has been transferred into another formally approved institutional record system or must be retained under a specific legal/contractual requirement;
- do not create parallel personal copies.

The 180-day rule is an OneStop operational default and does not override a stricter corporate or university record-retention requirement.

## 5. Sensitive information

The public form must not request passport scans, COEs, residence cards, visa scans, bank statements, medical records, or equivalent sensitive documents.

If sensitive information is nevertheless received:

1. do not forward it to personal mail or uncontrolled storage;
2. notify the section manager / delegated data manager;
3. move the case to an approved secure institutional transfer/storage method when required;
4. remove unnecessary sensitive copies from the ordinary enquiry mailbox after secure transfer and operational confirmation;
5. document any suspected misdelivery or disclosure as an incident.

## 6. Misdirected enquiries

If an enquiry is outside the service scope:

- send only the minimum necessary information to an appropriate internal contact;
- avoid forwarding unrelated personal information;
- tell the enquirer when a different contact point is more appropriate.

## 7. Incident escalation

Potential loss, accidental disclosure, unauthorized access, or other privacy/security incidents must be escalated immediately to:

1. the International Business Section manager / delegated data manager; and
2. the applicable Creotech privacy/security escalation contact under current company policy.

Do not investigate by copying personal data into issue trackers, GitHub comments, or chat tools.

## 8. Production smoke test

After a production deployment:

1. confirm `/ja` and `/en` load;
2. confirm the browser document language is `ja` / `en` respectively;
3. confirm public navigation and contact form steps work;
4. confirm `/admin` is unavailable;
5. confirm no sample/third-party imagery is shown as an approved institutional photo;
6. perform one intentional delivery test only when the production recipient and verified sender are configured;
7. confirm the test reaches the organisation-managed mailbox and does not expose secrets;
8. check Vercel runtime errors.

## 9. Rollback

If a release causes a material regression:

- stop further merges;
- use the last known-good Vercel production deployment / GitHub main revision as the rollback point;
- verify `/ja`, `/en`, and the contact flow after rollback;
- record the defect and add a regression test before re-release.

## 10. Quarterly review

At least quarterly, review:

- mailbox membership;
- retention/deletion execution;
- Resend sender/domain validity;
- Vercel/GitHub access;
- dependency/security alerts;
- whether the form still collects only information necessary for initial routing.
