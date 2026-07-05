import Link from 'next/link';
import { labels, type Lang } from '@/content/site';

const homeNav = [
  ['サービス概要 / Services', '/services'],
  ['着任時期から確認 / Timeline', '/timeline'],
  ['宿泊候補 / Accommodation', '/accommodation'],
  ['費用 / Fees', '/fees'],
  ['FAQ', '/faq'],
  ['Visitors', '/visitors'],
  ['お問い合わせ / Contact', '/contact'],
] as const;

export function Header({ lang }: { lang: Lang }) {
  const other = lang === 'ja' ? 'en' : 'ja';

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white/95 backdrop-blur">
      <div className="container flex min-h-16 items-center justify-between gap-3 py-3 lg:min-h-[72px]">
        <Link href={`/${lang}`} className="flex min-w-0 items-center gap-2.5 font-extrabold text-navy" aria-label="Creotech International Support home">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-white text-sm text-deep-red shadow-sm sm:h-9 sm:w-9">C</span>
          <span className="min-w-0 leading-tight">
            <span className="block max-w-[44vw] truncate text-sm sm:max-w-none sm:text-base">International Support</span>
            <span className="hidden text-xs font-semibold text-slate-500 md:block">
              Faculty & Researcher Hosting
            </span>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 xl:flex">
          {homeNav.map(([label, href]) => (
            <a className="nav-link" key={href} href={`/${lang}${href}`}>
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <Link className="btn btn-secondary btn-sm" href={`/${other}`}>
            {labels[lang].lang}
          </Link>
          <a className="btn btn-cta btn-sm" href={`/${lang}/contact`}>
            {lang === 'ja' ? '相談する' : 'Contact'}
          </a>
        </div>

        <details className="mobile-menu relative xl:hidden">
          <summary className="btn btn-secondary btn-sm cursor-pointer list-none select-none">Menu</summary>
          <div className="absolute right-0 top-full mt-3 w-[min(88vw,360px)] rounded-2xl border border-line bg-white p-3 shadow-soft">
            <nav aria-label="Mobile navigation" className="grid gap-1">
              {homeNav.map(([label, href]) => (
                <a className="nav-link block" key={href} href={`/${lang}${href}`}>
                  {label}
                </a>
              ))}
            </nav>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-line pt-3">
              <Link className="btn btn-secondary btn-sm" href={`/${other}`}>
                {labels[lang].lang}
              </Link>
              <a className="btn btn-cta btn-sm" href={`/${lang}/contact`}>
                {lang === 'ja' ? '相談する' : 'Contact'}
              </a>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="bg-deep-navy text-white">
      <div className="container grid gap-8 py-10 md:grid-cols-[1.25fr_1fr_.9fr]">
        <div>
          <b className="text-lg">Creotech International Support</b>
          <p className="mt-3 max-w-prose text-sm text-white/75">
            立命館大学の学内関係者向けサービスです。Creotech is the internal coordination window and works with external partners.
          </p>
        </div>
        <nav className="grid gap-2 text-sm text-white/85 md:grid-cols-2" aria-label="Footer navigation">
          {homeNav.map(([label, href]) => (
            <a className="hover:text-white" key={href} href={`/${lang}${href}`}>
              {label}
            </a>
          ))}
        </nav>
        <div>
          <p className="text-sm text-white/65">Phase 1 MVP. No Ritsumeikan University official logo is used.</p>
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
    <section className="section bg-deep-navy text-white">
      <div className="container text-center">
        <p className="eyebrow">Next step</p>
        <h2 className="mx-auto mt-2 max-w-3xl text-3xl font-extrabold leading-tight md:text-4xl">
          {lang === 'ja' ? 'まずは支援内容をご相談ください' : 'Start with a clear support request'}
        </h2>
        <Link className="btn mt-8 border border-white/20 bg-white text-navy hover:bg-light-gold" href={`/${lang}/contact`}>
          {labels[lang].request}
        </Link>
      </div>
    </section>
  );
}

export function PageHero({ title, summary }: { title: string; summary: string }) {
  return (
    <section className="bg-mist">
      <div className="container py-14 md:py-20">
        <p className="eyebrow">International Support</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-extrabold leading-tight text-navy md:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg text-ink md:text-xl">{summary}</p>
      </div>
    </section>
  );
}

export function ServiceBody({ lang, title }: { lang: Lang; title: string }) {
  return (
    <div className="container section">
      <div className="card p-6 md:p-8">
        <h2 className="text-2xl font-extrabold text-navy">{title}</h2>
        <p className="mt-3">
          {lang === 'ja' ? 'Phase 1ではトップページのMVPセクションをご確認ください。' : 'For Phase 1, please use the MVP sections on the home page.'}
        </p>
      </div>
    </div>
  );
}
