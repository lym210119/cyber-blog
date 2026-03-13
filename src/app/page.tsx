import { getAllPosts, getAllTags } from '@/lib/server/posts'
import { TerminalCard } from '@/components/TerminalCard'
import { TagCloud } from '@/components/TagCloud'
import Link from 'next/link'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; page?: string }>
}) {
  const { tag, page = '1' } = await searchParams
  const currentPage = parseInt(page, 10)
  
  const { posts, totalPages } = await getAllPosts({
    page: currentPage,
    tag,
    limit: 10,
  })

  const tags = await getAllTags()

  return (
    <div className="space-y-6">
      {/* 终端欢迎信息 */}
      <div className="neon-panel p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyber-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-sm mb-4">
            <span className="text-cyber-primary animate-pulse">$</span>
            <span className="text-cyber-muted">./welcome.sh --user</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="neon-text" data-text="CYBERPUNK">CYBERPUNK</span>
            <span className="text-cyber-secondary mx-2">::</span>
            <span className="neon-text-pink" data-text="TERMINAL">TERMINAL</span>
          </h1>
          
          <p className="text-cyber-muted text-sm md:text-base max-w-2xl mb-6">
            &gt; 进入赛博空间 · 探索极客技术 · 连接未来
          </p>

          {/* 快速命令 */}
          <div className="flex flex-wrap gap-3">
            {['Next.js', 'React', 'TypeScript', 'Rust', 'Web3'].map((cmd) => (
              <Link
                key={cmd}
                href={`/?tag=${cmd.toLowerCase()}`}
                className="group relative px-4 py-2 border border-cyber-primary/30 text-sm
                         hover:border-cyber-secondary transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 text-cyber-muted group-hover:text-cyber-primary">
                  $ ./run {cmd}
                </span>
                <span className="absolute inset-0 bg-cyber-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Link>
            ))}
          </div>

          {/* 系统状态行 */}
          <div className="mt-6 flex items-center gap-4 text-xs text-cyber-muted/70">
            <span className="flex items-center gap-1">
              <span className="text-cyber-primary animate-pulse-slow">●</span>
              SYSTEM ONLINE
            </span>
            <span className="text-cyber-secondary">|</span>
            <span>POSTS: {posts.length}</span>
            <span className="text-cyber-secondary">|</span>
            <span>TAGS: {tags.length}</span>
          </div>
        </div>
      </div>

      {/* 标签过滤（移动端水平滚动） */}
      <div className="md:hidden -mx-4 px-4 overflow-x-auto pb-2">
        <div className="flex space-x-2 min-w-max">
          <Link
            href="/"
            className={`px-4 py-2 text-sm border transition-all duration-300 whitespace-nowrap
              ${!tag 
                ? 'border-cyber-primary bg-cyber-primary/20 text-cyber-primary neon-text' 
                : 'border-cyber-primary/30 text-cyber-muted hover:border-cyber-primary'
              }`}
          >
            #全部
          </Link>
          {tags.slice(0, 8).map(({ name, count }) => (
            <Link
              key={name}
              href={`/?tag=${name}`}
              className={`px-4 py-2 text-sm border transition-all duration-300 whitespace-nowrap
                ${tag === name 
                  ? 'border-cyber-secondary bg-cyber-secondary/20 text-cyber-secondary neon-text-pink' 
                  : 'border-cyber-primary/30 text-cyber-muted hover:border-cyber-primary'
                }`}
            >
              #{name} ({count})
            </Link>
          ))}
        </div>
      </div>

      {/* 主内容区 - 桌面版网格布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 文章列表 */}
        <div className="lg:col-span-3 space-y-4">
          {posts.map((post, index) => (
            <TerminalCard key={post.slug} post={post} index={index} />
          ))}

          {/* 分页 */}
          {totalPages > 1 && (
            <div className="neon-panel p-4 flex justify-center items-center space-x-3">
              <Link
                href={`/?page=${currentPage - 1}${tag ? `&tag=${tag}` : ''}`}
                className={`px-4 py-2 border transition-all duration-300
                  ${currentPage <= 1 
                    ? 'border-cyber-muted/20 text-cyber-muted/20 cursor-not-allowed' 
                    : 'border-cyber-primary/30 text-cyber-primary hover:border-cyber-secondary hover:text-cyber-secondary'
                  }`}
                aria-disabled={currentPage <= 1}
              >
                ← PREV
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
                        href={`/?page=${pageNum}${tag ? `&tag=${tag}` : ''}`}
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
                href={`/?page=${currentPage + 1}${tag ? `&tag=${tag}` : ''}`}
                className={`px-4 py-2 border transition-all duration-300
                  ${currentPage >= totalPages 
                    ? 'border-cyber-muted/20 text-cyber-muted/20 cursor-not-allowed' 
                    : 'border-cyber-primary/30 text-cyber-primary hover:border-cyber-secondary hover:text-cyber-secondary'
                  }`}
                aria-disabled={currentPage >= totalPages}
              >
                NEXT →
              </Link>
            </div>
          )}
        </div>

        {/* 侧边栏 - 桌面版显示 */}
        <div className="hidden lg:block">
          <TagCloud tags={tags} currentTag={tag} />
        </div>
      </div>
    </div>
  )
}