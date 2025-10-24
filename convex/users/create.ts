import {type GenericDatabaseWriter} from 'convex/server'
import {Infer, v} from 'convex/values'
import {type DataModel} from '../_generated/dataModel'
import {mutation} from '../_generated/server'

// -- Create a New User
export const userValidator = v.object({
  proId: v.string(),
  email: v.string(),
  visible: v.boolean(), // Visivility
  updatedAt: v.optional(v.string()), // Store dates as ISO strings
  createdAt: v.optional(v.string()), // Store dates as ISO strings
})
export type IUser = Infer<typeof userValidator>

const create = mutation({
  args: userValidator,
  handler: async ({db}, args) => {
    const user = await checkUser(db, args.proId)
    if (user) {
      return await db.patch(user._id, args)
    }
    return await db.insert('users', args)
  },
})

const checkUser = async <DB extends GenericDatabaseWriter<DataModel>>(
  db: DB,
  proId: string,
) =>
  await db
    .query('users')
    .withIndex('by_proId', (q) => q.eq('proId', proId))
    .first()

export default create
