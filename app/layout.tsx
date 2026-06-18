import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Creotech International Support', description: 'International faculty and researcher support MVP' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ja"><body>{children}</body></html>}
