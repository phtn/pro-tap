'use client'

import {CachedScanResult, getCookie} from '@/app/actions'
import TextAnimate from '@/components/ui/text-animate'
import {useAuthCtx} from '@/ctx/auth'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {AnimatePresence, motion} from 'motion/react'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {LeftPanel} from './left-panel'
import {RightPanel, SocialLogin} from './right-panel'
import {RowItem} from './row-items'

export function FullSignIn() {
  const {user, onSignOut} = useAuthCtx()

  const socialLogins = useMemo(
    () =>
      [
        {
          id: 'google',
          name: 'Google',
          icon: 'google',
          disabled: false,
        },
        {
          id: 'github',
          name: 'GitHub',
          icon: 'github',
          disabled: false,
        },
      ] as Array<SocialLogin>,
    [],
  )

  const [scanResult, setScanResult] = useState<CachedScanResult>()

  const checkActivationStatus = useCallback(async () => {
    return await getCookie('protapScanResult')
  }, [])

  useEffect(() => {
    checkActivationStatus()
      .then((res) => setScanResult(res))
      .catch(console.error)
  }, [checkActivationStatus])

  return (
    <div className='w-full flex items-start justify-center font-figtree'>
      <div className='bg-white dark:bg-background  w-full md:rounded-4xl md:shadow-2xl overflow-hidden'>
        <div className='flex flex-col lg:flex-row md:min-h-[70lvh]'>
          <AnimatePresence mode='wait'>
            {scanResult && <ActivationMessage />}
          </AnimatePresence>
          <LeftPanel />
          <RightPanel
            user={user}
            signOut={onSignOut}
            socialLogins={socialLogins}
          />
        </div>
      </div>
    </div>
  )
}

const ActivationMessage = () => {
  return (
    <motion.div
      initial={{opacity: 0, scale: 0.8, y: -8}}
      animate={{opacity: 1, scale: 1, y: 0}}
      transition={{
        type: 'spring',
        visualDuration: 0.5,
        bounce: 0.3,
      }}
      className='z-20 absolute bg-dark-origin/60 backdrop-blur-2xl border border-dark-origin left-1/2 -translate-1/2 top-1/3 -translate-y-1/3 w-96 h-96 rounded-4xl flex items-start py-8 font-figtree'>
      <div className='space-y-10 w-full flex flex-col items-start'>
        <div
          className={cn(
            'ml-7 flex items-center space-x-1 border rounded-full bg-foreground dark:bg-background text-white text-xs md:text-sm px-3 py-1.5 dark:border-amber-500/60',
          )}>
          <motion.div
            initial={{opacity: 0, scale: 0.2, x: -48}}
            animate={{opacity: 1, scale: 1, x: 0}}
            transition={{
              type: 'spring',
              visualDuration: 0.5,
              bounce: 0.3,
            }}
            className=''>
            <Icon
              name={'zap-solid'}
              className={cn('size-5 text-mac-teal', {})}
            />
          </motion.div>
          <TextAnimate
            type='whipInUp'
            className='text-white text-sm font-bold tracking-tight'>
            {'Protap Activation'}
          </TextAnimate>
        </div>
        <RowItem title='Code Validation'>
          <div className='pl-3'>Your code is valid and ready to use.</div>
        </RowItem>
        <div className='w-full flex justify-center overflow-x-visible'>
          <div className='h-[3px] bg-origin/60 dark:bg-origin/30 w-full rounded-full -mx-24' />
        </div>
        <RowItem title='next step'>
          <div className='pl-3 max-w-[30ch]'>
            Sign in to your account you wish to activate your protap.
          </div>
        </RowItem>
      </div>
    </motion.div>
  )
}
