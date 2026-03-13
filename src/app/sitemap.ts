import { getAllPosts } from '@/lib/server/posts'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourblog.com'
  const { posts } = await getAllPosts({ limit: 1000 })

  // 静态页面
  const staticPages = [
    '',
    '/posts',
    '/tags',
    '/archive',
    '/search',
    '/about',
  ].map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: path === '' ? 1 : 0.8,
  }))

  // 文章页面
  const postPages = posts.map(post => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...postPages]
}