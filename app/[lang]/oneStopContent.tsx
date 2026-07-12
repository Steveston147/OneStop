import Link from 'next/link';
import RequestForm from './request/RequestForm';
import type { Lang } from '@/content/site';
import { mockImageLabel, siteImages, type SiteImage } from '@/lib/siteImages';

export type OneStopSlug = 'services' | 'timeline' | 'accommodation' | 'fees' | 'faq' | 'visitors' | 'contact';

export const pageMeta: Record<Lang, Record<OneStopSlug, readonly [string, string]>> = {
  ja: {
    services: ['サポート内容', 'COE・ビザ、宿泊、航空券、到着、生活立ち上げの支援範囲を確認できます。'],
    timeline: ['準備スケジュール', '4月・9月着任、短期滞在の準備時期を確認できます。'],
    accommodation: ['宿泊・生活', '滞在期間、キャンパス、予算、家族帯同に応じた候補の見方を整理します。'],
    fees: ['費用の考え方', '本人負担、学内部署負担、外部委託費、実費を分けて確認します。'],
    faq: ['よくある質問', '相談前によく確認される点を簡潔にまとめています。'],
    visitors: ['海外から来日する方へ', '来日前から日本での生活開始まで、最初に確認する項目を案内します。'],
    contact: ['初期相談', '分かる範囲の情報から、実際に送信できる相談フォームへ進めます。'],
  },
  en: {
    services: ['Support services', 'Review the scope of COE and visa guidance, accommodation, flights, arrival, and settling-in support.'],
    timeline: ['Preparation timeline', 'Check recommended timing for April and September appointments and short visits.'],
    accommodation: ['Accommodation and daily life', 'Compare options by campus, length of stay, budget, and accompanying family needs.'],
    fees: ['How costs are handled', 'Separate personal costs, host-office costs, partner fees, and actual expenses.'],
    faq: ['Frequently asked questions', 'Practical answers to the points most often checked before an enquiry.'],
    visitors: ['For international visitors', 'Start with the key actions before arrival and during your first days in Japan.'],
    contact: ['Initial enquiry', 'Use the working enquiry form and provide only the information currently available.'],
  },
};

export const pageHeroDetails: Record<Lang, Record<OneStopSlug, { label: string; chips: readonly string[]; cta: string }>> = {
  ja: {
    services: { label: 'Support overview', chips: ['支援範囲', '担当区分', '外部連携'], cta: '必要な支援を確認' },
    timeline: { label: 'Preparation guide', chips: ['4月着任', '9月着任', '短期滞在'], cta: '早めの相談を推奨' },
    accommodation: { label: 'Accommodation', chips: ['キャンパス', '滞在期間', '家族帯同'], cta: '条件から候補を整理' },
    fees: { label: 'Fees and payment', chips: ['本人負担', '学内部署負担', '個別見積'], cta: '費用区分を確認' },
    faq: { label: 'Quick answers', chips: ['対象者', '予約', 'COE・ビザ'], cta: '相談前に確認' },
    visitors: { label: 'Visitor guide', chips: ['Before arrival', 'First week', 'Daily life'], cta: '来日前から順に確認' },
    contact: { label: 'First consultation', chips: ['4ステップ', '機微書類不要', '受付番号発行'], cta: '実際に送信できます' },
  },
  en: {
    services: { label: 'Support overview', chips: ['Scope', 'Responsibilities', 'Partners'], cta: 'Find the right support' },
    timeline: { label: 'Preparation guide', chips: ['April', 'September', 'Short visits'], cta: 'Early contact recommended' },
    accommodation: { label: 'Accommodation', chips: ['Campus', 'Length of stay', 'Family'], cta: 'Compare by your needs' },
    fees: { label: 'Fees and payment', chips: ['Visitor', 'Host office', 'Quotation'], cta: 'Clarify cost categories' },
    faq: { label: 'Quick answers', chips: ['Eligibility', 'Bookings', 'COE and visa'], cta: 'Check before enquiring' },
    visitors: { label: 'Visitor guide', chips: ['Before arrival', 'First week', 'Daily life'], cta: 'Follow the preparation steps' },
    contact: { label: 'First consultation', chips: ['Four steps', 'No sensitive files', 'Reference number'], cta: 'Working enquiry form' },
  },
};

const serviceItems = {
  ja: [
    { code: '01', title: 'COE・ビザ関連支援', en: 'COE and visa guidance', description: '必要情報と書類の整理、大学の担当部署や外部専門サービスへの橋渡しを支援します。', timing: '着任4〜5か月前', role: '大学・外部専門先と連携', cost: '内容に応じて個別確認' },
    { code: '02', title: '宿泊・住居支援', en: 'Accommodation and housing', description: 'キャンパス、滞在期間、予算、家族帯同の有無に応じて候補を整理します。', timing: '着任2〜3か月前', role: '候補紹介と情報整理', cost: '宿泊費・契約費は別途' },
    { code: '03', title: '航空券・関空到着支援', en: 'Flights and arrival support', description: '航空券、到着時の待ち合わせ、空港からの移動について関係先と調整します。', timing: '到着1〜2か月前', role: 'MYK等と連携', cost: '手配内容により個別見積' },
    { code: '04', title: '生活立ち上げ支援', en: 'Settling-in support', description: '市役所、銀行、携帯電話、キャンパス案内等、日本での生活開始を支援します。', timing: '着任1〜2か月前', role: 'クレオテック＋必要な外部先', cost: '交通費・手続き費等は別途' },
    { code: '05', title: '短期ゲスト向け支援', en: 'Short-term guest support', description: '短期招聘教員、研究者、来賓向けに宿泊、到着、学内案内等をコンパクトに調整します。', timing: '来日1〜2か月前', role: '案件に応じて調整', cost: '内容に応じて個別見積' },
  ],
  en: [
    { code: '01', title: 'COE and visa guidance', en: 'COE・ビザ関連支援', description: 'We organise the required information and connect the case to the correct university or specialist process.', timing: 'Four to five months before', role: 'University and specialist coordination', cost: 'Confirmed case by case' },
    { code: '02', title: 'Accommodation and housing', en: '宿泊・住居支援', description: 'We help compare options by campus, length of stay, budget, and accompanying family needs.', timing: 'Two to three months before', role: 'Option review and introductions', cost: 'Accommodation and contract costs separate' },
    { code: '03', title: 'Flights and arrival support', en: '航空券・関空到着支援', description: 'We coordinate flight guidance, airport meeting, and onward travel with the relevant provider.', timing: 'One to two months before', role: 'Coordination with MYK or other partners', cost: 'Quotation depends on scope' },
    { code: '04', title: 'Settling-in support', en: '生活立ち上げ支援', description: 'Support may include city-office procedures, banking, mobile services, and campus orientation.', timing: 'One to two months before', role: 'Creotech and relevant partners', cost: 'Transport and procedure costs separate' },
    { code: '05', title: 'Short-term guest support', en: '短期ゲスト向け支援', description: 'A focused arrangement for invited faculty, researchers, speakers, and other short-term guests.', timing: 'One to two months before', role: 'Adjusted to the visit', cost: 'Quotation depends on scope' },
  ],
} as const;

const timelineItems = {
  ja: [
    { title: '4月着任', label: 'April appointment', items: ['前年11〜12月：初期相談', '12〜1月：COE・ビザ準備', '2〜3月：宿泊・航空券・到着確認', '3月：来日前最終確認'] },
    { title: '9月着任', label: 'September appointment', items: ['4〜5月：初期相談', '5〜6月：COE・ビザ準備', '7〜8月：宿泊・航空券・到着確認', '8月：来日前最終確認'] },
    { title: '短期滞在', label: 'Short visit', items: ['1〜2か月前：相談開始', '宿泊と移動方法の確認', '学内受入予定の整理', '到着・滞在中支援の確認'] },
  ],
  en: [
    { title: 'April appointment', label: '4月着任', items: ['November–December: initial enquiry', 'December–January: COE and visa preparation', 'February–March: accommodation, flight, and arrival planning', 'March: final pre-arrival check'] },
    { title: 'September appointment', label: '9月着任', items: ['April–May: initial enquiry', 'May–June: COE and visa preparation', 'July–August: accommodation, flight, and arrival planning', 'August: final pre-arrival check'] },
    { title: 'Short visit', label: '短期滞在', items: ['One to two months before: initial enquiry', 'Confirm accommodation and transport', 'Clarify the host-office schedule', 'Confirm arrival and in-stay support'] },
  ],
} as const;

const hotels = {
  ja: [
    { name: 'タッセルイン京都二条', en: 'Tassel Inn Kyoto Nijo', area: '二条エリア', access: '朱雀・衣笠方面の候補', stay: '中短期', family: '要確認', budget: '時期により変動' },
    { name: 'プリンスホテル', en: 'Prince Hotel', area: '施設により異なる', access: '来賓・教員・家族帯同の候補', stay: '短期中心', family: '候補', budget: '時期により変動' },
    { name: 'アーバンホテル二条', en: 'Urban Hotel Nijo', area: '二条エリア', access: '京都市内移動に便利', stay: '中短期', family: '要確認', budget: '時期により変動' },
  ],
  en: [
    { name: 'Tassel Inn Kyoto Nijo', en: 'タッセルイン京都二条', area: 'Nijo area', access: 'Possible access to Suzaku and Kinugasa', stay: 'Short to medium', family: 'Confirm directly', budget: 'Varies by date' },
    { name: 'Prince Hotel', en: 'プリンスホテル', area: 'Depends on property', access: 'Possible option for faculty, guests, and families', stay: 'Mainly short stays', family: 'Possible option', budget: 'Varies by date' },
    { name: 'Urban Hotel Nijo', en: 'アーバンホテル二条', area: 'Nijo area', access: 'Convenient for central Kyoto travel', stay: 'Short to medium', family: 'Confirm directly', budget: 'Varies by date' },
  ],
} as const;

const feeRows = {
  ja: [
    ['初期相談・調整', '案件概要、必要支援、担当範囲を整理します。', '内容により確認'],
    ['外部委託費', 'COE・ビザ支援、専門サービス、外部手配等です。', '原則個別見積'],
    ['宿泊・航空券等', 'ホテル、航空券、空港移動等の実費です。', '本人または学内部署'],
    ['生活立ち上げ支援', '同行、通訳、手続き補助等です。', '内容により個別見積'],
  ],
  en: [
    ['Initial review and coordination', 'Review of the case outline, requested support, and responsibilities.', 'Confirmed by scope'],
    ['External-provider fees', 'COE and visa support, specialist services, or external arrangements.', 'Normally quotation based'],
    ['Accommodation and flights', 'Actual hotel, flight, airport, and transport costs.', 'Visitor or host office'],
    ['Settling-in assistance', 'Accompaniment, interpretation, and practical procedure support.', 'Quotation based'],
  ],
} as const;

const faqs = {
  ja: [
    ['いつ相談すればよいですか？', '4月着任は前年11〜12月頃、9月着任は4〜5月頃を推奨します。短期滞在も1〜2か月前にはご相談ください。'],
    ['留学生も対象ですか？', 'このサイトは主に海外教員、研究者、短期ゲスト、その同行家族と受入部署を対象としています。'],
    ['ホテル予約はクレオテックが行いますか？', '原則として候補紹介と情報整理です。予約、支払い、変更、キャンセルは施設の規定に従います。'],
    ['COE・ビザの取得は保証されますか？', '保証はできません。必要情報の整理と、適切な大学・外部手続きへの橋渡しを支援します。'],
    ['パスポート等をフォームで送れますか？', '送れません。このフォームではパスポート画像、COE書類、機微な入管書類を受け付けません。'],
    ['費用は誰が負担しますか？', '本人負担、学内部署負担、または双方の組み合わせがあります。案件ごとに確認します。'],
  ],
  en: [
    ['When should we contact you?', 'For an April appointment, November or December is recommended. For September, contact us around April or May. Short visits should normally be discussed one to two months ahead.'],
    ['Are students covered by this service?', 'This site primarily supports international faculty, researchers, short-term guests, accompanying families, and their host offices.'],
    ['Does Creotech book the hotel?', 'The standard role is to introduce and organise options. Booking, payment, changes, and cancellation follow the property’s rules.'],
    ['Is COE or visa approval guaranteed?', 'No. We help organise information and connect the case to the appropriate university or specialist process.'],
    ['Can I send passport or COE files through the form?', 'No. Do not send passport images, COE files, or other sensitive immigration documents through this form.'],
    ['Who pays the costs?', 'Costs may be paid by the visitor, the host office, or a combination of both. This is confirmed case by case.'],
  ],
} as const;

function Section({ eyebrow, title, lead, children, tone = 'white' }: { eyebrow: string; title: string; lead: string; children: React.ReactNode; tone?: 'white' | 'soft' }) {
  return (
    <section className={`section ${tone === 'soft' ? 'section-soft' : 'section-white'}`}>
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
        <p className="section-lead">{lead}</p>
        {children}
      </div>
    </section>
  );
}

function Photo({ image, lang, className }: { image: SiteImage; lang: Lang; className: string }) {
  return (
    <figure className={className}>
      <img src={image.src} alt={image.alt[lang]} />
      {image.isMock ? <span className="mock-image-badge">{mockImageLabel[lang]}</span> : null}
    </figure>
  );
}

export function ServicesPage({ lang }: { lang: Lang }) {
  const isJa = lang === 'ja';
  return (
    <>
      <Section
        eyebrow="Support scope"
        title={isJa ? '必要な支援と担当範囲を整理します。' : 'Clarify the support you need and who is responsible.'}
        lead={isJa ? 'すべてをクレオテックが直接行うのではなく、大学、外部先、本人の役割を整理して適切につなぎます。' : 'Creotech does not directly perform every task. We organise the roles of the university, external providers, the visitor, and the host office.'}
      >
        <div className="intro-photo-grid">
          <Photo image={siteImages.services} lang={lang} className="content-photo content-photo-wide" />
          <div className="scope-note">
            <span className="mini-label">Coordination first</span>
            <h3>{isJa ? '最初に確認すること' : 'What we confirm first'}</h3>
            <ul>
              <li>{isJa ? '受入目的と予定期間' : 'Purpose and expected duration'}</li>
              <li>{isJa ? '受入部署と担当者' : 'Host office and contact person'}</li>
              <li>{isJa ? '希望支援と優先順位' : 'Requested support and priorities'}</li>
              <li>{isJa ? '費用負担者と予約主体' : 'Cost bearer and booking responsibility'}</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Support menu"
        title={isJa ? '5つの支援領域。' : 'Five main support areas.'}
        lead={isJa ? '具体的な条件は初期相談後に確認します。' : 'Detailed conditions are confirmed after the initial enquiry.'}
        tone="soft"
      >
        <div className="detailed-service-grid">
          {serviceItems[lang].map((item) => (
            <article className="detailed-service-card" key={item.code}>
              <div className="service-card-top">
                <span>{item.code}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p className="secondary-title">{item.en}</p>
                </div>
              </div>
              <p>{item.description}</p>
              <dl>
                <div><dt>{isJa ? '相談時期' : 'Timing'}</dt><dd>{item.timing}</dd></div>
                <div><dt>{isJa ? '主な役割' : 'Role'}</dt><dd>{item.role}</dd></div>
                <div><dt>{isJa ? '費用' : 'Cost'}</dt><dd>{item.cost}</dd></div>
              </dl>
            </article>
          ))}
        </div>
        <div className="section-action"><Link className="btn btn-cta" href={`/${lang}/contact`}>{isJa ? '支援内容を相談する' : 'Discuss your support needs'}</Link></div>
      </Section>
    </>
  );
}

export function TimelinePage({ lang }: { lang: Lang }) {
  const isJa = lang === 'ja';
  return (
    <Section
      eyebrow="Timeline"
      title={isJa ? '着任日から逆算して準備します。' : 'Plan backwards from the appointment or arrival date.'}
      lead={isJa ? '遅い段階でも可能な範囲で対応しますが、選択肢や手続き時間が限られる場合があります。' : 'Late enquiries are reviewed where possible, but choices and processing time may be limited.'}
    >
      <div className="timeline-track-grid">
        {timelineItems[lang].map((track) => (
          <article className="timeline-track" key={track.title}>
            <span className="mini-label">{track.label}</span>
            <h3>{track.title}</h3>
            <ol>
              {track.items.map((item, index) => (
                <li key={item}><span>{index + 1}</span><p>{item}</p></li>
              ))}
            </ol>
          </article>
        ))}
      </div>
      <div className="notice-box notice-box-enji">
        <strong>{isJa ? '早めの相談を推奨します' : 'Early contact is recommended'}</strong>
        <p>{isJa ? 'COE・ビザ、長期住居、繁忙期の宿泊、航空券は特に準備期間が必要です。' : 'COE and visa processes, long-term housing, peak-season accommodation, and flights require additional lead time.'}</p>
      </div>
    </Section>
  );
}

export function AccommodationPage({ lang }: { lang: Lang }) {
  const isJa = lang === 'ja';
  return (
    <Section
      eyebrow="Accommodation"
      title={isJa ? '滞在条件から宿泊候補を比較します。' : 'Compare accommodation by the needs of the stay.'}
      lead={isJa ? '掲載施設は候補例です。料金、空室、家族利用、長期滞在条件は必ず施設へ確認します。' : 'Listed properties are examples. Rates, availability, family use, and long-stay conditions must be confirmed with the property.'}
    >
      <div className="accommodation-grid">
        {hotels[lang].map((hotel) => (
          <article className="accommodation-card" key={hotel.name}>
            <Photo image={siteImages.accommodation} lang={lang} className="accommodation-photo" />
            <div className="accommodation-body">
              <span className="mini-label">Accommodation option</span>
              <h3>{hotel.name}</h3>
              <p className="secondary-title">{hotel.en}</p>
              <dl className="meta-grid">
                <div><dt>{isJa ? 'エリア' : 'Area'}</dt><dd>{hotel.area}</dd></div>
                <div><dt>{isJa ? 'アクセス' : 'Access'}</dt><dd>{hotel.access}</dd></div>
                <div><dt>{isJa ? '滞在' : 'Stay'}</dt><dd>{hotel.stay}</dd></div>
                <div><dt>{isJa ? '家族' : 'Family'}</dt><dd>{hotel.family}</dd></div>
                <div><dt>{isJa ? '予算' : 'Budget'}</dt><dd>{hotel.budget}</dd></div>
              </dl>
              <Link className="text-action" href={`/${lang}/contact`}>{isJa ? '候補について相談する' : 'Ask about this type of option'} →</Link>
            </div>
          </article>
        ))}
      </div>
      <div className="notice-box">
        <strong>{isJa ? 'サンプル画像について' : 'About the sample image'}</strong>
        <p>{isJa ? '現在の客室写真はUI確認用であり、掲載施設の実際の写真ではありません。実装時に正式素材へ交換します。' : 'The current room image is for UI review and does not show the listed properties. It will be replaced with approved assets before launch.'}</p>
      </div>
    </Section>
  );
}

export function FeesPage({ lang }: { lang: Lang }) {
  const isJa = lang === 'ja';
  return (
    <Section
      eyebrow="Fees and payment"
      title={isJa ? '「誰が払うか」と「誰が予約するか」を分けて確認します。' : 'Separate who pays from who makes the booking or contract.'}
      lead={isJa ? '固定料金だけで判断せず、支援範囲、外部委託、実費、支払い主体を案件ごとに整理します。' : 'Costs are organised by support scope, external-provider fees, actual expenses, and the responsible payer.'}
    >
      <div className="fee-table" role="table" aria-label={isJa ? '費用区分' : 'Cost categories'}>
        <div className="fee-row fee-head" role="row">
          <span role="columnheader">{isJa ? '区分' : 'Category'}</span>
          <span role="columnheader">{isJa ? '内容' : 'What it covers'}</span>
          <span role="columnheader">{isJa ? '主な扱い' : 'Typical handling'}</span>
        </div>
        {feeRows[lang].map(([category, description, handling]) => (
          <div className="fee-row" role="row" key={category}>
            <strong role="cell">{category}</strong>
            <span role="cell">{description}</span>
            <span role="cell">{handling}</span>
          </div>
        ))}
      </div>
      <div className="fee-actions">
        <Link className="btn btn-cta" href={`/${lang}/contact`}>{isJa ? '費用を含めて相談する' : 'Enquire about scope and costs'}</Link>
        <Link className="btn btn-secondary" href={`/${lang}/faq`}>{isJa ? 'FAQを確認する' : 'Read the FAQ'}</Link>
      </div>
    </Section>
  );
}

export function FaqPage({ lang }: { lang: Lang }) {
  const isJa = lang === 'ja';
  return (
    <Section
      eyebrow="FAQ"
      title={isJa ? '相談前によく確認されること。' : 'Common questions before an enquiry.'}
      lead={isJa ? '詳細は案件ごとに異なります。迷う場合は未確定のまま相談フォームへ進めます。' : 'Details differ by case. You may submit an enquiry even when some information is not final.'}
    >
      <div className="faq-list">
        {faqs[lang].map(([question, answer], index) => (
          <details key={question} open={index === 0}>
            <summary><span>Q</span>{question}</summary>
            <div><p>{answer}</p></div>
          </details>
        ))}
      </div>
      <div className="section-action"><Link className="btn btn-cta" href={`/${lang}/contact`}>{isJa ? '解決しない場合は相談する' : 'Send an enquiry'}</Link></div>
    </Section>
  );
}

export function VisitorsPage({ lang }: { lang: Lang }) {
  const isJa = lang === 'ja';
  const steps = isJa
    ? [
        ['1', 'まず受入部署へ連絡', '立命館大学の受入部署・担当者を確認してください。'],
        ['2', 'COE・ビザ手続きを確認', '必要な手続きと安全な書類提出方法を受入部署と確認します。'],
        ['3', '宿泊と航空券を準備', 'キャンパス、期間、家族構成をもとに準備します。'],
        ['4', '到着方法を確認', '空港、到着時刻、ホテル等への移動を確認します。'],
        ['5', '最初の1週間を準備', '市役所、銀行、携帯電話、キャンパス案内等を整理します。'],
      ]
    : [
        ['1', 'Contact your host office first', 'Confirm your Ritsumeikan host department and the person coordinating your visit.'],
        ['2', 'Confirm your COE and visa process', 'Use the secure process specified by your host office; do not send sensitive files through this site.'],
        ['3', 'Arrange accommodation and flights', 'Plan by campus, length of stay, budget, and accompanying family needs.'],
        ['4', 'Confirm your arrival route', 'Check the airport, arrival time, meeting point, and travel to your accommodation.'],
        ['5', 'Prepare for your first week', 'Plan city-office procedures, banking, mobile service, and campus orientation where relevant.'],
      ];

  return (
    <>
      <Section
        eyebrow="For international visitors"
        title={isJa ? '来日前から、順番に準備できます。' : 'Prepare in the right order before coming to Japan.'}
        lead={isJa ? 'このページは海外教員、研究者、短期ゲスト、その同行家族向けの基本ガイドです。' : 'This guide is for international faculty, researchers, short-term guests, and accompanying family members.'}
      >
        <div className="visitor-intro-grid">
          <Photo image={siteImages.visitors} lang={lang} className="content-photo visitor-photo" />
          <div className="visitor-first-note">
            <span className="mini-label">Important first step</span>
            <h3>{isJa ? '最初に受入部署へご連絡ください。' : 'Contact your Ritsumeikan host office first.'}</h3>
            <p>{isJa ? '一部の支援は、本人から直接ではなく、学内の受入部署を通じて依頼する必要があります。' : 'Some services must be requested or approved through the host department rather than directly by the visitor.'}</p>
          </div>
        </div>
      </Section>
      <Section
        eyebrow="Preparation steps"
        title={isJa ? '来日前から最初の1週間まで。' : 'From pre-arrival to your first week.'}
        lead={isJa ? '未確定の項目があっても、分かる範囲から相談できます。' : 'You can enquire even when some details are not final.'}
        tone="soft"
      >
        <ol className="visitor-step-list">
          {steps.map(([number, title, description]) => (
            <li key={number}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
            </li>
          ))}
        </ol>
        <div className="section-action"><Link className="btn btn-cta" href={`/${lang}/contact`}>{isJa ? '来日準備を相談する' : 'Start an enquiry'}</Link></div>
      </Section>
    </>
  );
}

export function ContactPage({ lang }: { lang: Lang }) {
  const isJa = lang === 'ja';
  return (
    <section className="section section-soft contact-section">
      <div className="container contact-layout">
        <aside className="contact-guidance">
          <Photo image={siteImages.contact} lang={lang} className="contact-photo" />
          <div className="contact-guidance-copy">
            <span className="mini-label">Before you send</span>
            <h2>{isJa ? '分かる範囲で構いません。' : 'Provide only what you know today.'}</h2>
            <p>{isJa ? '日程、費用負担、支援内容が未確定でも初期相談できます。送信後に受付番号が発行されます。' : 'Dates, cost responsibility, and support details do not need to be final. A reference number is issued after submission.'}</p>
            <ul>
              <li>{isJa ? 'パスポート画像を送らない' : 'Do not send passport images'}</li>
              <li>{isJa ? 'COE・入管の機微書類を送らない' : 'Do not send sensitive COE or immigration files'}</li>
              <li>{isJa ? '受入部署が分かれば記載する' : 'Include the host office if known'}</li>
            </ul>
          </div>
        </aside>
        <div className="contact-form-panel">
          <RequestForm lang={lang} />
        </div>
      </div>
    </section>
  );
}
