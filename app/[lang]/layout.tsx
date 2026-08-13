import { notFound } from 'next/navigation';
import type { Lang } from '@/content/site';

export function generateStaticParams() {
  return [{ lang: 'ja' }, { lang: 'en' }];
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  if (lang !== 'ja' && lang !== 'en') {
    notFound();
  }

  return children;
}
