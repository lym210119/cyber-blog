'use client'

import { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { fetchPosts } from '@/lib/client/posts'

export const CommandMenu = () => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [posts, setPosts] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  useEffect(() => {
    if (open) {
      fetchPosts(1).then(data => setPosts(data.posts))
    }
  }, [open])

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-black border-2 border-cyber-red shadow-[0_0_30px_rgba(255,59,59,0.5)] z-50 font-mono"
    >
      <Command.Input
        value={search}
        onValueChange={setSearch}
        placeholder="键入命令或搜索文章..."
        className="w-full bg-black border-b border-cyber-red p-4 text-cyber-red outline-none placeholder:text-cyber-red/50"
      />
      <Command.List className="p-2 max-h-96 overflow-auto">
        <Command.Empty className="p-4 text-cyber-cyan">
          未找到: {search}
        </Command.Empty>

        <Command.Group heading="系统命令">
          <Command.Item
            onSelect={() => { router.push('/'); setOpen(false); }}
            className="p-2 hover:bg-cyber-red/20 cursor-pointer border-l-2 border-transparent hover:border-cyber-cyan"
          >
            <span className="text-cyber-red">$</span> home - 返回首页
          </Command.Item>
        </Command.Group>

        {posts.length > 0 && (
          <Command.Group heading="文章">
            {posts.slice(0, 5).map((post) => (
              <Command.Item
                key={post.slug}
                onSelect={() => { router.push(`/posts/${post.slug}`); setOpen(false); }}
                className="p-2 hover:bg-cyber-red/20 cursor-pointer"
              >
                <span className="text-cyber-cyan">📄</span> {post.title}
              </Command.Item>
            ))}
          </Command.Group>
        )}
      </Command.List>
    </Command.Dialog>
  )
}