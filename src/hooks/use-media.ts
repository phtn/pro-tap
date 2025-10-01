import { useState, useEffect } from 'react'

export const useMedia = (
  queries: string[],
  values: number[],
  defaultValue: number
): number => {
  const get = () => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof matchMedia === 'undefined') {
      return defaultValue
    }
    return values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue
  }

  const [value, setValue] = useState<number>(get)

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof matchMedia === 'undefined') {
      return
    }

    const handler = () => setValue(get)
    queries.forEach((q) => matchMedia(q).addEventListener('change', handler))
    return () =>
      queries.forEach((q) =>
        matchMedia(q).removeEventListener('change', handler)
      )
  }, [queries])

  return value
}
