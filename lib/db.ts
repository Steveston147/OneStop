import { neon } from '@neondatabase/serverless';

export type SupportRequest = {
  id: number;
  request_id: string;
  created_at: string;
  updated_at: string;
  preferred_language: string;
  applicant_category: string;
  host_institution: string;
  host_department: string | null;
  host_contact: string | null;
  full_name: string;
  email: string;
  current_country: string | null;
  nationality: string | null;
  planned_arrival_date: string | null;
  planned_departure_date: string | null;
  family_members: number | null;
  requested_services: string;
  message: string | null;
  consent: boolean;
  status: string;
  assigned_staff: string | null;
  internal_memo: string | null;
};

export function hasDb() {
  return Boolean(process.env.DATABASE_URL);
}

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not configured. Create a Postgres database, run db/schema.sql, and set DATABASE_URL.');
  }

  return neon(process.env.DATABASE_URL);
}

function emptyToNull(value: FormDataEntryValue | string | null | undefined) {
  const text = String(value || '').trim();
  return text.length > 0 ? text : null;
}

export async function createRequest(data: Record<string, FormDataEntryValue | string | string[]>) {
  const sql = getSql();
  const requestId = `CR-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}-${Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase()}`;

  const services = Array.isArray(data.requested_services) ? data.requested_services : [String(data.requested_services || '')];

  await sql`
    insert into support_requests (
      request_id,
      preferred_language,
      applicant_category,
      host_institution,
      host_department,
      host_contact,
      full_name,
      email,
      current_country,
      nationality,
      planned_arrival_date,
      planned_departure_date,
      family_members,
      requested_services,
      message,
      consent
    ) values (
      ${requestId},
      ${String(data.preferred_language)},
      ${String(data.applicant_category)},
      ${String(data.host_institution)},
      ${emptyToNull(data.host_department as string)},
      ${emptyToNull(data.host_contact as string)},
      ${String(data.full_name)},
      ${String(data.email)},
      ${emptyToNull(data.current_country as string)},
      ${emptyToNull(data.nationality as string)},
      ${emptyToNull(data.planned_arrival_date as string)},
      ${emptyToNull(data.planned_departure_date as string)},
      ${emptyToNull(data.family_members as string) ? Number(String(data.family_members)) : null},
      ${JSON.stringify(services)},
      ${emptyToNull(data.message as string)},
      ${String(data.consent) === 'on'}
    )
  `;

  return requestId;
}

export async function listRequests(status?: string) {
  const sql = getSql();
  const rows = await sql`
    select *
    from support_requests
    where (${status || ''} = '' or status = ${status || ''})
    order by planned_arrival_date nulls last, created_at desc
  `;
  return rows as SupportRequest[];
}

export async function getRequest(requestId: string) {
  const sql = getSql();
  const rows = await sql`
    select *
    from support_requests
    where request_id = ${requestId}
    limit 1
  `;
  return (rows as SupportRequest[])[0];
}

export async function updateRequest(
  requestId: string,
  data: { status?: FormDataEntryValue | null; assigned_staff?: FormDataEntryValue | null; internal_memo?: FormDataEntryValue | null },
) {
  const sql = getSql();
  await sql`
    update support_requests
    set status = ${String(data.status || 'New')},
        assigned_staff = ${emptyToNull(data.assigned_staff)},
        internal_memo = ${emptyToNull(data.internal_memo)},
        updated_at = now()
    where request_id = ${requestId}
  `;
}
