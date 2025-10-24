import {v} from 'convex/values'
import {mutation} from '../_generated/server'

// --- Mutations ---

// Create a new user profile
export const create = mutation({
  args: {
    userId: v.id('users'),
    username: v.string(),
    displayName: v.string(),
    bio: v.union(v.string(), v.null()),
    avatarUrl: v.union(v.string(), v.null()),
    email: v.union(v.string(), v.null()),
    phone: v.union(v.string(), v.null()),
    website: v.union(v.string(), v.null()),
    socialLinks: v.object({
      linkedin: v.optional(v.string()),
      twitter: v.optional(v.string()),
      instagram: v.optional(v.string()),
      github: v.optional(v.string()),
      // Add other social links if you explicitly define them
    }),
    isPublic: v.boolean(),
    showAnalytics: v.boolean(),
    theme: v.object({
      primaryColor: v.string(),
      backgroundColor: v.string(),
      fontFamily: v.string(),
      layoutStyle: v.union(
        v.literal('minimal'),
        v.literal('cards'),
        v.literal('list'),
      ),
    }),
    metaTitle: v.union(v.string(), v.null()),
    metaDescription: v.union(v.string(), v.null()),
    createdAt: v.string(),
    updatedAt: v.string(),
    visible: v.boolean(),
  },
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
    bio: v.optional(v.union(v.string(), v.null())),
    avatarUrl: v.optional(v.union(v.string(), v.null())),
    email: v.optional(v.union(v.string(), v.null())),
    phone: v.optional(v.union(v.string(), v.null())),
    website: v.optional(v.union(v.string(), v.null())),
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
    metaTitle: v.optional(v.union(v.string(), v.null())),
    metaDescription: v.optional(v.union(v.string(), v.null())),
    updatedAt: v.string(),
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
