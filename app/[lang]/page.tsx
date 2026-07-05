import Link from 'next/link';
import { Layout } from '@/components/Public';
import type { Lang } from '@/content/site';
import { AudienceCards, navItems } from './oneStopContent';

export default function Home({ params }: { params: { lang: Lang } }) {
  const lang = params.lang;

  return (
    <Layout lang={lang}>
      <main>
        <section className="ja-hero-bg bg-gradient-to-br from-white via-mist to-sky">
          <div className="container py-16 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
              <div>
                <p className="eyebrow">海外教員・研究者受入ワンストップサポート</p>
                <h1 className="mt-4 text-4xl font-extrabold leading-tight text-navy md:text-6xl">
                  海外教員・研究者等の受入を、来日前から着任後まで支援します
                </h1>
                <p className="mt-4 max-w-3xl text-base font-semibold leading-relaxed text-slate-600 md:text-lg">
                  One-stop support for hosting international faculty, researchers, and guests at Ritsumeikan.
                </p>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink md:text-xl">
                  COE・ビザ、宿泊、航空券、関空到着時の支援、住居、銀行口座開設、生活立ち上げなど、海外からの教員・研究者・短期ゲスト等を受け入れる際に必要となる周辺業務を、クレオテックが学内窓口となり、外部パートナーと連携しながら支援します。
                </p>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
                  Creotech supports Ritsumeikan staff and faculty by coordinating COE and visa support, accommodation, flight and airport arrival support, housing, banking, and settling-in assistance through internal coordination and external partners.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                  <Link className="btn btn-primary" href={`/${lang}/contact`}>
                    相談する <span className="ml-2 text-sm opacity-80">Contact us</span>
                  </Link>
                  <Link className="btn btn-secondary" href={`/${lang}/timeline`}>
                    着任時期から確認する <span className="ml-2 text-sm opacity-70">Check the timeline</span>
                  </Link>
                </div>
              </div>
              <div className="card p-6 md:p-7">
                <div className="rounded-3xl bg-navy p-6 text-white md:p-7">
                  <p className="text-sm font-bold uppercase tracking-widest text-white/65">Creotech role</p>
                  <h2 className="mt-3 text-3xl font-extrabold">学内調整窓口として連携します</h2>
                  <p className="mt-4 text-white/80">
                    Creotech introduces, connects, organises, and coordinates with external partners. It does not guarantee approvals, reservations, cancellations, or payments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-white">
          <div className="container flex flex-wrap gap-3 py-4">
            {navItems.map(([label, href]) => (
              <Link key={href} className="rounded-full border border-line px-4 py-2 text-sm font-bold text-navy hover:border-accent" href={`/${lang}${href}`}>
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
            <h2 className="mt-2 max-w-4xl text-3xl font-extrabold leading-tight text-navy md:text-5xl">主な支援内容</h2>
            <p className="mb-8 mt-2 max-w-3xl text-base font-semibold leading-relaxed text-slate-500">
              各内容の詳細は独立ページで確認できます。
            </p>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {navItems.map(([label, href]) => (
                <Link className="card block p-6 transition hover:-translate-y-0.5 hover:border-accent" key={href} href={`/${lang}${href}`}>
                  <h3 className="text-xl font-extrabold text-navy">{label}</h3>
                  <p className="mt-3 text-sm font-semibold text-slate-500">詳しく見る / View details</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-navy text-white">
          <div className="container text-center">
            <p className="eyebrow">Next step</p>
            <h2 className="mx-auto mt-2 max-w-3xl text-3xl font-extrabold leading-tight md:text-4xl">まずは支援内容をご相談ください</h2>
            <Link className="btn mt-8 bg-white text-navy" href={`/${lang}/contact`}>お問い合わせ / Contact</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
