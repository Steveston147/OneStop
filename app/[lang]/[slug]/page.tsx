import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CTA, Layout, PageHero } from '@/components/Public';
import { faqs, pages, serviceDetails, type Lang } from '@/content/site';

const routeSlugs = [
  'about',
  'services',
  'before-arrival',
  'arrival',
  'living',
  'family',
  'kvh',
  'coe-speedvisa',
  'affiliated-school',
  'pricing',
  'faq',
] as const;

export function generateStaticParams() {
  return ['ja', 'en'].flatMap((lang) => routeSlugs.map((slug) => ({ lang, slug })));
}

export default function ContentPage({ params }: { params: { lang: Lang; slug: string } }) {
  if (!routeSlugs.includes(params.slug as (typeof routeSlugs)[number])) {
    notFound();
  }

  const page = pages[params.lang][params.slug];

  return (
    <Layout lang={params.lang}>
      <PageHero title={page[0]} summary={page[1]} />
      {params.slug === 'faq' ? <Faq lang={params.lang} /> : null}
      {params.slug === 'pricing' ? <Pricing lang={params.lang} /> : null}
      {params.slug !== 'faq' && params.slug !== 'pricing' ? (
        <ServiceContent lang={params.lang} slug={params.slug as keyof typeof serviceDetails.en} />
      ) : null}
      <CTA lang={params.lang} />
    </Layout>
  );
}

function ServiceContent({ lang, slug }: { lang: Lang; slug: keyof typeof serviceDetails.en }) {
  const detail = serviceDetails[lang][slug] || serviceDetails[lang].services;
  const isJa = lang === 'ja';

  return (
    <section className="section bg-white">
      <div className="container grid gap-8 lg:grid-cols-[1fr_340px]">
        <main className="grid gap-8">
          <InfoCard title={isJa ? '対象となる方' : 'Who this service is for'} items={detail.audience} />
          <InfoCard title={isJa ? '支援できること' : 'What we can support'} items={detail.support} columns />
          <ProcessCard title={isJa ? '進め方' : 'Process steps'} steps={detail.process} />
          <section className="card p-8">
            <h2 className="text-2xl font-extrabold text-navy">{isJa ? '料金・見積' : 'Pricing or quotation'}</h2>
            <p className="mt-4 text-lg">{detail.pricing}</p>
          </section>
          <InfoCard title={isJa ? '重要事項・範囲外' : 'Important notes / limitations'} items={detail.notes} warning />
        </main>

        <aside className="card h-fit p-7 lg:sticky lg:top-28">
          <p className="eyebrow">Start here</p>
          <h2 className="mt-2 text-2xl font-extrabold text-navy">
            {isJa ? '初期相談を送信' : 'Send an initial request'}
          </h2>
          <p className="mt-3">
            {isJa
              ? '機微書類を添付せず、分かる範囲の情報だけで依頼できます。'
              : 'Submit only initial information. Sensitive documents should not be sent through this MVP website.'}
          </p>
          <Link className="btn btn-primary mt-6 w-full" href={`/${lang}/request`}>
            {isJa ? '支援を依頼する' : 'Request Support'}
          </Link>
        </aside>
      </div>
    </section>
  );
}

function InfoCard({
  title,
  items,
  columns,
  warning,
}: {
  title: string;
  items: readonly string[];
  columns?: boolean;
  warning?: boolean;
}) {
  return (
    <section className={`card p-8 ${warning ? 'border-l-4 border-l-accent' : ''}`}>
      <h2 className="text-2xl font-extrabold text-navy">{title}</h2>
      <ul className={`mt-5 grid gap-3 ${columns ? 'md:grid-cols-2' : ''}`}>
        {items.map((item) => (
          <li className="rounded-xl bg-mist p-4 font-semibold" key={item}>
            ✓ {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProcessCard({ title, steps }: { title: string; steps: readonly string[] }) {
  return (
    <section className="card p-8">
      <h2 className="text-2xl font-extrabold text-navy">{title}</h2>
      <ol className="mt-5 grid gap-4">
        {steps.map((step, index) => (
          <li className="flex gap-4 text-lg" key={step}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy font-bold text-white">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Pricing({ lang }: { lang: Lang }) {
  const isJa = lang === 'ja';
  const cards = isJa
    ? [
        ['KVH Personal Assistance', '最低4時間：40,000円＋税。追加1時間：10,000円＋税。実費別。'],
        ['空港ミートアシスト', '見積が必要です。待ち合わせ、通訳、地域案内として提供します。'],
        ['住居サポート', '内容、地域、提携会社の関与により見積です。'],
        ['市役所・銀行サポート', 'KVHまたは個別見積で対応します。'],
        ['カスタム支援', '日時、場所、支援内容を確認後に見積します。'],
        ['注意事項', '交通費、入場料、食事、その他実費は別途です。提携会社が対応する場合があります。'],
      ]
    : [
        ['KVH Personal Assistance', 'Minimum 4 hours: JPY 40,000 + tax. Additional hour: JPY 10,000 + tax. Actual expenses separate.'],
        ['Airport Meet and Assist', 'Quotation required. Provided as meet-up, interpretation, and local guidance.'],
        ['Housing Support', 'Quotation required depending on location, scope, and partner involvement.'],
        ['City Office / Bank Support', 'Available through KVH or custom quotation.'],
        ['Custom Support', 'Quotation required after confirming date, location, time, and support details.'],
        ['Notes', 'Transportation, admission fees, meals, and other actual expenses are separate. Some services may be provided by partners.'],
      ];

  return (
    <section className="section">
      <div className="container grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cards.map(([title, body]) => (
          <div className="card p-7" key={title}>
            <h2 className="text-xl font-extrabold text-navy">{title}</h2>
            <p className="mt-3 text-lg">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Faq({ lang }: { lang: Lang }) {
  return (
    <section className="section">
      <div className="container grid gap-4">
        {faqs[lang].map((item: string) => {
          const questionEnd = item.indexOf('?') >= 0 ? item.indexOf('?') + 1 : item.indexOf('？') + 1;
          const question = questionEnd > 0 ? item.slice(0, questionEnd) : item;
          const answer = questionEnd > 0 ? item.slice(questionEnd).trim() : item;
          return (
            <details className="card p-6" key={item}>
              <summary className="cursor-pointer text-lg font-extrabold text-navy">{question}</summary>
              <p className="mt-3 text-lg">{answer}</p>
            </details>
          );
        })}
      </div>
    </section>
  );
}
