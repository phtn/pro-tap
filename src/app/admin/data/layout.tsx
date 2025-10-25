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
    <div className='bg-dark-origin dark:bg-vim h-screen'>
      <div className='max-w-6xl mx-auto'>
        <Header
          subtext=''
          back={back}
          title={endpoint ?? 'Admin'}
          className={cn({'border-transparent': endpoints.length === 4})}
          breadcrumbs={
            <div className='flex items-center justify-center tracking-tight font-figtree text-sm md:text-base'>
              <span className='px-1 opacity-80 capitalize'>
                {endpoint === 'data' ? 'Data' : endpoints[endpoints.length - 1]}
              </span>
              <Icon
                name='server'
                className='rotate-180 size-4 md:size-5 opacity-40'
              />
            </div>
          }
        />
        {children}
      </div>
    </div>
  )
}
