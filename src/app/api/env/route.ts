export interface NodeEnv {
  baseUrl: string
  nodeEnv: string
}

export const GET = async () => {
  let baseUrl = 'localhost:3000'
  let nodeEnv = 'development'
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL_URL) {
    baseUrl = process.env.VERCEL_URL
    nodeEnv = process.env.NODE_ENV
  }
  const response: NodeEnv = {baseUrl, nodeEnv}
  return new Response(JSON.stringify(response), {status: 200})
}
