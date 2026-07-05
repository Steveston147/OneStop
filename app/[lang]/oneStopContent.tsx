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
  services: ['サービス概要・支援内容', 'Support coordinated by Creotech and external partners'],
  timeline: ['着任時期から逆算する', 'Plan backwards from the appointment date'],
  accommodation: ['宿泊候補', 'Accommodation options introduced for later replacement with official links'],
  fees: ['費用の考え方', 'How costs are handled'],
  faq: ['よくある質問', 'Frequently asked questions'],
  visitors: ['For International Visitors', 'Basic information for incoming guests'],
  contact: ['お問い合わせ', 'Visual-ready inquiry form; submission integration can be added later'],
} as const;

export type OneStopSlug = keyof typeof pageMeta;

const audiences = [
  ['学内職員・教員の方', 'For Ritsumeikan staff and faculty', '海外から教員・研究者・ゲスト等を受け入れる際の準備、費用、手続き、外部連携について相談できます。'],
  ['海外から来日予定の方', 'For international visitors', '来日前の準備、宿泊、空港到着、生活立ち上げに関する基本情報を確認できます。'],
  ['COE・ビザでお困りの方', 'COE and visa support', 'COE・ビザ関連手続きについて、外部専門サービスとの連携を含めて支援します。'],
];

const services = [
  { ja: 'COE・ビザ関連支援', en: 'COE and visa support', desc: 'COE申請に必要な情報整理、必要書類の案内、外部専門サービスとの連携、本人・学内担当者への案内、申請準備の支援。', timing: '着任4〜5か月前', partner: '外部専門サービス＋クレオテック', cost: '本人負担または学内部署負担を選択可能。内容に応じて個別見積。COE承認や査証発給を保証するものではありません。' },
  { ja: '宿泊・初期滞在先支援', en: 'Accommodation support', desc: '滞在期間、キャンパス、予算、家族帯同の有無に応じて、宿泊候補を紹介します。予約はホテル公式サイト等から利用者ご自身で行ってください。', timing: '着任2〜3か月前', partner: '紹介ホテル・宿泊施設', cost: '宿泊費、キャンセル料等は利用者または学内部署負担。' },
  { ja: '航空券・関空到着支援', en: 'Flight and airport arrival support', desc: '航空券手配、関空出迎え、空港からホテル・キャンパス等への移動支援について、MYKと連携して案内します。MYKは航空券・空港到着支援等の旅行関連手配を行う連携先です。', timing: '到着1〜2か月前', partner: 'MYK', cost: '本人負担の場合は本人が事前決済。学内部署負担の場合はMYKと学内部署が請求書で精算。' },
  { ja: '住居・生活立ち上げ支援', en: 'Housing and settling-in support', desc: '住居相談、市役所手続き、在留カード住所登録、国民健康保険、銀行口座開設、携帯電話、キャンパス案内などの初期生活支援。', timing: '着任1〜2か月前', partner: 'クレオテック＋必要に応じた外部先', cost: '交通費、手続き関連費、契約費用等は別途。' },
  { ja: '短期ゲスト向けライト支援', en: 'Light support for short-term guests', desc: '1週間から数か月程度の短期招聘教員・ゲスト向けに、ホテル紹介、航空券、関空出迎え、学内案内等を中心に支援します。COE・ビザは必要な場合のみ確認します。', timing: '来日1〜2か月前', partner: 'クレオテック＋MYK＋宿泊施設', cost: '内容に応じて個別見積。' },
];

const timelines = [
  ['4月着任', ['推奨相談開始: 前年11月〜12月', 'COE・ビザ準備: 12月〜1月', '住居・航空券・ホテル: 2月〜3月', 'リスクが高くなる時期: 2月以降']],
  ['9月着任', ['推奨相談開始: 4月〜5月', 'COE・ビザ準備: 5月〜6月', '住居・航空券・ホテル: 7月〜8月', 'リスクが高くなる時期: 7月以降']],
] as const;

const hotels = [
  { name: 'タッセルイン京都二条', en: 'Tassel Inn Kyoto Nijo', area: '二条エリア', station: '二条駅周辺（要確認）', campus: '朱雀・衣笠方面へのアクセスを想定', price: '時期により変動（要確認）', family: '要確認', long: '中短期向け候補', features: '短期滞在やプログラム利用に便利。朱雀・衣笠方面へのアクセスを想定。' },
  { name: 'プリンスホテル', en: 'Prince Hotel', area: '京都市内または近隣エリア', station: '施設により異なる（要確認）', campus: '来賓・教員・家族帯同の滞在候補', price: '時期により変動（要確認）', family: '候補', long: '要確認', features: '安定したホテル品質。来賓・教員・家族帯同の滞在候補。' },
  { name: 'アーバンホテル二条', en: 'Urban Hotel Nijo', area: '二条エリア', station: '二条駅周辺（要確認）', campus: '京都市内移動に便利', price: '時期により変動（要確認）', family: '要確認', long: '中短期向け候補', features: '中短期滞在や大学関係者の利用候補。京都市内移動に便利。' },
];

const fees = [
  ['基本支援', 'Initial consultation, schedule planning, information organisation, coordination, and guidance. 当面は支援内容に応じて個別見積。'],
  ['外部委託費', 'COE・ビザ支援、専門家費用、外部サービス利用料等。'],
  ['実費', '航空券、ホテル、空港送迎、交通費、郵送費、翻訳費、手続き関連費等。'],
  ['本人負担または学内部署負担を選択できる費用', 'COE・ビザ支援費、航空券、ホテル、関空出迎え等は、案件により本人負担または学内部署負担を選択できます。'],
];

const faqs = [
  ['いつ相談すればよいですか？', '4月着任の場合は前年11月〜12月頃、9月着任の場合は4月〜5月頃の相談開始を推奨します。'],
  ['ホテル予約はクレオテックが行いますか？', '原則として、クレオテックは宿泊候補を紹介します。予約、支払い、変更、キャンセルは、各ホテルの公式サイトまたは案内に従って利用者ご自身で行ってください。'],
  ['航空券は誰が手配しますか？', '航空券や空港到着支援は、MYKと連携して案内します。本人負担の場合は本人が事前決済し、学内部署負担の場合はMYKと学内部署が請求書で精算します。'],
  ['COE・ビザの取得は保証されますか？', '保証はできません。COE・ビザ関連手続きは、受入形態、在留資格、国籍、必要書類等により異なります。外部専門サービスとの連携を含め、必要情報の整理と申請準備を支援します。'],
  ['短期ゲストも対象ですか？', 'はい。短期招聘教員やゲストについては、ホテル紹介、航空券、関空出迎え、学内案内などを中心としたライト支援を行います。COE・ビザは必要な場合のみ確認します。'],
  ['留学生も対象ですか？', 'このサイトは、海外教員・研究者・短期ゲスト・その家族を対象としています。留学生向けCOE支援は、将来的に別サービスとして検討します。'],
];

const contactFields = ['学内部署名 / Department or office', '担当者名 / Contact person', 'メールアドレス / Email', '受入予定者氏名 / Visitor name', '国籍 / Nationality', '現在の居住国 / Current country of residence', '着任予定日 / Expected appointment or arrival date', '滞在予定期間 / Expected period of stay', '家族帯同の有無 / Accompanying family', '希望する支援内容 / Requested support', '費用負担者 / Cost bearer', 'COE・ビザ支援の要否 / COE and visa support needed', 'ホテル紹介の要否 / Accommodation support needed', '航空券・関空出迎えの要否 / Flight or airport arrival support needed'];

export function Section({ eyebrow, title, en, children }: { eyebrow: string; title: string; en: string; children: React.ReactNode }) {
  return <section className="section even:bg-mist"><div className="container"><p className="eyebrow">{eyebrow}</p><h1 className="mt-2 max-w-4xl text-3xl font-extrabold leading-tight text-navy md:text-5xl">{title}</h1><p className="mb-8 mt-2 max-w-3xl text-base font-semibold leading-relaxed text-slate-500">{en}</p>{children}</div></section>;
}

function Meta({ k, v }: { k: string; v: string }) {
  return <div><dt className="font-extrabold text-navy">{k}</dt><dd className="text-slate-700">{v}</dd></div>;
}

export function AudienceCards() {
  return <div className="grid gap-5 md:grid-cols-3">{audiences.map(([ja, en, desc]) => <article className="card p-6 md:p-7" key={ja}><h2 className="text-2xl font-extrabold text-navy">{ja}</h2><p className="mt-1 text-sm font-semibold text-slate-500">{en}</p><p className="mt-4">{desc}</p></article>)}</div>;
}

export function ServicesPage() {
  return <><Section eyebrow="Who we support" title="立命館大学の学内関係者向けサービスです。" en="For Ritsumeikan host offices, faculty, international visitors, and accompanying family members."><AudienceCards /></Section><Section eyebrow="Support menu" title="支援内容" en="Support coordinated by Creotech and external partners"><div className="grid gap-5 lg:grid-cols-2">{services.map((s) => <article className="card overflow-hidden" key={s.ja}><div className="service-card-visual" role="img" aria-label={`${s.ja}の画像エリア（後日差し替え）`}><span>Image area</span></div><div className="p-6 md:p-7"><h2 className="text-2xl font-extrabold text-navy">{s.ja}</h2><p className="text-sm font-semibold text-slate-500">{s.en}</p><p className="mt-4">{s.desc}</p><dl className="mt-5 grid gap-3 text-sm"><Meta k="推奨開始時期" v={s.timing}/><Meta k="主な連携先・担当" v={s.partner}/><Meta k="費用メモ" v={s.cost}/></dl></div></article>)}</div></Section></>;
}

export function TimelinePage() { return <Section eyebrow="Timeline" title="着任時期から逆算する" en="Plan backwards from the appointment date"><div className="grid gap-5 md:grid-cols-2">{timelines.map(([title, items]) => <article className="card p-6 md:p-7" key={title}><h2 className="text-3xl font-extrabold text-navy">{title}</h2><ul className="mt-5 grid gap-3">{items.map(item => <li className="rounded-xl bg-mist p-4 font-semibold" key={item}>✓ {item}</li>)}</ul></article>)}</div><p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 font-semibold text-navy">直前のご相談にも可能な範囲で対応しますが、COE・ビザ、宿泊、航空券、関空到着支援等の一部サービスを提供できない場合があります。できるだけ早めにご相談ください。</p></Section>; }

export function AccommodationPage({ lang }: { lang: Lang }) { return <Section eyebrow="Accommodation" title="宿泊候補" en="Accommodation options introduced for later replacement with official links"><div className="grid gap-6">{hotels.map((h) => <article className="card overflow-hidden md:grid md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]" key={h.name}><div className="hotel-image-placeholder grid aspect-[16/9] min-h-44 place-items-center p-8 text-center text-sm font-bold text-slate-500 md:aspect-auto">Banner image placeholder<br/>後日差し替え</div><div className="p-6 md:p-7"><h2 className="text-2xl font-extrabold text-navy">{h.name}</h2><p className="text-sm font-semibold text-slate-500">{h.en}</p><p className="mt-3">{h.features}</p><dl className="mt-5 grid gap-2 text-sm md:grid-cols-2"><Meta k="Area" v={h.area}/><Meta k="Nearest station" v={h.station}/><Meta k="Access" v={h.campus}/><Meta k="Price range" v={h.price}/><Meta k="Family stay" v={h.family}/><Meta k="Long stay" v={h.long}/></dl><Link className="btn btn-secondary mt-5 w-full sm:w-auto" href={`/${lang}/contact`}>公式予約リンク（後日更新）</Link></div></article>)}</div><p className="mt-6 rounded-2xl border border-line bg-white p-5 font-semibold">掲載ホテルは宿泊候補の紹介です。予約、支払い、変更、キャンセルは、各ホテルの公式サイトまたは案内に従って利用者ご自身で行ってください。料金、空室状況、条件は時期により変動します。</p></Section>; }

export function FeesPage() { return <Section eyebrow="Fees" title="費用の考え方" en="How costs are handled"><div className="grid gap-5 md:grid-cols-2">{fees.map(([title, desc]) => <article className="card p-6 md:p-7" key={title}><h2 className="text-2xl font-extrabold text-navy">{title}</h2><p className="mt-3">{desc}</p></article>)}</div><div className="mt-6 grid gap-4 rounded-3xl bg-navy p-7 text-white"><p>航空券について、本人負担の場合は本人が事前に決済します。学内部署負担の場合は、MYKと学内部署が請求書により精算します。COE・ビザ支援費用については、本人負担または学内部署負担を選択できます。</p><p className="text-white/80">予約、支払い、変更、キャンセル条件は、各ホテル、旅行会社、外部サービス提供者等の規定に従います。クレオテックは、学内窓口として候補紹介、情報整理、外部パートナーとの連携支援を行います。</p></div></Section>; }

export function FaqPage() { return <Section eyebrow="FAQ" title="よくある質問" en="Frequently asked questions"><div className="grid gap-4 md:grid-cols-2">{faqs.map(([q, a]) => <article className="card p-5 md:p-6" key={q}><h2 className="text-xl font-extrabold text-navy">{q}</h2><p className="mt-3">{a}</p></article>)}</div></Section>; }

export function VisitorsPage() { return <Section eyebrow="For International Visitors" title="For International Visitors" en="Basic information for incoming guests"><div className="card overflow-hidden"><div className="visitors-hero-visual" role="img" aria-label="Campus life support image area"><span>Campus / settling-in image area</span></div><div className="p-6 md:p-8"><p className="text-lg">This page provides basic information for international faculty, researchers, short-term guests, and accompanying family members who will come to Ritsumeikan. Creotech works with your host office and external partners to support preparation before arrival and settling in after arrival.</p><div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{['Before coming to Japan','COE and visa support','Accommodation','Flight and airport arrival support','First days in Japan','Payment and costs','Contact your host office'].map(x => <div className="rounded-xl bg-mist p-4 font-bold text-navy" key={x}>{x}</div>)}</div><p className="mt-6 rounded-2xl border border-blue-100 bg-sky p-5 font-bold text-navy">Please contact your host office at Ritsumeikan first. Some services must be requested through the host department or office.</p></div></div></Section>; }

export function ContactPage() { return <Section eyebrow="Contact" title="お問い合わせ" en="Visual-ready inquiry form; submission integration can be added later"><form className="card grid gap-5 p-6 md:p-8"><p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 font-semibold text-navy">このフォームはPhase 1 MVPの画面見本です。実際の送信連携は後続フェーズで追加します。お急ぎの場合は学内担当窓口へご連絡ください。</p><div className="grid gap-5 md:grid-cols-2">{contactFields.map((label) => <label className="grid gap-2 font-bold text-navy" key={label}>{label}<input className="input" /></label>)}</div><label className="grid gap-2 font-bold text-navy">その他相談内容 / Additional comments<textarea className="input min-h-36" /></label><button className="btn btn-primary w-full sm:w-fit" type="button">送信連携は後日追加 / Submission coming later</button></form></Section>; }
