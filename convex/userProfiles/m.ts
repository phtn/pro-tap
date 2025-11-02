import {v} from 'convex/values'
import {mutation} from '../_generated/server'
import {
  customLinksSchema,
  socialLinkSchema,
  userProfileSchema,
} from './d'

// --- Mutations ---

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
    fields: userProfileSchema,
  },
  handler: async (ctx, args) => {
    const {id, fields} = args
    await ctx.db.patch(id, fields)
  },
})
export const updateSocialLinks = mutation({
  args: {
    proId: v.string(),
    socialLinks: socialLinkSchema,
    customLinks: v.optional(customLinksSchema),
  },
  handler: async (ctx, {proId, socialLinks, customLinks}) => {
    const profile = await ctx.db
      .query('userProfiles')
      .withIndex('by_proId', (q) => q.eq('proId', proId))
      .first()
    if (!profile) {
      return null
    }

    const patch: Record<string, unknown> = {
      socialLinks,
      updatedAt: Date.now(),
    }

    if (typeof customLinks !== 'undefined') {
      patch.customLinks = customLinks
    }

    await ctx.db.patch(profile._id, patch)
    return profile._id
  },
})

export const updateBasics = mutation({
  args: {
    proId: v.string(),
    username: v.optional(v.union(v.string(), v.null())),
    displayName: v.optional(v.union(v.string(), v.null())),
    bio: v.optional(v.union(v.string(), v.null())),
  },
  handler: async (ctx, {proId, username, displayName, bio}) => {
    const profile = await ctx.db
      .query('userProfiles')
      .withIndex('by_proId', (q) => q.eq('proId', proId))
      .first()

    if (!profile) {
      return null
    }

    const patch: Record<string, unknown> = {
      updatedAt: Date.now(),
    }

    if (typeof username !== 'undefined') {
      patch.username = normalizeNullableString(username)
    }

    if (typeof displayName !== 'undefined') {
      patch.displayName = normalizeNullableString(displayName)
    }

    if (typeof bio !== 'undefined') {
      patch.bio = normalizeNullableString(bio)
    }

    await ctx.db.patch(profile._id, patch)
    return profile._id
  },
})

const normalizeNullableString = (value: string | null) => {
  if (typeof value === 'string') {
    const trimmed = value.trim()
    return trimmed.length > 0 ? trimmed : null
  }
  return value
}

export const updateGallery = mutation({
  args: {
    id: v.id('userProfiles'),
    file: v.optional(v.id('files')),
    storageId: v.optional(v.id('_storage')),
    author: v.optional(v.string()),
    contentType: v.optional(v.string()),
    setAsAvatar: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const {id, file, storageId, author, contentType, setAsAvatar} = args

    const profile = await ctx.db.get(id)
    if (!profile) {
      return null
    }

    let galleryFileId = file ?? null
    let assetStorageId = storageId ?? null

    if (!galleryFileId && assetStorageId) {
      galleryFileId = await ctx.db.insert('files', {
        body: assetStorageId,
        author: author ?? profile.proId ?? 'system',
        format: contentType ?? 'image',
        uploadedAt: Date.now(),
      })
    }

    if (!galleryFileId) {
      return null
    }

    if (!assetStorageId) {
      const fileDoc = await ctx.db.get(galleryFileId)
      assetStorageId = fileDoc?.body ?? null
    }

    const gallery = profile.gallery ?? []
    if (!gallery.includes(galleryFileId)) {
      gallery.push(galleryFileId)
    }

    const patch: Record<string, unknown> = {
      gallery,
      updatedAt: Date.now(),
    }

    let avatarUrl: string | null = null
    if (setAsAvatar && assetStorageId) {
      avatarUrl = (await ctx.storage.getUrl(assetStorageId)) ?? null
      patch.avatarUrl = avatarUrl
    }

    await ctx.db.patch(profile._id, patch)

    return {
      profileId: profile._id,
      fileId: galleryFileId,
      avatarUrl,
      galleryLength: gallery.length,
    }
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
