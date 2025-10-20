import {ModernInput} from '@/components/ui/input'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {Column} from '@tanstack/react-table'
import {useEffect, useId, useRef} from 'react'

interface Props<T> {
  col: Column<T, unknown>
}
export const Search = <T,>({col}: Props<T>) => {
  const {getFilterValue} = col
  const inputRef = useRef<HTMLInputElement>(null)
  const id = useId()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === '/' &&
        inputRef.current &&
        document.activeElement !== inputRef.current
      ) {
        event.preventDefault()
        inputRef.current.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className='relative'>
      <ModernInput
        id={`input-${id}`}
        ref={inputRef}
        className={cn(
          'peer md:h-10 dark:bg-background/40 w-28 md:min-w-60 ps-3 rounded-lg border-none',
          '',
          Boolean(getFilterValue()) && 'pe-10',
        )}
        value={(col?.getFilterValue() ?? '') as string}
        onChange={(e) => col?.setFilterValue(e.target.value)}
        placeholder='Search'
        type='text'
        inputMode='text'
        aria-label='Search'
      />
      <div className='text-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2 peer-disabled:opacity-50'>
        <Icon
          name='slash-bold'
          aria-hidden='true'
          className='size-6 md:opacity-20 opacity-0'
        />
      </div>
      {Boolean(col?.getFilterValue()) && (
        <button
          className='hidden text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 _flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
          aria-label='Clear filter'
          onClick={() => {
            col?.setFilterValue('')
            if (inputRef.current) {
              inputRef.current.focus()
            }
          }}>
          <Icon name='close' size={16} aria-hidden='true' />
        </button>
      )}
    </div>
  )
}
