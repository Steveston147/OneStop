import Link from 'next/link';
import { Layout } from '@/components/Public';
import type { Lang } from '@/content/site';
import { AudienceCards, navItems } from './oneStopContent';

const homeHighlights = ['COE・ビザ', '宿泊・航空券', '関空到着支援', '生活立ち上げ'] as const;

const supportCards = [
  ['Services', '支援内容を見る', '/services', 'COE・ビザ、宿泊、航空券、生活立ち上げを整理。'],
  ['Timeline', '着任時期から確認', '/timeline', '4月・9月着任を基準に準備時期を確認。'],
  ['Contact', 'まず相談する', '/contact', '分かる範囲の情報から初期相談へ。'],
] as const;

export default function Home({ params }: { params: { lang: Lang } }) {
  const lang = params.lang;

  return (
    <Layout lang={lang}>
      <main>
        <section className="ja-home-hero">
          <div className="container py-14 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[1.02fr_.98fr] lg:items-center">
              <div className="relative z-10">
                <p className="eyebrow">海外教員・研究者受入ワンストップサポート</p>
                <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[1.12] tracking-[-.02em] text-navy md:text-5xl lg:text-[3.35rem]">
                  海外教員・研究者等の受入を、安心して進めるために。
                </h1>
                <p className="mt-5 max-w-2xl text-base font-semibold leading-relaxed text-slate-600 md:text-lg">
                  立命館大学の受入業務を、クレオテックが学内窓口として外部パートナーと連携しながら支援します。
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {homeHighlights.map((item) => (
                    <span className="rounded-full border border-gold/30 bg-white/85 px-3 py-1.5 text-sm font-bold text-navy shadow-sm" key={item}>{item}</span>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                  <Link className="btn btn-cta" href={`/${lang}/contact`}>相談する <span className="ml-2 text-sm opacity-80">Contact us</span></Link>
                  <Link className="btn btn-primary" href={`/${lang}/services`}>支援内容を見る</Link>
                  <Link className="btn btn-secondary" href={`/${lang}/timeline`}>時期から確認</Link>
                </div>
              </div>

              <aside className="home-guidance-card card p-5 md:p-6" aria-label="Creotechの役割">
                <div className="grid gap-4 sm:grid-cols-[.85fr_1.15fr]">
                  <div className="home-visual-placeholder home-visual-vertical" role="img" aria-label="将来のキャンパス写真を配置できる抽象ビジュアル">
                    <span className="visual-chip">International support</span>
                  </div>
                  <div className="grid content-between gap-4">
                    <div>
                      <p className="mini-label">Coordination window</p>
                      <h2 className="mt-3 text-2xl font-extrabold leading-tight text-navy">学内調整窓口として、必要な支援につなぎます。</h2>
                      <p className="mt-4 text-sm leading-relaxed text-slate-700">COE・ビザ、宿泊、航空券、関空到着支援、生活立ち上げ等を、案件に応じて整理します。</p>
                    </div>
                    <p className="rounded-2xl bg-light-gold p-4 text-sm font-bold leading-relaxed text-deep-red">取得・予約・支払い等を保証するものではなく、情報整理と連携支援を行います。</p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-white/90">
          <div className="container flex flex-wrap gap-3 py-4">
            {navItems.map(([label, href]) => (
              <Link key={href} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-navy transition hover:border-accent hover:bg-light-gold hover:text-deep-red" href={`/${lang}${href}`}>{label}</Link>
            ))}
          </div>
        </section>

        <section className="section bg-white">
          <div className="container">
            <p className="eyebrow">Start here</p>
            <h2 className="section-title">必要な入口を、すぐ選べます。</h2>
            <p className="section-lead">学内担当者が迷わず次の行動に移れるよう、主要導線を3つに絞りました。</p>
            <div className="grid gap-5 md:grid-cols-3">
              {supportCards.map(([tag, title, href, desc]) => (
                <Link className="card lift-card block p-6 md:p-7" key={href} href={`/${lang}${href}`}>
                  <span className="mini-label">{tag}</span>
                  <h3 className="mt-4 text-2xl font-extrabold text-navy">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{desc}</p>
                  <span className="mt-5 inline-flex font-extrabold text-deep-red">詳しく見る →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-mist">
          <div className="container">
            <p className="eyebrow">Who we support</p>
            <h2 className="section-title">学内受入と来日準備を、同じ窓口で整理します。</h2>
            <p className="section-lead">対象者ごとに必要な情報へ進みやすくしました。</p>
            <AudienceCards />
          </div>
        </section>

        <section className="section bg-white">
          <div className="container">
            <p className="eyebrow">All pages</p>
            <h2 className="section-title">詳しい情報はこちらから。</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {navItems.map(([label, href]) => (
                <Link className="card group block p-5 transition hover:-translate-y-0.5 hover:border-accent" key={href} href={`/${lang}${href}`}>
                  <span className="mb-4 block h-1.5 w-10 rounded-full bg-gold/70 transition group-hover:bg-deep-red" />
                  <h3 className="text-lg font-extrabold text-navy">{label}</h3>
                  <p className="mt-2 text-sm font-semibold text-slate-500">View details</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-deep-navy text-white">
          <div className="container text-center">
            <p className="eyebrow">Next step</p>
            <h2 className="mx-auto mt-2 max-w-3xl text-3xl font-extrabold leading-tight md:text-4xl">まずは分かる範囲でご相談ください</h2>
            <Link className="btn mt-8 border border-white/20 bg-white text-navy hover:bg-light-gold" href={`/${lang}/contact`}>お問い合わせ / Contact</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
