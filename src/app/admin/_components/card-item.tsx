'use client'
import {QRCodeSVG} from '@/components/experimental/qr-viewer'
import {HyperList} from '@/components/list'
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
  const details = [
    {label: 'ID', value: id},
    {label: 'Series', value: series},
    {label: 'Group', value: group},
    {label: 'Batch', value: batch},
  ]
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

          <HyperList
            data={details}
            component={CardDetailItem}
            container='space-y-2.5 md:space-y-6 flex flex-col justify-center pt-4'
          />
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

interface CardDetail {
  label: string
  value: string
}
const CardDetailItem = ({label, value}: CardDetail) => (
  <div className='md:flex md:space-x-4 md:items-center flex-1 min-w-0'>
    <div className='text-xs uppercase opacity-50 font-figtree'>{label}</div>
    <div className='font-semibold text-foreground tracking-tight text-sm md:text-base font-figtree leading-4'>
      {value}
    </div>
  </div>
)
