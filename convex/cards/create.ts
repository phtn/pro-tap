import {v} from 'convex/values'
import {mutation, query} from '../_generated/server'
import {cardSchema, createCardSchema, ICard} from './d'

// --- Mutations ---

// Create a new card
export const create = mutation({
  args: createCardSchema,
  handler: async (ctx, {tokens, batch, createdBy, serialNumber}) => {
    for (const token of tokens) {
      const card: ICard = {
        visible: true,
        updatedAt: Date.now(),
        createdAt: Date.now(),
        type: token.payload.channel,
        userId: null,
        cardId: token.payload.uid,
        series: token.payload.series,
        state: 'unused',
        group: token.payload.group,
        batch,
        token: token.token,
        activatedAt: null,
        serialNumber: serialNumber ?? null,
        issuedAt: token.payload.iat,
        expiresAt: token.payload.exp,
        revokedAt: null,
        createdBy,
      }
      await ctx.db.insert('cards', card)
    }
  },
})

// Update an existing card
export const update = mutation({
  args: {id: v.id('cards'), payload: cardSchema},
  handler: async (ctx, {id, payload}) => {
    await ctx.db.patch(id, payload)
  },
})

// Activate a card
export const activate = mutation({
  args: {
    id: v.id('cards'),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      state: 'activated',
      activatedAt: Date.now(),
      updatedAt: Date.now(),
    })
  },
})

// Revoke a card
export const revoke = mutation({
  args: {
    id: v.id('cards'),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      state: 'revoked',
      revokedAt: Date.now(),
      updatedAt: Date.now(),
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
