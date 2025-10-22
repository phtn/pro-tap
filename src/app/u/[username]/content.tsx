'use client'

import {
  getVisiblePublicUserById,
  getVisiblePublicUsers,
  PublicUser,
} from '@/lib/firebase/public/u'
import {useCallback, useEffect, useState} from 'react'

interface ContentProps {
  username: string
}

export const Content = ({username}: ContentProps) => {
  const [profile, setProfile] = useState<PublicUser | null>(null)

  const getUsers = useCallback(
    async () => await getVisiblePublicUsers('id'),
    [],
  )

  useEffect(() => {
    getUsers().then(console.log).catch(console.error)
  }, [getUsers])

  const getProfile = useCallback(
    async () => await getVisiblePublicUserById(username),
    [],
  )

  useEffect(() => {
    getProfile()
      .then((profile) => {
        setProfile(profile)
        console.log(profile)
      })
      .catch(console.error)
  }, [getProfile])

  return (
    <main>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </main>
  )
}
