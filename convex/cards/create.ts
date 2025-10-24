import {v} from 'convex/values'
import {mutation, query} from '../_generated/server'

// --- Mutations ---

// Create a new card
export const create = mutation({
  args: {
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

    visible: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('cards', args)
  },
})

// Update an existing card
export const update = mutation({
  args: {
    id: v.id('cards'),
    state: v.optional(
      v.union(
        v.literal('pending'),
        v.literal('activated'),
        v.literal('expired'),
        v.literal('suspended'),
        v.literal('revoked'),
      ),
    ),
    activationToken: v.optional(v.union(v.string(), v.null())),
    activatedAt: v.optional(v.union(v.string(), v.null())),
    nfcSerialNumber: v.optional(v.union(v.string(), v.null())),
    expiresAt: v.optional(v.string()),
    revokedAt: v.optional(v.union(v.string(), v.null())),
    updatedAt: v.string(),
  },
  handler: async (ctx, args) => {
    const {id, ...rest} = args
    await ctx.db.patch(id, rest)
  },
})

// Activate a card
export const activate = mutation({
  args: {
    id: v.id('cards'),
    activatedAt: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      state: 'activated',
      activatedAt: args.activatedAt,
      updatedAt: args.activatedAt,
    })
  },
})

// Revoke a card
export const revoke = mutation({
  args: {
    id: v.id('cards'),
    revokedAt: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      state: 'revoked',
      revokedAt: args.revokedAt,
      updatedAt: args.revokedAt,
    })
  },
})

// Delete a card
export const remove = mutation({
  args: {
    id: v.id('cards'),
  },
  handler: async (ctx, args) => {
    // IMPORTANT: Consider deleting associated card scans.
    await ctx.db.delete(args.id)
  },
})

// Get a single card scan by ID
export const get = query({
  args: {
    id: v.id('cardScans'),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

// List card scans for a specific card
export const listForCard = query({
  args: {
    cardId: v.id('cards'),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('cardScans')
      .withIndex('by_cardId', (q) => q.eq('cardId', args.cardId))
      .collect()
  },
})

// List recent card scans (consider pagination)
export const listRecent = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('cardScans')
      .order('desc') // Order by Convex's default creation time
      .take(args.limit || 100) // Default to 100 recent scans
  },
})
