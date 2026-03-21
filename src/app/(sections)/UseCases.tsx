import React from 'react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'

const useCases = [
  {
    persona: 'Developers',
    description: 'Build better software with intent-aware search, programming error detection, and comprehensive documentation.',
    features: ['Programming error detection', 'API documentation search', 'Code examples & snippets', 'Developer community'],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    gradient: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
  },
  {
    persona: 'Researchers',
    description: 'Conduct thorough research with privacy-preserving search, academic resources, and comprehensive data access.',
    features: ['Academic paper search', 'Citation tracking', 'Research collaboration', 'Data privacy guarantees'],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    gradient: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
  },
  {
    persona: 'Privacy Users',
    description: 'Take back control of your digital life with tools that respect your privacy and give you full data ownership.',
    features: ['No tracking', 'Encrypted communications', 'Data ownership', 'GDPR compliance'],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    gradient: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
  },
  {
    persona: 'Young Builders',
    description: 'Start your tech journey with accessible tools, learning resources, and a supportive community.',
    features: ['Learning resources', 'Open source contributions', 'Community mentorship', 'Portfolio building'],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    gradient: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-500/30',
  },
]

export default function UseCases() {
  return (
    <Section id="community">
      <SectionHeader
        badge="Use Cases"
        title="Built for Everyone"
        subtitle="Whether you're a developer, researcher, privacy advocate, or aspiring builder - Oxiverse has you covered."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {useCases.map((useCase) => (
          <Card key={useCase.persona} className={`bg-gradient-to-br ${useCase.gradient} ${useCase.borderColor}`}>
            <div className="flex items-start space-x-4">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${useCase.gradient} ${useCase.borderColor} border`}>
                {useCase.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold font-display text-white mb-2">
                  {useCase.persona}
                </h3>
                <p className="text-dark-400 mb-4">
                  {useCase.description}
                </p>
                <ul className="space-y-2">
                  {useCase.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-dark-300">
                      <svg className="w-4 h-4 mr-2 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
