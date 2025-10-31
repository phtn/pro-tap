import {v} from 'convex/values'
import {query} from '../_generated/server'

// Get a single user by ID
export const get = query({
  args: {
    id: v.id('users'),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

// List all users (consider pagination for large datasets)
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('users').collect()
  },
})

// Get a user by email (using the 'by_email' index)
export const getByProId = query({
  args: {
    proId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('users')
      .withIndex('by_proId', (q) => q.eq('proId', args.proId))
      .first()
  },
})
