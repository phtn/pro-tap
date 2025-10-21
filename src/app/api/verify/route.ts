import {setCookie} from '@/app/actions'
import {NextRequest, NextResponse} from 'next/server'

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url)
  const id = searchParams.get('id')
  const series = searchParams.get('series') || 'general'
  const group = searchParams.get('group') || 'general'
  const batch = searchParams.get('batch') || 'general'

  if (!id) {
    return NextResponse.json({error: 'Missing id parameter'}, {status: 400})
  }

  try {
    const params = {id, series, group, batch}

    if (!params) {
      return NextResponse.json(
        {error: 'Card not found or already activated'},
        {status: 404},
      )
    }

    if (params) {
      await setCookie('protapScanResult', {success: true, ...params})
    }
    // return NextResponse.json(data)

    // Return success response with activation data
    return NextResponse.redirect(
      new URL(`/verify/${id}`, 'https://localhost:3000'),
    )
  } catch (error) {
    console.error('Error checking card:', error)
    return NextResponse.json({error: 'Internal server error'}, {status: 500})
  }
}
