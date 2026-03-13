'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const TerminalHeader = () => {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-cyber-red/30">
      <div className="container mx-auto px-3">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-cyber-red text-xl font-bold glow">⚠</span>
            <span className="font-mono text-sm text-cyber-red group-hover:text-cyber-cyan transition-colors">
              ACCESS_DENIED
            </span>
          </Link>

          <nav className="flex items-center space-x-2">
            <Link
              href="/"
              className={`px-3 py-1 text-xs border ${
                pathname === '/' 
                  ? 'border-cyber-red text-cyber-red' 
                  : 'border-cyber-red/30 text-cyber-text hover:border-cyber-red'
              } transition-colors`}
            >
              ~/home
            </Link>
            <Link
              href="/posts"
              className={`px-3 py-1 text-xs border ${
                pathname.startsWith('/posts') 
                  ? 'border-cyber-red text-cyber-red' 
                  : 'border-cyber-red/30 text-cyber-text hover:border-cyber-red'
              } transition-colors`}
            >
              ~/posts
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}