import type { Metadata } from 'next';
import './reference.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'OneFin — Smarter Finance Made Simple',
  description: 'A complete platform for managing spend, payments, investments, and forecasting—all in one place.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
