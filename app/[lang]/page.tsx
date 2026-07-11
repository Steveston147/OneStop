import Link from 'next/link';
import { CTA, Layout } from '@/components/Public';
import type { Lang } from '@/content/site';
import { mockImageLabel, siteImages } from '@/lib/siteImages';

const copy = {
  ja: {
    eyebrow: '海外教員・研究者受入ワンストップサポート',
    title: '海外教員・研究者の受入準備を、ひとつの窓口で。',
    lead: 'COE・ビザ、宿泊、航空券、到着、生活立ち上げについて、クレオテックが情報を整理し、学内外の関係先と連携します。',
    hostTitle: '学内の受入担当者です',
    hostText: '受入時期、手続き、費用負担、外部連携を時系列で整理します。',
    hostCta: '受入準備を確認する',
    visitorTitle: '海外から来日する予定です',
    visitorText: '来日前の準備、宿泊、到着、日本での生活について確認できます。',
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
    eyebrow: 'International Faculty & Researcher Hosting Support',
    title: 'One clear starting point for hosting and arrival preparation.',
    lead: 'Creotech coordinates information and next steps for COE and visa guidance, accommodation, flights, arrival, and settling into life in Japan.',
    hostTitle: 'I am from a Ritsumeikan host office',
    hostText: 'Check preparation timing, responsibilities, costs, and coordination with external partners.',
    hostCta: 'View the host-office guide',
    visitorTitle: 'I am coming to Japan',
    visitorText: 'Review essential preparation for accommodation, arrival, and your first days in Japan.',
    visitorCta: 'View the visitor guide',
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
    ['2', '支援範囲の整理', '大学、クレオテック、外部先、本人の担当範囲を確認します。'],
    ['3', '費用・日程確認', '必要に応じて見積、予約方法、支払い方法を確認します。'],
    ['4', '支援開始', '合意した内容に沿って連絡調整と実務支援を進めます。'],
  ],
  en: [
    ['1', 'Initial enquiry', 'Share the expected visit and possible support needs with the information currently available.'],
    ['2', 'Scope review', 'Clarify the roles of the university, Creotech, external providers, and the visitor.'],
    ['3', 'Timing and costs', 'Confirm quotations, booking methods, payment responsibility, and key deadlines.'],
    ['4', 'Support begins', 'Coordination and practical support proceed according to the agreed scope.'],
  ],
} as const;

export default function Home({ params }: { params: { lang: Lang } }) {
  const lang = params.lang;
  const t = copy[lang];

  return (
    <Layout lang={lang}>
      <main>
        <section className="home-hero">
          <div className="container home-hero-grid">
            <div className="home-hero-copy">
              <p className="eyebrow">{t.eyebrow}</p>
              <h1>{t.title}</h1>
              <p className="hero-lead">{t.lead}</p>

              <div className="audience-entry-grid">
                <Link className="audience-entry audience-entry-enji" href={`/${lang}/timeline`}>
                  <span className="entry-kicker">Host office</span>
                  <strong>{t.hostTitle}</strong>
                  <p>{t.hostText}</p>
                  <span className="entry-link">{t.hostCta} →</span>
                </Link>
                <Link className="audience-entry audience-entry-navy" href={`/${lang}/visitors`}>
                  <span className="entry-kicker">International visitor</span>
                  <strong>{t.visitorTitle}</strong>
                  <p>{t.visitorText}</p>
                  <span className="entry-link">{t.visitorCta} →</span>
                </Link>
              </div>

              <Link className="text-action" href={`/${lang}/contact`}>
                {t.decided} <span>→</span>
              </Link>
            </div>

            <figure className="hero-photo">
              <img src={siteImages.home.src} alt={siteImages.home.alt[lang]} />
              {siteImages.home.isMock ? <span className="mock-image-badge">{mockImageLabel[lang]}</span> : null}
              <figcaption>International Faculty &amp; Researcher Support</figcaption>
            </figure>
          </div>
        </section>

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
