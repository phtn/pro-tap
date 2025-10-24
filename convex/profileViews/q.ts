import {v} from 'convex/values'
import {query} from '../_generated/server'

// --- Queries ---

// Get a single profile view by ID
export const get = query({
  args: {
    id: v.id('profileViews'),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

// List profile views for a specific user profile
export const listForProfileUser = query({
  args: {
    profileUserId: v.id('users'),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('profileViews')
      .withIndex('by_profileUserId', (q) =>
        q.eq('profileUserId', args.profileUserId),
      )
      .collect()
  },
})

// List recent profile views (consider pagination)
export const listRecent = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('profileViews')
      .order('desc')
      .take(args.limit || 100)
  },
})

// Get aggregate view data (example, can be much more complex)
export const getProfileViewAnalytics = query({
  args: {
    profileUserId: v.id('users'),
    // startDate: v.optional(v.string()),
    // endDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const views = await ctx.db
      .query('profileViews')
      .withIndex('by_profileUserId', (q) =>
        q.eq('profileUserId', args.profileUserId),
      )
      .collect()

    // Basic aggregation example
    const totalViews = views.length
    const totalTimeOnPage = views.reduce(
      (sum, view) => sum + (view.timeOnPage || 0),
      0,
    )
    const uniqueIPs = new Set(views.map((view) => view.ipAddress)).size

    return {
      totalViews,
      totalTimeOnPage,
      uniqueIPs,
      // Add more complex aggregations here (e.g., views by source, by country, etc.)
    }
  },
})
