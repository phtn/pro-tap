import {cn} from '@/lib/utils'

interface SubmitStatusProps {
  status: string
}

export const SubmitStatus = ({status}: SubmitStatusProps) => {
  return (
    <div
      className={cn(
        `border mb-3 md:mb-4 px-2 md:px-4 flex items-center w-full h-7 md:h-12 text-xs md:text-sm lg:text-base rounded-lg md:rounded-xl bg-green-100 text-green-700 tracking-tight font-figtree md:font-medium`,
        {
          'bg-red-100 dark:bg-red-400/80 dark:text-white text-red-700':
            status.includes('Error'),
          'bg-orange-100 text-orange-700': status.includes('Invalid'),
          'opacity-0': !status,
        },
      )}>
      {status}
    </div>
  )
}
