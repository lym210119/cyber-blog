'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export const Header = () => {
  const pathname = usePathname()
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('zh-CN', { hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="sticky top-0 z-50 neon-panel border-t-0 border-x-0">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="group relative">
            <span className="neon-text text-xl font-bold relative z-10">
              {'>_'} CYBER::BLOG
            </span>
            <span className="absolute inset-0 bg-cyber-primary/20 blur-xl group-hover:blur-2xl transition-all"></span>
          </Link>

          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`relative px-3 py-2 text-sm transition-colors group ${
                pathname === '/' ? 'neon-text' : 'text-cyber-muted hover:text-cyber-primary'
              }`}
            >
              <span className="relative z-10">~/home</span>
              {pathname === '/' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyber-primary animate-pulse-glow"></span>
              )}
            </Link>
            <Link
              href="/posts"
              className={`relative px-3 py-2 text-sm transition-colors group ${
                pathname.startsWith('/posts') ? 'neon-text' : 'text-cyber-muted hover:text-cyber-primary'
              }`}
            >
              <span className="relative z-10">~/posts</span>
              {pathname.startsWith('/posts') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyber-secondary animate-pulse-glow"></span>
              )}
            </Link>
          </nav>

          {/* 系统状态 */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-xs">
              <span className="text-cyber-primary animate-pulse-slow">●</span>
              <span className="text-cyber-muted">SYSTEM ONLINE</span>
              <span className="text-cyber-secondary">|</span>
              <span className="text-cyber-muted">{time}</span>
            </div>
            
            {/* 命令提示 */}
            <div className="flex items-center space-x-1 px-3 py-1 border border-cyber-primary/30 rounded-none">
              <span className="text-cyber-primary text-xs">⌘</span>
              <span className="text-cyber-muted text-xs hidden sm:inline">K</span>
            </div>
          </div>
        </div>
      </div>

      {/* 扫描线效果 */}
      <div className="scan-line"></div>
    </header>
  )
}