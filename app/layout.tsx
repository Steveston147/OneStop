import './globals.css';
import './home-hero-polish.css';
import './service-design-2026.css';
import './brand-title-refinement.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'One-Stop Support for International Faculty & Researchers | Creotech',
    template: '%s | Creotech International Support',
  },
  description: 'One-stop coordination for international faculty, researchers, guests, accompanying families, and host offices across Ritsumeikan University, APU, and affiliated schools.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
