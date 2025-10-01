import {ThemeHotkey} from '@/components/theme-hotkey'
import {ThemeProvider} from '@/components/theme-provider'
import {AuthCtxProvider} from '@/ctx/auth'
import {Toasts} from '@/ctx/toast'
import Devtools from '@/devtools'
import type {Metadata} from 'next'
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
  title: 'ProTap Project',
  description: 'for ProTap',
  icons: ['/re-up-icon.svg'],
  referrer: 'strict-origin-when-cross-origin',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <ThemeProvider
          enableSystem
          attribute='class'
          enableColorScheme
          defaultTheme='system'
          disableTransitionOnChange>
          <AuthCtxProvider>
            <div
              className={`bg-background h-screen w-screen overflow-hidden  selection:bg-sky-300/80 dark:selection:text-zinc-800 selection:text-foreground ${doto.variable} ${figtree.variable} ${space.variable} ${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
              {children}

              <ThemeHotkey />
              <Devtools />
            </div>
            <Toasts />
          </AuthCtxProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
