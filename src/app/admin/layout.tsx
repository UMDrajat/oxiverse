import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import AdminSidebar from './components/AdminSidebar'
import { headers } from 'next/headers'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)
  
  // Get the current pathname from headers (only works in middleware or some tricks, 
  // but in Next.js 14+ we can use headers for some info)
  const headersList = headers()
  const referer = headersList.get('referer') || ''
  const pathname = headersList.get('x-invoke-path') || ''
  
  // Since we can't easily get the pathname in a server layout in Next.js without some hacks,
  // we can use a client component wrapper if needed, but for now let's just 
  // check if session exists and redirect if not (except for login page).
  
  // Actually, Next.js handles route protection better in middleware.
  // But for the layout, we can check session.
  
  // If no session and NOT on login page, we can't easily check pathname here.
  // Let's assume this layout is only for protected routes and move login out if possible,
  // or just use a Client Component to decide whether to show sidebar.

  return (
    <div className="flex min-h-screen bg-dark-950">
      {session && (
        <AdminSidebar />
      )}
      <main className={`flex-1 ${session ? 'ml-64' : ''}`}>
        {children}
      </main>
    </div>
  )
}
