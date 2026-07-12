import Link from 'next/link';
import { labels, type Lang } from '@/content/site';
import DocumentLanguage from '@/components/DocumentLanguage';
import MobileContactCta from '@/components/MobileContactCta';

const navigation = {
  ja: [
    ['サポート内容', '/services'],
    ['準備スケジュール', '/timeline'],
    ['宿泊・生活', '/accommodation'],
    ['費用・FAQ', '/fees'],
    ['相談する', '/contact'],
  ],
  en: [
    ['Support', '/services'],
    ['Timeline', '/timeline'],
    ['Accommodation', '/accommodation'],
    ['Fees & FAQ', '/fees'],
    ['Contact', '/contact'],
  ],
} as const;

const footerNavigation = {
  ja: [
    ['サポート内容', '/services'],
    ['準備スケジュール', '/timeline'],
    ['宿泊候補', '/accommodation'],
    ['費用', '/fees'],
    ['よくある質問', '/faq'],
    ['お問い合わせ', '/contact'],
  ],
  en: [
    ['Support services', '/services'],
    ['Preparation timeline', '/timeline'],
    ['Accommodation', '/accommodation'],
    ['Fees', '/fees'],
    ['FAQ', '/faq'],
    ['Contact', '/contact'],
  ],
} as const;

export function Header({ lang }: { lang: Lang }) {
  const other = lang === 'ja' ? 'en' : 'ja';

  return (
    <header className="site-header premium-site-header">
      <div className="container header-inner premium-header-inner">
        <Link href={`/${lang}`} className="brand-lockup premium-brand-lockup" aria-label="OneStop International Support home">
          <span className="ritsumeikan-monogram" aria-hidden="true">
            <span className="ritsumeikan-r">R</span>
            <small>RITSUMEIKAN</small>
          </span>
          <span className="brand-divider" aria-hidden="true" />
          <span className="brand-copy">
            <span className="creotech-header-logo" role="img" aria-label="Creotech">CREOTECH</span>
            <span className="brand-message">
              <strong>ONE STOP</strong>
              <span className="brand-service-line">International Support</span>
              <span className="brand-context-line">Ritsumeikan × Creotech</span>
            </span>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="desktop-nav premium-desktop-nav">
          {navigation[lang].map(([label, href], index) => (
            <Link
              className={index === navigation[lang].length - 1 ? 'btn btn-cta btn-sm premium-contact-button' : 'nav-link'}
              key={href}
              href={`/${lang}${href}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="btn btn-secondary btn-sm premium-language-button" href={`/${other}`}>
            {labels[lang].lang}
          </Link>
        </div>

        <details className="mobile-menu">
          <summary className="btn btn-secondary btn-sm">Menu</summary>
          <div className="mobile-menu-panel">
            <nav aria-label="Mobile navigation">
              {navigation[lang].map(([label, href]) => (
                <Link className="mobile-nav-link" key={href} href={`/${lang}${href}`}>
                  {label}
                </Link>
              ))}
            </nav>
            <Link className="btn btn-secondary btn-sm" href={`/${other}`}>
              {labels[lang].lang}
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">CREOTECH</p>
          <p className="footer-service-name">One-Stop Support for International Faculty &amp; Researchers</p>
          <p className="footer-copy">
            {lang === 'ja'
              ? '立命館大学、APU、附属校における海外教員・研究者等の受入準備を、学内外の関係先と連携しながら支援します。'
              : 'We coordinate practical support for international faculty, researchers, guests, accompanying families, and host offices across Ritsumeikan University, APU, and affiliated schools.'}
          </p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          {footerNavigation[lang].map(([label, href]) => (
            <Link key={href} href={`/${lang}${href}`}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="footer-notes">
          <p>
            {lang === 'ja'
              ? '運営・調整窓口：クレオテック・国際業務課（留学サポートデスク・衣笠）'
              : 'Operations and coordination: Creotech International Affairs Department (Ritsumeikan Study Abroad Center, Kinugasa)'}
          </p>
          <p>{lang === 'ja' ? 'COE・査証の取得、予約、契約等を保証するものではありません。' : 'COE or visa approval, bookings, and contracts are not guaranteed.'}</p>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <>
      <DocumentLanguage lang={lang} />
      <Header lang={lang} />
      {children}
      <Footer lang={lang} />
      <MobileContactCta lang={lang} />
    </>
  );
}

export function CTA({ lang }: { lang: Lang }) {
  return (
    <section className="final-cta">
      <div className="container final-cta-inner">
        <p className="eyebrow">Next step</p>
        <h2>{lang === 'ja' ? '分かる範囲からご相談ください。' : 'Start with the information you already have.'}</h2>
        <p>
          {lang === 'ja'
            ? '受入時期や必要な支援が確定していなくても、初期相談から整理できます。'
            : 'You can make an initial enquiry even when dates or support details are not final.'}
        </p>
        <Link className="btn btn-light" href={`/${lang}/contact`}>
          {lang === 'ja' ? '相談フォームへ' : 'Open the enquiry form'}
        </Link>
      </div>
    </section>
  );
}

export function PageHero({ title, summary }: { title: string; summary: string }) {
  return (
    <section className="simple-page-hero">
      <div className="container">
        <p className="eyebrow">International Support</p>
        <h1>{title}</h1>
        <p>{summary}</p>
      </div>
    </section>
  );
}

export function ServiceBody({ lang, title }: { lang: Lang; title: string }) {
  return (
    <div className="container section">
      <div className="card content-card">
        <h2>{title}</h2>
        <p>{lang === 'ja' ? '詳しい内容はサポート一覧からご確認ください。' : 'Please review the detailed support overview.'}</p>
      </div>
    </div>
  );
}
