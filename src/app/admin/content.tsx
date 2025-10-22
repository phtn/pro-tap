'use client'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import Link from 'next/link'
import {usePathname, useRouter} from 'next/navigation'
import {useEffect, useState} from 'react'
import {CardList, RouteItem} from './_components/card-list'
import {Header} from './_components/header'

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

  const tools: RouteItem[] = [
    {
      name: 'scan-nfc-cards',
      label: 'Scan NFC Cards',
      href: '/admin/nfc',
      icon: 'nfc',
      type: 'product',
      color:
        'bg-origin/40 dark:bg-dark-origin/40 group-hover:bg-origin/80 dark:group-hover:bg-dark-origin/80',
      description: 'Scan NFC Cards to add to your products',
    },
    {
      name: 'gen-qr-codes',
      label: 'Generate QR Codes',
      href: '/admin/qrcode',
      icon: 'qr-code-bold',
      type: 'product',
      color:
        'bg-origin/40 dark:bg-dark-origin/40 group-hover:bg-origin/80 dark:group-hover:bg-dark-origin/80',
      description: 'Generate QR Codes / Add Product Items',
    },
  ]

  const dataList: RouteItem[] = [
    // {
    //   name: 'full-table',
    //   label: 'Full Table',
    //   href: '/admin/fulltable',
    //   icon: 'bullet-list-square',
    //   type: 'data',
    //   color:
    //     'bg-origin/40 dark:bg-dark-origin/40 group-hover:bg-origin/80 dark:group-hover:bg-dark-origin/80',
    //   description: 'View and manage all products in a table',
    // },
    {
      name: 'products-table',
      label: 'Products',
      href: '/admin/data',
      icon: 'bullet-list-square',
      type: 'data',
      color:
        'bg-dark-origin dark:bg-dark-origin/40 group-hover:bg-origin/80 dark:group-hover:bg-dark-origin/80',
      description: 'View and manage all products in a table',
    },
  ]

  const renderCardItem = (item: RouteItem, index: number) => (
    <Link
      key={`${item.name}_${index}`}
      href={item.href}
      className={cn(
        'group bg-dark-origin border border-origin dark:bg-dim-origin relative px-5 py-6 md:p-6 rounded-3xl shadow-sm font-figtree',
        'transition-transform duration-300 ease-in-out active:scale-90',
        'invert',
      )}>
      <div className='flex items-center space-x-6 mb-4 relative'>
        <div
          className={cn(
            'flex items-center justify-center size-8 md:size-12 rounded-xl transition-colors',
            item.color,
          )}>
          <Icon name={item.icon} className={'size-4 md:size-6'} />
        </div>
        <h3 className='md:text-lg font-semibold tracking-tight'>
          {item.label}
        </h3>
        <p
          className={cn(
            'absolute -right-2 -top-2 text-xs font-mono bg-zinc-400/20 dark:bg-background rounded-md px-2 py-1',
            {
              ' text-teal-600 dark:text-mac-teal': item.type === 'product',
              ' text-mac-blue dark:text-primary': item.type === 'data',
            },
          )}>
          <span className='capitalize'>
            {item.type === 'product' ? 'P' : 'D'}
          </span>
        </p>
      </div>

      <p className='font-figtree opacity-70 text-sm'>{item.description}</p>
    </Link>
  )

  return (
    <div>
      <div className='max-w-7xl mx-auto'>
        <div className='md:py-8'>
          <Header
            title='Admin'
            back={router.back}
            subtext='Dashboard'
            className='md:mb-8 mb-4 ml-2'
          />
          <div className='md:space-y-12 space-y-8 px-4 sm:px-6 lg:px-8'>
            <CardList title='Tools' list={tools} renderFn={renderCardItem} />
            <CardList title='Data' list={dataList} renderFn={renderCardItem} />
          </div>
        </div>
      </div>
    </div>
  )
}
