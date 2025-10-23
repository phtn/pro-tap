'use client'

import {ThemeHotkey} from '@/components/theme-hotkey'
import {FirebaseProvider} from '@/lib/firebase/provider'
import {MDXProvider} from '@mdx-js/react'
import {ThemeProvider} from 'next-themes'
import {createContext, useContext, type ReactNode} from 'react'
import {components} from '../../mdx.components'
import {ActivationCtxProvider} from './activation'
import {AuthProvider} from './auth'
import {Toasts} from './toast'
import {ToneProvider} from './tone'

interface ProvidersProviderProps {
  children: ReactNode
}

interface ProvidersCtxValues {
  on: boolean
}

const ProvidersCtx = createContext<ProvidersCtxValues | null>(null)

const ProvidersCtxProvider = ({children}: ProvidersProviderProps) => {
  return (
    <ProvidersCtx value={null}>
      <MDXProvider components={components}>
        <FirebaseProvider>
          <AuthProvider>
            <ActivationCtxProvider>
              <ToneProvider>
                <ThemeProvider
                  enableSystem
                  attribute='class'
                  enableColorScheme
                  defaultTheme='system'
                  disableTransitionOnChange>
                  <div
                    className={`bg-background h-screen w-screen overflow-hidden  selection:bg-sky-300/80 dark:selection:text-zinc-800 selection:text-foreground font-sans`}>
                    {children}

                    <ThemeHotkey />
                  </div>

                  <Toasts />
                </ThemeProvider>
              </ToneProvider>
            </ActivationCtxProvider>
          </AuthProvider>
        </FirebaseProvider>
      </MDXProvider>
    </ProvidersCtx>
  )
}

const useProvidersCtx = () => {
  const ctx = useContext(ProvidersCtx)
  if (!ctx) throw new Error('ProvidersCtxProvider is missing')
  return ctx
}

export {ProvidersCtx, ProvidersCtxProvider, useProvidersCtx}
