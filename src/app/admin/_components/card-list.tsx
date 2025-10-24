import {ClassName} from '@/app/types'
import {IconName} from '@/lib/icons'
import {ReactNode} from 'react'

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

interface CardListProps<T> {
  title: string
  list: T[]
  renderFn: (item: T, index: number) => ReactNode
}

export const CardList = <T,>({title, list, renderFn}: CardListProps<T>) => {
  return (
    <div>
      <h2 className='mb-4 font-figtree font-medium uppercase text-xs md:text-sm opacity-60'>
        {title}
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 max-w-6xl'>
        {list.map(renderFn)}
      </div>
    </div>
  )
}
