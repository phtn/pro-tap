import {Infer, v} from 'convex/values'

export const userSchema = v.object({
  proId: v.string(),
  visible: v.boolean(), // Visivility
  email: v.string(), // Store dates as ISO strings
  displayName: v.union(v.string(), v.null()), // Store dates as ISO strings
  avatarUrl: v.union(v.string(), v.null()), // Store dates as ISO strings
  updatedAt: v.optional(v.number()), // Store dates as ISO strings
  createdAt: v.optional(v.number()), // Store dates as ISO strings
})
export type IUser = Infer<typeof userSchema>
