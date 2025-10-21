import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {Checkbox} from '@/components/ui/checkbox'
import {Label} from '@/components/ui/label'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {Column} from '@tanstack/react-table'
import {useId, useMemo, useState} from 'react'

interface Props<T> {
  columns: Column<T, unknown>[]
  activeFilterColumns?: Column<T, unknown>[]
  onFilterColumnsChange?: (columns: Column<T, unknown>[]) => void
  isMobile: boolean
}
export const Filter = <T,>({
  columns,
  activeFilterColumns = [],
  onFilterColumnsChange,
  isMobile,
}: Props<T>) => {
  const baseId = useId()
  const [filterUpdateTrigger, setFilterUpdateTrigger] = useState(0)
  const [checkboxUpdateKey, setCheckboxUpdateKey] = useState(0)

  // Get filterable columns (exclude select and actions columns)
  const filterableColumns = useMemo(
    () =>
      columns.filter(
        (col) =>
          col.getCanFilter() && col.id !== 'select' && col.id !== 'actions',
      ),
    [columns],
  )

  // Get available columns (not currently being filtered)
  const availableColumns = useMemo(
    () =>
      filterableColumns.filter(
        (col) =>
          !activeFilterColumns.some((activeCol) => activeCol.id === col.id),
      ),
    [filterableColumns, activeFilterColumns],
  )

  // Get all active filters data - reactive to column filter changes
  const activeFiltersData = useMemo(() => {
    return activeFilterColumns.map((column) => {
      const facetedValues = column.getFacetedUniqueValues()
      const filterValue = column.getFilterValue() as string[] | undefined

      return {
        column,
        uniqueValues: Array.from(facetedValues.keys()).sort(),
        valueCounts: facetedValues as Map<string | number | boolean, number>,
        selectedValues: filterValue ?? [],
      }
    })
  }, [activeFilterColumns, filterUpdateTrigger, checkboxUpdateKey])

  // Calculate total active filter count - reactive to filter changes
  const totalActiveFilters = useMemo(() => {
    return activeFiltersData.reduce((total, filterData) => {
      return total + filterData.selectedValues.length
    }, 0)
  }, [activeFiltersData])

  const handleColumnAdd = (columnId: string) => {
    const column = filterableColumns.find((col) => col.id === columnId)
    if (column && !activeFilterColumns.some((col) => col.id === columnId)) {
      const newActiveColumns = [...activeFilterColumns, column]
      onFilterColumnsChange?.(newActiveColumns)

      // Force re-render to update UI state
      setFilterUpdateTrigger((prev) => prev + 1)
    }
  }

  const handleColumnRemove = (columnId: string) => {
    const column = activeFilterColumns.find((col) => col.id === columnId)
    if (column) {
      // Clear the filter before removing
      column.setFilterValue(undefined)
      const newActiveColumns = activeFilterColumns.filter(
        (col) => col.id !== columnId,
      )
      onFilterColumnsChange?.(newActiveColumns)

      // Force re-render to update UI state
      setFilterUpdateTrigger((prev) => prev + 1)
    }
  }

  const formatLabel = (value: unknown) => {
    if (typeof value === 'boolean') {
      return value ? 'Active' : 'Inactive'
    }
    if (typeof value === 'string' && value.length === 0) {
      return 'Empty'
    }
    return String(value)
  }

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
              (totalActiveFilters > 0 || activeFilterColumns.length > 0) &&
                'text-mac-blue opacity-100',
            )}
          />
          <span className='capitalize hidden md:flex'>filter</span>
          {totalActiveFilters > 0 && (
            <Badge className='absolute rounded-full -top-1.5 md:-top-0.5 left-full -translate-x-3.5 md:-translate-1/2 size-5 aspect-square px-1 text-white font-space'>
              {totalActiveFilters > 99 ? '99+' : totalActiveFilters}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-auto min-w-44 p-3 rounded-3xl'
        align={isMobile ? 'end' : 'start'}>
        <div>
          {/* Add Filter Section */}
          {availableColumns.length > 0 && (
            <>
              <div className='mb-3'>
                <div className='hidden _flex items-center px-2 py-1.5 space-x-2 text-sm font-medium tracking-tight font-figtree'>
                  <Icon
                    name='add'
                    className='size-3.5 text-mac-blue dark:text-primary-hover'
                  />
                  <span className='italic capitalize opacity-60'>
                    Add Filter
                  </span>
                </div>
                <Select onValueChange={handleColumnAdd}>
                  <SelectTrigger className='w-full flex items-center space-x-2 text-sm font-medium tracking-tight font-figtree mt-1 h-10 rounded-2xl shadow-none bg-origin'>
                    <Icon
                      name='add'
                      className='size-3.5 text-mac-blue dark:text-primary-hover'
                    />
                    <SelectValue placeholder='Add Columns' />
                  </SelectTrigger>
                  <SelectContent className='z-60 min-w-44 p-3 rounded-3xl'>
                    {availableColumns.map((column) => (
                      <SelectItem key={column.id} value={column.id}>
                        {typeof column.columnDef.header === 'string'
                          ? column.columnDef.header
                          : column.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='h-0.5 bg-origin/50 my-2' />
            </>
          )}

          {/* Active Filters */}
          {activeFiltersData.map((filterData, columnIndex) => (
            <div key={filterData.column.id} className='mb-4 last:mb-0'>
              {/* Filter Header */}
              <div className='flex items-center justify-between px-2 py-1.5'>
                <div className='flex items-center space-x-2 text-sm font-medium tracking-tight font-figtree'>
                  <Icon
                    name='filter'
                    className='size-3.5 text-mac-blue dark:text-primary-hover'
                  />
                  <span className='italic capitalize opacity-60'>
                    {typeof filterData.column.columnDef.header === 'string'
                      ? filterData.column.columnDef.header
                      : filterData.column.id}
                  </span>
                </div>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => handleColumnRemove(filterData.column.id)}
                  className='h-6 w-6 p-0 text-muted-foreground hover:text-destructive'>
                  <Icon name='close' className='size-3' />
                </Button>
              </div>

              {/* Filter Values */}
              <div className='max-h-32 overflow-y-auto'>
                {filterData.uniqueValues.map((value, i) => {
                  const id = `v-${baseId}-${columnIndex}-${i}`
                  const vStr = String(value)
                  const labelText = formatLabel(value)
                  const count = filterData.valueCounts.get(value) ?? 0

                  return (
                    <div
                      key={id}
                      className='flex h-10 px-3 items-center gap-2 hover:bg-origin/80 rounded-lg'>
                      <Checkbox
                        id={id}
                        checked={filterData.selectedValues.includes(vStr)}
                        onCheckedChange={(checked) => {
                          const column = activeFilterColumns.find(
                            (col) => col.id === filterData.column.id,
                          )
                          if (!column) return

                          const currentFilter =
                            column.getFilterValue() as string[]
                          const newFilterValue = currentFilter
                            ? [...currentFilter]
                            : []

                          if (checked) {
                            // Add value if not already present
                            if (!newFilterValue.includes(vStr)) {
                              newFilterValue.push(vStr)
                            }
                          } else {
                            // Remove value if present
                            const index = newFilterValue.indexOf(vStr)
                            if (index > -1) {
                              newFilterValue.splice(index, 1)
                            }
                          }

                          column.setFilterValue(
                            newFilterValue.length ? newFilterValue : undefined,
                          )

                          // Force re-render to update UI state - need to trigger both the column change and our local state
                          setFilterUpdateTrigger((prev) => prev + 1)
                          setCheckboxUpdateKey((prev) => prev + 1)
                        }}
                      />
                      <Label
                        htmlFor={id}
                        className='flex grow justify-between gap-2 font-sans text-sm'>
                        <span className='truncate'>{labelText}</span>
                        <span className='text-muted-foreground text-xs shrink-0'>
                          {count}
                        </span>
                      </Label>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {activeFilterColumns.length === 0 && (
            <div className='px-2 py-4 text-center text-sm text-muted-foreground'>
              No active filters.
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
