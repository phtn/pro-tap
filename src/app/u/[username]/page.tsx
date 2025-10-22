import {Content} from './content'

interface PageProps {
  params: Promise<{username: string}>
}

export default async function PublicProfilePage({params}: PageProps) {
  const {username} = await params
  return <Content username={username} />
}
