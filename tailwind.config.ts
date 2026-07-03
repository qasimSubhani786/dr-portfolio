import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#e8eaf6',
          100: '#c5cae9',
          200: '#9fa8da',
          300: '#7986cb',
          400: '#5c6bc0',
          500: '#3949ab',
          600: '#1a237e',
          700: '#0d1b4b',
          800: '#0a1232',
          900: '#060c1e',
          950: '#030610',
        },
        gold: {
          300: '#f0d080',
          400: '#e8c060',
          500: '#c9a84c',
          600: '#a88838',
          700: '#886828',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        'grid-pattern-light': `
          linear-gradient(rgba(10,18,50,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(10,18,50,0.04) 1px, transparent 1px)
        `,
        'radial-navy': 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(58,74,171,0.3) 0%, transparent 60%)',
        'radial-gold':  'radial-gradient(ellipse 40% 40% at 70% 50%, rgba(201,168,76,0.08) 0%, transparent 60%)',
        'gradient-card': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
      animation: {
        'float':     'float 6s ease-in-out infinite',
        'pulse-glow':'pulse-glow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'shimmer':   'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%':       { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
      },
      boxShadow: {
        'gold':       '0 0 30px rgba(201,168,76,0.2)',
        'gold-lg':    '0 0 60px rgba(201,168,76,0.3)',
        'navy':       '0 0 40px rgba(26,35,126,0.4)',
        'card':       '0 8px 32px rgba(0,0,0,0.12)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.2)',
        'glow-blue':  '0 0 40px rgba(92,107,192,0.3)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [],
};

export default config;
