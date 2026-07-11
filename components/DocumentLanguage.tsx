'use client';

import { useEffect } from 'react';
import type { Lang } from '@/content/site';

export default function DocumentLanguage({ lang }: { lang: Lang }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
