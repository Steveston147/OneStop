'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Lang } from '@/content/site';

export default function MobileContactCta({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const hidden = pathname.endsWith('/contact') || pathname.includes('/request');

  if (hidden) return null;

  return (
    <div className="mobile-contact-cta" aria-label={lang === 'ja' ? '相談へのショートカット' : 'Contact shortcut'}>
      <Link href={`/${lang}/contact`}>
        {lang === 'ja' ? '相談する' : 'Contact us'}
      </Link>
    </div>
  );
}
