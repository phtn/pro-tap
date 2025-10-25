import {Infer, v} from 'convex/values'
import {mutation} from '../_generated/server'

export const fileSchema = v.object({
  body: v.id('_storage'),
  author: v.string(),
  format: v.string(),
  caption: v.optional(v.string()),
  tags: v.optional(v.array(v.string())),
  uploadedAt: v.optional(v.number()),
})

export type UploadType = Infer<typeof fileSchema>

export const url = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl()
  },
})

export const image = mutation({
  args: {storageId: v.id('_storage'), author: v.string()},
  handler: async (ctx, args) => {
    await ctx.db.insert('images', {
      body: args.storageId,
      author: args.author,
      format: 'image',
    })
  },
})

export const file = mutation({
  args: {storageId: v.id('_storage'), author: v.string()},
  handler: async (ctx, args) => {
    await ctx.db.insert('files', {
      body: args.storageId,
      author: args.author,
      format: 'image',
    })
  },
})
