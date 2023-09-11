import './global.css';
import type { Metadata } from 'next';
import { Fragment_Mono } from 'next/font/google';
import Sidebar from '../components/sidebar';
import { Analytics } from '@vercel/analytics/react';

const textFont = Fragment_Mono({ weight: '400', subsets: ["latin"] });

const siteName = "Dataroc | Cryptocurrency markets analytics and automation"
const description = "Cryptocurrency markets analytics and automation. We help traders identify and capitalize on cryptocurrency market making opportunities."

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: '%s | Dataroc',
  },
  description,
  openGraph: {
    title: siteName,
    description,
    url: 'https://dataroc.ca',
    siteName,
    images: [
      // {
      //   url: 'https://dataroc.ca/og.jpg',
      //   width: 1920,
      //   height: 1080,
      // },
    ],
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    shortcut: '/favicon.ico',
  },
  verification: {
    // google: 'eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${textFont.className}`}
    >
      <body className="prose-invert bg-blue  antialiased max-w-4xl mb-40 flex flex-col md:flex-row mx-4 mt-8 md:mt-20 lg:mt-32 lg:mx-auto">
        <Sidebar />
        <main className="flex-auto min-w-0 mt-6 md:mt-0 flex flex-col px-2 md:px-0">
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  );
}
