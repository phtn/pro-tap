import {format} from 'date-fns'
import {booleanCell, dateCell, textCell} from './cells'
import {createColumns, type ColumnConfig} from './create-columns'

// Example data type
interface User {
  id: string
  name: string
  email: string
  isActive: boolean
  createdAt: Date
  role: string
}

// Example column configurations using different cell types
const userColumns: ColumnConfig<User>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
    cell: textCell('name', 'font-medium text-blue-600'),
    size: 200,
  },
  {
    header: 'Email',
    accessorKey: 'email',
    cell: textCell('email', 'text-gray-600'),
    size: 250,
  },
  {
    header: 'Status',
    accessorKey: 'isActive',
    cell: booleanCell(
      'isActive',
      {
        trueLabel: 'Active',
        falseLabel: 'Inactive',
      },
      'flex items-center gap-2',
    ),
    size: 120,
  },
  {
    header: 'Role',
    accessorKey: 'role',
    cell: textCell('role', 'capitalize bg-gray-100 px-2 py-1 rounded'),
    size: 150,
  },
  {
    header: 'Created',
    accessorKey: 'createdAt',
    cell: dateCell('createdAt', (date) => format(date, 'MMM dd, yyyy')),
    size: 150,
  },
]

// Usage example
export function createUserTableColumns() {
  return createColumns(userColumns)
}

// Alternative: Using custom cell renderers
export const customColumns: ColumnConfig<User>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
    cell: ({getValue}) => {
      const name = getValue() as string
      return (
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium'>
            {name.charAt(0).toUpperCase()}
          </div>
          <span className='font-medium'>{name}</span>
        </div>
      )
    },
    size: 200,
  },
  {
    header: 'Email',
    accessorKey: 'email',
    cell: ({getValue}) => {
      const email = getValue() as string
      return (
        <a href={`mailto:${email}`} className='text-blue-600 hover:underline'>
          {email}
        </a>
      )
    },
    size: 250,
  },
]
