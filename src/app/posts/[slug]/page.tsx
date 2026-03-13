import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/server/posts'
import Link from 'next/link'
import type { Metadata } from 'next'

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
      title: '404 - 文章未找到',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
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
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <article className="max-w-4xl mx-auto space-y-6">
      {/* 返回导航 */}
      <nav className="flex items-center justify-between">
        <Link 
          href="/" 
          className="group inline-flex items-center gap-2 neon-panel px-4 py-2 text-sm
                     hover:border-cyber-secondary transition-all duration-300"
        >
          <span className="text-cyber-secondary group-hover:-translate-x-1 transition-transform">←</span>
          <span className="text-cyber-muted group-hover:text-cyber-primary">返回终端</span>
        </Link>
        
        <div className="text-xs text-cyber-muted/50 font-mono">
          <span className="text-cyber-primary">$</span> cat ./posts/{post.slug}
        </div>
      </nav>

      {/* 文章头部 */}
      <header className="neon-panel p-6 md:p-8 relative overflow-hidden">
        {/* 背景光效 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyber-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyber-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          {/* 元信息 */}
          <div className="flex flex-wrap items-center gap-4 text-sm font-mono mb-4">
            <span className="flex items-center gap-2">
              <span className="text-cyber-primary">📅</span>
              <span className="text-cyber-muted">{formatDate(post.date)}</span>
            </span>
            <span className="text-cyber-secondary">|</span>
            <span className="flex items-center gap-2">
              <span className="text-cyber-primary">⏱️</span>
              <span className="text-cyber-muted">{post.readingTime} 分钟阅读</span>
            </span>
            <span className="text-cyber-secondary">|</span>
            <span className="flex items-center gap-2">
              <span className="text-cyber-primary">👤</span>
              <span className="text-cyber-muted">{post.author}</span>
            </span>
          </div>

          {/* 标题 */}
          <h1 className="text-3xl md:text-5xl font-bold mb-6" data-text={post.title}>
            <span className="neon-text">{post.title}</span>
          </h1>

          {/* 标签云 */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Link
                key={tag}
                href={`/?tag=${tag}`}
                className="group relative px-4 py-2 border border-cyber-primary/30 text-sm
                         hover:border-cyber-secondary transition-all duration-300 overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="relative z-10 text-cyber-muted group-hover:text-cyber-primary">
                  #{tag}
                </span>
                <span className="absolute inset-0 bg-cyber-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Link>
            ))}
          </div>
        </div>

        {/* 装饰扫描线 */}
        <div className="scan-line"></div>
      </header>

      {/* 文章内容 */}
      <div className="neon-panel p-6 md:p-8">
        <div className="prose prose-invert prose-lg max-w-none">
          {post.content.split('\n').map((line, i) => {
            if (line.startsWith('# ')) {
              return (
                <h1 key={i} className="text-2xl md:text-3xl font-bold text-cyber-primary mt-8 mb-4" 
                    data-text={line.slice(2)}>
                  {line.slice(2)}
                </h1>
              )
            } else if (line.startsWith('## ')) {
              return (
                <h2 key={i} className="text-xl md:text-2xl font-bold text-cyber-secondary mt-6 mb-3">
                  {line.slice(3)}
                </h2>
              )
            } else if (line.startsWith('### ')) {
              return (
                <h3 key={i} className="text-lg md:text-xl font-bold text-cyber-accent mt-4 mb-2">
                  {line.slice(4)}
                </h3>
              )
            } else if (line.startsWith('> ')) {
              return (
                <blockquote key={i} className="border-l-4 border-cyber-primary pl-4 py-2 my-4 
                                               bg-cyber-primary/5 italic text-cyber-muted">
                  {line.slice(2)}
                </blockquote>
              )
            } else if (line.startsWith('```')) {
              // 代码块开始或结束
              return null
            } else if (line.trim() === '') {
              return <div key={i} className="h-4"></div>
            } else {
              return (
                <p key={i} className="text-cyber-text/80 leading-relaxed my-3">
                  {line}
                </p>
              )
            }
          })}
        </div>
      </div>

      {/* 文章导航 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/posts"
          className="neon-panel p-4 hover:border-cyber-secondary transition-all duration-300 group"
        >
          <div className="text-xs text-cyber-muted/50 mb-2">
            <span className="text-cyber-primary">$</span> ls ../posts
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cyber-secondary group-hover:-translate-x-1 transition-transform">←</span>
            <span className="text-cyber-primary group-hover:neon-text">所有文章</span>
          </div>
        </Link>

        <Link
          href="/"
          className="neon-panel p-4 hover:border-cyber-secondary transition-all duration-300 group text-right"
        >
          <div className="text-xs text-cyber-muted/50 mb-2">
            <span className="text-cyber-primary">$</span> cd ~
          </div>
          <div className="flex items-center justify-end gap-2">
            <span className="text-cyber-primary group-hover:neon-text">返回首页</span>
            <span className="text-cyber-secondary group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </Link>
      </div>
    </article>
  )
}