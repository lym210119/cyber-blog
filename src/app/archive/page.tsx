import { getAllPosts } from '@/lib/server/posts'
import Link from 'next/link'

export default async function ArchivePage() {
  const { posts } = await getAllPosts({ limit: 1000 })

  // 按年份分组
  const postsByYear = posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear()
    if (!acc[year]) acc[year] = []
    acc[year].push(post)
    return acc
  }, {} as Record<number, typeof posts>)

  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a))

  // 统计信息
  const totalWords = posts.reduce((acc, p) => acc + p.content.split(/\s+/).length, 0)
  const firstPost = posts[posts.length - 1]
  const lastPost = posts[0]

  return (
    <div className="container mx-auto space-y-4 sm:space-y-6">
      {/* 标题 */}
      <div className="neon-panel p-4 sm:p-6">
        <div className="flex items-center gap-2 text-xs sm:text-sm mb-2">
          <span className="text-cyber-primary animate-pulse">$</span>
          <span className="text-cyber-muted">ls -la ./archive | sort by date</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold">
          <span className="neon-text">文章归档</span>
        </h1>
      </div>

      {/* 统计卡片 - 移动端2列 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
        <div className="neon-panel p-2 sm:p-4 text-center">
          <div className="text-xl sm:text-3xl text-cyber-primary mb-1">📚</div>
          <div className="text-lg sm:text-2xl font-bold text-cyber-primary">{posts.length}</div>
          <div className="text-[8px] sm:text-xs text-cyber-muted">总文章</div>
        </div>
        <div className="neon-panel p-2 sm:p-4 text-center">
          <div className="text-xl sm:text-3xl text-cyber-secondary mb-1">📅</div>
          <div className="text-lg sm:text-2xl font-bold text-cyber-secondary">{years.length}</div>
          <div className="text-[8px] sm:text-xs text-cyber-muted">年份跨度</div>
        </div>
        <div className="neon-panel p-2 sm:p-4 text-center">
          <div className="text-xl sm:text-3xl text-cyber-purple mb-1">✍️</div>
          <div className="text-lg sm:text-2xl font-bold text-cyber-purple">
            {(totalWords / 1000).toFixed(1)}k
          </div>
          <div className="text-[8px] sm:text-xs text-cyber-muted">总字数</div>
        </div>
        <div className="neon-panel p-2 sm:p-4 text-center">
          <div className="text-xl sm:text-3xl text-cyber-yellow mb-1">⏱️</div>
          <div className="text-lg sm:text-2xl font-bold text-cyber-yellow">
            {Math.round(totalWords / 200)}
          </div>
          <div className="text-[8px] sm:text-xs text-cyber-muted">阅读分钟</div>
        </div>
      </div>

      {/* 时间线 */}
      <div className="space-y-4 sm:space-y-6">
        {years.map((year) => (
          <div key={year} className="neon-panel p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl text-cyber-primary">{year}</span>
              <span className="text-[10px] sm:text-xs text-cyber-muted">
                ({postsByYear[Number(year)].length} 篇)
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-cyber-primary to-transparent"></div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              {postsByYear[Number(year)].map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="group block border-l-2 border-cyber-primary/30 pl-2 sm:pl-4 
                           hover:border-cyber-secondary transition-all"
                >
                  <div className="flex flex-wrap items-center gap-1 sm:gap-3 text-[10px] sm:text-sm">
                    <span className="text-cyber-secondary font-mono">
                      {new Date(post.date).toLocaleDateString('zh-CN', { 
                        month: '2-digit', 
                        day: '2-digit' 
                      })}
                    </span>
                    <span className="text-cyber-primary hidden xs:inline">↳</span>
                    <span className="text-cyber-text group-hover:text-cyber-primary 
                                   transition-colors text-xs sm:text-sm flex-1 truncate">
                      {post.title}
                    </span>
                    <span className="text-[8px] sm:text-xs text-cyber-muted ml-auto">
                      {post.readingTime}min
                    </span>
                  </div>
                  <div className="mt-0.5 sm:mt-1 text-[8px] sm:text-xs text-cyber-muted/50 flex gap-1 sm:gap-2">
                    {post.tags.slice(0, 2).map(tag => (
                      <span key={tag}>#{tag}</span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 归档信息 */}
      <div className="neon-panel p-3 sm:p-4 text-[8px] sm:text-xs font-mono">
        <div className="flex flex-wrap gap-2 sm:gap-4 justify-between">
          <div>
            <span className="text-cyber-primary">最早:</span>
            <span className="text-cyber-muted ml-1 sm:ml-2">
              {firstPost ? new Date(firstPost.date).toLocaleDateString() : 'N/A'}
            </span>
          </div>
          <div>
            <span className="text-cyber-primary">最近:</span>
            <span className="text-cyber-muted ml-1 sm:ml-2">
              {lastPost ? new Date(lastPost.date).toLocaleDateString() : 'N/A'}
            </span>
          </div>
          <div className="hidden sm:block">
            <span className="text-cyber-primary">平均:</span>
            <span className="text-cyber-muted ml-2">
              {Math.round(totalWords / posts.length)} 字
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}