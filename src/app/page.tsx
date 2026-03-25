import { getAllPosts, getAllTags } from '@/lib/server/posts'
import { TerminalCard } from '@/components/TerminalCard'
import { TagCloud } from '@/components/TagCloud'
import Link from 'next/link'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; page?: string }>
}) {
  // PARALLEL DATA FETCHING (async-parallel rule)
  // Eliminate waterfall by fetching all data concurrently
  const [searchParamsRes, postsRes, tagsRes] = await Promise.all([
    searchParams,
    getAllPosts({ limit: 8 }), // Fetch without tag/page first for tag cloud
    getAllTags()
  ])

  const { tag, page = '1' } = searchParamsRes
  const currentPage = parseInt(page, 10)

  // FETCH FILTERED POSTS BASED ON TAG (if any)
  const { posts, totalPages } = await getAllPosts({
    page: currentPage,
    tag,
    limit: 8,
  })

  return (
    <div className="container mx-auto space-y-4 sm:space-y-6">
      {/* 欢迎信息 - 移动端优化 */}
      <div className="neon-panel p-4 sm:p-6">
        <div className="flex items-center gap-2 text-xs sm:text-sm mb-2 sm:mb-4">
          <span className="text-cyber-primary animate-pulse">$</span>
          <span className="text-cyber-muted">./welcome.sh</span>
        </div>

        <h1 className="cyber-glitch-text text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">
          <span className="neon-text" data-text="CYBER">CYBER</span>
          <span className="text-cyber-secondary mx-2">•</span>
          <span className="neon-text-pink" data-text="BLOG">BLOG</span>
        </h1>

        <p className="text-cyber-muted text-xs sm:text-sm md:text-base max-w-2xl">
          &gt; 进入赛博空间 · 探索极客技术 · 连接未来
        </p>

        {/* 快速标签 - 移动端滚动 */}
        <div className="mt-3 sm:mt-4 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {tagsRes.slice(0, 6).map(({ name }) => (
              <Link
                key={name}
                href={`/?tag=${name}`}
                className="px-3 py-1.5 text-xs border border-cyber-primary/30 
                         hover:border-cyber-secondary transition-all whitespace-nowrap"
              >
                #{name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 移动端标签过滤 */}
      <div className="md:hidden overflow-x-auto -mx-2 px-2">
        <div className="flex gap-2 min-w-max pb-1">
          <Link
            href="/"
            className={`px-4 py-2 text-xs border whitespace-nowrap touch-target
              ${!tag
                ? 'border-cyber-primary bg-cyber-primary/20 text-cyber-primary'
                : 'border-cyber-primary/30 text-cyber-muted'
              }`}
          >
            #全部
          </Link>
          {tagsRes.slice(0, 8).map(({ name }) => (
            <Link
              key={name}
              href={`/?tag=${name}`}
              className={`px-4 py-2 text-xs border whitespace-nowrap touch-target
                ${tag === name
                  ? 'border-cyber-secondary bg-cyber-secondary/20 text-cyber-secondary'
                  : 'border-cyber-primary/30 text-cyber-muted'
                }`}
            >
              #{name}
            </Link>
          ))}
        </div>
      </div>

      {/* 主内容区 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* 文章列表 */}
        <div className="lg:col-span-3 space-y-3 sm:space-y-4">
          {posts.map((post, index) => (
            <TerminalCard key={post.slug} post={post} index={index} />
          ))}

          {/* 分页 - 移动端简化 */}
          {totalPages > 1 && (
            <div className="neon-panel p-3 sm:p-4 flex justify-center items-center gap-2 sm:gap-3">
              <Link
                href={`/?page=${currentPage - 1}${tag ? `&tag=${tag}` : ''}`}
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
                href={`/?page=${currentPage + 1}${tag ? `&tag=${tag}` : ''}`}
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

        {/* 侧边栏 - 桌面版显示 */}
        <div className="hidden lg:block">
          <TagCloud tags={tagsRes} currentTag={tag} />
        </div>
      </div>
    </div>
  )
}
