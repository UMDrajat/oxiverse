'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, Button, Spinner } from '@/components/ui'
import { useToastContext } from '@/lib/providers/ToastProvider'

interface ResearchPaper {
  id: string
  title: string
  slug: string
  abstract: string | null
  pdfUrl: string | null
  published: boolean
  publishedAt: string | null
  createdAt: string
  category?: { name: string }
  author: {
    id: string
    name: string | null
    email: string
  }
}

export default function AdminResearchPage() {
  const { success, error } = useToastContext()
  const [papers, setPapers] = useState<ResearchPaper[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPapers()
  }, [])

  const fetchPapers = async () => {
    try {
      const res = await fetch('/api/research')
      const data = await res.json()
      setPapers(data.papers)
    } catch (err) {
      error('Failed to load research papers')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    try {
      const res = await fetch(`/api/research/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setPapers(papers.filter((p) => p.id !== id))
        success('Research paper deleted successfully')
      } else {
        error('Failed to delete research paper')
      }
    } catch (err) {
      error('Failed to delete research paper')
    }
  }

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="p-8 pb-20">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Theoretical Research</h1>
          <p className="text-dark-400">Formalize your breakthroughs and whitepapers</p>
        </div>
        <Link href="/admin/research/new">
          <Button variant="primary" size="lg" className="shadow-lg shadow-primary-500/20">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Publish Paper
          </Button>
        </Link>
      </div>

      {papers.length === 0 ? (
        <Card className="bg-dark-900/40 border-white/5 py-16 text-center">
            <div className="w-20 h-20 bg-dark-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>
          <h2 className="text-xl font-bold text-white mb-2">Academic silence</h2>
          <p className="text-dark-400 mb-8 max-w-sm mx-auto">No papers have been published yet. Share your latest research findings.</p>
          <Link href="/admin/research/new">
            <Button variant="outline" className="glass">Initial Submission</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {papers.map((paper) => (
            <Card key={paper.id} className="bg-dark-900/40 border-white/5 hover:border-primary-500/20 transition-all p-0 overflow-hidden group">
              <div className="flex flex-col md:flex-row items-stretch">
                <div className="p-6 flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                      paper.published 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    }`}>
                      {paper.published ? 'Published' : 'Under Review'}
                    </span>
                    {paper.pdfUrl && (
                         <span className="flex items-center gap-1.5 text-[10px] font-bold text-primary-400 uppercase tracking-widest">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            PDF Attached
                         </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {paper.title}
                  </h3>
                  <p className="text-dark-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {paper.abstract || 'No abstract provided for this research artifact.'}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-dark-500">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-dark-800 flex items-center justify-center text-[10px] text-dark-400 border border-white/5 uppercase">
                        {paper.author.name?.[0] || paper.author.email[0]}
                      </div>
                      {paper.author.name || paper.author.email}
                    </div>
                    <span>•</span>
                    <span>{new Date(paper.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
                <div className="p-6 md:border-l border-white/5 flex items-center gap-3 bg-dark-950/20">
                  <Link href={`/admin/research/${paper.id}`} className="flex-1 md:flex-none">
                    <Button variant="outline" size="sm" className="w-full glass">
                      Refine
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/5 px-2"
                    onClick={() => handleDelete(paper.id, paper.title)}
                  >
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                     </svg>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
