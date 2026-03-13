import { NextResponse } from 'next/server'
import { getAllPosts, getPostBySlug, getAllTags } from '@/lib/server/posts'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const page = searchParams.get('page')
  const tag = searchParams.get('tag')
  const action = searchParams.get('action')
  const limit = searchParams.get('limit')

  try {
    // 获取单篇文章
    if (slug && action === 'single') {
      const post = await getPostBySlug(slug)
      if (!post) {
        return NextResponse.json(
          { error: 'Post not found' },
          { status: 404 }
        )
      }
      return NextResponse.json(post)
    }

    // 获取所有标签
    if (action === 'tags') {
      const tags = await getAllTags()
      return NextResponse.json(tags)
    }

    // 获取文章列表
    const posts = await getAllPosts({
      page: page ? parseInt(page) : 1,
      tag: tag || undefined,
      limit: limit ? parseInt(limit) : 10,
    })
    
    // 设置缓存头
    return NextResponse.json(posts, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}