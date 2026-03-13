import { getAllPosts } from '@/lib/server/posts'
import Link from 'next/link'

export default async function AboutPage() {
  const { posts } = await getAllPosts({ limit: 1000 })
  const totalPosts = posts.length
  const totalTags = [...new Set(posts.flatMap(p => p.tags))].length
  const totalWords = posts.reduce((acc, p) => acc + p.content.split(/\s+/).length, 0)
  
  const stats = [
    { label: '文章', value: totalPosts, icon: '📄', color: 'primary' },
    { label: '标签', value: totalTags, icon: '#', color: 'secondary' },
    { label: '字数', value: (totalWords / 1000).toFixed(1) + 'k', icon: '✍️', color: 'purple' },
    { label: '天数', value: Math.floor((Date.now() - new Date('2025-01-01').getTime()) / (1000 * 60 * 60 * 24)), icon: '⏱️', color: 'yellow' },
  ]

  return (
    <div className="container mx-auto space-y-4 sm:space-y-6">
      {/* 标题 */}
      <div className="neon-panel p-4 sm:p-6">
        <div className="flex items-center gap-2 text-xs sm:text-sm mb-2">
          <span className="text-cyber-primary animate-pulse">$</span>
          <span className="text-cyber-muted">cat ./about.md</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold">
          <span className="neon-text">关于本站</span>
        </h1>
      </div>

      {/* 统计卡片 - 移动端2列 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="neon-panel p-3 sm:p-4 text-center">
            <div className={`text-xl sm:text-2xl mb-1 text-cyber-${stat.color}`}>
              {stat.icon}
            </div>
            <div className={`text-lg sm:text-xl font-bold text-cyber-${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-[8px] sm:text-xs text-cyber-muted">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* 故事时间线 - 移动端优化 */}
      <div className="neon-panel p-4 sm:p-6">
        <h2 className="text-base sm:text-xl font-bold text-cyber-secondary mb-4 sm:mb-6 
                       flex items-center gap-2">
          <span className="text-cyber-primary">📜</span> 故事时间线
        </h2>
        <div className="space-y-4 sm:space-y-6">
          {[
            { date: '2025.01', title: '项目启动', desc: '创建赛博朋克风格博客' },
            { date: '2025.02', title: '首个版本', desc: '完成基础功能和文章系统' },
            { date: '2025.03', title: '命令面板', desc: '添加 Ctrl+K 终端命令' },
            { date: '2025.04', title: '移动适配', desc: '完美支持手机和平板' },
          ].map((item, i) => (
            <div key={i} className="flex gap-2 sm:gap-4 group">
              <div className="relative">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-cyber-primary rounded-full mt-1 sm:mt-2"></div>
                {i < 3 && <div className="absolute top-3 sm:top-4 left-1 sm:left-1.5 w-0.5 h-8 sm:h-12 
                                        bg-cyber-primary/30"></div>}
              </div>
              <div className="flex-1">
                <div className="text-cyber-primary text-[10px] sm:text-sm font-mono">{item.date}</div>
                <div className="text-cyber-text text-xs sm:text-sm font-bold mt-0.5 sm:mt-1">{item.title}</div>
                <div className="text-cyber-muted text-[8px] sm:text-xs mt-0.5 sm:mt-1">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 技术栈 - 移动端2列 */}
      <div className="neon-panel p-4 sm:p-6">
        <h2 className="text-base sm:text-xl font-bold text-cyber-secondary mb-4 sm:mb-6 
                       flex items-center gap-2">
          <span className="text-cyber-primary">⚙️</span> 技术栈
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
          {[
            { name: 'Next.js 15', icon: '▲' },
            { name: 'React 19', icon: '⚛️' },
            { name: 'TypeScript', icon: '📘' },
            { name: 'Tailwind', icon: '🎨' },
            { name: 'Framer', icon: '✨' },
            { name: 'CMDK', icon: '⌘' },
          ].map((tech) => (
            <div key={tech.name} className="border border-cyber-primary/30 p-2 sm:p-3 
                                           hover:border-cyber-secondary transition-all group">
              <div className="text-lg sm:text-xl mb-1 text-cyber-primary group-hover:animate-pulse">
                {tech.icon}
              </div>
              <div className="text-xs sm:text-sm font-bold text-cyber-text">{tech.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 关于作者 - 移动端垂直布局 */}
      <div className="neon-panel p-4 sm:p-6">
        <h2 className="text-base sm:text-xl font-bold text-cyber-secondary mb-4 sm:mb-6 
                       flex items-center gap-2">
          <span className="text-cyber-primary">👤</span> 关于作者
        </h2>
        <div className="flex flex-col xs:flex-row gap-4 sm:gap-6 items-start">
          <div className="w-16 h-16 sm:w-24 sm:h-24 border-2 border-cyber-primary p-1 flex-shrink-0">
            <div className="w-full h-full bg-gradient-to-br from-cyber-primary to-cyber-secondary 
                          flex items-center justify-center">
              <span className="text-xl sm:text-3xl text-black">:)</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-base sm:text-xl font-bold text-cyber-primary mb-1 sm:mb-2">CyberGeek</h3>
            <p className="text-xs sm:text-sm text-cyber-muted mb-3 sm:mb-4">
              全栈开发者，赛博朋克文化爱好者，极客精神践行者。
            </p>
            <div className="flex gap-2 sm:gap-3">
              {['GitHub', 'Twitter'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-[8px] sm:text-xs px-2 py-1 sm:px-3 sm:py-1.5 
                           border border-cyber-primary/30 text-cyber-muted 
                           hover:border-cyber-secondary hover:text-cyber-primary 
                           transition-all touch-target"
                >
                  [{item}]
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 系统信息 - 移动端简化 */}
      <div className="neon-panel p-3 sm:p-4 bg-black/50">
        <div className="flex flex-wrap gap-2 sm:gap-4 text-[8px] sm:text-xs font-mono">
          <span className="text-cyber-primary">SYSTEM:</span>
          <span className="text-cyber-muted">ONLINE</span>
          <span className="text-cyber-secondary hidden xs:inline">|</span>
          <span className="text-cyber-primary hidden xs:inline">VERSION:</span>
          <span className="text-cyber-muted hidden xs:inline">2.3.1</span>
        </div>
      </div>
    </div>
  )
}