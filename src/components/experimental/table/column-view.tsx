import {Button} from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {Icon} from '@/lib/icons'
import {Column} from '@tanstack/react-table'

interface Props<T> {
  cols: Column<T, unknown>[]
}
export const ColumnView = <T,>({cols}: Props<T>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='secondary'
          className='select-none font-sans md:aspect-auto aspect-square'>
          <Icon name='eye' className='size-4 opacity-60' />
          <span className='hidden md:flex'>View</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='bg-dark-origin'>
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <div className='h-px bg-zinc-300 dark:bg-zinc-700'></div>
        {cols.map((column) => {
          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              className='uppercase text-xs '
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
              onSelect={(event) => event.preventDefault()}>
              {column.id}
            </DropdownMenuCheckboxItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
