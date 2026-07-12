import './globals.css';
import './home-hero-polish.css';
import './service-design-2026.css';
import './brand-title-refinement.css';
import './creotech-logo-branding.css';
import './compact-brand-banner.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Creotech Global Welcome | International Faculty & Researcher Support',
    template: '%s | Creotech Global Welcome',
  },
  description: 'Creotech Global Welcome coordinates international faculty and researcher support from invitation and pre-arrival preparation through arrival and settling in across Ritsumeikan University, APU, and affiliated schools.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
