// Archivo JavaScript principal - Funcionalidad global del proyecto

// Archivo JavaScript principal - Funcionalidad global del proyecto

/**
 * Vercel Analytics Integration
 * Configura el rastreo de visitas para el dashboard de Vercel
 */
(function() {
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  const script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  document.head.appendChild(script);
})();

/**
 * Configuración del modo oscuro automático
 * Detecta las preferencias del sistema y aplica el tema correspondiente
 */
function initDarkMode() {
  // Verificar si el navegador soporta media queries y si el usuario prefiere el tema oscuro
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
  }
  
  // Escuchar cambios en las preferencias del tema del sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
      // Activar modo oscuro
      document.documentElement.classList.add('dark');
    } else {
      // Activar modo claro
      document.documentElement.classList.remove('dark');
    }
  });
}

/**
 * Configuración personalizada de Tailwind CSS
 * Define la paleta de colores del proyecto inspirada en Trinity Launcher
 */
const tailwindScript = document.createElement('script');
tailwindScript.innerHTML = `
  tailwind.config = {
    // Habilitar modo oscuro basado en clases CSS
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          // Paleta de colores primaria (morados)
          primary: {
            50: '#f5f3ff',   // Morado muy claro
            100: '#ede9fe',  // Morado claro
            200: '#ddd6fe',  // Morado suave
            300: '#c4b5fd',  // Morado medio-claro
            400: '#a78bfa',  // Morado claro del diseño
            500: '#8b5cf6',  // Morado principal de Trinity
            600: '#7c3aed',  // Morado medio
            700: '#6d28d9',  // Morado oscuro
            800: '#5b21b6',  // Morado muy oscuro
            900: '#4c1d95',  // Morado más oscuro
          },
          // Paleta de colores de acento (naranjas)
          accent: {
            400: '#fb923c',  // Naranja claro
            500: '#f97316',  // Naranja principal
            600: '#ea580c',  // Naranja oscuro
          },
          // Paleta de colores navales (grises/azules oscuros)
          navy: {
            50: '#f8fafc',   // Gris muy claro
            100: '#f1f5f9',  // Gris claro
            200: '#e2e8f0',  // Gris suave
            300: '#cbd5e1',  // Gris medio-claro
            400: '#94a3b8',  // Gris medio
            500: '#64748b',  // Gris principal
            600: '#475569',  // Gris oscuro
            700: '#334155',  // Gris muy oscuro
            800: '#1e293b',  // Azul-gris oscuro
            900: '#0f172a',  // Azul muy oscuro
            950: '#020617',  // Azul casi negro
          }
        }
      }
    }
  }
`;
// Inyectar la configuración de Tailwind en el head del documento
document.head.appendChild(tailwindScript);

/**
 * Objeto con funciones utilitarias reutilizables
 * Proporciona métodos comunes para la aplicación
 */
const utils = {
  /**
   * Detectar la página actual basada en la URL
   * @returns {string} Nombre de la página actual
   */
  getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('wiki')) return 'wiki';
    if (path.includes('contributors')) return 'contributors';
    return 'home';  // Página por defecto
  },

  /**
   * Realizar scroll suave hacia un elemento específico
   * @param {string} elementId - ID del elemento destino
   */
  smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  },

  /**
   * Mostrar indicador de carga en un elemento
   * @param {string} elementId - ID del elemento donde mostrar la carga
   */
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

  /**
   * Formatear fecha en formato español
   * @param {Date|string} date - Fecha a formatear
   * @returns {string} Fecha formateada en español
   */
  formatDate(date) {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
};

/**
 * Inicialización cuando el DOM esté completamente cargado
 * Configura todas las funcionalidades principales del proyecto
 */
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar el modo oscuro automático
  initDarkMode();
  
  // Mensaje de confirmación en la consola para desarrollo
  console.log('Trinity Launcher cargado exitosamente! 🚀');
});

/**
 * Manejador global de errores
 * Captura errores no manejados para debugging
 */
window.addEventListener('error', function(e) {
  console.error('Error ocurrido en Trinity Launcher:', e.error);
});

/**
 * Exportar funciones principales para uso en otros scripts
 * Hace disponibles las utilidades globalmente bajo el namespace TrinityLauncher
 */
window.TrinityLauncher = {
  utils,
  initDarkMode
};