import Link from 'next/link';
import { Layout } from '@/components/Public';
import type { Lang } from '@/content/site';
import { AudienceCards, navItems } from './oneStopContent';

const homeHighlights = [
  'COE・ビザ関連支援',
  '宿泊・航空券・関空到着支援',
  '住居・銀行口座・生活立ち上げ',
] as const;

export default function Home({ params }: { params: { lang: Lang } }) {
  const lang = params.lang;

  return (
    <Layout lang={lang}>
      <main>
        <section className="ja-home-hero">
          <div className="container py-14 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
              <div className="relative z-10">
                <p className="eyebrow">海外教員・研究者受入ワンストップサポート</p>
                <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight tracking-[-.02em] text-navy md:text-6xl">
                  海外教員・研究者等の受入を、来日前から着任後まで支援します
                </h1>
                <p className="mt-5 max-w-3xl text-base font-semibold leading-relaxed text-slate-600 md:text-lg">
                  One-stop support for hosting international faculty, researchers, and guests at Ritsumeikan.
                </p>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink md:text-xl">
                  COE・ビザ、宿泊、航空券、関空到着時の支援、住居、銀行口座開設、生活立ち上げなど、受入に必要な周辺業務を、クレオテックが学内窓口となり、外部パートナーと連携しながら支援します。
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {homeHighlights.map((item) => (
                    <span className="rounded-full border border-gold/30 bg-white/80 px-3 py-1.5 text-sm font-bold text-navy shadow-sm" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                  <Link className="btn btn-cta" href={`/${lang}/contact`}>
                    相談する <span className="ml-2 text-sm opacity-80">Contact us</span>
                  </Link>
                  <Link className="btn btn-secondary" href={`/${lang}/timeline`}>
                    着任時期から確認する <span className="ml-2 text-sm opacity-70">Check the timeline</span>
                  </Link>
                </div>
              </div>

              <aside className="home-guidance-card card p-5 md:p-6" aria-label="Creotechの役割">
                <div className="home-visual-placeholder mb-5" role="img" aria-label="キャンパス写真を後日配置するためのビジュアルエリア">
                  <span className="visual-chip">International hosting support</span>
                </div>
                <p className="inline-flex rounded-full bg-light-gold px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-deep-red">
                  Coordination window
                </p>
                <h2 className="mt-4 text-2xl font-extrabold leading-tight text-navy md:text-3xl">学内調整窓口として、必要な支援につなぎます</h2>
                <p className="mt-4 leading-relaxed text-slate-700">
                  クレオテックは、COE・ビザ、宿泊、航空券、関空到着支援、生活立ち上げ等について、学内担当者・受入予定者・外部パートナーとの連絡調整を行います。
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  取得、予約、支払い、変更・キャンセル等を保証するものではなく、案件に応じて必要な情報整理と連携支援を行います。
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-white/90">
          <div className="container flex flex-wrap gap-3 py-4">
            {navItems.map(([label, href]) => (
              <Link key={href} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-navy transition hover:border-accent hover:bg-light-gold hover:text-deep-red" href={`/${lang}${href}`}>
                {label}
              </Link>
            ))}
          </div>
        </section>

        <section className="section bg-white">
          <div className="container">
            <p className="eyebrow">Who we support</p>
            <h2 className="mt-2 max-w-4xl text-3xl font-extrabold leading-tight text-navy md:text-5xl">
              立命館大学の学内関係者向けサービスです。
            </h2>
            <p className="mb-8 mt-2 max-w-3xl text-base font-semibold leading-relaxed text-slate-500">
              For Ritsumeikan host offices, faculty, international visitors, and accompanying family members.
            </p>
            <AudienceCards />
          </div>
        </section>

        <section className="section bg-mist">
          <div className="container">
            <p className="eyebrow">Support menu</p>
            <h2 className="mt-2 max-w-4xl text-3xl font-extrabold leading-tight text-navy md:text-5xl">主な支援内容への入口</h2>
            <p className="mb-8 mt-2 max-w-3xl text-base font-semibold leading-relaxed text-slate-500">
              詳細は各ページで確認できます。必要な項目からご覧ください。
            </p>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {navItems.map(([label, href]) => (
                <Link className="card group block p-6 transition hover:-translate-y-0.5 hover:border-accent hover:text-deep-red" key={href} href={`/${lang}${href}`}>
                  <span className="mb-4 block h-1.5 w-10 rounded-full bg-gold/70 transition group-hover:bg-deep-red" />
                  <h3 className="text-xl font-extrabold text-navy">{label}</h3>
                  <p className="mt-3 text-sm font-semibold text-slate-500">詳しく見る / View details</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-deep-navy text-white">
          <div className="container text-center">
            <p className="eyebrow">Next step</p>
            <h2 className="mx-auto mt-2 max-w-3xl text-3xl font-extrabold leading-tight md:text-4xl">まずは支援内容をご相談ください</h2>
            <Link className="btn mt-8 border border-white/20 bg-white text-navy hover:bg-light-gold" href={`/${lang}/contact`}>お問い合わせ / Contact</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
