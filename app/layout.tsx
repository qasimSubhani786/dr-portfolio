import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Dr. Syed Shakir Jawad Abdi — General Physician | Lahore',
  description:
    'Dr. Syed Shakir Jawad Abdi, MBBS — Consultant General Physician in Lahore, Pakistan. Comprehensive general and internal medicine care.',
  keywords: [
    'Dr. Syed Shakir Jawad Abdi',
    'general physician Lahore',
    'internal medicine Lahore',
    'consultant physician Pakistan',
    'family doctor Lahore',
  ],
  authors: [{ name: 'Dr. Syed Shakir Jawad Abdi' }],
  openGraph: {
    title: 'Dr. Syed Shakir Jawad Abdi — General Physician',
    description: 'Consultant General Physician providing comprehensive medical care in Lahore, Pakistan.',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
