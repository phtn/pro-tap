import {v} from 'convex/values'
import {mutation} from '../_generated/server'

// Record a new card scan
export const recordScan = mutation({
  args: {
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
    visible: v.boolean(),
    profileUsername: v.union(v.string(), v.null()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('cardScans', args)
  },
})
