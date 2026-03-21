'use client'

import React, { useState } from 'react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { motion, AnimatePresence } from 'framer-motion'

const roadmapPhases = [
  {
    phase: 'Phase 1',
    title: 'Foundation & Core Search',
    status: 'current',
    items: [
      { text: 'Privacy-first search engine', status: 'done' },
      { text: 'Intent extraction system', status: 'done' },
      { text: 'Go crawler with BadgerDB', status: 'done' },
      { text: 'Qdrant vector search integration', status: 'done' },
      { text: 'Redis caching layer (11x faster)', status: 'done' },
      { text: 'SearXNG integration', status: 'done' },
      { text: 'Basic analytics dashboard', status: 'done' },
      { text: 'Fraud detection system', status: 'done' },
      { text: 'A/B testing framework', status: 'pending' },
      { text: 'Advanced consent management', status: 'pending' },
      { text: 'Real-time WebSocket metrics', status: 'pending' },
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Ecosystem Expansion',
    status: 'upcoming',
    items: [
      { text: 'Oxiverse Browser (Chromium-based)', status: 'pending' },
      { text: 'Download Manager with cloud sync', status: 'pending' },
      { text: 'GSuite alternative (Docs, Sheets, Slides)', status: 'pending' },
      { text: 'Encrypted Mail service', status: 'pending' },
      { text: 'Cross-platform mobile apps', status: 'pending' },
      { text: 'Browser extension suite', status: 'pending' },
      { text: 'API marketplace for developers', status: 'pending' },
    ],
  },
  {
    phase: 'Phase 3',
    title: 'Future Vision',
    status: 'future',
    items: [
      { text: 'Decentralized identity system', status: 'pending' },
      { text: 'AI-powered research assistant', status: 'pending' },
      { text: 'Collaborative workspace platform', status: 'pending' },
      { text: 'Open source app store', status: 'pending' },
      { text: 'Blockchain-based rewards', status: 'pending' },
    ],
  },
]

export default function Roadmap() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0)

  const togglePhase = (index: number) => {
    if (index === 2) return // Phase 3 stays collapsed
    setExpandedPhase(expandedPhase === index ? null : index)
  }

  return (
    <Section id="roadmap" dark>
      <SectionHeader
        badge="Roadmap"
        title="Building the Future"
        subtitle="Our journey to create a complete privacy-first ecosystem."
      />
      
      <div className="space-y-6 max-w-4xl mx-auto">
        {roadmapPhases.map((phaseData, index) => (
          <div key={phaseData.phase} className="relative">
            {/* Connecting Line */}
            {index !== roadmapPhases.length - 1 && (
              <div className="absolute left-[30px] top-[72px] w-[2px] h-[calc(100%-48px)] bg-gradient-to-b from-primary-500/50 to-transparent z-0 hidden sm:block" />
            )}

            {/* Phase Header */}
            <motion.button
              whileHover={{ scale: index === 2 ? 1 : 1.01 }}
              whileTap={{ scale: index === 2 ? 1 : 0.99 }}
              onClick={() => togglePhase(index)}
              className={`w-full text-left p-6 sm:p-8 rounded-3xl border transition-all z-10 relative overflow-hidden ${
                index === 2
                  ? 'bg-dark-900/30 border-dark-700 cursor-not-allowed'
                  : expandedPhase === index
                  ? 'bg-primary-950/10 border-primary-500/50 shadow-2xl shadow-primary-500/5'
                  : 'bg-glass border-white/5 hover:border-white/20 cursor-pointer'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold font-display text-lg relative z-10 ${
                    phaseData.status === 'current'
                      ? 'bg-gradient-to-br from-primary-500 to-accent-600 text-white shadow-lg shadow-primary-500/20'
                      : 'bg-dark-800 text-dark-400'
                  }`}>
                    {index + 1}
                    {phaseData.status === 'current' && (
                      <span className="absolute -inset-1 rounded-2xl bg-primary-500/20 animate-pulse" />
                    )}
                  </div>
                  <div>
                    <h3 className={`text-xl sm:text-2xl font-bold font-display ${
                      index === 2 ? 'text-dark-500' : 'text-white'
                    }`}>
                      {phaseData.phase}: {phaseData.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      {phaseData.status === 'current' && (
                        <Badge variant="success" size="sm">
                          In Progress
                        </Badge>
                      )}
                      {phaseData.status === 'upcoming' && (
                        <Badge variant="pending" size="sm">
                          Coming Next
                        </Badge>
                      )}
                      {phaseData.status === 'future' && (
                        <Badge size="sm">
                          Future Vision
                        </Badge>
                      )}
                      <span className="text-[10px] font-bold text-dark-500 uppercase tracking-widest">
                        {phaseData.items.filter(i => i.status === 'done').length} / {phaseData.items.length} Tasks
                      </span>
                    </div>
                  </div>
                </div>
                {index !== 2 && (
                  <motion.div
                    animate={{ rotate: expandedPhase === index ? 180 : 0 }}
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-dark-400"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                )}
              </div>
            </motion.button>

            {/* Phase Content */}
            <AnimatePresence>
              {expandedPhase === index && index !== 2 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 p-6 sm:p-8 bg-glass border border-white/5 rounded-3xl space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {phaseData.items.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: itemIndex * 0.05 }}
                          className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group cursor-default"
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                            item.status === 'done' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-primary-500/20 text-primary-400'
                          }`}>
                            {item.status === 'done' ? (
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                            )}
                          </div>
                          <span className={`text-sm ${
                            item.status === 'done' ? 'text-dark-400 line-through decoration-dark-600' : 'text-white'
                          }`}>
                            {item.text}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Phase 3 Blurred Overlay */}
            {index === 2 && (
              <div className="relative mt-4">
                <div className="blur-[4px] select-none pointer-events-none opacity-40">
                  <div className="p-8 bg-glass rounded-3xl border border-white/5 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {phaseData.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-4 p-4 rounded-xl bg-dark-800">
                          <div className="w-6 h-6 rounded-full bg-dark-700" />
                          <div className="h-4 w-3/4 bg-dark-700 rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="bg-dark-950/80 backdrop-blur-xl px-8 py-4 rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center"
                  >
                    <span className="text-xl font-bold gradient-text mb-1">Coming Next</span>
                    <span className="text-xs text-dark-400 uppercase tracking-widest font-black">Locked Stage</span>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}
