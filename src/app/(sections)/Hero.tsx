'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Counter from '@/components/ui/Counter'

// Stats removed as requested

export default function Hero() {
  return (
    <section id="platform" className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-dark-950 noise-bg">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-primary-950/20 to-dark-950" />
        <div className="absolute inset-0 bg-grid-slate-900 bg-[size:50px_50px] opacity-10" />
        
        {/* Animated Glow Orbs with Floating Motion */}
        <motion.div 
          animate={{ 
            x: [0, 80, -40, 0],
            y: [0, -40, 60, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] bg-primary-600/10 rounded-full blur-[160px] opacity-30" 
        />
        <motion.div 
          animate={{ 
            x: [0, -60, 90, 0],
            y: [0, 80, -30, 0],
            scale: [0.9, 1, 1.1, 0.9],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-15%] right-[-5%] w-[800px] h-[800px] bg-accent-600/10 rounded-full blur-[160px] opacity-30" 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Animated Pulse Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="inline-flex items-center space-x-2 px-5 py-2 mb-10 glass rounded-full border border-white/10 shadow-xl shadow-primary-500/5 group cursor-default"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
          </span>
          <span className="text-xs font-bold tracking-widest uppercase text-primary-300 group-hover:text-primary-100 transition-colors">System Status: Public Beta</span>
        </motion.div>

        {/* Gradient Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, type: "spring" }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold font-display tracking-tighter mb-8"
        >
          <span className="gradient-text block mb-2 leading-tight">Explore.</span>
          <span className="text-white block mb-2 leading-tight text-glow">Connect.</span>
          <span className="gradient-text block leading-tight">Create.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, type: "spring" }}
          className="text-lg md:text-xl text-dark-300 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
        >
          The next generation of privacy-first infrastructure. 
          A secure ecosystem for developers and pioneers of the open internet.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, type: "spring" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" href="https://github.com/itxLikhith" target="_blank" className="min-w-[200px] shadow-2xl shadow-primary-500/40 relative overflow-hidden group">
              <span className="relative z-10">Build with Us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" variant="outline" href="#products" className="min-w-[200px] glass relative overflow-hidden group">
              <span className="relative z-10">View Ecosystem</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </motion.div>
        </motion.div>

      </div>

      {/* Modern Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer group"
        onClick={() => {
          document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-dark-400 group-hover:text-primary-400 transition-colors">Scroll</span>
        <div className="w-6 h-10 border-2 border-dark-400 rounded-full flex justify-center group-hover:border-primary-400 transition-colors">
          <motion.div 
            animate={{ y: [4, 20, 4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-dark-400 rounded-full mt-1 group-hover:bg-primary-400 transition-colors"
          />
        </div>
      </motion.div>
    </section>
  )
}
