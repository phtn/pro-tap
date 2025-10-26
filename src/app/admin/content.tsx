'use client'
import {Icon} from '@/lib/icons'
import {usePathname, useRouter} from 'next/navigation'
import {useEffect, useState} from 'react'
import {CardList} from './_components/card-list'
import {Header} from './_components/header'
import {dataList, tools, utils} from './static'

export const AdminPageContent = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className='h-16 flex items-center space-x-4 px-4'>
        <Icon name='protap' className='h-12 w-auto animate-pulse' />
        <Icon
          name='spinners-dots'
          className='size-3 dark:text-orange-200 text-teal-500'
        />
      </div>
    )
  }

  // If we're on a sub-page, don't render this component (let Next.js handle it)
  if (pathname !== '/admin') {
    return null
  }

  return (
    <div className='h-screen bg-dark-origin dark:bg-terminal'>
      <div className='max-w-6xl mx-auto'>
        <div className='h-full'>
          <Header title='Admin' back={router.back} subtext='Dashboard' />
          <div className='py-8 h-[calc(92lvh)] md:space-y-12 space-y-8 px-4 sm:px-6 lg:px-8'>
            <CardList title='Tools' list={tools} />
            <CardList title='Data' list={dataList} />
            <CardList title='Utils' list={utils} />
          </div>
        </div>
      </div>
    </div>
  )
}
