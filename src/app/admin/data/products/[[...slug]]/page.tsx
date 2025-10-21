import {ProductsTable} from '../../_components/products-table'

export default async function Page({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params
  return (
    <div>
      <ProductsTable query={slug} />
    </div>
  )
}
