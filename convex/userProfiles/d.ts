import {v} from 'convex/values'

const nullable = v.union(v.string(), v.null())

const userProfileTheme = v.object({
  primaryColor: v.string(),
  backgroundColor: v.string(),
  layoutStyle: v.union(
    v.literal('minimal'),
    v.literal('cards'),
    v.literal('list'),
  ),
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
  socialLinks: v.object({
    linkedin: v.optional(v.string()),
    twitter: v.optional(v.string()),
    instagram: v.optional(v.string()),
    github: v.optional(v.string()),
  }),
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
