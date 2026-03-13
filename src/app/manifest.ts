import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '赛博空间 · 极客终端博客',
    short_name: 'CyberBlog',
    description: '一个赛博朋克风格的极客技术博客',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f1117',
    theme_color: '#00ffff',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}