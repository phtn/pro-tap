import { ProductType, UserRole } from '@/ctx/auth/types'
import { UserInfo } from '@/schema/user-account'
import { FieldValue, Timestamp } from 'firebase/firestore'
export type Gender = 'male' | 'female'

export interface UserBioData {
  firstName: string | null
  middleName: string | null
  lastName: string | null
  gender: Gender | null
}

export interface ProfileFormData {
  username: string | null
  displayName: string | null
  bio: string | null
  avatar: string | null | File
  socialLinks?: {
    twitter?: string
    github?: string
    linkedin?: string
    website?: string
  }
  theme: 'light' | 'dark' | 'auto'
  isPublished: boolean
}

interface NTag {
  serialNumber: string
  scanTime: number | null
  metadata?: Record<string, string>
  type: string
}

interface DeactivationReason {
  reason: string
  timestamp: number
  type: 'MANUAL' | 'AUTO'
}

export type ServerTime = FieldValue | Timestamp

export interface UserProfile {
  username: string | null
  displayName: string | null
  bio: string | null
  avatar: string | null | File
  socialLinks?: {
    twitter?: string
    github?: string
    linkedin?: string
    website?: string
  }
  theme: 'light' | 'dark' | 'auto'
  isPublished: boolean
  createdAt?: ServerTime
  updatedAt?: ServerTime
}

export interface ProtapUserDoc {
  uid: string
  email: string | null
  displayName: string | null
  username: string | null
  firstName: string | null
  middleName: string | null
  lastName: string | null
  gender: Gender | null
  avatar: string | null
  theme: 'light' | 'dark' | 'auto'
  photoURL: string | null
  providerIds: string[]
  bio: string | null
  createdAt: ServerTime
  updatedAt: ServerTime
  lastLogin: ServerTime
  isActivated: boolean
  activatedOn: ServerTime | null
  ntag: NTag | null
  userBioData: UserBioData | null
  userType: ProductType | null
  subscriptionType?: ProductType | null
  purchaseType: string
  loyaltyPoints: number
  isMerchant: boolean
  isAffiliate: boolean
  userInfo: UserInfo | null
  role: UserRole
  deactivationReason: DeactivationReason | null
  isPublished: boolean
}
