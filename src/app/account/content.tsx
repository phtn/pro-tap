'use client'

import {GuidingLight} from '@/components/experimental/guiding-light'
import {ActivationCtxProvider} from '@/ctx/activation'
import {useState} from 'react'
import {StatusBar} from './_components/statusbar'
import WidgetGrid from './_components/widget-grid'

export const Content = () => {
  const [progress] = useState(0.0)

  return (
    <ActivationCtxProvider>
      <div className='h-[86lvh]  w-full flex flex-col items-center'>
        <GuidingLight />
        <StatusBar progressOne={progress} progressTwo={0} />
        <div className='pt-6 size-full border'>
          <WidgetGrid />
        </div>
      </div>
    </ActivationCtxProvider>
  )
}
