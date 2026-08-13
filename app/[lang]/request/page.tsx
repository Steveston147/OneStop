import { redirect } from 'next/navigation';
import type { Lang } from '@/content/site';

export default async function Request({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== 'ja' && lang !== 'en') redirect('/en');
  redirect(`/${lang}/contact`);
}
