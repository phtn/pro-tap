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
export const getByProId = query({
  args: {
    proId: v.string(),
  },
  handler: async (ctx, args) => {
    // A user might have multiple subscriptions over time, this gets the first one.
    // Consider how you want to handle multiple or current/active subscriptions.
    return await ctx.db
      .query('subscriptions')
      .withIndex('by_proId', (q) => q.eq('proId', args.proId))
      .first()
  },
})

export const getByCardId = query({
  args: {
    cardId: v.string(),
  },
  handler: async (ctx, args) => {
    // A user might have multiple subscriptions over time, this gets the first one.
    // Consider how you want to handle multiple or current/active subscriptions.
    return await ctx.db
      .query('subscriptions')
      .withIndex('by_cardId', (q) => q.eq('cardId', args.cardId))
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
