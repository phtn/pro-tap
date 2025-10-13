import {cn} from '@/lib/utils'
import {BaseTabProps} from '../account/_components/tab-activation'

export const ModernContent = () => {
  const onChange = (id: string) => {
    console.log('onChange', id)
  }
  return <ModernAdmin onChange={onChange} />
}

const ModernAdmin = ({onChange}: BaseTabProps) => {
  return (
    <div className='h-screen w-full'>
      <div className={cn('h-16 border-b bg-amber-50/0 flex items-center')}>
        <div className='grid grid-cols-12 w-full'>
          <div className='col-span-2 size-4 rounded-full bg-amber-500'></div>
          <div className='col-span-8 w-full'>
            <NavStat id={'0'} value={1000} label={'users'} />
          </div>
          <div className='col-span-2 size-4 rounded-full bg-amber-500'></div>
        </div>
      </div>
      <div className='fixed bottom-0 h-20 border-t bg-amber-50 w-full'></div>
    </div>
  )
}

interface IStat {
  id: string
  value: number | string
  label?: string
}
const NavStat = ({id, value, label}: IStat) => {
  return (
    <div
      key={id}
      className='border-none border-emerald-800 h-12 w-20 flex flex-col justify-start items-center relative'>
      <span className='text-sm md:font-semibold font-space opacity-60'>
        {label}
      </span>
      <div className='absolute bottom-0 font-semibold text-lg md:text-xl tracking-tighter'>
        {value}
      </div>
    </div>
  )
}
