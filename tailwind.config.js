/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05070d',
          900: '#0a0e17',
          800: '#101627',
          700: '#171f36',
          600: '#232d4d',
        },
        mist: {
          400: '#94a3b8',
          300: '#b6c2d6',
          200: '#d7dfec',
        },
        neon: {
          DEFAULT: '#e1bee7',
          soft: '#edd8f1',
          dim: '#8e5a9c',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        arabic: ['"Cairo"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(225, 190, 231, 0.35)',
        card: '0 8px 30px -12px rgba(0,0,0,0.45)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '32px 32px',
      },
      keyframes: {
        pulseSlow: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        pulseSlow: 'pulseSlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};