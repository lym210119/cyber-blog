/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-dark': 'rgb(var(--cyber-dark) / <alpha-value>)',
        'cyber-deeper': 'rgb(var(--cyber-deeper) / <alpha-value>)',
        'cyber-bg': 'rgb(var(--cyber-bg) / <alpha-value>)',
        'cyber-primary': 'rgb(var(--cyber-primary) / <alpha-value>)',
        'cyber-secondary': 'rgb(var(--cyber-secondary) / <alpha-value>)',
        'cyber-accent': 'rgb(var(--cyber-accent) / <alpha-value>)',
        'cyber-purple': 'rgb(var(--cyber-purple) / <alpha-value>)',
        'cyber-text': 'rgb(var(--cyber-text) / <alpha-value>)',
        'cyber-muted': 'rgb(var(--cyber-muted) / <alpha-value>)',
        'cyber-red': 'rgb(var(--cyber-red) / <alpha-value>)',
        'cyber-cyan': 'rgb(var(--cyber-cyan) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}
