import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Check if email already exists
    const existingEntry = await (prisma.newsletter as any).findUnique({
      where: { email: normalizedEmail }
    })

    if (existingEntry) {
      return NextResponse.json({ message: 'You are already subscribed!' }, { status: 200 })
    }

    // Create new newsletter entry
    await (prisma.newsletter as any).create({
      data: { email: normalizedEmail }
    })

    return NextResponse.json({ message: 'Welcome to the Oxiverse community!' }, { status: 200 })
    
  } catch (error) {
    console.error('Newsletter API error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
