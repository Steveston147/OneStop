import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Layout } from '@/components/Public';
import type { Lang } from '@/content/site';
import {
  AccommodationPage,
  ContactPage,
  FaqPage,
  FeesPage,
  ServicesPage,
  TimelinePage,
  VisitorsPage,
  pageHeroDetails,
  pageMeta,
  type OneStopSlug,
} from '../oneStopContent';

const routeSlugs = ['services', 'timeline', 'accommodation', 'fees', 'faq', 'visitors', 'contact'] as const;

export function generateStaticParams() {
  return ['ja', 'en'].flatMap((lang) => routeSlugs.map((slug) => ({ lang, slug })));
}

export default async function ContentPage({ params }: { params: Promise<{ lang: Lang; slug: string }> }) {
  const resolvedParams = await params;
  if (!routeSlugs.includes(resolvedParams.slug as OneStopSlug)) notFound();

  const lang = resolvedParams.lang;
  const slug = resolvedParams.slug as OneStopSlug;
  const [title, summary] = pageMeta[lang][slug];
  const hero = pageHeroDetails[lang][slug];
  const isContact = slug === 'contact';

  return (
    <Layout lang={lang}>
      <main>
        <section className="page-hero">
          <div className="container">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href={`/${lang}`}>{lang === 'ja' ? 'ホーム' : 'Home'}</Link>
              <span aria-hidden="true">/</span>
              <span>{title}</span>
            </nav>
            <div className="page-hero-panel">
              <div className="page-hero-copy">
                <p className="eyebrow">{hero.label}</p>
                <h1>{title}</h1>
                <p>{summary}</p>
                <div className="page-hero-chips" aria-label={lang === 'ja' ? 'ページ概要' : 'Page summary'}>
                  {hero.chips.map((chip) => <span key={chip}>{chip}</span>)}
                </div>
              </div>
              <div className="page-hero-aside">
                <span className="mini-label">International Support</span>
                <strong>{hero.cta}</strong>
                {!isContact ? (
                  <Link className="text-action" href={`/${lang}/contact`}>
                    {lang === 'ja' ? '相談フォームへ' : 'Open the enquiry form'} →
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {slug === 'services' ? <ServicesPage lang={lang} /> : null}
        {slug === 'timeline' ? <TimelinePage lang={lang} /> : null}
        {slug === 'accommodation' ? <AccommodationPage lang={lang} /> : null}
        {slug === 'fees' ? <FeesPage lang={lang} /> : null}
        {slug === 'faq' ? <FaqPage lang={lang} /> : null}
        {slug === 'visitors' ? <VisitorsPage lang={lang} /> : null}
        {slug === 'contact' ? <ContactPage lang={lang} /> : null}
      </main>
    </Layout>
  );
}
