import {defineSchema, defineTable} from 'convex/server'
import {v} from 'convex/values'
import {userProfileValidator} from './userProfiles/create'
import {userValidator} from './users/create'

export default defineSchema({
  users: defineTable(userValidator).index('by_proId', ['proId']),

  userProfiles: defineTable(userProfileValidator)
    .index('by_userId', ['userId'])
    .index('by_username', ['username']),

  cards: defineTable({
    userId: v.id('users'),
    subscriptionId: v.id('subscriptions'),
    state: v.union(
      v.literal('pending'),
      v.literal('activated'),
      v.literal('expired'),
      v.literal('suspended'),
      v.literal('revoked'),
    ),
    activationToken: v.union(v.string(), v.null()),
    activatedAt: v.union(v.string(), v.null()),
    nfcSerialNumber: v.union(v.string(), v.null()),
    cardType: v.union(v.literal('nfc'), v.literal('qr'), v.literal('virtual')),
    issuedAt: v.string(),
    expiresAt: v.string(),
    revokedAt: v.union(v.string(), v.null()),
    createdAt: v.string(),
    updatedAt: v.string(),
    visible: v.boolean(), // Visivility
  })
    .index('by_userId', ['userId'])
    .index('by_subscriptionId', ['subscriptionId'])
    .index('by_nfcSerialNumber', ['nfcSerialNumber']),

  subscriptions: defineTable({
    userId: v.id('users'),
    state: v.union(
      v.literal('pending'),
      v.literal('active'),
      v.literal('expired'),
      v.literal('cancelled'),
    ),
    planType: v.union(
      v.literal('monthly'),
      v.literal('annual'),
      v.literal('lifetime'),
    ),
    startDate: v.string(),
    endDate: v.union(v.string(), v.null()),
    createdAt: v.string(),
    updatedAt: v.string(),
    visible: v.boolean(), // Visivility
  }).index('by_userId', ['userId']),

  cardScans: defineTable({
    cardId: v.id('cards'),
    scannedAt: v.string(),
    ipAddress: v.string(),
    userAgent: v.string(),
    country: v.union(v.string(), v.null()),
    city: v.union(v.string(), v.null()),
    resolvedTo: v.union(
      v.literal('activation'),
      v.literal('profile'),
      v.literal('error'),
      v.literal('renewal'),
    ),
    profileUsername: v.union(v.string(), v.null()),
    visible: v.boolean(), // Visivility
  }).index('by_cardId', ['cardId']),

  profileViews: defineTable({
    profileUserId: v.id('users'),
    viewedAt: v.string(),
    source: v.union(
      v.literal('card_scan'),
      v.literal('direct_link'),
      v.literal('social_share'),
      v.literal('search'),
    ),
    cardId: v.union(v.id('cards'), v.null()),
    ipAddress: v.string(),
    userAgent: v.string(),
    country: v.union(v.string(), v.null()),
    city: v.union(v.string(), v.null()),
    timeOnPage: v.union(v.number(), v.null()),
    interactionCount: v.number(),
    interactionTypes: v.array(v.string()), // Array of strings
    visible: v.boolean(), // Visivility
  }).index('by_profileUserId', ['profileUserId']),

  profileAnalytics: defineTable({
    userId: v.id('users'),
    // The period this analytics data covers (e.g., 'daily', 'weekly', 'monthly', 'all_time')
    period: v.string(), // e.g., "all_time", "2023-10-25" (for daily) or "last_30_days"
    // If storing for specific date ranges, include start/end dates
    startDate: v.union(v.string(), v.null()), // ISO string, e.g., for a specific report
    endDate: v.union(v.string(), v.null()), // ISO string

    overview: v.object({
      totalScans: v.number(),
      totalViews: v.number(),
      uniqueVisitors: v.number(),
      averageTimeOnPage: v.number(),
    }),
    scansByCard: v.array(
      v.object({
        cardId: v.id('cards'), // Store as Convex ID
        cardType: v.union(
          v.literal('nfc'),
          v.literal('qr'),
          v.literal('virtual'),
        ),
        scanCount: v.number(),
        lastScanned: v.union(v.string(), v.null()), // ISO string
      }),
    ),
    timeline: v.array(
      v.object({
        date: v.string(), // YYYY-MM-DD
        scans: v.number(),
        views: v.number(),
      }),
    ),
    interactions: v.object({
      emailClicks: v.number(),
      phoneClicks: v.number(),
      websiteClicks: v.number(),
      socialClicks: v.object({
        // Define known social links explicitly
        linkedin: v.optional(v.number()),
        twitter: v.optional(v.number()),
        instagram: v.optional(v.number()),
        github: v.optional(v.number()),
        // If you need truly dynamic social links, you might use:
        // 'other': v.array(v.object({ name: v.string(), count: v.number() }))
        // or a different structure entirely.
        // For simplicity, sticking to known ones.
      }),
    }),
    topLocations: v.array(
      v.object({
        country: v.string(),
        city: v.union(v.string(), v.null()),
        count: v.number(),
      }),
    ),
    referrers: v.array(
      v.object({
        source: v.union(
          v.literal('card_scan'),
          v.literal('direct_link'),
          v.literal('social_share'),
          v.literal('search'),
          // Potentially other sources if your app evolves
        ),
        count: v.number(),
      }),
    ),
    // Timestamps for when this analytics record was created/last updated
    createdAt: v.string(),
    updatedAt: v.string(),
    visible: v.boolean(), // Visivility
  })
    .index('by_userId_period', ['userId', 'period']) // Important for quick lookup
    .index('by_userId', ['userId']), // Also useful for fetching all analytics for a user
})
