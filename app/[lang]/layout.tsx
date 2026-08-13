import { notFound } from 'next/navigation';
import type { Lang } from '@/content/site';
import DocumentLanguage from '@/components/DocumentLanguage';

export function generateStaticParams() {
  return [{ lang: 'ja' }, { lang: 'en' }];
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== 'ja' && lang !== 'en') {
    notFound();
  }

  const locale: Lang = lang;

  return (
    <>
      <DocumentLanguage lang={locale} />
      {children}
    </>
  );
}
