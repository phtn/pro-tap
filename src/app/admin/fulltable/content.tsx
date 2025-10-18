'use client'

import {DataTable} from '@/components/experimental/table'
import {
  booleanCell,
  dateCell,
  textCell,
} from '@/components/experimental/table/cells'
import {ColumnConfig} from '@/components/experimental/table/create-columns'
import {useMobile} from '@/hooks/use-mobile'
import {getAllCards, ProtapCardDoc} from '@/lib/firebase/cards'
import {format} from 'date-fns'
import {useRouter} from 'next/navigation'
import {useCallback, useEffect, useState} from 'react'
import {AdminDock, DockItems} from '../_components/dock'

export const Content = () => {
  const isMobile = useMobile()
  const router = useRouter()
  const [data, setData] = useState<ProtapCardDoc[]>()
  const [loading, setLoading] = useState(false)

  const getData = useCallback(async () => {
    setLoading(true)
    const response = await getAllCards('general')
    if (response) {
      setData(response)
      setLoading(false)
    }
  }, [getAllCards])

  useEffect(() => {
    if (!data) {
      getData().catch((e) => {
        console.error(e)
        setLoading(false)
      })
    }
  }, [data, getData])

  const columnConfigs: ColumnConfig<ProtapCardDoc>[] = [
    {
      header: 'Serial Number',
      accessorKey: 'serialNumber',
      cell: textCell('serialNumber', 'font-space text-muted-foreground'),
      size: 150,
      enableHiding: false,
      enableSorting: true,
    },
    {
      header: 'Owner',
      accessorKey: 'ownerId',
      cell: textCell('ownerId', 'font-mono truncate text-clip w-[10ch]'),
      size: 150,
      enableHiding: true,
      enableSorting: true,
    },
    {
      header: 'Created By',
      accessorKey: 'createdByName',
      size: 150,
      enableHiding: true,
      enableSorting: true,
    },
    {
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
      header: 'Created At',
      accessorKey: 'createdAt',
      cell: dateCell<ProtapCardDoc>(
        'createdAt',
        (date) => format(date, 'PPpp'),
        'font-space text-muted-foreground',
      ),
      size: 180,
      enableHiding: true,
      enableSorting: true,
    },
  ]

  const dockItems: DockItems = {
    nav: [{id: 'back', icon: 'back', fn: router.back, label: 'Dashboard'}],
    toolbar: [
      {
        name: 'clear list',
        fn: loading ? () => {} : () => console.log('Clearing list...'),
        icon: 'split-vertical',
        style: loading ? 'text-zinc-800' : 'text-zinc-500',
      },
    ],
    options: [
      {
        name: 'options',
        fn: () => {},
        icon: 'split-vertical',
        style: 'text-slate-300 dark:text-slate-600',
      },
    ],
  }

  return (
    <div>
      {data && (
        <DataTable
          title='All'
          data={data}
          create={false}
          edit={false}
          editingRowId={null}
          toggleForm={() => {}}
          toggleEditForm={() => {}}
          columnConfigs={columnConfigs}
        />
      )}
      {isMobile && (
        <div className='fixed md:bottom-20 bottom-8 w-full'>
          <AdminDock dockItems={dockItems} />
        </div>
      )}
    </div>
  )
}
