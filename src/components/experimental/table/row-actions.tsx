import {Button} from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {Icon, IconName} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {Row} from '@tanstack/react-table'
import {useCallback} from 'react'

interface CustomAction<T> {
  label: string
  icon?: IconName
  onClick: (row: T) => void
  variant?: 'default' | 'destructive'
  shortcut?: string
}

interface Props<T> {
  row: Row<T>
  viewFn?: VoidFunction
  deleteFn?: (row: T) => void
  customActions?: CustomAction<T>[]
}

export const RowActions = <T,>({
  row,
  viewFn,
  deleteFn,
  customActions = [],
}: Props<T>) => {
  const handleView = useCallback(() => {
    viewFn && viewFn()
  }, [viewFn])

  const handleDelete = useCallback(() => {
    deleteFn?.(row.original)
  }, [row.original, deleteFn])

  const handleCustomAction = useCallback(
    (action: CustomAction<T>) => {
      action.onClick(row.original)
    },
    [row.original],
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size='sq'
          variant='ghost'
          className='shadow-none rounded-lg cursor-pointer data-[state=open]:bg-origin/50'
          aria-label='More'>
          <Icon
            solid
            name='text-align-right'
            className='text-muted-foreground size-4'
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        alignOffset={12}
        className='rounded-3xl md:p-3 p-2.5 border-origin md:min-w-40'>
        {customActions.length > 0 && (
          <DropdownMenuGroup>
            {customActions.map((action, index) => (
              <DropdownMenuItem
                key={index}
                className={cn(
                  'h-14',
                  action.variant === 'destructive'
                    ? 'text-destructive focus:text-destructive'
                    : '',
                )}
                onClick={() => handleCustomAction(action)}>
                {action.icon && (
                  <Icon name={action.icon} className='size-4 mr-2' />
                )}
                <span>{action.label}</span>
                {action.shortcut && (
                  <DropdownMenuShortcut>{action.shortcut}</DropdownMenuShortcut>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        )}

        {customActions.length > 0 && <DropdownMenuSeparator />}

        <DropdownMenuGroup className='space-y-2 tracking-tight font-figtree'>
          <DropdownMenuItem asChild className='h-12 rounded-2xl px-4'>
            <button onClick={handleView} className='w-full'>
              <Icon name='eye' className='size-4 mr-2' />
              <span>View</span>
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem className='h-12 rounded-2xl px-4'>
            <Icon name='pencil' className='size-4 mr-2' />
            <span>Edit Row</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup className='space-y-2 tracking-tight font-figtree'>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className='h-12 rounded-2xl pl-3'>
              <Icon name='chevron-left' className='size-5 opacity-60' />
              <span className='w-full pl-3.5'>Export</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent
                className='rounded-3xl md:p-3 p-2.5 md:min-w-40 border-origin tracking-tight font-figtree'
                alignOffset={-8}
                sideOffset={4}>
                <DropdownMenuItem className='h-12 rounded-2xl px-4 dark:focus:bg-origin/40'>
                  <Icon name='printer' className='size-4 mr-2' />
                  Print
                </DropdownMenuItem>
                <DropdownMenuItem className='h-12 rounded-2xl px-4 dark:focus:bg-origin/40'>
                  <Icon name='json' className='size-4 mr-2' />
                  Copy JSON
                </DropdownMenuItem>
                <DropdownMenuSeparator className=' dark:bg-origin/30' />
                <DropdownMenuItem className='h-12 rounded-2xl px-4 focus:bg-indigo-300/30 dark:focus:bg-origin/40'>
                  <Icon name='pawn' className='size-4 mr-2' />
                  Advanced
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        {deleteFn && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='text-destructive focus:text-destructive'
              onClick={handleDelete}>
              <Icon name='close' className='size-4 mr-2' />
              <span>Delete</span>
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
