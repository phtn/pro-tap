'use client'

import {GuidingLight} from '@/components/experimental/guiding-light'
import {DiscoverFeed} from './_components/discover-feed/discover-feed'

export const Content = () => {
  return (
    <div className='h-[86lvh]  w-full flex flex-col items-center'>
      <GuidingLight />
      <DiscoverFeed />
    </div>
  )
}
