import {v} from 'convex/values'

export const nullable = v.union(v.string(), v.null())

export const userProfileTheme = v.object({
  primaryColor: v.string(),
  backgroundColor: v.string(),
  layoutStyle: v.union(
    v.literal('minimal'),
    v.literal('card'),
    v.literal('list'),
  ),
})

export const socialLinkSchema = v.object({
  facebook: v.optional(v.string()),
  twitter: v.optional(v.string()),
  instagram: v.optional(v.string()),
  tiktok: v.optional(v.string()),
  linkedin: v.optional(v.string()),
})

export const userProfileSchema = v.object({
  userId: v.id('users'),
  proId: v.string(),
  cardId: nullable,
  username: nullable,
  displayName: nullable,
  bio: nullable,
  avatarUrl: nullable,
  email: nullable,
  phone: nullable,
  website: nullable,
  socialLinks: socialLinkSchema,
  isPublic: v.boolean(),
  showAnalytics: v.boolean(),
  theme: userProfileTheme,
  metaTitle: nullable,
  metaDescription: nullable,
  createdAt: v.number(),
  updatedAt: v.number(),
  visible: v.boolean(),
  gallery: v.array(v.id('files')),
})
