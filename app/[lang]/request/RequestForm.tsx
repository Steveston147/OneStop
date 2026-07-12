'use client';

import { useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { submitRequest } from '@/app/actions';
import type { Lang } from '@/content/site';

const applicantCategories = [
  { value: 'Host Office / Faculty', ja: '受入部署の担当者・教員', en: 'Host office staff or faculty member' },
  { value: 'Faculty / Researcher / Guest', ja: '来日予定の教員・研究者・ゲスト', en: 'Incoming faculty, researcher, or guest' },
  { value: 'Family Member', ja: '同行家族', en: 'Accompanying family member' },
  { value: 'Other', ja: 'その他の関係者', en: 'Other related person' },
] as const;

const hostInstitutions = [
  { value: 'Ritsumeikan University', ja: '立命館大学', en: 'Ritsumeikan University' },
  { value: 'Ritsumeikan Asia Pacific University', ja: '立命館アジア太平洋大学（APU）', en: 'Ritsumeikan Asia Pacific University (APU)' },
  { value: 'Ritsumeikan Junior & Senior High School (Nagaokakyo)', ja: '立命館中学校・高等学校（長岡京）', en: 'Ritsumeikan Junior & Senior High School (Nagaokakyo)' },
  { value: 'Ritsumeikan Uji Junior & Senior High School', ja: '立命館宇治中学校・高等学校', en: 'Ritsumeikan Uji Junior & Senior High School' },
  { value: 'Ritsumeikan Moriyama Junior & Senior High School', ja: '立命館守山中学校・高等学校', en: 'Ritsumeikan Moriyama Junior & Senior High School' },
  { value: 'Ritsumeikan Primary School', ja: '立命館小学校', en: 'Ritsumeikan Primary School' },
  { value: 'Other', ja: 'その他', en: 'Other' },
] as const;

const requestedServices = [
  { value: 'COE / Visa guidance', ja: 'COE・ビザ関連支援', en: 'COE and visa guidance' },
  { value: 'Accommodation support', ja: '宿泊・住居支援', en: 'Accommodation and housing' },
  { value: 'Flight support', ja: '航空券に関する支援', en: 'Flight support' },
  { value: 'Airport meet and assist', ja: '空港到着・待ち合わせ支援', en: 'Airport arrival support' },
  { value: 'City office support', ja: '市役所手続き支援', en: 'City-office support' },
  { value: 'Bank account support', ja: '銀行口座支援', en: 'Bank-account support' },
  { value: 'Mobile / SIM / Internet', ja: '携帯電話・SIM・通信支援', en: 'Mobile, SIM, and internet support' },
  { value: 'Family support', ja: '同行家族支援', en: 'Accompanying family support' },
  { value: 'Campus orientation', ja: 'キャンパス・校内案内', en: 'Campus or school orientation' },
  { value: 'Other', ja: 'その他', en: 'Other' },
] as const;

const copy = {
  ja: {
    steps: ['あなたについて', '来日・受入予定', '希望する支援', '確認・送信'],
    intro: '4つのステップで初期相談を受け付けます。未確定の項目は空欄でも構いません。',
    wink: '「まだ何も決まっていない」も立派な相談のスタートです。書類は増えがちですが、迷子は減らします。',
    privacy: 'パスポート画像、COE書類、在留資格・入管に関する機微書類は、このフォームで送信しないでください。',
    basic: 'あなたについて',
    visit: '来日・受入予定',
    services: '希望する支援',
    confirm: '確認・送信',
    confirmLead: '送信前に内容をご確認ください。「変更」から該当する画面へ戻れます。',
    serviceHelp: '可能性のある項目をすべて選択してください。相談後に範囲を整理します。',
    message: 'その他相談内容（任意）',
    consent: 'クレオテックが本相談への回答と連絡調整のために送信情報を利用することに同意します。',
    noFiles: '機微書類をこのフォームで送らないことを確認しました。',
    back: '戻る',
    next: '次へ',
    change: '変更',
    submit: '相談を送信する',
    submitting: '送信中…',
    selectOne: '少なくとも1つ選択してください。',
    required: '必須',
    optional: '任意',
    notEntered: '未入力',
    institutionHint: '立命館大学、APU、附属校は正式な機関名を選択してください。',
    otherInstitutionHint: '「その他」を選択した場合は、所属機関名を次の画面で入力してください。',
    reviewAbout: 'あなたについて',
    reviewVisit: '来日・受入予定',
    reviewServices: '希望する支援',
  },
  en: {
    steps: ['About you', 'Visit details', 'Requested support', 'Review and submit'],
    intro: 'Use this four-step form for an initial enquiry. Leave optional items blank when details are not final.',
    wink: '“Nothing is final yet” is a perfectly good starting point. Paperwork tends to multiply; confusion does not have to.',
    privacy: 'Do not send passport images, COE files, or sensitive immigration or residence-status documents through this form.',
    basic: 'About you',
    visit: 'Visit and hosting details',
    services: 'Requested support',
    confirm: 'Review and submit',
    confirmLead: 'Check the details before submitting. Use “Change” to return to the relevant step.',
    serviceHelp: 'Select all areas that may be relevant. The final scope will be clarified after review.',
    message: 'Additional comments (optional)',
    consent: 'I agree that Creotech may use the submitted information to respond to this enquiry and coordinate support.',
    noFiles: 'I confirm that I am not sending sensitive documents through this form.',
    back: 'Back',
    next: 'Next',
    change: 'Change',
    submit: 'Submit enquiry',
    submitting: 'Submitting…',
    selectOne: 'Select at least one support area.',
    required: 'Required',
    optional: 'Optional',
    notEntered: 'Not entered',
    institutionHint: 'Select the formal name of Ritsumeikan University, APU, or the affiliated school.',
    otherInstitutionHint: 'When “Other” is selected, enter the institution name on the next step.',
    reviewAbout: 'About you',
    reviewVisit: 'Visit and hosting details',
    reviewServices: 'Requested support',
  },
} as const;

type ReviewData = {
  role: string;
  institution: string;
  fullName: string;
  email: string;
  hostDepartment: string;
  hostContact: string;
  currentCountry: string;
  nationality: string;
  arrival: string;
  departure: string;
  familyMembers: string;
  services: string[];
};

export default function RequestForm({ lang }: { lang: Lang }) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [state, action] = useFormState(submitRequest, {});
  const [step, setStep] = useState(0);
  const [hostInstitution, setHostInstitution] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [serviceError, setServiceError] = useState(false);
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const t = copy[lang];
  const otherInstitution = hostInstitution === 'Other';

  function validateVisibleStep() {
    const activeStep = formRef.current?.querySelector<HTMLElement>(`[data-form-step="${step}"]`);
    if (!activeStep) return true;

    const fields = Array.from(
      activeStep.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea'),
    );

    for (const field of fields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        field.focus();
        return false;
      }
    }

    return true;
  }

  function buildReviewData(): ReviewData | null {
    if (!formRef.current) return null;
    const data = new FormData(formRef.current);
    const value = (name: string) => String(data.get(name) || '').trim() || t.notEntered;
    const roleValue = String(data.get('applicant_category') || '');
    const institutionValue = String(data.get('host_institution') || '');
    const role = applicantCategories.find((item) => item.value === roleValue)?.[lang] || value('applicant_category');
    const institution = hostInstitutions.find((item) => item.value === institutionValue)?.[lang] || value('host_institution');
    const services = data
      .getAll('requested_services')
      .map(String)
      .map((serviceValue) => requestedServices.find((item) => item.value === serviceValue)?.[lang] || serviceValue);

    return {
      role,
      institution,
      fullName: value('full_name'),
      email: value('email'),
      hostDepartment: value('host_department'),
      hostContact: value('host_contact'),
      currentCountry: value('current_country'),
      nationality: value('nationality'),
      arrival: value('planned_arrival_date'),
      departure: value('planned_departure_date'),
      familyMembers: value('family_members'),
      services,
    };
  }

  function nextStep() {
    if (!validateVisibleStep()) return;

    if (step === 2 && selectedServices.length === 0) {
      setServiceError(true);
      return;
    }

    setServiceError(false);
    if (step === 2) setReviewData(buildReviewData());
    setStep((current) => Math.min(3, current + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function previousStep() {
    setServiceError(false);
    setStep((current) => Math.max(0, current - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goToStep(target: number) {
    setServiceError(false);
    setStep(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function toggleService(value: string, checked: boolean) {
    setSelectedServices((current) => checked ? [...current, value] : current.filter((item) => item !== value));
    if (checked) setServiceError(false);
  }

  return (
    <form action={action} className="request-form" ref={formRef}>
      <input type="hidden" name="preferred_language" value={lang === 'ja' ? 'Japanese' : 'English'} />

      <div className="form-intro">
        <p>{t.intro}</p>
        <span className="form-intro-wink">{t.wink}</span>
      </div>

      <ol className="form-progress" aria-label={lang === 'ja' ? 'フォームの進行状況' : 'Form progress'}>
        {t.steps.map((label, index) => (
          <li className={index === step ? 'is-current' : index < step ? 'is-complete' : ''} key={label} aria-current={index === step ? 'step' : undefined}>
            <span>{index + 1}</span>
            <small>{label}</small>
          </li>
        ))}
      </ol>

      <div className="privacy-alert" role="note">{t.privacy}</div>

      {state?.error ? <div className="form-error" role="alert">{state.error}</div> : null}

      <section className={step === 0 ? 'form-step is-visible' : 'form-step'} aria-hidden={step !== 0} data-form-step="0">
        <h2>{t.basic}</h2>
        <div className="form-grid">
          <SelectField
            label={lang === 'ja' ? '利用者区分' : 'Your role'}
            name="applicant_category"
            options={applicantCategories.map((item) => ({ value: item.value, label: item[lang] }))}
            required={step === 0}
            requiredLabel={t.required}
          />
          <SelectField
            label={lang === 'ja' ? '受入機関・所属' : 'Host institution'}
            name="host_institution"
            options={hostInstitutions.map((item) => ({ value: item.value, label: item[lang] }))}
            required={step === 0}
            requiredLabel={t.required}
            hint={otherInstitution ? t.otherInstitutionHint : t.institutionHint}
            onChange={setHostInstitution}
          />
          <TextField label={lang === 'ja' ? '氏名' : 'Full name'} name="full_name" required={step === 0} requiredLabel={t.required} />
          <TextField label={lang === 'ja' ? 'メールアドレス' : 'Email address'} name="email" type="email" required={step === 0} requiredLabel={t.required} />
        </div>
      </section>

      <section className={step === 1 ? 'form-step is-visible' : 'form-step'} aria-hidden={step !== 1} data-form-step="1">
        <h2>{t.visit}</h2>
        <div className="form-grid">
          {otherInstitution ? (
            <p className="institution-context">
              {lang === 'ja' ? '「その他」が選択されています。所属機関名を含めて入力してください。' : '“Other” is selected. Include the institution name below.'}
            </p>
          ) : null}
          <TextField
            label={otherInstitution
              ? (lang === 'ja' ? 'その他の所属機関名・受入部署名' : 'Other institution and host department')
              : (lang === 'ja' ? '受入部署・所属（分かる場合）' : 'Host department or affiliation, if known')}
            name="host_department"
            required={otherInstitution && step === 1}
            requiredLabel={t.required}
          />
          <TextField label={lang === 'ja' ? '学内・校内担当者名（分かる場合）' : 'Host contact person, if known'} name="host_contact" />
          <TextField label={lang === 'ja' ? '現在の居住国' : 'Current country of residence'} name="current_country" />
          <TextField label={lang === 'ja' ? '国籍' : 'Nationality'} name="nationality" />
          <TextField label={lang === 'ja' ? '来日予定日' : 'Planned arrival date'} name="planned_arrival_date" type="date" />
          <TextField label={lang === 'ja' ? '出国予定日' : 'Planned departure date'} name="planned_departure_date" type="date" />
          <TextField label={lang === 'ja' ? '同行家族人数' : 'Number of accompanying family members'} name="family_members" type="number" min="0" />
        </div>
      </section>

      <fieldset className={step === 2 ? 'form-step is-visible' : 'form-step'} aria-hidden={step !== 2} data-form-step="2">
        <legend><span className="form-step-heading">{t.services}</span></legend>
        <p className="form-step-lead">{t.serviceHelp}</p>
        <div className="service-check-grid">
          {requestedServices.map((service) => (
            <label className={selectedServices.includes(service.value) ? 'service-check is-selected' : 'service-check'} key={service.value}>
              <input
                name="requested_services"
                value={service.value}
                type="checkbox"
                onChange={(event) => toggleService(service.value, event.target.checked)}
              />
              <span>{service[lang]}</span>
            </label>
          ))}
        </div>
        {serviceError ? <p className="field-error" role="alert">{t.selectOne}</p> : null}
      </fieldset>

      <section className={step === 3 ? 'form-step is-visible' : 'form-step'} aria-hidden={step !== 3} data-form-step="3">
        <h2>{t.confirm}</h2>
        <p className="review-intro">{t.confirmLead}</p>

        {reviewData ? (
          <div className="review-summary">
            <ReviewSection title={t.reviewAbout} changeLabel={t.change} onChange={() => goToStep(0)}>
              <ReviewRow label={lang === 'ja' ? '利用者区分' : 'Your role'} value={reviewData.role} />
              <ReviewRow label={lang === 'ja' ? '受入機関・所属' : 'Host institution'} value={reviewData.institution} />
              <ReviewRow label={lang === 'ja' ? '氏名' : 'Full name'} value={reviewData.fullName} />
              <ReviewRow label={lang === 'ja' ? 'メールアドレス' : 'Email address'} value={reviewData.email} />
            </ReviewSection>

            <ReviewSection title={t.reviewVisit} changeLabel={t.change} onChange={() => goToStep(1)}>
              <ReviewRow label={lang === 'ja' ? '受入部署・所属' : 'Host department'} value={reviewData.hostDepartment} />
              <ReviewRow label={lang === 'ja' ? '担当者' : 'Host contact'} value={reviewData.hostContact} />
              <ReviewRow label={lang === 'ja' ? '現在の居住国' : 'Current country'} value={reviewData.currentCountry} />
              <ReviewRow label={lang === 'ja' ? '国籍' : 'Nationality'} value={reviewData.nationality} />
              <ReviewRow label={lang === 'ja' ? '来日予定日' : 'Arrival date'} value={reviewData.arrival} />
              <ReviewRow label={lang === 'ja' ? '出国予定日' : 'Departure date'} value={reviewData.departure} />
              <ReviewRow label={lang === 'ja' ? '同行家族人数' : 'Accompanying family members'} value={reviewData.familyMembers} />
            </ReviewSection>

            <ReviewSection title={t.reviewServices} changeLabel={t.change} onChange={() => goToStep(2)}>
              <div className="review-row">
                <dt>{lang === 'ja' ? '選択した支援' : 'Selected support'}</dt>
                <dd className="review-services">
                  {reviewData.services.map((service) => <span key={service}>{service}</span>)}
                </dd>
              </div>
            </ReviewSection>
          </div>
        ) : null}

        <div className="review-message-block">
          <label className="label" htmlFor="message">{t.message}</label>
          <textarea className="input textarea" id="message" name="message" />
        </div>
        <label className="consent-row">
          <input type="checkbox" name="consent" required={step === 3} />
          <span>{t.consent}</span>
        </label>
        <label className="consent-row">
          <input type="checkbox" required={step === 3} />
          <span>{t.noFiles}</span>
        </label>
      </section>

      <div className="form-navigation">
        {step > 0 ? <button className="btn btn-secondary" type="button" onClick={previousStep}>{t.back}</button> : <span />}
        {step < 3 ? <button className="btn btn-cta" type="button" onClick={nextStep}>{t.next}</button> : <SubmitButton idle={t.submit} pending={t.submitting} />}
      </div>
    </form>
  );
}

function TextField({ label, name, type = 'text', required = false, requiredLabel, min, hint }: { label: string; name: string; type?: string; required?: boolean; requiredLabel?: string; min?: string; hint?: string }) {
  const hintId = hint ? `${name}-hint` : undefined;
  return (
    <div>
      <label className="label" htmlFor={name}>{label}{required ? <span className="required-mark">{requiredLabel}</span> : null}</label>
      <input className="input" id={name} name={name} type={type} required={required} min={min} aria-describedby={hintId} />
      {hint ? <p className="field-hint" id={hintId}>{hint}</p> : null}
    </div>
  );
}

function SelectField({ label, name, options, required = false, requiredLabel, hint, onChange }: { label: string; name: string; options: { value: string; label: string }[]; required?: boolean; requiredLabel?: string; hint?: string; onChange?: (value: string) => void }) {
  const hintId = hint ? `${name}-hint` : undefined;
  return (
    <div>
      <label className="label" htmlFor={name}>{label}{required ? <span className="required-mark">{requiredLabel}</span> : null}</label>
      <select
        className="input"
        id={name}
        name={name}
        required={required}
        defaultValue=""
        aria-describedby={hintId}
        onChange={(event) => onChange?.(event.target.value)}
      >
        <option value="">—</option>
        {options.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
      </select>
      {hint ? <p className="field-hint" id={hintId}>{hint}</p> : null}
    </div>
  );
}

function ReviewSection({ title, changeLabel, onChange, children }: { title: string; changeLabel: string; onChange: () => void; children: React.ReactNode }) {
  return (
    <section className="review-section">
      <div className="review-section-header">
        <h3>{title}</h3>
        <button className="review-change" type="button" onClick={onChange}>{changeLabel}</button>
      </div>
      <dl className="review-list">{children}</dl>
    </section>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="review-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function SubmitButton({ idle, pending }: { idle: string; pending: string }) {
  const status = useFormStatus();
  return <button disabled={status.pending} className="btn btn-cta" type="submit">{status.pending ? pending : idle}</button>;
}
