import {v} from 'convex/values'
import {mutation} from '../_generated/server'
import {userProfileSchema} from './d'

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
