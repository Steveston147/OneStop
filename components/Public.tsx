import Link from 'next/link';
import { CreotechLogo, OptionalRitsumeikanLogo } from '@/components/BrandLogos';
import { labels, nav, navNames, type Lang } from '@/content/site';

export function Header({ lang }: { lang: Lang }) {
  const other = lang === 'ja' ? 'en' : 'ja';
  const ritsLabel = lang === 'ja' ? '立命館関連機関' : 'Ritsumeikan-related institutions';

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white/95 backdrop-blur">
      <div className="container flex min-h-24 items-center justify-between gap-5 py-3">
        <Link href={`/${lang}`} className="flex items-center gap-4 text-navy" aria-label="Creotech International Support home">
          <CreotechLogo className="h-14 w-32 shrink-0" />
          <span className="hidden border-l border-line pl-4 text-base font-extrabold leading-tight sm:block">
            International
            <br />
            Support
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-bold text-navy xl:flex" aria-label="Primary navigation">
          {nav.slice(0, 7).map((item) => (
            <Link className="hover:text-rits" key={item} href={`/${lang}/${item}`}>
              {navNames[lang][item]}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <OptionalRitsumeikanLogo label={ritsLabel} />
        </div>

        <div className="flex shrink-0 gap-3">
          <Link className="btn btn-secondary" href={`/${other}`}>
            {labels[lang].lang}
          </Link>
          <Link className="btn btn-primary" href={`/${lang}/request`}>
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
      <div className="container grid gap-8 py-12 md:grid-cols-3">
        <div>
          <CreotechLogo className="h-14 w-32 rounded-xl bg-white p-2" />
          <p className="mt-4 text-white/80">
            {lang === 'ja'
              ? '立命館スクールカラーのえんじをアクセントにしたMVPです。立命館ロゴは承認済みファイルがある場合のみ表示します。'
              : 'This MVP uses Ritsumeikan crimson as an accent. The Ritsumeikan logo is shown only when an approved logo file is provided.'}
          </p>
        </div>
        <div className="grid gap-2">
          {nav.map((item) => (
            <Link key={item} href={`/${lang}/${item}`}>
              {navNames[lang][item]}
            </Link>
          ))}
        </div>
        <div>
          <OptionalRitsumeikanLogo label={lang === 'ja' ? '立命館関連機関' : 'Ritsumeikan-related institutions'} />
          <Link href="/admin" className="mt-5 block underline">
            Admin
          </Link>
          <p className="mt-4 text-white/75">© Creotech support MVP</p>
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
