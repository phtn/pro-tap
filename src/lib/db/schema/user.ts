export interface IUser {
  id: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface IUserProfile {
  id: string
  userId: string

  // Identity
  username: string // UNIQUE, for /u/{username}
  displayName: string
  bio?: string
  avatarUrl?: string

  // Contact
  email?: string
  phone?: string
  website?: string

  // Social links
  socialLinks: {
    linkedin?: string
    twitter?: string
    instagram?: string
    github?: string
    [key: string]: string | undefined
  }

  // Settings
  isPublic: boolean // Show profile to everyone?
  showAnalytics: boolean // Show scan count on profile?
  theme: 'light' | 'dark' | 'auto'

  // SEO
  metaTitle?: string
  metaDescription?: string

  // Timestamps
  createdAt: Date
  updatedAt: Date
}

export type CardStatus =
  | 'pending'
  | 'activated'
  | 'expired'
  | 'suspended'
  | 'revoked'
export type CardType = 'nfc' | 'qr' | 'virtual'
export interface ICard {
  id: string // Short ID (e.g., "abc123")
  userId: string
  subscriptionId: string

  // State
  state: CardStatus
  activationToken: string | null
  activatedAt: Date | null

  // Physical details
  nfcSerialNumber?: string
  cardType: CardType

  // Metadata
  issuedAt: Date
  expiresAt: Date
  revokedAt?: Date

  // Relations
  user: IUser
  subscription: Subscription

  createdAt: Date
  updatedAt: Date
}

interface Subscription {
  id: string
  userId: string

  state: 'pending' | 'active' | 'expired' | 'cancelled'
  planType: 'monthly' | 'annual' | 'lifetime'

  startDate: Date
  endDate: Date | null // null for lifetime

  createdAt: Date
  updatedAt: Date
}

export interface CardScan {
  id: string
  cardId: string

  // Context
  scannedAt: Date
  ipAddress: string
  userAgent: string
  country?: string
  city?: string

  // Result
  resolvedTo: 'activation' | 'profile' | 'error' | 'renewal'
  profileUsername?: string // Track which profile was shown

  // Analytics
  scanDuration?: number // milliseconds on page
  interactionType?:
    | 'email_click'
    | 'phone_click'
    | 'social_click'
    | 'website_click'
}
export type SourceType = 'card_scan' | 'direct_link' | 'search' | 'social_share'
export interface IProfileView {
  id: string
  profileUserId: string

  viewedAt: Date
  source: SourceType
  cardId?: string // If from card scan

  ipAddress: string
  userAgent: string
  country?: string
  city?: string

  // Engagement
  timeOnPage?: number
  interactionCount: number
  interactionTypes: string[] // ['email_click', 'linkedin_click']
}
