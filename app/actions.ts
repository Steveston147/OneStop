'use server';

import { redirect } from 'next/navigation';
import { createRequest, updateRequest } from '@/lib/db';
import { login, logout } from '@/lib/admin';

export type ActionState = { error?: string };

export async function submitRequest(_previousState: ActionState, formData: FormData): Promise<ActionState> {
  const requiredFields = ['preferred_language', 'applicant_category', 'host_institution', 'full_name', 'email'];

  for (const field of requiredFields) {
    if (!String(formData.get(field) || '').trim()) {
      return { error: `Missing required field: ${field}` };
    }
  }

  const services = formData.getAll('requested_services').map(String).filter(Boolean);
  if (services.length === 0) {
    return { error: 'Please select at least one requested service.' };
  }

  if (formData.get('consent') !== 'on') {
    return { error: 'Consent is required.' };
  }

  let requestId = '';
  try {
    const data = Object.fromEntries(formData.entries()) as Record<string, FormDataEntryValue | string | string[]>;
    data.requested_services = services;
    requestId = await createRequest(data);
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Request submission failed.' };
  }

  const lang = formData.get('preferred_language') === 'Japanese' ? 'ja' : 'en';
  redirect(`/${lang}/request/confirm?id=${requestId}`);
}

export async function adminLogin(_previousState: ActionState, formData: FormData): Promise<ActionState> {
  const ok = await login(String(formData.get('password') || ''));
  if (!ok) {
    return { error: 'ADMIN_PASSWORD is missing or the password is incorrect.' };
  }

  redirect('/admin');
}

export async function adminLogout() {
  await logout();
  redirect('/admin');
}

export async function saveAdmin(formData: FormData) {
  const requestId = String(formData.get('request_id') || '');
  await updateRequest(requestId, {
    status: formData.get('status'),
    assigned_staff: formData.get('assigned_staff'),
    internal_memo: formData.get('internal_memo'),
  });
  redirect(`/admin/request/${requestId}`);
}
