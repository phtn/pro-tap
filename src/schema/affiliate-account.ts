// Enums for Affiliate System
enum AffiliateStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  BANNED = 'BANNED',
  INACTIVE = 'INACTIVE',
}

enum CommissionType {
  PERCENTAGE = 'PERCENTAGE',
  FLAT_RATE = 'FLAT_RATE',
  TIERED = 'TIERED',
  RECURRING = 'RECURRING',
  HYBRID = 'HYBRID',
}

enum PaymentMethod {
  BANK_TRANSFER = 'BANK_TRANSFER',
  PAYPAL = 'PAYPAL',
  STRIPE = 'STRIPE',
  WIRE_TRANSFER = 'WIRE_TRANSFER',
  CHECK = 'CHECK',
  CRYPTO = 'CRYPTO',
}

enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  ON_HOLD = 'ON_HOLD',
}

enum ClickStatus {
  VALID = 'VALID',
  INVALID = 'INVALID',
  FRAUDULENT = 'FRAUDULENT',
  DUPLICATE = 'DUPLICATE',
}

enum ConversionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  REVERSED = 'REVERSED',
}

enum TrafficSource {
  ORGANIC = 'ORGANIC',
  PAID = 'PAID',
  SOCIAL = 'SOCIAL',
  EMAIL = 'EMAIL',
  REFERRAL = 'REFERRAL',
  DIRECT = 'DIRECT',
  OTHER = 'OTHER',
}

enum ContentType {
  BLOG_POST = 'BLOG_POST',
  VIDEO = 'VIDEO',
  SOCIAL_POST = 'SOCIAL_POST',
  EMAIL = 'EMAIL',
  BANNER = 'BANNER',
  REVIEW = 'REVIEW',
  COMPARISON = 'COMPARISON',
  TUTORIAL = 'TUTORIAL',
}

enum PromotionMethod {
  WEBSITE = 'WEBSITE',
  BLOG = 'BLOG',
  YOUTUBE = 'YOUTUBE',
  INSTAGRAM = 'INSTAGRAM',
  TIKTOK = 'TIKTOK',
  TWITTER = 'TWITTER',
  FACEBOOK = 'FACEBOOK',
  EMAIL_LIST = 'EMAIL_LIST',
  PODCAST = 'PODCAST',
  PAID_ADS = 'PAID_ADS',
}

enum TierLevel {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
  DIAMOND = 'DIAMOND',
}

// Base interfaces
interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

interface Address {
  street: string
  city: string
  state: string
  country: string
  postalCode: string
}

// Affiliate Profile
interface AffiliateProfile {
  businessName?: string
  website?: string
  bio: string
  niche: string[]
  promotionMethods: PromotionMethod[]
  primaryTrafficSource: TrafficSource
  monthlyTraffic?: number
  socialMediaHandles: {
    platform: string
    handle: string
    followerCount?: number
  }[]
  experienceLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
  languages: string[]
  targetAudience: string
  contentStrategy?: string
}

// Payment Information
interface PaymentInfo {
  preferredMethod: PaymentMethod
  minimumPayout: number
  currency: string
  bankAccount?: {
    accountHolderName: string
    accountNumber: string
    routingNumber: string
    bankName: string
    swiftCode?: string
    iban?: string
  }
  paypalEmail?: string
  stripeAccountId?: string
  cryptoWalletAddress?: {
    currency: string
    address: string
  }[]
  taxInfo: {
    taxId?: string
    taxIdType?: 'SSN' | 'EIN' | 'VAT' | 'OTHER'
    w9Submitted?: boolean
    w8Submitted?: boolean
    taxCountry: string
  }
}

// Commission Structure
interface CommissionTier {
  tierLevel: TierLevel
  minSales: number
  maxSales?: number
  rate: number
  bonusPercentage?: number
}

interface CommissionRule extends BaseEntity {
  merchantId: string
  productId?: string
  categoryId?: string
  type: CommissionType
  baseRate: number
  tiers?: CommissionTier[]
  cookieDuration: number
  isRecurring: boolean
  recurringMonths?: number
  effectiveFrom: Date
  effectiveTo?: Date
}

// Affiliate Links
interface AffiliateLink extends BaseEntity {
  affiliateId: string
  merchantId: string
  productId?: string
  originalUrl: string
  shortCode: string
  fullUrl: string
  customAlias?: string
  campaign?: string
  medium?: string
  source?: string
  utmParameters: {
    [key: string]: string
  }
  clickCount: number
  conversionCount: number
  revenue: number
  isActive: boolean
  expiresAt?: Date
  notes?: string
}

// Tracking and Analytics
interface Click extends BaseEntity {
  affiliateLinkId: string
  affiliateId: string
  merchantId: string
  ipAddress: string
  userAgent: string
  referer?: string
  country?: string
  city?: string
  device: 'DESKTOP' | 'MOBILE' | 'TABLET'
  browser: string
  os: string
  status: ClickStatus
  sessionId: string
  landingPage: string
}

interface Conversion extends BaseEntity {
  affiliateId: string
  merchantId: string
  affiliateLinkId: string
  clickId: string
  orderId: string
  customerId?: string
  orderValue: number
  commissionAmount: number
  commissionRate: number
  currency: string
  productIds: string[]
  status: ConversionStatus
  approvedAt?: Date
  rejectedAt?: Date
  rejectionReason?: string
  reversedAt?: Date
  reversalReason?: string
  paidAt?: Date
  paymentId?: string
}

// Payments and Earnings
interface Payment extends BaseEntity {
  affiliateId: string
  amount: number
  currency: string
  method: PaymentMethod
  status: PaymentStatus
  conversionIds: string[]
  referenceNumber?: string
  transactionId?: string
  processingFee: number
  netAmount: number
  scheduledDate: Date
  processedDate?: Date
  failureReason?: string
  notes?: string
}

interface EarningsBalance {
  totalEarnings: number
  pendingEarnings: number
  approvedEarnings: number
  paidEarnings: number
  currency: string
  lastUpdated: Date
}

interface EarningsSummary {
  period: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | 'ALL_TIME'
  startDate: Date
  endDate: Date
  clicks: number
  conversions: number
  revenue: number
  commission: number
  conversionRate: number
  averageOrderValue: number
  epc: number // Earnings per click
}

// Marketing Materials
interface MarketingMaterial extends BaseEntity {
  merchantId: string
  title: string
  description: string
  type:
    | 'BANNER'
    | 'TEXT_LINK'
    | 'PRODUCT_FEED'
    | 'EMAIL_TEMPLATE'
    | 'VIDEO'
    | 'LANDING_PAGE'
  fileUrl?: string
  thumbnailUrl?: string
  dimensions?: {
    width: number
    height: number
  }
  htmlCode?: string
  previewUrl?: string
  categories: string[]
  tags: string[]
  language: string
  downloadCount: number
  isActive: boolean
}

// Content and Campaigns
interface AffiliateCampaign extends BaseEntity {
  affiliateId: string
  merchantId?: string
  name: string
  description?: string
  startDate: Date
  endDate?: Date
  budget?: number
  targetRevenue?: number
  contentType: ContentType
  platforms: PromotionMethod[]
  affiliateLinks: string[]
  status: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED'
  performance: {
    clicks: number
    conversions: number
    revenue: number
    commission: number
    roi?: number
  }
  notes?: string
}

interface ContentPiece extends BaseEntity {
  affiliateId: string
  campaignId?: string
  title: string
  type: ContentType
  url: string
  publishedDate: Date
  platform: PromotionMethod
  affiliateLinks: string[]
  views?: number
  engagement?: number
  clicks: number
  conversions: number
  revenue: number
  notes?: string
}

// Merchant Relationships
interface MerchantPartnership extends BaseEntity {
  affiliateId: string
  merchantId: string
  status:
    | 'APPLIED'
    | 'APPROVED'
    | 'REJECTED'
    | 'ACTIVE'
    | 'PAUSED'
    | 'TERMINATED'
  applicationDate: Date
  approvalDate?: Date
  rejectionReason?: string
  commissionRules: CommissionRule[]
  customTerms?: string
  contractSignedDate?: Date
  terminationDate?: Date
  performanceRequirements?: {
    minMonthlySales?: number
    minConversionRate?: number
    qualityScore?: number
  }
  notes?: string
}

// Performance Metrics
interface PerformanceMetrics extends BaseEntity {
  affiliateId: string
  merchantId?: string
  period: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY'
  date: Date
  clicks: number
  uniqueClicks: number
  conversions: number
  revenue: number
  commission: number
  conversionRate: number
  epc: number
  averageOrderValue: number
  refundRate: number
  qualityScore: number
}

// Compliance and Fraud
interface ComplianceRecord extends BaseEntity {
  affiliateId: string
  type: 'WARNING' | 'VIOLATION' | 'REVIEW' | 'CLEARED'
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  description: string
  evidenceUrls: string[]
  reportedBy?: string
  reviewedBy?: string
  reviewedAt?: Date
  resolution?: string
  penaltyApplied?: string
  status: 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED' | 'ESCALATED'
}

interface FraudAlert extends BaseEntity {
  affiliateId: string
  type:
    | 'CLICK_FRAUD'
    | 'COOKIE_STUFFING'
    | 'FAKE_LEADS'
    | 'TRADEMARK_BIDDING'
    | 'INCENTIVIZED_TRAFFIC'
    | 'OTHER'
  description: string
  detectedAt: Date
  affectedConversions: string[]
  estimatedLoss: number
  status: 'INVESTIGATING' | 'CONFIRMED' | 'FALSE_POSITIVE' | 'RESOLVED'
  actionTaken?: string
}

// Notifications and Communication
interface AffiliateNotification extends BaseEntity {
  affiliateId: string
  type:
    | 'CONVERSION'
    | 'PAYMENT'
    | 'APPROVAL'
    | 'REJECTION'
    | 'NEW_MATERIAL'
    | 'PROMOTION'
    | 'ALERT'
    | 'MESSAGE'
  title: string
  message: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  isRead: boolean
  actionUrl?: string
  metadata?: {
    [key: string]: string | number | boolean
  }
}

interface SupportTicket extends BaseEntity {
  affiliateId: string
  subject: string
  description: string
  category: 'TECHNICAL' | 'PAYMENT' | 'COMMISSION' | 'ACCOUNT' | 'GENERAL'
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  status: 'OPEN' | 'IN_PROGRESS' | 'WAITING_RESPONSE' | 'RESOLVED' | 'CLOSED'
  assignedTo?: string
  messages: {
    senderId: string
    message: string
    attachments?: string[]
    timestamp: Date
  }[]
  resolvedAt?: Date
}

// Goals and Achievements
interface AffiliateGoal extends BaseEntity {
  affiliateId: string
  title: string
  description?: string
  targetType: 'REVENUE' | 'CONVERSIONS' | 'CLICKS' | 'NEW_MERCHANTS'
  targetValue: number
  currentValue: number
  startDate: Date
  endDate: Date
  isCompleted: boolean
  completedAt?: Date
  reward?: string
}

interface Achievement extends BaseEntity {
  affiliateId: string
  title: string
  description: string
  iconUrl: string
  unlockedAt: Date
  category: 'SALES' | 'PERFORMANCE' | 'GROWTH' | 'MILESTONE' | 'QUALITY'
}

// Main Affiliate Account Schema
export interface AffiliateAccount extends BaseEntity {
  // Basic Information
  userId: string
  username: string
  email: string
  status: AffiliateStatus

  // Profile
  profile: AffiliateProfile
  personalInfo: {
    firstName: string
    lastName: string
    phone?: string
    address: Address
    dateOfBirth?: Date
  }

  // Payment
  paymentInfo: PaymentInfo
  earningsBalance: EarningsBalance
  payments: Payment[]

  // Affiliate Links and Tracking
  affiliateLinks: AffiliateLink[]
  defaultCommissionRate: number
  referralCode: string

  // Relationships
  merchantPartnerships: MerchantPartnership[]

  // Conversions and Performance
  clicks: Click[]
  conversions: Conversion[]
  performanceMetrics: PerformanceMetrics[]
  earningsSummaries: EarningsSummary[]

  // Marketing
  marketingMaterials: MarketingMaterial[]
  campaigns: AffiliateCampaign[]
  contentPieces: ContentPiece[]

  // Compliance
  complianceRecords: ComplianceRecord[]
  fraudAlerts: FraudAlert[]
  termsAcceptedDate?: Date
  termsVersion: string

  // Communication
  notifications: AffiliateNotification[]
  supportTickets: SupportTicket[]

  // Gamification
  currentTier: TierLevel
  reputationScore: number
  goals: AffiliateGoal[]
  achievements: Achievement[]

  // Statistics
  totalClicks: number
  totalConversions: number
  totalRevenue: number
  totalCommission: number
  lifetimeConversionRate: number
  lifetimeEpc: number

  // Settings
  settings: {
    emailNotifications: boolean
    smsNotifications: boolean
    weeklyReports: boolean
    monthlyReports: boolean
    conversionAlerts: boolean
    paymentAlerts: boolean
    autoApproveConversions: boolean
    publicProfile: boolean
  }

  // Metadata
  approvedAt?: Date
  approvedBy?: string
  suspendedAt?: Date
  suspensionReason?: string
  lastLoginAt: Date
  referredBy?: string
}
