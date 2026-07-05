import Link from 'next/link';
import type { Lang } from '@/content/site';

export const navItems = [
  ['サービス概要 / Services', '/services'],
  ['着任時期から確認 / Timeline', '/timeline'],
  ['宿泊候補 / Accommodation', '/accommodation'],
  ['費用 / Fees', '/fees'],
  ['FAQ', '/faq'],
  ['Visitors', '/visitors'],
  ['お問い合わせ / Contact', '/contact'],
] as const;

export const pageMeta = {
  services: ['サービス概要・支援内容', '受入準備から着任後まで、必要な支援を項目別に確認できます。'],
  timeline: ['着任時期から逆算する', '4月・9月着任を基準に、相談開始と準備の目安を整理します。'],
  accommodation: ['宿泊候補', 'キャンパス・滞在期間・予算に応じた比較の見方を確認できます。'],
  fees: ['費用の考え方', '固定料金表ではなく、支援範囲・外部費用・実費を整理して個別に確認します。'],
  faq: ['よくある質問', '相談前に確認されることが多いポイントをまとめています。'],
  visitors: ['For International Visitors', 'Basic information for incoming faculty, researchers, guests, and family members.'],
  contact: ['お問い合わせ', '初期相談に必要な情報を整理して、学内窓口へつなげます。'],
} as const;

export type OneStopSlug = keyof typeof pageMeta;

const audiences = [
  ['学内職員・教員の方', 'Host offices and faculty', '海外から教員・研究者・ゲスト等を受け入れる際の準備、費用、手続き、外部連携を相談できます。'],
  ['海外から来日予定の方', 'International visitors', '来日前の準備、宿泊、空港到着、生活立ち上げに関する基本情報を確認できます。'],
  ['COE・ビザでお困りの方', 'COE and visa support', 'COE・ビザ関連手続きについて、外部専門サービスとの連携を含めて支援します。'],
];

const services = [
  { ja: 'COE・ビザ関連支援', en: 'COE and visa support', desc: '必要情報と書類の整理、外部専門サービスとの連携、本人・学内担当者への案内を支援します。', timing: '着任4〜5か月前', partner: '外部専門サービス＋クレオテック', cost: '本人負担または学内部署負担を選択可能。内容に応じて個別見積。' },
  { ja: '宿泊・初期滞在先支援', en: 'Accommodation support', desc: '滞在期間、キャンパス、予算、家族帯同の有無に応じて、宿泊候補を紹介します。', timing: '着任2〜3か月前', partner: '紹介ホテル・宿泊施設', cost: '宿泊費、キャンセル料等は利用者または学内部署負担。' },
  { ja: '航空券・関空到着支援', en: 'Flight and airport arrival support', desc: '航空券手配、関空出迎え、空港からホテル・キャンパス等への移動支援をMYKと連携して案内します。', timing: '到着1〜2か月前', partner: 'MYK', cost: '本人負担は事前決済。学内部署負担はMYKと学内部署が請求書で精算。' },
  { ja: '住居・生活立ち上げ支援', en: 'Housing and settling-in support', desc: '住居相談、市役所手続き、住所登録、国民健康保険、銀行口座、携帯電話、キャンパス案内等を支援します。', timing: '着任1〜2か月前', partner: 'クレオテック＋必要に応じた外部先', cost: '交通費、手続き関連費、契約費用等は別途。' },
  { ja: '短期ゲスト向けライト支援', en: 'Light support for short-term guests', desc: '短期招聘教員・ゲスト向けに、ホテル紹介、航空券、関空出迎え、学内案内等を中心に支援します。', timing: '来日1〜2か月前', partner: 'クレオテック＋MYK＋宿泊施設', cost: '内容に応じて個別見積。' },
];

const timelines = [
  ['4月着任', ['前年11月〜12月: 相談開始', '12月〜1月: COE・ビザ準備', '2月〜3月: 住居・航空券・ホテル', '2月以降: 選択肢が限られる可能性']],
  ['9月着任', ['4月〜5月: 相談開始', '5月〜6月: COE・ビザ準備', '7月〜8月: 住居・航空券・ホテル', '7月以降: 直前対応リスクが上昇']],
] as const;

const hotels = [
  { name: 'タッセルイン京都二条', en: 'Tassel Inn Kyoto Nijo', area: '二条エリア', station: '二条駅周辺（要確認）', campus: '朱雀・衣笠方面へのアクセスを想定', price: '時期により変動', family: '要確認', long: '中短期向け候補', features: '短期滞在やプログラム利用に便利。朱雀・衣笠方面へのアクセスを想定。' },
  { name: 'プリンスホテル', en: 'Prince Hotel', area: '京都市内または近隣エリア', station: '施設により異なる（要確認）', campus: '来賓・教員・家族帯同の滞在候補', price: '時期により変動', family: '候補', long: '要確認', features: '安定したホテル品質。来賓・教員・家族帯同の滞在候補。' },
  { name: 'アーバンホテル二条', en: 'Urban Hotel Nijo', area: '二条エリア', station: '二条駅周辺（要確認）', campus: '京都市内移動に便利', price: '時期により変動', family: '要確認', long: '中短期向け候補', features: '中短期滞在や大学関係者の利用候補。京都市内移動に便利。' },
];

const fees = [
  ['基本支援', '初期相談、スケジュール整理、情報整理、連絡調整、案内。支援内容に応じて個別に確認します。'],
  ['外部委託費', 'COE・ビザ支援、専門家費用、外部サービス利用料など。'],
  ['実費', '航空券、ホテル、空港送迎、交通費、郵送費、翻訳費、手続き関連費など。'],
  ['負担者を選択できる費用', '案件により、本人負担または学内部署負担を選択できます。'],
];

const faqs = [
  ['いつ相談すればよいですか？', '4月着任は前年11月〜12月頃、9月着任は4月〜5月頃の相談開始を推奨します。'],
  ['ホテル予約はクレオテックが行いますか？', '原則として宿泊候補の紹介です。予約、支払い、変更、キャンセルは利用者ご自身で行ってください。'],
  ['航空券は誰が手配しますか？', 'MYKと連携して案内します。本人負担は事前決済、学内部署負担は請求書精算です。'],
  ['COE・ビザの取得は保証されますか？', '保証はできません。必要情報の整理と申請準備を外部専門サービスとの連携を含めて支援します。'],
  ['短期ゲストも対象ですか？', 'はい。ホテル紹介、航空券、関空出迎え、学内案内などを中心としたライト支援を行います。'],
  ['留学生も対象ですか？', 'このサイトは海外教員・研究者・短期ゲスト・その家族を対象としています。'],
];

const contactFields = ['学内部署名 / Department or office', '担当者名 / Contact person', 'メールアドレス / Email', '受入予定者氏名 / Visitor name', '国籍 / Nationality', '現在の居住国 / Current country of residence', '着任予定日 / Expected appointment or arrival date', '滞在予定期間 / Expected period of stay', '家族帯同の有無 / Accompanying family', '希望する支援内容 / Requested support', '費用負担者 / Cost bearer', 'COE・ビザ支援の要否 / COE and visa support needed', 'ホテル紹介の要否 / Accommodation support needed', '航空券・関空出迎えの要否 / Flight or airport arrival support needed'];

export function Section({ eyebrow, title, en, children }: { eyebrow: string; title: string; en: string; children: React.ReactNode }) {
  return <section className="section even:bg-mist"><div className="container"><p className="eyebrow">{eyebrow}</p><h2 className="section-title">{title}</h2><p className="section-lead">{en}</p>{children}</div></section>;
}

function Meta({ k, v }: { k: string; v: string }) {
  return <div className="rounded-2xl bg-mist/70 p-3"><dt className="text-xs font-extrabold uppercase tracking-wider text-slate-500">{k}</dt><dd className="mt-1 font-semibold text-navy">{v}</dd></div>;
}

function IconMark({ children }: { children: React.ReactNode }) {
  return <span className="icon-mark" aria-hidden="true">{children}</span>;
}

export function AudienceCards() {
  return <div className="grid gap-5 md:grid-cols-3">{audiences.map(([ja, en, desc], index) => <article className="card lift-card p-6 md:p-7" key={ja}><IconMark>{index + 1}</IconMark><h3 className="mt-5 text-xl font-extrabold text-navy">{ja}</h3><p className="mt-1 text-sm font-semibold text-slate-500">{en}</p><p className="mt-4 text-sm leading-relaxed text-slate-700">{desc}</p></article>)}</div>;
}

export function ServicesPage() {
  return <><Section eyebrow="Who we support" title="学内受入を、迷わず進めるために。" en="対象者と支援範囲を分けて確認できます。"><AudienceCards /></Section><Section eyebrow="Support menu" title="支援内容を選びやすく整理しました。" en="必要な項目を起点に、時期・連携先・費用感を確認してください。"><div className="grid gap-5 lg:grid-cols-2">{services.map((s, index) => <article className="card service-card overflow-hidden" key={s.ja}><div className="service-card-visual" role="img" aria-label={`${s.ja}を表す抽象ビジュアル`}><span className="visual-chip">{s.en}</span></div><div className="p-6 md:p-7"><span className="mini-label">Support {String(index + 1).padStart(2, '0')}</span><h3 className="mt-3 text-2xl font-extrabold leading-tight text-navy">{s.ja}</h3><p className="mt-1 text-sm font-semibold text-slate-500">{s.en}</p><p className="mt-4 text-sm leading-relaxed text-slate-700">{s.desc}</p><dl className="mt-5 grid gap-3 text-sm md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3"><Meta k="時期" v={s.timing}/><Meta k="連携先" v={s.partner}/><Meta k="費用" v={s.cost}/></dl></div></article>)}</div></Section></>;
}

export function TimelinePage() { return <Section eyebrow="Timeline" title="着任月から、準備時期を逆算します。" en="同じ手続きでも時期により選択肢が変わります。早めの相談をおすすめします。"><div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]"><div className="page-intro-visual page-intro-visual-timeline vertical-visual" role="img" aria-label="準備スケジュールを表す抽象ビジュアル"><span className="visual-chip">Preparation schedule</span></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-2">{timelines.map(([title, items]) => <article className="card p-6 md:p-7" key={title}><span className="mini-label">Appointment</span><h3 className="mt-2 text-2xl font-extrabold text-navy">{title}</h3><ol className="mt-5 grid gap-3">{items.map((item, i) => <li className="timeline-step" key={item}><span>{i + 1}</span>{item}</li>)}</ol></article>)}</div></div><p className="note-banner mt-6">直前のご相談にも可能な範囲で対応しますが、COE・ビザ、宿泊、航空券、関空到着支援等を提供できない場合があります。</p></Section>; }

export function AccommodationPage({ lang }: { lang: Lang }) { return <Section eyebrow="Accommodation" title="滞在条件に合わせて、候補を比較します。" en="予約代行ではなく、比較しやすい候補紹介としてご確認ください。"><div className="grid gap-6">{hotels.map((h) => <article className="card overflow-hidden md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[300px_1fr]" key={h.name}><div className="hotel-image-placeholder grid min-h-56 place-items-center p-8 text-center text-sm font-bold text-slate-500"><span className="visual-chip">{h.area}</span></div><div className="p-6 md:p-7"><div className="flex flex-wrap items-start justify-between gap-3"><div><span className="mini-label">Accommodation option</span><h3 className="mt-2 text-2xl font-extrabold text-navy">{h.name}</h3><p className="text-sm font-semibold text-slate-500">{h.en}</p></div><span className="rounded-full bg-light-gold px-3 py-1 text-xs font-extrabold text-deep-red">{h.long}</span></div><p className="mt-4 text-sm leading-relaxed text-slate-700">{h.features}</p><dl className="mt-5 grid gap-2 text-sm md:grid-cols-3"><Meta k="Area" v={h.area}/><Meta k="Station" v={h.station}/><Meta k="Access" v={h.campus}/><Meta k="Price" v={h.price}/><Meta k="Family" v={h.family}/><Meta k="Stay" v={h.long}/></dl><Link className="btn btn-secondary mt-5 w-full sm:w-auto" href={`/${lang}/contact`}>相談時に確認する</Link></div></article>)}</div><p className="note-banner mt-6">掲載ホテルは宿泊候補の紹介です。予約、支払い、変更、キャンセルは各ホテルの公式サイトまたは案内に従って利用者ご自身で行ってください。</p></Section>; }

export function FeesPage() { return <Section eyebrow="Fees" title="料金表ではなく、案件ごとに整理します。" en="基本支援、外部委託費、実費、負担者を分けて確認します。"><div className="grid gap-6 lg:grid-cols-[.72fr_1.28fr]"><div className="page-intro-visual page-intro-visual-fees vertical-visual" role="img" aria-label="費用区分を表す抽象ビジュアル"><span className="visual-chip">Quotation based</span></div><div className="grid gap-5 md:grid-cols-2">{fees.map(([title, desc]) => <article className="card p-6 md:p-7" key={title}><h3 className="text-xl font-extrabold text-navy">{title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-700">{desc}</p></article>)}</div></div><div className="mt-6 grid gap-4 rounded-3xl bg-navy p-6 text-white md:p-7"><h3 className="text-xl font-extrabold">相談ベースで確認します</h3><p className="text-sm leading-relaxed text-white/85">航空券、ホテル、COE・ビザ支援費用等は、本人負担または学内部署負担を選択できる場合があります。予約・支払い・変更・キャンセル条件は各提供者の規定に従います。</p></div></Section>; }

export function FaqPage() { return <Section eyebrow="FAQ" title="相談前の不安を、先に解消します。" en="よくある質問を短く整理しました。詳細はお問い合わせ時に確認してください。"><div className="grid gap-4 md:grid-cols-2">{faqs.map(([q, a]) => <article className="card faq-card p-5 md:p-6" key={q}><h3 className="text-lg font-extrabold text-navy">{q}</h3><p className="mt-3 text-sm leading-relaxed text-slate-700">{a}</p></article>)}</div></Section>; }

export function VisitorsPage() { return <Section eyebrow="For International Visitors" title="A calm starting point before arrival." en="Please begin with your host office. Creotech coordinates support with the university and partners."><div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]"><div className="visitors-hero-visual vertical-visual" role="img" aria-label="Campus life support abstract visual"><span className="visual-chip">Campus life support</span></div><div className="card p-6 md:p-8"><p className="text-base leading-relaxed text-slate-700">This page provides basic information for international faculty, researchers, short-term guests, and accompanying family members coming to Ritsumeikan.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{['Before coming to Japan','COE and visa support','Accommodation','Flight and airport arrival','First days in Japan','Payment and costs'].map(x => <div className="rounded-2xl bg-mist p-4 text-sm font-bold text-navy" key={x}>{x}</div>)}</div><p className="note-banner mt-6">Please contact your host office at Ritsumeikan first. Some services must be requested through the host department or office.</p></div></div></Section>; }

export function ContactPage() { return <Section eyebrow="Contact" title="初期相談に必要な情報を入力してください。" en="入力しやすさを優先し、受入概要と希望支援を整理できる構成にしています。"><div className="grid gap-6 lg:grid-cols-[.78fr_1.22fr]"><aside className="card p-6 md:p-7"><span className="mini-label">Before you send</span><h3 className="mt-3 text-2xl font-extrabold text-navy">まず分かる範囲で構いません。</h3><p className="mt-4 text-sm leading-relaxed text-slate-700">このフォームはPhase 1 MVPの画面見本です。実際の送信連携は後続フェーズで追加します。お急ぎの場合は学内担当窓口へご連絡ください。</p><div className="page-intro-visual page-intro-visual-contact mt-6" role="img" aria-label="問い合わせ支援を表す抽象ビジュアル"><span className="visual-chip">Inquiry guidance</span></div></aside><form className="card grid gap-5 p-6 md:p-8"><div className="grid gap-5 md:grid-cols-2">{contactFields.map((label) => <label className="grid gap-2 text-sm font-bold text-navy" key={label}>{label}<input className="input" /></label>)}</div><label className="grid gap-2 text-sm font-bold text-navy">その他相談内容 / Additional comments<textarea className="input min-h-36" /></label><button className="btn btn-cta w-full sm:w-fit" type="button">送信連携は後日追加 / Submission coming later</button></form></div></Section>; }
