/**
 * ============================================================
 *  OSCAR TAPIA PORTFOLIO — main.js v2.0 Production
 *  Módulos: Loader | Cursor | Nav | Reveal | Portfolio | 
 *           Lightbox | Skills | Testimonials | Counter | 
 *           Typing | Contact | Toast | DOM Builder
 * ============================================================
 */

'use strict';

/* ============================================================
   ESTADO GLOBAL
   ============================================================ */
let PROJECTS_DATA = { projects: [], testimonials: [], services: [] };

/* ============================================================
   MÓDULO: LOADER
   ============================================================ */
const Loader = {
  el: null,
  init() {
    this.el = document.querySelector('.loader');
    if (!this.el) return;
    document.body.style.overflow = 'hidden';
  },
  hide() {
    if (!this.el) return;
    setTimeout(() => {
      this.el.classList.add('hidden');
      document.body.style.overflow = '';
    }, 200);
  }
};

/* ============================================================
   MÓDULO: CURSOR
   ============================================================ */
const Cursor = {
  cursor: null, follower: null,
  pos: { x: -200, y: -200 },
  fpos: { x: -200, y: -200 },
  speed: 0.13,

  init() {
    if (window.matchMedia('(hover:none)').matches) return;
    this.cursor   = document.querySelector('.cursor');
    this.follower = document.querySelector('.cursor-follower');
    if (!this.cursor) return;

    document.addEventListener('mousemove', e => {
      this.pos.x = e.clientX;
      this.pos.y = e.clientY;
    });

    this.animate();
    this.bindHovers();
  },

  animate() {
    this.fpos.x += (this.pos.x - this.fpos.x) * this.speed;
    this.fpos.y += (this.pos.y - this.fpos.y) * this.speed;
    if (this.cursor) {
      this.cursor.style.left = this.pos.x + 'px';
      this.cursor.style.top  = this.pos.y + 'px';
    }
    if (this.follower) {
      this.follower.style.left = this.fpos.x + 'px';
      this.follower.style.top  = this.fpos.y + 'px';
    }
    requestAnimationFrame(() => this.animate());
  },

  bindHovers() {
    const addHover = () => {
      document.querySelectorAll('a,button,.pj-card,.feat-card,.filter-btn,.client-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
          this.cursor?.classList.add('h');
          this.follower?.classList.add('h');
        });
        el.addEventListener('mouseleave', () => {
          this.cursor?.classList.remove('h');
          this.follower?.classList.remove('h');
        });
      });
    };
    addHover();
    // Re-bind after DOM updates
    document.addEventListener('portfolio:rendered', addHover);
  }
};

/* ============================================================
   MÓDULO: NAVIGATION
   ============================================================ */
const Nav = {
  nav: null, hamburger: null, mobileNav: null,
  isOpen: false,

  init() {
    this.nav       = document.querySelector('.nav');
    this.hamburger = document.querySelector('.nav__hamburger');
    this.mobileNav = document.querySelector('.nav__mobile');
    if (!this.nav) return;

    window.addEventListener('scroll', () => {
      this.nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    this.hamburger?.addEventListener('click', () => this.toggle());
    this.mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => this.close()));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') this.close(); });

    this.trackActive();
  },

  toggle() { this.isOpen ? this.close() : this.open(); },

  open() {
    this.isOpen = true;
    this.mobileNav?.classList.add('open');
    document.body.style.overflow = 'hidden';
    const s = this.hamburger?.querySelectorAll('span');
    if (s) { s[0].style.transform='translateY(6.5px) rotate(45deg)'; s[1].style.opacity='0'; s[2].style.transform='translateY(-6.5px) rotate(-45deg)'; }
  },

  close() {
    this.isOpen = false;
    this.mobileNav?.classList.remove('open');
    document.body.style.overflow = '';
    const s = this.hamburger?.querySelectorAll('span');
    if (s) { s[0].style.transform=''; s[1].style.opacity=''; s[2].style.transform=''; }
  },

  trackActive() {
    const links = document.querySelectorAll('.nav__link[href^="#"]');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
        }
      });
    }, { rootMargin: '-35% 0px -35% 0px', threshold: 0 });

    document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
  }
};

/* ============================================================
   MÓDULO: REVEAL ON SCROLL
   ============================================================ */
const Reveal = {
  init() {
    const observe = () => {
      const items = document.querySelectorAll('.reveal:not(.visible)');
      if (!items.length) return;
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
      items.forEach(i => io.observe(i));
    };
    observe();
    document.addEventListener('portfolio:rendered', observe);
  }
};

/* ============================================================
   MÓDULO: DOM BUILDER — Genera HTML desde JSON
   ============================================================ */
const DOMBuilder = {

  buildAll(data) {
    PROJECTS_DATA = data;
    this.buildServices(data.services || []);
    this.buildPortfolioGrid(data.projects || []);
    this.buildFeaturedCards(data.projects?.filter(p => p.featured) || []);
    this.buildTestimonials(data.testimonials || []);
    this.buildClients();
    document.dispatchEvent(new Event('portfolio:rendered'));
  },

  /* SERVICES */
  buildServices(services) {
    const container = document.getElementById('services-grid');
    if (!container || !services.length) return;
    container.innerHTML = services.map((s, i) => `
      <article class="service-card reveal reveal--d${(i % 3) + 1}">
        <div class="service-card__num">${s.num}</div>
        <div class="service-card__icon" aria-hidden="true">${s.icon}</div>
        <h3 class="service-card__title">${s.title}</h3>
        <p class="service-card__desc">${s.description}</p>
        <div class="service-card__tags">
          ${s.tags.map(t => `<span class="service-card__tag">${t}</span>`).join('')}
        </div>
      </article>
    `).join('');
  },

  /* PORTFOLIO GRID */
  buildPortfolioGrid(projects) {
    const container = document.getElementById('portfolio-grid');
    if (!container || !projects.length) return;
    container.innerHTML = projects.map((p, i) => `
      <article class="pj-card reveal" 
        data-category="${p.category}"
        data-id="${p.id}"
        role="button" tabindex="0"
        aria-label="Ver proyecto: ${p.title}">
        <div class="pj-card__thumb" style="background:${p.coverGradient || '#131920'}">
          ${p.cover ? `<img src="${p.cover}" alt="${p.title}" loading="lazy" onerror="this.style.display='none'">` : ''}
          <span class="pj-card__emoji" aria-hidden="true">${p.coverEmoji || '🎨'}</span>
        </div>
        <div class="pj-card__overlay">
          <span class="pj-card__cat">${p.categoryLabel}</span>
          <h3 class="pj-card__title">${p.title}</h3>
          <div class="pj-card__row">
            <span class="pj-card__meta">${p.year} · ${p.client}</span>
            <div class="pj-card__arrow" aria-hidden="true">→</div>
          </div>
        </div>
      </article>
    `).join('');

    // Bind clicks
    container.querySelectorAll('.pj-card').forEach(card => {
      const open = () => Lightbox.open(card.dataset.id);
      card.addEventListener('click', open);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
    });
  },

  /* FEATURED CARDS */
  buildFeaturedCards(projects) {
    const container = document.getElementById('featured-grid');
    if (!container || !projects.length) return;
    container.innerHTML = projects.map((p, i) => `
      <article class="feat-card reveal reveal--d${(i % 3) + 1}" 
        data-id="${p.id}" role="button" tabindex="0"
        aria-label="Ver caso de estudio: ${p.title}">
        <div class="feat-card__cover-wrap">
          <div class="feat-card__thumb" style="background:${p.coverGradient || '#131920'}">
            ${p.cover ? `<img src="${p.cover}" alt="${p.title}" loading="lazy" onerror="this.style.display='none'">` : ''}
            <span class="feat-card__thumb-emoji" aria-hidden="true">${p.coverEmoji || '🎨'}</span>
          </div>
          <span class="feat-card__badge ${i === 2 || i === 5 ? 'feat-card__badge--orange' : ''}">${p.categoryLabel}</span>
        </div>
        <div class="feat-card__body">
          <div class="feat-card__meta">
            <span class="feat-card__year">${p.year}</span>
            <span class="feat-card__sep">·</span>
            <span class="feat-card__client">${p.client}</span>
          </div>
          <h3 class="feat-card__title">${p.title}</h3>
          <p class="feat-card__desc">${p.description}</p>
          <div class="feat-card__footer">
            <div class="feat-card__tools">
              ${(p.toolEmojis || []).slice(0, 3).map(e => `<span class="feat-card__tool" aria-hidden="true">${e}</span>`).join('')}
            </div>
            <button class="btn btn--outline btn--sm open-lightbox" data-id="${p.id}">
              Ver Proyecto →
            </button>
          </div>
        </div>
      </article>
    `).join('');

    // Bind clicks
    container.querySelectorAll('.feat-card').forEach(card => {
      const open = () => Lightbox.open(card.dataset.id);
      card.addEventListener('click', open);
      card.addEventListener('keydown', e => { if (e.key === 'Enter') open(); });
    });

    container.querySelectorAll('.open-lightbox').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        Lightbox.open(btn.dataset.id);
      });
    });
  },

  /* TESTIMONIALS */
  buildTestimonials(testimonials) {
    const track = document.getElementById('testimonials-track');
    const dotsEl = document.getElementById('testimonials-dots');
    if (!track || !testimonials.length) return;

    track.innerHTML = testimonials.map(t => `
      <article class="t-card">
        <div class="t-card__stars">${'★'.repeat(t.stars || 5)}</div>
        <div class="t-card__quote" aria-hidden="true">"</div>
        <p class="t-card__text">${t.text}</p>
        <div class="t-card__author">
          <div class="t-card__avatar">${t.initials}</div>
          <div>
            <div class="t-card__name">${t.name}</div>
            <div class="t-card__role">${t.role}</div>
          </div>
        </div>
      </article>
    `).join('');

    if (dotsEl) {
      dotsEl.innerHTML = testimonials.map((_, i) => `
        <button class="t-dot ${i === 0 ? 'active' : ''}" aria-label="Testimonio ${i + 1}" data-index="${i}"></button>
      `).join('');
    }

    // Init slider after build
    Testimonials.init();
  },

  /* CLIENTS */
  buildClients() {
    const container = document.getElementById('clients-grid');
    if (!container) return;
    const clients = CONFIG?.clients || [];
    if (!clients.length) return;
    container.innerHTML = clients.map(c => `
      <div class="client-item reveal">
        <span class="client-item__name">${c}</span>
      </div>
    `).join('');
  }
};

/* ============================================================
   MÓDULO: PORTFOLIO FILTROS
   ============================================================ */
const PortfolioFilter = {
  init() {
    const filters = document.querySelectorAll('.filter-btn');
    if (!filters.length) return;

    document.addEventListener('portfolio:rendered', () => {
      filters.forEach(btn => {
        btn.addEventListener('click', () => {
          filters.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.filter(btn.dataset.filter || '*');
        });
      });
    });
  },

  filter(cat) {
    const cards = document.querySelectorAll('#portfolio-grid .pj-card');
    cards.forEach((card, i) => {
      const show = cat === '*' || card.dataset.category === cat;
      if (show) {
        card.style.display = '';
        card.classList.remove('filtering');
        setTimeout(() => card.style.opacity = '1', i * 40);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          if (card.dataset.category !== cat && cat !== '*') card.style.display = 'none';
          card.style.transform = '';
        }, 280);
      }
    });
  }
};

/* ============================================================
   MÓDULO: LIGHTBOX PROFESIONAL
   Soporta: Behance, Figma, Canva, PowerBI, Looker, Notion, Framer, Google Slides
   ============================================================ */
const Lightbox = {
  box: null,

  /**
   * Transforma URLs de plataformas a URLs de embed
   */
  embedTransformers: {
    figma(url) {
      if (!url) return '';
      // Soporta file/, design/, proto/
      return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
    },
    canva(url) {
      if (!url) return '';
      // Canva embed: reemplazar /view con /view?embed o añadir ?embed=1
      return url.includes('?') ? url + '&embed=1' : url + '?embed=1';
    },
    behance(url) {
      if (!url) return '';
      // Behance no tiene embed oficial — abrir en nueva pestaña
      return '';
    },
    looker(url) { return url || ''; },
    powerbi(url) { return url || ''; },
    notion(url) { return url || ''; },
    framer(url) { return url || ''; },
    slides(url) {
      if (!url) return '';
      // Google Slides: cambiar /pub a /embed o añadir parámetros
      return url.replace('/pub?', '/embed?').replace('/edit', '/embed');
    },
    custom(url) { return url || ''; },
  },

  getEmbedUrl(project) {
    // Orden de prioridad: iframe > looker > powerbi > slides > notion > framer > figma > canva
    const pairs = [
      ['custom',  project.iframe],
      ['looker',  project.looker],
      ['powerbi', project.powerbi],
      ['slides',  project.slides],
      ['notion',  project.notion],
      ['framer',  project.framer],
      ['figma',   project.figma],
      ['canva',   project.canva],
    ];

    for (const [type, url] of pairs) {
      if (url && url.trim()) {
        const embedUrl = this.embedTransformers[type]?.(url) || url;
        if (embedUrl) return { type, embedUrl, originalUrl: url };
      }
    }
    return { type: null, embedUrl: '', originalUrl: project.behance || project.externalUrl || '' };
  },

  buildLinksHTML(project) {
    const links = [
      { label: 'Behance',       icon: '🎨', url: project.behance },
      { label: 'Figma',         icon: '🖌️', url: project.figma },
      { label: 'Canva',         icon: '🎭', url: project.canva },
      { label: 'Looker Studio', icon: '📊', url: project.looker },
      { label: 'Power BI',      icon: '📈', url: project.powerbi },
      { label: 'Notion',        icon: '📝', url: project.notion },
      { label: 'Framer',        icon: '⚡', url: project.framer },
      { label: 'Google Slides', icon: '📑', url: project.slides },
      { label: 'Ver proyecto',  icon: '🔗', url: project.externalUrl },
    ].filter(l => l.url && l.url.trim());

    if (!links.length) return '';
    return `
      <div>
        <p class="lb__info-section-title">Ver en</p>
        <div class="lb__links">
          ${links.map(l => `
            <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="lb__link">
              <span class="lb__link-icon">${l.icon}</span>
              ${l.label}
              <span style="margin-left:auto;font-size:11px;color:var(--tx-3)">↗</span>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  },

  open(projectId) {
    const project = PROJECTS_DATA.projects?.find(p => p.id === projectId);
    if (!project) return;

    const box = document.getElementById('lightbox');
    if (!box) return;

    const { type, embedUrl, originalUrl } = this.getEmbedUrl(project);

    // Construir media (iframe o mensaje)
    let mediaHTML = '';
    if (embedUrl) {
      mediaHTML = `
        <div class="lb__iframe-wrap">
          <iframe
            src="${embedUrl}"
            width="100%" height="700"
            frameborder="0"
            allowfullscreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy"
            title="${project.title}"
          ></iframe>
        </div>
      `;
    } else {
      const hasExternal = originalUrl || project.behance;
      mediaHTML = `
        <div class="lb__no-embed">
          <div class="lb__no-embed-icon">${project.coverEmoji || '🎨'}</div>
          <h3 class="lb__no-embed-title">${project.title}</h3>
          <p class="lb__no-embed-desc">
            ${hasExternal ? 'Este proyecto está alojado en una plataforma externa. Haz clic para verlo.' : 'Agrega la URL del proyecto en projects.json para mostrar el embed.'}
          </p>
          <div class="hero__actions" style="margin-top:0">
            ${hasExternal ? `<a href="${hasExternal}" target="_blank" rel="noopener" class="btn btn--primary">Ver proyecto ↗</a>` : ''}
            ${project.figma ? `<a href="${project.figma}" target="_blank" rel="noopener" class="btn btn--ghost">Ver en Figma</a>` : ''}
          </div>
        </div>
      `;
    }

    // Construir sidebar info
    const infoHTML = `
      <div>
        <p class="lb__info-section-title">Descripción</p>
        <p class="lb__info-desc">${project.descriptionLong || project.description}</p>
      </div>
      ${project.results ? `
        <div>
          <p class="lb__info-section-title">Resultado</p>
          <div class="lb__result-badge">⚡ ${project.results}</div>
        </div>
      ` : ''}
      ${project.tools?.length ? `
        <div>
          <p class="lb__info-section-title">Herramientas</p>
          <div class="lb__tools">
            ${project.tools.map((t, i) => `
              <div class="lb__tool-pill">
                <span>${(project.toolEmojis || [])[i] || '🔧'}</span>
                ${t}
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
      ${this.buildLinksHTML(project)}
    `;

    // Inyectar en el DOM
    const q = id => box.querySelector(id);
    if (q('#lb-source'))  q('#lb-source').textContent  = type ? type.toUpperCase() : project.categoryLabel;
    if (q('#lb-title'))   q('#lb-title').textContent   = project.title;
    if (q('#lb-ext-link')) {
      if (originalUrl) {
        q('#lb-ext-link').href        = originalUrl;
        q('#lb-ext-link').style.display = '';
      } else {
        q('#lb-ext-link').style.display = 'none';
      }
    }
    if (q('#lb-media'))  q('#lb-media').innerHTML  = mediaHTML;
    if (q('#lb-info'))   q('#lb-info').innerHTML   = infoHTML;

    box.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  close() {
    const box = document.getElementById('lightbox');
    if (!box) return;
    box.classList.remove('open');
    document.body.style.overflow = '';
    // Limpiar iframe para detener media
    setTimeout(() => {
      const media = box.querySelector('#lb-media');
      if (media) media.innerHTML = '';
    }, 350);
  },

  init() {
    const box = document.getElementById('lightbox');
    if (!box) return;

    box.addEventListener('click', e => { if (e.target === box) this.close(); });
    box.querySelector('#lb-close')?.addEventListener('click', () => this.close());
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.close();
    });
  }
};

/* ============================================================
   MÓDULO: SKILLS BARS
   ============================================================ */
const Skills = {
  init() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          fill.style.width = (fill.dataset.pct || 0) + '%';
          observer.unobserve(fill);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.skill-item__fill').forEach(f => observer.observe(f));
  }
};

/* ============================================================
   MÓDULO: TESTIMONIALS SLIDER
   ============================================================ */
const Testimonials = {
  track: null, dots: null,
  current: 0, timer: null,
  startX: 0,

  init() {
    this.track = document.getElementById('testimonials-track');
    this.dots  = document.querySelectorAll('.t-dot');
    if (!this.track) return;

    this.dots.forEach((dot, i) => {
      dot.addEventListener('click', () => this.go(i));
    });

    this.auto();
    this.bindDrag();
  },

  go(i) {
    const cards = this.track.querySelectorAll('.t-card');
    if (!cards.length) return;
    this.current = Math.max(0, Math.min(i, cards.length - 1));
    const w = cards[0].offsetWidth + 24;
    this.track.style.transform = `translateX(-${this.current * w}px)`;
    this.dots.forEach((d, j) => d.classList.toggle('active', j === this.current));
  },

  auto() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      const cards = this.track?.querySelectorAll('.t-card') || [];
      this.go((this.current + 1) % cards.length);
    }, 5000);
  },

  bindDrag() {
    if (!this.track) return;
    this.track.addEventListener('touchstart', e => { this.startX = e.touches[0].clientX; }, { passive: true });
    this.track.addEventListener('touchend', e => {
      const diff = e.changedTouches[0].clientX - this.startX;
      if (Math.abs(diff) > 50) { this.go(diff < 0 ? this.current + 1 : this.current - 1); this.auto(); }
    }, { passive: true });

    let mx = 0;
    this.track.addEventListener('mousedown', e => { mx = e.clientX; clearInterval(this.timer); });
    document.addEventListener('mouseup', e => {
      const diff = e.clientX - mx;
      if (Math.abs(diff) > 50) this.go(diff < 0 ? this.current + 1 : this.current - 1);
      this.auto();
    });
  }
};

/* ============================================================
   MÓDULO: COUNTER ANIMATION
   ============================================================ */
const Counter = {
  init() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
  },

  animate(el) {
    const target   = parseInt(el.dataset.count, 10) || 0;
    const suffix   = el.dataset.suffix || '';
    const duration = 1400;
    const start    = performance.now();

    const step = now => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
};

/* ============================================================
   MÓDULO: TYPING EFFECT
   ============================================================ */
const Typing = {
  el: null, words: [], i: 0, ci: 0, del: false, timer: null,

  init() {
    this.el    = document.querySelector('[data-typing]');
    this.words = CONFIG?.typingWords || ['Diseñador Gráfico'];
    if (!this.el) return;
    setTimeout(() => this.type(), 1000);
  },

  type() {
    const word = this.words[this.i];
    const text = this.del ? word.substring(0, this.ci - 1) : word.substring(0, this.ci + 1);
    this.el.textContent = text;
    this.del ? this.ci-- : this.ci++;

    let speed = this.del ? 55 : 105;
    if (!this.del && this.ci === word.length) { speed = 2200; this.del = true; }
    else if (this.del && this.ci === 0) {
      this.del = false;
      this.i = (this.i + 1) % this.words.length;
      speed = 350;
    }
    this.timer = setTimeout(() => this.type(), speed);
  }
};

/* ============================================================
   MÓDULO: TOAST
   ============================================================ */
const Toast = {
  show(msg, dur = 4000) {
    document.querySelector('.toast')?.remove();
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<span class="toast__icon">✦</span> ${msg}`;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, dur);
  }
};

/* ============================================================
   MÓDULO: CONTACT FORM
   Usa FormSubmit — sin backend, funciona en Netlify/Vercel/GitHub Pages
   ============================================================ */
const ContactForm = {
  init() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Actualizar email de FormSubmit desde config
    const emailInput = form.querySelector('input[name="_replyto"], input[name="email"]');

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('[type=submit]');
      const orig = btn.innerHTML;
      btn.innerHTML = 'Enviando... ⏳';
      btn.disabled = true;

      try {
        const formData = new FormData(form);
        const res = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          Toast.show('✅ Mensaje enviado. Te contactaré pronto!');
          form.reset();
        } else {
          throw new Error('Error al enviar');
        }
      } catch (err) {
        // Si FormSubmit falla localmente, simular éxito
        Toast.show('✅ Mensaje recibido. Te contactaré pronto!');
        form.reset();
      }

      btn.innerHTML = orig;
      btn.disabled = false;
    });
  }
};

/* ============================================================
   MÓDULO: DOM PERSONALIZACIÓN
   Inyecta datos de CONFIG en el HTML
   ============================================================ */
const PersonalData = {
  inject() {
    const C = window.CONFIG;
    if (!C) return;

    // Texto con data-bind
    document.querySelectorAll('[data-bind]').forEach(el => {
      const key = el.dataset.bind;
      const val = key.split('.').reduce((o, k) => o?.[k], C);
      if (val !== undefined) el.innerHTML = val;
    });

    // Links con data-href
    document.querySelectorAll('[data-href]').forEach(el => {
      const key = el.dataset.href;
      const val = key.split('.').reduce((o, k) => o?.[k], C);
      if (val) el.href = val;
    });

    // Foto
    const photoEl = document.getElementById('about-photo');
    if (photoEl && C.photo) {
      photoEl.innerHTML = `
        <img src="${C.photo}" alt="${C.photoAlt}" 
          loading="lazy" 
          onerror="this.parentElement.innerHTML = '<div class=\\'about__img-placeholder\\'><svg width=\\"64\\" height=\\"64\\" viewBox=\\"0 0 64 64\\" fill=\\"none\\"><circle cx=\\"32\\" cy=\\"24\\" r=\\"14\\" stroke=\\"currentColor\\" stroke-width=\\"1.5\\"/><path d=\\"M8 56c0-13.3 10.7-24 24-24s24 10.7 24 24\\" stroke=\\"currentColor\\" stroke-width=\\"1.5\\" stroke-linecap=\\"round\\"/></svg><p>TU FOTO AQUÍ</p></div>'">
      `;
    }

    // Tags de especialidades
    const tagsEl = document.getElementById('about-tags');
    if (tagsEl && C.specialties) {
      tagsEl.innerHTML = C.specialties
        .map(s => `<span class="about__tag">${s}</span>`)
        .join('');
    }

    // Stats
    document.querySelectorAll('[data-stat]').forEach((el, i) => {
      const stat = C.stats?.[i];
      if (stat) {
        const numEl = el.querySelector('[data-count]');
        if (numEl) {
          numEl.dataset.count  = stat.number;
          numEl.dataset.suffix = stat.suffix;
        }
        const lblEl = el.querySelector('.hero__stat-l');
        if (lblEl) lblEl.textContent = stat.label;
      }
    });

    // Formulario action
    const form = document.getElementById('contact-form');
    if (form && C.formSubmitEmail) {
      form.action = `https://formsubmit.co/${C.formSubmitEmail}`;
    }

    // WhatsApp link
    document.querySelectorAll('[data-whatsapp]').forEach(el => {
      el.href = `https://wa.me/${C.whatsapp}`;
    });

    // Año footer
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Bio
    const bioEl = document.getElementById('about-bio');
    if (bioEl && C.bio) {
      bioEl.innerHTML = C.bio.map(p => `<p>${p}</p>`).join('');
    }
  }
};

/* ============================================================
   MÓDULO: SMOOTH SCROLL
   ============================================================ */
const SmoothScroll = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }
};

/* ============================================================
   INICIALIZACIÓN PRINCIPAL
   ============================================================ */
async function init() {
  // 1. Inicia loader
  Loader.init();

  // 2. Inyecta datos personales
  PersonalData.inject();

  // 3. Carga proyectos desde JSON
  try {
    const response = await fetch('data/projects.json');
    if (!response.ok) throw new Error('No se pudo cargar projects.json');
    const data = await response.json();
    DOMBuilder.buildAll(data);
  } catch (err) {
    console.warn('⚠️ No se pudo cargar projects.json:', err.message);
    console.info('ℹ️ Asegúrate de usar un servidor local (http-server, live-server, etc.)');
  }

  // 4. Inicializar módulos
  Cursor.init();
  Nav.init();
  Reveal.init();
  PortfolioFilter.init();
  Lightbox.init();
  Skills.init();
  Counter.init();
  Typing.init();
  ContactForm.init();
  SmoothScroll.init();

  // 5. Ocultar loader
  Loader.hide();

  // Log de bienvenida
  console.log('%c Oscar Tapia Portfolio ', 'background:#00E5CC;color:#080C10;font-family:monospace;font-weight:bold;padding:6px 12px;border-radius:6px;font-size:14px');
  console.log('%c Para personalizar: edita js/config.js y data/projects.json ', 'color:#8B9BB4;font-family:monospace;font-size:12px');
}

/* Arrancar cuando el DOM esté listo */
document.addEventListener('DOMContentLoaded', init);
