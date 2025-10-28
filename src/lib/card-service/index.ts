import {useQuery} from 'convex/react'
import {api} from '../../../convex/_generated/api' // Adjust path as needed
import type {Doc} from '../../../convex/_generated/dataModel' // Adjust path as needed

// Define a type for a Card document for better type safety
type CardDoc = Doc<'cards'>

/**
 * A service class to interact with the 'cards' Convex table.
 * This class uses Convex hooks internally, so its methods can only be called
 * within a React component or custom hook.
 */
class CardService {
  /**
   * Private constructor to enforce singleton-like usage or clarify
   * that instances are created by a hook.
   */
  private constructor() {}

  /**
   * Factory method to create an instance, or more practically,
   * a custom React hook to provide the service instance.
   * This is necessary because `useQuery` and `useMutation` are hooks.
   */
  static useService() {
    // Queries
    // const getCardsByCompletionStatus = (isCompleted: boolean) =>
    //   useQuery(api.cards.getCardsByCompletionStatus, {isCompleted})
    const getAllCards = useQuery(api.cards.q.getAll)
    // const getCardById = (cardId: string) => useQuery(api.cards.q.get, {cardId})

    // Mutations
    // const createCard = useMutation(api.cards.create.create)
    // const updateCardCompletion = useMutation(api.cards.updateCardCompletion)
    // const deleteCard = useMutation(api.cards.m.purgeOne)
    // const updateCardDescription = useMutation(api.cards.updateCardDescription)

    // Actions
    // const performComplexCardOperation = useMutation(
    //   api.cards.performComplexCardOperation,
    // )

    return {
      // Methods to access queries
      getAll: (): CardDoc[] | undefined => getAllCards,
      // getByCompletionStatus: (isCompleted: boolean): CardDoc[] | undefined =>
      //   getCardsByCompletionStatus(isCompleted),
      // getById: (cardId: string): CardDoc | undefined => getCardById(cardId),

      // Methods to perform mutations
      // create: async (description: string): Promise<Id<'cards'>> =>
      //   createCard({description}),
      // updateCompletion: async (
      //   taskId: Id<'cards'>,
      //   isCompleted: boolean,
      // ): Promise<void> => updateCardCompletion({taskId, isCompleted}),
      // delete: async (taskId: Id<'cards'>): Promise<void> =>
      //   deleteCard({taskId}),
      // updateDescription: async (
      //   taskId: Id<'cards'>,
      //   description: string,
      // ): Promise<void> => updateCardDescription({taskId, description}),

      // Methods to perform actions
      // runComplexOperation: async (
      //   taskId: Id<'cards'>,
      //   newDescription: string,
      // ): Promise<{success: boolean}> =>
      //   performComplexCardOperation({taskId, newDescription}),
    }
  }
}

// Export a custom hook that returns the "service" object
export const useCardService = CardService.useService
