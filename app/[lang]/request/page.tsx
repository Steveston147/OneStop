import { redirect } from 'next/navigation';
import type { Lang } from '@/content/site';

export default function Request({ params }: { params: { lang: Lang } }) {
  redirect(`/${params.lang}/contact`);
}
