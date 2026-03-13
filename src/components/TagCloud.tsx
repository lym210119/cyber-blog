'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface TagCloudProps {
  tags: Array<{ name: string; count: number }>
  currentTag?: string | null
}

export const TagCloud = ({ tags, currentTag }: TagCloudProps) => {
  return (
    <div className="neon-panel p-4 sticky top-20">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-cyber-secondary animate-pulse">#</span>
        <h3 className="neon-text-pink text-sm">TAG_CLOUD</h3>
        <span className="flex-1 border-b border-cyber-primary/30"></span>
        <span className="text-xs text-cyber-muted">{tags.length}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map(({ name, count }, index) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.02 }}
            whileHover={{ scale: 1.1 }}
          >
            <Link
              href={`/?tag=${name}`}
              className={`inline-block px-3 py-1.5 text-xs border transition-all duration-300
                ${currentTag === name 
                  ? 'border-cyber-secondary bg-cyber-secondary/20 text-cyber-secondary neon-text-pink' 
                  : 'border-cyber-primary/30 text-cyber-muted hover:border-cyber-primary hover:text-cyber-primary'
                }`}
            >
              <span className="mr-1">#</span>
              {name}
              <span className="ml-1 text-cyber-muted text-[10px]">({count})</span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* 系统状态 */}
      <div className="mt-6 pt-4 border-t border-cyber-primary/30">
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-cyber-muted">TOTAL_POSTS:</span>
            <span className="text-cyber-primary">{tags.reduce((acc, t) => acc + t.count, 0)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cyber-muted">ACTIVE_TAGS:</span>
            <span className="text-cyber-secondary">{tags.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cyber-muted">SYSTEM:</span>
            <span className="text-cyber-primary animate-pulse-slow">● ONLINE</span>
          </div>
        </div>
      </div>
    </div>
  )
}