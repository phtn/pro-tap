'use server'

import {cookies} from 'next/headers'

interface CookieOptions {
  path?: string
  httpOnly?: boolean
  sameSite?: boolean | 'lax' | 'strict' | 'none'
  secure?: boolean
  maxAge?: number
}

type CookieType =
  | 'theme'
  | 'session'
  | 'language'
  | 'darkMode'
  | 'favorites'
  | 'soundEnabled'
  | 'devServer'
  | 'protapCode'
  | 'protapUserId'
  | 'protapUserEmail'
  | 'protapUserProfile'
  | 'nfcData'
  | 'qrcData'
  | 'protapScanResult'

export interface CachedScanResult {
  success: boolean
  id: string
  series: string
  group: string
  batch: string
  ownerId?: string
  ownerPublicUrl?: string
  ownerPublicName?: string
}

export type ValuesMap = {
  theme: string
  session: {token: string}
  language: string
  soundEnabled: boolean
  darkMode: boolean
  favorites: string[]
  devServer?: string
  protapCode?: string
  protapUserId?: string
  protapUserEmail?: string
  protapUserProfile?: {
    uid: string
    email: string | null
    displayName: string | null
    photoURL: string | null
    photoData?: string | null // base64 encoded image data
    role: string
    isActivated: boolean
    userType: string | null
    subscriptionType: string | null
    purchaseType: string | null
    loyaltyPoints: number
    isMerchant: boolean
    isAffiliate: boolean
  }
  nfcData?: string
  qrcData?: string
  protapScanResult: CachedScanResult
}

interface Expiry {
  expires?: Date
}

const cookieNameMap: Record<CookieType, string> = {
  theme: 'protap-themes',
  session: 'user-session',
  language: 'preferred-language',
  darkMode: 'dark-mode-enabled',
  favorites: 'user-favorites',
  soundEnabled: 'sound-enabled',
  devServer: 'dev-server-ip',
  protapCode: 'protap-code',
  protapUserId: 'protap-user-id',
  protapUserEmail: 'protap-user-email',
  protapUserProfile: 'protap-user-profile',
  nfcData: 'nfc-data',
  qrcData: 'qrc-data',
  protapScanResult: 'protap-scan-result',
}

const defaults: CookieOptions = {
  path: '/',
  httpOnly: false,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 30, // 30 days
}

const cookieExpiryMap: Partial<Record<CookieType, number>> = {
  session: 60 * 60 * 24 * 7, // 7 days
  theme: 60 * 60 * 24 * 365, // 1 year
  darkMode: 60 * 60 * 24 * 30, // 30 days
  protapUserProfile: 60 * 60 * 24 * 7, // 7 days
}

/**
 * @name setCookie
 * @param CookieType
 * @param valuesMap
 * @param CookieOptions
 */
export const setCookie = async <T extends CookieType>(
  type: T,
  values: ValuesMap[T],
  options?: Partial<CookieOptions & Expiry>,
) => {
  const name = cookieNameMap[type]
  const store = await cookies()
  const value = JSON.stringify(values)
  const maxAge = options?.maxAge ?? cookieExpiryMap[type] ?? defaults.maxAge
  store.set(name, value, {...defaults, maxAge, ...options})
}

export const getCookie = async <T extends CookieType>(
  type: T,
): Promise<ValuesMap[T] | undefined> => {
  const name = cookieNameMap[type]
  const store = await cookies()
  const cookie = store.get(name)

  if (!cookie?.value) return undefined

  try {
    return JSON.parse(cookie.value) as ValuesMap[T]
  } catch {
    // fallback if the value was stored without JSON
    return cookie.value as unknown as ValuesMap[T]
  }
}

export const deleteCookie = async (type: CookieType) => {
  const name = cookieNameMap[type]
  const store = await cookies()
  store.delete(name)
}

/**
 * @name setUserProfile
 * @description Cache user profile data to avoid fetching on every page route
 */
export const setUserProfile = async (
  userProfile: ValuesMap['protapUserProfile'],
) => {
  await setCookie('protapUserProfile', userProfile)
}

/**
 * @name getUserProfile
 * @description Retrieve cached user profile data
 */
export const getUserProfile = async (): Promise<
  ValuesMap['protapUserProfile'] | undefined
> => {
  return await getCookie('protapUserProfile')
}

/**
 * @name clearUserProfile
 * @description Clear cached user profile data (useful on sign out)
 */
export const clearUserProfile = async () => {
  await deleteCookie('protapUserProfile')
}

/**
 * @name downloadAndCacheImage
 * @description Download image from URL and cache as base64 data
 */
export const downloadAndCacheImage = async (
  imageUrl: string,
): Promise<string | null> => {
  try {
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`)
    }

    const blob = await response.blob()
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result as string
        resolve(base64)
      }
      reader.onerror = () => resolve(null)
      reader.readAsDataURL(blob)
    })
  } catch (error) {
    console.error('Error downloading image:', error)
    return null
  }
}
