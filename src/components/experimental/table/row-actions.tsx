import { Button } from '@/components/ui/button'
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
import { Icon, IconName } from '@/lib/icons'
import { Row } from '@tanstack/react-table'
import { useCallback } from 'react'

interface CustomAction<T> {
  label: string
  icon?: IconName
  onClick: (row: T) => void
  variant?: 'default' | 'destructive'
  shortcut?: string
}

interface Props<T> {
  row: Row<T>
  editFn?: (row: T) => void
  deleteFn?: (row: T) => void
  customActions?: CustomAction<T>[]
}

export const RowActions = <T,>({
  row,
  editFn,
  deleteFn,
  customActions = []
}: Props<T>) => {
  const handleEdit = useCallback(() => {
    editFn?.(row.original)
  }, [row.original, editFn])

  const handleDelete = useCallback(() => {
    deleteFn?.(row.original)
  }, [row.original, deleteFn])

  const handleCustomAction = useCallback((action: CustomAction<T>) => {
    action.onClick(row.original)
  }, [row.original])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='flex justify-center'>
          <Button
            size='sq'
            variant='ghost'
            className='shadow-none w-9 rounded-lg cursor-pointer'
            aria-label='More'>
            <Icon solid name='add' className='text-muted-foreground' />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {editFn && (
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleEdit}>
              <Icon name='pencil' className='size-4 mr-2' />
              <span>Edit</span>
              <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}

        {(editFn || customActions.length > 0) && <DropdownMenuSeparator />}

        {customActions.length > 0 && (
          <DropdownMenuGroup>
            {customActions.map((action, index) => (
              <DropdownMenuItem
                key={index}
                className={action.variant === 'destructive' ? 'text-destructive focus:text-destructive' : ''}
                onClick={() => handleCustomAction(action)}
              >
                {action.icon && <Icon name={action.icon} className='size-4 mr-2' />}
                <span>{action.label}</span>
                {action.shortcut && <DropdownMenuShortcut>{action.shortcut}</DropdownMenuShortcut>}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        )}

        {customActions.length > 0 && <DropdownMenuSeparator />}

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Icon name='eye' className='size-4 mr-2' />
            <span>View</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name='link' className='size-4 mr-2' />
            <span>Duplicate</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Icon name='settings' className='size-4 mr-2' />
              More
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Icon name='paperclip' className='size-4 mr-2' />
                  Print
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name='chat' className='size-4 mr-2' />
                  Email
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Icon name='settings' className='size-4 mr-2' />
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
