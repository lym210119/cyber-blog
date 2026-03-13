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
    <footer className="neon-panel border-b-0 border-x-0 mt-8">
      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-6">
        {/* 系统状态栏 - 移动端简化 */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-xs font-mono">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="text-cyber-primary animate-pulse-slow">●</span>
            <span className="text-cyber-muted hidden xs:inline">v{stats.version}</span>
            <span className="text-cyber-secondary hidden sm:inline">|</span>
            <span className="text-cyber-muted hidden sm:inline">UPTIME: {stats.uptime}</span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="text-cyber-muted">CONN: {stats.connections}</span>
            <span className="text-cyber-secondary hidden xs:inline">|</span>
            <span className="text-cyber-muted hidden xs:inline">{stats.latency}</span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <a href="/feed.xml" className="text-cyber-primary hover:text-cyber-secondary">RSS</a>
            <a href="/sitemap.xml" className="text-cyber-primary hover:text-cyber-secondary hidden xs:inline">MAP</a>
          </div>
        </div>

        {/* 导航链接 - 移动端滚动 */}
        <div className="mt-3 pt-3 border-t border-cyber-primary/30 overflow-x-auto">
          <div className="flex gap-3 sm:gap-4 text-[10px] sm:text-xs min-w-max pb-1">
            <Link href="/" className="text-cyber-muted hover:text-cyber-primary">首页</Link>
            <Link href="/posts" className="text-cyber-muted hover:text-cyber-primary">文章</Link>
            <Link href="/tags" className="text-cyber-muted hover:text-cyber-primary">标签</Link>
            <Link href="/archive" className="text-cyber-muted hover:text-cyber-primary">归档</Link>
            <Link href="/search" className="text-cyber-muted hover:text-cyber-primary">搜索</Link>
            <Link href="/about" className="text-cyber-muted hover:text-cyber-primary">关于</Link>
            <a href="https://github.com" className="text-cyber-muted hover:text-cyber-primary">GitHub</a>
          </div>
        </div>

        {/* 诊断信息 - 移动端只显示一行 */}
        <div className="mt-3 text-[8px] sm:text-[10px] text-cyber-muted/50 font-mono">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <span>© 2025 赛博空间</span>
            <span className="hidden xs:inline">ERROR: 0x7C5F_3A1D</span>
            <span className="hidden sm:inline">RAY_ID: 9db14ccd</span>
          </div>
        </div>
      </div>

      <div className="scan-line"></div>
    </footer>
  )
}