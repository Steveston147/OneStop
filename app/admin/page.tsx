import Link from 'next/link';
import { adminLogout } from '@/app/actions';
import AdminLogin from '@/components/AdminLogin';
import { statusOptions } from '@/content/site';
import { adminReady, isAdmin } from '@/lib/admin';
import { hasDb, listRequests } from '@/lib/db';

export default async function Admin({ searchParams }: { searchParams: { status?: string } }) {
  if (!adminReady()) {
    return (
      <AdminShell>
        <SetupMessage message="ADMIN_PASSWORD is not configured. Set it locally and on Vercel before using the dashboard." />
      </AdminShell>
    );
  }

  const authed = await isAdmin();
  if (!authed) {
    return (
      <AdminShell>
        <div className="container py-16">
          <AdminLogin />
        </div>
      </AdminShell>
    );
  }

  if (!hasDb()) {
    return (
      <AdminShell>
        <AdminHeader />
        <SetupMessage message="DATABASE_URL is not configured. Admin data cannot be loaded until Postgres is connected and db/schema.sql is run." />
      </AdminShell>
    );
  }

  const requests = await listRequests(searchParams.status);

  return (
    <AdminShell>
      <AdminHeader />
      <div className="container py-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Internal dashboard</p>
            <h1 className="text-4xl font-extrabold text-navy">Support requests</h1>
          </div>
          <form action={adminLogout}>
            <button className="btn btn-secondary">Logout</button>
          </form>
        </div>

        <form className="mt-6 flex flex-wrap gap-3 rounded-2xl border border-line bg-white p-4">
          <select className="admin-input max-w-xs" name="status" defaultValue={searchParams.status || ''}>
            <option value="">All statuses</option>
            {statusOptions.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
          <button className="btn btn-primary">Filter</button>
          <a className="btn btn-secondary" href={`/admin/export${searchParams.status ? `?status=${searchParams.status}` : ''}`}>
            Export CSV
          </a>
        </form>

        <div className="card mt-6 overflow-x-auto">
          <table className="w-full min-w-[1120px] text-left text-sm">
            <thead className="bg-mist text-navy">
              <tr>
                {['ID', 'Submitted', 'Name', 'Email', 'Category', 'Institution', 'Arrival', 'Services', 'Status'].map(
                  (heading) => (
                    <th className="p-4 text-sm font-extrabold" key={heading}>
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr className="border-t border-line align-top" key={request.request_id}>
                  <td className="p-4 font-bold">
                    <Link className="text-navy underline" href={`/admin/request/${request.request_id}`}>
                      {request.request_id}
                    </Link>
                  </td>
                  <td className="p-4">{String(request.created_at).slice(0, 10)}</td>
                  <td className="p-4 font-semibold">{request.full_name}</td>
                  <td className="p-4">{request.email}</td>
                  <td className="p-4">{request.applicant_category}</td>
                  <td className="p-4">{request.host_institution}</td>
                  <td className="p-4">{request.planned_arrival_date || '—'}</td>
                  <td className="max-w-xs p-4">{formatServices(request.requested_services)}</td>
                  <td className="p-4">
                    <StatusBadge status={request.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {requests.length === 0 ? <p className="p-8 text-center text-lg font-semibold">No requests found.</p> : null}
        </div>
      </div>
    </AdminShell>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-mist">{children}</main>;
}

function AdminHeader() {
  return (
    <div className="bg-navy text-white">
      <div className="container flex items-center justify-between py-5 font-extrabold">
        <span>Creotech Admin</span>
        <Link className="text-white/80 underline" href="/ja">
          Public site
        </Link>
      </div>
    </div>
  );
}

function SetupMessage({ message }: { message: string }) {
  return (
    <div className="container py-16">
      <div className="card border-l-4 border-l-accent p-8">
        <h1 className="text-3xl font-extrabold text-navy">Setup required</h1>
        <p className="mt-4 text-lg">{message}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return <span className="rounded-full bg-sky px-3 py-1 text-sm font-bold text-navy">{status}</span>;
}

function formatServices(raw: string) {
  try {
    const parsed = JSON.parse(raw) as string[];
    return parsed.join(', ');
  } catch {
    return raw;
  }
}
