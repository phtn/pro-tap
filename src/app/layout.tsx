import type { Metadata } from 'next'
// eslint-disable-next-line camelcase
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const space = Space_Grotesk({
  variable: '--font-space',
  subsets: ['latin'],
})
export const metadata: Metadata = {
  title: 'ProTap Project',
  description: 'for ProTap',
  icons: ['/re-up-icon.svg'],
}

export default function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${space.variable} ${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  )
}
