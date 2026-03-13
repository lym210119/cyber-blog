import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0a0c0f',
          deeper: '#050708',
          bg: '#0f1117',
          primary: '#00ffff',      // 霓虹青
          secondary: '#ff00ff',     // 霓虹粉
          accent: '#ffff00',        // 霓虹黄
          purple: '#b300ff',        // 霓虹紫
          text: '#e0e0e0',
          muted: '#8892b0',
        },
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)', 'Fira Code', 'monospace'],
        sans: ['var(--font-geist-sans)', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'scan-line': 'scan-line 8s linear infinite',
        'glitch': 'glitch 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'grid-flow': 'grid-flow 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px #00ffff, 0 0 40px #00ffff',
            opacity: '1'
          },
          '50%': { 
            boxShadow: '0 0 30px #ff00ff, 0 0 60px #ff00ff',
            opacity: '0.9'
          },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'glitch': {
          '0%, 100%': { transform: 'none' },
          '7%': { transform: 'skew(-0.5deg, -0.9deg)' },
          '10%': { transform: 'none' },
          '27%': { transform: 'none' },
          '30%': { transform: 'skew(0.8deg, -0.1deg)' },
          '35%': { transform: 'none' },
          '52%': { transform: 'none' },
          '55%': { transform: 'skew(-1deg, 0.2deg)' },
          '50%': { transform: 'none' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'grid-flow': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(40px)' },
        },
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
        'cyber-gradient': 'radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
}

export default config