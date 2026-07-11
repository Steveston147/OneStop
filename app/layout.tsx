import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Creotech International Faculty & Researcher Support',
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
