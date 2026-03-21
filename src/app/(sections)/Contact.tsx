'use client'

import React from 'react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import { motion } from 'framer-motion'

const socialLinks = [
  {
    name: 'Instagram',
    id: 'itxLikhith',
    url: 'https://instagram.com/itxLikhith',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.56.216.96.474 1.38.894.42.42.678.82.894 1.38.163.422.358 1.057.412 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.216.56-.474.96-.894 1.38-.42.42-.82.678-1.38.894-.422.163-1.057.358-2.227.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.56-.216-.96-.474-1.38-.894-.42-.42-.678-.82-.894-1.38-.163-.422-.358-1.057-.412-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.216-.56.474-.96.894-1.38.42-.42.82-.678 1.38-.894.422-.163 1.057-.358 2.227-.412 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.277.057-2.148.262-2.91.557-.788.306-1.457.715-2.122 1.38s-1.074 1.334-1.38 2.122c-.295.762-.5 1.633-.557 2.91-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.057 1.277.262 2.148.557 2.91.306.788.715 1.457 1.38 2.122s1.334 1.074 2.122 1.38c.762.295 1.633.5 2.91.557 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.277-.057 2.148-.262 2.91-.557.788-.306 1.457-.715 2.122-1.38s1.074-1.334 1.38-2.122c.295-.762.5-1.633.557-2.91.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.057-1.277-.262-2.148-.557-2.91-.306-.788-.715-1.457-1.38-2.122s-1.334-1.074-2.122-1.38c-.762-.295-1.633-.5-2.91-.557-1.279-.058-1.687-.072-4.947-.072z" />
        <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    color: 'hover:text-pink-500',
  },
  {
    name: 'GitHub',
    id: 'itxLikhith',
    url: 'https://github.com/itxLikhith',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: 'hover:text-white',
  },
  {
    name: 'X',
    id: 'itxLikhith',
    url: 'https://x.com/itxLikhith',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932zM17.61 20.644h2.039L6.486 3.24H4.298z" />
      </svg>
    ),
    color: 'hover:text-blue-400',
  },
  {
    name: 'Reddit',
    id: 'itxLikhith',
    url: 'https://reddit.com/user/itxLikhith',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 11.5c0-1.654-1.346-3-3-3-.674 0-1.294.223-1.796.597-2.006-1.424-4.735-2.339-7.756-2.455l1.393-6.526 4.545 1.01c.071 1.261 1.125 2.27 2.414 2.27 1.323 0 2.4-1.077 2.4-2.4s-1.077-2.4-2.4-2.4c-1.01 0-1.871.625-2.226 1.503l-5.071-1.127-.142.04c-.114.032-.2.124-.223.238l-1.54 7.218c-3.056.096-5.83.999-7.87 2.433-.503-.384-1.135-.616-1.821-.616-1.654 0-3 1.346-3 3 0 1.171.674 2.185 1.654 2.678-.052.269-.084.542-.084.822 0 3.749 4.382 6.8 9.778 6.8s9.778-3.051 9.778-6.8c0-.28-.032-.553-.084-.822.98-.493 1.654-1.507 1.654-2.678zm-15.5 2c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm9.214 4.545c-.848.848-2.317 1.355-3.714 1.355s-2.866-.507-3.714-1.355c-.195-.195-.195-.512 0-.707s.512-.195.707 0c.633.633 1.902 1.062 3.007 1.062s2.374-.429 3.007-1.062c.195-.195.512-.195.707 0s.195.512 0 .707zm-.214-2.545c0 1.103-.897 2-2 2s-2-.897-2-2 .897-2 2-2 2 .897 2 2z" />
      </svg>
    ),
    color: 'hover:text-orange-500',
  },
  {
    name: 'Telegram',
    id: 'itxLikhith',
    url: 'https://t.me/itxLikhith',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.891 8.146l-1.92 9.044c-.145.642-.524.798-1.063.493l-2.924-2.155-1.411 1.358c-.156.156-.288.288-.588.288l.211-2.986 5.435-4.91c.236-.21-.051-.326-.367-.116l-6.717 4.229-2.892-.904c-.628-.196-.641-.628.131-.929l11.295-4.352c.523-.19.98.125.807.842z" />
      </svg>
    ),
    color: 'hover:text-blue-500',
  },
]

export default function Contact() {
  return (
    <Section id="contact" className="py-24 relative">
       <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-[100px] pointer-events-none" />
       
      <SectionHeader
        badge="Contact"
        title="Get in Touch"
        subtitle="Connect with me across platforms. I'm always open to discussing privacy, open-source, and the future of the internet."
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {socialLinks.map((social, index) => (
          <motion.div
            key={social.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <Card className={`h-full p-8 flex flex-col items-center justify-center text-center transition-all duration-300 border-white/5 hover:border-primary-500/30 bg-white/[0.02] hover:bg-white/[0.05] ${social.color}`}>
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {social.icon}
                </div>
                <h3 className="text-sm font-bold text-white mb-1 group-hover:text-inherit transition-colors">
                  {social.name}
                </h3>
                <p className="text-[10px] text-dark-500 font-mono">@{social.id}</p>
              </Card>
            </a>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-dark-500 text-sm">
          Prefer email? Reach out at <a href="mailto:likhith@oxiverse.com" className="text-primary-400 hover:text-primary-300 transition-colors">likhith@oxiverse.com</a>
        </p>
      </div>
    </Section>
  )
}
