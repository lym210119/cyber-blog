'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-10 h-10" /> // 占位
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 border border-cyber-primary/30 hover:border-cyber-primary transition-all duration-300 ml-2 w-10 h-10 flex items-center justify-center rounded-none hover:shadow-[0_0_10px] hover:shadow-cyber-primary"
      aria-label="切换主题"
    >
      {theme === 'dark' ? (
        <span className="text-cyber-yellow text-lg filter drop-shadow-[0_0_5px_currentColor]">🌙</span>
      ) : (
        <span className="text-cyber-primary text-lg filter drop-shadow-[0_0_5px_currentColor]">☀️</span>
      )}
    </button>
  )
}