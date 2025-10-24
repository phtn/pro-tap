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
import {db} from '@/lib/firebase'
import {ProtapCardDoc} from '@/lib/firebase/cards'
import {Icon} from '@/lib/icons'
import {FilterFn} from '@tanstack/react-table'
import {format} from 'date-fns'
import {collection, doc, onSnapshot, query, Timestamp} from 'firebase/firestore'
import {useEffect, useMemo, useState, useTransition} from 'react'
import {CardItemSheet} from '../../_components/card-item-sheet'
import {HyperTable} from '../_components/hyper-table'

export const Content = () => {
  const [data, setData] = useState<ProtapCardDoc[]>()
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<ProtapCardDoc | null>(null)
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

  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setLoading(true)
    const protapCol = collection(db, 'protap')
    const cardsDoc = doc(protapCol, 'cards')
    const cardsCol = collection(cardsDoc, 'general')
    const q = query(cardsCol)
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const cards = querySnapshot.docs.map(
          (doc) => doc.data() as ProtapCardDoc,
        )
        startTransition(() => {
          setData(cards)
          setLoading(false)
        })
      },
      (error) => {
        console.error('Failed to fetch cards:', error)
        setLoading(false)
      },
    )
    return () => unsubscribe()
  }, [])

  return (
    <div className='relative'>
      {data && data.length > 0 && (
        <HyperTable
          data={data ?? []}
          title='Individual'
          columns={columns}
          loading={loading || isPending}
          viewer={viewer}
        />
      )}

      <CardItemSheet
        {...viewer}
        side='right'
        isMobile={isMobile}
        item={selectedItem}
      />
    </div>
  )
}
