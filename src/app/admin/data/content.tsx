'use client'

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

  return (
    <div className='md:flex w-full overflow-y-scroll pt-8 pb-28 md:space-y-12 space-y-8 px-4 sm:px-6 lg:px-8'>
      <CardList title='Series' list={products as DataRouteItem[]} />
    </div>
  )
}
