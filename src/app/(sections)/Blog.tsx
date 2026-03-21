import React from 'react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

export default async function Blog() {
  let blogs: any[] = []
  try {
    blogs = await prisma.blog.findMany({
      where: { published: true },
      include: { author: true },
      orderBy: { publishedAt: 'desc' },
      take: 4,
    })
  } catch (err) {
    console.error('Blog component fetch fail:', err)
  }

  // Format date
  const formattedBlogs = blogs.map(blog => ({
    id: blog.id,
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt,
    author: blog.author.name || blog.author.email,
    date: formatDate(blog.publishedAt || blog.createdAt),
    image: blog.imageUrl,
    imageDisplay: blog.imageDisplay,
  }))

  const displayPosts = formattedBlogs

  return (
    <Section id="blog" dark>
      <SectionHeader
        badge="Blog"
        title="Latest Updates"
        subtitle="Stay up to date with Oxiverse development, privacy research, and ecosystem news."
      />
      
      {displayPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayPosts.map((post, index) => (
            <div key={post.id}>
              <Card className="group overflow-hidden p-0 h-full border-white/5 hover:border-primary-500/50 transition-all duration-300 shadow-lg hover:shadow-primary-500/5">
                <Link href={post.slug === '#' ? '#' : `/blog/${post.slug}`} className="flex flex-col h-full">
                  <div className="relative h-48 overflow-hidden bg-dark-800">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className={`object-${post.imageDisplay || 'cover'} transition-transform duration-500 group-hover:scale-110`}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-800 to-dark-900">
                        <span className="text-dark-600 font-bold text-4xl">O</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <Badge variant="default" size="sm" className="bg-primary-500/20 text-primary-300 backdrop-blur-md">Tutorial</Badge>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary-400 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-dark-400 text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-[11px] font-bold text-dark-500 uppercase tracking-widest pt-4 border-t border-white/5">
                      <span className="flex items-center gap-2">
                         <div className="w-4 h-4 rounded-full overflow-hidden relative grayscale opacity-70">
                          <Image
                            src="https://avatars.githubusercontent.com/u/254577690?v=4"
                            alt="Likhith"
                            fill
                            className="object-cover"
                          />
                        </div>
                        {post.author}
                      </span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white/[0.02] border border-dashed border-white/10 rounded-2xl">
          <p className="text-dark-500 text-lg">No blogs yet.</p>
        </div>
      )}
      <div className="text-center mt-12">
        <Button href="/blog" variant="outline" className="glass">
          View All Posts
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Button>
      </div>
    </Section>
  )
}
