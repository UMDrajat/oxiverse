import React from 'react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Image from 'next/image'

export default function About() {
  return (
    <Section id="about">
      <SectionHeader
        badge="About"
        title="Behind Oxiverse"
        subtitle="A one-person mission to build a privacy-first alternative to big tech."
      />
      
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-2xl shadow-primary-500/30">
                <Image
                  src="https://avatars.githubusercontent.com/u/254577690?v=4"
                  alt="Likhith"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold font-display text-white mb-2">
                Built by Likhith
              </h3>
              <p className="text-dark-400 mb-4">
                Oxiverse is the brainchild of Likhith, a passionate developer committed to 
                creating privacy-first alternatives to big tech products. What started as a 
                privacy-focused search engine has evolved into a comprehensive ecosystem 
                designed to give users control over their digital lives.
              </p>
              <p className="text-dark-400 mb-6">
                Every line of code is written with the belief that technology should serve 
                users, not exploit their data. Oxiverse is built on open source principles, 
                transparent practices, and an unwavering commitment to privacy.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Button href="https://github.com/oxiverse-labs" target="_blank">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Oxiverse on GitHub
                </Button>
                <Button variant="outline" href="https://github.com/itxLikhith/intent-engine" target="_blank">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  View Source Code
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <div className="text-3xl font-bold font-display gradient-text mb-1">100%</div>
            <div className="text-sm text-dark-400">Source Available</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold font-display gradient-text mb-1">0</div>
            <div className="text-sm text-dark-400">User Tracking</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold font-display gradient-text mb-1">24/7</div>
            <div className="text-sm text-dark-400">Privacy First</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold font-display gradient-text mb-1">∞</div>
            <div className="text-sm text-dark-400">Possibilities</div>
          </Card>
        </div>

        {/* Mission Statement */}
        <div className="mt-8 text-center">
          <blockquote className="text-xl md:text-2xl font-light italic text-dark-300 max-w-3xl mx-auto">
            "Technology should empower users, not exploit them. Every feature in Oxiverse is 
            built with one question in mind: Does this respect user privacy and autonomy?"
          </blockquote>
          <cite className="block mt-4 text-dark-400 not-italic">
            — Likhith, Founder
          </cite>
        </div>
      </div>
    </Section>
  )
}
