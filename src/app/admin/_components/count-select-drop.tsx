import {RangeSliderWithInput} from '@/components/range-slider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {cn} from '@/lib/utils'
import {Dispatch, HTMLAttributes, SetStateAction, useState} from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  setSelectedQuantity: Dispatch<SetStateAction<number>>
}
export const CountSelectDrop = ({
  className,
  children,
  setSelectedQuantity,
  ...props
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn('relative', className)} {...props}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <div className='group relative p-px'>
          <DropdownMenuTrigger
            asChild
            className='rounded-full outline-0 cursor-pointer'>
            {children}
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align='end'
            sideOffset={14}
            className='w-14 px-3 py-3.5 font-figtree font-semibold bg-white dark:bg-zinc-800/6r backdrop-blur-sm border-[0.33px] border-zinc-400/40 dark:border-zinc-800/40 rounded-3xl shadow-xl shadow-zinc-900/5 dark:shadow-zinc-950/20
                          data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-top-right'>
            <RangeSliderWithInput setSelectedValue={setSelectedQuantity} />
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    </div>
  )
}
