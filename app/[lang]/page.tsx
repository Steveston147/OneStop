import Link from 'next/link';
import { CTA, Layout } from '@/components/Public';
import CoordinationMap from '@/components/CoordinationMap';
import type { Lang } from '@/content/site';
import { mockImageLabel, siteImages } from '@/lib/siteImages';

const copy = {
  ja: {
    eyebrow: 'Ritsumeikan Academy × Creotech',
    titleLine1: 'CREOTECH',
    titleLine2: 'GLOBAL WELCOME',
    descriptor: '海外教員・研究者受入支援サービス',
    lead: '招へい準備から来日後の生活立ち上げまで、ひとつの窓口で。立命館大学、APU、附属校を対象に、COE・ビザ、宿泊、航空券、到着、生活支援を整理し、関係先と連携します。',
    hostTitle: '立命館の受入担当者です',
    hostText: '受入準備の手順、必要な手続き、費用の目安、関係窓口との連携方法を確認できます。',
    hostCta: '受入準備を確認する',
    visitorTitle: '海外から来日する予定です',
    visitorText: '来日前に必要な準備や手続き、宿泊・生活に関する情報を確認できます。',
    visitorCta: '来日前ガイドを見る',
    decided: '相談内容が決まっている方はこちら',
    supportEyebrow: 'Support menu',
    supportTitle: '必要な支援を、迷わず確認できます。',
    supportLead: '相談の入口を5つに整理しました。詳細が決まっていなくても構いません。',
    processEyebrow: 'How it works',
    processTitle: '相談から支援開始まで。',
    processLead: 'まず受入概要を確認し、必要な支援と担当範囲を整理します。',
  },
  en: {
    eyebrow: 'Ritsumeikan Academy × Creotech',
    titleLine1: 'CREOTECH',
    titleLine2: 'GLOBAL WELCOME',
    descriptor: 'International Faculty & Researcher Support',
    lead: 'From invitation and pre-arrival preparation to arrival and settling in, one coordinated service. Across Ritsumeikan University, APU, and affiliated schools, we organise COE and visa guidance, accommodation, flights, arrival, and daily-life support with the appropriate university and external partners.',
    hostTitle: 'I am from a Ritsumeikan host office',
    hostText: 'Review hosting procedures, expected costs, responsibilities, and coordination with the relevant university, school, and external contacts.',
    hostCta: 'View the host-office guide',
    visitorTitle: 'I am coming to Japan',
    visitorText: 'Review the essential preparation, procedures, accommodation, and daily-life information needed before arrival.',
    visitorCta: 'View the pre-arrival guide',
    decided: 'Already know what support you need?',
    supportEyebrow: 'Support menu',
    supportTitle: 'Find the right support without searching across multiple offices.',
    supportLead: 'The main support areas are grouped into five clear entry points.',
    processEyebrow: 'How it works',
    processTitle: 'From enquiry to confirmed support.',
    processLead: 'We first review the hosting outline, then clarify responsibilities, costs, and the next action.',
  },
} as const;

const services = {
  ja: [
    ['01', 'COE・ビザ関連支援', '必要情報の整理と、大学・外部専門サービスへの適切な橋渡し。'],
    ['02', '宿泊・住居支援', 'キャンパス、滞在期間、予算、家族帯同に応じた候補整理。'],
    ['03', '航空券・関空到着支援', '航空券、到着時の待ち合わせ、移動支援を関係先と調整。'],
    ['04', '生活立ち上げ支援', '市役所、銀行、携帯電話、キャンパス案内等の初期支援。'],
    ['05', '短期ゲスト向け支援', '短期招聘教員・研究者・来賓向けの必要項目をコンパクトに調整。'],
  ],
  en: [
    ['01', 'COE and visa guidance', 'Organise the required information and connect the case to the correct university or specialist process.'],
    ['02', 'Accommodation and housing', 'Compare options by campus, length of stay, budget, and accompanying family needs.'],
    ['03', 'Flights and arrival support', 'Coordinate flight guidance, airport meeting, and onward travel support with relevant partners.'],
    ['04', 'Settling-in support', 'Support for city-office procedures, banking, mobile services, and campus orientation.'],
    ['05', 'Short-term guest support', 'A focused package for invited faculty, researchers, speakers, and other short-term guests.'],
  ],
} as const;

const process = {
  ja: [
    ['1', '初期相談', '分かる範囲で受入予定と希望支援を共有します。'],
    ['2', '支援範囲の整理', '大学・附属校、クレオテック、外部先、本人の担当範囲を確認します。'],
    ['3', '費用・日程確認', '必要に応じて見積、予約方法、支払い方法を確認します。'],
    ['4', '支援開始', '合意した内容に沿って連絡調整と実務支援を進めます。'],
  ],
  en: [
    ['1', 'Initial enquiry', 'Share the expected visit and possible support needs with the information currently available.'],
    ['2', 'Scope review', 'Clarify the roles of the university or school, Creotech, external providers, and the visitor.'],
    ['3', 'Timing and costs', 'Confirm quotations, booking methods, payment responsibility, and key deadlines.'],
    ['4', 'Support begins', 'Coordination and practical support proceed according to the agreed scope.'],
  ],
} as const;

function HostOfficeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M4 10h16M5.5 10v8.5M9.8 10v8.5M14.2 10v8.5M18.5 10v8.5M3.5 19h17M12 4l8 4.5H4L12 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VisitorIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="m3.5 14.5 7-3.2 3.3-6.5c.5-.9 1.5-1.4 2.5-1l.4.2c.9.4 1.3 1.4.9 2.3l-2 5.2 4.7 2.4c.9.5 1.3 1.6.8 2.5l-.2.3c-.4.8-1.4 1.2-2.3.8l-5-2.2-3.2 4.4-1.9-.9 1.7-4.7-4.8 1.8-1.9-1.4Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolved = await params;
  if (resolved.lang !== 'ja' && resolved.lang !== 'en') return null;
  const lang: Lang = resolved.lang;
  const t = copy[lang];

  return (
    <Layout lang={lang}>
      <main>
        <section className="home-hero premium-home-hero compact-brand-hero global-welcome-hero">
          <div className="container home-hero-grid premium-home-hero-grid">
            <div className="home-hero-copy premium-home-hero-copy">
              <div className="hero-context-label">
                <p className="eyebrow">{t.eyebrow}</p>
                <span aria-hidden="true" />
              </div>
              <h1>
                <span className="hero-title-line">{t.titleLine1}</span>
                <span className="hero-title-line">{t.titleLine2}</span>
              </h1>
              <p className="hero-brand-descriptor">{t.descriptor}</p>
              <p className="hero-lead premium-hero-lead">{t.lead}</p>

              <div className="audience-entry-grid premium-audience-entry-grid">
                <Link className="audience-entry audience-entry-enji premium-audience-entry" href={`/${lang}/timeline`}>
                  <div className="entry-heading-row">
                    <span className="entry-icon entry-icon-enji"><HostOfficeIcon /></span>
                    <div>
                      <span className="entry-kicker">Host office</span>
                      <strong>{t.hostTitle}</strong>
                    </div>
                  </div>
                  <p>{t.hostText}</p>
                  <span className="entry-link">{t.hostCta} →</span>
                </Link>
                <Link className="audience-entry audience-entry-navy premium-audience-entry" href={`/${lang}/visitors`}>
                  <div className="entry-heading-row">
                    <span className="entry-icon entry-icon-navy"><VisitorIcon /></span>
                    <div>
                      <span className="entry-kicker">International visitor</span>
                      <strong>{t.visitorTitle}</strong>
                    </div>
                  </div>
                  <p>{t.visitorText}</p>
                  <span className="entry-link">{t.visitorCta} →</span>
                </Link>
              </div>

              <Link className="text-action premium-text-action" href={`/${lang}/contact`}>
                {t.decided} <span>→</span>
              </Link>
            </div>

            <figure className="hero-photo premium-hero-photo">
              <img src={siteImages.home.src} alt={siteImages.home.alt[lang]} />
              {siteImages.home.isMock ? <span className="mock-image-badge">{mockImageLabel[lang]}</span> : null}
              <figcaption>Creotech Global Welcome</figcaption>
            </figure>
          </div>
        </section>

        <CoordinationMap lang={lang} />

        <section className="section section-white">
          <div className="container">
            <p className="eyebrow">{t.supportEyebrow}</p>
            <h2 className="section-title">{t.supportTitle}</h2>
            <p className="section-lead">{t.supportLead}</p>
            <div className="service-overview-grid">
              {services[lang].map(([number, title, description]) => (
                <Link className="service-overview-card" href={`/${lang}/services`} key={title}>
                  <span className="service-number">{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span className="card-arrow" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-soft">
          <div className="container">
            <p className="eyebrow">{t.processEyebrow}</p>
            <h2 className="section-title">{t.processTitle}</h2>
            <p className="section-lead">{t.processLead}</p>
            <ol className="process-grid">
              {process[lang].map(([number, title, description]) => (
                <li key={title}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <CTA lang={lang} />
      </main>
    </Layout>
  );
}
