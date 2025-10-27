import {CardRequest} from '@/app/api/card/generate/route'
import {useCallback} from 'react'

export const useCardGen = (body?: CardRequest) => {
  const generate = useCallback(
    async (data?: CardRequest) => {
      const res = await fetch('/api/card/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data ?? body),
      })
      return res.json()
    },
    [body],
  )

  return {generate}
}
