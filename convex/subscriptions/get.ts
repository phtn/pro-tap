import {v} from 'convex/values'
import {query} from '../_generated/server'

// --- Queries ---

// Get a single subscription by ID
export const get = query({
  args: {
    id: v.id('subscriptions'),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

// Get a subscription by userId
export const getByUserId = query({
  args: {
    userId: v.id('users'),
  },
  handler: async (ctx, args) => {
    // A user might have multiple subscriptions over time, this gets the first one.
    // Consider how you want to handle multiple or current/active subscriptions.
    return await ctx.db
      .query('subscriptions')
      .withIndex('by_userId', (q) => q.eq('userId', args.userId))
      .first()
  },
})

// List all subscriptions (consider pagination)
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('subscriptions').collect()
  },
})

// List subscriptions for a specific user
export const listForUser = query({
  args: {
    userId: v.id('users'),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('subscriptions')
      .withIndex('by_userId', (q) => q.eq('userId', args.userId))
      .collect()
  },
})
