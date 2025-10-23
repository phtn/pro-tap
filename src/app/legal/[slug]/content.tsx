'use client'
import {Privacy, Purchase, Tos} from '@/legal'
import {type JSX, useCallback, useEffect} from 'react'
import {components} from '../../../../mdx.components'
import {SpaceX} from '../_components/spacex'

export const Content = ({slug}: {slug: string}) => {
  const fetchDoc = useCallback(
    async () => await import(`@/legal/${slug}.mdx`),
    [slug],
  )

  const docMap: Record<string, JSX.Element> = {
    'terms-of-use': <Tos components={components} />,
    'privacy-policy': <Privacy components={components} />,
    'purchase-agreement': <Purchase components={components} />,
  }

  useEffect(() => {
    fetchDoc().then((doc) => {
      console.log(doc)
    })
  }, [])
  return (
    <main className=' md:h-screen overflow-y-scroll'>
      <SpaceX />
      {docMap[slug]}
      <SpaceX />
    </main>
  )
}
