import Link from 'next/link';
import { notFound } from 'next/navigation';
import { saveAdmin } from '@/app/actions';
import { statusOptions } from '@/content/site';
import { isAdmin } from '@/lib/admin';
import { getRequest, hasDb } from '@/lib/db';

const publicFields = [
  'request_id',
  'created_at',
  'preferred_language',
  'applicant_category',
  'host_institution',
  'host_department',
  'host_contact',
  'full_name',
  'email',
  'current_country',
  'nationality',
  'planned_arrival_date',
  'planned_departure_date',
  'family_members',
  'requested_services',
  'message',
  'consent',
] as const;

export default async function RequestDetail({ params }: { params: { id: string } }) {
  if (!(await isAdmin())) {
    return (
      <main className="p-10">
        Please log in at{' '}
        <Link className="underline" href="/admin">
          /admin
        </Link>
        .
      </main>
    );
  }

  if (!hasDb()) {
    return <main className="p-10">DATABASE_URL is not configured.</main>;
  }

  const request = await getRequest(params.id);
  if (!request) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-mist">
      <div className="bg-navy text-white">
        <div className="container py-5">
          <Link href="/admin">← Back to dashboard</Link>
        </div>
      </div>

      <div className="container grid gap-8 py-10 lg:grid-cols-[1fr_420px]">
        <section className="card p-8">
          <p className="eyebrow">Request detail</p>
          <h1 className="mt-2 text-4xl font-extrabold text-navy">{request.request_id}</h1>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {publicFields.map((field) => (
              <div className="rounded-xl bg-mist p-4" key={field}>
                <b className="text-navy">{field}</b>
                <p className="break-words">{formatValue(request[field])}</p>
              </div>
            ))}
          </div>
        </section>

        <form action={saveAdmin} className="card h-fit p-8 lg:sticky lg:top-8">
          <input type="hidden" name="request_id" value={request.request_id} />
          <h2 className="text-2xl font-extrabold text-navy">Admin update</h2>
          <p className="mt-2 text-ink">Internal memo is visible only in this admin area.</p>

          <label className="label mt-5" htmlFor="status">
            Status
          </label>
          <select className="admin-input" id="status" name="status" defaultValue={request.status}>
            {statusOptions.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>

          <label className="label mt-5" htmlFor="assigned_staff">
            Assigned staff
          </label>
          <input className="admin-input" id="assigned_staff" name="assigned_staff" defaultValue={request.assigned_staff || ''} />

          <label className="label mt-5" htmlFor="internal_memo">
            Internal memo
          </label>
          <textarea
            className="admin-input min-h-48"
            id="internal_memo"
            name="internal_memo"
            defaultValue={request.internal_memo || ''}
          />

          <button className="btn btn-primary mt-6 w-full">Save changes</button>
        </form>
      </div>
    </main>
  );
}

function formatValue(value: unknown) {
  if (value === null || value === undefined || value === '') {
    return '—';
  }

  if (typeof value === 'string' && value.startsWith('[')) {
    try {
      return (JSON.parse(value) as string[]).join(', ');
    } catch {
      return value;
    }
  }

  return String(value);
}
