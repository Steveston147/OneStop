import '../globals.css';
import '../home-hero-polish.css';
import '../service-design-2026.css';
import '../brand-title-refinement.css';
import '../creotech-logo-branding.css';
import '../compact-brand-banner.css';
import '../global-welcome-capsule.css';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Lang } from '@/content/site';

export const metadata: Metadata = {
  title: {
    default: 'Creotech Global Welcome | International Faculty & Researcher Support',
    template: '%s | Creotech Global Welcome',
  },
  description:
    'Creotech Global Welcome coordinates international faculty and researcher support from invitation and pre-arrival preparation through arrival and settling in across Ritsumeikan University, APU, and affiliated schools.',
};

export function generateStaticParams() {
  return [{ lang: 'ja' }, { lang: 'en' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== 'ja' && lang !== 'en') {
    notFound();
  }

  const locale: Lang = lang;

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
