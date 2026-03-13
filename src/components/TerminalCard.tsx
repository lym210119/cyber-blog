'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Post } from '@/types'

interface TerminalCardProps {
  post: Post
  index: number
}

export const TerminalCard = ({ post, index }: TerminalCardProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
    })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
      className="neon-panel p-3 sm:p-5 hover:border-cyber-secondary/50 transition-all duration-300 group w-full"
    >
      <Link href={`/posts/${post.slug}`} className="block w-full">
        {/* 终端提示行 - 移动端优化 */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-cyber-muted mb-2 sm:mb-3 font-mono">
          <span className="text-cyber-primary">$</span>
          <span className="text-cyber-secondary truncate max-w-[80px] sm:max-w-[120px]">
            cat {post.slug}
          </span>
          <span className="ml-auto flex items-center gap-1 flex-shrink-0">
            <span className="text-cyber-primary hidden xs:inline">{formatDate(post.date)}</span>
            <span className="text-cyber-secondary hidden xs:inline">|</span>
            <span className="text-cyber-purple">{post.readingTime}min</span>
          </span>
        </div>

        {/* 标题 */}
        <h2 className="text-base sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 
                       group-hover:neon-text transition-all duration-300 break-words line-clamp-2">
          {post.title}
        </h2>

        {/* 摘要 - 移动端隐藏 */}
        <p className="hidden sm:block text-cyber-muted text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* 标签 - 移动端优化 */}
        <div className="flex flex-wrap gap-1 sm:gap-2 max-w-full">
          {post.tags.slice(0, 2).map((tag, i) => (
            <span
              key={tag}
              className="px-2 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-xs 
                         border border-cyber-primary/30 text-cyber-primary 
                       hover:bg-cyber-primary/10 transition-all duration-300"
              onClick={(e) => {
                e.preventDefault()
                window.location.href = `/?tag=${tag}`
              }}
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 2 && (
            <span className="px-2 py-0.5 text-[8px] border border-cyber-primary/30 text-cyber-muted">
              +{post.tags.length - 2}
            </span>
          )}
        </div>

        {/* 阅读更多 - 移动端优化 */}
        <div className="mt-2 sm:mt-4 flex items-center text-cyber-secondary 
                        group-hover:translate-x-2 transition-transform duration-300">
          <span className="animate-pulse mr-1 text-xs sm:text-sm">▶</span>
          <span className="text-xs sm:text-sm hidden xs:inline">读取更多...</span>
          <span className="text-xs sm:hidden">阅读</span>
        </div>
      </Link>
    </motion.article>
  )
}