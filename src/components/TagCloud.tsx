'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useMemo, useCallback } from 'react'

interface TagCloudProps {
  tags: Array<{ name: string; count: number }>
  currentTag?: string | null
}

export const TagCloud = ({ tags, currentTag }: TagCloudProps) => {
  const [showAll, setShowAll] = useState(false)
  
  // MEMOIZE expensive computation (rerender-memo rule)
  const displayTags = useMemo(() => {
    return showAll ? tags : tags.slice(0, 12)
  }, [tags, showAll])
  
  // MEMOIZE event handler to prevent creating new function on every render (rerender-functional-setstate pattern)
  const toggleShowAll = useCallback(() => {
    setShowAll(!showAll)
  }, [showAll]) // showAll is a dependency because we need the latest value

  return (
    <div className="neon-panel p-3 sm:p-4 sticky top-20 w-full">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <span className="text-cyber-secondary animate-pulse text-sm sm:text-base">#</span>
        <h3 className="neon-text-pink text-xs sm:text-sm">标签云</h3>
        <span className="flex-1 border-b border-cyber-primary/30"></span>
        <span className="text-xs text-cyber-muted">{tags.length}</span>
      </div>

      <div className="flex flex-wrap gap-1.5 sm:gap-2 max-w-full">
        {displayTags.map(({ name, count }, index) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.02 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link
              href={`/?tag=${name}`}
              className={`inline-block px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs 
                         border transition-all duration-300 whitespace-nowrap
                ${currentTag === name 
                  ? 'border-cyber-secondary bg-cyber-secondary/20 text-cyber-secondary neon-text-pink' 
                  : 'border-cyber-primary/30 text-cyber-muted hover:border-cyber-primary hover:text-cyber-primary'
                }`}
            >
              <span className="mr-0.5 sm:mr-1">#</span>
              {name}
              <span className="ml-0.5 sm:ml-1 text-[8px] sm:text-[10px] text-cyber-muted">
                ({count})
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* 移动端显示更多按钮 */}
      {tags.length > 12 && (
        <button
          onClick={toggleShowAll}
          className="w-full mt-3 text-xs text-cyber-primary border border-cyber-primary/30 
                     py-2 hover:bg-cyber-primary/10 transition-colors touch-target"
        >
          {showAll ? '收起' : `查看更多 (${tags.length - 12})`}
        </button>
      )}

      {/* 系统状态 - 移动端简化 */}
      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-cyber-primary/30">
        <div className="space-y-1 sm:space-y-2 text-[10px] sm:text-xs">
          <div className="flex justify-between">
            <span className="text-cyber-muted">文章总数:</span>
            <span className="text-cyber-primary">{tags.reduce((acc, t) => acc + t.count, 0)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cyber-muted">标签总数:</span>
            <span className="text-cyber-secondary">{tags.length}</span>
          </div>
          <div className="flex justify-between sm:hidden">
            <span className="text-cyber-muted">系统:</span>
            <span className="text-cyber-primary">● ONLINE</span>
          </div>
        </div>
      </div>
    </div>
  )
}
