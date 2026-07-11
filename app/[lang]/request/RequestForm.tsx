'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { submitRequest } from '@/app/actions';
import type { Lang } from '@/content/site';

const applicantCategories = [
  { value: 'Host Office / Faculty', ja: '学内受入担当者・教員', en: 'Ritsumeikan host office or faculty' },
  { value: 'Faculty / Researcher / Guest', ja: '来日予定の教員・研究者・ゲスト', en: 'Incoming faculty, researcher, or guest' },
  { value: 'Family Member', ja: '同行家族', en: 'Accompanying family member' },
  { value: 'Other', ja: 'その他の関係者', en: 'Other related person' },
] as const;

const hostInstitutions = [
  'Ritsumeikan University',
  'Ritsumeikan Asia Pacific University',
  'Other',
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
  { value: 'Campus orientation', ja: 'キャンパス案内', en: 'Campus orientation' },
  { value: 'Other', ja: 'その他', en: 'Other' },
] as const;

const copy = {
  ja: {
    steps: ['あなたについて', '来日・受入予定', '希望する支援', '確認・送信'],
    intro: '4つのステップで初期相談を受け付けます。未確定の項目は空欄でも構いません。',
    privacy: 'パスポート画像、COE書類、在留資格・入管に関する機微書類は、このフォームで送信しないでください。',
    basic: 'あなたについて',
    visit: '来日・受入予定',
    services: '希望する支援',
    confirm: '確認・送信',
    serviceHelp: '可能性のある項目をすべて選択してください。相談後に範囲を整理します。',
    message: 'その他相談内容',
    consent: 'クレオテックが本相談への回答と連絡調整のために送信情報を利用することに同意します。',
    noFiles: '機微書類をこのフォームで送らないことを確認しました。',
    back: '戻る',
    next: '次へ',
    submit: '相談を送信する',
    submitting: '送信中…',
    selectOne: '少なくとも1つ選択してください。',
    required: '必須',
  },
  en: {
    steps: ['About you', 'Visit details', 'Requested support', 'Review and submit'],
    intro: 'Use this four-step form for an initial enquiry. Leave optional items blank when details are not final.',
    privacy: 'Do not send passport images, COE files, or sensitive immigration or residence-status documents through this form.',
    basic: 'About you',
    visit: 'Visit and hosting details',
    services: 'Requested support',
    confirm: 'Review and submit',
    serviceHelp: 'Select all areas that may be relevant. The final scope will be clarified after review.',
    message: 'Additional comments',
    consent: 'I agree that Creotech may use the submitted information to respond to this enquiry and coordinate support.',
    noFiles: 'I confirm that I am not sending sensitive documents through this form.',
    back: 'Back',
    next: 'Next',
    submit: 'Submit enquiry',
    submitting: 'Submitting…',
    selectOne: 'Select at least one support area.',
    required: 'Required',
  },
} as const;

export default function RequestForm({ lang }: { lang: Lang }) {
  const [state, action] = useFormState(submitRequest, {});
  const [step, setStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [serviceError, setServiceError] = useState(false);
  const t = copy[lang];

  function nextStep() {
    if (step === 2 && selectedServices.length === 0) {
      setServiceError(true);
      return;
    }
    setServiceError(false);
    setStep((current) => Math.min(3, current + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function previousStep() {
    setServiceError(false);
    setStep((current) => Math.max(0, current - 1));
  }

  function toggleService(value: string, checked: boolean) {
    setSelectedServices((current) => checked ? [...current, value] : current.filter((item) => item !== value));
    if (checked) setServiceError(false);
  }

  return (
    <form action={action} className="request-form">
      <input type="hidden" name="preferred_language" value={lang === 'ja' ? 'Japanese' : 'English'} />

      <div className="form-intro">
        <p>{t.intro}</p>
      </div>

      <ol className="form-progress" aria-label={lang === 'ja' ? 'フォームの進行状況' : 'Form progress'}>
        {t.steps.map((label, index) => (
          <li className={index === step ? 'is-current' : index < step ? 'is-complete' : ''} key={label}>
            <span>{index + 1}</span>
            <small>{label}</small>
          </li>
        ))}
      </ol>

      <div className="privacy-alert" role="note">{t.privacy}</div>

      {state?.error ? <div className="form-error" role="alert">{state.error}</div> : null}

      <section className={step === 0 ? 'form-step is-visible' : 'form-step'} aria-hidden={step !== 0}>
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
            label={lang === 'ja' ? '受入機関' : 'Host institution'}
            name="host_institution"
            options={hostInstitutions.map((item) => ({ value: item, label: item }))}
            required={step === 0}
            requiredLabel={t.required}
          />
          <TextField label={lang === 'ja' ? '氏名' : 'Full name'} name="full_name" required={step === 0} requiredLabel={t.required} />
          <TextField label={lang === 'ja' ? 'メールアドレス' : 'Email address'} name="email" type="email" required={step === 0} requiredLabel={t.required} />
        </div>
      </section>

      <section className={step === 1 ? 'form-step is-visible' : 'form-step'} aria-hidden={step !== 1}>
        <h2>{t.visit}</h2>
        <div className="form-grid">
          <TextField label={lang === 'ja' ? '受入部署・所属' : 'Host department or affiliation'} name="host_department" />
          <TextField label={lang === 'ja' ? '学内担当者名（分かる場合）' : 'Host contact person, if known'} name="host_contact" />
          <TextField label={lang === 'ja' ? '現在の居住国' : 'Current country of residence'} name="current_country" />
          <TextField label={lang === 'ja' ? '国籍' : 'Nationality'} name="nationality" />
          <TextField label={lang === 'ja' ? '来日予定日' : 'Planned arrival date'} name="planned_arrival_date" type="date" />
          <TextField label={lang === 'ja' ? '出国予定日' : 'Planned departure date'} name="planned_departure_date" type="date" />
          <TextField label={lang === 'ja' ? '同行家族人数' : 'Number of accompanying family members'} name="family_members" type="number" min="0" />
        </div>
      </section>

      <section className={step === 2 ? 'form-step is-visible' : 'form-step'} aria-hidden={step !== 2}>
        <h2>{t.services}</h2>
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
      </section>

      <section className={step === 3 ? 'form-step is-visible' : 'form-step'} aria-hidden={step !== 3}>
        <h2>{t.confirm}</h2>
        <label className="label" htmlFor="message">{t.message}</label>
        <textarea className="input textarea" id="message" name="message" />
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

function TextField({ label, name, type = 'text', required = false, requiredLabel, min }: { label: string; name: string; type?: string; required?: boolean; requiredLabel?: string; min?: string }) {
  return (
    <div>
      <label className="label" htmlFor={name}>{label}{required ? <span className="required-mark">{requiredLabel}</span> : null}</label>
      <input className="input" id={name} name={name} type={type} required={required} min={min} />
    </div>
  );
}

function SelectField({ label, name, options, required = false, requiredLabel }: { label: string; name: string; options: { value: string; label: string }[]; required?: boolean; requiredLabel?: string }) {
  return (
    <div>
      <label className="label" htmlFor={name}>{label}{required ? <span className="required-mark">{requiredLabel}</span> : null}</label>
      <select className="input" id={name} name={name} required={required} defaultValue="">
        <option value="">—</option>
        {options.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
      </select>
    </div>
  );
}

function SubmitButton({ idle, pending }: { idle: string; pending: string }) {
  const status = useFormStatus();
  return <button disabled={status.pending} className="btn btn-cta" type="submit">{status.pending ? pending : idle}</button>;
}
