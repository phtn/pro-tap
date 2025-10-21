'use client'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {usePathname, useRouter} from 'next/navigation'
import {ReactNode} from 'react'
import {Header} from '../_components/header'
interface DataLayoutProps {
  children: ReactNode
}
export default function Layout({children}: DataLayoutProps) {
  const back = useRouter().back
  const endpoints = usePathname().split('/')
  const endpoint = endpoints.pop()
  return (
    <div>
      <div className='max-w-full mx-auto'>
        <div className='md:py-0'>
          <Header
            title='Admin'
            subtext='Dashboard'
            back={back}
            className={cn(
              'mb-0 md:mb-0 mx-2 md:mx-4',
              endpoint === 'data' && 'mb-4 md:mb-8',
            )}
            breadcrumbs={
              <div className='flex items-center justify-center tracking-tight font-figtree text-sm md:text-base'>
                <span className='px-1 opacity-80 capitalize'>
                  {endpoint === 'data'
                    ? 'Data'
                    : endpoints[endpoints.length - 1]}
                </span>
                <Icon
                  name='play-solid'
                  className='rotate-180 size-4 md:size-5 opacity-40'
                />
              </div>
            }
          />
          {children}
        </div>
      </div>
    </div>
  )
}
