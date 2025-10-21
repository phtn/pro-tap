import {type ReactNode} from 'react'

interface RowItemProps {
  title: string
  children: ReactNode
}

export const RowItem = ({title, children}: RowItemProps) => (
  <div className=' space-y-3 mx-6'>
    <div className='w-full flex items-center px-3'>
      <span className='text-xs font-semibold uppercase tracking-widest opacity-50 font-figtree'>
        {title}
      </span>
    </div>
    {children}
  </div>
)
