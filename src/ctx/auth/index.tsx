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
import {useRouter} from 'next/navigation'
import React, {createContext, useContext, useEffect, useState} from 'react'
import {useSigninCheck} from 'reactfire'
import type {AuthUser} from './types'

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signInWithGoogle?: VoidPromise
  onSignOut?: VoidPromise
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSignOut = async () => {
    setLoading(true)
    try {
      await signOut(auth)
      setUser(null)
      router.push('/sign')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const signInWithGoogle = async () => {
    setLoading(true)
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      setLoading(false)
    } catch (error) {
      console.error('Error signi?? in with Google:', error)
      setLoading(false)
    }
  }

  const {status, data: signInCheckResult} = useSigninCheck()

  useEffect(() => {
    if (status === 'success' && signInCheckResult.user) {
      setLoading(false)
      const firebaseUser = signInCheckResult.user
      getUser(firebaseUser.uid).then((userProfile) => {
        const authUser: AuthUser = {
          ...firebaseUser,
          // Spread userProfile with null coalescing for required properties
          ...(userProfile
            ? {
                uid: userProfile.uid,
                email: userProfile.email,
                displayName: userProfile.displayName,
                photoURL: userProfile.photoURL,
                providerIds: userProfile.providerIds || [],
                createdAt: userProfile.createdAt,
                lastLogin: userProfile.lastLogin,
                isActivated: userProfile.isActivated,
                ntag: userProfile.ntag,
                userInputData: userProfile.userInputData,
                userType: userProfile.userType,
                purchaseType: userProfile.purchaseType,
                loyaltyPoints: userProfile.loyaltyPoints,
                isMerchant: userProfile.isMerchant,
                isAffiliate: userProfile.isAffiliate,
                userInfo: userProfile.userInfo,
              }
            : {
                // Default values when userProfile is null
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
                providerIds:
                  firebaseUser.providerData?.map((p) => p.providerId) || [],
                createdAt: null as any,
                lastLogin: null as any,
                isActivated: false,
                ntag: {
                  serialNumber: '',
                  scanTime: null,
                  metadata: {},
                  type: '',
                },
                userInputData: {
                  firstName: '',
                  middleName: '',
                  lastName: '',
                  birthdate: null,
                  type: '',
                },
                userType: 'INDIVIDUAL' as const,
                purchaseType: '',
                loyaltyPoints: 0,
                isMerchant: false,
                isAffiliate: false,
                userInfo: null,
              }),
          role: userProfile?.role ?? 'user',
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
            // Spread userProfile with null coalescing for required properties
            ...(userProfile
              ? {
                  uid: userProfile.uid,
                  email: userProfile.email,
                  displayName: userProfile.displayName,
                  photoURL: userProfile.photoURL,
                  providerIds: userProfile.providerIds || [],
                  createdAt: userProfile.createdAt,
                  lastLogin: userProfile.lastLogin,
                  isActivated: userProfile.isActivated,
                  ntag: userProfile.ntag,
                  userInputData: userProfile.userInputData,
                  userType: userProfile.userType,
                  purchaseType: userProfile.purchaseType,
                  loyaltyPoints: userProfile.loyaltyPoints,
                  isMerchant: userProfile.isMerchant,
                  isAffiliate: userProfile.isAffiliate,
                  userInfo: userProfile.userInfo,
                }
              : {
                  // Default values when userProfile is null
                  uid: firebaseUser.uid,
                  email: firebaseUser.email,
                  displayName: firebaseUser.displayName,
                  photoURL: firebaseUser.photoURL,
                  providerIds:
                    firebaseUser.providerData?.map((p) => p.providerId) || [],
                  createdAt: null as any,
                  lastLogin: null as any,
                  isActivated: false,
                  ntag: {
                    serialNumber: '',
                    scanTime: null,
                    metadata: {},
                    type: '',
                  },
                  userInputData: {
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    birthdate: null,
                    type: '',
                  },
                  userType: 'INDIVIDUAL' as const,
                  purchaseType: '',
                  loyaltyPoints: 0,
                  isMerchant: false,
                  isAffiliate: false,
                  userInfo: null,
                }),
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
        loading: loading || status === 'loading',
        signInWithGoogle,
        onSignOut,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthCtx = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('AuthContext is missing')
  return ctx
}
