import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {Checkbox} from '@/components/ui/checkbox'
import {Label} from '@/components/ui/label'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {useId} from 'react'

interface Props {
  selected: string[]
  statusCount: Map<string | boolean, number>
  uniqueValues: Array<string | boolean>
  onStatusChange: (check: boolean) => (value: string) => void
  isMobile: boolean
}
export const Filter = ({
  selected,
  statusCount,
  uniqueValues,
  onStatusChange,
  isMobile,
}: Props) => {
  const baseId = useId()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='secondary'
          className={cn(
            'relative aspect-square data-[state=open]:bg-origin/50',
          )}>
          <Icon
            name='filter'
            className={cn(
              'size-4 opacity-50',
              selected.length > 0 && 'text-mac-blue opacity-100',
            )}
          />
          <span className='capitalize hidden md:flex'>filter</span>
          {selected.length > 0 && (
            <Badge className='absolute rounded-full -top-1.5 md:-top-0.5 left-full -translate-x-3.5 md:-translate-1/2 size-5 aspect-square px-1 text-white font-space'>
              {selected.length > 99 ? '99+' : selected.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-auto min-w-36 p-3 rounded-3xl'
        align={isMobile ? 'end' : 'start'}>
        <div>
          <div className='flex items-center px-2 py-1.5 space-x-2 text-sm font-medium tracking-tight font-figtree data-[inset]:pl-8'>
            <Icon
              name='add'
              className='size-3.5 text-mac-blue dark:text-primary-hover'
            />
            <span
              className={cn(
                'italic capitalize opacity-60',
                // 'h-9 flex items-center px-3 border-b-2 border-origin/40 italic text-foreground/80 text-xs font-medium',
              )}>
              Add Filter
            </span>
          </div>
          <div className='h-0.5 bg-origin/50 my-2' />
          <div>
            {uniqueValues.map((value, i) => {
              const id = `v-${baseId}-${i}`
              const vStr = String(value)
              const labelText =
                vStr === 'true'
                  ? 'Active'
                  : vStr === 'false'
                    ? 'Inactive'
                    : vStr
              return (
                <div
                  key={id}
                  className='flex h-12 px-3  items-center gap-2 hover:bg-origin/80 rounded-2xl'>
                  <Checkbox
                    id={id}
                    checked={selected.includes(vStr)}
                    onCheckedChange={(checked) =>
                      onStatusChange(Boolean(checked))(vStr)
                    }
                  />
                  <Label
                    htmlFor={id}
                    className='flex grow justify-between gap-2 font-sans'>
                    {labelText}{' '}
                    <span className='text-muted-foreground ms-2 text-xs'>
                      {statusCount.get(value)}
                    </span>
                  </Label>
                </div>
              )
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
