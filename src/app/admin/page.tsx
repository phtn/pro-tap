'use client'
import {type ClassName} from '@/app/types'
import {Icon, type IconName} from '@/lib/icons'
import {cn} from '@/lib/utils'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useEffect, useState} from 'react'

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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // If we're on the main admin page, redirect to qrcode by default
  // useEffect(() => {
  //   if (mounted && pathname === '/admin') {
  //     router.replace('/admin/qrcode')
  //   }
  // }, [mounted, pathname, router])

  if (!mounted) {
    return <div>Loading...</div>
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
        'bg-green-100 dark:bg-green-900 group-hover:bg-green-200 dark:group-hover:bg-green-800',
      description: 'Scan and manage NFC cards for your products',
    },
    {
      name: 'gen-qr-codes',
      label: 'Generate QR Codes',
      href: '/admin/qrcode',
      icon: 'qr-code-bold',
      color:
        'bg-red-200 dark:bg-red-700 group-hover:bg-red-200 dark:group-hover:bg-red-500',
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
        'bg-indigo-200 dark:bg-indigo-600 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-500',
      description: 'View and manage all products in a table',
    },
  ]

  return (
    <div className='min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='py-8'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-8 tracking-tighter font-figtree'>
            Admin <span className='font-light'>Dashboard</span>
          </h1>
          <div className='space-y-8'>
            <div>
              <h2 className='mb-4 font-space font-medium uppercase text-sm opacity-80'>
                Tools
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl'>
                {tools.map((tool, index) => (
                  <Link
                    key={`${tool.name}_${index}`}
                    href={tool.href}
                    className='group bg-dark-origin relative p-6 rounded-xl shadow-sm'>
                    <div className='flex items-center space-x-6 mb-4'>
                      <div
                        className={cn(
                          'flex items-center justify-center size-12 rounded-lg  transition-colors',
                          tool.color,
                        )}>
                        <Icon name={tool.icon} className={'size-6'} />
                      </div>
                      <h3 className='text-lg font-semibold tracking-tight'>
                        {tool.label}
                      </h3>
                    </div>

                    <p className='font-figtree opacity-70 text-sm'>
                      {tool.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className='mb-4 font-space font-medium uppercase text-sm opacity-80'>
                Data
              </h2>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl'>
                {dataList.map((item, index) => (
                  <Link
                    key={`${item.name}_${index}`}
                    href={item.href}
                    className='group relative bg-dark-origin p-6 rounded-xl shadow-xs'>
                    <div className='flex items-center space-x-6 mb-4'>
                      <div
                        className={cn(
                          'flex items-center justify-center size-12 rounded-lg  transition-colors',
                          item.color,
                        )}>
                        <Icon name={item.icon} className={'size-6'} />
                      </div>
                      <h3 className='text-lg font-semibold tracking-tight'>
                        {item.label}
                      </h3>
                    </div>

                    <p className='font-figtree opacity-70 text-sm'>
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
