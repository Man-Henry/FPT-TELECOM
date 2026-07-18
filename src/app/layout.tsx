import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { siteConfig } from '@/config/site';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FAB } from '@/components/layout/FAB';
import { Analytics } from '@/components/layout/Analytics';
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin', 'vietnamese'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-heading',
  subsets: ['latin', 'vietnamese'],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${spaceGrotesk.variable} dark h-full antialiased`}
    >
      <head>
        <Analytics />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main id="main-content" className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
        <FAB />
      </body>
    </html>
  );
}
