'use client'

import {GuidingLight} from '@/components/experimental/guiding-light'
import {ActivationCtxProvider} from '@/ctx/activation'

export const Content = () => {
  return (
    <ActivationCtxProvider>
      <div className='h-[86lvh]  w-full flex flex-col items-center'>
        <GuidingLight />
        {/*<StatusBar progressOne={progress} progressTwo={0} />*/}
        <div className='pt-6 size-full border'>{/*<WidgetGrid />*/}</div>
      </div>
    </ActivationCtxProvider>
  )
}
