'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export const MobileNav = () => {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { href: '/' as const, label: '首页', icon: '⌂', mobileIcon: '🏠' },
    { href: '/posts' as const, label: '文章', icon: '📄', mobileIcon: '📚' },
    { href: '/tags' as const, label: '标签', icon: '#', mobileIcon: '🏷️' },
    { href: '/archive' as const, label: '归档', icon: '📚', mobileIcon: '🗂️' },
    { href: '/search' as const, label: '搜索', icon: '🔍', mobileIcon: '🔎' },
    { href: '/about' as const, label: '关于', icon: '👤', mobileIcon: 'ℹ️' },
  ]

  return (
    <>
      {/* 底部导航栏 - 移动端 */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 neon-panel border-b-0 z-50 pb-safe-bottom">
        <div className="flex justify-around items-center h-16">
          {navItems.slice(0, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full 
                transition-all duration-300 touch-target
                ${pathname === item.href 
                  ? 'text-cyber-primary' 
                  : 'text-cyber-muted hover:text-cyber-primary'
                }`}
            >
              <span className={`text-xl ${pathname === item.href ? 'animate-pulse' : ''}`}>
                {item.mobileIcon}
              </span>
              <span className="text-[10px] mt-1">{item.label}</span>
              {pathname === item.href && (
                <motion.span
                  layoutId="mobileActiveTab"
                  className="absolute -top-[2px] left-0 right-0 h-0.5 bg-cyber-primary"
                />
              )}
            </Link>
          ))}
          
          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-col items-center justify-center flex-1 h-full text-cyber-muted hover:text-cyber-secondary touch-target"
          >
            <span className="text-xl">⌘</span>
            <span className="text-[10px] mt-1">更多</span>
          </button>
        </div>
      </nav>

      {/* 更多菜单 - 底部抽屉 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 right-0 neon-panel border-b-0 rounded-t-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 pb-safe-bottom">
                <div className="flex items-center justify-between mb-6">
                  <span className="neon-text-pink text-sm">📋 更多功能</span>
                  <button 
                    onClick={() => setMenuOpen(false)}
                    className="touch-target text-cyber-muted hover:text-cyber-primary"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {navItems.slice(4).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex flex-col items-center p-4 border
                        ${pathname === item.href 
                          ? 'border-cyber-primary bg-cyber-primary/10 text-cyber-primary' 
                          : 'border-cyber-primary/30 text-cyber-muted'
                        } transition-all touch-target`}
                    >
                      <span className="text-2xl mb-2">{item.mobileIcon}</span>
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  ))}
                </div>

                {/* 快捷命令 */}
                <div className="mt-6 pt-4 border-t border-cyber-primary/30">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button className="p-2 border border-cyber-primary/30 text-cyber-primary">
                      ⌘K 命令
                    </button>
                    <button className="p-2 border border-cyber-primary/30 text-cyber-secondary">
                      🌓 主题
                    </button>
                    <button className="p-2 border border-cyber-primary/30 text-cyber-accent">
                      ↻ 刷新
                    </button>
                  </div>
                </div>

                {/* 系统信息 */}
                <div className="mt-4 text-[10px] text-cyber-muted/50 text-center">
                  SYSTEM ONLINE · v2.3.1
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 底部占位 - 防止内容被导航栏遮挡 */}
      <div className="md:hidden h-16"></div>
    </>
  )
}