'use server';

import { redirect } from 'next/navigation';

export type ActionState = { error?: string };
type Lang = 'ja' | 'en';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const REQUEST_ID_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const applicantCategoryLabels: Record<string, Record<Lang, string>> = {
  'Host Office / Faculty': { ja: '受入部署の担当者・教員', en: 'Host office staff or faculty member' },
  'Faculty / Researcher / Guest': { ja: '来日予定の教員・研究者・ゲスト', en: 'Incoming faculty, researcher, or guest' },
  'Family Member': { ja: '同行家族', en: 'Accompanying family member' },
  Other: { ja: 'その他の関係者', en: 'Other related person' },
};

const hostInstitutionLabels: Record<string, Record<Lang, string>> = {
  'Ritsumeikan University': { ja: '立命館大学', en: 'Ritsumeikan University' },
  'Ritsumeikan Asia Pacific University': { ja: '立命館アジア太平洋大学（APU）', en: 'Ritsumeikan Asia Pacific University (APU)' },
  'Ritsumeikan Junior & Senior High School (Nagaokakyo)': { ja: '立命館中学校・高等学校（長岡京）', en: 'Ritsumeikan Junior & Senior High School (Nagaokakyo)' },
  'Ritsumeikan Uji Junior & Senior High School': { ja: '立命館宇治中学校・高等学校', en: 'Ritsumeikan Uji Junior & Senior High School' },
  'Ritsumeikan Moriyama Junior & Senior High School': { ja: '立命館守山中学校・高等学校', en: 'Ritsumeikan Moriyama Junior & Senior High School' },
  'Ritsumeikan Primary School': { ja: '立命館小学校', en: 'Ritsumeikan Primary School' },
  Other: { ja: 'その他', en: 'Other' },
};

const requestedServiceLabels: Record<string, Record<Lang, string>> = {
  'COE / Visa guidance': { ja: 'COE・ビザ関連支援', en: 'COE and visa guidance' },
  'Accommodation support': { ja: '宿泊・住居支援', en: 'Accommodation and housing' },
  'Flight support': { ja: '航空券に関する支援', en: 'Flight support' },
  'Airport meet and assist': { ja: '空港到着・待ち合わせ支援', en: 'Airport arrival support' },
  'City office support': { ja: '市役所手続き支援', en: 'City-office support' },
  'Bank account support': { ja: '銀行口座支援', en: 'Bank-account support' },
  'Mobile / SIM / Internet': { ja: '携帯電話・SIM・通信支援', en: 'Mobile, SIM, and internet support' },
  'Family support': { ja: '同行家族支援', en: 'Accompanying family support' },
  'Campus orientation': { ja: 'キャンパス・校内案内', en: 'Campus or school orientation' },
  Other: { ja: 'その他', en: 'Other' },
};

function text(formData: FormData, name: string) {
  return String(formData.get(name) || '').trim();
}

function createRequestId() {
  const date = new Date().toISOString().slice(0, 10).replaceAll('-', '');
  const random = Array.from(
    { length: 5 },
    () => REQUEST_ID_ALPHABET[Math.floor(Math.random() * REQUEST_ID_ALPHABET.length)],
  ).join('');
  return `CGW-${date}-${random}`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function display(value: string, lang: Lang) {
  return value || (lang === 'ja' ? '未入力' : 'Not entered');
}

function localize(labels: Record<string, Record<Lang, string>>, value: string, lang: Lang) {
  return labels[value]?.[lang] || value;
}

function formatDate(value: string, lang: Lang) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat(lang === 'ja' ? 'ja-JP' : 'en-CA', {
    year: 'numeric',
    month: lang === 'ja' ? 'numeric' : 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

function formatStayPeriod(arrival: string, departure: string, lang: Lang) {
  const start = formatDate(arrival, lang);
  const end = formatDate(departure, lang);
  if (start && end) return `${start} ～ ${end}`;
  if (start) return lang === 'ja' ? `${start} から` : `From ${start}`;
  if (end) return lang === 'ja' ? `${end} まで` : `Until ${end}`;
  return '';
}

export async function submitRequest(_previousState: ActionState, formData: FormData): Promise<ActionState> {
  const lang: Lang = text(formData, 'preferred_language') === 'Japanese' ? 'ja' : 'en';
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
  const recipient = process.env.ENQUIRY_TO_EMAIL;
  if (!apiKey || !recipient) {
    return {
      error: lang === 'ja'
        ? '現在、メール送信設定を準備中です。しばらくしてから再度お試しください。'
        : 'Email delivery is currently being configured. Please try again later.',
    };
  }

  const requestId = createRequestId();
  const email = text(formData, 'email');
  const fullName = text(formData, 'full_name');
  const institution = localize(hostInstitutionLabels, text(formData, 'host_institution'), lang);
  const role = localize(applicantCategoryLabels, text(formData, 'applicant_category'), lang);
  const localizedServices = services.map((service) => localize(requestedServiceLabels, service, lang));
  const stayPeriod = formatStayPeriod(text(formData, 'planned_arrival_date'), text(formData, 'planned_departure_date'), lang);

  const subject = lang === 'ja'
    ? `[Creotech Global Welcome 新規相談] ${requestId}｜${institution}｜${fullName}`
    : `[New Creotech Global Welcome Enquiry] ${requestId} | ${institution} | ${fullName}`;

  const rows: Array<[string, string]> = lang === 'ja'
    ? [
        ['受付番号', requestId], ['送信言語', '日本語'], ['利用者区分', role], ['受入機関・所属', institution],
        ['受入部署・所属詳細', text(formData, 'host_department')], ['学内・校内担当者', text(formData, 'host_contact')],
        ['氏名', fullName], ['メールアドレス', email], ['現在の居住国', text(formData, 'current_country')],
        ['国籍', text(formData, 'nationality')], ['受入・滞在予定期間', stayPeriod],
        ['同行家族人数', text(formData, 'family_members')], ['希望する支援', localizedServices.join('、')],
        ['その他相談内容', text(formData, 'message')],
      ]
    : [
        ['Request ID', requestId], ['Submission language', 'English'], ['Role', role], ['Host institution', institution],
        ['Host department or affiliation', text(formData, 'host_department')], ['Host contact', text(formData, 'host_contact')],
        ['Full name', fullName], ['Email address', email], ['Current country of residence', text(formData, 'current_country')],
        ['Nationality', text(formData, 'nationality')], ['Expected period of stay', stayPeriod],
        ['Accompanying family members', text(formData, 'family_members')], ['Requested support', localizedServices.join(', ')],
        ['Additional comments', text(formData, 'message')],
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

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM_EMAIL || 'Creotech Global Welcome <onboarding@resend.dev>',
        to: [recipient], reply_to: email, subject, text: plainText, html,
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('Resend delivery failed', response.status, detail);
      return { error: lang === 'ja' ? 'メールを送信できませんでした。時間をおいて再度お試しください。' : 'The email could not be sent. Please try again later.' };
    }
  } catch (error) {
    console.error('Email delivery failed', error);
    return { error: lang === 'ja' ? 'メールを送信できませんでした。時間をおいて再度お試しください。' : 'The email could not be sent. Please try again later.' };
  }

  redirect(`/${lang}/request/confirm?id=${encodeURIComponent(requestId)}`);
}
