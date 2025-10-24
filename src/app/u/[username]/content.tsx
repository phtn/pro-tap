'use client'

import {
  getVisiblePublicUserById,
  getVisiblePublicUsers,
  PublicProfile,
} from '@/lib/firebase/public/u'
import {useCallback, useEffect, useState} from 'react'
import ProfileView from './view'

interface ContentProps {
  username: string
}

export const Content = ({username}: ContentProps) => {
  const [profile, setProfile] = useState<PublicProfile | null>(null)

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
      <ProfileView profile={profile} />
    </main>
  )
}
