// Main JavaScript file - Global functionality

// Dark mode configuration
function initDarkMode() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
  }
  
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });
}

// Tailwind configuration con paleta del pingüino
const tailwindScript = document.createElement('script');
tailwindScript.innerHTML = `
  tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#f5f3ff',
            100: '#ede9fe',
            200: '#ddd6fe',
            300: '#c4b5fd',
            400: '#a78bfa',  // Morado claro del pingüino
            500: '#8b5cf6',  // Morado principal
            600: '#7c3aed',
            700: '#6d28d9',  // Morado oscuro
            800: '#5b21b6',
            900: '#4c1d95',
          },
          accent: {
            400: '#fb923c',
            500: '#f97316',  // Naranja del pico
            600: '#ea580c',
          },
          navy: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
            950: '#020617',
          }
        }
      }
    }
  }
`;
document.head.appendChild(tailwindScript);

// Utility functions
const utils = {
  getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('wiki')) return 'wiki';
    if (path.includes('contributors')) return 'contributors';
    return 'home';
  },

  smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  },

  showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = `
        <div class="flex items-center justify-center py-8">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      `;
    }
  },

  formatDate(date) {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initDarkMode();
  console.log('Mi Proyecto loaded successfully!');
});

// Global error handler
window.addEventListener('error', function(e) {
  console.error('Error occurred:', e.error);
});

// Export for use in other scripts
window.MiProyecto = {
  utils,
  initDarkMode
};