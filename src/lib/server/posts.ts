import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post } from '@/types'

const postsDirectory = path.join(process.cwd(), 'content/posts')

// 确保目录存在
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true })
}

// 获取所有文章
export async function getAllPosts(params?: {
  page?: number
  limit?: number
  tag?: string
}) {
  const { page = 1, limit = 10, tag } = params || {}
  
  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx?$/, '')
      return getPostBySlug(slug)
    })
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const filteredPosts = tag 
    ? allPosts.filter(post => post.tags.includes(tag))
    : allPosts

  const start = (page - 1) * limit
  const end = start + limit
  const paginatedPosts = filteredPosts.slice(start, end)

  return {
    posts: paginatedPosts,
    total: filteredPosts.length,
    totalPages: Math.ceil(filteredPosts.length / limit),
  }
}

// 通过slug获取单篇文章
export function getPostBySlug(slug: string): Post | null {
  try {
    let fullPath = path.join(postsDirectory, `${slug}.md`)
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(postsDirectory, `${slug}.mdx`)
      if (!fs.existsSync(fullPath)) {
        return null
      }
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // 计算阅读时间
    const wordsPerMinute = 200
    const wordCount = content.trim().split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)

    return {
      slug,
      title: data.title || '无标题',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Anonymous',
      tags: data.tags || [],
      excerpt: data.excerpt || content.slice(0, 200) + '...',
      content,
      readingTime,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

// 获取所有标签
export async function getAllTags() {
  const { posts } = await getAllPosts({ limit: 1000 })
  
  const tagCounts = posts.reduce((acc, post) => {
    post.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1
    })
    return acc
  }, {} as Record<string, number>)

  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}