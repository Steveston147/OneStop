import { randomInt } from 'crypto';

export type Lang = 'ja' | 'en';

export type ValidatedEnquiry = {
  lang: Lang;
  applicantCategory: string;
  hostInstitution: string;
  hostDepartment: string;
  hostContact: string;
  fullName: string;
  email: string;
  currentCountry: string;
  nationality: string;
  arrival: string;
  departure: string;
  familyMembers: string;
  services: string[];
  message: string;
};

export type ValidationResult =
  | { ok: true; data: ValidatedEnquiry }
  | { ok: false; lang: Lang; error: string };

const REQUEST_ID_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export const applicantCategoryLabels: Record<string, Record<Lang, string>> = {
  'Host Office / Faculty': { ja: '受入部署の担当者・教員', en: 'Host office staff or faculty member' },
  'Faculty / Researcher / Guest': { ja: '来日予定の教員・研究者・ゲスト', en: 'Incoming faculty, researcher, or guest' },
  'Family Member': { ja: '同行家族', en: 'Accompanying family member' },
  Other: { ja: 'その他の関係者', en: 'Other related person' },
};

export const hostInstitutionLabels: Record<string, Record<Lang, string>> = {
  'Ritsumeikan University': { ja: '立命館大学', en: 'Ritsumeikan University' },
  'Ritsumeikan Asia Pacific University': { ja: '立命館アジア太平洋大学（APU）', en: 'Ritsumeikan Asia Pacific University (APU)' },
  'Ritsumeikan Junior & Senior High School (Nagaokakyo)': { ja: '立命館中学校・高等学校（長岡京）', en: 'Ritsumeikan Junior & Senior High School (Nagaokakyo)' },
  'Ritsumeikan Uji Junior & Senior High School': { ja: '立命館宇治中学校・高等学校', en: 'Ritsumeikan Uji Junior & Senior High School' },
  'Ritsumeikan Moriyama Junior & Senior High School': { ja: '立命館守山中学校・高等学校', en: 'Ritsumeikan Moriyama Junior & Senior High School' },
  'Ritsumeikan Primary School': { ja: '立命館小学校', en: 'Ritsumeikan Primary School' },
  Other: { ja: 'その他', en: 'Other' },
};

export const requestedServiceLabels: Record<string, Record<Lang, string>> = {
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

const applicantCategoryValues = new Set(Object.keys(applicantCategoryLabels));
const hostInstitutionValues = new Set(Object.keys(hostInstitutionLabels));
const requestedServiceValues = new Set(Object.keys(requestedServiceLabels));

const fieldLimits: Record<string, number> = {
  full_name: 120,
  email: 254,
  host_department: 200,
  host_contact: 120,
  current_country: 120,
  nationality: 120,
  message: 4000,
};

function text(formData: FormData, name: string) {
  return String(formData.get(name) || '').trim();
}

function error(lang: Lang, ja: string, en: string): ValidationResult {
  return { ok: false, lang, error: lang === 'ja' ? ja : en };
}

function isValidEmail(value: string) {
  return value.length <= 254 && !/[\r\n]/.test(value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

export function validateEnquiry(formData: FormData): ValidationResult {
  const preferredLanguage = text(formData, 'preferred_language');
  const lang: Lang = preferredLanguage === 'Japanese' ? 'ja' : 'en';

  if (text(formData, 'company_website')) {
    return error(lang, '送信内容を確認してください。', 'Please check the submitted information.');
  }
  if (preferredLanguage !== 'Japanese' && preferredLanguage !== 'English') {
    return error(lang, '送信言語が正しくありません。', 'The submission language is invalid.');
  }

  const applicantCategory = text(formData, 'applicant_category');
  const hostInstitution = text(formData, 'host_institution');
  const hostDepartment = text(formData, 'host_department');
  const hostContact = text(formData, 'host_contact');
  const fullName = text(formData, 'full_name');
  const email = text(formData, 'email');
  const currentCountry = text(formData, 'current_country');
  const nationality = text(formData, 'nationality');
  const arrival = text(formData, 'planned_arrival_date');
  const departure = text(formData, 'planned_departure_date');
  const familyMembers = text(formData, 'family_members');
  const message = text(formData, 'message');
  const services = formData.getAll('requested_services').map(String).map((value) => value.trim()).filter(Boolean);

  if (!applicantCategory || !hostInstitution || !fullName || !email) {
    return error(lang, '必須項目を確認してください。', 'Please check the required fields.');
  }
  if (!applicantCategoryValues.has(applicantCategory)) {
    return error(lang, '利用者区分が正しくありません。', 'The selected role is invalid.');
  }
  if (!hostInstitutionValues.has(hostInstitution)) {
    return error(lang, '受入機関が正しくありません。', 'The selected host institution is invalid.');
  }
  if (hostInstitution === 'Other' && !hostDepartment) {
    return error(lang, 'その他の所属機関名を入力してください。', 'Please enter the other institution name.');
  }
  if (!isValidEmail(email)) {
    return error(lang, 'メールアドレスの形式を確認してください。', 'Please check the email address format.');
  }
  if (Object.entries(fieldLimits).some(([field, max]) => text(formData, field).length > max)) {
    return error(lang, '入力文字数が上限を超えています。', 'One or more fields exceed the allowed length.');
  }
  if (services.length === 0 || services.length > requestedServiceValues.size || services.some((service) => !requestedServiceValues.has(service))) {
    return error(lang, '希望する支援を正しく選択してください。', 'Please select valid support areas.');
  }
  if (new Set(services).size !== services.length) {
    return error(lang, '希望する支援の選択内容を確認してください。', 'Please check the selected support areas.');
  }
  if (arrival && !isValidDate(arrival)) {
    return error(lang, '来日予定日を確認してください。', 'Please check the planned arrival date.');
  }
  if (departure && !isValidDate(departure)) {
    return error(lang, '出国予定日を確認してください。', 'Please check the planned departure date.');
  }
  if (arrival && departure && arrival > departure) {
    return error(lang, '出国予定日は来日予定日以降にしてください。', 'The departure date must be on or after the arrival date.');
  }
  if (familyMembers) {
    const value = Number(familyMembers);
    if (!Number.isInteger(value) || value < 0 || value > 20) {
      return error(lang, '同行家族人数は0〜20の整数で入力してください。', 'Accompanying family members must be a whole number from 0 to 20.');
    }
  }
  if (formData.get('consent') !== 'on') {
    return error(lang, '送信情報の利用への同意が必要です。', 'Consent is required.');
  }

  return {
    ok: true,
    data: {
      lang,
      applicantCategory,
      hostInstitution,
      hostDepartment,
      hostContact,
      fullName,
      email,
      currentCountry,
      nationality,
      arrival,
      departure,
      familyMembers,
      services,
      message,
    },
  };
}

export function createRequestId() {
  const date = new Date().toISOString().slice(0, 10).replaceAll('-', '');
  const random = Array.from({ length: 5 }, () => REQUEST_ID_ALPHABET[randomInt(REQUEST_ID_ALPHABET.length)]).join('');
  return `CGW-${date}-${random}`;
}

export function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function display(value: string, lang: Lang) {
  return value || (lang === 'ja' ? '未入力' : 'Not entered');
}

export function localize(labels: Record<string, Record<Lang, string>>, value: string, lang: Lang) {
  return labels[value]?.[lang] || value;
}

export function formatDate(value: string, lang: Lang) {
  if (!isValidDate(value)) return value;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat(lang === 'ja' ? 'ja-JP' : 'en-CA', {
    year: 'numeric',
    month: lang === 'ja' ? 'numeric' : 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function formatStayPeriod(arrival: string, departure: string, lang: Lang) {
  const start = formatDate(arrival, lang);
  const end = formatDate(departure, lang);
  if (start && end) return `${start} ～ ${end}`;
  if (start) return lang === 'ja' ? `${start} から` : `From ${start}`;
  if (end) return lang === 'ja' ? `${end} まで` : `Until ${end}`;
  return '';
}
