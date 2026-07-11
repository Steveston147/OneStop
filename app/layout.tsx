import './globals.css';
import './home-hero-polish.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'One-Stop Support for International Faculty & Researchers | Creotech',
    template: '%s | Creotech International Support',
  },
  description: 'One-stop coordination for international faculty, researchers, guests, accompanying families, and Ritsumeikan University host offices.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
