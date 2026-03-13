'use client'

import Link from 'next/link'
import { Tag } from '@/types'

interface SidebarProps {
  tags: Tag[]
  currentTag?: string | null
}

export const Sidebar = ({ tags, currentTag }: SidebarProps) => {
  return (
    <aside className="lg:col-span-1">
      <div className="cyber-panel p-4 sticky top-20">
        <h3 className="text-cyber-primary font-bold mb-4 flex items-center gap-2">
          <span className="text-cyber-pink">#</span>
          标签云
        </h3>
        <div className="space-y-2">
          {tags.slice(0, 15).map(({ name, count }) => (
            <Link
              key={name}
              href={`/?tag=${name}`}
              className={`flex justify-between items-center p-2 border border-cyber-primary/30 hover:border-cyber-primary transition-colors ${
                currentTag === name ? 'bg-cyber-primary/20' : ''
              }`}
            >
              <span className="text-cyber-text">#{name}</span>
              <span className="text-xs text-cyber-primary">({count})</span>
            </Link>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-cyber-primary/30">
          <div className="text-xs space-y-1 text-cyber-text/60">
            <div className="flex justify-between">
              <span>系统状态:</span>
              <span className="text-cyber-primary">ONLINE</span>
            </div>
            <div className="flex justify-between">
              <span>文章总数:</span>
              <span className="text-cyber-yellow">
                {tags.reduce((acc, t) => acc + t.count, 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>标签总数:</span>
              <span className="text-cyber-pink">{tags.length}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}