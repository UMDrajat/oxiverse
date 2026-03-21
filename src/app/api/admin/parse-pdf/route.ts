import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { PDFParse } from 'pdf-parse'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const parser = new PDFParse({ data: buffer })
    const textResult = await parser.getText()
    const infoResult = await parser.getInfo()

    let markdown = textResult.text
      .replace(/\n\s*\n/g, '\n\n') // Normalize multiple newlines
      .trim()

    // Optionally add title if found
    const title = infoResult.info?.Title || file.name.replace('.pdf', '')
    if (title && !markdown.startsWith('#')) {
      markdown = `# ${title}\n\n${markdown}`
    }

    return NextResponse.json({ 
      markdown, 
      info: infoResult.info,
      numpages: infoResult.total 
    })
  } catch (error: any) {
    console.error('PDF parsing error:', error)
    return NextResponse.json({ error: 'Failed to parse PDF: ' + error.message }, { status: 500 })
  }
}
