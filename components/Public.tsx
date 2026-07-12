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

function HeaderGlobeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.8 12h16.4M12 3.5c2.2 2.4 3.3 5.2 3.3 8.5S14.2 18.1 12 20.5M12 3.5C9.8 5.9 8.7 8.7 8.7 12s1.1 6.1 3.3 8.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

export function Header({ lang }: { lang: Lang }) {
  const other = lang === 'ja' ? 'en' : 'ja';

  return (
    <header className="site-header premium-site-header">
      <div className="container header-inner premium-header-inner">
        <Link href={`/${lang}`} className="brand-lockup premium-brand-lockup" aria-label="Creotech Global Welcome home">
          <span className="ritsumeikan-monogram" aria-hidden="true">
            <span className="ritsumeikan-r">R</span>
            <small>RITSUMEIKAN</small>
          </span>
          <span className="brand-divider" aria-hidden="true" />
          <span className="brand-copy">
            <span className="creotech-header-logo" role="img" aria-label="Creotech">CREOTECH</span>
            <span className="brand-message global-welcome-header-banner">
              <span className="capsule-support-segment">
                <span className="capsule-globe"><HeaderGlobeIcon /></span>
                <span className="capsule-support-copy">
                  {lang === 'ja' ? (
                    <>
                      <span>海外教員・</span>
                      <span>研究者受入支援</span>
                    </>
                  ) : (
                    <>
                      <span>International</span>
                      <span>Support</span>
                    </>
                  )}
                </span>
              </span>
              <span className="capsule-brand-segment">
                <strong>GLOBAL WELCOME</strong>
                <span>Ritsumeikan Academy × Creotech</span>
              </span>
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
          <p className="footer-brand">CREOTECH GLOBAL WELCOME</p>
          <p className="footer-service-name">
            {lang === 'ja' ? '海外教員・研究者受入支援サービス' : 'International Faculty & Researcher Support'}
          </p>
          <p className="footer-copy">
            {lang === 'ja'
              ? '招へい準備から来日後の生活立ち上げまで、立命館大学、APU、附属校における海外教員・研究者等の受入を、ひとつの窓口で支援します。'
              : 'From invitation and pre-arrival preparation to arrival and settling in, we coordinate support for international faculty, researchers, guests, accompanying families, and host offices across Ritsumeikan University, APU, and affiliated schools.'}
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
        <p className="eyebrow">Creotech Global Welcome</p>
        <h2>{lang === 'ja' ? '招へい準備から、ひとつの窓口で。' : 'One coordinated service, from invitation to arrival.'}</h2>
        <p>
          {lang === 'ja'
            ? '受入時期や必要な支援が確定していなくても、来日前準備から生活立ち上げまで一緒に整理できます。'
            : 'Even when dates or support details are not final, we can organise the next steps from pre-arrival preparation through settling in.'}
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
        <p className="eyebrow">Creotech Global Welcome</p>
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
