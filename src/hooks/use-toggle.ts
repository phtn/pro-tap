import { useCallback, useState } from 'react'

interface UseToggleReturn {
  on: boolean;
  toggle: () => void;
  setOn: (value: boolean) => void;
}
export const useToggle = (initialState?: boolean): UseToggleReturn => {
  const [on, setOn] = useState<boolean>(() => initialState ?? false)

  const toggle = useCallback((): void => {
    setOn((prevState: boolean): boolean => !prevState)
  }, [])

  return { on, toggle, setOn }
}
