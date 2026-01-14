// js/tailwind-config.js
window.tailwindConfig = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#c7d2fe',
          400: '#a78bfa',
          500: '#8b7cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        background: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #8b7cf6 0%, #c7d2fe 100%)',
        'gradient-accent': 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
      },
      boxShadow: {
        'primary': '0 10px 25px -5px rgba(139, 124, 246, 0.25)',
        'accent': '0 10px 25px -5px rgba(249, 115, 22, 0.25)',
      }
    },
  },
  plugins: [],
};