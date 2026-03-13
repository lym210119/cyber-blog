// src/components/MarkdownRenderer.tsx
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeStringify from 'rehype-stringify'
import { useEffect, useState } from 'react'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [html, setHtml] = useState('')

  useEffect(() => {
    const parseMarkdown = async () => {
      const result = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
        .use(rehypePrettyCode, {
          theme: 'dracula', // 可以选择其他主题，如 'github-dark', 'nord' 等
          onVisitLine(node) {
            // 防止换行符被忽略
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }]
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className = ['highlighted']
          },
        })
        .use(rehypeStringify)
        .process(content)

      setHtml(result.toString())
    }

    parseMarkdown()
  }, [content])

  return (
    <article
      className="prose prose-invert max-w-none cyber-markdown"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
