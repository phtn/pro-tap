import {mutation} from '../_generated/server'
import {tokenSchema} from './d'

const token = mutation({
  args: tokenSchema,
  handler: async ({db}, args) => {
    return await db.insert('tokens', args)
  },
})
export default token
