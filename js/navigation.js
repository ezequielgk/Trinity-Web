// Funcionalidad de navegación - Sistema de navegación completo para Trinity Launcher

/**
 * Clase Navigation - Maneja toda la navegación del sitio
 * Incluye navegación principal, menús móviles, footer y sidebar de wiki
 */
class Navigation {
  constructor() {
    this.currentPage = this.getCurrentPage();    // Página actual del usuario
    this.mobileMenuOpen = false;                 // Estado del menú móvil
    this.wikiSidebarOpen = false;               // Estado del acordeón de wiki móvil
    this.init();                                // Inicializar toda la funcionalidad
  }

  /**
   * Detectar la página actual basada en la URL y hash
   * Soporta tanto rutas de archivos como hashes para navegación SPA
   * @returns {string} Nombre de la página actual
   */
  getCurrentPage() {
    const path = window.location.pathname;
    const hash = window.location.hash;
    
    // Priorizar hash para navegación SPA
    if (hash === '#wiki') return 'wiki';
    if (hash === '#faq') return 'faq';
    if (hash === '#contributors') return 'contributors';
    
    // Fallback a detección por ruta de archivo
    if (path.includes('wiki')) return 'wiki';
    if (path.includes('faq')) return 'faq';
    if (path.includes('contributors')) return 'contributors';
    return 'home';  // Página por defecto
  }

  /**
   * Inicialización principal - Ejecuta todas las configuraciones necesarias
   * Orden: navegación → footer → enlaces activos → eventos → wiki sidebar
   */
  async init() {
    await this.loadNavigation();    // Cargar barra de navegación
    await this.loadFooter();        // Cargar pie de página
    this.setActiveNavLink();        // Marcar enlace activo
    this.bindEvents();              // Configurar event listeners
    
    // Inicializar sidebar de wiki si estamos en esa página
    if (this.currentPage === 'wiki') {
      setTimeout(() => {
        this.initWikiSidebar();
      }, 100);  // Delay para asegurar que el DOM esté listo
    }
  }

  /**
   * Cargar dinámicamente la barra de navegación principal
   * Genera HTML responsivo con menús desktop y móvil
   */
  async loadNavigation() {
    const navContainer = document.getElementById('navigation-container');
    if (navContainer) {
      // Detectar si estamos en una subpágina para ajustar rutas relativas
      const isSubPage = this.currentPage !== 'home';
      const basePath = isSubPage ? '../' : '';
      
      navContainer.innerHTML = `
        <!-- Navegación principal fija con backdrop blur -->
        <nav class="bg-navy-900/80 backdrop-blur-md border-b border-navy-800 sticky top-0 z-50">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
              <!-- Logo/Brand -->
              <div class="flex items-center">
                <a href="${basePath}index.html" class="text-xl font-bold text-white hover:text-primary-400 transition-colors">
                  Trinity Launcher
                </a>
              </div>

              <!-- Iconos de navegación y redes sociales -->
              <div class="flex items-center space-x-1">
                <!-- Enlace a GitHub -->
                <a href="https://github.com/Trinity-LA/Trinity-Launcher" target="_blank" 
                   class="nav-icon p-2 text-gray-400 hover:text-white hover:bg-navy-700 rounded-lg transition-colors duration-200"
                   title="Ver en GitHub">
                  <i class="fab fa-github text-lg"></i>
                </a>
                
                <!-- Enlace a Discord -->
                <a href="https://discord.gg/ettXssJs4b" target="_blank" 
                   class="nav-icon p-2 text-gray-400 hover:text-white hover:bg-navy-700 rounded-lg transition-colors duration-200"
                   title="Unirse a Discord">
                  <i class="fab fa-discord text-lg"></i>
                </a>
                
                <!-- Botón de FAQ rápido -->
                <button id="quickFaqButton"
                        class="nav-icon p-2 text-gray-400 hover:text-white hover:bg-navy-700 rounded-lg transition-colors duration-200"
                        title="FAQ Rápido">
                  <i class="fas fa-question-circle text-lg"></i>
                </button>

                <!-- Botón menú móvil (solo visible en pantallas pequeñas) -->
                <div class="md:hidden ml-2">
                  <button id="mobile-menu-button" class="text-gray-300 hover:text-primary-400 p-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Menú móvil desplegable -->
            <div id="mobile-menu" class="hidden md:hidden pb-4">
              <div class="flex flex-col space-y-2 px-2">
                <a href="${basePath}index.html" class="nav-link-mobile text-left text-gray-300 hover:text-primary-400 py-2" data-page="home">
                  <i class="fas fa-home mr-2"></i>Home
                </a>
                <a href="${basePath}pages/wiki.html" class="nav-link-mobile text-left text-gray-300 hover:text-primary-400 py-2" data-page="wiki">
                  <i class="fas fa-book mr-2"></i>Wiki
                </a>
                <a href="${basePath}pages/faq.html" class="nav-link-mobile text-left text-gray-300 hover:text-primary-400 py-2" data-page="faq">
                  <i class="fas fa-question mr-2"></i>FAQ
                </a>
                <a href="${basePath}pages/contributors.html" class="nav-link-mobile text-left text-gray-300 hover:text-primary-400 py-2" data-page="contributors">
                  <i class="fas fa-users mr-2"></i>Contributors
                </a>
              </div>
            </div>
          </div>
        </nav>
      `;
      
      // Inicializar funcionalidad básica después de cargar el HTML
      this.initBasicFunctionality();
    }
  }

  /**
   * Inicializar funcionalidad básica de la navegación
   * Configura event listeners para elementos recién creados
   */
  initBasicFunctionality() {
    // Configurar botón de FAQ rápido
    const quickFaqButton = document.getElementById('quickFaqButton');
    if (quickFaqButton) {
      quickFaqButton.addEventListener('click', () => {
        this.showQuickFaq();
      });
    }
  }

  /**
   * Navegar a la página de FAQ
   * Ajusta la ruta según si estamos en página principal o subpágina
   */
  showQuickFaq() {
    const isSubPage = this.currentPage !== 'home';
    const basePath = isSubPage ? '../' : '';
    window.location.href = `${basePath}pages/faq.html`;
  }

  /**
   * Cargar dinámicamente el pie de página
   * Incluye navegación secundaria y información de copyright
   */
  async loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
      // Ajustar rutas según la página actual
      const isSubPage = this.currentPage !== 'home';
      const basePath = isSubPage ? '../' : '';
      
      footerContainer.innerHTML = `
        <!-- Footer con navegación secundaria -->
        <footer class="bg-navy-900 border-t border-navy-800 mt-20">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!-- Enlaces de navegación del footer -->
            <div class="flex justify-center space-x-8 mb-8">
              <a href="${basePath}index.html" class="footer-nav-link text-gray-300 hover:text-primary-400 transition-colors font-medium" data-page="home">
                <i class="fas fa-home mr-2"></i>Home
              </a>
              <a href="${basePath}pages/wiki.html" class="footer-nav-link text-gray-300 hover:text-primary-400 transition-colors font-medium" data-page="wiki">
                <i class="fas fa-book mr-2"></i>Wiki
              </a>
              <a href="${basePath}pages/faq.html" class="footer-nav-link text-gray-300 hover:text-primary-400 transition-colors font-medium" data-page="faq">
                <i class="fas fa-question mr-2"></i>FAQ
              </a>
              <a href="${basePath}pages/contributors.html" class="footer-nav-link text-gray-300 hover:text-primary-400 transition-colors font-medium" data-page="contributors">
                <i class="fas fa-users mr-2"></i>Contributors
              </a>
            </div>
            
            <!-- Información de copyright -->
            <div class="text-center">
              <p class="text-gray-400">
                © 2026 Trinity Launcher. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      `;
    }
  }

  /**
   * Marcar como activo el enlace de navegación de la página actual
   * Aplica estilos especiales al enlace correspondiente en footer y menú móvil
   */
  setActiveNavLink() {
    // Marcar enlace activo en el footer
    const footerLinks = document.querySelectorAll('.footer-nav-link');
    footerLinks.forEach(link => {
      const linkPage = link.getAttribute('data-page');
      if (linkPage === this.currentPage) {
        link.classList.remove('text-gray-300');
        link.classList.add('text-primary-400');  // Color primario para enlace activo
      }
    });

    // Marcar enlace activo en menú móvil
    const mobileLinks = document.querySelectorAll('.nav-link-mobile');
    mobileLinks.forEach(link => {
      const linkPage = link.getAttribute('data-page');
      if (linkPage === this.currentPage) {
        link.classList.remove('text-gray-300');
        link.classList.add('text-primary-400');  // Color primario para enlace activo
      }
    });
  }

  /**
   * MÉTODOS DEL SIDEBAR DE WIKI
   * Funcionalidad específica para navegación móvil en páginas de documentación
   */

  /**
   * Inicializar sidebar de wiki con funcionalidad móvil responsiva
   * Busca el sidebar existente y crea versión móvil accordeón
   */
  initWikiSidebar() {
    const sidebar = document.querySelector('aside[role="navigation"]');
    
    if (sidebar) {
      this.createMobileWikiAccordion(sidebar);
      console.log('Wiki sidebar móvil - acordeón creado ✅');
    } else {
      console.log('Wiki sidebar no encontrado, reintentando...');
      // Reintentar después de 1 segundo si el sidebar no está listo
      setTimeout(() => {
        this.initWikiSidebar();
      }, 1000);
    }
  }

  /**
   * Crear acordeón móvil para wiki sidebar
   * Convierte sidebar desktop en acordeón responsivo para móviles
   * @param {HTMLElement} originalSidebar - Sidebar original del desktop
   */
  createMobileWikiAccordion(originalSidebar) {
    // Evitar crear múltiples acordeones
    if (document.getElementById('mobile-wiki-accordion')) {
      return;
    }

    // Ocultar sidebar original en móvil
    originalSidebar.style.display = 'none';
    
    // Crear estilos responsivos
    const style = document.createElement('style');
    style.textContent = `
      /* Mostrar sidebar original en desktop, ocultar acordeón móvil */
      @media (min-width: 1024px) {
        aside[role="navigation"] {
          display: block !important;
        }
        #mobile-wiki-accordion {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Crear estructura del acordeón móvil
    const mobileAccordion = document.createElement('div');
    mobileAccordion.id = 'mobile-wiki-accordion';
    mobileAccordion.className = 'bg-navy-900/80 border-b border-navy-800 sticky top-16 z-40';
    
    mobileAccordion.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header del acordeón clickeable -->
        <div class="flex justify-between items-center py-3 cursor-pointer" id="wiki-accordion-toggle">
          <h3 class="text-lg font-semibold text-white">Documentation</h3>
          <button class="text-gray-300 hover:text-primary-400 transition-colors p-2">
            <svg class="w-5 h-5 transform transition-transform duration-200" id="accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
        
        <!-- Contenido colapsable del acordeón -->
        <div class="overflow-hidden transition-all duration-300 max-h-0" id="wiki-accordion-content">
          <div class="pb-4">
            <nav class="space-y-1" id="mobile-wiki-nav"></nav>
          </div>
        </div>
      </div>
    `;

    // Insertar acordeón después de la navegación principal
    const mainNav = document.querySelector('nav[class*="bg-navy-900"]');
    if (mainNav && mainNav.parentNode) {
      mainNav.parentNode.insertBefore(mobileAccordion, mainNav.nextSibling);
    }

    // Ajustar layout para móvil
    const contentContainer = document.querySelector('.flex.flex-col.lg\\:flex-row');
    if (contentContainer) {
      const contentSection = contentContainer.querySelector('section[role="main"]');
      if (contentSection) {
        // Crear estilos para layout móvil
        const mobileContentStyle = document.createElement('style');
        mobileContentStyle.textContent = `
          @media (max-width: 1023px) {
            .flex.flex-col.lg\\:flex-row {
              flex-direction: column;
            }
            section[role="main"] {
              width: 100% !important;
            }
          }
        `;
        document.head.appendChild(mobileContentStyle);
      }
    }

    // Configurar eventos del acordeón
    this.bindAccordionEvents();
  }

  /**
   * Configurar event listeners para el acordeón de wiki
   * Maneja click para abrir/cerrar el acordeón móvil
   */
  bindAccordionEvents() {
    const accordionToggle = document.getElementById('wiki-accordion-toggle');
    const accordionContent = document.getElementById('wiki-accordion-content');
    const accordionIcon = document.getElementById('accordion-icon');

    if (accordionToggle && accordionContent && accordionIcon) {
      accordionToggle.addEventListener('click', () => {
        this.toggleWikiAccordion();
      });
    }
  }

  /**
   * Alternar estado del acordeón de wiki (abrir/cerrar)
   * Maneja animaciones y estado del icono
   */
  toggleWikiAccordion() {
    const accordionContent = document.getElementById('wiki-accordion-content');
    const accordionIcon = document.getElementById('accordion-icon');
    const mobileWikiNav = document.getElementById('mobile-wiki-nav');
    
    if (!accordionContent || !accordionIcon || !mobileWikiNav) return;

    if (this.wikiSidebarOpen) {
      // Cerrar acordeón
      accordionContent.style.maxHeight = '0px';
      accordionIcon.style.transform = 'rotate(0deg)';
      this.wikiSidebarOpen = false;
    } else {
      // Abrir acordeón
      this.populateMobileNav();  // Llenar contenido antes de abrir
      accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
      accordionIcon.style.transform = 'rotate(90deg)';
      this.wikiSidebarOpen = true;
    }
  }

  /**
   * Llenar el acordeón móvil con enlaces del sidebar original
   * Clona los botones de navegación del sidebar desktop
   */
  populateMobileNav() {
    const mobileWikiNav = document.getElementById('mobile-wiki-nav');
    const originalNavButtons = document.querySelectorAll('#wiki-sidebar .wiki-nav');
    
    if (!mobileWikiNav) return;

    // Limpiar contenido previo
    mobileWikiNav.innerHTML = '';

    // Clonar cada botón de navegación del sidebar original
    originalNavButtons.forEach(button => {
      const mobileButton = button.cloneNode(true);
      // Aplicar estilos móviles
      mobileButton.classList.add('block', 'w-full', 'text-left', 'py-3', 'px-4', 
                                 'text-gray-300', 'hover:text-primary-400', 
                                 'hover:bg-navy-800/50', 'rounded', 'transition-colors');
      
      // Preservar funcionalidad onclick original
      if (button.onclick) {
        mobileButton.onclick = button.onclick;
      }
      
      // Cerrar acordeón al hacer click en cualquier enlace
      mobileButton.addEventListener('click', () => {
        setTimeout(() => {
          this.closeWikiAccordion();
        }, 100);  // Delay para permitir navegación
      });
      
      mobileWikiNav.appendChild(mobileButton);
    });
  }

  /**
   * Cerrar forzadamente el acordeón de wiki
   * Usado cuando se navega a otra sección
   */
  closeWikiAccordion() {
    const accordionContent = document.getElementById('wiki-accordion-content');
    const accordionIcon = document.getElementById('accordion-icon');
    
    if (accordionContent && accordionIcon) {
      accordionContent.style.maxHeight = '0px';
      accordionIcon.style.transform = 'rotate(0deg)';
      this.wikiSidebarOpen = false;
    }
  }

  /**
   * Configurar todos los event listeners globales
   * Incluye menú móvil y limpieza de URL
   */
  bindEvents() {
    // Limpiar URL al cargar página
    this.cleanURL();

    // Event listeners para menú móvil
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
      // Toggle menú móvil al hacer click en botón
      mobileMenuButton.addEventListener('click', () => {
        this.mobileMenuOpen = !this.mobileMenuOpen;
        mobileMenu.classList.toggle('hidden');
      });
    }

    // Cerrar menú móvil al hacer click fuera de él
    document.addEventListener('click', (e) => {
      if (this.mobileMenuOpen && !e.target.closest('nav')) {
        mobileMenu?.classList.add('hidden');
        this.mobileMenuOpen = false;
      }
    });
  }

  /**
   * Limpiar y normalizar URLs para navegación consistente
   * Convierte rutas de archivos a hashes para mejor UX
   */
  cleanURL() {
    const path = window.location.pathname;
    let hash = '';
    
    // Mapear rutas de archivos a hashes correspondientes
    if (path.includes('pages/wiki.html')) {
      hash = '#wiki';
    } else if (path.includes('pages/faq.html')) {
      hash = '#faq';
    } else if (path.includes('pages/contributors.html')) {
      hash = '#contributors';
    } else if (path.includes('index.html')) {
      hash = '';  // Página principal sin hash
    }
    
    // Actualizar URL sin recargar página si hay cambios
    if (hash !== null) {
      const newURL = window.location.origin + '/' + hash;
      window.history.replaceState({}, '', newURL);
    }
  }
}

/**
 * INICIALIZACIÓN GLOBAL
 * Crear instancia de Navigation cuando el DOM esté listo
 */
document.addEventListener('DOMContentLoaded', function() {
  new Navigation();
});