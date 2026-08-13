import './globals.css';
import './home-hero-polish.css';
import './service-design-2026.css';
import './brand-title-refinement.css';
import './creotech-logo-branding.css';
import './compact-brand-banner.css';
import './global-welcome-capsule.css';
import type { Metadata } from 'next';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: {
    default: 'Creotech Global Welcome | International Faculty & Researcher Support',
    template: '%s | Creotech Global Welcome',
  },
  description: 'Creotech Global Welcome coordinates international faculty and researcher support from invitation and pre-arrival preparation through arrival and settling in across Ritsumeikan University, APU, and affiliated schools.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const requestHeaders = await headers();
  const lang = requestHeaders.get('x-one-stop-lang') === 'en' ? 'en' : 'ja';

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
