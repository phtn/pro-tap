import {Content} from './content'

export default async function Page({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params
  return <Content slug={slug} />
}
