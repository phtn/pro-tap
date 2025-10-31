import {type GenericDatabaseWriter} from 'convex/server'
import {type DataModel} from '../_generated/dataModel'
import {mutation} from '../_generated/server'
import {userSchema} from './d'

// -- Create a New User
const create = mutation({
  args: userSchema,
  handler: async ({db}, args) => {
    const user = await checkUser(db, args.proId)
    if (user !== null) {
      await db.patch(user._id, {
        ...args,
        updatedAt: Date.now(),
      })
      return null
    }

    const newUser = await db.insert('users', {
      ...args,
      updatedAt: Date.now(),
      createdAt: Date.now(),
    })

    return await db.insert('userProfiles', {
      userId: newUser,
      proId: args.proId,
      cardId: null,
      visible: args.visible,
      email: args.email,
      updatedAt: Date.now(),
      createdAt: Date.now(),
      username: null,
      displayName: args.displayName,
      avatarUrl: args.avatarUrl,
      bio: null,
      phone: null,
      website: null,
      socialLinks: {},
      isPublic: false,
      showAnalytics: false,
      theme: {
        primaryColor: '#fff',
        backgroundColor: '#000',
        layoutStyle: 'card',
      },
      metaTitle: null,
      metaDescription: null,
      gallery: [],
    })
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
