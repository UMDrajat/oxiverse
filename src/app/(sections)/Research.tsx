import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

export default async function Research() {
  let papers: any[] = []
  try {
    papers = await prisma.researchPaper.findMany({
      where: { published: true },
      include: { author: true },
      orderBy: { publishedAt: 'desc' },
      take: 2,
    })
  } catch (err) {
    console.error('Research component fetch fail:', err)
  }

  const formattedPapers = papers.map(paper => ({
    slug: paper.slug,
    title: paper.title,
    excerpt: paper.abstract,
    author: paper.author.name || paper.author.email,
    date: formatDate(paper.publishedAt || paper.createdAt),
    image: paper.imageUrl,
    imageDisplay: paper.imageDisplay,
  }))

  const displayPapers = formattedPapers

  return (
    <Section id="research">
      <SectionHeader
        badge="Research"
        title="Technical Deep Dives"
        subtitle="Explore the research and technical documentation behind Oxiverse's privacy-first architecture."
      />
      
      {displayPapers.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {displayPapers.map((paper, index) => (
            <div key={index}>
              <Card className="group h-full p-0 overflow-hidden hover:border-accent-500/50 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.04]">
                <Link href={paper.slug === '#' ? '#' : `/research/${paper.slug}`} className="flex flex-col md:flex-row h-full">
                  {paper.image ? (
                    <div className="w-full md:w-48 h-48 flex-shrink-0 bg-dark-900 flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/5 p-3">
                      <img
                        src={paper.image}
                        alt={paper.title}
                        className={`w-full h-full object-${paper.imageDisplay || 'contain'} transition-transform duration-500 group-hover:scale-105`}
                      />
                    </div>
                  ) : (
                    <div className="w-full md:w-48 h-48 flex-shrink-0 bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
                      <svg className="w-12 h-12 text-dark-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  )}

                  <div className="flex-1 p-8 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="success" size="sm" className="bg-accent-500/10 text-accent-400 border-accent-500/20">Paper</Badge>
                      <span className="text-[10px] font-bold text-dark-500 uppercase tracking-widest">{paper.date}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent-400 transition-colors tracking-tight">
                      {paper.title}
                    </h3>
                    
                    <p className="text-dark-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                      {paper.excerpt}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <div className="w-5 h-5 rounded-full overflow-hidden relative grayscale opacity-70">
                          <Image
                            src="https://avatars.githubusercontent.com/u/254577690?v=4"
                            alt="Likhith"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-xs font-medium text-dark-400">{paper.author}</span>
                      </div>

                      <div className="text-accent-400 group-hover:translate-x-1 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white/[0.02] border border-dashed border-white/10 rounded-2xl">
          <p className="text-dark-500 text-lg">No research yet.</p>
        </div>
      )}
      
      <div className="text-center mt-12">
        <Button href="/research" variant="outline" className="glass hover:bg-white/5 transition-colors">
          Explore Research Archive
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-7 7m7-7l-7-7" />
          </svg>
        </Button>
      </div>
    </Section>
  )
}
