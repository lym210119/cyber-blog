'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export const Header = () => {
  const pathname = usePathname()
  const [time, setTime] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('zh-CN', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const navItems = [
    { href: '/' as const, label: 'home', icon: '⌂', mobileIcon: '🏠' },
    { href: '/posts' as const, label: 'posts', icon: '📄', mobileIcon: '📚' },
    { href: '/tags' as const, label: 'tags', icon: '#', mobileIcon: '🏷️' },
    { href: '/archive' as const, label: 'archive', icon: '📚', mobileIcon: '🗂️' },
    { href: '/search' as const, label: 'search', icon: '🔍', mobileIcon: '🔎' },
    { href: '/about' as const, label: 'about', icon: '👤', mobileIcon: 'ℹ️' },
  ]

  return (
    <header className="sticky top-0 z-50 neon-panel border-t-0 border-x-0">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-14 sm:h-16 px-2 sm:px-4">
          {/* Logo */}
          <Link href="/" className="touch-target flex items-center gap-1 sm:gap-2">
            <span className="text-cyber-primary text-lg sm:text-xl animate-pulse">{'>_'}</span>
            <span className="neon-text text-sm sm:text-base font-bold hidden xs:inline">
              CYBER • BLOG
            </span>
            <span className="neon-text text-sm sm:hidden">
              CYBER
            </span>
          </Link>

          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 text-sm transition-colors group touch-target
                  ${pathname === item.href 
                    ? 'text-cyber-primary' 
                    : 'text-cyber-muted hover:text-cyber-primary'
                  }`}
              >
                <span className="relative z-10 flex items-center gap-1">
                  <span className="text-cyber-secondary">{item.icon}</span>
                  ~/{item.label}
                </span>
                {pathname === item.href && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-cyber-primary"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* 移动端菜单按钮 */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="touch-target text-cyber-primary md:hidden"
          >
            <span className="text-2xl">{menuOpen ? '✕' : '☰'}</span>
          </button>

          {/* 系统状态 */}
          <div className="hidden sm:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-cyber-primary animate-pulse-slow">●</span>
              <span className="text-cyber-muted">{time}</span>
            </div>
            <div className="flex items-center space-x-1 px-3 py-1 border border-cyber-primary/30">
              <span className="text-cyber-primary text-xs">⌘</span>
              <span className="text-cyber-muted text-xs">K</span>
            </div>
          </div>
        </div>

        {/* 移动端菜单 */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-cyber-primary/30 py-2"
          >
            <div className="grid grid-cols-3 gap-1 p-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex flex-col items-center p-3 rounded-none border
                    ${pathname === item.href 
                      ? 'border-cyber-primary bg-cyber-primary/10 text-cyber-primary' 
                      : 'border-cyber-primary/30 text-cyber-muted'
                    } transition-colors touch-target`}
                >
                  <span className="text-xl mb-1">{item.mobileIcon}</span>
                  <span className="text-xs">{item.label}</span>
                </Link>
              ))}
            </div>
            
            {/* 移动端系统信息 */}
            <div className="flex justify-between px-3 py-2 text-xs text-cyber-muted/50 border-t border-cyber-primary/30 mt-2">
              <span>⌘K 命令</span>
              <span>{time}</span>
              <span className="text-cyber-primary">● ONLINE</span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="scan-line"></div>
    </header>
  )
}
