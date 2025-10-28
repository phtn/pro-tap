interface ActivationRouteProps {
  params: Promise<{id: string; token: string}>
}

const Page = async ({params}: ActivationRouteProps) => {
  const p = await params

  const {id, token} = p
  console.log(id, token)

  return <pre>{JSON.stringify(p, null, 2)}</pre>
}
export default Page
