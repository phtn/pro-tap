'use client'

import {
  booleanCell,
  dateCell,
  textCell,
} from '@/components/experimental/table/cells'
import {ColumnConfig} from '@/components/experimental/table/create-columns'
import {RowActions} from '@/components/experimental/table/row-actions'
import {useMobile} from '@/hooks/use-mobile'
import {useToggle} from '@/hooks/use-toggle'
import {Icon} from '@/lib/icons'
import {FilterFn} from '@tanstack/react-table'
import {useQuery} from 'convex/react'
import {format} from 'date-fns'
import {Timestamp} from 'firebase/firestore'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {api} from '../../../../../convex/_generated/api'
import {ICard} from '../../../../../convex/cards/d'
import {CardDataItemSheet} from '../../_components/card-data-item-sheet'
import {HyperTable} from '../_components/hyper-table'

export const IndividualConvexDataContent = ({query = 'individual'}) => {
  const [data, setData] = useState<ICard[]>()
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<ICard | null>(null)
  const isMobile = useMobile()
  const {on: open, toggle} = useToggle()
  const onOpenChange = (open: boolean) => {
    if (!open) {
      toggle()
      setSelectedItem(null)
    }
  }

  const handleView = (item: ICard) => {
    setSelectedItem(item)
    toggle()
  }

  const viewer = {open, onOpenChange}

  const groupFilter: FilterFn<ICard> = (row, id, filterValue) => {
    const group = row.getValue(id)
    return group === filterValue
  }

  const cards = useQuery(api.cards.q.getAll)

  useEffect(() => {
    setData(cards)
    setLoading(false)
  }, [cards])

  const columns = useMemo(
    () =>
      [
        {
          id: 'cardId',
          header: 'Id',
          accessorKey: 'cardId',
          cell: textCell(
            'cardId',
            'font-space text-muted-foreground max-w-[9ch] truncate',
          ),
          size: 150,
          enableHiding: true,
          enableSorting: true,
        },
        {
          id: 'userId',
          header: 'User',
          accessorKey: 'userId',
          cell: textCell('userId', 'font-mono truncate text-clip w-[10ch]'),
          size: 150,
          enableHiding: true,
          enableSorting: true,
          filterFn: () => {},
        },
        {
          id: 'type',
          header: 'Type',
          accessorKey: 'type',
          cell: textCell(
            'type',
            'font-space uppercase truncate text-clip w-[10ch]',
          ),
          size: 150,
          enableHiding: true,
          enableSorting: true,
          filterFn: groupFilter,
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
          id: 'createdBy',
          header: 'Created By',
          accessorKey: 'createdBy',
          cell: textCell(
            'createdBy',
            'font-space text-muted-foreground max-w-[9ch] truncate',
          ),
          size: 150,
          enableHiding: true,
          enableSorting: true,
        },
        {
          id: 'isActive',
          header: 'Status',
          accessorKey: 'visible',
          cell: booleanCell(
            'visible',
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
          cell: dateCell<ICard>(
            'createdAt',
            (date) =>
              format(
                date instanceof Date
                  ? date
                  : date instanceof Timestamp
                    ? date.toDate()
                    : new Date(),
                'P',
              ),
            'font-space text-muted-foreground max-w-[20ch] truncate text-clip',
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
      ] as ColumnConfig<ICard>[],
    [],
  )

  const Data = useCallback(
    () => (
      <HyperTable
        data={data ?? []}
        title={query}
        columns={columns}
        loading={loading}
        viewer={viewer}
      />
    ),
    [data],
  )

  return (
    <div className='relative'>
      <Data />
      <CardDataItemSheet
        {...viewer}
        side='right'
        isMobile={isMobile}
        item={selectedItem}
      />
    </div>
  )
}
