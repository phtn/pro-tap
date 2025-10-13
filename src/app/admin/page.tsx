'use client'
import {type ClassName} from '@/app/types'
import {Icon, type IconName} from '@/lib/icons'
import {cn} from '@/lib/utils'
import Link from 'next/link'
import {usePathname, useRouter} from 'next/navigation'
import {ReactNode, useEffect, useState} from 'react'

interface RouteItem {
  name: string
  label: string
  href: string
  icon: IconName
  color: ClassName
  description?: string
}

const AdminPage = () => {
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

  const tools: RouteItem[] = [
    {
      name: 'scan-nfc-cards',
      label: 'Scan NFC Cards',
      href: '/admin/nfc',
      icon: 'nfc',
      color:
        'bg-origin/40 dark:bg-dark-origin/40 group-hover:bg-origin/80 dark:group-hover:bg-dark-origin/80',
      description: 'Scan and manage NFC cards for your products',
    },
    {
      name: 'gen-qr-codes',
      label: 'Generate QR Codes',
      href: '/admin/qrcode',
      icon: 'qr-code-bold',
      color:
        'bg-origin/40 dark:bg-dark-origin/40 group-hover:bg-origin/80 dark:group-hover:bg-dark-origin/80',
      description: 'Scan and manage QR codes for your products',
    },
  ]

  const dataList: RouteItem[] = [
    {
      name: 'full-table',
      label: 'Full Table',
      href: '/admin/fulltable',
      icon: 'bullet-list-square',
      color:
        'bg-origin/40 dark:bg-dark-origin/40 group-hover:bg-origin/80 dark:group-hover:bg-dark-origin/80',
      description: 'View and manage all products in a table',
    },
  ]

  const renderCardItem = (item: RouteItem, index: number) => (
    <Link
      key={`${item.name}_${index}`}
      href={item.href}
      className='group bg-dark-origin border border-origin dark:bg-dim-origin relative p-4 md:p-6 rounded-3xl shadow-sm'>
      <div className='flex items-center space-x-6 mb-4'>
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
    <div className=''>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='md:py-8'>
          <Header title='Admin' subtext='Dashboard' back={router.back} />
          <div className='md:space-y-12 space-y-8'>
            <CardList title='Tools' list={tools} renderFn={renderCardItem} />
            <CardList title='Data' list={dataList} renderFn={renderCardItem} />
          </div>
        </div>
      </div>
    </div>
  )
}

interface HeaderProps {
  back: VoidFunction
  title: string
  subtext?: string
}

const Header = ({back, title, subtext}: HeaderProps) => {
  return (
    <div className='flex items-center space-x-6 md:space-x-8 h-14 md:h-20 mb-8 px-2 md:px-0'>
      <Icon
        name='back'
        className='size-5 md:size-7 opacity-60 cursor-pointer'
        onClick={back}
      />
      <h1 className='text-lg md:text-3xl font-bold text-gray-900 dark:text-white tracking-tighter font-figtree space-x-2'>
        <span>{title}</span>
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
      <h2 className='mb-4 font-space font-medium uppercase text-xs md:text-sm opacity-60'>
        Tools
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 max-w-6xl'>
        {list.map(renderFn)}
      </div>
    </div>
  )
}

export default AdminPage
