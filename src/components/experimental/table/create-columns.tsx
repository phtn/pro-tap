import {Icon, IconName} from '@/lib/icons'
import {CellContext, ColumnDef, FilterFn, Row} from '@tanstack/react-table'
import {ReactNode} from 'react'
import {RowActions} from './row-actions'

// Generic filter function for text-based columns
export const filterFn = (
  row: any,
  columnId: string,
  filterValue: unknown,
): boolean => {
  const value = row.getValue(columnId)

  if (value === null || value === undefined) return false
  if (!filterValue) return true // no filter applied → keep row

  return String(value).toLowerCase().includes(String(filterValue).toLowerCase())
}

// Generic filter function for multi-select columns (like status)
export const multiSelectFilterFn = <T,>(
  row: Row<T>,
  columnId: string,
  filterValue: string[],
): boolean => {
  if (!filterValue?.length) return true
  const status = String(row.getValue(columnId))
  return filterValue.includes(status)
}

// Column factory configuration interface
export interface ColumnConfig<T> {
  header: string
  accessorKey: keyof T
  /**
   * Cell renderer function that receives CellContext
   *
   * @example
   * ```tsx
   * // Using textCell from cells.tsx
   * cell: textCell('name', 'font-medium')
   *
   * // Using dateCell from cells.tsx
   * cell: dateCell('createdAt', (date) => format(date, 'MMM dd, yyyy'))
   *
   * // Using booleanCell from cells.tsx
   * cell: booleanCell('isActive', { trueLabel: 'Active', falseLabel: 'Inactive' })
   *
   * // Custom cell renderer
   * cell: ({ getValue }) => {
   *   const value = getValue()
   *   return <span className={value > 100 ? 'text-green-600' : 'text-red-600'}>
   *     {value}
   *   </span>
   * }
   * ```
   */
  cell?: (ctx: CellContext<T, unknown>) => ReactNode
  size?: number
  filterFn?: FilterFn<T>
  enableHiding?: boolean
  enableSorting?: boolean
  meta?: Record<string, any>
}

// Action configuration interface
export interface ActionConfig<T> {
  editFn?: (row: T) => void
  deleteFn?: (row: T) => void
  customActions?: Array<{
    label: string
    icon?: IconName
    onClick: (row: T) => void
    variant?: 'default' | 'destructive'
    shortcut?: string
  }>
}

// Generic column factory function
export const createColumns = <T,>(
  columnConfigs: ColumnConfig<T>[],
  actionConfig?: ActionConfig<T>,
): ColumnDef<T>[] => {
  const columns: ColumnDef<T>[] = []

  // Add data columns based on configuration
  columnConfigs.forEach((config) => {
    const column: ColumnDef<T> = {
      header: config.header,
      accessorKey: config.accessorKey as string,
      size: config.size ?? 150,
      filterFn: config.filterFn ?? filterFn,
      enableHiding: config.enableHiding ?? true,
      enableSorting: config.enableSorting ?? true,
      ...config.meta,
    }

    // Apply cell renderer if provided
    if (config.cell) {
      column.cell = config.cell
    }

    columns.push(column)
  })

  // Add actions column if action config is provided
  if (
    actionConfig &&
    (actionConfig.editFn ||
      actionConfig.deleteFn ||
      actionConfig.customActions?.length)
  ) {
    columns.push({
      id: 'actions',
      header: () => (
        <div className='w-full flex justify-center'>
          <Icon
            name='chevron-down'
            className='size-4 dark:text-cyan-200/80 text-mac-blue/50'
          />
        </div>
      ),
      cell: ({row}) => (
        <RowActions
          row={row}
          editFn={actionConfig.editFn}
          deleteFn={actionConfig.deleteFn}
          customActions={actionConfig.customActions}
        />
      ),
      size: 0,
      enableHiding: false,
    })
  }

  return columns
}
