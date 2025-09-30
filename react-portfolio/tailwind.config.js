/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1a1a1a',
        'dark-panel': '#161616',
        'dark-border': '#2b2b2b',
        'dark-text': '#eaeaea',
        'dark-muted': '#9aa0a6',
        'accent-green': '#29d391',
        'accent-cyan': '#7DF9FF',
        'accent-yellow': '#ffd166',
        'accent-red': '#ff6b6b',
        'accent-blue': '#1db954',
      },
      fontFamily: {
        'sans': ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow-green': '0 0 8px rgba(29, 185, 84, 0.35)',
        'glow-cyan': '0 0 8px rgba(125, 249, 255, 0.35)',
        'glow-yellow': '0 0 8px rgba(255, 209, 102, 0.35)',
        'panel-glow': '0 0 20px rgba(125, 249, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(125, 249, 255, 0.25)' },
          '50%': { boxShadow: '0 0 16px rgba(125, 249, 255, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}
