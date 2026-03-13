'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export const MobileNav = () => {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { href: '/', icon: '⌂', label: 'HOME', color: 'primary' },
    { href: '/posts', icon: '📄', label: 'POSTS', color: 'secondary' },
  ]

  return (
    <>
      {/* 底部导航栏 */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 neon-panel border-b-0 z-50">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full 
                transition-all duration-300 group relative
                ${pathname === item.href 
                  ? `text-cyber-${item.color}` 
                  : 'text-cyber-muted hover:text-cyber-primary'
                }`}
            >
              <span className={`text-xl ${pathname === item.href ? 'animate-pulse' : ''}`}>
                {item.icon}
              </span>
              <span className="text-[10px] mt-1">{item.label}</span>
              {pathname === item.href && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute -top-[2px] left-0 right-0 h-0.5 bg-cyber-primary"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          ))}
          
          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-col items-center justify-center flex-1 h-full text-cyber-muted hover:text-cyber-secondary transition-colors"
          >
            <span className="text-xl">⌘</span>
            <span className="text-[10px] mt-1">CMD</span>
          </button>
        </div>
      </nav>

      {/* 命令菜单 */}
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
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="neon-text-pink text-sm">COMMAND_PALETTE</span>
                  <button 
                    onClick={() => setMenuOpen(false)}
                    className="text-cyber-muted hover:text-cyber-primary"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    { cmd: 'ls', desc: '列出所有文章', icon: '📄' },
                    { cmd: 'help', desc: '显示帮助', icon: '?' },
                    { cmd: 'clear', desc: '清除终端', icon: '⌧' },
                  ].map((item) => (
                    <motion.button
                      key={item.cmd}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="w-full border border-cyber-primary/30 p-4 text-left 
                               hover:border-cyber-secondary hover:bg-cyber-secondary/5 
                               transition-all duration-300 group"
                      onClick={() => {
                        // 处理命令
                        setMenuOpen(false)
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-cyber-secondary group-hover:animate-pulse">
                          {item.icon}
                        </span>
                        <span className="text-cyber-primary">$</span>
                        <span className="text-cyber-text">{item.cmd}</span>
                        <span className="text-cyber-muted text-sm ml-auto">
                          {item.desc}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* 诊断信息 */}
                <div className="mt-6 pt-4 border-t border-cyber-primary/30 text-[10px] text-cyber-muted/50">
                  <div className="flex justify-between">
                    <span>SYSTEM: ONLINE</span>
                    <span>TERMINAL: v2.3.1</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}