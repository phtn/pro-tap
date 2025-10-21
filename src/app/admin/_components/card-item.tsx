'use client'
import {QRCodeSVG} from '@/components/experimental/qr-viewer'
import {Card} from '@/components/ui/card'
import {Icon} from '@/lib/icons'

interface CardItemProps {
  id: string
  series: string
  group: string
  batch: string
  viewFn: VoidFunction
}

export const CardItem = ({id, series, group, batch, viewFn}: CardItemProps) => {
  return (
    <div className='flex justify-center items-center lg:justify-end'>
      <Card className='relative rounded-3xl dark:bg-origin w-full p-1 md:p-3 shadow-md'>
        <div key={id} className='flex items-center gap-1 md:gap-4 md:p-3'>
          {id && series && batch && (
            <QRCodeSVG
              className='size-[160px]'
              options={{
                content: `https://protap.ph/api/verify/?id=${id}&series=${series}&group=${group}&batch=${batch}`,
                width: 160,
                height: 160,
              }}
            />
          )}

          {/* Company Info */}
          <div className='space-y-2.5 flex flex-col justify-center pt-4'>
            <div className='flex-1 min-w-0'>
              <div className='font-semibold text-foreground tracking-tight text-sm md:text-base capitalize font-figtree leading-4'>
                {series}
              </div>
              <div className='text-xs uppercase opacity-50 font-figtree'>
                series
              </div>
            </div>
            <div className='flex-1 min-w-0'>
              <div className='font-semibold text-foreground tracking-tight text-sm md:text-base uppercase font-figtree leading-4'>
                {group}
              </div>
              <div className='text-xs uppercase opacity-50 font-figtree'>
                group
              </div>
            </div>
            <div className='flex-1 min-w-0'>
              <div className='font-semibold text-foreground tracking-tight text-sm md:text-base capitalize font-figtree leading-4'>
                {batch}
              </div>
              <div className='text-xs uppercase opacity-50 font-figtree'>
                batch
              </div>
            </div>
            <div className='flex-1 min-w-0'>
              <div className='font-semibold text-foreground tracking-tight text-sm md:text-base leading-4'>
                {id}
              </div>
              <div className='text-xs text-muted-foreground'>ID</div>
            </div>
          </div>
        </div>
        <Icon
          id={`view-${id}`}
          name='eye'
          className='z-50 absolute md:top-6 md:right-6 top-4 right-4 size-5 md:size-6 active:scale-90 transition-all duration-300 opacity-80 hover:opacity-100 cursor-pointer text-teal-500'
          onClick={viewFn}
        />
      </Card>
    </div>
  )
}
