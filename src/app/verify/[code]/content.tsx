'use client'

import {ActivationProgress} from '@/app/account/_components/progress'
import {AuthedCardV2} from '@/app/sign/_components/authed-card'
import {MiniVerifier} from '@/components/kokonutui/verifier'
import {Navbar} from '@/components/ui/navbar'
import {useAuthCtx} from '@/ctx/auth'
import {useProduct} from '@/hooks/use-product'
import {useToggle} from '@/hooks/use-toggle'
import {useMemo} from 'react'
import {NavChild} from './_components/nav-child'

export const Content = ({code}: {code: string}) => {
  const {loading, cardStatus} = useProduct(code)
  const isNotOwned = useMemo(
    () => !loading && !!cardStatus && !cardStatus.ownerId,
    [cardStatus, loading],
  )

  const {on: openProgress, toggle: toggleOpenProgress} = useToggle()

  const {user} = useAuthCtx()

  return (
    <div className='min-h-screen bg-gradient-to-br from-white dark:from-background dark:via-black via-white to-background text-foreground'>
      <Navbar>
        <NavChild code={code} />
      </Navbar>
      <main className='flex justify-center items-start h-screen max-w-7xl mx-auto'>
        <div className='w-full'>
          <div className='w-full h-32 md:h-40 flex flex-col items-center md:justify-start justify-center'>
            <MiniVerifier isGood={isNotOwned} />
          </div>
          <div className='px-6 w-full flex justify-center'>
            {user && (
              <AuthedCardV2 activateFn={toggleOpenProgress} user={user} />
            )}
          </div>
        </div>
        <ActivationProgress
          open={openProgress}
          onOpenChange={toggleOpenProgress}
          nfcData={cardStatus && cardStatus.nfcData}
        />
      </main>
    </div>
  )
}
