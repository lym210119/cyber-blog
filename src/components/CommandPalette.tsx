'use client'

import { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export const CommandPalette = () => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const commands = [
    { command: 'home', description: '返回首页', icon: '⌂' },
    { command: 'posts', description: '所有文章', icon: '📄' },
    { command: 'theme', description: '切换主题', icon: '🎨' },
    { command: 'help', description: '帮助', icon: '?' },
  ]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Command className="neon-panel border-2 border-cyber-primary overflow-hidden">
              <div className="flex items-center border-b border-cyber-primary/30 p-3">
                <span className="text-cyber-primary mr-2">$</span>
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder="输入命令或搜索..."
                  className="w-full bg-transparent text-cyber-text outline-none placeholder:text-cyber-muted/50"
                  autoFocus
                />
              </div>
              
              <Command.List className="max-h-96 overflow-auto p-2">
                <Command.Empty className="p-4 text-cyber-muted text-center">
                  <span className="text-cyber-secondary">未找到:</span> {search}
                </Command.Empty>

                <Command.Group heading="系统命令" className="p-2">
                  {commands.map((cmd) => (
                    <Command.Item
                      key={cmd.command}
                      onSelect={() => {
                        router.push(cmd.command === 'home' ? '/' : `/${cmd.command}`)
                        setOpen(false)
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-cyber-primary/10 cursor-pointer 
                               border-l-2 border-transparent hover:border-cyber-secondary 
                               transition-all duration-300 group"
                    >
                      <span className="text-cyber-secondary group-hover:animate-pulse">
                        {cmd.icon}
                      </span>
                      <span className="text-cyber-primary">$</span>
                      <span className="text-cyber-text">{cmd.command}</span>
                      <span className="text-cyber-muted text-sm ml-auto">
                        {cmd.description}
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>

              {/* 底部提示 */}
              <div className="border-t border-cyber-primary/30 p-2 text-xs text-cyber-muted flex justify-between">
                <span>↑↓ 选择</span>
                <span>↵ 执行</span>
                <span>ESC 关闭</span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}