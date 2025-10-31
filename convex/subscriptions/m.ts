import {v} from 'convex/values'
import {mutation} from '../_generated/server'
import {subscriptionSchema} from './d'

// Create a new subscription
export const create = mutation({
  args: subscriptionSchema,
  handler: async (ctx, args) => {
    const card = await ctx.db
      .query('cards')
      .withIndex('by_cardId', (q) => q.eq('cardId', args.cardId))
      .unique()
    if (!card) {
      console.log('CARD', args.cardId)
      return null
    }

    const profile = await ctx.db
      .query('userProfiles')
      .withIndex('by_proId', (q) => q.eq('proId', args.proId))
      .unique()

    if (!profile) {
      console.log('PROFILE', args.proId)
      return null
    }

    if (card.state === 'unused') {
      ctx.db.patch(card._id, {
        state: 'activated',
        activatedAt: Date.now(),
        updatedAt: Date.now(),
      })
      ctx.db.patch(profile._id, {cardId: args.cardId, updatedAt: Date.now()})
      const sub = await ctx.db.insert('subscriptions', args)
      return sub
    }
  },
})

// Update an existing subscription
export const update = mutation({
  args: {
    id: v.id('subscriptions'),
    state: v.optional(
      v.union(
        v.literal('pending'),
        v.literal('active'),
        v.literal('expired'),
        v.literal('cancelled'),
      ),
    ),
    planType: v.optional(
      v.union(v.literal('monthly'), v.literal('annual'), v.literal('lifetime')),
    ),
    endDate: v.optional(v.union(v.string(), v.null())),
  },
  handler: async (ctx, args) => {
    const {id, ...rest} = args
    await ctx.db.patch(id, rest)
  },
})

// Cancel a subscription (sets state to 'cancelled' and updates endDate)
export const cancel = mutation({
  args: {
    id: v.id('subscriptions'),
    cancelledAt: v.string(), // The date of cancellation
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      state: 'cancelled',
      endDate: args.cancelledAt, // Or a future date if it cancels at end of billing cycle
    })
  },
})

// Delete a subscription
export const remove = mutation({
  args: {
    id: v.id('subscriptions'),
  },
  handler: async (ctx, args) => {
    // IMPORTANT: Consider what happens to related cards when a subscription is deleted.
    // You might want to update card states (e.g., 'revoked' or 'expired').
    await ctx.db.delete(args.id)
  },
})
