'use client'

import {FullSignIn} from '@/app/sign/_components/full-signin'
import {Navbar} from '@/components/ui/navbar'
import {getAuth} from 'firebase/auth'
import {AuthProvider, useFirebaseApp} from 'reactfire'

export const Content = () => {
  const firebase = useFirebaseApp()
  const auth = getAuth(firebase)
  return (
    <div className='h-screen bg-background'>
      <Navbar hideOnMobile />
      <main className='max-w-6xl mx-auto h-fit pt-10 md:pt-0 flex items-start justify-center'>
        <AuthProvider sdk={auth}>
          <FullSignIn />
        </AuthProvider>
      </main>
    </div>
  )
}
