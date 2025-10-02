// Enums for Merchant System
enum MerchantStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  BANNED = 'BANNED',
  INACTIVE = 'INACTIVE',
  UNDER_REVIEW = 'UNDER_REVIEW',
}

enum BusinessType {
  SOLE_PROPRIETOR = 'SOLE_PROPRIETOR',
  PARTNERSHIP = 'PARTNERSHIP',
  LLC = 'LLC',
  CORPORATION = 'CORPORATION',
  NON_PROFIT = 'NON_PROFIT',
  OTHER = 'OTHER',
}

enum IndustryCategory {
  FASHION = 'FASHION',
  ELECTRONICS = 'ELECTRONICS',
  HOME_GARDEN = 'HOME_GARDEN',
  HEALTH_BEAUTY = 'HEALTH_BEAUTY',
  SPORTS_OUTDOORS = 'SPORTS_OUTDOORS',
  BOOKS_MEDIA = 'BOOKS_MEDIA',
  FOOD_BEVERAGE = 'FOOD_BEVERAGE',
  TOYS_GAMES = 'TOYS_GAMES',
  AUTOMOTIVE = 'AUTOMOTIVE',
  BUSINESS_SERVICES = 'BUSINESS_SERVICES',
  SOFTWARE_SAAS = 'SOFTWARE_SAAS',
  EDUCATION = 'EDUCATION',
  TRAVEL = 'TRAVEL',
  FINANCE = 'FINANCE',
  OTHER = 'OTHER',
}

enum ProgramVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  INVITE_ONLY = 'INVITE_ONLY',
}

enum ApprovalMethod {
  AUTO_APPROVE = 'AUTO_APPROVE',
  MANUAL_REVIEW = 'MANUAL_REVIEW',
  CONDITIONAL = 'CONDITIONAL',
}

enum CommissionModel {
  CPA = 'CPA', // Cost per acquisition
  CPS = 'CPS', // Cost per sale
  CPL = 'CPL', // Cost per lead
  CPC = 'CPC', // Cost per click
  HYBRID = 'HYBRID',
  REVENUE_SHARE = 'REVENUE_SHARE',
}

enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  DISCONTINUED = 'DISCONTINUED',
  DRAFT = 'DRAFT',
}

enum PromotionType {
  PERCENTAGE_DISCOUNT = 'PERCENTAGE_DISCOUNT',
  FIXED_DISCOUNT = 'FIXED_DISCOUNT',
  FREE_SHIPPING = 'FREE_SHIPPING',
  BOGO = 'BOGO',
  BUNDLE = 'BUNDLE',
  FLASH_SALE = 'FLASH_SALE',
  SEASONAL = 'SEASONAL',
  CUSTOM = 'CUSTOM',
}

enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
  RETURNED = 'RETURNED',
}

enum SubscriptionPlan {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PROFESSIONAL = 'PROFESSIONAL',
  ENTERPRISE = 'ENTERPRISE',
  CUSTOM = 'CUSTOM',
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

interface ContactPerson {
  name: string
  title: string
  email: string
  phone: string
  isPrimary: boolean
}

// Business Information
interface BusinessInfo {
  legalName: string
  tradeName: string
  businessType: BusinessType
  industry: IndustryCategory
  registrationNumber?: string
  taxId: string
  vatNumber?: string
  dateEstablished: Date
  description: string
  website: string
  email: string
  phone: string
  address: Address
  billingAddress?: Address
  shippingAddress?: Address
  logoUrl?: string
  brandColors?: {
    primary: string
    secondary: string
    accent: string
  }
  socialMedia: {
    platform: string
    url: string
    followerCount?: number
  }[]
}

// Affiliate Program Configuration
interface AffiliateProgramConfig extends BaseEntity {
  merchantId: string
  programName: string
  description: string
  visibility: ProgramVisibility
  approvalMethod: ApprovalMethod
  autoApproveThreshold?: {
    minTraffic?: number
    minFollowers?: number
    minQualityScore?: number
  }
  commissionModel: CommissionModel
  defaultCommissionRate: number
  cookieDuration: number // in days
  termsAndConditions: string
  prohibitedPromotionMethods: string[]
  allowedRegions: string[]
  restrictedRegions: string[]
  paymentTerms: {
    minimumPayout: number
    paymentFrequency: 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY' | 'QUARTERLY'
    paymentDay: number
    holdingPeriod: number // days before commission is paid
  }
  isActive: boolean
  launchDate?: Date
  closeDate?: Date
}

// Commission Structures
interface CommissionTier {
  name: string
  minSales: number
  maxSales?: number
  commissionRate: number
  bonus?: number
}

interface ProductCommission extends BaseEntity {
  merchantId: string
  productId?: string
  categoryId?: string
  commissionType: 'PERCENTAGE' | 'FLAT'
  value: number
  tiers?: CommissionTier[]
  isRecurring: boolean
  recurringDuration?: number // months
  effectiveFrom: Date
  effectiveTo?: Date
  priority: number
}

interface SpecialCommission extends BaseEntity {
  merchantId: string
  affiliateId: string
  name: string
  description?: string
  commissionType: 'PERCENTAGE' | 'FLAT'
  value: number
  applicableProducts?: string[]
  applicableCategories?: string[]
  startDate: Date
  endDate?: Date
  isActive: boolean
}

// Products and Catalog
interface Product extends BaseEntity {
  merchantId: string
  sku: string
  name: string
  description: string
  shortDescription?: string
  category: string
  subCategory?: string
  brand?: string
  price: number
  salePrice?: number
  currency: string
  images: {
    url: string
    alt: string
    isPrimary: boolean
  }[]
  status: ProductStatus
  stockQuantity: number
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
    unit: string
  }
  attributes: {
    [key: string]: string | number | boolean
  }
  tags: string[]
  affiliateLink?: string
  commissionRate?: number
  isPromoted: boolean
}

interface ProductCategory extends BaseEntity {
  merchantId: string
  name: string
  slug: string
  description?: string
  parentCategoryId?: string
  imageUrl?: string
  commissionRate?: number
  isActive: boolean
}

// Promotions and Offers
interface Promotion extends BaseEntity {
  merchantId: string
  name: string
  description: string
  type: PromotionType
  code?: string
  discountValue: number
  discountType: 'PERCENTAGE' | 'FIXED'
  minimumPurchase?: number
  maximumDiscount?: number
  applicableProducts?: string[]
  applicableCategories?: string[]
  startDate: Date
  endDate: Date
  usageLimit?: number
  usageCount: number
  perAffiliateLimit?: number
  isExclusiveForAffiliates: boolean
  exclusiveAffiliateIds?: string[]
  commissionBonus?: number
  status: 'DRAFT' | 'ACTIVE' | 'EXPIRED' | 'PAUSED'
}

// Affiliate Management
interface AffiliateApplication extends BaseEntity {
  merchantId: string
  affiliateId: string
  applicationData: {
    website?: string
    trafficSources: string[]
    monthlyTraffic?: number
    promotionMethods: string[]
    experience: string
    whyJoin: string
  }
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  reviewedBy?: string
  reviewedAt?: Date
  reviewNotes?: string
  rejectionReason?: string
}

interface AffiliateRelationship extends BaseEntity {
  merchantId: string
  affiliateId: string
  status: 'ACTIVE' | 'PAUSED' | 'TERMINATED'
  approvedDate: Date
  customCommissionRate?: number
  performanceRating: number
  totalSales: number
  totalCommissionPaid: number
  fraudScore: number
  notes?: string
  managerId?: string
  terminationDate?: Date
  terminationReason?: string
}

// Tracking and Analytics
interface TrackingPixel extends BaseEntity {
  merchantId: string
  name: string
  pixelCode: string
  placementLocation: 'ORDER_CONFIRMATION' | 'PRODUCT_PAGE' | 'CART' | 'CUSTOM'
  customLocation?: string
  isActive: boolean
  fireCount: number
}

interface ConversionTracking extends BaseEntity {
  merchantId: string
  affiliateId: string
  orderId: string
  customerId?: string
  products: {
    productId: string
    quantity: number
    price: number
    commission: number
  }[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  totalCommission: number
  currency: string
  orderStatus: OrderStatus
  clickId: string
  conversionDate: Date
  ipAddress: string
  userAgent: string
  isValidated: boolean
  validatedAt?: Date
  isReversed: boolean
  reversalReason?: string
  reversalDate?: Date
}

interface SalesReport extends BaseEntity {
  merchantId: string
  affiliateId?: string
  period: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY' | 'CUSTOM'
  startDate: Date
  endDate: Date
  totalOrders: number
  totalRevenue: number
  totalCommission: number
  uniqueClicks: number
  conversions: number
  conversionRate: number
  averageOrderValue: number
  refunds: number
  refundRate: number
  topProducts: {
    productId: string
    name: string
    sales: number
    revenue: number
  }[]
  topAffiliates?: {
    affiliateId: string
    name: string
    sales: number
    revenue: number
    commission: number
  }[]
}

// Payment Management
interface PayoutSchedule extends BaseEntity {
  merchantId: string
  name: string
  frequency: 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY'
  dayOfPayment: number
  minimumThreshold: number
  currency: string
  paymentMethod: string
  isActive: boolean
  nextPayoutDate: Date
}

interface PayoutBatch extends BaseEntity {
  merchantId: string
  scheduleId: string
  batchNumber: string
  totalAmount: number
  totalAffiliates: number
  currency: string
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  scheduledDate: Date
  processedDate?: Date
  completedDate?: Date
  payouts: {
    affiliateId: string
    amount: number
    conversionIds: string[]
    status: string
    transactionId?: string
  }[]
  failureReason?: string
}

// Marketing Materials
interface CreativeAsset extends BaseEntity {
  merchantId: string
  name: string
  description?: string
  type:
    | 'BANNER'
    | 'TEXT_AD'
    | 'VIDEO'
    | 'PRODUCT_FEED'
    | 'EMAIL_TEMPLATE'
    | 'LANDING_PAGE'
    | 'SOCIAL_POST'
  fileUrl?: string
  thumbnailUrl?: string
  htmlCode?: string
  dimensions?: {
    width: number
    height: number
  }
  fileSize?: number
  categories: string[]
  tags: string[]
  language: string
  impressions: number
  clicks: number
  conversions: number
  isActive: boolean
  approvalRequired: boolean
}

interface LandingPage extends BaseEntity {
  merchantId: string
  name: string
  url: string
  description?: string
  thumbnailUrl?: string
  targetProducts?: string[]
  targetCategories?: string[]
  conversionRate?: number
  isActive: boolean
}

// Communication
interface Newsletter extends BaseEntity {
  merchantId: string
  subject: string
  content: string
  htmlContent: string
  targetAudience:
    | 'ALL_AFFILIATES'
    | 'TOP_PERFORMERS'
    | 'NEW_AFFILIATES'
    | 'INACTIVE'
    | 'CUSTOM'
  customAffiliateIds?: string[]
  scheduledDate?: Date
  sentDate?: Date
  openRate?: number
  clickRate?: number
  status: 'DRAFT' | 'SCHEDULED' | 'SENT' | 'CANCELLED'
}

interface Announcement extends BaseEntity {
  merchantId: string
  title: string
  message: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  category:
    | 'GENERAL'
    | 'PRODUCT_UPDATE'
    | 'PROMOTION'
    | 'POLICY_CHANGE'
    | 'TECHNICAL'
  targetAffiliates?: string[]
  publishDate: Date
  expiryDate?: Date
  isActive: boolean
  viewCount: number
}

interface AffiliateMessage extends BaseEntity {
  merchantId: string
  affiliateId: string
  subject: string
  message: string
  isRead: boolean
  readAt?: Date
  replies: {
    senderId: string
    senderType: 'MERCHANT' | 'AFFILIATE'
    message: string
    timestamp: Date
    attachments?: string[]
  }[]
  attachments?: string[]
}

// Performance and Incentives
interface PerformanceTier extends BaseEntity {
  merchantId: string
  name: string
  description: string
  requirements: {
    minMonthlySales?: number
    minRevenue?: number
    minConversionRate?: number
    minQualityScore?: number
  }
  benefits: {
    commissionBonus: number
    prioritySupport: boolean
    exclusiveOffers: boolean
    customMaterials: boolean
    earlyProductAccess: boolean
    higherPayoutFrequency: boolean
  }
  color: string
  iconUrl?: string
  order: number
  isActive: boolean
}

interface Bonus extends BaseEntity {
  merchantId: string
  name: string
  description: string
  type: 'MILESTONE' | 'PERFORMANCE' | 'SEASONAL' | 'SPECIAL_EVENT'
  criteria: {
    targetType: 'SALES' | 'REVENUE' | 'NEW_CUSTOMERS' | 'PRODUCT_CATEGORY'
    targetValue: number
    timeframe?: {
      startDate: Date
      endDate: Date
    }
  }
  reward: {
    type: 'CASH' | 'PERCENTAGE_BOOST' | 'GIFT_CARD' | 'PRODUCT' | 'OTHER'
    value: number
    description?: string
  }
  applicableAffiliates?: string[]
  status: 'ACTIVE' | 'EXPIRED' | 'COMPLETED'
  claimedBy: {
    affiliateId: string
    claimedDate: Date
    amount: number
  }[]
}

interface Contest extends BaseEntity {
  merchantId: string
  title: string
  description: string
  rules: string
  startDate: Date
  endDate: Date
  prizes: {
    rank: number
    prize: string
    value: number
    winnerId?: string
  }[]
  metric: 'SALES' | 'REVENUE' | 'CONVERSIONS' | 'NEW_CUSTOMERS'
  leaderboard: {
    affiliateId: string
    score: number
    rank: number
  }[]
  status: 'UPCOMING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED'
  participantCount: number
}

// Compliance and Rules
interface ComplianceRule extends BaseEntity {
  merchantId: string
  title: string
  description: string
  ruleType:
    | 'PROHIBITED_KEYWORD'
    | 'TRADEMARK_USAGE'
    | 'BIDDING_RESTRICTION'
    | 'CONTENT_GUIDELINE'
    | 'DISCLOSURE_REQUIREMENT'
    | 'OTHER'
  severity: 'INFO' | 'WARNING' | 'VIOLATION'
  autoEnforce: boolean
  penaltyAction?:
    | 'WARNING'
    | 'COMMISSION_REDUCTION'
    | 'SUSPENSION'
    | 'TERMINATION'
  isActive: boolean
}

interface ViolationReport extends BaseEntity {
  merchantId: string
  affiliateId: string
  ruleId?: string
  violationType: string
  description: string
  evidenceUrls: string[]
  reportedBy: string
  reportedDate: Date
  status: 'PENDING' | 'INVESTIGATING' | 'CONFIRMED' | 'DISMISSED' | 'RESOLVED'
  reviewedBy?: string
  reviewedAt?: Date
  actionTaken?: string
  resolutionNotes?: string
}

// API and Integration
interface ApiCredentials extends BaseEntity {
  merchantId: string
  name: string
  apiKey: string
  apiSecret: string
  environment: 'PRODUCTION' | 'SANDBOX'
  permissions: string[]
  ipWhitelist?: string[]
  webhookUrl?: string
  webhookSecret?: string
  isActive: boolean
  lastUsedAt?: Date
  expiresAt?: Date
}

interface WebhookEvent extends BaseEntity {
  merchantId: string
  eventType:
    | 'CONVERSION'
    | 'PAYMENT'
    | 'AFFILIATE_SIGNUP'
    | 'APPLICATION'
    | 'ORDER_UPDATE'
    | 'REFUND'
  payload: {
    [key: string]: string | number | boolean | object
  }
  webhookUrl: string
  attemptCount: number
  lastAttemptAt?: Date
  status: 'PENDING' | 'DELIVERED' | 'FAILED'
  responseCode?: number
  errorMessage?: string
}

interface Integration extends BaseEntity {
  merchantId: string
  platform:
    | 'SHOPIFY'
    | 'WOOCOMMERCE'
    | 'MAGENTO'
    | 'BIGCOMMERCE'
    | 'CUSTOM'
    | 'OTHER'
  name: string
  configuration: {
    [key: string]: string | number | boolean
  }
  status: 'CONNECTED' | 'DISCONNECTED' | 'ERROR'
  lastSyncAt?: Date
  errorLog?: {
    timestamp: Date
    error: string
  }[]
}

// Financial Records
interface Invoice extends BaseEntity {
  merchantId: string
  invoiceNumber: string
  billingPeriod: {
    startDate: Date
    endDate: Date
  }
  subscriptionPlan: SubscriptionPlan
  baseAmount: number
  transactionFees: number
  additionalCharges: {
    description: string
    amount: number
  }[]
  discounts: {
    description: string
    amount: number
  }[]
  taxAmount: number
  totalAmount: number
  currency: string
  dueDate: Date
  paidDate?: Date
  status: 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED'
  paymentMethod?: string
  invoiceUrl?: string
}

interface Transaction extends BaseEntity {
  merchantId: string
  type:
    | 'COMMISSION_PAYOUT'
    | 'SUBSCRIPTION_FEE'
    | 'TRANSACTION_FEE'
    | 'BONUS'
    | 'REFUND'
    | 'ADJUSTMENT'
  amount: number
  currency: string
  description: string
  referenceId?: string
  affiliateId?: string
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REVERSED'
  transactionDate: Date
  settlementDate?: Date
  paymentMethod?: string
  metadata?: {
    [key: string]: string | number | boolean
  }
}

// Reviews and Ratings
interface ProgramReview extends BaseEntity {
  merchantId: string
  affiliateId: string
  rating: number
  title?: string
  review: string
  pros?: string[]
  cons?: string[]
  wouldRecommend: boolean
  isVerified: boolean
  isPublic: boolean
  merchantResponse?: {
    message: string
    respondedAt: Date
    respondedBy: string
  }
  helpfulCount: number
  unhelpfulCount: number
}

// Support and Documentation
interface KnowledgeBaseArticle extends BaseEntity {
  merchantId: string
  title: string
  content: string
  category:
    | 'GETTING_STARTED'
    | 'TRACKING'
    | 'PAYMENTS'
    | 'MARKETING'
    | 'TECHNICAL'
    | 'POLICIES'
    | 'FAQ'
  tags: string[]
  attachments?: string[]
  viewCount: number
  helpfulCount: number
  isPublished: boolean
  publishedDate?: Date
}

interface SupportTicketFromAffiliate extends BaseEntity {
  merchantId: string
  affiliateId: string
  ticketNumber: string
  subject: string
  description: string
  category: 'TECHNICAL' | 'PAYMENT' | 'TRACKING' | 'ACCOUNT' | 'GENERAL'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  status: 'OPEN' | 'IN_PROGRESS' | 'WAITING_AFFILIATE' | 'RESOLVED' | 'CLOSED'
  assignedTo?: string
  conversation: {
    senderId: string
    senderType: 'AFFILIATE' | 'MERCHANT'
    message: string
    attachments?: string[]
    timestamp: Date
  }[]
  resolvedAt?: Date
  satisfaction?: {
    rating: number
    feedback?: string
  }
}

// Settings and Preferences
interface MerchantSettings {
  general: {
    timezone: string
    currency: string
    language: string
    businessHours?: {
      [key: string]: {
        open: string
        close: string
      }
    }
  }
  notifications: {
    emailOnNewApplication: boolean
    emailOnConversion: boolean
    emailOnRefund: boolean
    emailOnHighFraud: boolean
    weeklyPerformanceReport: boolean
    monthlyFinancialReport: boolean
  }
  automation: {
    autoApproveApplications: boolean
    autoApproveConversions: boolean
    autoPayout: boolean
    autoSendWelcomeEmail: boolean
    autoSendPerformanceReports: boolean
  }
  branding: {
    primaryColor: string
    secondaryColor: string
    logoUrl: string
    faviconUrl?: string
    customDomain?: string
    emailTemplate?: string
  }
  security: {
    twoFactorEnabled: boolean
    ipWhitelist?: string[]
    sessionTimeout: number
    requireStrongPasswords: boolean
  }
}

// Team Management
interface TeamMember extends BaseEntity {
  merchantId: string
  userId: string
  name: string
  email: string
  role: 'OWNER' | 'ADMIN' | 'MANAGER' | 'SUPPORT' | 'ANALYST' | 'DEVELOPER'
  permissions: string[]
  isActive: boolean
  lastLoginAt?: Date
  invitedBy: string
  invitedAt: Date
  joinedAt?: Date
}

// Main Merchant Account Schema
export interface MerchantAccount extends BaseEntity {
  // Basic Information
  userId: string
  status: MerchantStatus

  // Business Details
  businessInfo: BusinessInfo
  contactPersons: ContactPerson[]

  // Affiliate Program
  affiliateProgram: AffiliateProgramConfig

  // Commission Configuration
  productCommissions: ProductCommission[]
  specialCommissions: SpecialCommission[]
  performanceTiers: PerformanceTier[]

  // Products and Catalog
  products: Product[]
  categories: ProductCategory[]

  // Promotions
  promotions: Promotion[]
  bonuses: Bonus[]
  contests: Contest[]

  // Affiliate Management
  affiliateApplications: AffiliateApplication[]
  affiliateRelationships: AffiliateRelationship[]
  activeAffiliateCount: number
  totalAffiliatesAllTime: number

  // Tracking and Analytics
  trackingPixels: TrackingPixel[]
  conversions: ConversionTracking[]
  salesReports: SalesReport[]

  // Payment Management
  payoutSchedules: PayoutSchedule[]
  payoutBatches: PayoutBatch[]
  totalCommissionPaid: number
  pendingCommission: number

  // Marketing Materials
  creativeAssets: CreativeAsset[]
  landingPages: LandingPage[]

  // Communication
  newsletters: Newsletter[]
  announcements: Announcement[]
  affiliateMessages: AffiliateMessage[]

  // Compliance
  complianceRules: ComplianceRule[]
  violationReports: ViolationReport[]

  // Integration
  apiCredentials: ApiCredentials[]
  webhookEvents: WebhookEvent[]
  integrations: Integration[]

  // Financial
  invoices: Invoice[]
  transactions: Transaction[]
  subscriptionPlan: SubscriptionPlan
  subscriptionStartDate: Date
  subscriptionEndDate?: Date
  billingCycle: 'MONTHLY' | 'QUARTERLY' | 'YEARLY'

  // Reviews and Reputation
  programReviews: ProgramReview[]
  averageRating: number
  totalReviews: number

  // Support
  knowledgeBaseArticles: KnowledgeBaseArticle[]
  supportTickets: SupportTicketFromAffiliate[]

  // Team
  teamMembers: TeamMember[]

  // Settings
  settings: MerchantSettings

  // Statistics
  totalRevenue: number
  affiliateGeneratedRevenue: number
  totalOrders: number
  averageOrderValue: number
  conversionRate: number
  refundRate: number

  // Metadata
  approvedAt?: Date
  approvedBy?: string
  verifiedAt?: Date
  suspendedAt?: Date
  suspensionReason?: string
  lastLoginAt: Date
  onboardingCompleted: boolean
  onboardingStep?: number
}
