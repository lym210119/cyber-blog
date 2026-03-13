import { getAllPosts } from '@/lib/server/posts'
import { NextResponse } from 'next/server'

export async function GET() {
  const { posts } = await getAllPosts({ limit: 20 })
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourblog.com'
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>赛博空间 · 极客终端博客</title>
    <link>${siteUrl}</link>
    <description>一个赛博朋克风格的极客技术博客</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    
    ${posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/posts/${post.slug}</link>
      <guid>${siteUrl}/posts/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <author>${post.author}</author>
      ${post.tags.map(tag => `<category>${tag}</category>`).join('')}
    </item>
    `).join('')}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}