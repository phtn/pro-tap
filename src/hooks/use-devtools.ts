'use client'
import { handleAsync } from '@/utils/async'
import { useCallback, useEffect, useState } from 'react'

export const useDevtools = () => {
  const [ip, setIp] = useState<string | null>(null)
  const [port, setPort] = useState<string | null>(null)
  const getServerInfo = useCallback(async () => {
    const result = await handleAsync(fetch)('/api/dev/ip', {
      cache: 'no-store',
    })

    if (result.error || !result.data) {
      console.error('Failed to fetch server IP:', result.error)
      return
    }

    const response = result.data
    const data = (await response.json()) as { ip: string; port: string }

    if (data && 'ip' in data) {
      setIp(data.ip)
    }
    if (data && 'port' in data) {
      setPort(data.port)
    }
  }, [])

  useEffect(() => {
    getServerInfo()
  }, [getServerInfo])

  return {
    ip,
    port,
  }
}
