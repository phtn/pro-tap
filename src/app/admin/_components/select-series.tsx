import {Dispatch, SetStateAction, useCallback, useId} from 'react'

import {Label} from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {CardSeries} from '../../../../convex/cards/d'

interface Props {
  disabled: boolean
  setSeries: Dispatch<SetStateAction<CardSeries>>
}

export function SeriesSelect({setSeries, disabled}: Props) {
  const id = useId()
  const handleSeriesChange = useCallback(
    (value: CardSeries) => {
      setSeries(value)
    },
    [setSeries],
  )

  return (
    <div className='*:not-first:mt-2'>
      <Label htmlFor={id}>
        <span className='opacity-60 md:text-base text-xs tracking-tight font-figtree'>
          Series
        </span>
      </Label>
      <Select defaultValue='individual' onValueChange={handleSeriesChange}>
        <SelectTrigger
          id={id}
          disabled={disabled}
          className='text-xs md:text-sm border-transparent font-space tracking-tight whitespace-nowrap bg-muted dark:bg-origin shadow-none rounded-lg w-28 md:w-40 md:h-10 h-7'>
          <SelectValue
            placeholder='Select series'
            className='text-xs md:text-sm'
          />
        </SelectTrigger>
        <SelectContent sideOffset={2} className='font-space z-80 space-y-2'>
          <SelectItem value='individual'>Individual</SelectItem>
          <SelectItem value='limited-edition'>Limited Edition</SelectItem>
          <SelectItem value='fleet'>Fleet</SelectItem>
          <SelectItem value='other'>Other</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
