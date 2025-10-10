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
  | 'nfcData'
  | 'qrcData'

type ValuesMap = {
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
  nfcData?: string
  qrcData?: string
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
  nfcData: 'nfc-data',
  qrcData: 'qrc-data',
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
