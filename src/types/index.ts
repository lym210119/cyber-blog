export interface Post {
  slug: string
  title: string
  date: string
  author: string
  tags: string[]
  excerpt: string
  content: string
  readingTime: number
}

export interface PostsResponse {
  posts: Post[]
  total: number
  totalPages: number
}

export interface Tag {
  name: string
  count: number
}