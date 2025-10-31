import {v} from 'convex/values'

export const subscriptionSchema = v.object({
  userId: v.id('users'),
  proId: v.string(),
  cardId: v.string(),
  state: v.union(
    v.literal('pending'),
    v.literal('active'),
    v.literal('expired'),
    v.literal('cancelled'),
  ),
  planType: v.union(
    v.literal('monthly'),
    v.literal('annual'),
    v.literal('lifetime'),
  ),
  startDate: v.string(),
  endDate: v.union(v.string(), v.null()),
  createdAt: v.union(v.number(), v.null()),
  updatedAt: v.union(v.number(), v.null()),
  visible: v.boolean(), // Visibility
})
