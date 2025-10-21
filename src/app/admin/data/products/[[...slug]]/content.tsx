'use client'
import {ProductsTable} from '../../_components/products-table'

interface Props {
  slug: string
}

export const Content = ({slug}: Props) => {
  return (
    <div className=''>
      <ProductsTable query={slug} />
    </div>
  )
}
