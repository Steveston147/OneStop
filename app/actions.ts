'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  applicantCategoryLabels,
  createRequestId,
  display,
  escapeHtml,
  formatStayPeriod,
  hostInstitutionLabels,
  localize,
  requestedServiceLabels,
  validateEnquiry,
  type Lang,
} from '@/lib/enquiry';

export type ActionState = { error?: string };

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const RESEND_TIMEOUT_MS = 10_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitBuckets = new Map<string, number[]>();

function validationError(lang: Lang, ja: string, en: string): ActionState {
  return { error: lang === 'ja' ? ja : en };
}

async function getClientKey() {
  const requestHeaders = await headers();
  const forwarded = requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || requestHeaders.get('x-real-ip') || '';
}

function isRateLimited(clientKey: string) {
  if (!clientKey) return false;
  const now = Date.now();
  const recent = (rateLimitBuckets.get(clientKey) || []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimitBuckets.set(clientKey, recent);
    return true;
  }
  recent.push(now);
  rateLimitBuckets.set(clientKey, recent);
  return false;
}

export async function submitRequest(_previousState: ActionState, formData: FormData): Promise<ActionState> {
  const validation = validateEnquiry(formData);
  if (!validation.ok) return { error: validation.error };

  const data = validation.data;
  const { lang } = data;

  if (isRateLimited(await getClientKey())) {
    return validationError(
      lang,
      '短時間に送信回数が多すぎます。しばらくしてから再度お試しください。',
      'Too many submissions were made in a short period. Please try again later.',
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.ENQUIRY_TO_EMAIL;
  if (!apiKey || !recipient) {
    return validationError(
      lang,
      '現在、メール送信設定を準備中です。しばらくしてから再度お試しください。',
      'Email delivery is currently being configured. Please try again later.',
    );
  }

  const requestId = createRequestId();
  const institution = localize(hostInstitutionLabels, data.hostInstitution, lang);
  const role = localize(applicantCategoryLabels, data.applicantCategory, lang);
  const localizedServices = data.services.map((service) => localize(requestedServiceLabels, service, lang));
  const stayPeriod = formatStayPeriod(data.arrival, data.departure, lang);

  const subject = lang === 'ja'
    ? `[Creotech Global Welcome 新規相談] ${requestId}｜${institution}｜${data.fullName}`
    : `[New Creotech Global Welcome Enquiry] ${requestId} | ${institution} | ${data.fullName}`;

  const rows: Array<[string, string]> = lang === 'ja'
    ? [
        ['受付番号', requestId], ['送信言語', '日本語'], ['利用者区分', role], ['受入機関・所属', institution],
        ['受入部署・所属詳細', data.hostDepartment], ['学内・校内担当者', data.hostContact],
        ['氏名', data.fullName], ['メールアドレス', data.email], ['現在の居住国', data.currentCountry],
        ['国籍', data.nationality], ['受入・滞在予定期間', stayPeriod], ['同行家族人数', data.familyMembers],
        ['希望する支援', localizedServices.join('、')], ['その他相談内容', data.message],
      ]
    : [
        ['Request ID', requestId], ['Submission language', 'English'], ['Role', role], ['Host institution', institution],
        ['Host department or affiliation', data.hostDepartment], ['Host contact', data.hostContact],
        ['Full name', data.fullName], ['Email address', data.email], ['Current country of residence', data.currentCountry],
        ['Nationality', data.nationality], ['Expected period of stay', stayPeriod], ['Accompanying family members', data.familyMembers],
        ['Requested support', localizedServices.join(', ')], ['Additional comments', data.message],
      ];

  const plainText = [
    lang === 'ja'
      ? 'Creotech Global Welcomeサイトから新しい相談が届きました。'
      : 'A new enquiry was submitted through the Creotech Global Welcome website.',
    '',
    ...rows.map(([label, value]) => `${label}: ${display(value, lang)}`),
    '',
    lang === 'ja'
      ? 'このメールに返信すると、相談者のメールアドレスへ返信できます。'
      : 'Replying to this message will address the applicant directly.',
    lang === 'ja'
      ? 'パスポートやCOE等の機微書類は、このメールへの通常返信で送付するよう案内しないでください。'
      : 'Do not ask the applicant to send passport, COE, or other sensitive documents by ordinary email.',
  ].join('\n');

  const htmlRows = rows.map(([label, value]) =>
    `<tr><th style="padding:10px 12px;text-align:left;vertical-align:top;border-bottom:1px solid #e5e7eb;background:#f8fafc;width:34%;">${escapeHtml(label)}</th><td style="padding:10px 12px;vertical-align:top;border-bottom:1px solid #e5e7eb;white-space:pre-wrap;">${escapeHtml(display(value, lang))}</td></tr>`,
  ).join('');

  const heading = lang === 'ja' ? '新しい相談が届きました' : 'A new enquiry has been received';
  const idLabel = lang === 'ja' ? '受付番号' : 'Request ID';
  const notice = lang === 'ja'
    ? 'このメールに返信すると、相談者のメールアドレスへ返信できます。パスポートやCOE等の機微書類は、指定された安全な方法で受領してください。'
    : 'Replying to this message will address the applicant directly. Receive passport, COE, and other sensitive documents only through an approved secure method.';
  const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans JP',Arial,sans-serif;color:#172033;line-height:1.65;max-width:760px;margin:0 auto;"><div style="border-top:6px solid #a10000;padding:22px 0 10px;"><p style="margin:0;color:#a10000;font-weight:800;letter-spacing:.08em;font-size:12px;">CREOTECH GLOBAL WELCOME</p><h1 style="margin:8px 0 6px;font-size:24px;color:#0b2341;">${heading}</h1><p style="margin:0;color:#5f6b7a;">${idLabel}: <strong>${escapeHtml(requestId)}</strong></p></div><table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;margin-top:18px;font-size:14px;">${htmlRows}</table><div style="margin-top:18px;padding:14px 16px;background:#fff7e8;border:1px solid #ead8a7;border-radius:12px;font-size:13px;">${notice}</div></div>`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), RESEND_TIMEOUT_MS);

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM_EMAIL || 'Creotech Global Welcome <onboarding@resend.dev>',
        to: [recipient],
        reply_to: data.email,
        subject,
        text: plainText,
        html,
      }),
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error('Resend delivery failed', { requestId, status: response.status });
      return validationError(lang, 'メールを送信できませんでした。時間をおいて再度お試しください。', 'The email could not be sent. Please try again later.');
    }
  } catch (error) {
    const kind = error instanceof Error && error.name === 'AbortError' ? 'timeout' : 'network-error';
    console.error('Email delivery failed', { requestId, kind });
    return validationError(lang, 'メールを送信できませんでした。時間をおいて再度お試しください。', 'The email could not be sent. Please try again later.');
  } finally {
    clearTimeout(timeout);
  }

  redirect(`/${lang}/request/confirm?id=${encodeURIComponent(requestId)}`);
}
