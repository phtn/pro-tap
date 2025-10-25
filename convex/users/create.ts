import {type GenericDatabaseWriter} from 'convex/server'
import {Infer, v} from 'convex/values'
import {type DataModel} from '../_generated/dataModel'
import {mutation} from '../_generated/server'

// -- Create a New User
export const userValidator = v.object({
  proId: v.string(),
  visible: v.boolean(), // Visivility
  email: v.string(), // Store dates as ISO strings
  updatedAt: v.optional(v.string()), // Store dates as ISO strings
  createdAt: v.optional(v.string()), // Store dates as ISO strings
})
export type IUser = Infer<typeof userValidator>

const create = mutation({
  args: userValidator,
  handler: async ({db}, args) => {
    const user = await checkUser(db, args.proId)
    if (user !== null) {
      await db.patch(user._id, {
        updatedAt: new Date().toString(),
      })
      return null
    }

    const newUser = await db.insert('users', {
      proId: args.proId,
      visible: args.visible,
      email: args.email,
      updatedAt: new Date().toString(),
      createdAt: new Date().toString(),
    })

    await db.insert('userProfiles', {
      userId: newUser,
      visible: args.visible,
      email: args.email,
      updatedAt: new Date().toString(),
      createdAt: new Date().toString(),
      username: null,
      displayName: null,
      bio: null,
      avatarUrl: null,
      phone: null,
      website: null,
      socialLinks: {},
      isPublic: false,
      showAnalytics: false,
      theme: {
        primaryColor: '#fff',
        backgroundColor: '#000',
        layoutStyle: 'cards',
      },
      metaTitle: null,
      metaDescription: null,
      gallery: [],
    })

    return newUser
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
