'use server';

import { redirect } from 'next/navigation';
import { updateRequest } from '@/lib/db';
import { login, logout } from '@/lib/admin';

export type ActionState = { error?: string };

const ENQUIRY_TO = 'eltontanaka@gmail.com';
const RESEND_ENDPOINT = 'https://api.resend.com/emails';

function text(formData: FormData, name: string) {
  return String(formData.get(name) || '').trim();
}

function createRequestId() {
  const date = new Date().toISOString().slice(0, 10).replaceAll('-', '');
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `OS-${date}-${random}`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function display(value: string) {
  return value || '未入力 / Not entered';
}

export async function submitRequest(_previousState: ActionState, formData: FormData): Promise<ActionState> {
  const lang = text(formData, 'preferred_language') === 'Japanese' ? 'ja' : 'en';
  const requiredFields = ['preferred_language', 'applicant_category', 'host_institution', 'full_name', 'email'];

  for (const field of requiredFields) {
    if (!text(formData, field)) {
      return { error: lang === 'ja' ? '必須項目を確認してください。' : 'Please check the required fields.' };
    }
  }

  const services = formData.getAll('requested_services').map(String).filter(Boolean);
  if (services.length === 0) {
    return { error: lang === 'ja' ? '希望する支援を1つ以上選択してください。' : 'Please select at least one support area.' };
  }

  if (formData.get('consent') !== 'on') {
    return { error: lang === 'ja' ? '送信情報の利用への同意が必要です。' : 'Consent is required.' };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      error: lang === 'ja'
        ? '現在、メール送信設定を準備中です。しばらくしてから再度お試しください。'
        : 'Email delivery is currently being configured. Please try again later.',
    };
  }

  const requestId = createRequestId();
  const email = text(formData, 'email');
  const fullName = text(formData, 'full_name');
  const institution = text(formData, 'host_institution');
  const subject = `[OneStop新規相談] ${requestId}｜${institution}｜${fullName}`;

  const rows: Array<[string, string]> = [
    ['受付番号 / Request ID', requestId],
    ['希望言語 / Preferred language', text(formData, 'preferred_language')],
    ['利用者区分 / Role', text(formData, 'applicant_category')],
    ['受入機関・所属 / Host institution', institution],
    ['受入部署・所属詳細 / Host department', text(formData, 'host_department')],
    ['学内・校内担当者 / Host contact', text(formData, 'host_contact')],
    ['氏名 / Full name', fullName],
    ['メール / Email', email],
    ['現在の居住国 / Current country', text(formData, 'current_country')],
    ['国籍 / Nationality', text(formData, 'nationality')],
    ['来日予定日 / Planned arrival', text(formData, 'planned_arrival_date')],
    ['出国予定日 / Planned departure', text(formData, 'planned_departure_date')],
    ['同行家族人数 / Family members', text(formData, 'family_members')],
    ['希望する支援 / Requested support', services.join(', ')],
    ['その他相談内容 / Message', text(formData, 'message')],
  ];

  const plainText = [
    'OneStopサイトから新しい相談が届きました。',
    '',
    ...rows.map(([label, value]) => `${label}: ${display(value)}`),
    '',
    'このメールに返信すると、相談者のメールアドレスへ返信できます。',
    'パスポートやCOE等の機微書類は、このメールへの通常返信で送付するよう案内しないでください。',
  ].join('\n');

  const htmlRows = rows
    .map(([label, value]) => `<tr><th style="padding:10px 12px;text-align:left;vertical-align:top;border-bottom:1px solid #e5e7eb;background:#f8fafc;width:34%;">${escapeHtml(label)}</th><td style="padding:10px 12px;vertical-align:top;border-bottom:1px solid #e5e7eb;white-space:pre-wrap;">${escapeHtml(display(value))}</td></tr>`)
    .join('');

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans JP',sans-serif;color:#172033;line-height:1.65;max-width:760px;margin:0 auto;">
      <div style="border-top:6px solid #a10000;padding:22px 0 10px;">
        <p style="margin:0;color:#a10000;font-weight:800;letter-spacing:.08em;font-size:12px;">ONESTOP ENQUIRY</p>
        <h1 style="margin:8px 0 6px;font-size:24px;color:#0b2341;">新しい相談が届きました</h1>
        <p style="margin:0;color:#5f6b7a;">受付番号：<strong>${escapeHtml(requestId)}</strong></p>
      </div>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;margin-top:18px;font-size:14px;">${htmlRows}</table>
      <div style="margin-top:18px;padding:14px 16px;background:#fff7e8;border:1px solid #ead8a7;border-radius:12px;font-size:13px;">
        このメールに返信すると、相談者のメールアドレスへ返信できます。パスポートやCOE等の機微書類は、指定された安全な方法で受領してください。
      </div>
    </div>`;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM_EMAIL || 'OneStop <onboarding@resend.dev>',
        to: [ENQUIRY_TO],
        reply_to: email,
        subject,
        text: plainText,
        html,
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('Resend delivery failed', response.status, detail);
      return {
        error: lang === 'ja'
          ? 'メールを送信できませんでした。時間をおいて再度お試しください。'
          : 'The email could not be sent. Please try again later.',
      };
    }
  } catch (error) {
    console.error('Email delivery failed', error);
    return {
      error: lang === 'ja'
        ? 'メールを送信できませんでした。時間をおいて再度お試しください。'
        : 'The email could not be sent. Please try again later.',
    };
  }

  redirect(`/${lang}/request/confirm?id=${encodeURIComponent(requestId)}`);
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
