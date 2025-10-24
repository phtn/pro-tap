import {v} from 'convex/values'
import {mutation} from '../_generated/server'

// Create a new subscription
export const create = mutation({
  args: {
    userId: v.id('users'),
    state: v.union(
      v.literal('pending'),
      v.literal('active'),
      v.literal('expired'),
      v.literal('cancelled'),
    ),
    planType: v.union(
      v.literal('monthly'),
      v.literal('annual'),
      v.literal('lifetime'),
    ),
    startDate: v.string(),
    endDate: v.union(v.string(), v.null()),
    createdAt: v.string(),
    updatedAt: v.string(),
    visible: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('subscriptions', args)
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
    updatedAt: v.string(),
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
      updatedAt: args.cancelledAt,
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
