// Utility functions for the application

const AppUtils = {
  // API utilities
  api: {
    async fetchJson(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Fetch error:', error);
        return null;
      }
    },

    async loadData(filename) {
      const basePath = window.location.pathname.includes('pages/') ? '../' : '';
      return this.fetchJson(`${basePath}data/${filename}`);
    }
  },

  // DOM utilities
  dom: {
    create(tag, className = '', innerHTML = '') {
      const element = document.createElement(tag);
      if (className) element.className = className;
      if (innerHTML) element.innerHTML = innerHTML;
      return element;
    },

    find(selector) {
      return document.querySelector(selector);
    },

    findAll(selector) {
      return document.querySelectorAll(selector);
    },

    hide(element) {
      if (typeof element === 'string') {
        element = document.getElementById(element);
      }
      if (element) {
        element.classList.add('hidden');
      }
    },

    show(element) {
      if (typeof element === 'string') {
        element = document.getElementById(element);
      }
      if (element) {
        element.classList.remove('hidden');
      }
    },

    toggle(element) {
      if (typeof element === 'string') {
        element = document.getElementById(element);
      }
      if (element) {
        element.classList.toggle('hidden');
      }
    }
  },

  // Animation utilities
  animation: {
    fadeIn(element, duration = 300) {
      if (typeof element === 'string') {
        element = document.getElementById(element);
      }
      if (element) {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease-in-out`;
        element.classList.remove('hidden');
        
        setTimeout(() => {
          element.style.opacity = '1';
        }, 10);
      }
    },

    fadeOut(element, duration = 300) {
      if (typeof element === 'string') {
        element = document.getElementById(element);
      }
      if (element) {
        element.style.opacity = '1';
        element.style.transition = `opacity ${duration}ms ease-in-out`;
        
        setTimeout(() => {
          element.style.opacity = '0';
          setTimeout(() => {
            element.classList.add('hidden');
          }, duration);
        }, 10);
      }
    },

    slideIn(element, direction = 'down', duration = 300) {
      if (typeof element === 'string') {
        element = document.getElementById(element);
      }
      if (element) {
        const transforms = {
          down: 'translateY(-20px)',
          up: 'translateY(20px)',
          left: 'translateX(20px)',
          right: 'translateX(-20px)'
        };
        
        element.style.transform = transforms[direction];
        element.style.opacity = '0';
        element.style.transition = `all ${duration}ms ease-in-out`;
        element.classList.remove('hidden');
        
        setTimeout(() => {
          element.style.transform = 'translate(0)';
          element.style.opacity = '1';
        }, 10);
      }
    }
  },

  // Form utilities
  form: {
    serialize(formElement) {
      const formData = new FormData(formElement);
      const data = {};
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }
      return data;
    },

    validate(formElement, rules) {
      const data = this.serialize(formElement);
      const errors = {};
      
      for (let field in rules) {
        const rule = rules[field];
        const value = data[field];
        
        if (rule.required && !value) {
          errors[field] = `${field} es requerido`;
        }
        
        if (rule.minLength && value && value.length < rule.minLength) {
          errors[field] = `${field} debe tener al menos ${rule.minLength} caracteres`;
        }
        
        if (rule.email && value && !this.isValidEmail(value)) {
          errors[field] = `${field} debe ser un email válido`;
        }
      }
      
      return {
        isValid: Object.keys(errors).length === 0,
        errors
      };
    },

    isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  },

  // Storage utilities
  storage: {
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.warn('localStorage not available');
      }
    },

    get(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (error) {
        console.warn('localStorage not available');
        return defaultValue;
      }
    },

    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.warn('localStorage not available');
      }
    }
  },

  // String utilities
  string: {
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    slugify(str) {
      return str
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    },

    truncate(str, length = 100) {
      return str.length > length ? str.substring(0, length) + '...' : str;
    }
  },

  // Theme utilities
  theme: {
    setDark() {
      document.documentElement.classList.add('dark');
      this.storage.set('theme', 'dark');
    },

    setLight() {
      document.documentElement.classList.remove('dark');
      this.storage.set('theme', 'light');
    },

    toggle() {
      if (document.documentElement.classList.contains('dark')) {
        this.setLight();
      } else {
        this.setDark();
      }
    },

    init() {
      const savedTheme = this.storage.get('theme');
      if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        this.setDark();
      }
    }
  }
};

// Make utilities available globally
window.AppUtils = AppUtils;