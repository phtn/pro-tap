'use client'

import {useUUID} from '@/hooks/use-uuid'
import {TokenMetadata} from '@/lib/jwt/tok.types'
import {useCallback, useEffect, useState} from 'react'
import {NewCard} from './jwt-card'

interface Props {
  meta: TokenMetadata
}

export const SettingsContent = ({meta}: Props) => {
  const [id, setId] = useState<string | null>(null)
  const {generateUUID} = useUUID()

  const handleCreateId = useCallback(async () => {
    const uuid = await generateUUID()
    setId(uuid)
  }, [generateUUID])

  useEffect(() => {
    if (meta) {
      handleCreateId()
    }
  }, [])

  return (
    <main className='size-96 flex items-center justify-center flex-wrap'>
      <NewCard token={meta.token} payload={meta.payload} signature='' id={id} />
    </main>
  )
}
