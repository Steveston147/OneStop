import Image from 'next/image';
import Link from 'next/link';
import { labels, nav, navNames, type Lang } from '@/content/site';

const creotechLogo = '/brand/creotech-logo.png';
const ritsumeikanLogo = '/brand/ritsumeikan-logo.jpg';

export function Header({ lang }: { lang: Lang }) {
  const other = lang === 'ja' ? 'en' : 'ja';

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white/95 backdrop-blur">
      <div className="container flex min-h-20 items-center justify-between gap-4 py-3">
        <Link
          href={`/${lang}`}
          className="flex min-w-0 items-center gap-3 text-navy"
          aria-label="Creotech International Support home"
        >
          <span className="relative block h-10 w-28 shrink-0 sm:h-14 sm:w-40">
            <Image
              src={creotechLogo}
              alt="Creotech International Support"
              fill
              priority
              sizes="160px"
              className="object-contain object-left"
            />
          </span>
          <span className="hidden border-l-2 border-creotechBlue/20 pl-4 text-sm font-extrabold leading-tight text-navy sm:block lg:text-base">
            International
            <br />
            Support
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-bold text-navy xl:flex" aria-label="Primary navigation">
          {nav.slice(0, 7).map((item) => (
            <Link className="transition hover:text-creotechBlue" key={item} href={`/${lang}/${item}`}>
              {navNames[lang][item]}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link className="btn btn-secondary px-3 py-3 text-sm sm:px-5" href={`/${other}`}>
            {labels[lang].lang}
          </Link>
          <Link className="btn btn-primary px-3 py-3 text-sm sm:px-5" href={`/${lang}/request`}>
            {labels[lang].request}
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="bg-navy text-white">
      <div className="container grid gap-10 py-12 lg:grid-cols-[1.2fr_.8fr_.9fr]">
        <div>
          <div className="inline-flex rounded-2xl bg-white px-4 py-3 shadow-soft">
            <span className="relative block h-12 w-40">
              <Image
                src={creotechLogo}
                alt="Creotech International Support"
                fill
                sizes="160px"
                className="object-contain object-left"
              />
            </span>
          </div>
          <p className="mt-5 max-w-md text-white/80">
            {lang === 'ja'
              ? 'Creotech International Support は、立命館関連の海外ゲストに対する初期受付・調整支援を行います。'
              : 'Creotech International Support provides intake and coordination support for Ritsumeikan-related international guests.'}
          </p>
        </div>

        <div className="grid gap-2 text-white/80">
          {nav.map((item) => (
            <Link className="transition hover:text-white" key={item} href={`/${lang}/${item}`}>
              {navNames[lang][item]}
            </Link>
          ))}
        </div>

        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-white/60">
            {lang === 'ja' ? '関連機関' : 'Supporting institution'}
          </p>
          <div className="mt-4 inline-flex rounded-2xl bg-white px-4 py-3 shadow-soft">
            <span className="relative block h-12 w-44">
              <Image
                src={ritsumeikanLogo}
                alt="Ritsumeikan University"
                fill
                sizes="176px"
                className="object-contain object-left"
              />
            </span>
          </div>
          <p className="mt-4 text-sm leading-6 text-white/70">
            {lang === 'ja'
              ? '本サイトはクレオテックが運営する支援受付サイトです。立命館大学公式サイトではありません。'
              : 'This site is operated by Creotech as a support intake service. It is not the official Ritsumeikan University website.'}
          </p>
          <Link href="/admin" className="mt-5 block underline">
            Admin
          </Link>
          <p className="mt-4 text-white/60">© Creotech support MVP</p>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <>
      <Header lang={lang} />
      {children}
      <Footer lang={lang} />
    </>
  );
}

export function CTA({ lang }: { lang: Lang }) {
  return (
    <section className="section bg-navy text-white">
      <div className="container text-center">
        <p className="eyebrow">Next step</p>
        <h2 className="text-4xl font-extrabold">{lang === 'ja' ? 'まずは支援内容をご相談ください' : 'Start with a clear support request'}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
          {lang === 'ja'
            ? '機微書類は送らず、初期情報だけを安全に共有してください。担当者が次の手順をご案内します。'
            : 'Share initial information only—no sensitive documents. Staff will confirm the next step.'}
        </p>
        <Link className="btn mt-8 bg-white text-navy" href={`/${lang}/request`}>
          {labels[lang].request}
        </Link>
      </div>
    </section>
  );
}

export function PageHero({ title, summary }: { title: string; summary: string }) {
  return (
    <section className="bg-gradient-to-br from-mist via-white to-ritsPale">
      <div className="container py-20">
        <p className="eyebrow">International Support</p>
        <h1 className="mt-3 max-w-4xl text-5xl font-extrabold leading-tight text-navy">{title}</h1>
        <p className="mt-5 max-w-3xl text-xl text-ink">{summary}</p>
      </div>
    </section>
  );
}
