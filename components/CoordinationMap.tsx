import type { Lang } from '@/content/site';

const copy = {
  ja: {
    eyebrow: 'Creotech Global Welcome at a glance',
    title: '問い合わせ先を探す前に、まずここで整理します。',
    lead: '受入部署から届いた相談を、Creotech Global Welcomeが内容ごとに整理し、学内手続き・外部専門先・宿泊や移動・生活支援へつなぎます。',
    host: '受入部署・附属校',
    hostSub: '受入目的・日程・予算を共有',
    hub: 'Creotech Global Welcome',
    hubSub: '案件を整理し、担当と次の行動を見える化',
    partners: [
      ['学内手続き', 'COE・受入・学内調整'],
      ['専門サービス', '査証・航空券・外部手配'],
      ['宿泊・移動', '候補整理・到着支援'],
      ['生活立ち上げ', '市役所・銀行・通信等'],
    ],
    visitor: '来日予定者・同行家族',
    visitorSub: '必要な案内と支援を受け取る',
    wink: '相談内容が一行でも大丈夫です。書類は増えがちですが、迷子は減らします。',
    label: '受入相談がCreotech Global Welcomeを通じて関係先と来日予定者へつながる流れ',
  },
  en: {
    eyebrow: 'Creotech Global Welcome at a glance',
    title: 'Start here before searching for the right office.',
    lead: 'Creotech Global Welcome organises each enquiry from a host office or affiliated school, then connects it to the relevant university process, specialist provider, accommodation and travel support, or settling-in assistance.',
    host: 'Host office or school',
    hostSub: 'Shares the purpose, timing, and budget',
    hub: 'Creotech Global Welcome',
    hubSub: 'Clarifies responsibilities and the next action',
    partners: [
      ['University process', 'COE, hosting, and internal coordination'],
      ['Specialist services', 'Visa, flights, and external arrangements'],
      ['Stay and travel', 'Options and arrival support'],
      ['Settling in', 'City office, banking, mobile, and more'],
    ],
    visitor: 'Visitor and family',
    visitorSub: 'Receives the relevant guidance and support',
    wink: 'A one-line enquiry is enough to start. Paperwork tends to multiply; confusion does not have to.',
    label: 'Flow from a host enquiry through Creotech Global Welcome to relevant providers and the incoming visitor',
  },
} as const;

export default function CoordinationMap({ lang }: { lang: Lang }) {
  const t = copy[lang];

  return (
    <section className="section coordination-section" aria-labelledby="coordination-map-title">
      <div className="container">
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 className="section-title" id="coordination-map-title">{t.title}</h2>
        <p className="section-lead">{t.lead}</p>

        <div className="coordination-map" aria-label={t.label}>
          <article className="coordination-node coordination-source">
            <span className="coordination-node-number" aria-hidden="true">01</span>
            <strong>{t.host}</strong>
            <p>{t.hostSub}</p>
          </article>

          <span className="coordination-arrow" aria-hidden="true">→</span>

          <article className="coordination-node coordination-hub">
            <span className="coordination-pulse" aria-hidden="true" />
            <small>Coordination hub</small>
            <strong>{t.hub}</strong>
            <p>{t.hubSub}</p>
          </article>

          <span className="coordination-arrow" aria-hidden="true">→</span>

          <div className="coordination-partners">
            {t.partners.map(([title, description], index) => (
              <article key={title}>
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <strong>{title}</strong>
                <p>{description}</p>
              </article>
            ))}
          </div>

          <span className="coordination-arrow" aria-hidden="true">→</span>

          <article className="coordination-node coordination-destination">
            <span className="coordination-node-number" aria-hidden="true">GO</span>
            <strong>{t.visitor}</strong>
            <p>{t.visitorSub}</p>
          </article>
        </div>

        <p className="coordination-wink">{t.wink}</p>
      </div>
    </section>
  );
}
