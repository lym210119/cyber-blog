// src/components/Footer.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export const Footer = () => {
  const [stats, setStats] = useState({
    uptime: '99.97%',
    connections: '1,337',
    latency: '42ms',
    version: '2.3.1',
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        uptime: '99.97%',
        connections: Math.floor(Math.random() * 1000 + 1000).toLocaleString(),
        latency: Math.floor(Math.random() * 20 + 30) + 'ms',
        version: '2.3.1',
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="neon-panel border-b-0 border-x-0 mt-8">
      <div className="container mx-auto px-4 py-6">
        {/* 系统状态栏 */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center space-x-4">
            <span className="text-cyber-primary animate-pulse-slow">●</span>
            <span className="text-cyber-muted">SYSTEM v{stats.version}</span>
            <span className="text-cyber-secondary">|</span>
            <span className="text-cyber-muted">UPTIME: {stats.uptime}</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-cyber-muted">CONNECTIONS: {stats.connections}</span>
            <span className="text-cyber-secondary">|</span>
            <span className="text-cyber-muted">LATENCY: {stats.latency}</span>
          </div>

          <div className="flex items-center space-x-4">
            <a href="/feed.xml" className="text-cyber-primary hover:text-cyber-secondary transition-colors">
              [RSS]
            </a>
            <a href="/sitemap.xml" className="text-cyber-primary hover:text-cyber-secondary transition-colors">
              [SITEMAP]
            </a>
            <a href="/manifest.webmanifest" className="text-cyber-primary hover:text-cyber-secondary transition-colors">
              [PWA]
            </a>
          </div>
        </div>

        {/* 导航链接 */}
        <div className="mt-4 pt-4 border-t border-cyber-primary/30">
          <div className="flex flex-wrap gap-4 text-xs">
            <Link href="/" className="text-cyber-muted hover:text-cyber-primary">首页</Link>
            <Link href="/posts" className="text-cyber-muted hover:text-cyber-primary">文章</Link>
            <Link href="/tags" className="text-cyber-muted hover:text-cyber-primary">标签</Link>
            <Link href="/archive" className="text-cyber-muted hover:text-cyber-primary">归档</Link>
            <Link href="/search" className="text-cyber-muted hover:text-cyber-primary">搜索</Link>
            <Link href="/about" className="text-cyber-muted hover:text-cyber-primary">关于</Link>
          </div>
        </div>

        {/* 诊断信息 */}
        <div className="mt-4 text-[10px] text-cyber-muted/50 font-mono">
          <div className="flex flex-wrap gap-4">
            <span>© 2026 赛博空间·极客终端博客</span>
            <span>ERROR_CODE: 0x7C5F_3A1D</span>
            <span>RAY_ID: 9db14ccd3a71dbb5</span>
            <span className="hidden md:inline">CLIENT_IP: 240e:45c:ce60:3f48</span>
          </div>
          <div className="flex flex-wrap gap-4 mt-1">
            <span>BUILD: {new Date().toISOString().split('T')[0]}</span>
            <span>NODE: v20.11.0</span>
            <span>NEXT: 15.2.2</span>
          </div>
        </div>
      </div>

      {/* 扫描线 */}
      <div className="scan-line"></div>
    </footer>
  )
}
