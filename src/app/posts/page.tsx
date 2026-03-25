import { getAllPosts } from '@/lib/server/posts'
import { PostCard } from '@/components/postcard'
import Link from 'next/link'

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page = '1' } = await searchParams
  const currentPage = parseInt(page, 10)
  
  const { posts, totalPages } = await getAllPosts({
    page: currentPage,
    limit: 12,
  })

  return (
    <div className="container mx-auto space-y-4 sm:space-y-6">
      {/* 页面标题 */}
      <div className="neon-panel p-4 sm:p-6">
        <div className="flex items-center gap-2 text-xs sm:text-sm mb-2">
          <span className="text-cyber-primary animate-pulse">$</span>
          <span className="text-cyber-muted">ls -la ./posts</span>
        </div>
        
        <h1 className="text-2xl sm:text-4xl font-bold">
          <span className="neon-text">文章归档</span>
          <span className="text-cyber-secondary ml-2 text-sm sm:text-base">
            ({posts.length})
          </span>
        </h1>
      </div>

      {/* 文章列表网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {posts.map((post, index) => (
          <PostCard key={post.slug} post={post} variant="grid" />
        ))}
      </div>

      {/* 分页 */}
      {totalPages > 1 && (
        <div className="neon-panel p-3 sm:p-4 flex justify-center items-center gap-2 sm:gap-3">
          <Link
            href={`/posts?page=${currentPage - 1}`}
            className={`px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm border touch-target
              ${currentPage <= 1 
                ? 'border-cyber-muted/20 text-cyber-muted/20 pointer-events-none' 
                : 'border-cyber-primary/30 text-cyber-primary hover:border-cyber-secondary'
              }`}
          >
            上一页
          </Link>
          
          <span className="text-cyber-muted text-xs sm:text-sm">
            {currentPage} / {totalPages}
          </span>

          <Link
            href={`/posts?page=${currentPage + 1}`}
            className={`px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm border touch-target
              ${currentPage >= totalPages 
                ? 'border-cyber-muted/20 text-cyber-muted/20 pointer-events-none' 
                : 'border-cyber-primary/30 text-cyber-primary hover:border-cyber-secondary'
              }`}
          >
            下一页
          </Link>
        </div>
      )}
    </div>
  )
}