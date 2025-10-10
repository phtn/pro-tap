'use client'

import {useAuthCtx} from '@/ctx/auth'
import {useMemo} from 'react'
import {LeftPanel} from './left-panel'
import {RightPanel, SocialLogin} from './right-panel'

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

  return (
    <div className='w-full flex items-start justify-center font-figtree'>
      <div className='bg-white md:dark:bg-zinc-800 dark:bg-background  w-full md:rounded-4xl md:shadow-2xl overflow-hidden'>
        <div className='flex flex-col lg:flex-row md:min-h-[70lvh]'>
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
