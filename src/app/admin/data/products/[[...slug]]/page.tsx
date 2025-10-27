import {Content} from './content'

export default async function Page({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const param = await params
  return <Content slug={param.slug} />
}
