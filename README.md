#  Trinity Launcher Website

<div align="center">

![Trinity Launcher](assets/images/trinity-launcher-preview.jpg)

**Sitio web oficial de Trinity Launcher - El launcher open source para Minecraft Bedrock en Linux**

[![Website](https://img.shields.io/website?url=https%3A//trinitylauncher.vercel.app)](https://trinitylauncher.vercel.app)
[![License](https://img.shields.io/badge/license-BSD--3--Clause-blue.svg)](LICENSE)
[![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-black)](https://vercel.com)

[🌐 Sitio Web](https://trinitylauncher.vercel.app) • [📖 Wiki](https://trinitylauncher.vercel.app/pages/wiki.html) • [❓ FAQ](https://trinitylauncher.vercel.app/pages/faq.html) • [👥 Equipo](https://trinitylauncher.vercel.app/pages/contributors.html)

</div>

## 📋 Descripción

Sitio web moderno y responsive de Trinity Launcher, construido con tecnologías web estáticas. Incluye documentación completa, preguntas frecuentes, información del equipo y recursos para la comunidad.

### ✨ Características principales

-  **Diseño moderno** con modo oscuro y animaciones suaves
-  **Completamente responsive** para todos los dispositivos
-  **Carga rápida** con contenido optimizado
-  **SEO optimizado** con meta tags completos
-  **Analytics integrado** y datos estructurados
-  **Sistema modular** para fácil mantenimiento
-  **Contenido dinámico** cargado desde JSON/HTML

## 🛠️ Tecnologías utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + CSS personalizado
- **Iconos**: [Font Awesome 6](https://fontawesome.com/)
- **Deployment**: [Vercel](https://vercel.com/)
- **Optimización**: Compresión de imágenes, minificación CSS/JS

## 📁 Estructura del proyecto

```

trinity-launcher-website/  
├── api
│   └── login.js
├── assets
│   ├── icons
│   │   ├── favicon.ico
│   │   ├── start23.svg
│   │   └── start.svg
│   └── images
│       ├── 1.webp
│       ├── 2.webp
│       ├── 3.webp
│       ├── 4.webp
│       ├── 5.webp
│       └── trinity-launcher-preview.jpg
├── css
│   ├── components.css
│   └── main.css
├── data
│   ├── contributors.json
│   ├── faq-content
│   │   ├── 1.html
│   │   ├── 2.html
│   │   ├── 3.html
│   │   ├── 4.html
│   │   ├── 5.html
│   │   ├── 6.html
│   │   ├── 7.html
│   │   ├── 8.html
│   │   ├── 9.html
│   │   └── config.json
│   └── wiki-content
│       ├── configs.json
│       ├── configuration.html
│       ├── getting-started.html
│       ├── installation.html
│       ├── support.html
│       └── technical-docs.html
├── index.html
├── js
│   ├── main.js
│   ├── navigation.js
│   ├── tailwind.config.js
│   └── utils.js
├── LICENSE
├── pages
│   ├── contributors.html
│   ├── faq.html
│   └── wiki.html
├── README.md
└── vercel.json

```

## Instalación y desarrollo

### Prerrequisitos

- **Navegador web moderno** (Chrome, Firefox, Safari, Edge)
- **Servidor local** (recomendado para desarrollo)

### Desarrollo local

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/Trinity-LA/Trinity-Website.git
   cd Trinity-Website
``

2. **Inicia un servidor local**
    
    **Opción 1: Python**
    
    ```bash
    python -m http.server 8000
    # O con Python 3
    python3 -m http.server 8000
    ```
 
    **Opción 2: Vercel Live Server**
    
    - Instala Vercel para poder usar `vercel dev`
    - Asi podras usar un servidor vercel de forma local

    
    **Opción 3: VS Code Live Server**
    
    - Instala la extensión "Live Server"
    - Click derecho en `index.html` → "Open with Live Server"


