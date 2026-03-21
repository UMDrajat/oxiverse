import Navigation from '@/components/Navigation'
import Hero from '@/app/(sections)/Hero'
import Features from '@/app/(sections)/Features'
import UseCases from '@/app/(sections)/UseCases'
import Roadmap from '@/app/(sections)/Roadmap'
import Ecosystem from '@/app/(sections)/Ecosystem'
import Research from '@/app/(sections)/Research'
import Blog from '@/app/(sections)/Blog'
import About from '@/app/(sections)/About'
import Footer from '@/components/Footer'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-950">
      <Navigation />
      <Hero />
      <Features />
      <UseCases />
      <Roadmap />
      <Ecosystem />
      <Research />
      <Blog />
      <About />
      <Footer />
    </main>
  )
}
