'use client'
import {IndividualConvexDataContent} from '../../individual/convex'

interface Props {
  slug: string
}

export const Content = ({slug}: Props) => {
  return (
    <div className=''>
      <IndividualConvexDataContent query={slug} />
    </div>
  )
}
