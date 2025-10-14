import {Icon} from '@/lib/icons'

export default function Loading() {
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
