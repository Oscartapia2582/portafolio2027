# 🎨 Oscar Tapia — Portfolio Premium

> Portafolio profesional estilo Behance × Awwwards × Apple  
> Modo oscuro · Responsive · Animaciones · SEO optimizado · Listo para producción

---

## ⚡ Inicio rápido

### 1. Personaliza tus datos

Abre **`js/config.js`** y edita estos campos:

```js
const CONFIG = {
  name:      "Tu Nombre",
  email:     "tu@email.com",
  whatsapp:  "18091234567",   // Sin +, sin espacios
  photo:     "assets/img/tu-foto.jpg",
  cv:        "assets/cv/tu-cv.pdf",

  social: {
    linkedin:  "https://linkedin.com/in/tuperfil",
    behance:   "https://behance.net/tuperfil",
    instagram: "https://instagram.com/tuperfil",
  },

  formSubmitEmail: "tu@email.com",  // Email donde recibirás mensajes
}
```

### 2. Añade tu foto y CV

```
assets/
├── img/
│   └── oscar-tapia.jpg   ← Tu foto (400x533px recomendado)
├── cv/
│   └── cv-oscar-tapia.pdf ← Tu CV
```

### 3. Agrega tus proyectos

Edita **`data/projects.json`** — cada proyecto tiene esta estructura:

```json
{
  "id":              "mi-proyecto-unico",
  "title":           "Nombre del Proyecto",
  "category":        "branding",
  "categoryLabel":   "Branding",
  "client":          "Nombre del Cliente",
  "year":            "2024",
  "cover":           "assets/projects/mi-proyecto.jpg",
  "coverGradient":   "linear-gradient(135deg,#0D1B2E,#1A3A5C)",
  "coverEmoji":      "🎨",
  "description":     "Descripción corta para la tarjeta",
  "descriptionLong": "Descripción larga para el lightbox",
  "tools":           ["Adobe Illustrator", "Figma"],
  "toolEmojis":      ["🎨", "🖌️"],
  "tags":            ["Logo", "Branding"],
  "results":         "+40% en reconocimiento de marca",
  "featured":        true,

  "behance":   "https://www.behance.net/gallery/...",
  "figma":     "https://www.figma.com/design/...",
  "canva":     "https://www.canva.com/design/.../view",
  "looker":    "https://lookerstudio.google.com/embed/...",
  "powerbi":   "https://app.powerbi.com/view?...",
  "notion":    "https://notion.so/...",
  "framer":    "https://tu-proyecto.framer.website",
  "slides":    "https://docs.google.com/presentation/.../pub",
  "iframe":    "https://cualquier-url-embebible.com",
  "externalUrl": "https://enlace-externo.com"
}
```

> **Tip:** Solo necesitas rellenar los campos que uses. Deja vacíos `""` los que no apliquen.

### 4. Configura FormSubmit (formulario de contacto)

1. Ve a [formsubmit.co](https://formsubmit.co/)
2. Ingresa tu email — recibirás un email de confirmación
3. Confirma tu email
4. ¡Listo! Los mensajes llegarán a tu bandeja

---

## 🚀 Deploy gratuito

### Opción A — Netlify (recomendado)

1. Sube la carpeta a GitHub
2. Ve a [netlify.com](https://netlify.com) → "Add new site" → "Import from GitHub"
3. Selecciona tu repositorio → Deploy
4. ¡Listo! Netlify detecta `netlify.toml` automáticamente

**Dominio personalizado gratis:** Settings → Domain management → Add custom domain

### Opción B — Vercel

1. Sube la carpeta a GitHub
2. Ve a [vercel.com](https://vercel.com) → "New Project" → Import
3. Framework Preset: **Other** → Deploy
4. Vercel detecta `vercel.json` automáticamente

### Opción C — GitHub Pages

1. Sube la carpeta a GitHub (repositorio público)
2. Settings → Pages → Branch: `main` → Folder: `/ (root)`
3. Tu sitio estará en: `https://tu-usuario.github.io/tu-repo`

> ⚠️ **Nota GitHub Pages:** Los archivos JSON se cargan via fetch(). 
> GitHub Pages sirve archivos estáticos correctamente, pero necesitas
> abrir el sitio desde un servidor (no doble-clic en index.html).

---

## 📁 Estructura de archivos

```
portfolio/
│
├── index.html              ← Página principal
├── sitemap.xml             ← SEO sitemap
├── robots.txt              ← SEO robots
├── netlify.toml            ← Config deploy Netlify
├── vercel.json             ← Config deploy Vercel
├── README.md               ← Esta guía
│
├── css/
│   └── style.css           ← Todos los estilos
│
├── js/
│   ├── config.js           ← ⭐ TU CONFIGURACIÓN AQUÍ
│   └── main.js             ← JavaScript principal
│
├── data/
│   └── projects.json       ← ⭐ TUS PROYECTOS AQUÍ
│
└── assets/
    ├── img/
    │   ├── oscar-tapia.jpg ← Tu foto
    │   └── og-image.jpg    ← Imagen Open Graph (1200x630px)
    ├── projects/           ← Imágenes de tus proyectos
    ├── cv/
    │   └── cv-oscar-tapia.pdf
    └── icons/              ← Iconos adicionales
```

---

## 🖼️ Proyectos externos — Plataformas soportadas

| Plataforma      | Campo JSON  | Notas |
|-----------------|-------------|-------|
| Behance         | `behance`   | Abre en nueva pestaña (Behance no permite iframe) |
| Figma           | `figma`     | URL de file, design o prototipo |
| Canva           | `canva`     | URL de diseño con /view |
| Looker Studio   | `looker`    | URL de reporte publicado |
| Power BI        | `powerbi`   | URL de embed |
| Notion          | `notion`    | URL de página pública |
| Framer          | `framer`    | URL de tu sitio Framer |
| Google Slides   | `slides`    | URL /pub del documento |
| Cualquier URL   | `iframe`    | Cualquier URL embebible |

---

## 🔧 Desarrollo local

Para evitar problemas con CORS al cargar el JSON, usa un servidor local:

```bash
# Opción 1 — Node.js
npx http-server . -p 3000

# Opción 2 — Python
python -m http.server 3000

# Opción 3 — VS Code
# Instala la extensión "Live Server" y haz clic en "Go Live"
```

Luego abre: `http://localhost:3000`

---

## 🎨 Personalización avanzada

### Cambiar color de acento

En `css/style.css`, busca y cambia:
```css
--accent: #00E5CC;  /* Color principal */
--accent-2: #FF6B35; /* Color secundario */
```

### Añadir nueva categoría de filtro

En `index.html`, agrega en `.portfolio__filters`:
```html
<button class="filter-btn" data-filter="foto">Fotografía</button>
```

En `projects.json`, usa `"category": "foto"` en tus proyectos.

### Cambiar tipografía

En `css/style.css`, cambia el import de Google Fonts y las variables:
```css
--f-display: 'Syne', sans-serif;  /* Títulos */
--f-body:    'DM Sans', sans-serif; /* Cuerpo */
--f-mono:    'DM Mono', monospace;  /* Código/labels */
```

---

## 📊 Rendimiento

Objetivos Lighthouse:
- Performance: 95+
- Accessibility: 95+
- Best Practices: 100
- SEO: 100

Optimizaciones incluidas:
- ✅ Lazy loading de imágenes
- ✅ Fonts preconnect
- ✅ CSS crítico inline-friendly
- ✅ Animaciones con requestAnimationFrame
- ✅ IntersectionObserver para reveal
- ✅ Headers de caché en netlify.toml y vercel.json

---

## 📧 Soporte

¿Problemas? Revisa:
1. Que estés usando un servidor local (no doble-clic en index.html)
2. Que `js/config.js` esté correctamente configurado
3. Que `data/projects.json` tenga formato JSON válido (valida en [jsonlint.com](https://jsonlint.com))
4. Que las URLs de FormSubmit estén confirmadas en tu email

---

*Hecho con ✦ — Oscar Tapia Portfolio v2.0*
