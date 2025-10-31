import {Icon} from '@/lib/icons'
import Link from 'next/link'
import {ReactNode} from 'react'

interface DetailItem {
  label: string
  value: string
}

interface NeobrutalistCardProps {
  tag?: string
  title: ReactNode
  description: string
  details: DetailItem[]
  action?: string
  children?: ReactNode
  actionLink: string
}

export function NeobrutalistCard({
  tag,
  title,
  description,
  details,
  action,
  children,
  actionLink,
}: NeobrutalistCardProps) {
  return (
    <div className='w-full max-w-md'>
      {/* Card Container */}
      <div className='bg-white border-4 border-foreground p-0 shadow-lg'>
        {/* Header Section */}
        <div className='flex justify-between bg-black'>
          <div className='border-b-4 border-black p-6  text-white'>
            {tag && (
              <div className='text-xs font-black tracking-widest mb-4 opacity-80 uppercase'>
                {tag}
              </div>
            )}
            <h2 className='text-3xl font-black leading-tight text-balance'>
              {title}
            </h2>
          </div>
          <div className='text-white'>{children}</div>
        </div>
        {/* Content Section */}
        <div className='p-6 space-y-6'>
          {/* Description */}
          <p className='text-lg font-bold tracking-tight text-balance'>
            {description}
          </p>

          {/* Details Grid */}
          <div className='grid grid-cols-3 gap-3 border-4 border-black p-4 bg-gray-50'>
            {details.map((detail, idx) => (
              <div key={idx} className='text-center'>
                <div className='dark:text-background uppercase text-xs font-bold mb-1 opacity-60'>
                  {detail.label}
                </div>
                <div className='font-black text-sm leading-tight'>
                  {detail.value}
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          {action && (
            <Link
              href={actionLink}
              className='uppercase flex items-center justify-center space-x-4 w-full bg-black text-white border-4 border-black font-black text-sm tracking-widest py-4 px-6 hover:bg-white hover:text-black transition-colors duration-200 active:scale-95'>
              <span>{action}</span>
              <Icon name='chevron-right' className='size-4' />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
