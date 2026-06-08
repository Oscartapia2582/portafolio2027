/**
 * ============================================================
 *  ██████╗ ██████╗ ███╗   ██╗███████╗██╗ ██████╗ 
 * ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔════╝ 
 * ██║     ██║   ██║██╔██╗ ██║█████╗  ██║██║  ███╗
 * ██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██║   ██║
 * ╚██████╗╚██████╔╝██║ ╚████║██║     ██║╚██████╔╝
 *  ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝ ╚═════╝ 
 *
 *  CONFIGURACIÓN RÁPIDA — Oscar Tapia Portfolio
 *  ============================================================
 *  Solo edita este archivo para personalizar TODO el sitio.
 *  No necesitas tocar index.html ni ningún otro archivo.
 *  ============================================================
 */

const CONFIG = {

  /* ──────────────────────────────────────────
     👤 DATOS PERSONALES
  ────────────────────────────────────────── */
  name:        "Oscar Tapia",
  firstName:   "Oscar",
  lastName:    "Tapia",
  tagline:     "Diseñador Gráfico Senior | Marketing Digital | Copywriter",
  profession:  "Diseñador Gráfico Senior",

  bio: [
    "Soy <strong>Oscar Tapia</strong>, Diseñador Gráfico Senior con más de 9 años de experiencia transformando ideas en marcas poderosas y estrategias digitales que generan resultados reales.",
    "Mi enfoque combina <strong>diseño de alto impacto</strong> con una sólida comprensión del marketing digital, lo que me permite crear piezas visuales que no solo se ven bien, sino que también <strong>convierten y conectan</strong> con el público objetivo.",
    "Trabajo con empresas, startups y emprendedores que quieren destacar en mercados competitivos. Desde identidad de marca hasta campañas de Google Ads, ofrezco soluciones <strong>integrales y medibles</strong>."
  ],

  /* ──────────────────────────────────────────
     📸 FOTO — Pon tu foto en assets/img/
  ────────────────────────────────────────── */
  photo: "assets/img/oscar-tapia.jpg",   // ← Cambia por tu foto real
  photoAlt: "assets/img/oscar-tapia.jpg — Diseñador Gráfico Senior",

  /* ──────────────────────────────────────────
     📄 CV — Pon tu CV en assets/cv/
  ────────────────────────────────────────── */
  cv: "cv-oscar-tapia.pdf",   // ← Cambia por tu CV real

  /* ──────────────────────────────────────────
     📧 CONTACTO
  ────────────────────────────────────────── */
  email:     "oscartapia_30@hotmail.com",  // ← Tu email real
  whatsapp:  "18297479929",              // ← Sin +, sin espacios
  phone:     "+1 (829) 747-9929",        // ← Versión display

  /* ──────────────────────────────────────────
     🌐 REDES SOCIALES
  ────────────────────────────────────────── */
  social: {
    linkedin:   "https://linkedin.com/in/oscartapia",    // ← Tu LinkedIn
    behance:    "https://behance.net/oscartapia",         // ← Tu Behance
    instagram:  "https://instagram.com/oscartapia",       // ← Tu Instagram
    twitter:    "https://twitter.com/oscartapia",         // ← Tu Twitter/X (o "" para ocultar)
    github:     "https://github.com/oscartapia",          // ← Tu GitHub (o "" para ocultar)
  },

  /* ──────────────────────────────────────────
     🔢 ESTADÍSTICAS HERO
  ────────────────────────────────────────── */
  stats: [
    { number: 9,   suffix: "+", label: "Años de experiencia" },
    { number: 100, suffix: "+", label: "Proyectos completados" },
    { number: 50,  suffix: "+", label: "Clientes satisfechos" },
  ],

  /* ──────────────────────────────────────────
     🏷️ ESPECIALIDADES (Sobre mí)
  ────────────────────────────────────────── */
  specialties: [
    "Diseño Publicitario", "Branding", "Redes Sociales",
    "Google Ads", "Google Analytics", "Community Management",
    "Meta Ads", "Estrategia Digital", "IA & Marketing", "Copywriting"
  ],

  /* ──────────────────────────────────────────
     🏢 COLABORADORES
  ────────────────────────────────────────── */
  colaboraciones: [
    "electrodomesticos.com.do", "Banco Popular", "BHD", "Banreservas",
    "Banco Santa Cruz", "Banco Prómerica", "Credicefi", "Asociación Cibao",
    "Scotiabank", "ALNAP", "APAP", "Lafise"
  ],

  /* ──────────────────────────────────────────
     ✉️ FORMSUBMIT — Email donde recibes los mensajes
     Visita https://formsubmit.co/ y activa tu email
  ────────────────────────────────────────── */
  formSubmitEmail: "oscarjosetapiafigueroa@gmail.com",  // ← Tu email para recibir mensajes

  /* ──────────────────────────────────────────
     🌍 SEO & META
  ────────────────────────────────────────── */
  siteUrl:     "https://oscartapia.design",    // ← Tu dominio real
  siteLocale:  "es_DO",
  ogImage:     "https://oscartapia.design/assets/img/og-image.jpg",

  /* ──────────────────────────────────────────
     🎨 TYPING WORDS (Hero — palabras rotativas)
  ────────────────────────────────────────── */
  typingWords: [
    "Diseñador Gráfico",
    "Brand Strategist",
    "Community Manager",
    "Digital Marketer",
    "Copywriter",
    "AI & Design"
  ],

};

// Exportar para uso en main.js
if (typeof module !== 'undefined') module.exports = CONFIG;
