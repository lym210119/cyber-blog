// src/components/Footer.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export const Footer = () => {
  const [stats, setStats] = useState({
    uptime: '99.97%',
    connections: '1.3k',
    latency: '42ms',
    version: '2.3.1',
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        uptime: '99.97%',
        connections: Math.floor(Math.random() * 1000 + 1000) > 1000 
          ? (Math.random() * 1 + 1).toFixed(1) + 'k' 
          : Math.floor(Math.random() * 1000 + 1000).toString(),
        latency: Math.floor(Math.random() * 20 + 30) + 'ms',
        version: '2.3.1',
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="neon-panel border-b-0 border-x-0 mt-8 pb-safe-bottom">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* 第一行：系统状态 + 链接 - 移动端改为两行 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[10px] sm:text-xs font-mono">
          {/* 左侧状态 */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-4">
            <span className="text-cyber-primary animate-pulse-slow flex-shrink-0">●</span>
            <span className="text-cyber-muted hidden xs:inline">v{stats.version}</span>
            <span className="text-cyber-secondary hidden sm:inline">|</span>
            <span className="text-cyber-muted hidden sm:inline">UPTIME: {stats.uptime}</span>
            <span className="text-cyber-secondary hidden md:inline">|</span>
            <span className="text-cyber-muted hidden md:inline">CONN: {stats.connections}</span>
            <span className="text-cyber-secondary hidden lg:inline">|</span>
            <span className="text-cyber-muted hidden lg:inline">LAT: {stats.latency}</span>
          </div>

          {/* 右侧链接 - 移动端换行显示 */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a href="/feed.xml" className="text-cyber-primary hover:text-cyber-secondary transition-colors touch-target px-2 py-1">RSS</a>
            <a href="/sitemap.xml" className="text-cyber-primary hover:text-cyber-secondary transition-colors touch-target px-2 py-1 hidden xs:inline">SITEMAP</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-cyber-primary hover:text-cyber-secondary transition-colors touch-target px-2 py-1">GITHUB</a>
          </div>
        </div>

        {/* 第二行：导航链接 - 移动端可横向滚动 */}
        <div className="mt-4 pt-3 border-t border-cyber-primary/30 overflow-x-auto">
          <div className="flex gap-4 sm:gap-6 text-[10px] sm:text-xs min-w-max pb-1">
            <Link href="/" className="text-cyber-muted hover:text-cyber-primary transition-colors touch-target px-2 py-1">首页</Link>
            <Link href="/posts" className="text-cyber-muted hover:text-cyber-primary transition-colors touch-target px-2 py-1">文章</Link>
            <Link href="/tags" className="text-cyber-muted hover:text-cyber-primary transition-colors touch-target px-2 py-1">标签</Link>
            <Link href="/archive" className="text-cyber-muted hover:text-cyber-primary transition-colors touch-target px-2 py-1">归档</Link>
            <Link href="/about" className="text-cyber-muted hover:text-cyber-primary transition-colors touch-target px-2 py-1">关于</Link>
          </div>
        </div>

        {/* 第三行：版权和诊断信息 - 移动端简化 */}
        <div className="mt-3 text-[8px] sm:text-[10px] text-cyber-muted/50 font-mono flex flex-wrap justify-between items-center">
          <span>© 2025 赛博空间</span>
          <span className="hidden xs:inline">ERROR: 0x7C5F_3A1D</span>
          <span className="hidden sm:inline">RAY_ID: 9db14ccd</span>
          <span className="hidden md:inline">NODE: v20.11.0</span>
        </div>
      </div>

      {/* 扫描线效果 */}
      <div className="scan-line opacity-30 sm:opacity-50"></div>
    </footer>
  )
}
