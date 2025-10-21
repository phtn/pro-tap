import {
  booleanCell,
  dateCell,
  textCell,
} from '@/components/experimental/table/cells'
import {ColumnConfig} from '@/components/experimental/table/create-columns'
import {RowActions} from '@/components/experimental/table/row-actions'
import {useMobile} from '@/hooks/use-mobile'
import {useToggle} from '@/hooks/use-toggle'
import {
  getAllIndividualCards,
  ProtapActivationInfo,
  ProtapCardDoc,
} from '@/lib/firebase/cards'
import {Icon} from '@/lib/icons'
import {FilterFn} from '@tanstack/react-table'
import {format} from 'date-fns'
import {Effect, Option} from 'effect'
import {Timestamp} from 'firebase/firestore'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {CardItemSheet} from '../../_components/card-item-sheet'
import {HyperTable} from '../_components/hyper-table'

interface ProductsTableProps {
  query: string
}

export const ProductsTable = ({query = 'individual'}: ProductsTableProps) => {
  const [data, setData] = useState<ProtapCardDoc[]>()
  const [loading, setLoading] = useState(true)

  const [selectedItem, setSelectedItem] = useState<ProtapActivationInfo | null>(
    null,
  )
  const isMobile = useMobile()
  const {on: open, toggle} = useToggle()
  const onOpenChange = (open: boolean) => {
    if (!open) {
      toggle()
      setSelectedItem(null)
    }
  }

  const handleView = (item: ProtapCardDoc) => {
    setSelectedItem(item)
    toggle()
  }

  const viewer = {open, onOpenChange}

  const groupFilter: FilterFn<ProtapCardDoc> = (row, id, filterValue) => {
    const group = row.getValue(id)
    return group === filterValue
  }

  const columns = useMemo(
    () =>
      [
        {
          id: 'serialNumber',
          header: 'Serial Number',
          accessorKey: 'serialNumber',
          cell: textCell('serialNumber', 'font-space text-muted-foreground'),
          size: 150,
          enableHiding: true,
          enableSorting: true,
        },
        {
          id: 'ownerId',
          header: 'Owner',
          accessorKey: 'ownerId',
          cell: textCell('ownerId', 'font-mono truncate text-clip w-[10ch]'),
          size: 150,
          enableHiding: true,
          enableSorting: true,
          filterFn: () => {},
        },
        {
          id: 'group',
          header: 'Group',
          accessorKey: 'group',
          cell: textCell('group', 'font-mono truncate text-clip w-[10ch]'),
          size: 150,
          enableHiding: true,
          enableSorting: true,
          filterFn: groupFilter,
        },
        {
          id: 'createdByName',
          header: 'Created By',
          accessorKey: 'createdByName',
          size: 150,
          enableHiding: true,
          enableSorting: true,
        },
        {
          id: 'isActive',
          header: 'Status',
          accessorKey: 'isActive',
          cell: booleanCell(
            'isActive',
            {trueLabel: 'Active', falseLabel: 'Inactive'},
            'w-fit rounded-full flex items-center border-zinc-200 dark:border-zinc-700 border-[0.33px] py-0.5 px-1.5 capitalized font-space text-sm tracking-tighter',
          ),
          size: 100,
          enableHiding: true,
          enableSorting: true,
        },
        {
          id: 'createdAt',
          header: 'Created At',
          accessorKey: 'createdAt',
          cell: dateCell<ProtapCardDoc>(
            'createdAt',
            (date) =>
              format(
                date instanceof Date
                  ? date
                  : date instanceof Timestamp
                    ? date.toDate()
                    : new Date(),
                'PPpp',
              ),
            'font-space text-muted-foreground',
          ),
          size: 180,
          enableHiding: true,
          enableSorting: true,
        },
        {
          id: 'actions',
          accessorKey: 'id',
          header: (
            <div className='w-fit flex justify-center px-1.5'>
              <Icon name='settings' className='size-4 md:size-5 opacity-80' />
            </div>
          ),
          cell: ({row}) => (
            <RowActions row={row} viewFn={() => handleView(row.original)} />
          ),
          size: 0,
          enableHiding: false,
          enableSorting: false,
        },
      ] as ColumnConfig<ProtapCardDoc>[],
    [],
  )

  const fetchDataEffect = useMemo(
    () =>
      Effect.promise(() => getAllIndividualCards(query)).pipe(
        Effect.map((result) =>
          Option.fromNullable(result).pipe(
            Option.getOrElse(() => [] as ProtapCardDoc[]),
          ),
        ),
        Effect.tap((cards) => setData(cards)),
        // Effect.tap((cards) => console.log(JSON.stringify(cards, null, 2))),
        Effect.tapError((error) =>
          Effect.sync(() => console.error('Failed to fetch cards:', error)),
        ),
      ),
    [query],
  )

  const runFetch = useCallback(async () => {
    setLoading(true)
    try {
      await Effect.runPromise(fetchDataEffect)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    runFetch()
  }, [runFetch])

  useEffect(() => {
    console.log(open)
  }, [open])

  return (
    <div className='relative'>
      {data && data.length > 0 && (
        <HyperTable
          title={query}
          viewer={viewer}
          data={data ?? []}
          columns={columns}
          loading={loading}
        />
      )}

      <CardItemSheet
        {...viewer}
        side='right'
        item={selectedItem}
        isMobile={isMobile}
      />
    </div>
  )
}
