import { Post, PostsResponse, Tag } from '@/types'

// 获取文章列表
export async function fetchPosts(page = 1, tag?: string, limit = 10): Promise<PostsResponse> {
  const url = new URL('/api/posts', window.location.origin)
  url.searchParams.set('page', page.toString())
  url.searchParams.set('limit', limit.toString())
  if (tag) url.searchParams.set('tag', tag)
  
  const res = await fetch(url.toString(), {
    next: { revalidate: 60 }
  })
  
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(error.error || 'Failed to fetch posts')
  }
  
  return res.json()
}

// 获取单篇文章
export async function fetchPost(slug: string): Promise<Post> {
  const url = new URL('/api/posts', window.location.origin)
  url.searchParams.set('slug', slug)
  url.searchParams.set('action', 'single')
  
  const res = await fetch(url.toString())
  
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('Post not found')
    }
    const error = await res.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(error.error || 'Failed to fetch post')
  }
  
  return res.json()
}

// 获取所有标签
export async function fetchTags(): Promise<Tag[]> {
  const url = new URL('/api/posts', window.location.origin)
  url.searchParams.set('action', 'tags')
  
  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 }
  })
  
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(error.error || 'Failed to fetch tags')
  }
  
  return res.json()
}