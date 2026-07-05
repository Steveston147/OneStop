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

export default function ContentPage({ params }: { params: { lang: Lang; slug: string } }) {
  if (!routeSlugs.includes(params.slug as OneStopSlug)) {
    notFound();
  }

  const slug = params.slug as OneStopSlug;
  const [title, summary] = pageMeta[slug];
  const hero = pageHeroDetails[slug];

  return (
    <Layout lang={params.lang}>
      <section className={`page-hero page-hero-${slug}`}>
        <div className="container py-9 md:py-12">
          <div className="page-hero-panel">
            <div className="page-hero-copy">
              <p className="eyebrow">{hero.label}</p>
              <h1>{title}</h1>
              <p>{summary}</p>
              <div className="page-hero-chips" aria-label="ページ概要">
                {hero.chips.map((chip) => <span key={chip}>{chip}</span>)}
              </div>
              {slug !== 'contact' ? (
                <div className="page-hero-actions">
                  <Link className="page-hero-action" href={`/${params.lang}/contact`}>相談する</Link>
                  <Link className="page-hero-action" href={`/${params.lang}`}>トップへ戻る</Link>
                </div>
              ) : null}
            </div>
            <div className="page-hero-aside" aria-hidden="true">
              <span className="mini-label">International Support</span>
              <strong>{hero.cta}</strong>
            </div>
          </div>
        </div>
      </section>
      {slug === 'services' ? <ServicesPage /> : null}
      {slug === 'timeline' ? <TimelinePage /> : null}
      {slug === 'accommodation' ? <AccommodationPage lang={params.lang} /> : null}
      {slug === 'fees' ? <FeesPage /> : null}
      {slug === 'faq' ? <FaqPage /> : null}
      {slug === 'visitors' ? <VisitorsPage /> : null}
      {slug === 'contact' ? <ContactPage /> : null}
    </Layout>
  );
}
