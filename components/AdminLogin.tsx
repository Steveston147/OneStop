'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { adminLogin } from '@/app/actions';

export default function AdminLogin() {
  const [state, action] = useFormState(adminLogin, {});

  return (
    <form action={action} className="card mx-auto max-w-md p-8">
      <h1 className="text-3xl font-extrabold text-navy">Admin login</h1>
      <p className="mt-3 text-ink">Enter the shared admin password configured in the environment.</p>
      {state?.error ? (
        <div className="mt-5 rounded-xl border border-red-300 bg-red-50 p-4 font-bold text-red-800" role="alert">
          {state.error}
        </div>
      ) : null}
      <label className="label mt-6" htmlFor="password">
        Admin password
      </label>
      <input className="admin-input" id="password" name="password" type="password" autoComplete="current-password" />
      <LoginButton />
    </form>
  );
}

function LoginButton() {
  const status = useFormStatus();
  return (
    <button className="btn btn-primary mt-5 w-full disabled:opacity-60" disabled={status.pending}>
      {status.pending ? 'Checking...' : 'Login'}
    </button>
  );
}
