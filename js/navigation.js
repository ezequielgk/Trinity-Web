// Navigation functionality

class Navigation {
  constructor() {
    this.currentPage = this.getCurrentPage();
    this.mobileMenuOpen = false;
    this.wikiSidebarOpen = false;
    this.init();
  }

  getCurrentPage() {
    const path = window.location.pathname;
    const hash = window.location.hash;
    
    // Check hash first for clean URLs
    if (hash === '#wiki') return 'wiki';
    if (hash === '#faq') return 'faq';
    if (hash === '#contributors') return 'contributors';
    
    // Fallback to path checking
    if (path.includes('wiki')) return 'wiki';
    if (path.includes('faq')) return 'faq';
    if (path.includes('contributors')) return 'contributors';
    return 'home';
  }

  async init() {
    await this.loadNavigation();
    await this.loadFooter();
    this.setActiveNavLink();
    this.bindEvents();
    
    // Initialize wiki sidebar if on wiki page
    if (this.currentPage === 'wiki') {
      setTimeout(() => {
        this.initWikiSidebar();
      }, 100);
    }
  }

  async loadNavigation() {
    const navContainer = document.getElementById('navigation-container');
    if (navContainer) {
      const isSubPage = this.currentPage !== 'home';
      const basePath = isSubPage ? '../' : '';
      
      navContainer.innerHTML = `
        <nav class="bg-navy-900/80 backdrop-blur-md border-b border-navy-800 sticky top-0 z-50">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
              <!-- Brand Link -->
              <div class="flex items-center">
                <a href="${basePath}index.html" class="text-xl font-bold text-white hover:text-primary-400 transition-colors">
                  Trinity Launcher
                </a>
              </div>

              <!-- Navigation Links -->
              <div class="hidden md:flex space-x-8">
                <a href="${basePath}index.html" class="nav-link text-gray-300 hover:text-primary-400 transition-colors" data-page="home">
                  Inicio
                </a>
                <a href="${basePath}pages/wiki.html" class="nav-link text-gray-300 hover:text-primary-400 transition-colors" data-page="wiki">
                  Wiki
                </a>
                <a href="${basePath}pages/faq.html" class="nav-link text-gray-300 hover:text-primary-400 transition-colors" data-page="faq">
                  FAQ
                </a>
                <a href="${basePath}pages/contributors.html" class="nav-link text-gray-300 hover:text-primary-400 transition-colors" data-page="contributors">
                  Colaboradores
                </a>
              </div>

              <!-- Mobile menu button -->
              <div class="md:hidden">
                <button id="mobile-menu-button" class="text-gray-300 hover:text-primary-400">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Mobile menu -->
            <div id="mobile-menu" class="hidden md:hidden pb-4">
              <div class="flex flex-col space-y-2">
                <a href="${basePath}index.html" class="nav-link-mobile text-left text-gray-300 hover:text-primary-400 py-2" data-page="home">Inicio</a>
                <a href="${basePath}pages/wiki.html" class="nav-link-mobile text-left text-gray-300 hover:text-primary-400 py-2" data-page="wiki">Wiki</a>
                <a href="${basePath}pages/faq.html" class="nav-link-mobile text-left text-gray-300 hover:text-primary-400 py-2" data-page="faq">FAQ</a>
                <a href="${basePath}pages/contributors.html" class="nav-link-mobile text-left text-gray-300 hover:text-primary-400 py-2" data-page="contributors">Colaboradores</a>
              </div>
            </div>
          </div>
        </nav>
      `;
    }
  }

  initWikiSidebar() {
    const sidebar = document.querySelector('aside[role="navigation"]');
    
    if (sidebar) {
      // Crear la estructura del menú móvil acordeón
      this.createMobileWikiAccordion(sidebar);
      console.log('Wiki sidebar mobile accordion created');
    } else {
      console.log('Wiki sidebar not found, retrying...');
      setTimeout(() => {
        this.initWikiSidebar();
      }, 1000);
    }
  }

  createMobileWikiAccordion(originalSidebar) {
    // Crear el menú móvil solo si no existe
    if (document.getElementById('mobile-wiki-accordion')) {
      return;
    }

    // IMPORTANTE: Ocultar el sidebar original en móviles
    originalSidebar.style.display = 'none';
    
    // Agregar media query para mostrarlo en desktop
    const style = document.createElement('style');
    style.textContent = `
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

    const mobileAccordion = document.createElement('div');
    mobileAccordion.id = 'mobile-wiki-accordion';
    mobileAccordion.className = 'bg-navy-900/80 border-b border-navy-800 sticky top-16 z-40';
    
    mobileAccordion.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Accordion Header -->
        <div class="flex justify-between items-center py-3 cursor-pointer" id="wiki-accordion-toggle">
          <h3 class="text-lg font-semibold text-white">Documentación</h3>
          <button class="text-gray-300 hover:text-primary-400 transition-colors p-2">
            <svg class="w-5 h-5 transform transition-transform duration-200" id="accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
        
        <!-- Accordion Content -->
        <div class="overflow-hidden transition-all duration-300 max-h-0" id="wiki-accordion-content">
          <div class="pb-4">
            <nav class="space-y-1" id="mobile-wiki-nav">
              <!-- Content will be populated dynamically -->
            </nav>
          </div>
        </div>
      </div>
    `;

    // Insertar el acordeón después de la navegación principal
    const mainNav = document.querySelector('nav[class*="bg-navy-900"]');
    if (mainNav && mainNav.parentNode) {
      mainNav.parentNode.insertBefore(mobileAccordion, mainNav.nextSibling);
    }

    // Ajustar el layout del contenido principal para móviles
    const contentContainer = document.querySelector('.flex.flex-col.lg\\:flex-row');
    if (contentContainer) {
      const contentSection = contentContainer.querySelector('section[role="main"]');
      if (contentSection) {
        // Hacer que el contenido ocupe todo el ancho en móviles
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

    // Bind accordion events
    this.bindAccordionEvents();
  }

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

  toggleWikiAccordion() {
    const accordionContent = document.getElementById('wiki-accordion-content');
    const accordionIcon = document.getElementById('accordion-icon');
    const mobileWikiNav = document.getElementById('mobile-wiki-nav');
    
    if (!accordionContent || !accordionIcon || !mobileWikiNav) return;

    if (this.wikiSidebarOpen) {
      // Cerrar
      accordionContent.style.maxHeight = '0px';
      accordionIcon.style.transform = 'rotate(0deg)';
      this.wikiSidebarOpen = false;
    } else {
      // Abrir
      // Primero copiar el contenido del sidebar original
      this.populateMobileNav();
      
      // Calcular la altura necesaria
      accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
      accordionIcon.style.transform = 'rotate(90deg)';
      this.wikiSidebarOpen = true;
    }
  }

  populateMobileNav() {
    const mobileWikiNav = document.getElementById('mobile-wiki-nav');
    const originalNavButtons = document.querySelectorAll('#wiki-sidebar .wiki-nav');
    
    if (!mobileWikiNav) return;

    // Limpiar contenido anterior
    mobileWikiNav.innerHTML = '';

    // Copiar botones del sidebar original
    originalNavButtons.forEach(button => {
      const mobileButton = button.cloneNode(true);
      mobileButton.classList.add('block', 'w-full', 'text-left', 'py-3', 'px-4', 'text-gray-300', 'hover:text-primary-400', 'hover:bg-navy-800/50', 'rounded', 'transition-colors');
      
      // Asegurar que los eventos onclick funcionen
      if (button.onclick) {
        mobileButton.onclick = button.onclick;
      }
      
      // Cerrar el acordeón después de hacer clic en una opción
      mobileButton.addEventListener('click', () => {
        setTimeout(() => {
          this.closeWikiAccordion();
        }, 100);
      });
      
      mobileWikiNav.appendChild(mobileButton);
    });
  }

  closeWikiAccordion() {
    const accordionContent = document.getElementById('wiki-accordion-content');
    const accordionIcon = document.getElementById('accordion-icon');
    
    if (accordionContent && accordionIcon) {
      accordionContent.style.maxHeight = '0px';
      accordionIcon.style.transform = 'rotate(0deg)';
      this.wikiSidebarOpen = false;
    }
  }

  async loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
      footerContainer.innerHTML = `
        <footer class="bg-navy-900 border-t border-navy-800 mt-20">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="text-center">
              <p class="text-gray-400">
                © 2025 Trinity Launcher. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </footer>
      `;
    }
  }

  setActiveNavLink() {
    // Set active state for current page
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');
    navLinks.forEach(link => {
      const linkPage = link.getAttribute('data-page');
      if (linkPage === this.currentPage) {
        link.classList.remove('text-gray-300');
        link.classList.add('text-primary-400');
      }
    });
  }

  bindEvents() {
    // Clean URL on page load
    this.cleanURL();

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', () => {
        this.mobileMenuOpen = !this.mobileMenuOpen;
        mobileMenu.classList.toggle('hidden');
      });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.mobileMenuOpen && !e.target.closest('nav')) {
        mobileMenu?.classList.add('hidden');
        this.mobileMenuOpen = false;
      }
    });
  }

  cleanURL() {
    const path = window.location.pathname;
    let hash = '';
    
    // Convert file URLs to clean hash URLs
    if (path.includes('pages/wiki.html')) {
      hash = '#wiki';
    } else if (path.includes('pages/faq.html')) {
      hash = '#faq';
    } else if (path.includes('pages/contributors.html')) {
      hash = '#contributors';
    } else if (path.includes('index.html')) {
      hash = '';
    }
    
    // Update URL if needed
    if (hash !== null) {
      const newURL = window.location.origin + '/' + hash;
      window.history.replaceState({}, '', newURL);
    }
  }
}

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  new Navigation();
});