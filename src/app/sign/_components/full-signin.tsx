'use client'

import { useAuthCtx } from '@/ctx/auth'
import { useMemo } from 'react'
import { LeftPanel } from './left-panel'
import { RightPanel, SocialLogin } from './right-panel'

export function FullSignIn() {
  const { signInWithGoogle, signInWithGithub, user, signOut } = useAuthCtx()

  const handleGoogle = async () => {
    try {
      await signInWithGoogle()
    } catch (e: unknown) {
      console.error(e)
    }
  }

  const handleGithub = async () => {
    try {
      await signInWithGithub()
    } catch (e: unknown) {
      console.error(e)
    }
  }

  const socialLogins = useMemo(
    () =>
      [
        {
          id: 'google',
          name: 'Google',
          icon: 'google',
          fn: handleGoogle,
          disabled: false,
        },
        {
          id: 'github',
          name: 'GitHub',
          icon: 'github',
          fn: handleGithub,
          // disabled: true,
        },
        {
          id: 'apple',
          name: 'Apple',
          icon: 'apple',
          fn: handleGoogle,
          disabled: true,
        },
      ] as Array<SocialLogin>,
    []
  )

  return (
    <div className='w-full flex items-center justify-center font-figtree'>
      <div className='bg-white md:dark:bg-zinc-800 dark:bg-background  w-full md:rounded-4xl md:shadow-2xl overflow-hidden'>
        <div className='flex flex-col lg:flex-row min-h-[70lvh]'>
          <LeftPanel />
          <RightPanel
            user={user}
            signOut={signOut}
            socialLogins={socialLogins}
          />
        </div>
      </div>
    </div>
  )
}
