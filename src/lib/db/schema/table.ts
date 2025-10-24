export type CardState =
  | 'pending'
  | 'activated'
  | 'expired'
  | 'suspended'
  | 'revoked'
export type SubscriptionState = 'pending' | 'active' | 'expired' | 'cancelled'
export type CardType = 'nfc' | 'qr' | 'virtual'
export type ScanSource = 'card_scan' | 'direct_link' | 'social_share' | 'search'

export interface User {
  id: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface UserProfile {
  id: string
  userId: string
  username: string
  displayName: string
  bio: string | null
  avatarUrl: string | null
  email: string | null
  phone: string | null
  website: string | null
  socialLinks: SocialLinks
  isPublic: boolean
  showAnalytics: boolean
  theme: ProfileTheme
  metaTitle: string | null
  metaDescription: string | null
  createdAt: Date
  updatedAt: Date
}

export interface SocialLinks {
  linkedin?: string
  twitter?: string
  instagram?: string
  github?: string
  [key: string]: string | undefined
}

export interface ProfileTheme {
  primaryColor: string
  backgroundColor: string
  fontFamily: string
  layoutStyle: 'minimal' | 'cards' | 'list'
}

export interface Card {
  id: string
  userId: string
  subscriptionId: string
  state: CardState
  activationToken: string | null
  activatedAt: Date | null
  nfcSerialNumber: string | null
  cardType: CardType
  issuedAt: Date
  expiresAt: Date
  revokedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface Subscription {
  id: string
  userId: string
  state: SubscriptionState
  planType: 'monthly' | 'annual' | 'lifetime'
  startDate: Date
  endDate: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface CardWithRelations extends Card {
  user: User & {
    profile: UserProfile | null
    subscription: Subscription
  }
}

export interface CardScan {
  id: string
  cardId: string
  scannedAt: Date
  ipAddress: string
  userAgent: string
  country: string | null
  city: string | null
  resolvedTo: 'activation' | 'profile' | 'error' | 'renewal'
  profileUsername: string | null
}

export interface ProfileView {
  id: string
  profileUserId: string
  viewedAt: Date
  source: ScanSource
  cardId: string | null
  ipAddress: string
  userAgent: string
  country: string | null
  city: string | null
  timeOnPage: number | null
  interactionCount: number
  interactionTypes: string[]
}
