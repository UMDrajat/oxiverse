'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { ReactNode } from 'react'

interface AdminDashboardLayoutProps {
  children: ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard' },
  { name: 'Blog Posts', href: '/admin/blog' },
  { name: 'Research Papers', href: '/admin/research' },
  { name: 'Back to Site', href: '/' },
]

export default function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-dark-900 border-r border-dark-700">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-dark-700">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500" />
            <span className="text-lg font-bold text-white">Oxiverse</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-500/10 text-primary-400'
                      : 'text-dark-400 hover:text-white hover:bg-dark-800'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User */}
          <div className="p-4 border-t border-dark-700">
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-dark-400 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64">
        {children}
      </main>
    </div>
  )
}
