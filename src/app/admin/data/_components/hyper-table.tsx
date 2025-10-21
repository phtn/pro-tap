import {DataTable} from '@/components/experimental/table'
import {ColumnConfig} from '@/components/experimental/table/create-columns'
import {useMobile} from '@/hooks/use-mobile'
import {useRouter} from 'next/navigation'
import {AdminDock, DockItems} from '../../_components/dock'

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
  const isMobile = useMobile()
  const router = useRouter()

  const dockItems: DockItems = {
    nav: [{id: 'back', icon: 'back', fn: router.back, label: 'Dashboard'}],
    toolbar: [
      {
        name: 'clear list',
        fn: loading ? () => {} : () => console.log('Clearing list...'),
        icon: 'split-vertical',
        style: loading
          ? 'text-zinc-800 opacity-20'
          : ' opacity-20 text-zinc-500',
      },
    ],
    options: [
      {
        name: 'next',
        fn: () => {},
        icon: 'chevron-right',
        style: 'text-slate-300 dark:text-slate-600',
      },
    ],
  }

  return (
    <div>
      <DataTable
        data={data}
        title={title}
        loading={loading}
        editingRowId={null}
        columnConfigs={columns}
      />
      {isMobile && (
        <div className='fixed md:bottom-20 bottom-8 w-full'>
          <AdminDock dockItems={dockItems} />
        </div>
      )}
    </div>
  )
}
