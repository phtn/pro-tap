import {v} from 'convex/values'
import {mutation} from '../_generated/server'

// --- Mutations ---

// Delete a card scan (less common for analytics data, but included for completeness)
export const purgeOne = mutation({
  args: {
    cardId: v.string(),
  },
  handler: async (ctx, {cardId}) => {
    const doc = await ctx.db
      .query('cards')
      .withIndex('by_cardId', (q) => q.eq('cardId', cardId))
      .first()
    if (doc) {
      await ctx.db.delete(doc._id)
    }
  },
})
export const purgeInactive = mutation({
  args: {
    userId: v.union(v.string(), v.null()),
  },
  handler: async (ctx, args) => {
    const docs = await ctx.db
      .query('cards')
      .filter((q) => q.eq(q.field('userId'), null))
      .collect()
    for (const doc of docs) {
      await ctx.db.delete(doc._id)
    }
  },
})
