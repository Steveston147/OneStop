import Link from 'next/link';
import { labels, type Lang } from '@/content/site';

const homeNav = [
  ['サービス概要 / Services', '#services'],
  ['支援内容 / Support', '#support'],
  ['着任時期から確認 / Timeline', '#timeline'],
  ['宿泊候補 / Accommodation', '#accommodation'],
  ['費用 / Fees', '#fees'],
  ['FAQ', '#faq'],
  ['お問い合わせ / Contact', '#contact'],
] as const;

export function Header({ lang }: { lang: Lang }) {
  const other = lang === 'ja' ? 'en' : 'ja';
  return <header className="sticky top-0 z-20 border-b border-line bg-white/95 backdrop-blur"><div className="container flex min-h-20 items-center justify-between gap-4 py-3"><Link href={`/${lang}`} className="flex items-center gap-3 font-extrabold text-navy"><span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-white">C</span><span className="leading-tight">Creotech<br/><span className="text-sm font-semibold text-slate-600">International Faculty & Researcher Hosting Support</span></span></Link><nav className="hidden xl:flex items-center gap-4 text-xs font-bold text-navy">{homeNav.map(([label, href]) => <a key={href} href={`/${lang}${href}`}>{label}</a>)}</nav><div className="flex gap-3"><Link className="btn btn-secondary" href={`/${other}`}>{labels[lang].lang}</Link><a className="btn btn-primary" href={`/${lang}#contact`}>相談する</a></div></div></header>;
}

export function Footer({ lang }: { lang: Lang }) {
  return <footer className="bg-navy text-white"><div className="container grid gap-8 py-12 md:grid-cols-3"><div><b className="text-xl">Creotech International Support</b><p className="mt-3 text-white/80">立命館大学の学内関係者向けサービスです。Creotech is the internal coordination window and works with external partners.</p></div><div className="grid gap-2">{homeNav.map(([label, href]) => <a key={href} href={`/${lang}${href}`}>{label}</a>)}</div><div><p className="text-white/75">Phase 1 MVP. No Ritsumeikan University official logo is used.</p></div></div></footer>;
}

export function Layout({ lang, children }: { lang: Lang; children: React.ReactNode }) { return <><Header lang={lang}/>{children}<Footer lang={lang}/></>; }
export function CTA({ lang }: { lang: Lang }) { return <section className="section bg-navy text-white"><div className="container text-center"><p className="eyebrow">Next step</p><h2 className="text-4xl font-extrabold">{lang === 'ja' ? 'まずは支援内容をご相談ください' : 'Start with a clear support request'}</h2><Link className="btn mt-8 bg-white text-navy" href={`/${lang}#contact`}>{labels[lang].request}</Link></div></section>; }
export function PageHero({ title, summary }: { title: string; summary: string }) { return <section className="bg-mist"><div className="container py-20"><p className="eyebrow">International Support</p><h1 className="mt-3 max-w-4xl text-5xl font-extrabold leading-tight text-navy">{title}</h1><p className="mt-5 max-w-3xl text-xl text-ink">{summary}</p></div></section>; }
export function ServiceBody({ lang, title }: { lang: Lang; title: string }) { return <div className="container section"><div className="card p-8"><h2 className="text-2xl font-extrabold text-navy">{title}</h2><p className="mt-3">{lang === 'ja' ? 'Phase 1ではトップページのMVPセクションをご確認ください。' : 'For Phase 1, please use the MVP sections on the home page.'}</p></div></div>; }
