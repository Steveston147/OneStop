import { redirect } from 'next/navigation';
import type { Lang } from '@/content/site';

export default async function Request({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  redirect(`/${lang}/contact`);
}
