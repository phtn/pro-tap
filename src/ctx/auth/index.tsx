'use client'
// download
import {
  clearUserProfile,
  getCookie,
  getUserProfile,
  setUserProfile,
} from '@/app/actions'
import {VoidPromise} from '@/app/types'
import {auth} from '@/lib/firebase'
import {createUser, getUser} from '@/lib/firebase/users'
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
      await clearUserProfile() // Clear cached user profile data
      setUser(null)
      setLoading(false)
      router.push('/alpha')
    } catch (error) {
      setLoading(false)
      console.error('Error signing out:', error)
    }
  }

  const signInWithGoogle = async () => {
    setLoading(true)

    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const firebaseUser = result.user

      // Cache user profile data after successful authentication
      if (firebaseUser) {
        try {
          console.log(
            'Starting user profile caching for user:',
            firebaseUser.uid,
          )
          let userProfile = await getUser(firebaseUser.uid)

          // Create user profile if it doesn't exist
          if (!userProfile) {
            console.log('No user profile found, creating new profile...')
            await createUser(firebaseUser)
            userProfile = await getUser(firebaseUser.uid)
            console.log('User profile created:', userProfile)
          }

          if (userProfile) {
            const profileData = {
              uid: userProfile.uid,
              email: userProfile.email || null,
              displayName: userProfile.displayName || null,
              photoURL: userProfile.photoURL || null,
              // Exclude photoData to keep cookie size under 4096 chars
              // photoData,
              role: userProfile.role || 'user',
              isActivated: userProfile.isActivated,
              userType: userProfile.userType,
              subscriptionType: userProfile.subscriptionType || null,
              purchaseType: '',
              loyaltyPoints: userProfile.loyaltyPoints,
              isMerchant: userProfile.isMerchant,
              isAffiliate: userProfile.isAffiliate,
            }

            console.log('Setting user profile cookie with data:', profileData)
            console.log(
              'Cookie data size estimate:',
              JSON.stringify(profileData).length,
              'characters',
            )

            await setUserProfile(profileData)
            console.log('User profile cookie set successfully')

            // Verify the cookie was set
            const verifyCookie = await getUserProfile()
            console.log('Cookie verification - retrieved data:', verifyCookie)

            // Also check all cookies in the browser
            if (typeof document !== 'undefined') {
              console.log('All cookies:', document.cookie)
            }
          } else {
            console.error(
              'Failed to get or create user profile for user:',
              firebaseUser.uid,
            )
          }
        } catch (error) {
          console.error('Error in user profile caching process:', error)
          console.error('Error details:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : 'No stack trace',
          })
        }
      } else {
        console.error('No firebase user found after authentication')
      }

      const scanResult = await getCookie('protapScanResult')

      if (scanResult) {
        // Process the scan result
        router.push('/account/add-service')
      } else {
        // Handle the case when the cookie is not found
        router.push('/account/profile')
      }

      setLoading(false)
    } catch (error) {
      console.error('Error signin?? in with Google:', error)
      setLoading(false)
    }
  }

  const {status, data: signInCheckResult} = useSigninCheck()

  useEffect(() => {
    if (status === 'success' && signInCheckResult.user) {
      setLoading(false)
      const firebaseUser = signInCheckResult.user

      // Check for cached user profile first
      getUserProfile().then(async (cachedProfile) => {
        if (cachedProfile && cachedProfile.uid === firebaseUser.uid) {
          // Use cached profile data
          const authUser: AuthUser = {
            ...firebaseUser,
            uid: cachedProfile.uid,
            email: cachedProfile.email,
            displayName: cachedProfile.displayName,
            photoURL: cachedProfile.photoURL,
            providerIds:
              firebaseUser.providerData?.map((p) => p.providerId) || [],
            createdAt: null as any, // Will be updated if we fetch fresh data
            lastLogin: null as any,
            isActivated: cachedProfile.isActivated,
            activatedOn: null,
            ntag: {
              serialNumber: '',
              scanTime: null,
              metadata: {},
              type: '',
            },
            userBioData: {
              firstName: null,
              middleName: null,
              lastName: null,
              gender: null,
            },
            userType: cachedProfile.userType as any,
            purchaseType: '',
            loyaltyPoints: cachedProfile.loyaltyPoints,
            isMerchant: cachedProfile.isMerchant,
            isAffiliate: cachedProfile.isAffiliate,
            userInfo: null,
            role: cachedProfile.role as 'admin' | 'manager' | 'user' | 'dev',
          }
          setUser(authUser)
        } else {
          // Fetch fresh data from Firebase
          getUser(firebaseUser.uid).then(async (userProfile) => {
            // Create user profile if it doesn't exist
            if (!userProfile) {
              await createUser(firebaseUser)
            }

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
                    activatedOn: null,
                    ntag: userProfile.ntag,
                    userBioData: userProfile.userBioData,
                    userType: userProfile.userType || null,
                    subscriptionType: userProfile.subscriptionType || null,
                    purchaseType: userProfile.purchaseType || null,
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
                    activatedOn: null,
                    ntag: {
                      serialNumber: '',
                      scanTime: null,
                      metadata: {},
                      type: '',
                    },
                    userBioData: {
                      firstName: null,
                      middleName: null,
                      lastName: null,
                      gender: null,
                    },
                    userType: 'INDIVIDUAL' as const,
                    subscriptionType: null,
                    purchaseType: '',
                    loyaltyPoints: 0,
                    isMerchant: false,
                    isAffiliate: false,
                    userInfo: null,
                  }),
              role: userProfile?.role ?? 'user',
            }

            // Cache the user profile data for future use
            if (userProfile) {
              // Download and cache image data if photoURL exists

              await setUserProfile({
                uid: userProfile.uid,
                email: userProfile.email || null,
                displayName: userProfile.displayName || null,
                photoURL: userProfile.photoURL || null,
                // Exclude photoData to keep cookie size under 4096 chars
                // photoData,
                role: userProfile.role || 'user',
                isActivated: userProfile.isActivated,
                userType: userProfile.userType,
                subscriptionType: userProfile.subscriptionType || null,
                purchaseType: '',
                loyaltyPoints: userProfile.loyaltyPoints,
                isMerchant: userProfile.isMerchant,
                isAffiliate: userProfile.isAffiliate,
              })
            }

            setUser(authUser)
          })
        }
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

          // Check for cached user profile first
          const cachedProfile = await getUserProfile()
          if (cachedProfile && cachedProfile.uid === firebaseUser.uid) {
            // Use cached profile data
            const authUser: AuthUser = {
              ...firebaseUser,
              uid: cachedProfile.uid,
              email: cachedProfile.email,
              displayName: cachedProfile.displayName,
              photoURL: cachedProfile.photoURL,
              providerIds:
                firebaseUser.providerData?.map((p) => p.providerId) || [],
              createdAt: null as any,
              lastLogin: null as any,
              isActivated: cachedProfile.isActivated,
              activatedOn: null,
              ntag: {
                serialNumber: '',
                scanTime: null,
                metadata: {},
                type: '',
              },
              userBioData: {
                firstName: null,
                middleName: null,
                lastName: null,
                gender: null,
              },
              userType: cachedProfile.userType as any,
              purchaseType: '',
              loyaltyPoints: cachedProfile.loyaltyPoints,
              isMerchant: cachedProfile.isMerchant,
              isAffiliate: cachedProfile.isAffiliate,
              userInfo: null,
              role: cachedProfile.role as 'admin' | 'manager' | 'user' | 'dev',
            }
            setUser(authUser)
          } else {
            // Fetch fresh data from Firebase
            const userProfile = await getUser(firebaseUser.uid)

            // Create user profile if it doesn't exist
            if (!userProfile) {
              await createUser(firebaseUser)
            }

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
                    userBioData: userProfile.userBioData,
                    userType: userProfile.userType ?? null,
                    subscriptionType: userProfile.subscriptionType || null,
                    purchaseType: userProfile.purchaseType,
                    loyaltyPoints: userProfile.loyaltyPoints,
                    isMerchant: userProfile.isMerchant,
                    isAffiliate: userProfile.isAffiliate,
                    userInfo: userProfile.userInfo,
                    activatedOn: null,
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
                    activatedOn: null,
                    ntag: {
                      serialNumber: '',
                      scanTime: null,
                      metadata: {},
                      type: '',
                    },
                    userBioData: {
                      firstName: null,
                      middleName: null,
                      lastName: null,
                      gender: null,
                    },
                    userType: 'INDIVIDUAL' as const,
                    subscriptionType: null,
                    purchaseType: '',
                    loyaltyPoints: 0,
                    isMerchant: false,
                    isAffiliate: false,
                    userInfo: null,
                  }),
              role: userProfile?.role || 'user',
            }

            // Cache the user profile data for future use
            if (userProfile) {
              // Download and cache image data if photoURL exists

              await setUserProfile({
                uid: userProfile.uid,
                email: userProfile.email || null,
                displayName: userProfile.displayName || null,
                photoURL: userProfile.photoURL || null,
                // Exclude photoData to keep cookie size under 4096 chars
                // photoData,
                role: userProfile.role || 'user',
                isActivated: userProfile.isActivated,
                userType: userProfile.userType,
                subscriptionType: userProfile.subscriptionType || null,
                loyaltyPoints: userProfile.loyaltyPoints,
                isMerchant: userProfile.isMerchant,
                isAffiliate: userProfile.isAffiliate,
                purchaseType: null,
              })
            }

            setUser(authUser)
          }
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
