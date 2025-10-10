import {Icon, type IconName} from '@/lib/icons'

interface StatItemProps {
  title: string
  value: string
  icon?: IconName
}

export const StatItem = ({icon, title, value}: StatItemProps) => {
  return (
    <div className='h-full w-full flex flex-col items-center font-figtree space-y-1'>
      <p className='opacity-60 md:text-lg text-xs tracking-tight'>{title}</p>

      <div className='flex items-center justify-center w-full text-sm md:text-xl font-figtree tracking-tight'>
        <p className='text-sm md:text-xl font-semibold font-space tracking-tight px-1'>
          {value}
        </p>
        {icon && (
          <Icon
            name={icon}
            className='size-3 md:size-4 mr-0.5 md:ml-1 text-mac-blue'
          />
        )}
      </div>
    </div>
  )
}
