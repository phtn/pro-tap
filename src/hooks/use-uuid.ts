import {v7 as uuidv7} from 'uuid'

export const useUUID = () => {
  const generateUUID = async () => {
    const uuid = uuidv7()
    return uuid
  }

  return {generateUUID}
}
