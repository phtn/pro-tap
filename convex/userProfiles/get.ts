import {v} from 'convex/values'
import {query} from '../_generated/server'

export const getByCardId = query({
  args: {
    cardId: v.string(),
  },
  handler: async ({db}, {cardId}) => {
    return await db
      .query('userProfiles')
      .withIndex('by_cardId', (q) => q.eq('cardId', cardId))
      .first()
  },
})

// Get a single user profile by ID
export const get = query({
  args: {
    id: v.id('userProfiles'),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

// Get a user profile by userId (using the 'by_userId' index)
export const getByUserId = query({
  args: {
    userId: v.id('users'),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('userProfiles')
      .withIndex('by_userId', (q) => q.eq('userId', args.userId))
      .first()
  },
})

// Get a user profile by username (using the 'by_username' index)
export const getByUsername = query({
  args: {
    username: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('userProfiles')
      .withIndex('by_username', (q) => q.eq('username', args.username))
      .first()
  },
})

// List user profiles (consider pagination)
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('userProfiles').collect()
  },
})

// Get a user profile with associated user data (useful for CardWithRelations-like data)
export const getProfileWithUser = query({
  args: {
    profileId: v.id('userProfiles'),
  },
  handler: async (ctx, args) => {
    const profile = await ctx.db.get(args.profileId)
    if (!profile) return null

    const user = await ctx.db.get(profile.userId)
    return {
      ...profile,
      user, // user will be null if not found, handle on client
    }
  },
})
