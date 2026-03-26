import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MobileNav } from '@/components/MobileNav'
import { CommandPalette } from '@/components/CommandPalette'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | 赛博空间',
    default: '赛博空间 · 极客终端博客',
  },
  description: '一个赛博朋克风格的极客技术博客，融合霓虹光效与终端美学',
  keywords: ['赛博朋克', '极客', '博客', 'Next.js', 'React', 'TypeScript'],
  authors: [{ name: 'CyberGeek' }],
  openGraph: {
    title: '赛博空间 · 极客终端博客',
    description: '进入赛博空间，探索极客技术',
    siteName: '赛博空间',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '赛博空间 · 极客终端博客',
    description: '进入赛博空间，探索极客技术',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  // 添加metadataBase以解决社交卡片图片警告
  metadataBase: 'http://localhost:3000',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: '#00ffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <main className="container mx-auto px-4 pt-6 pb-24 md:pb-8 min-h-screen">
          {children}
        </main>
        <Footer />
        <MobileNav />
        <CommandPalette />
      </body>
    </html>
  )
}
