import './global.css'
import type { Metadata } from 'next'
import { Fragment_Mono } from 'next/font/google'
import Sidebar from '../components/sidebar'
import Topbar from '../components/topbar'
import { Analytics } from '@vercel/analytics/react'

const textFont = Fragment_Mono({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const siteName = 'Dataroc | Data-focused software developer and architect'
const description =
  'Data-focused software developer and architect. Lying in-between a software developer and a data scientist with all the skills to architect, implement, deploy and maintain data-focused applications.'

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: '%s | Dataroc',
  },
  description,
  openGraph: {
    title: siteName,
    description,
    url: 'https://www.dataroc.ca',
    siteName,
    images: [
      {
        url: 'https://www.dataroc.ca/og-bg.png',
        width: 1920,
        height: 1080,
      },
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${textFont.className}`}>
      <body className="prose-invert bg-blue antialiased max-w-4xl mb-40 flex flex-col md:flex-row mx-4 mt-16 md:mt-20 lg:mt-32 lg:mx-auto">
        <Topbar />
        <Sidebar />
        <main className="dark flex-auto min-w-0 mt-6 md:mt-0 flex flex-col">
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  )
}
