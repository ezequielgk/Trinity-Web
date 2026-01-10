// Funciones utilitarias para la aplicación - Conjunto de herramientas comunes para Trinity Launcher

/**
 * AppUtils - Objeto principal que contiene todas las utilidades organizadas por categorías
 * Proporciona funcionalidades comunes para API, DOM, animaciones, formularios, storage, strings y temas
 */
const AppUtils = {
  
  /**
   * UTILIDADES DE API
   * Funciones para realizar peticiones HTTP y manejar datos JSON
   */
  api: {
    /**
     * Realizar petición fetch y parsear respuesta JSON
     * @param {string} url - URL para realizar la petición
     * @returns {Object|null} Datos JSON parseados o null si hay error
     */
    async fetchJson(url) {
      try {
        const response = await fetch(url);
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
          throw new Error(`Error HTTP! estado: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error en petición fetch:', error);
        return null;  // Devolver null en caso de error
      }
    },

    /**
     * Cargar datos desde archivos JSON locales
     * Ajusta automáticamente la ruta según si estamos en página principal o subpágina
     * @param {string} filename - Nombre del archivo JSON a cargar
     * @returns {Object|null} Datos del archivo JSON
     */
    async loadData(filename) {
      // Detectar si estamos en una subpágina para ajustar ruta relativa
      const basePath = window.location.pathname.includes('pages/') ? '../' : '';
      return this.fetchJson(`${basePath}data/${filename}`);
    }
  },

  /**
   * UTILIDADES DE DOM
   * Funciones para manipular elementos del DOM de manera sencilla
   */
  dom: {
    /**
     * Crear un nuevo elemento HTML con clases y contenido opcional
     * @param {string} tag - Etiqueta HTML del elemento
     * @param {string} className - Clases CSS a aplicar (opcional)
     * @param {string} innerHTML - Contenido HTML interno (opcional)
     * @returns {HTMLElement} Elemento creado
     */
    create(tag, className = '', innerHTML = '') {
      const element = document.createElement(tag);
      if (className) element.className = className;
      if (innerHTML) element.innerHTML = innerHTML;
      return element;
    },

    /**
     * Encontrar un elemento en el DOM usando selector CSS
     * @param {string} selector - Selector CSS
     * @returns {HTMLElement|null} Primer elemento encontrado
     */
    find(selector) {
      return document.querySelector(selector);
    },

    /**
     * Encontrar todos los elementos que coincidan con un selector CSS
     * @param {string} selector - Selector CSS
     * @returns {NodeList} Lista de elementos encontrados
     */
    findAll(selector) {
      return document.querySelectorAll(selector);
    },

    /**
     * Ocultar un elemento agregando la clase 'hidden'
     * @param {HTMLElement|string} element - Elemento o ID del elemento
     */
    hide(element) {
      if (typeof element === 'string') {
        element = document.getElementById(element);
      }
      if (element) {
        element.classList.add('hidden');
      }
    },

    /**
     * Mostrar un elemento removiendo la clase 'hidden'
     * @param {HTMLElement|string} element - Elemento o ID del elemento
     */
    show(element) {
      if (typeof element === 'string') {
        element = document.getElementById(element);
      }
      if (element) {
        element.classList.remove('hidden');
      }
    },

    /**
     * Alternar visibilidad de un elemento (toggle clase 'hidden')
     * @param {HTMLElement|string} element - Elemento o ID del elemento
     */
    toggle(element) {
      if (typeof element === 'string') {
        element = document.getElementById(element);
      }
      if (element) {
        element.classList.toggle('hidden');
      }
    }
  },

  /**
   * UTILIDADES DE ANIMACIÓN
   * Funciones para crear animaciones suaves sin dependencias externas
   */
  animation: {
    /**
     * Animar aparición gradual (fade in) de un elemento
     * @param {HTMLElement|string} element - Elemento o ID del elemento
     * @param {number} duration - Duración de la animación en milisegundos
     */
    fadeIn(element, duration = 300) {
      if (typeof element === 'string') {
        element = document.getElementById(element);
      }
      if (element) {
        // Configurar estado inicial
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease-in-out`;
        element.classList.remove('hidden');
        
        // Aplicar animación después de un frame
        setTimeout(() => {
          element.style.opacity = '1';
        }, 10);
      }
    },

    /**
     * Animar desaparición gradual (fade out) de un elemento
     * @param {HTMLElement|string} element - Elemento o ID del elemento
     * @param {number} duration - Duración de la animación en milisegundos
     */
    fadeOut(element, duration = 300) {
      if (typeof element === 'string') {
        element = document.getElementById(element);
      }
      if (element) {
        // Configurar estado inicial
        element.style.opacity = '1';
        element.style.transition = `opacity ${duration}ms ease-in-out`;
        
        setTimeout(() => {
          element.style.opacity = '0';
          // Ocultar elemento completamente después de la animación
          setTimeout(() => {
            element.classList.add('hidden');
          }, duration);
        }, 10);
      }
    },

    /**
     * Animar entrada deslizante de un elemento desde diferentes direcciones
     * @param {HTMLElement|string} element - Elemento o ID del elemento
     * @param {string} direction - Dirección del deslizamiento ('down', 'up', 'left', 'right')
     * @param {number} duration - Duración de la animación en milisegundos
     */
    slideIn(element, direction = 'down', duration = 300) {
      if (typeof element === 'string') {
        element = document.getElementById(element);
      }
      if (element) {
        // Definir transformaciones según dirección
        const transforms = {
          down: 'translateY(-20px)',    // Deslizar desde arriba
          up: 'translateY(20px)',       // Deslizar desde abajo
          left: 'translateX(20px)',     // Deslizar desde derecha
          right: 'translateX(-20px)'    // Deslizar desde izquierda
        };
        
        // Configurar estado inicial
        element.style.transform = transforms[direction];
        element.style.opacity = '0';
        element.style.transition = `all ${duration}ms ease-in-out`;
        element.classList.remove('hidden');
        
        // Aplicar animación después de un frame
        setTimeout(() => {
          element.style.transform = 'translate(0)';
          element.style.opacity = '1';
        }, 10);
      }
    }
  },

  /**
   * UTILIDADES DE FORMULARIOS
   * Funciones para manejo y validación de formularios
   */
  form: {
    /**
     * Serializar datos de un formulario a objeto JavaScript
     * @param {HTMLFormElement} formElement - Elemento de formulario
     * @returns {Object} Objeto con los datos del formulario
     */
    serialize(formElement) {
      const formData = new FormData(formElement);
      const data = {};
      // Convertir FormData a objeto plano
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }
      return data;
    },

    /**
     * Validar formulario según reglas definidas
     * @param {HTMLFormElement} formElement - Elemento de formulario
     * @param {Object} rules - Objeto con reglas de validación por campo
     * @returns {Object} Resultado de validación con errores si los hay
     */
    validate(formElement, rules) {
      const data = this.serialize(formElement);
      const errors = {};
      
      // Validar cada campo según sus reglas
      for (let field in rules) {
        const rule = rules[field];
        const value = data[field];
        
        // Validar campo requerido
        if (rule.required && !value) {
          errors[field] = `${field} es requerido`;
        }
        
        // Validar longitud mínima
        if (rule.minLength && value && value.length < rule.minLength) {
          errors[field] = `${field} debe tener al menos ${rule.minLength} caracteres`;
        }
        
        // Validar formato de email
        if (rule.email && value && !this.isValidEmail(value)) {
          errors[field] = `${field} debe ser un email válido`;
        }
      }
      
      return {
        isValid: Object.keys(errors).length === 0,  // True si no hay errores
        errors
      };
    },

    /**
     * Validar formato de dirección de email
     * @param {string} email - Email a validar
     * @returns {boolean} True si el email es válido
     */
    isValidEmail(email) {
      // Expresión regular básica para validar emails
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  },

  /**
   * UTILIDADES DE ALMACENAMIENTO
   * Funciones para manejo de localStorage con fallbacks seguros
   */
  storage: {
    /**
     * Guardar datos en localStorage con serialización JSON
     * @param {string} key - Clave para almacenar
     * @param {any} value - Valor a almacenar (será serializado)
     */
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.warn('localStorage no disponible');
      }
    },

    /**
     * Obtener datos de localStorage con deserialización JSON
     * @param {string} key - Clave a buscar
     * @param {any} defaultValue - Valor por defecto si no existe o hay error
     * @returns {any} Valor almacenado o valor por defecto
     */
    get(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (error) {
        console.warn('localStorage no disponible');
        return defaultValue;
      }
    },

    /**
     * Eliminar una clave de localStorage
     * @param {string} key - Clave a eliminar
     */
    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.warn('localStorage no disponible');
      }
    }
  },

  /**
   * UTILIDADES DE STRINGS
   * Funciones para manipulación común de cadenas de texto
   */
  string: {
    /**
     * Capitalizar primera letra de un string
     * @param {string} str - String a capitalizar
     * @returns {string} String con primera letra en mayúscula
     */
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    /**
     * Convertir string a slug URL-friendly
     * @param {string} str - String a convertir
     * @returns {string} Slug en minúsculas con guiones
     */
    slugify(str) {
      return str
        .toLowerCase()                    // Convertir a minúsculas
        .replace(/[^a-z0-9 -]/g, '')     // Eliminar caracteres especiales
        .replace(/\s+/g, '-')            // Reemplazar espacios con guiones
        .replace(/-+/g, '-');            // Eliminar guiones duplicados
    },

    /**
     * Truncar string a longitud máxima con puntos suspensivos
     * @param {string} str - String a truncar
     * @param {number} length - Longitud máxima (default: 100)
     * @returns {string} String truncado con '...' si excede la longitud
     */
    truncate(str, length = 100) {
      return str.length > length ? str.substring(0, length) + '...' : str;
    }
  },

  /**
   * UTILIDADES DE TEMA
   * Funciones para manejo de tema claro/oscuro con persistencia
   */
  theme: {
    /**
     * Activar tema oscuro
     * Aplica la clase 'dark' y guarda preferencia
     */
    setDark() {
      document.documentElement.classList.add('dark');
      AppUtils.storage.set('theme', 'dark');  // Persistir preferencia
    },

    /**
     * Activar tema claro
     * Remueve la clase 'dark' y guarda preferencia
     */
    setLight() {
      document.documentElement.classList.remove('dark');
      AppUtils.storage.set('theme', 'light');  // Persistir preferencia
    },

    /**
     * Alternar entre tema claro y oscuro
     * Cambia automáticamente según el estado actual
     */
    toggle() {
      if (document.documentElement.classList.contains('dark')) {
        this.setLight();
      } else {
        this.setDark();
      }
    },

    /**
     * Inicializar tema según preferencias guardadas o del sistema
     * Debe llamarse al cargar la aplicación
     */
    init() {
      const savedTheme = AppUtils.storage.get('theme');
      // Usar tema guardado o detectar preferencia del sistema
      if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        this.setDark();
      }
    }
  }
};

/**
 * EXPORTACIÓN GLOBAL
 * Hacer las utilidades disponibles globalmente para uso en toda la aplicación
 */
window.AppUtils = AppUtils;