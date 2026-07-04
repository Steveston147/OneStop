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

  return (
    <Layout lang={params.lang}>
      <section className="bg-mist">
        <div className="container py-14 md:py-20">
          <p className="eyebrow">International Support</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-extrabold leading-tight text-navy md:text-5xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg text-ink md:text-xl">{summary}</p>
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
