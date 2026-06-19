import Link from 'next/link';
import { CTA, Layout } from '@/components/Public';
import { banner, home, labels, type Lang } from '@/content/site';

export default function Home({ params }: { params: { lang: Lang } }) {
  const { lang } = params;
  const h = home[lang];

  return (
    <Layout lang={lang}>
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-mist to-sky">
        <div className="absolute right-0 top-0 h-44 w-44 rounded-bl-[90px] bg-creotechBlue/10" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-creotechBlue via-navy to-rits" aria-hidden="true" />
        <div className="container grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="eyebrow">Creotech International Support</p>
            <h1 className="mt-4 text-5xl font-extrabold leading-tight text-navy xl:text-6xl">{h.headline}</h1>
            <p className="mt-6 text-xl text-ink">{h.sub}</p>
            <p className="mt-5 rounded-2xl border border-line bg-white p-4 font-semibold text-navy shadow-soft">{h.trust}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link className="btn btn-primary" href={`/${lang}/request`}>
                {labels[lang].request}
              </Link>
              <Link className="btn btn-secondary" href={`/${lang}/services`}>
                {labels[lang].services}
              </Link>
            </div>
          </div>

          <div className="card border-creotechBlue/20 p-6">
            <div className="rounded-3xl bg-navy p-7 text-white">
              <p className="eyebrow">One front door</p>
              <h2 className="mt-3 text-3xl font-extrabold">
                {lang === 'ja' ? '来日前から生活立ち上げまで' : 'From pre-arrival to daily-life setup'}
              </h2>
              <div className="mt-8 grid gap-3">
                {['COE / SpeedVisa', 'Housing', 'Arrival', 'KVH', 'Family'].map((item, index) => (
                  <span className="flex items-center gap-3 rounded-xl bg-white/10 p-4" key={item}>
                    <span className={`h-2.5 w-2.5 rounded-full ${index === 0 ? 'bg-rits' : 'bg-creotechBlue'}`} />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Service areas</p>
          <h2 className="text-4xl font-extrabold text-navy">{lang === 'ja' ? '大きなカードから必要な支援へ' : 'Choose support from large service cards'}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {banner[lang].map(([title, description, slug]) => (
              <Link key={title} href={`/${lang}/${slug}`} className="card group p-7 transition hover:-translate-y-1 hover:border-creotechBlue/40">
                <span className="mb-5 block h-1.5 w-12 rounded-full bg-gradient-to-r from-creotechBlue to-rits" aria-hidden="true" />
                <h3 className="text-2xl font-extrabold text-navy group-hover:text-creotechBlue">{title}</h3>
                <p className="mt-3 text-ink">{description}</p>
                <span className="mt-5 inline-block font-bold text-accent">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container grid gap-5 lg:grid-cols-3">
          {(lang === 'ja' ? ['初期相談', '支援範囲確認', '実施・フォロー'] : ['Initial request', 'Scope confirmation', 'Support and follow-up']).map((item, index) => (
            <div className="card p-7" key={item}>
              <b className="text-accent">0{index + 1}</b>
              <h3 className="mt-2 text-2xl font-extrabold text-navy">{item}</h3>
              <p className="mt-3">
                {lang === 'ja'
                  ? '受入部局と申請者の状況に合わせ、無理なく次の手順へ進めます。'
                  : 'Move to the next step according to applicant and host department needs.'}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container card border-l-4 border-l-rits p-10">
          <h2 className="text-3xl font-extrabold text-navy">{lang === 'ja' ? '受入部局・事務担当者の方へ' : 'For host departments and administrative staff'}</h2>
          <p className="mt-4 text-lg">
            {lang === 'ja'
              ? '来日前準備、COE/SpeedVisa案内、到着後の生活立ち上げ、家族支援を一つの窓口で整理し、部局の負担を減らします。'
              : 'The service organizes pre-arrival preparation, COE/SpeedVisa guidance, daily-life setup, and family support through one clear front door.'}
          </p>
        </div>
      </section>

      <CTA lang={lang} />
    </Layout>
  );
}
