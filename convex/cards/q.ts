import {v} from 'convex/values'
import {query} from '../_generated/server'

// --- Queries ---

// Get a single card by ID
export const get = query({
  args: {
    id: v.id('cards'),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

// List cards for a specific user
export const listForUser = query({
  args: {
    userId: v.id('users'),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('cards')
      .withIndex('by_userId', (q) => q.eq('userId', args.userId))
      .collect()
  },
})

// Get a card by NFC serial number
export const getByNfcSerialNumber = query({
  args: {
    nfcSerialNumber: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('cards')
      .withIndex('by_nfcSerialNumber', (q) =>
        q.eq('nfcSerialNumber', args.nfcSerialNumber),
      )
      .first()
  },
})

// Get a card with related user and subscription info (similar to CardWithRelations)
export const getCardWithRelations = query({
  args: {
    cardId: v.id('cards'),
  },
  handler: async (ctx, args) => {
    const card = await ctx.db.get(args.cardId)
    if (!card) return null

    const user = await ctx.db.get(card.userId)
    const subscription = await ctx.db.get(card.subscriptionId)
    const userProfile = user
      ? await ctx.db
          .query('userProfiles')
          .withIndex('by_userId', (q) => q.eq('userId', user._id))
          .first()
      : null

    return {
      ...card,
      user: user
        ? {
            ...user,
            profile: userProfile,
            subscription, // This assumes one-to-one or current subscription
          }
        : null,
    }
  },
})
