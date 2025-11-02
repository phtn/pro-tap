import {Infer, v} from 'convex/values'

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

export const customLinkSchema = v.object({
  id: v.string(),
  label: v.string(),
  url: v.string(),
})

export const customLinksSchema = v.array(customLinkSchema)

const basics = {
  username: nullable,
  displayName: nullable,
  bio: nullable,
}

const props = {
  ...basics,
  proId: v.string(),
  cardId: nullable,
  avatarUrl: nullable,
  email: nullable,
  phone: nullable,
  website: nullable,
  socialLinks: socialLinkSchema,
  customLinks: v.optional(customLinksSchema),
  isPublic: v.boolean(),
  showAnalytics: v.boolean(),
  theme: v.optional(userProfileTheme),
  metaTitle: nullable,
  metaDescription: nullable,
  createdAt: v.optional(v.number()),
  updatedAt: v.optional(v.number()),
  visible: v.boolean(),
  gallery: v.optional(v.array(v.id('files'))),
}

export const basicsSchema = v.object(basics)
export type UserProfileBasics = Infer<typeof basicsSchema>

export const userProfileSchema = v.object({
  userId: v.id('users'),
  ...props,
})

export const userProfileProps = v.object(props)

export type UserProfile = Infer<typeof userProfileSchema>
export type UserProfileProps = Infer<typeof userProfileProps>
