'use client'

import {DataTable} from '@/components/experimental/table'
import {
  booleanCell,
  dateCell,
  textCell,
} from '@/components/experimental/table/cells'
import {ColumnConfig} from '@/components/experimental/table/create-columns'
import {getAllCards, ProtapCardDoc} from '@/lib/firebase/cards'
import {format} from 'date-fns'
import {useCallback, useEffect, useState} from 'react'

export const Content = () => {
  const [data, setData] = useState<ProtapCardDoc[]>()

  const getData = useCallback(async () => {
    const response = await getAllCards('general')
    if (response) {
      setData(response)
      console.log(response[0])
    }
  }, [getAllCards])

  useEffect(() => {
    if (!data) {
      getData().catch(console.error)
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

  return (
    data && (
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
    )
  )
}
