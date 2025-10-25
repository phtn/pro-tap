import {ClassName} from '@/app/types'
import {Icon, IconName} from '@/lib/icons'
import {cn} from '@/lib/utils'
import Link from 'next/link'

export interface DataRouteItem {
  name: string
  label: string
  href: string
  type: 'products' | 'orders' | 'users' | 'chats'
  icon: IconName
  color: ClassName
  description?: string
  disabled?: boolean
}
export interface RouteItem {
  name: string
  label: string
  href: string
  type: 'product' | 'order' | 'user' | 'settings' | 'debug' | 'data' | 'monitor'
  icon: IconName
  color: ClassName
  description?: string
}

interface CardListProps {
  title: string
  list: (RouteItem | DataRouteItem)[]
}

export const CardList = ({title, list}: CardListProps) => {
  return (
    <div className=' max-w-6xl'>
      <h2 className='mb-4 font-figtree font-medium uppercase text-xs md:text-sm opacity-60'>
        {title}
      </h2>
      <div className='flex space-x-4 md:space-x-8'>
        {list.map((item) => (
          <ListItem key={item.name} item={item} />
        ))}
      </div>
    </div>
  )
}

interface ListItemProps {
  item: RouteItem | DataRouteItem
}
const ListItem = ({item}: ListItemProps) => (
  <Link
    href={item.href}
    className={cn(
      'px-5 py-6 md:p-6 rounded-3xl font-figtree',
      'transition-transform duration-300 ease-in-out active:scale-90',
      'border-[0.33px] border-origin bg-white dark:bg-greyed',
    )}>
    <div className='flex items-center space-x-6 mb-4 relative'>
      <div
        className={cn(
          'flex items-center justify-center size-8 md:size-12 rounded-xl transition-colors',
          item.color,
        )}>
        <Icon name={item.icon} className={'size-4 md:size-6'} />
      </div>
      <h3 className='md:text-lg font-semibold tracking-tight'>{item.label}</h3>
      <p
        className={cn(
          'absolute -right-2 -top-2 text-xs font-mono rounded-md dark:bg-white px-2 py-1',
          {
            ' text-black dark:text-mac-teal': item.type === 'product',
            ' text-red-700 dark:text-primary': item.type === 'data',
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
