import { getAllTags, getAllPosts } from '@/lib/server/posts'
import Link from 'next/link'

export default async function TagsPage() {
  const tags = await getAllTags()
  const { posts } = await getAllPosts({ limit: 1000 })

  // 计算每个标签的文章
  const tagPosts = tags.reduce((acc, { name }) => {
    acc[name] = posts.filter(p => p.tags.includes(name)).slice(0, 2)
    return acc
  }, {} as Record<string, any[]>)

  // 根据数量调整字体大小
  const getTagSize = (count: number) => {
    if (count >= 10) return 'text-base sm:text-2xl'
    if (count >= 5) return 'text-sm sm:text-xl'
    if (count >= 3) return 'text-xs sm:text-lg'
    return 'text-xs sm:text-base'
  }

  return (
    <div className="container mx-auto space-y-4 sm:space-y-6">
      {/* 标题 */}
      <div className="neon-panel p-4 sm:p-6">
        <div className="flex items-center gap-2 text-xs sm:text-sm mb-2">
          <span className="text-cyber-primary animate-pulse">$</span>
          <span className="text-cyber-muted">ls ./tags | wc -l</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold">
          <span className="neon-text">标签云</span>
          <span className="text-cyber-secondary ml-2 text-sm sm:text-base">
            ({tags.length})
          </span>
        </h1>
      </div>

      {/* 标签云 - 视觉化展示 */}
      <div className="neon-panel p-4 sm:p-6 md:p-8">
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center items-center min-h-[200px] sm:min-h-[300px]">
          {tags.map(({ name, count }, index) => (
            <Link
              key={name}
              href={`/?tag=${name}`}
              className={`
                ${getTagSize(count)} 
                px-2 py-1 sm:px-3 sm:py-2
                border border-cyber-primary/30 
                hover:border-cyber-secondary 
                hover:bg-cyber-secondary/10
                transition-all duration-300
                group relative
                inline-block
                transform hover:scale-105 sm:hover:scale-110
                touch-target
              `}
              style={{
                opacity: 0.6 + (count / 20) * 0.4,
              }}
            >
              <span className="text-cyber-primary group-hover:text-cyber-secondary transition-colors">
                #{name}
              </span>
              <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 
                             text-[8px] sm:text-xs bg-cyber-secondary 
                             text-black px-1 py-0.5 rounded-full opacity-0 
                             group-hover:opacity-100 transition-opacity">
                {count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* 标签列表 - 移动端单列，桌面端多列 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {tags.map(({ name, count }) => (
          <div key={name} className="neon-panel p-3 sm:p-4 hover:border-cyber-secondary transition-all group">
            <Link href={`/?tag=${name}`} className="block">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <h2 className="text-base sm:text-lg font-bold text-cyber-primary group-hover:text-cyber-secondary transition-colors">
                  #{name}
                </h2>
                <span className="text-[10px] sm:text-xs bg-cyber-primary/20 text-cyber-primary px-1.5 py-0.5 sm:px-2 sm:py-1">
                  {count}篇
                </span>
              </div>

              {/* 标签下的文章预览 - 移动端只显示一篇 */}
              <div className="space-y-1 sm:space-y-2 mb-2">
                {tagPosts[name]?.map((post: any) => (
                  <div key={post.slug} className="text-[10px] sm:text-xs text-cyber-muted truncate">
                    <span className="text-cyber-secondary mr-1">↳</span>
                    {post.title}
                  </div>
                ))}
              </div>

              <div className="text-[10px] sm:text-xs text-cyber-primary group-hover:translate-x-2 transition-transform">
                查看全部 →
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* 标签统计 - 移动端简化 */}
      <div className="neon-panel p-3 sm:p-4">
        <div className="flex flex-wrap gap-3 sm:gap-6 text-[10px] sm:text-xs">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-cyber-primary">●</span>
            <span className="text-cyber-muted hidden xs:inline">热门:</span>
            <div className="flex gap-1 sm:gap-2">
              {tags.slice(0, 3).map(({ name }) => (
                <Link key={name} href={`/?tag=${name}`} className="text-cyber-text hover:text-cyber-primary">
                  #{name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-cyber-secondary">●</span>
            <span className="text-cyber-muted">平均:</span>
            <span className="text-cyber-primary">{(posts.length / tags.length).toFixed(1)}篇</span>
          </div>
        </div>
      </div>
    </div>
  )
}