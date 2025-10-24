'use client'

import {env} from '@/env'
import {ConvexProvider, ConvexReactClient} from 'convex/react'
import {type ReactNode} from 'react'

interface ConvexProviderProps {
  children: ReactNode
}

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL)

export const ConvexCtxProvider = ({children}: ConvexProviderProps) => {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>
}
