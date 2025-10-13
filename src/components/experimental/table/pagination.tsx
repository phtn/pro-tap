import {Button} from '@/components/ui/button'
import {Label} from '@/components/ui/label'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination'
import {Select} from '@/components/ui/select'
import {Icon} from '@/lib/icons'
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select'
import {PaginationState} from '@tanstack/react-table'
import {useId} from 'react'

export interface PageControl {
  disabledNext: boolean
  disabledPrev: boolean
  gotoNext: VoidFunction
  gotoPrev: VoidFunction
  gotoFirst: VoidFunction
  gotoLast: VoidFunction
}

interface Props {
  state: PaginationState
  rowCount: number
  setPageSize: (v: string) => void
  pageControl: PageControl
}
export const Paginator = ({
  state,
  rowCount,
  setPageSize,
  pageControl,
}: Props) => {
  const id = useId()
  return (
    <div className='flex items-center justify-between gap-8'>
      {/* Results per page */}
      <div className='flex items-center px-4'>
        <Label
          htmlFor={id}
          className='max-sm:sr-only space-x-2 font-figtree tracking-tight'>
          <span className='font-semibold text-base'>{rowCount}</span>
          <span className='opacity-80'>items</span>
        </Label>
        <Select value={state.pageSize.toString()} onValueChange={setPageSize}>
          <SelectTrigger id={id} className='w-fit whitespace-nowrap'>
            <SelectValue placeholder='Select number of results' />
          </SelectTrigger>
          <SelectContent className='[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2'>
            {[5, 10, 25, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Page number information */}
      <div className='px-4 text-muted-foreground flex grow justify-end text-sm whitespace-nowrap'>
        <p
          className='hidden text-muted-foreground text-sm whitespace-nowrap'
          aria-live='polite'>
          <span className='text-foreground'>
            {state.pageIndex * state.pageSize + 1}-
            {Math.min(
              Math.max(state.pageIndex * state.pageSize + state.pageSize, 0),
              rowCount,
            )}
          </span>{' '}
          of <span className='text-foreground'>{rowCount}</span>
        </p>
      </div>

      {/* Pagination buttons */}
      <div className='px-4'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant='outline'
                onClick={pageControl.gotoNext}
                disabled={pageControl.disabledNext}
                className='aspect-square size-8 p-0 aria-disabled:pointer-events-none aria-disabled:text-muted-foreground/50 border-none hover:bg-muted/50 dark:bg-card/64 dark:hover:bg-card/80 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0_1px_1px_rgba(0,0,0,0.05),0_2px_2px_rgba(0,0,0,0.05),0_2px_4px_rgba(0,0,0,0.05)] dark:inset-shadow-[0_1px_rgb(255_255_255/0.15)]'
                aria-label='Go to next page'>
                <Icon name='chevron-right' className='size-4' />
              </Button>
            </PaginationItem>
            {/* First page button */}
            {/* <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="disabled:pointer-events-none disabled:opacity-50"
                onClick={pageCtrl.gotoFirst}
                disabled={pageCtrl.disabledPrev}
                aria-label="Go to first page"
              >
                <ChevronFirstIcon size={16} aria-hidden="true" />
              </Button>
            </PaginationItem> */}
            {/* Previous page button */}
            {/* <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="disabled:pointer-events-none disabled:opacity-50"
                onClick={pageCtrl.gotoPrev}
                disabled={pageCtrl.disabledPrev}
                aria-label="Go to previous page"
              >
                <ChevronLeftIcon size={16} aria-hidden="true" />
              </Button>
            </PaginationItem> */}
            {/* Next page button */}

            {/* Last page button */}
            {/* <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="disabled:pointer-events-none disabled:opacity-50"
                onClick={pageCtrl.gotoLast}
                disabled={pageCtrl.disabledNext}
                aria-label="Go to last page"
              >
                <ChevronLastIcon size={16} aria-hidden="true" />
              </Button>
            </PaginationItem> */}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
