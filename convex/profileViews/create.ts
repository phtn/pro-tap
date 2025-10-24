import {v} from 'convex/values'
import {mutation} from '../_generated/server'

// --- Mutations ---

// Record a new profile view
export const recordView = mutation({
  args: {
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
    interactionTypes: v.array(v.string()),
    visible: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('profileViews', args)
  },
})

// Update an existing profile view (e.g., if you're tracking timeOnPage or interactions dynamically)
export const update = mutation({
  args: {
    id: v.id('profileViews'),
    timeOnPage: v.optional(v.union(v.number(), v.null())),
    interactionCount: v.optional(v.number()),
    interactionTypes: v.optional(v.array(v.string())),
    // No `updatedAt` field in schema, but could add one if needed.
  },
  handler: async (ctx, args) => {
    const {id, ...rest} = args
    await ctx.db.patch(id, rest)
  },
})

// Delete a profile view (less common for analytics data)
export const remove = mutation({
  args: {
    id: v.id('profileViews'),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})
