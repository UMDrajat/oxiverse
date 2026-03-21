import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const tags = await prisma.tag.findMany()
    return NextResponse.json(tags)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const data = await req.json()
    const tag = await prisma.tag.create({
      data: {
        name: data.name,
        slug: data.slug,
      }
    })
    return NextResponse.json(tag)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create tag' }, { status: 500 })
  }
}
