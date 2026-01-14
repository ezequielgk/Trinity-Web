// Archivo JavaScript principal - Funcionalidad global del proyecto

// --- INICIO DE INTEGRACIÓN FIREBASE ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCrBk2coqPiBrD02Un7i2Bbxpwd6dEYlsw",
  authDomain: "trinity-launcher.firebaseapp.com",
  projectId: "trinity-launcher",
  storageBucket: "trinity-launcher.firebasestorage.app",
  messagingSenderId: "975804480637",
  appId: "1:975804480637:web:f9b15cd76140a56476c514",
  measurementId: "G-JYN9X1MPFC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportamos db para que el script del formulario en el HTML funcione
export { db };

/**
 * Función para cargar reseñas desde Firebase (sin user badge)
 */
async function mostrarResenas() {
  const contenedor = document.getElementById('reviews-display');
  if (!contenedor) return;

  try {
    const querySnapshot = await getDocs(collection(db, "reviews"));
    contenedor.innerHTML = "";

    if (querySnapshot.empty) {
      contenedor.innerHTML = "<p class='text-gray-500 col-span-full text-center'>No reviews yet. Be the first!</p>";
      return;
    }

    querySnapshot.forEach((doc) => {
      const resena = doc.data();
      // Solo se muestra el nombre, sin user badge
      contenedor.innerHTML += `
        <div class="glass-card p-6 rounded-2xl border border-white/10 mb-4 transition-all hover:bg-white/5">
          <h4 class="text-primary-400 font-bold">${resena.nombre || 'Anónimo'}</h4>
          <p class="text-gray-300 my-2">"${resena.comentario || ''}"</p>
          <div class="text-yellow-500">${"★".repeat(resena.estrella || 5)}</div>
        </div>
      `;
    });
  } catch (error) {
    console.error("Error cargando reseñas:", error);
  }
}
// --- FIN DE INTEGRACIÓN FIREBASE ---

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

/**
 * Configuración personalizada de Tailwind CSS
 */
const tailwindScript = document.createElement('script');
tailwindScript.innerHTML = `
  tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd',
            400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9',
            800: '#5b21b6', 900: '#4c1d95',
          },
          accent: {
            400: '#fb923c', 500: '#f97316', 600: '#ea580c',
          },
          navy: {
            50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1',
            400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155',
            800: '#1e293b', 900: '#0f172a', 950: '#020617',
          }
        }
      }
    }
  }
`;
document.head.appendChild(tailwindScript);

/**
 * Objeto con funciones utilitarias reutilizables
 */
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

/**
 * Inicialización cuando el DOM esté completamente cargado
 */
document.addEventListener('DOMContentLoaded', function() {
  initDarkMode();

  // Ejecutar carga de reseñas de Firebase
  mostrarResenas();

  console.log('Trinity Launcher cargado exitosamente! 🚀');
});

/**
 * Manejador global de errores
 */
window.addEventListener('error', function(e) {
  console.error('Error ocurrido en Trinity Launcher:', e.error);
});

/**
 * Exportar funciones principales
 */
window.TrinityLauncher = {
  utils,
  initDarkMode,
  mostrarResenas
};