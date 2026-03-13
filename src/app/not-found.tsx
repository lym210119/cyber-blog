'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [glitchText, setGlitchText] = useState('404')
  const [scanLine, setScanLine] = useState(0)
  
  // 模拟故障效果
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchText(prev => {
        const glitches = ['404', '4😈4', '💥0💥', 'ERR', '👾👾👾', 'NULL']
        return glitches[Math.floor(Math.random() * glitches.length)]
      })
    }, 300)

    // 扫描线移动
    const scanInterval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100)
    }, 50)

    return () => {
      clearInterval(glitchInterval)
      clearInterval(scanInterval)
    }
  }, [])

  return (
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      {/* 背景网格 */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20"></div>
      
      {/* 动态光晕 */}
      <motion.div
        className="absolute w-96 h-96 bg-cyber-primary/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute w-96 h-96 bg-cyber-secondary/20 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 70, -40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* 扫描线 */}
      <div 
        className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-cyber-primary/10 to-transparent pointer-events-none"
        style={{
          top: `${scanLine}%`,
          transition: 'top 0.05s linear'
        }}
      />

      {/* 主内容 */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* 故障数字 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-8xl md:text-9xl font-bold relative">
            <span 
              className="glitch-text inline-block"
              data-text={glitchText}
              style={{
                textShadow: `
                  2px 2px 0 #ff00ff,
                  -2px -2px 0 #00ffff
                `
              }}
            >
              {glitchText}
            </span>
          </h1>
        </motion.div>

        {/* 错误信息 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="neon-panel p-8 mb-8"
        >
          <div className="space-y-4">
            {/* 终端风格错误信息 */}
            <div className="flex items-center gap-2 text-sm text-cyber-muted font-mono">
              <span className="text-cyber-primary animate-pulse">$</span>
              <span>curl -I https://yourblog.com{typeof window !== 'undefined' ? window.location.pathname : ''}</span>
            </div>

            <div className="space-y-2 text-left font-mono">
              <p className="text-cyber-secondary">HTTP/1.1 404 Not Found</p>
              <p className="text-cyber-muted">Date: {new Date().toUTCString()}</p>
              <p className="text-cyber-muted">Server: CyberServer/2.3.1</p>
              <p className="text-cyber-primary">Content-Type: text/plain</p>
              <p className="text-cyber-muted">────────────────────────────────</p>
            </div>

            <div className="space-y-2 text-left">
              <p className="text-cyber-text/80">
                <span className="text-cyber-pink">⚠</span> 错误代码: <span className="text-cyber-primary">PATH_NOT_FOUND</span>
              </p>
              <p className="text-cyber-text/80">
                <span className="text-cyber-pink">🔍</span> 请求路径: <span className="text-cyber-secondary break-all">
                  {typeof window !== 'undefined' ? window.location.pathname : ''}
                </span>
              </p>
              <p className="text-cyber-text/80">
                <span className="text-cyber-pink">⏱️</span> 时间戳: <span className="text-cyber-muted">{Date.now()}</span>
              </p>
            </div>

            {/* 诊断信息 */}
            <div className="mt-6 p-4 bg-black/50 border border-cyber-red/30">
              <p className="text-cyber-red text-sm mb-2">[系统诊断]</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-cyber-muted">节点状态:</span>
                  <span className="text-cyber-primary">离线</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyber-muted">信号强度:</span>
                  <span className="text-cyber-yellow">42%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyber-muted">数据包丢失:</span>
                  <span className="text-cyber-red">100%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyber-muted">备用路由:</span>
                  <span className="text-cyber-secondary">搜索中...</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 导航按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/"
            className="cyber-button group relative px-8 py-4 min-w-[200px]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span className="text-xl">⌂</span>
              <span>返回首页</span>
              <span className="text-cyber-secondary group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>

          <Link
            href="/posts"
            className="cyber-button group relative px-8 py-4 min-w-[200px]"
            style={{ borderColor: '#ff00ff' }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span className="text-xl">📄</span>
              <span>浏览文章</span>
              <span className="text-cyber-secondary group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>
        </motion.div>

        {/* 快捷命令 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 flex flex-wrap gap-3 justify-center"
        >
          {[
            { cmd: 'ls', desc: '列出文章', href: '/posts' },
            { cmd: 'cd ~', desc: '返回首页', href: '/' },
            { cmd: 'help', desc: '获取帮助', href: '#' },
            { cmd: 'ping', desc: '测试连接', href: '#' },
          ].map((item) => (
            <Link
              key={item.cmd}
              href={item.href}
              className="group px-4 py-2 border border-cyber-primary/30 hover:border-cyber-secondary 
                       transition-all duration-300 text-sm"
            >
              <span className="text-cyber-primary">$</span>
              <span className="text-cyber-muted mx-2">{item.cmd}</span>
              <span className="text-cyber-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                {item.desc}
              </span>
            </Link>
          ))}
        </motion.div>

        {/* 故障文字效果 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 text-[8px] text-cyber-muted/30 font-mono"
        >
          <p>ERROR: 0x7C5F_3A1D | RAY_ID: 9db14ccd3a71dbb5 | TIMEOUT: 30s</p>
          <p className="mt-1">CONNECTION LOST • RE-ROUTING • ESTABLISHING SECURE CONNECTION</p>
        </motion.div>
      </div>

      {/* 装饰性元素 */}
      <div className="absolute bottom-10 left-10 text-cyber-primary/20 text-xs font-mono rotate-90 origin-left">
        {'<'} TERMINAL v2.3.1 {'/>'}
      </div>
      
      <div className="absolute top-10 right-10 text-cyber-secondary/20 text-xs font-mono -rotate-90 origin-right">
        {'{'} SYSTEM ERROR {'}'}
      </div>
    </div>
  )
}