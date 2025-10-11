import { ProvidersCtxProvider } from '@/ctx/providers'
import Devtools from '@/devtools'
import type { Metadata } from 'next'
import {
  Doto,
  Figtree,
  Geist,
  Geist_Mono as GeistMono,
  Space_Grotesk as SpaceGrotesk,
} from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = GeistMono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const space = SpaceGrotesk({
  variable: '--font-space',
  subsets: ['latin'],
})

const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
})
const doto = Doto({
  variable: '--font-doto',
  subsets: ['latin'],
})
export const metadata: Metadata = {
  title: {
    default: 'ProTap - Smart NFC Business Cards & Digital Networking',
    template: '%s | ProTap'
  },
  description: 'Create stunning digital business cards with NFC technology. Share your contact information, social links, and more with a simple tap. Perfect for modern networking and professional connections.',
  keywords: ['NFC business cards', 'digital networking', 'contact sharing', 'smart cards', 'professional networking', 'digital transformation'],
  authors: [{ name: 'ProTap Team' }],
  creator: 'ProTap',
  publisher: 'ProTap',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://protap.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'ProTap - Smart Digital Insurance',
    description: 'Create stunning online personal and business profile. Share your contact information, social links, and more with a simple tap.',
    siteName: 'ProTap',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ProTap - Smart Digital Insurance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProTap - Smart Digital Insurance',
    description: 'Create stunning online personal and business profile. Share your contact information, social links, and more with a simple tap.',
    images: ['/og-image.png'],
    creator: '@protap',
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
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
      sizes: 'any',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/apple-touch-icon.png',
    },
  ],
  manifest: '/manifest.json',
  referrer: 'strict-origin-when-cross-origin',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${doto.variable} ${figtree.variable} ${space.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ProvidersCtxProvider>{children}</ProvidersCtxProvider>
        <Devtools />
      </body>
    </html>
  )
}
