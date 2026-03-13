import { getAllPosts } from '@/lib/server/posts'
import { TerminalCard } from '@/components/TerminalCard'
import Link from 'next/link'

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; tag?: string }>
}) {
  const { page = '1', tag } = await searchParams
  const currentPage = parseInt(page, 10)
  
  const { posts, totalPages } = await getAllPosts({
    page: currentPage,
    tag,
    limit: 12,
  })

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="neon-panel p-6">
        <div className="flex items-center gap-2 text-sm mb-2">
          <span className="text-cyber-primary animate-pulse">$</span>
          <span className="text-cyber-muted">ls -la ./posts</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="neon-text">文章归档</span>
          <span className="text-cyber-secondary ml-2">({posts.length})</span>
        </h1>
        
        <p className="text-cyber-muted text-sm">
          &gt; 共 {posts.length} 篇文章 · 第 {currentPage} / {totalPages} 页
        </p>
      </div>

      {/* 文章列表网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <TerminalCard key={post.slug} post={post} index={index} />
        ))}
      </div>

      {/* 分页 */}
      {totalPages > 1 && (
        <div className="neon-panel p-4 flex justify-center items-center space-x-3">
          <Link
            href={`/posts?page=${currentPage - 1}${tag ? `&tag=${tag}` : ''}`}
            className={`px-4 py-2 border transition-all duration-300
              ${currentPage <= 1 
                ? 'border-cyber-muted/20 text-cyber-muted/20 cursor-not-allowed' 
                : 'border-cyber-primary/30 text-cyber-primary hover:border-cyber-secondary hover:text-cyber-secondary'
              }`}
            aria-disabled={currentPage <= 1}
          >
            ← 上一页
          </Link>
          
          <div className="flex items-center space-x-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum = i + 1
              if (totalPages > 5 && currentPage > 3) {
                pageNum = currentPage - 3 + i
              }
              if (pageNum <= totalPages) {
                return (
                  <Link
                    key={pageNum}
                    href={`/posts?page=${pageNum}${tag ? `&tag=${tag}` : ''}`}
                    className={`w-10 h-10 flex items-center justify-center border transition-all duration-300
                      ${pageNum === currentPage 
                        ? 'border-cyber-secondary bg-cyber-secondary/20 text-cyber-secondary neon-text-pink' 
                        : 'border-cyber-primary/30 text-cyber-muted hover:border-cyber-primary'
                      }`}
                  >
                    {pageNum}
                  </Link>
                )
              }
              return null
            })}
          </div>

          <Link
            href={`/posts?page=${currentPage + 1}${tag ? `&tag=${tag}` : ''}`}
            className={`px-4 py-2 border transition-all duration-300
              ${currentPage >= totalPages 
                ? 'border-cyber-muted/20 text-cyber-muted/20 cursor-not-allowed' 
                : 'border-cyber-primary/30 text-cyber-primary hover:border-cyber-secondary hover:text-cyber-secondary'
              }`}
            aria-disabled={currentPage >= totalPages}
          >
            下一页 →
          </Link>
        </div>
      )}
    </div>
  )
}