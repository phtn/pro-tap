'use client'
import {
  Cell,
  Column,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'

import {HyperCard} from '@/components/experimental/card/hyper-card'
import {ChangeEvent, useCallback, useMemo, useRef, useState} from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {useMobile} from '@/hooks/use-mobile'
import {useToggle} from '@/hooks/use-toggle'
import {cn} from '@/lib/utils'
import {ColumnSort} from './column-sort'
import {ColumnView} from './column-view'
import {ActionConfig, ColumnConfig, createColumns} from './create-columns'
import {ExportTable} from './export-table'
import {Filter} from './filter'
import {PageControl, Paginator} from './pagination'
import {Search} from './search'
import {SelectToggle} from './select-toggle'

interface TableProps<T> {
  data: T[]
  title?: string
  loading: boolean
  editingRowId: string | null
  columnConfigs: ColumnConfig<T>[]
  actionConfig?: ActionConfig<T>
}

export const DataTable = <T,>({
  data,
  loading,
  editingRowId,
  columnConfigs,
  actionConfig,
  title = 'Data Table',
}: TableProps<T>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const inputRef = useRef<HTMLInputElement>(null)

  const [globalFilter, setGlobalFilter] = useState<string>('')
  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setGlobalFilter(e.target.value)
  }
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  })

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'createdAt',
      desc: false,
    },
  ])

  const [_data] = useState<T[]>(data)

  // const handleDeleteRows = () => {
  //   const selectedRows = table.getSelectedRowModel().rows;
  //   const updatedData = d.filter(
  //     (item) => !selectedRows.some((row) => row.original.id === item.id),
  //   );
  //   setData(updatedData);
  //   table.resetRowSelection();
  // };

  const {on: selectOn, toggle: selectToggle} = useToggle()
  const columns = createColumns(columnConfigs, actionConfig, selectOn)

  const table = useReactTable({
    data: _data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination,
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
  })

  // State for active filter columns
  const [activeFilterColumns, setActiveFilterColumns] = useState<
    Column<T, unknown>[]
  >([])

  const allCols = table.getAllColumns().filter((c) => c.getCanHide()) as Column<
    T,
    unknown
  >[]

  const paginationState = table.getState().pagination
  const rowCount = table.getRowCount()
  const setPageSize = useCallback(
    (value: string) => table.setPageSize(+value),
    [table],
  )
  const pageControl: PageControl = {
    gotoFirst: () => table.firstPage(),
    disabledPrev: !table.getCanPreviousPage(),
    gotoPrev: () => table.previousPage(),
    disabledNext: !table.getCanNextPage(),
    gotoNext: () => table.nextPage(),
    gotoLast: () => table.lastPage(),
  }

  const tableRows = table.getRowModel().rows
  const selectedRows = useMemo(
    () => table.getSelectedRowModel().rows ?? [],
    [rowSelection],
  )

  const isMobile = useMobile()

  return (
    <div
      className={cn(
        'text-foreground flex w-full overflow-hidden gap-x-4 transition-[max-width] duration-500 ease-in-out will-change-[max-width] md:max-w-[100vw] xl:max-w-[100vw]',
      )}>
      <HyperCard className='dark:bg-greyed/80 mb-2 h-[92lvh] inset-0 dark:inset-0 md:rounded-4xl pt-2 md:pt-6 pb-4 flex-1 min-w-0 overflow-hidden'>
        <div className='px-2 md:px-3 md:mb-0 flex items-center justify-between'>
          <div className='flex items-center gap-1 md:gap-4'>
            <Title title={title} />
            <div className='flex items-center space-x-1 md:space-x-3'>
              <Search
                ref={inputRef}
                onChange={handleFilterChange}
                value={globalFilter}
              />
              <SelectToggle
                on={selectOn}
                toggleFn={selectToggle}
                rows={selectedRows}
              />
              <Filter
                columns={allCols}
                activeFilterColumns={activeFilterColumns}
                onFilterColumnsChange={setActiveFilterColumns}
                isMobile={isMobile}
              />
              <ColumnView cols={allCols} isMobile={isMobile} />
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <ExportTable loading={loading} />
          </div>
        </div>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className='hover:bg-sidebar-border/60 bg-origin/20 border-0'>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        style={{width: `${header.getSize()}px`}}
                        className='md:h-10 h-8 font-normal font-space tracking-tighter md:tracking-tight text-xs md:text-sm border-b-[0.5px] dark:text-zinc-400 dark:bg-greyed'>
                        <ColumnSort flexRender={flexRender} header={header} />
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {tableRows.length ? (
                tableRows.map((row) =>
                  renderRow(row, editingRowId, row.id, selectOn),
                )
              ) : (
                <EmptyTable colSpan={columns.length} />
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Paginator
          state={paginationState}
          rowCount={rowCount}
          setPageSize={setPageSize}
          pageControl={pageControl}
        />
      </HyperCard>
    </div>
  )
}

const renderRow = <T,>(
  row: Row<T>,
  editingRowId: string | null,
  rowId: string,
  showSelectColumn?: boolean,
) => {
  const isEditing = editingRowId === rowId

  const handleRowClick = (e: React.MouseEvent) => {
    // Don't toggle selection if clicking on interactive elements
    if (
      e.target instanceof HTMLElement &&
      (e.target.closest('button') ||
        e.target.closest('input') ||
        e.target.closest('a') ||
        e.target.closest('[role="button"]'))
    ) {
      return
    }

    // Only toggle if select mode is on and row can be selected
    if (showSelectColumn && row.getCanSelect()) {
      row.getToggleSelectedHandler()({})
    }
  }

  return (
    <TableRow
      key={row.id}
      data-state={row.getIsSelected() && 'selected'}
      className={cn(
        'h-14 md:h-16 text-foreground md:text-base text-xs overflow-hidden dark:border-greyed group/row dark:hover:bg-background/40 border-b-origin/40',
        'peer-hover:border-transparent bg-transparent hover:last:rounded-tr-2xl hover:bg-primary-hover/5',
        'transition-colors duration-75',
        {
          // Apply editing styles - same as hover but persistent
          ' dark:bg-sky-600/40 last:rounded-tr-2xl': isEditing,
          // Add cursor pointer when select mode is on
          'cursor-pointer': showSelectColumn && row.getCanSelect(),
        },
      )}
      onClick={handleRowClick}>
      {row.getVisibleCells().map((cell) => renderCell(cell, isEditing))}
    </TableRow>
  )
}

const renderCell = <TData, TValue>(
  cell: Cell<TData, TValue>,
  isEditing: boolean,
) => (
  <TableCell
    key={cell.id}
    className={cn(
      'last:py-0 overflow-hidden dark:group-hover/row:bg-chalk-100/5',
      'transition-colors duration-300',
      {
        // Apply editing cell styles - same as hover but persistent
        'dark:bg-chalk-100/5': isEditing,
      },
    )}>
    {flexRender(cell.column.columnDef.cell, cell.getContext())}
  </TableCell>
)

const TableContainer = ({children}: {children: React.ReactNode}) => (
  <div className='bg-transparent h-[calc(100vh-100px)] md:h-[calc(100vh-124px)] overflow-auto'>
    {children}
  </div>
)

const Title = ({title}: {title: string}) => (
  <div className='w-fit max-w-[8ch] md:max-w-[20ch] md:w-full md:mx-4'>
    <h2 className='capitalize text-lg leading-4 md:leading-5 md:text-2xl font-bold font-figtree tracking-tighter'>
      {title}
    </h2>
  </div>
)

const EmptyTable = ({colSpan}: {colSpan: number}) => (
  <TableRow>
    <TableCell
      colSpan={colSpan}
      className='h-24 text-center rounded-xl font-space text-muted-foreground'>
      No results.
    </TableCell>
  </TableRow>
)
