import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const session = searchParams.get('session')
  const prompt = searchParams.get('prompt')

  if (!session || !prompt) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://hmdrezs.app.n8n.cloud/webhook/gen?session=${session}&prompt=${prompt}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    )

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching from n8n:', error)
    return NextResponse.json({ error: 'Failed to fetch from n8n' }, { status: 500 })
  }
} 