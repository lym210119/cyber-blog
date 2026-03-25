'use client'

import Link from 'next/link'
import { Post } from '@/types'

export const PostCard = ({ post, variant = 'list' }: { post: Post; variant?: 'grid' | 'list' }) => {
  if (variant === 'grid') {
    return <PostCardGrid post={post} />
  }
  
  return <PostCardList post={post} />
}

// Grid variant - visual card layout
const PostCardGrid = ({ post }: { post: Post }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
    })
  }

  return (
    <Link href={`/posts/${post.slug}`}>
      <div className="neon-panel p-4 h-full hover:border-cyber-secondary transition-all group">
        <div className="flex items-center gap-2 text-xs text-cyber-muted mb-3">
          <span className="text-cyber-primary">{formatDate(post.date)}</span>
          <span className="text-cyber-secondary">·</span>
          <span>{post.readingTime}min</span>
        </div>
        
        <h3 className="text-lg font-bold text-cyber-primary mb-2 line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-sm text-cyber-muted mb-3 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-1">
          {post.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-xs px-2 py-1 border border-cyber-primary/30">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

// List variant - compact list item
const PostCardList = ({ post }: { post: Post }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
    })
  }

  return (
    <Link href={`/posts/${post.slug}`}>
      <div className="neon-panel p-4 hover:border-cyber-secondary transition-all group">
        <div className="flex items-center gap-2 text-xs text-cyber-muted mb-2">
          <span className="text-cyber-primary">{formatDate(post.date)}</span>
          <span className="text-cyber-secondary">·</span>
          <span>{post.readingTime}min</span>
          <span className="ml-auto text-cyber-primary">↳</span>
        </div>
        
        <h3 className="text-base font-bold text-cyber-primary mb-1">
          {post.title}
        </h3>
      </div>
    </Link>
  )
}

// Export variants explicitly for consumers who want to use them directly
export { PostCardGrid, PostCardList }