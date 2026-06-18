import { notFound } from 'next/navigation';
import type { Lang } from '@/content/site';

export function generateStaticParams() {
  return [{ lang: 'ja' }, { lang: 'en' }];
}

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { lang: Lang } }) {
  if (params.lang !== 'ja' && params.lang !== 'en') {
    notFound();
  }

  return children;
}
