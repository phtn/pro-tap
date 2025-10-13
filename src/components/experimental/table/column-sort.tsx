import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import type {CoreHeader, Renderable} from '@tanstack/react-table'
import type {JSX, ReactNode} from 'react'

interface Props<TData, TValue> {
  header: CoreHeader<TData, TValue>
  flexRender: <T extends object>(
    Comp: Renderable<T>,
    props: T,
  ) => ReactNode | JSX.Element
}
export const ColumnSort = <TData, TValue>({
  header,
  flexRender,
}: Props<TData, TValue>) => {
  const handleSort = () => {
    return header.column.toggleSorting()
  }

  return header.isPlaceholder ? null : header.column.getCanSort() ? (
    <div
      className={cn(
        header.column.getCanSort() &&
          'flex h-full cursor-pointer items-center gap-4 select-none',
      )}
      onClick={handleSort}
      onKeyDown={(e) => {
        // Enhanced keyboard handling for sorting
        if (
          header.column.getCanSort() &&
          (e.key === 'Enter' || e.key === ' ')
        ) {
          e.preventDefault()
          handleSort()
        }
      }}
      tabIndex={header.column.getCanSort() ? 0 : undefined}>
      {flexRender(header.column.columnDef.header, header.getContext())}
      {{
        asc: (
          <Icon
            solid
            aria-hidden='true'
            name='play-solid'
            className='size-4 shrink-0 text-teal-500 -rotate-90'
          />
        ),
        desc: (
          <Icon
            solid
            aria-hidden='true'
            name='play-solid'
            className='size-4 shrink-0 text-orange-300 rotate-90'
          />
        ),
      }[header.column.getIsSorted() as string] ?? null}
    </div>
  ) : (
    flexRender(header.column.columnDef.header, header.getContext())
  )
}
