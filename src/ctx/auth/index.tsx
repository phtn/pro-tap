'use client'

import {VoidPromise} from '@/app/types'
import {auth} from '@/lib/firebase'
import {getUser} from '@/lib/firebase/users'
import {
  GoogleAuthProvider,
  onIdTokenChanged,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth'
import React, {createContext, useContext, useEffect, useState} from 'react'
import {useSigninCheck} from 'reactfire'
import type {AuthUser} from './types'

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signInWithGoogle?: VoidPromise
  onSignOut?: VoidPromise
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: undefined,
  onSignOut: undefined,
})

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null)

  const onSignOut = async () => {
    try {
      await signOut(auth)
      setUser(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error('Error signing in with Google:', error)
    }
  }

  const {status, data: signInCheckResult} = useSigninCheck()

  useEffect(() => {
    if (status === 'success' && signInCheckResult.user) {
      const firebaseUser = signInCheckResult.user
      getUser(firebaseUser.uid).then((userProfile) => {
        const authUser: AuthUser = {
          ...firebaseUser,
          role: userProfile?.role || 'user',
        }
        setUser(authUser)
      })
    } else if (status === 'success' && !signInCheckResult.user) {
      setUser(null)
    }
  }, [status, signInCheckResult])

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(
      auth,
      async (firebaseUser: User | null) => {
        if (firebaseUser) {
          // When token changes, we update the custom claim 'role'.
          await firebaseUser.getIdToken(true)
          const userProfile = await getUser(firebaseUser.uid)
          const authUser: AuthUser = {
            ...firebaseUser,
            role: userProfile?.role || 'user',
          }
          setUser(authUser)
        } else {
          setUser(null)
        }
      },
    )

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: status === 'loading',
        signInWithGoogle,
        onSignOut,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthCtx = () => useContext(AuthContext)
