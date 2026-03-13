import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/server/posts'
import Link from 'next/link'
import type { Metadata } from 'next'
import MarkdownRenderer from '@/components/MarkdownRenderer'

export async function generateStaticParams() {
  const { posts } = await getAllPosts({ limit: 100 })
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: '文章未找到',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <article className="container mx-auto max-w-4xl space-y-4 sm:space-y-6 px-3 sm:px-4">
      {/* 返回导航 */}
      <nav className="flex items-center justify-between">
        <Link 
          href="/posts" 
          className="group inline-flex items-center gap-2 neon-panel px-3 py-2 sm:px-4 sm:py-2 
                     text-xs sm:text-sm hover:border-cyber-secondary transition-all touch-target"
        >
          <span className="text-cyber-secondary group-hover:-translate-x-1 transition-transform">←</span>
          <span className="hidden xs:inline">返回列表</span>
          <span className="xs:hidden">返回</span>
        </Link>
        
        <div className="text-[10px] sm:text-xs text-cyber-muted/50 font-mono">
          <span className="text-cyber-primary">$</span> cat {post.slug}
        </div>
      </nav>

      {/* 文章头部 */}
      <header className="neon-panel p-4 sm:p-6 md:p-8">
        {/* 元信息 - 移动端优化 */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] sm:text-sm font-mono mb-3 sm:mb-4">
          <span className="flex items-center gap-1">
            <span className="text-cyber-primary">📅</span>
            <span className="text-cyber-muted">{formatDate(post.date)}</span>
          </span>
          <span className="text-cyber-secondary hidden xs:inline">|</span>
          <span className="flex items-center gap-1">
            <span className="text-cyber-primary">⏱️</span>
            <span className="text-cyber-muted">{post.readingTime}分钟</span>
          </span>
          <span className="text-cyber-secondary hidden sm:inline">|</span>
          <span className="flex items-center gap-1 hidden sm:flex">
            <span className="text-cyber-primary">👤</span>
            <span className="text-cyber-muted">{post.author}</span>
          </span>
        </div>

        {/* 标题 */}
        <h1 className="text-xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 break-words">
          <span className="neon-text">{post.title}</span>
        </h1>

        {/* 标签 - 移动端优化 */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/?tag=${tag}`}
              className="px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs 
                         border border-cyber-primary/30 text-cyber-primary 
                         hover:border-cyber-secondary transition-all touch-target"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </header>

      {/* 文章内容 - 移动端优化字体 */}
      {/* <div className="neon-panel p-4 sm:p-6 md:p-8">
        <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
          {post.content.split('\n').map((line, i) => {
            if (line.startsWith('# ')) {
              return (
                <h1 key={i} className="text-lg sm:text-xl md:text-2xl font-bold text-cyber-primary mt-4 mb-2">
                  {line.slice(2)}
                </h1>
              )
            } else if (line.startsWith('## ')) {
              return (
                <h2 key={i} className="text-base sm:text-lg md:text-xl font-bold text-cyber-secondary mt-3 mb-2">
                  {line.slice(3)}
                </h2>
              )
            } else if (line.startsWith('### ')) {
              return (
                <h3 key={i} className="text-sm sm:text-base font-bold text-cyber-accent mt-2 mb-1">
                  {line.slice(4)}
                </h3>
              )
            } else if (line.startsWith('> ')) {
              return (
                <blockquote key={i} className="border-l-2 border-cyber-primary pl-3 py-1 my-2 
                                               text-xs sm:text-sm italic text-cyber-muted">
                  {line.slice(2)}
                </blockquote>
              )
            } else if (line.trim() === '') {
              return <div key={i} className="h-2 sm:h-3"></div>
            } else {
              return (
                <p key={i} className="text-xs sm:text-sm leading-relaxed my-2">
                  {line}
                </p>
              )
            }
          })}
        </div>
      </div> */}

      <div className="neon-panel p-4 sm:p-6 md:p-8">
        <MarkdownRenderer content={post.content} />
      </div>
      
      {/* 文章导航 */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <Link
          href="/posts"
          className="neon-panel p-3 sm:p-4 hover:border-cyber-secondary transition-all group"
        >
          <div className="text-[10px] sm:text-xs text-cyber-muted/50 mb-1">
            <span className="text-cyber-primary">$</span> ls ../posts
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-cyber-secondary group-hover:-translate-x-1 transition-transform">←</span>
            <span className="text-cyber-primary text-xs sm:text-sm truncate">所有文章</span>
          </div>
        </Link>

        <Link
          href="/"
          className="neon-panel p-3 sm:p-4 hover:border-cyber-secondary transition-all group text-right"
        >
          <div className="text-[10px] sm:text-xs text-cyber-muted/50 mb-1">
            <span className="text-cyber-primary">$</span> cd ~
          </div>
          <div className="flex items-center justify-end gap-1 sm:gap-2">
            <span className="text-cyber-primary text-xs sm:text-sm truncate">返回首页</span>
            <span className="text-cyber-secondary group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </Link>
      </div>
    </article>
  )
}
