'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, Button, Spinner } from '@/components/ui'
import { useToastContext } from '@/lib/providers/ToastProvider'

interface Poster {
  id: string
  title: string
  slug: string
  imageUrl: string
  link: string | null
  createdAt: string
}

export default function AdminPostersPage() {
  const { success, error } = useToastContext()
  const [posters, setPosters] = useState<Poster[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPosters()
  }, [])

  const fetchPosters = async () => {
    try {
      const res = await fetch('/api/posters')
      if (res.ok) {
        const data = await res.json()
        setPosters(data)
      } else {
        error('Failed to load posters')
      }
    } catch (err) {
      error('Failed to load posters')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this poster?')) return

    try {
      const res = await fetch(`/api/posters/${id}`, { method: 'DELETE' })
      if (res.ok) {
        success('Poster deleted')
        setPosters(posters.filter((p) => p.id !== id))
      } else {
        error('Failed to delete poster')
      }
    } catch (err) {
      error('Failed to delete poster')
    }
  }

  return (
    <div className="p-8 pb-20">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Visual Posters</h1>
          <p className="text-dark-400">Manage aesthetic artifacts and external links</p>
        </div>
        <Link href="/admin/posters/new">
          <Button variant="primary" size="lg" className="shadow-lg shadow-primary-500/20">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Poster
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Spinner size="lg" />
        </div>
      ) : posters.length === 0 ? (
        <Card className="bg-dark-900/40 border-white/5 py-24 text-center">
            <div className="w-20 h-20 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-6">
                 <svg className="w-10 h-10 text-dark-500 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
          <h2 className="text-xl font-bold text-white mb-2">No visual artifacts found</h2>
          <p className="text-dark-400 mb-8 max-w-sm mx-auto">Upload your first poster to your website to showcase your brand.</p>
          <Link href="/admin/posters/new">
            <Button variant="outline" className="glass">Initialize Artifact</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {posters.map((poster) => (
            <Card key={poster.id} className="overflow-hidden p-0 bg-dark-900/40 border-white/5 group relative shadow-2xl">
              <div className="relative aspect-[3/4] bg-dark-900 overflow-hidden">
                <img
                  src={poster.imageUrl}
                  alt={poster.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-950/20 to-transparent group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                  <h3 className="font-bold text-xl text-white mb-4 line-clamp-1">{poster.title}</h3>
                  <div className="flex gap-2 w-full opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-300">
                    <Link href={`/admin/posters/${poster.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full glass bg-dark-900/50 backdrop-blur-md">Edit</Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(poster.id)}
                      className="bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white px-3"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                     </svg>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4 z-10">
                 <div className="px-2 py-0.5 rounded-full bg-dark-950/60 backdrop-blur-md border border-white/5 text-[10px] text-dark-400 font-bold uppercase tracking-widest">
                    {new Date(poster.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                 </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
