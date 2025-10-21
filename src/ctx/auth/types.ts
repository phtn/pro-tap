import {ProtapUserDoc, UserBioData} from '@/lib/firebase/types/user'
import {User} from 'firebase/auth'
import {Timestamp} from 'firebase/firestore'

export type UserRole = 'admin' | 'manager' | 'user' | 'dev'
export type ProductType = 'INDIVIDUAL' | 'FLEET' | 'LIMITED-EDITION'

export interface UserProfile {
  uid: string
  email: string | null
  displayName: string | null
  role: UserRole
}

// Combined interface that includes Firebase User properties and all ProtapUserDoc properties
export interface AuthUser extends User {
  role: UserRole
  displayName: string | null
  // Include all ProtapUserDoc properties
  uid: string
  email: string | null
  photoURL: string | null
  providerIds: string[]
  createdAt:
    | import('firebase/firestore').FieldValue
    | import('firebase/firestore').Timestamp
  lastLogin:
    | import('firebase/firestore').FieldValue
    | import('firebase/firestore').Timestamp
  isActivated: boolean
  activatedOn: Timestamp | null
  ntag: {
    serialNumber: string
    scanTime: number | null
    metadata?: Record<string, string>
    type: string
  }
  userBioData: UserBioData
  userType: ProductType | null
  purchaseType: string | null
  loyaltyPoints: number
  isMerchant: boolean
  isAffiliate: boolean
  userInfo: import('@/schema/user-account').UserInfo | null
  subscriptionType?: ProductType | null
}

export interface UserData extends ProtapUserDoc {}
