# Creotech International Faculty & Researcher Support MVP

A polished desktop-first bilingual MVP website for an international faculty, researcher, visiting scholar, and family support service operated by Creotech for Ritsumeikan-related institutions.

## Tech stack
- Next.js App Router (pinned stable version in `package.json`)
- TypeScript
- Tailwind CSS
- Direct SQL with `@neondatabase/serverless`
- PostgreSQL-compatible database such as Neon Postgres
- Vercel deployment

No Prisma, complex authentication, paid APIs, official logos, stock photos, payment, email delivery, secure uploads, or SpeedVisa API integration are included.

## Included in the MVP
- `/ja` and `/en` public websites
- Service pages, KVH, COE / SpeedVisa, affiliated school consultation, pricing, FAQ
- Desktop-first support request form
- Database insert with generated request ID
- Confirmation page
- Password-protected `/admin` dashboard
- Request list, status filter, arrival-date sorting, CSV export
- Request detail edit for status, assigned staff, and internal memo
- Clear setup errors when `DATABASE_URL` or `ADMIN_PASSWORD` is missing

## Intentionally excluded
- Passport or immigration document upload
- Applicant login / My Page
- Secure file storage
- Payment, invoice, quotation generation
- Real email notifications
- Bundled official logo files
- Direct SpeedVisa API integration
- Legal, medical, or financial advice functions
- Visa or COE approval guarantees


## Brand assets and colors
- The site uses the uploaded `public/brand/creotech-logo.png` as the primary operating brand mark.
- The uploaded `public/brand/ritsumeikan-logo.jpg` is shown modestly in the footer as a related/supporting institutional mark.
- Logos are rendered with `object-contain` and should not be stretched, distorted, recreated, or replaced without approval.
- The main UI colour remains dark navy for readability, with Creotech blue as a supporting brand colour and Ritsumeikan red used carefully for small accents.
- The footer clarifies that this is a Creotech support intake service, not the official Ritsumeikan University website.

## Environment variables
Create `.env.local`:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST/db?sslmode=require"
ADMIN_PASSWORD="change-this-admin-password"
```

The app builds without `DATABASE_URL`, but request submission and admin data loading show setup errors until it is configured. `/admin` will not allow access without `ADMIN_PASSWORD`.

## Run locally
```bash
npm install
npm run build
npm run dev
```
Open `http://localhost:3000`.

## Create a Neon Postgres database
1. Create a Neon project at `https://neon.tech`.
2. Copy the pooled or standard Postgres connection string.
3. Put it in `.env.local` as `DATABASE_URL`.
4. Run the schema in the Neon SQL Editor, or use `psql`:

```bash
psql "$DATABASE_URL" -f db/schema.sql
```

## Vercel Preview checklist
Before merging, confirm these in Vercel Preview with environment variables configured:
- `npm install` and `npm run build` complete successfully.
- `/ja`, `/en`, and every listed public route renders meaningful content.
- `/ja/request` or `/en/request` can submit when `DATABASE_URL` is configured and `db/schema.sql` has been run.
- Removing `DATABASE_URL` causes request submission and admin data loading to show clear setup errors.
- Removing `ADMIN_PASSWORD` causes `/admin` to show a clear setup error.
- Admin login, request list, request detail, status update, assigned staff update, internal memo update, and CSV export work.

## Deploy to Vercel
1. Push this repository to GitHub.
2. Import the repository in Vercel.
3. Add environment variables in Vercel Project Settings:
   - `DATABASE_URL`
   - `ADMIN_PASSWORD`
4. Ensure `db/schema.sql` has been run against the production database.
5. Deploy.

## Future expansion ideas
- Applicant login / My Page
- Secure file upload through designated storage
- SpeedVisa integration
- Email notifications
- Online payment
- Quotation generation
- Invoice generation
- Partner company management
- KVH calendar booking
- Staff role permissions
- Full affiliated school student support
- Additional languages beyond Japanese and English
