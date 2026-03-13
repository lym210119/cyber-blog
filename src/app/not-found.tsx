'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [glitchText, setGlitchText] = useState('404')
  const [scanLine, setScanLine] = useState(0)
  
  // 模拟故障效果（移动端延长间隔减少性能消耗）
  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const glitchInterval = setInterval(() => {
      setGlitchText(prev => {
        const glitches = ['404', '4😈4', '💥0💥', 'ERR', '👾👾👾', 'NULL']
        return glitches[Math.floor(Math.random() * glitches.length)]
      })
    }, isMobile ? 500 : 300) // 移动端降低频率

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
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden px-4 sm:px-6">
      {/* 背景网格 */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 sm:opacity-20"></div>
      
      {/* 动态光晕 - 移动端减弱模糊和移动距离 */}
      <motion.div
        className="absolute w-48 h-48 sm:w-96 sm:h-96 bg-cyber-primary/20 rounded-full blur-2xl sm:blur-3xl"
        animate={{
          x: [0, 50, -25, 0],
          y: [0, -25, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute w-48 h-48 sm:w-96 sm:h-96 bg-cyber-secondary/20 rounded-full blur-2xl sm:blur-3xl"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 35, -20, 0],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* 扫描线 - 移动端透明度降低 */}
      <div 
        className="absolute left-0 right-0 h-10 sm:h-20 bg-gradient-to-b from-transparent via-cyber-primary/10 to-transparent pointer-events-none opacity-50 sm:opacity-100"
        style={{
          top: `${scanLine}%`,
          transition: 'top 0.05s linear'
        }}
      />

      {/* 主内容 */}
      <div className="relative z-10 text-center w-full max-w-4xl mx-auto">
        {/* 故障数字 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4 sm:mb-8"
        >
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold relative">
            <span 
              className="glitch-text inline-block"
              data-text={glitchText}
              style={{
                textShadow: `
                  1px 1px 0 #ff00ff,
                  -1px -1px 0 #00ffff
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
          className="neon-panel p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8"
        >
          <div className="space-y-3 sm:space-y-4">
            {/* 终端风格错误信息 */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-cyber-muted font-mono">
              <span className="text-cyber-primary animate-pulse">$</span>
              <span className="truncate max-w-[200px] sm:max-w-none">
                curl -I {typeof window !== 'undefined' ? window.location.pathname : ''}
              </span>
            </div>

            <div className="space-y-1 text-left font-mono text-xs sm:text-sm">
              <p className="text-cyber-secondary">HTTP/1.1 404 Not Found</p>
              <p className="text-cyber-muted">Date: {new Date().toUTCString().slice(0, 25)}</p>
              <p className="text-cyber-muted hidden sm:block">Server: CyberServer/2.3.1</p>
              <p className="text-cyber-primary">Content-Type: text/plain</p>
              <p className="text-cyber-muted hidden sm:block">────────────────────────────────</p>
            </div>

            <div className="space-y-1 text-left text-xs sm:text-sm">
              <p className="text-cyber-text/80">
                <span className="text-cyber-pink">⚠️</span> 错误代码: <span className="text-cyber-primary">PATH_NOT_FOUND</span>
              </p>
              <p className="text-cyber-text/80">
                <span className="text-cyber-pink">🔍</span> 请求路径: <span className="text-cyber-secondary break-all">
                  {typeof window !== 'undefined' ? window.location.pathname : ''}
                </span>
              </p>
              <p className="text-cyber-text/80 hidden xs:block">
                <span className="text-cyber-pink">⏱️</span> 时间戳: <span className="text-cyber-muted">{Date.now()}</span>
              </p>
            </div>

            {/* 诊断信息 - 移动端单列 */}
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-black/50 border border-cyber-red/30">
              <p className="text-cyber-red text-xs sm:text-sm mb-2">[系统诊断]</p>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-1 sm:gap-2 text-xs">
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

        {/* 导航按钮 - 移动端垂直堆叠，全宽按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center"
        >
          <Link
            href="/"
            className="cyber-button group px-6 py-3 sm:px-8 sm:py-4 w-full sm:w-auto min-w-[160px] touch-target"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span className="text-lg sm:text-xl">⌂</span>
              <span>返回首页</span>
              <span className="text-cyber-secondary group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>

          <Link
            href="/posts"
            className="cyber-button group px-6 py-3 sm:px-8 sm:py-4 w-full sm:w-auto min-w-[160px] touch-target"
            style={{ borderColor: '#ff00ff' }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span className="text-lg sm:text-xl">📄</span>
              <span>浏览文章</span>
              <span className="text-cyber-secondary group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>
        </motion.div>

        {/* 快捷命令 - 移动端网格布局 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-6 sm:mt-10 grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 justify-center"
        >
          {[
            { cmd: 'ls', desc: '列出文章', href: '/posts' as const },
            { cmd: 'cd ~', desc: '返回首页', href: '/' as const },
            { cmd: 'help', desc: '获取帮助', href: '#' as const },
            { cmd: 'ping', desc: '测试连接', href: '#' as const },
          ].map((item) => (
            <Link
              key={item.cmd}
              href={item.href}
              className="group px-3 py-2 sm:px-4 sm:py-2 border border-cyber-primary/30 hover:border-cyber-secondary 
                       transition-all duration-300 text-xs sm:text-sm touch-target flex items-center justify-center"
            >
              <span className="text-cyber-primary">$</span>
              <span className="text-cyber-muted mx-1 sm:mx-2">{item.cmd}</span>
              <span className="text-cyber-secondary opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">
                {item.desc}
              </span>
            </Link>
          ))}
        </motion.div>

        {/* 故障文字效果 - 移动端隐藏 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-6 sm:mt-8 text-[6px] sm:text-[8px] text-cyber-muted/30 font-mono hidden sm:block"
        >
          <p>ERROR: 0x7C5F_3A1D | RAY_ID: 9db14ccd3a71dbb5 | TIMEOUT: 30s</p>
          <p className="mt-1">CONNECTION LOST • RE-ROUTING • ESTABLISHING SECURE CONNECTION</p>
        </motion.div>
      </div>

      {/* 装饰性元素 - 移动端隐藏 */}
      <div className="absolute bottom-5 left-2 sm:bottom-10 sm:left-10 text-cyber-primary/20 text-[8px] sm:text-xs font-mono rotate-90 origin-left hidden sm:block">
        {'<'} TERMINAL v2.3.1 {'/>'}
      </div>
      
      <div className="absolute top-5 right-2 sm:top-10 sm:right-10 text-cyber-secondary/20 text-[8px] sm:text-xs font-mono -rotate-90 origin-right hidden sm:block">
        {'{'} SYSTEM ERROR {'}'}
      </div>

      {/* 安全区域适配 */}
      <div className="pb-safe-bottom" />
    </div>
  )
}
