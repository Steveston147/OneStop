'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitRequest } from '@/app/actions';
import type { Lang } from '@/content/site';

const applicantCategories = [
  'Faculty',
  'Researcher',
  'Visiting Scholar',
  'Family Member',
  'Administrative Staff',
  'Student',
  'High School Student',
  'Other',
];

const hostInstitutions = [
  'Ritsumeikan University',
  'Ritsumeikan Asia Pacific University',
  'Affiliated School',
  'Other',
];

const requestedServices = [
  'COE / Visa guidance',
  'Flight support',
  'Airport meet and assist',
  'Housing support',
  'Mobile / SIM / Internet',
  'Insurance guidance',
  'City office support',
  'Bank account support',
  'Family support',
  'KVH Personal Assistance',
  'Departure support',
  'Other',
];

const copy = {
  ja: {
    desktop: '詳細な依頼にはデスクトップまたはノートPCの利用をおすすめします。',
    basic: '基本情報',
    visit: '訪問詳細',
    services: '希望する支援',
    schoolNote:
      '高校生・附属校案件は個別相談で対応します。保護者や受入校に関する追加情報は後日確認する場合があります。',
    privacy:
      '本フォームではパスポート画像、在留資格証明書、機微な入管書類をアップロード・送信しないでください。',
    consent: 'Creotechが本依頼への回答のために送信情報を利用することに同意します。',
    submit: '依頼を送信する',
    submitting: '送信中...',
  },
  en: {
    desktop: 'For detailed requests, we recommend using a desktop or laptop computer.',
    basic: 'Basic Information',
    visit: 'Visit Details',
    services: 'Requested Services',
    schoolNote:
      'High school student and affiliated school cases are handled by individual consultation. Additional guardian and host school information may be required later.',
    privacy:
      'Do not upload or send passport images, COE files, or sensitive immigration documents through this MVP form.',
    consent: 'I agree that Creotech may use the submitted information to respond to this request.',
    submit: 'Submit request',
    submitting: 'Submitting...',
  },
};

export default function RequestForm({ lang }: { lang: Lang }) {
  const [state, action] = useFormState(submitRequest, {});
  const t = copy[lang];

  return (
    <form action={action} className="grid gap-8">
      <div className="rounded-2xl border border-blue-100 bg-sky p-5 text-lg font-bold text-navy">
        {t.desktop}
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 font-semibold text-navy">
        {t.privacy}
      </div>

      {state?.error ? (
        <div className="rounded-2xl border border-red-300 bg-red-50 p-5 font-bold text-red-800" role="alert">
          {state.error}
        </div>
      ) : null}

      <FormSection title={t.basic}>
        <SelectField label="Preferred language" name="preferred_language" options={['Japanese', 'English']} required />
        <SelectField label="Applicant category" name="applicant_category" options={applicantCategories} required />
        <SelectField label="Host institution" name="host_institution" options={hostInstitutions} required />
        <TextField label="Full name" name="full_name" required />
        <TextField label="Email" name="email" type="email" required />
      </FormSection>

      <FormSection title={t.visit}>
        <TextField label="Host department or school name" name="host_department" />
        <TextField label="Contact person at host department, if known" name="host_contact" />
        <TextField label="Current country" name="current_country" />
        <TextField label="Nationality" name="nationality" />
        <TextField label="Planned arrival date" name="planned_arrival_date" type="date" />
        <TextField label="Planned departure date" name="planned_departure_date" type="date" />
        <TextField label="Number of accompanying family members" name="family_members" type="number" min="0" />
      </FormSection>

      <section className="card p-8">
        <h2 className="text-2xl font-extrabold text-navy">{t.services}</h2>
        <p className="mt-2 text-ink">Select all services that may be relevant. Creotech staff will help narrow the scope.</p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {requestedServices.map((service) => (
            <label
              className="flex min-h-14 items-center gap-3 rounded-xl border border-line bg-white p-4 font-semibold hover:border-accent"
              key={service}
            >
              <input name="requested_services" value={service} type="checkbox" className="h-5 w-5" />
              {service}
            </label>
          ))}
        </div>
        <p className="mt-5 rounded-xl bg-mist p-4 font-semibold text-navy">{t.schoolNote}</p>
      </section>

      <section className="card p-8">
        <label className="label" htmlFor="message">
          Message
        </label>
        <textarea className="input min-h-36" id="message" name="message" />
        <label className="mt-5 flex gap-3 font-bold text-navy">
          <input type="checkbox" name="consent" className="mt-1 h-5 w-5" />
          {t.consent}
        </label>
        <SubmitButton idle={t.submit} pending={t.submitting} />
      </section>
    </form>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card p-8">
      <h2 className="text-2xl font-extrabold text-navy">{title}</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2">{children}</div>
    </section>
  );
}

function TextField({
  label,
  name,
  type = 'text',
  required,
  min,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  min?: string;
}) {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label} {required ? <span className="text-accent">*</span> : null}
      </label>
      <input className="input" id={name} name={name} type={type} required={required} min={min} />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label} {required ? <span className="text-accent">*</span> : null}
      </label>
      <select className="input" id={name} name={name} required={required} defaultValue="">
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

function SubmitButton({ idle, pending }: { idle: string; pending: string }) {
  const status = useFormStatus();
  return (
    <button disabled={status.pending} className="btn btn-primary mt-6 min-w-48 disabled:opacity-60">
      {status.pending ? pending : idle}
    </button>
  );
}
