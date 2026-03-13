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
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="neon-panel p-5 hover:border-cyber-secondary/50 transition-all duration-300 group"
    >
      <Link href={`/posts/${post.slug}`}>
        {/* 终端提示行 */}
        <div className="flex items-center gap-2 text-xs text-cyber-muted mb-3 font-mono">
          <span className="text-cyber-primary">$</span>
          <span className="text-cyber-secondary">cat</span>
          <span className="text-cyber-accent">./posts/{post.slug}</span>
          <span className="ml-auto flex items-center gap-1">
            <span className="text-cyber-primary">{formatDate(post.date)}</span>
            <span className="text-cyber-secondary">|</span>
            <span className="text-cyber-purple">{post.readingTime}min</span>
          </span>
        </div>

        {/* 标题 */}
        <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:neon-text transition-all duration-300" 
            data-text={post.title}>
          {post.title}
        </h2>

        {/* 摘要 */}
        <p className="text-cyber-muted text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + i * 0.05 }}
              className="px-3 py-1 text-xs border border-cyber-primary/30 text-cyber-primary 
                       hover:bg-cyber-primary/10 hover:border-cyber-secondary transition-all 
                       duration-300 cursor-pointer"
              onClick={(e) => {
                e.preventDefault()
                window.location.href = `/?tag=${tag}`
              }}
            >
              #{tag}
            </motion.span>
          ))}
        </div>

        {/* 阅读更多 */}
        <div className="mt-4 flex items-center text-cyber-secondary group-hover:translate-x-2 transition-transform duration-300">
          <span className="animate-pulse mr-2">▶</span>
          <span className="text-sm">读取更多...</span>
        </div>
      </Link>
    </motion.article>
  )
}