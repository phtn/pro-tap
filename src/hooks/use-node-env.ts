import {NodeEnv} from '@/app/api/env/route'
import {useCallback, useEffect, useState} from 'react'

interface UseNodeEnvResult {
  baseUrl: string | null
  nodeEnv: string | null
}

export const useNodeEnv = (): UseNodeEnvResult => {
  const [baseUrl, setBaseUrl] = useState<string | null>('localhost:3000')
  const [nodeEnv, setNodeEnv] = useState<string | null>('development')
  const getNodeEnv = useCallback(async () => {
    const response = await fetch('/api/env')

    if (!response.ok) {
      throw new Error('Failed to fetch node environment')
    }

    const data = (await response.json()) as NodeEnv
    setNodeEnv(data.nodeEnv)
    setBaseUrl(data.baseUrl)
  }, [])

  useEffect(() => {
    getNodeEnv()
  }, [getNodeEnv])

  return {baseUrl, nodeEnv}
}
