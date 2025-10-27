import {DataTable} from '@/components/experimental/table'
import {ColumnConfig} from '@/components/experimental/table/create-columns'

interface Props<T> {
  data: T[]
  title: string
  loading: boolean
  columns: ColumnConfig<T>[]
  viewer: {open: boolean; onOpenChange: (open: boolean) => void}
}

export const HyperTable = <T,>({
  data,
  title,
  columns,
  loading,
  viewer,
}: Props<T>) => {
  return (
    <>
      <DataTable
        data={data}
        title={title}
        loading={loading}
        editingRowId={null}
        columnConfigs={columns}
      />
      {/*{isMobile && (
        <div className='fixed md:bottom-20 bottom-8 w-full'>
          <AdminDock dockItems={dockItems} />
        </div>
      )}*/}
    </>
  )
}
