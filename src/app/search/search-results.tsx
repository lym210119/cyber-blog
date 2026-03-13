'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') // 根据你的实际参数名调整

  return <div>搜索结果: {query}</div>
}