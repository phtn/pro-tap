'use client'
import {type ClassName} from '@/app/types'
import {Icon, type IconName} from '@/lib/icons'
import {cn} from '@/lib/utils'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {ReactNode, useEffect, useState} from 'react'

interface RouteItem {
  name: string
  label: string
  href: string
  icon: IconName
  color: ClassName
  description?: string
}

export const EditorOverview = () => {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className='h-16 flex items-center justify-center space-x-4 px-4'>
        <Icon name='protap' className='h-12 w-auto animate-pulse' />
        <Icon
          name='spinners-ring'
          className='size-3 dark:text-orange-200 text-teal-500'
        />
      </div>
    )
  }

  // If we're on a sub-page, don't render this component (let Next.js handle it)
  if (pathname !== '/account/profile/editor') {
    return null
  }

  const privateInfo: RouteItem[] = [
    {
      name: 'biodata',
      label: 'User Biodata',
      href: '/account/profile/editor/biodata',
      icon: 'text-edit',
      color:
        'bg-green-100 dark:bg-green-300/80 group-hover:bg-green-200 dark:group-hover:bg-mac-green/80',
      description: 'Name, Gender, Date of Birth...',
    },
  ]

  const publicInfo: RouteItem[] = [
    {
      name: 'profile-page',
      label: 'Profile Page',
      href: '/account/profile/editor/profile-page',
      icon: 'sign-pen',
      color:
        'bg-indigo-200 dark:bg-indigo-500/80 group-hover:bg-indigo-300 dark:group-hover:bg-indigo-500',
      description: 'Add photos and themes to your profile page.',
    },
    {
      name: 'social-links',
      label: 'Social Media Links',
      href: '/account/profile/editor/social-links',
      icon: 'highlighter',
      color:
        'bg-red-200 dark:bg-red-400/80 group-hover:bg-red-300 dark:group-hover:bg-mac-red',
      description: 'Add Social Media Links.',
    },
  ]

  const renderCardItem = (item: RouteItem, index: number) => (
    <Link
      key={`${item.name}_${index}`}
      href={item.href}
      className='active:scale-90 transition-all duration-300 group bg-dark-origin dark:bg-dim-origin relative p-4 md:p-6 rounded-2xl shadow-xs shadow-origin'>
      <div className='flex items-center space-x-3 md:space-x-6 mb-4'>
        <div
          className={cn(
            'flex items-center justify-center size-8 md:size-12 rounded-lg  transition-colors',
            item.color,
          )}>
          <Icon name={item.icon} className={'size-4 md:size-6'} />
        </div>
        <h3 className='md:text-lg font-semibold tracking-tight'>
          {item.label}
        </h3>
      </div>

      <p className='font-figtree opacity-70 text-sm'>{item.description}</p>
    </Link>
  )

  return (
    <div className='border-t md:border-t-0 border-zinc-300 dark:border-dark-origin rounded-t-3xl'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-6 xl:px-0'>
        <div className='md:py-6'>
          <Header title='Profile' subtext='Editor' />
          <div className='space-y-8 md:space-y-12 px-2 md:px-0'>
            <CardList
              title='Private Info'
              list={privateInfo}
              renderFn={renderCardItem}
            />
            <CardList
              title='Public Info'
              list={publicInfo}
              renderFn={renderCardItem}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

interface HeaderProps {
  title: string
  subtext?: string
}

const Header = ({title, subtext}: HeaderProps) => {
  return (
    <div className='flex items-center space-x-1.5 md:space-x-3 h-14 md:h-20 mb-2 md:mb-4 px-1 md:px-0'>
      <Icon
        name='draw'
        className='size-6 md:size-8 dark:text-orange-200 text-orange-300 drop-shadow-xs'
      />
      <h1 className='text-xl md:text-2xl font-bold text-gray-900 dark:text-white tracking-tighter font-figtree space-x-1'>
        <span className=''>{title}</span>
        <span className='space-x-1.5 md:space-x-2 font-light'>{subtext}</span>
      </h1>
    </div>
  )
}

interface CardListProps {
  title: string
  list: RouteItem[]
  renderFn: (item: RouteItem, index: number) => ReactNode
}

const CardList = ({title, list, renderFn}: CardListProps) => {
  return (
    <div>
      <h2 className='mb-4 font-figtree font-medium uppercase text-xs md:text-sm opacity-50'>
        {title}
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 max-w-5xl'>
        {list.map(renderFn)}
      </div>
    </div>
  )
}
