'use client'

import { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchPosts, fetchTags } from '@/lib/client/posts'

export const CommandPalette = () => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [posts, setPosts] = useState<any[]>([])
  const [tags, setTags] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open])

  useEffect(() => {
    if (open) {
      setLoading(true)
      Promise.all([
        fetchPosts(1, undefined, 5),
        fetchTags()
      ]).then(([postsData, tagsData]) => {
        setPosts(postsData.posts || [])
        setTags(tagsData || [])
      }).finally(() => {
        setLoading(false)
      })
    }
  }, [open])

  const commands = [
    { command: 'home', description: '首页', icon: '⌂', href: '/' },
    { command: 'posts', description: '文章', icon: '📄', href: '/posts' },
    { command: 'tags', description: '标签', icon: '#', href: '/tags' },
    { command: 'archive', description: '归档', icon: '📚', href: '/archive' },
    { command: 'search', description: '搜索', icon: '🔍', href: '/search' },
    { command: 'about', description: '关于', icon: '👤', href: '/about' },
  ]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center 
                     px-2 sm:px-4 pt-10 sm:pt-20 pb-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="w-full max-w-lg sm:max-w-2xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Command className="neon-panel border-2 border-cyber-primary overflow-hidden w-full max-h-full flex flex-col">
              <div className="flex items-center border-b border-cyber-primary/30 p-2 sm:p-3">
                <span className="text-cyber-primary mr-2 flex-shrink-0 animate-pulse text-sm sm:text-base">$</span>
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder="输入命令或搜索..."
                  className="w-full bg-transparent text-cyber-text outline-none 
                           placeholder:text-cyber-muted/50 text-sm sm:text-base min-w-0"
                  autoFocus
                />
                {loading && (
                  <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-cyber-primary 
                                border-t-cyber-secondary rounded-full animate-spin ml-2"></div>
                )}
              </div>
              
              <Command.List className="flex-1 overflow-auto p-2 max-h-[60vh] sm:max-h-96">
                <Command.Empty className="p-4 sm:p-8 text-cyber-muted text-center">
                  <div className="text-2xl mb-2">🔍</div>
                  <div className="text-sm sm:text-base">未找到: {search}</div>
                  <div className="text-xs text-cyber-muted/50 mt-2">
                    试试: home, posts, tags, archive, search, about
                  </div>
                </Command.Empty>

                {/* 页面命令 */}
                <Command.Group heading="📌 导航" className="p-1 sm:p-2">
                  {commands.map((cmd) => (
                    <Command.Item
                      key={cmd.command}
                      onSelect={() => {
                        router.push(cmd.href)
                        setOpen(false)
                      }}
                      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 
                               hover:bg-cyber-primary/10 cursor-pointer 
                               border-l-2 border-transparent hover:border-cyber-secondary 
                               transition-all duration-300 text-sm sm:text-base"
                    >
                      <span className="text-cyber-secondary flex-shrink-0">{cmd.icon}</span>
                      <span className="text-cyber-primary flex-shrink-0">$</span>
                      <span className="text-cyber-text truncate">{cmd.command}</span>
                      <span className="text-cyber-muted text-xs sm:text-sm ml-auto hidden sm:inline">
                        {cmd.description}
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>

                {/* 文章快捷方式 */}
                {posts.length > 0 && (
                  <Command.Group heading="📝 最近文章" className="p-1 sm:p-2">
                    {posts.map((post) => (
                      <Command.Item
                        key={post.slug}
                        onSelect={() => {
                          router.push(`/posts/${post.slug}`)
                          setOpen(false)
                        }}
                        className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 
                                 hover:bg-cyber-primary/10 cursor-pointer 
                                 border-l-2 border-transparent hover:border-cyber-secondary 
                                 transition-all duration-300 text-sm sm:text-base"
                      >
                        <span className="text-cyber-yellow flex-shrink-0">📄</span>
                        <span className="text-cyber-text truncate">{post.title}</span>
                        <span className="text-xs text-cyber-muted ml-auto">
                          {post.readingTime}min
                        </span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}

                {/* 标签快捷方式 */}
                {tags.length > 0 && (
                  <Command.Group heading="🏷️ 热门标签" className="p-1 sm:p-2">
                    {tags.slice(0, 3).map(({ name, count }) => (
                      <Command.Item
                        key={name}
                        onSelect={() => {
                          router.push(`/?tag=${name}`)
                          setOpen(false)
                        }}
                        className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 
                                 hover:bg-cyber-primary/10 cursor-pointer 
                                 border-l-2 border-transparent hover:border-cyber-secondary 
                                 transition-all duration-300 text-sm sm:text-base"
                      >
                        <span className="text-cyber-primary flex-shrink-0">#</span>
                        <span className="text-cyber-text">{name}</span>
                        <span className="text-xs text-cyber-muted ml-auto">
                          ({count})
                        </span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}
              </Command.List>

              {/* 底部提示 - 移动端简化 */}
              <div className="border-t border-cyber-primary/30 p-2 text-[10px] sm:text-xs 
                            text-cyber-muted flex justify-between">
                <span className="hidden sm:inline">↑↓ 选择</span>
                <span>↵ 执行</span>
                <span>ESC 关闭</span>
                <span className="text-cyber-primary hidden sm:inline">v2.3.1</span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}