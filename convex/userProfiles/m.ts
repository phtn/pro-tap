import {v} from 'convex/values'
import {mutation} from '../_generated/server'
import {userProfileSchema} from './d'

// --- Mutations ---

const nullable = v.union(v.string(), v.null())

// Create a new user profile
export const create = mutation({
  args: userProfileSchema,
  handler: async (ctx, args) => {
    return await ctx.db.insert('userProfiles', args)
  },
})

// Update an existing user profile
export const update = mutation({
  args: {
    id: v.id('userProfiles'),
    // Only include fields that can be updated, make them optional
    username: v.optional(v.string()),
    displayName: v.optional(v.string()),
    bio: v.optional(nullable),
    avatarUrl: nullable,
    phone: v.optional(nullable),
    website: v.optional(nullable),
    socialLinks: v.optional(
      v.object({
        linkedin: v.optional(v.string()),
        twitter: v.optional(v.string()),
        instagram: v.optional(v.string()),
        github: v.optional(v.string()),
      }),
    ),
    isPublic: v.optional(v.boolean()),
    showAnalytics: v.optional(v.boolean()),
    theme: v.optional(
      v.object({
        primaryColor: v.string(),
        backgroundColor: v.string(),
        fontFamily: v.string(),
        layoutStyle: v.union(
          v.literal('minimal'),
          v.literal('cards'),
          v.literal('list'),
        ),
      }),
    ),
    metaTitle: v.optional(nullable),
    metaDescription: v.optional(nullable),
  },
  handler: async (ctx, args) => {
    const {id, ...rest} = args
    await ctx.db.patch(id, rest)
  },
})

// Delete a user profile
export const remove = mutation({
  args: {
    id: v.id('userProfiles'),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})
