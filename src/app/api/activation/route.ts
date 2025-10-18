import { checkCard } from '@/lib/firebase/cards'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const grp = searchParams.get('grp') || 'general'

  if (!id) {
    return NextResponse.json(
      { error: 'Missing id parameter' },
      { status: 400 }
    )
  }

  try {
    // Check if the card exists and is available for activation
    const cardExists = await checkCard(id, grp)

    if (!cardExists) {
      return NextResponse.json(
        { error: 'Card not found or already activated' },
        { status: 404 }
      )
    }

    // Return success response with activation data
    return NextResponse.json({
      success: true,
      data: {
        id,
        grp,
        message: 'Card is available for activation'
      }
    })
  } catch (error) {
    console.error('Error checking card:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}