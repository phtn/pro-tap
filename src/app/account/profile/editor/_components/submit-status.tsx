import {cn} from '@/lib/utils'

interface SubmitStatusProps {
  status: string
}

export const SubmitStatus = ({status}: SubmitStatusProps) => {
  return (
    <div
      className={cn(
        `px-2 md:px-4 flex items-center w-fit h-7 md:h-9 text-xs md:text-sm lg:text-base rounded-lg md:rounded-xl bg-green-50 dark:bg-green-100/20 text-green-700 dark:text-green-100 tracking-tight font-figtree`,
        {
          'bg-red-100 dark:bg-red-400/80 dark:text-white text-red-700':
            status.includes('Error'),
          'bg-orange-100 text-amber-600': status.includes('Invalid'),
          'opacity-0': !status,
        },
      )}>
      <div className='flex-1'>{status}</div>
    </div>
  )
}
