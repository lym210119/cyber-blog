// src/app/search/page.tsx
'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchPosts } from '@/lib/client/posts'
import { Post } from '@/types' // 确保导入 Post 类型

// 搜索组件 - 使用 useSearchParams
function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  
  const [searchQuery, setSearchQuery] = useState(query)
  const [results, setResults] = useState<Post[]>([]) // 明确指定类型
  const [loading, setLoading] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  // 加载搜索历史
  useEffect(() => {
    const history = localStorage.getItem('searchHistory')
    if (history) {
      setSearchHistory(JSON.parse(history))
    }
  }, [])

  // 执行搜索
  const performSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      const { posts } = await fetchPosts(1, undefined, 50)
      
      const filtered = posts.filter((post: Post) => { // 添加 post 类型
        const searchLower = q.toLowerCase()
        return (
          post.title.toLowerCase().includes(searchLower) ||
          post.content.toLowerCase().includes(searchLower) ||
          post.tags.some(tag => tag.toLowerCase().includes(searchLower))
        )
      })
      
      setResults(filtered)

      // 保存到历史
      if (filtered.length > 0) {
        const newHistory = [q, ...searchHistory.filter(h => h !== q)].slice(0, 5)
        setSearchHistory(newHistory)
        localStorage.setItem('searchHistory', JSON.stringify(newHistory))
      }
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }, [searchHistory])

  useEffect(() => {
    if (query) {
      performSearch(query)
    }
  }, [query, performSearch])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchQuery)}`)
      performSearch(searchQuery)
    }
  }

  return (
    <div className="container mx-auto space-y-4 sm:space-y-6">
      {/* 搜索框 */}
      <div className="neon-panel p-4 sm:p-6">
        <div className="flex items-center gap-2 text-xs sm:text-sm mb-3 sm:mb-4">
          <span className="text-cyber-primary animate-pulse">$</span>
          <span className="text-cyber-muted">grep -r "{query || 'keyword'}" ./posts</span>
        </div>
        
        <form onSubmit={handleSearch} className="flex flex-col xs:flex-row gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="输入关键词搜索..."
            className="flex-1 bg-black border border-cyber-primary/30 px-3 sm:px-4 py-2 sm:py-3 
                     text-sm sm:text-base text-cyber-text focus:border-cyber-secondary 
                     outline-none transition-colors font-mono touch-target"
            autoFocus
          />
          <button
            type="submit"
            className="cyber-button px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base touch-target"
            disabled={loading}
          >
            <span className="flex items-center justify-center gap-2">
              <span>🔍</span>
              <span>搜索</span>
            </span>
          </button>
        </form>

        <div className="mt-2 text-[8px] sm:text-xs text-cyber-muted/50 flex gap-2 sm:gap-4">
          <span>支持标题/内容/标签</span>
          <span className="hidden xs:inline">|</span>
          <span className="hidden xs:inline">不区分大小写</span>
        </div>
      </div>

      {/* 搜索历史 */}
      {searchHistory.length > 0 && !query && (
        <div className="neon-panel p-3 sm:p-4">
          <h2 className="text-xs sm:text-sm text-cyber-secondary mb-2 sm:mb-3 flex items-center gap-2">
            <span>📋</span> 最近搜索
          </h2>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((item) => (
              <Link
                key={item}
                href={`/search?q=${encodeURIComponent(item)}`}
                className="px-2 py-1 sm:px-3 sm:py-1.5 border border-cyber-primary/30 
                         text-[10px] sm:text-xs hover:border-cyber-secondary 
                         hover:text-cyber-primary transition-all touch-target"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 搜索结果 */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="neon-panel p-8 sm:p-12 text-center"
          >
            <div className="inline-block w-6 h-6 sm:w-8 sm:h-8 border-2 border-cyber-primary 
                          border-t-cyber-secondary rounded-full animate-spin"></div>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-cyber-muted">搜索中...</p>
          </motion.div>
        ) : query && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-3 sm:space-y-4"
          >
            {/* 结果统计 */}
            <div className="neon-panel p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-cyber-primary text-xs sm:text-sm">📊</span>
                  <span className="text-[10px] sm:text-sm text-cyber-muted">
                    找到 <span className="text-cyber-primary">{results.length}</span> 个结果
                  </span>
                </div>
                <div className="text-[8px] sm:text-xs text-cyber-muted/50">
                  {(performance.now() / 1000).toFixed(2)}秒
                </div>
              </div>
            </div>

            {/* 结果列表 - 修复了第 201 行的类型错误 */}
            {results.length > 0 ? (
              results.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/posts/${post.slug}`}>
                    <div className="neon-panel p-3 sm:p-4 hover:border-cyber-secondary transition-all group">
                      <div className="flex items-center gap-2 text-[8px] sm:text-xs text-cyber-muted mb-1 sm:mb-2">
                        <span className="text-cyber-primary">{new Date(post.date).toLocaleDateString()}</span>
                        <span className="text-cyber-secondary">|</span>
                        <span>{post.readingTime}min</span>
                      </div>
                      
                      <h3 className="text-sm sm:text-base font-bold text-cyber-primary 
                                   group-hover:text-cyber-secondary transition-colors mb-1 sm:mb-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-[10px] sm:text-sm text-cyber-muted mb-2 line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* 修复关键：为 tag 参数添加类型注解 :string */}
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag: string) => (
                          <span key={tag} className="text-[8px] sm:text-xs px-1.5 py-0.5 
                                                   border border-cyber-primary/30">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="neon-panel p-6 sm:p-12 text-center">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-4 text-cyber-muted/30">🔍</div>
                <h3 className="text-sm sm:text-base text-cyber-primary mb-2">未找到结果</h3>
                <p className="text-[10px] sm:text-xs text-cyber-muted">
                  没有找到与 "{query}" 相关的文章
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 热门搜索 */}
      <div className="neon-panel p-3 sm:p-4">
        <h2 className="text-xs sm:text-sm text-cyber-secondary mb-2 sm:mb-3 flex items-center gap-2">
          <span>🔥</span> 热门搜索
        </h2>
        <div className="flex flex-wrap gap-2">
          {['Next.js', 'React', 'TypeScript', 'Rust', 'Web3'].map((item) => (
            <Link
              key={item}
              href={`/search?q=${item}`}
              className="px-2 py-1 sm:px-3 sm:py-1.5 border border-cyber-primary/30 
                       text-[10px] sm:text-xs hover:border-cyber-secondary 
                       hover:text-cyber-primary transition-all touch-target"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// 主页面组件，使用 Suspense 包裹 SearchContent
export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto max-w-4xl space-y-4 sm:space-y-6">
        <div className="neon-panel p-8 sm:p-12 text-center">
          <div className="inline-block w-6 h-6 sm:w-8 sm:h-8 border-2 border-cyber-primary 
                        border-t-cyber-secondary rounded-full animate-spin"></div>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-cyber-muted">加载搜索...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
