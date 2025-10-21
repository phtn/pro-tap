'use client'

import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import Link from 'next/link'
import {useCallback} from 'react'
import {CardList, type DataRouteItem} from '../_components/card-list'

export const DataContent = () => {
  const products: DataRouteItem[] = [
    {
      name: 'individual',
      label: 'Individual',
      href: '/admin/data/products/individual',
      icon: 'user',
      type: 'products',
      color:
        'bg-origin/40 dark:bg-dark-origin/40 group-hover:bg-origin/80 dark:group-hover:bg-dark-origin/80',
      description: 'Manage Individual Series products',
      disabled: false,
    },
    {
      name: 'fleet',
      label: 'Fleet',
      href: '/admin/data/products/fleet',
      icon: 'ubuntu',
      type: 'products',
      color:
        'bg-origin/40 dark:bg-dark-origin/40 group-hover:bg-origin/80 dark:group-hover:bg-dark-origin/80',
      description: 'Manage Fleet Series products',
      disabled: false,
    },
    {
      name: 'limited-edition',
      label: 'Limited Edition',
      href: '/admin/data/products/limited-edition',
      icon: 'sparkle-3',
      type: 'products',
      color:
        'bg-origin/40 dark:bg-dark-origin/40 group-hover:bg-origin/80 dark:group-hover:bg-dark-origin/80',
      description: 'Manage Limited Edition Series products',
      disabled: false,
    },
  ]

  const users: DataRouteItem[] = [
    {
      name: 'active-users',
      label: 'Active Users',
      href: '/admin/data/active-users',
      icon: 'verified-outline',
      type: 'users',
      color:
        'bg-origin/40 dark:bg-dark-origin/40 group-hover:bg-origin/80 dark:group-hover:bg-dark-origin/80',
      description: 'Scan NFC Cards to add to your products',
      disabled: true,
    },
    {
      name: 'all-users',
      label: 'All Users',
      href: '/admin/data/all-users',
      icon: 'person-multiple',
      type: 'users',
      color:
        'bg-origin/40 dark:bg-dark-origin/40 group-hover:bg-origin/80 dark:group-hover:bg-dark-origin/80',
      description: 'Scan NFC Cards to add to your products',
      disabled: true,
    },
  ]

  const renderCardItem = useCallback(
    (item: DataRouteItem, index: number) => (
      <Link
        key={`${item.name}_${index}`}
        href={item.disabled ? '#' : `/admin/data/products/${item.name}`}
        className={cn(
          'group bg-dark-origin border border-origin dark:bg-dim-origin relative px-5 py-6 md:p-6 rounded-3xl shadow-sm font-figtree',
          'transition-transform duration-300 ease-in-out active:scale-90',
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
                ' text-teal-600 dark:text-mac-teal': item.type === 'products',
                ' text-mac-pink': item.type === 'users',
              },
            )}>
            <span className='capitalize'>
              {item.type === 'products' ? 'P' : 'U'}
            </span>
          </p>
        </div>

        <p className='font-figtree opacity-70 text-sm flex items-center'>
          {item.disabled && (
            <Icon
              name='road-barrier'
              className='size-3 md:size-6 mx-3 text-rose-600 dark:text-mac-pink opacity-80'
            />
          )}
          {item.disabled ? 'Development: In-Progress' : item.description}
        </p>
      </Link>
    ),
    [],
  )

  return (
    <div className='md:space-y-12 space-y-8 px-4 sm:px-6 lg:px-8'>
      <CardList title='Products' list={products} renderFn={renderCardItem} />
      <CardList title='Users' list={users} renderFn={renderCardItem} />
    </div>
  )
}
