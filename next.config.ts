import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 启用React严格模式
  reactStrictMode: true,
  
  // 图片优化配置
  images: {
    domains: [], // 添加允许的图片域名
    unoptimized: process.env.NODE_ENV === 'development',
  },

  // 实验性功能
  experimental: {
    typedRoutes: true,
  },

  // webpack配置 - 解决Node.js模块问题
  webpack: (config, { isServer }) => {
    // 客户端构建时，将Node.js模块指向空
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      }
    }
    return config
  },
}

export default nextConfig
