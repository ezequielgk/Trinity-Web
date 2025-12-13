/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./pages/**/*.html",
    "./js/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        // Paleta del Pingüino Morado
        primary: {
          50: '#f8fafc',   // Blanco suave
          100: '#f1f5f9',  // Gris muy claro
          200: '#e2e8f0',  // Gris claro
          300: '#c7d2fe',  // Morado muy claro (pecho del pingüino)
          400: '#a78bfa',  // Morado claro
          500: '#8b7cf6',  // Morado principal del pingüino
          600: '#7c3aed',  // Morado medio
          700: '#6d28d9',  // Morado oscuro
          800: '#5b21b6',  // Morado muy oscuro
          900: '#4c1d95',  // Morado profundo
        },
        // Naranja del pico como acento
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',   // Naranja principal del pico
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        // Fondos suaves (no tan oscuros)
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
}