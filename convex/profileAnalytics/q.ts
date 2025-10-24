import {v} from 'convex/values'
import {Doc, Id} from '../_generated/dataModel'
import {query} from '../_generated/server'

interface ProfileAnalytics {
  overview: {
    totalScans: number
    totalViews: number
    uniqueVisitors: number
    averageTimeOnPage: number
  }
  scansByCard: Array<{
    cardId: Id<'cards'> // Use Convex Id type
    cardType: Doc<'cards'>['cardType']
    scanCount: number
    lastScanned: string | null // Dates stored as strings
  }>
  timeline: Array<{
    date: string // YYYY-MM-DD
    scans: number
    views: number
  }>
  interactions: {
    emailClicks: number
    phoneClicks: number
    websiteClicks: number
    socialClicks: Record<string, number> // e.g., { "linkedin": 5, "twitter": 10 }
  }
  topLocations: Array<{
    country: string
    city: string | null // City can be null
    count: number
  }>
  referrers: Array<{
    source: Doc<'profileViews'>['source']
    count: number
  }>
}

export const getProfileAnalytics = query({
  args: {
    profileUserId: v.id('users'),
    // Optional date range for filtering analytics
    startDate: v.optional(v.string()), // ISO string
    endDate: v.optional(v.string()), // ISO string
  },
  handler: async (ctx, args): Promise<ProfileAnalytics> => {
    // 1. Fetch all relevant data for the profile user within the date range
    const profileViews = await ctx.db
      .query('profileViews')
      .withIndex('by_profileUserId', (q) =>
        q.eq('profileUserId', args.profileUserId),
      )
      .filter((q) => {
        let filter = q.eq(q.field('profileUserId'), args.profileUserId)
        if (args.startDate) {
          filter = q.and(filter, q.gte(q.field('viewedAt'), args.startDate))
        }
        if (args.endDate) {
          filter = q.and(filter, q.lte(q.field('viewedAt'), args.endDate))
        }
        return filter
      })
      .collect()

    // Get all cards associated with this user to link to cardScans
    const userCards = await ctx.db
      .query('cards')
      .withIndex('by_userId', (q) => q.eq('userId', args.profileUserId))
      .collect()
    const userCardIds = new Set(userCards.map((card) => card._id))
    const userCardIdToType = new Map(
      userCards.map((card) => [card._id, card.cardType]),
    )

    // Fetch card scans that belong to the user's cards and fall within the date range
    // Note: Convex doesn't directly support `q.in` for indices without a full scan,
    // so we'll filter after fetching if the number of cards is small.
    // For a very large number of cards, consider a separate index or a different strategy.
    const allCardScans = await ctx.db.query('cardScans').collect()
    const relevantCardScans = allCardScans.filter((scan) => {
      const isUsersCard = scan.cardId && userCardIds.has(scan.cardId)
      if (!isUsersCard) return false

      let isInDateRange = true
      if (args.startDate && scan.scannedAt < args.startDate) {
        isInDateRange = false
      }
      if (args.endDate && scan.scannedAt > args.endDate) isInDateRange = false

      return isInDateRange
    })

    // --- Initialize Analytics Object ---
    const analytics: ProfileAnalytics = {
      overview: {
        totalScans: 0,
        totalViews: 0,
        uniqueVisitors: 0,
        averageTimeOnPage: 0,
      },
      scansByCard: [],
      timeline: [],
      interactions: {
        emailClicks: 0,
        phoneClicks: 0,
        websiteClicks: 0,
        socialClicks: {},
      },
      topLocations: [],
      referrers: [],
    }

    // --- 2. Calculate Overview ---
    analytics.overview.totalViews = profileViews.length
    analytics.overview.totalScans = relevantCardScans.length

    const uniqueVisitorIPs = new Set<string>()
    let totalTimeOnPageSum = 0
    let timeOnPageCount = 0
    profileViews.forEach((view) => {
      uniqueVisitorIPs.add(view.ipAddress)
      if (view.timeOnPage !== null) {
        totalTimeOnPageSum += view.timeOnPage
        timeOnPageCount++
      }
    })
    analytics.overview.uniqueVisitors = uniqueVisitorIPs.size
    analytics.overview.averageTimeOnPage =
      timeOnPageCount > 0 ? totalTimeOnPageSum / timeOnPageCount : 0

    // --- 3. Scans by Card ---
    const scansByCardMap = new Map<
      Id<'cards'>,
      {count: number; lastScanned: string | null}
    >()
    relevantCardScans.forEach((scan) => {
      const cardData = scansByCardMap.get(scan.cardId)
      if (cardData) {
        cardData.count++
        if (!cardData.lastScanned || scan.scannedAt > cardData.lastScanned) {
          cardData.lastScanned = scan.scannedAt
        }
      } else {
        scansByCardMap.set(scan.cardId, {
          count: 1,
          lastScanned: scan.scannedAt,
        })
      }
    })

    analytics.scansByCard = Array.from(scansByCardMap).map(
      ([cardId, data]) => ({
        cardId,
        cardType: userCardIdToType.get(cardId) || 'nfc', // Fallback to a valid cardType
        scanCount: data.count,
        lastScanned: data.lastScanned,
      }),
    )
    // Sort by scan count descending
    analytics.scansByCard.sort((a, b) => b.scanCount - a.scanCount)

    // --- 4. Timeline (Daily Aggregation) ---
    const dailyDataMap = new Map<string, {scans: number; views: number}>()

    const getDay = (isoDate: string) => isoDate.substring(0, 10) // YYYY-MM-DD

    profileViews.forEach((view) => {
      const day = getDay(view.viewedAt)
      const data = dailyDataMap.get(day) || {scans: 0, views: 0}
      data.views++
      dailyDataMap.set(day, data)
    })

    relevantCardScans.forEach((scan) => {
      const day = getDay(scan.scannedAt)
      const data = dailyDataMap.get(day) || {scans: 0, views: 0}
      data.scans++
      dailyDataMap.set(day, data)
    })

    analytics.timeline = Array.from(dailyDataMap)
      .map(([date, data]) => ({date, ...data}))
      .sort((a, b) => a.date.localeCompare(b.date)) // Sort chronologically

    // --- 5. Interactions ---
    profileViews.forEach((view) => {
      view.interactionTypes.forEach((interaction) => {
        if (interaction === 'emailClick') {
          analytics.interactions.emailClicks++
        } else if (interaction === 'phoneClick') {
          analytics.interactions.phoneClicks++
        } else if (interaction === 'websiteClick') {
          analytics.interactions.websiteClicks++
        } else if (interaction.startsWith('socialClick_')) {
          const socialKey = interaction.substring('socialClick_'.length)
          analytics.interactions.socialClicks[socialKey] =
            (analytics.interactions.socialClicks[socialKey] || 0) + 1
        }
      })
    })

    // --- 6. Top Locations ---
    const locationMap = new Map<string, number>() // key: "Country_City" or "Country_null"
    profileViews.forEach((view) => {
      if (view.country) {
        const key = `${view.country}_${view.city || 'null'}`
        locationMap.set(key, (locationMap.get(key) || 0) + 1)
      }
    })
    analytics.topLocations = Array.from(locationMap)
      .map(([key, count]) => {
        const [country, city] = key.split('_')
        return {
          country,
          city: city === 'null' ? null : city,
          count,
        }
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 5) // Limit to top 5 locations

    // --- 7. Referrers ---
    const referrerMap = new Map<Doc<'profileViews'>['source'], number>()
    profileViews.forEach((view) => {
      referrerMap.set(view.source, (referrerMap.get(view.source) || 0) + 1)
    })
    analytics.referrers = Array.from(referrerMap)
      .map(([source, count]) => ({source, count}))
      .sort((a, b) => b.count - a.count)

    return analytics
  },
})
