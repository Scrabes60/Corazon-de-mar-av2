/* ============================================
   FLORERÍA CORAZÓN DE MARÍA - JavaScript
   ============================================ */

// ============================================
// CONFIGURACIÓN DE IMÁGENES - FÁCIL DE MODIFICAR
// ============================================
// Para cambiar cualquier imagen, solo edita las URLs aquí abajo.
// Puedes usar URLs de Unsplash, tu propio hosting, o subir imágenes a Imgur, Cloudinary, etc.

const IMAGES = {
  // Logo de la florería (reemplaza con tu logo real)
  logo: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=200&q=80',

  // Imagen del hero (fondo principal)
  hero: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1800&q=80',

  // Imagen editorial (sección "Nuestra mirada")
  editorial: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1100&q=80',

  // Productos / Arreglos destacados
  products: [
    {
      name: 'Aurora',
      desc: 'Una composición luminosa con gesto suave y acabado limpio.',
      price: '$850',
      image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=900&q=80',
      waText: 'Hola, me interesa el arreglo Aurora'
    },
    {
      name: 'Matilde',
      desc: 'Volumen equilibrado y textura envolvente para celebrar con calidez.',
      price: '$1,100',
      image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=900&q=80',
      waText: 'Hola, me interesa el arreglo Matilde'
    },
    {
      name: 'Clara',
      desc: 'Un arreglo sobrio y delicado para mensajes que piden sencillez.',
      price: '$720',
      image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=900&q=80',
      waText: 'Hola, me interesa el arreglo Clara'
    },
    {
      name: 'Inés',
      desc: 'Pieza protagonista con caída natural y una lectura más expresiva.',
      price: '$1,350',
      image: 'https://images.unsplash.com/photo-1494336934272-fd6f2e71a062?auto=format&fit=crop&w=900&q=80',
      waText: 'Hola, me interesa el arreglo Inés'
    }
  ],

  // Galería de imágenes (se pueden agregar más fácilmente)
  gallery: [
    { src: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=800&q=80', title: 'Ramo Primavera' },
    { src: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80', title: 'Centro de Mesa' },
    { src: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80', title: 'Rosas Elegantes' },
    { src: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=800&q=80', title: 'Lirios Blancos' },
    { src: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80', title: 'Arreglo Romántico' },
    { src: 'https://images.unsplash.com/photo-1462275646964-a0e3f2f7815d?auto=format&fit=crop&w=800&q=80', title: 'Flores Silvestres' },
    { src: 'https://images.unsplash.com/photo-1490750967868-88aa3f44c946?auto=format&fit=crop&w=800&q=80', title: 'Jardín en Casa' },
    { src: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=800&q=80', title: 'Tulipanes' },
    { src: 'https://images.unsplash.com/photo-1507290439931-a861b5a38200?auto=format&fit=crop&w=800&q=80', title: 'Peonías' }
  ]
};

// ============================================
// NÚMERO DE WHATSAPP - Cambia aquí tu número
// ============================================
const WHATSAPP_NUMBER = '525500000000';

function getWaLink(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// ============================================
// RENDERIZAR PRODUCTOS
// ============================================
function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  grid.innerHTML = IMAGES.products.map((product, i) => `
    <article class="product-card reveal" style="--i: ${i}">
      <div class="product-image-wrap">
        <img src="${product.image}" alt="Bouquet ${product.name}" width="900" height="1100" loading="lazy">
      </div>
      <div class="product-copy">
        <div>
          <h3>${product.name}</h3>
          <p>${product.desc}</p>
        </div>
        <div class="product-meta">
          <span>${product.price}</span>
          <a href="${getWaLink(product.waText)}" target="_blank" rel="noopener noreferrer">Solicitar</a>
        </div>
      </div>
    </article>
  `).join('');
}

// ============================================
// RENDERIZAR GALERÍA
// ============================================
let galleryVisibleCount = 6;
let currentGalleryIndex = 0;

function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  const btn = document.getElementById('load-more-gallery');
  if (!grid) return;

  const visible = IMAGES.gallery.slice(0, galleryVisibleCount);

  grid.innerHTML = visible.map((item, i) => `
    <div class="gallery-item reveal" data-index="${i}" style="--i: ${i % 3}">
      <img src="${item.src}" alt="${item.title}" loading="lazy">
      <div class="gallery-item-overlay">
        <span class="gallery-item-title">${item.title}</span>
      </div>
    </div>
  `).join('');

  // Actualizar botón
  if (btn) {
    if (galleryVisibleCount >= IMAGES.gallery.length) {
      btn.style.display = 'none';
    } else {
      btn.style.display = 'inline-flex';
    }
  }

  // Re-observar elementos nuevos
  observeNewElements(grid.querySelectorAll('.reveal'));
  attachGalleryClicks();
}

function loadMoreGallery() {
  galleryVisibleCount = Math.min(galleryVisibleCount + 3, IMAGES.gallery.length);
  renderGallery();
}

// ============================================
// LIGHTBOX
// ============================================
function attachGalleryClicks() {
  const items = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  items.forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.dataset.index);
      currentGalleryIndex = idx;
      openLightbox(idx);
    });
  });

  function openLightbox(idx) {
    const item = IMAGES.gallery[idx];
    if (!item) return;
    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
    lightboxCaption.textContent = item.title;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function nextImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % IMAGES.gallery.length;
    openLightbox(currentGalleryIndex);
  }

  function prevImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + IMAGES.gallery.length) % IMAGES.gallery.length;
    openLightbox(currentGalleryIndex);
  }

  document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
  document.querySelector('.lightbox-next')?.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
  document.querySelector('.lightbox-prev')?.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });
  lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  // Teclado
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });
}

// ============================================
// HEADER SCROLL
// ============================================
const header = document.querySelector('.site-header');

const updateHeader = () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

// ============================================
// MOBILE MENU
// ============================================
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');

const closeMenu = () => {
  menuToggle.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menú');
  nav.classList.remove('is-open');
};

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 820) closeMenu();
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 820) {
    closeMenu();
  }
});

// ============================================
// SCROLL REVEAL (Intersection Observer)
// ============================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let revealObserver;

function observeNewElements(elements) {
  if (!revealObserver || prefersReducedMotion) return;
  elements.forEach(el => revealObserver.observe(el));
}

function initRevealObserver() {
  const revealItems = document.querySelectorAll('.reveal');

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          instance.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -6% 0px'
    });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
}

// ============================================
// SMOOTH SCROLL PARA ANCLAS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Renderizar contenido dinámico
  renderProducts();
  renderGallery();

  // Configurar botón "Ver más"
  document.getElementById('load-more-gallery')?.addEventListener('click', loadMoreGallery);

  // Header scroll
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // Animaciones
  initRevealObserver();

  // Actualizar imágenes estáticas desde config
  const heroImg = document.getElementById('hero-img');
  const editorialImg = document.getElementById('editorial-img');
  const logoImg = document.getElementById('logo-img');
  const footerLogo = document.getElementById('footer-logo');

  if (heroImg) heroImg.src = IMAGES.hero;
  if (editorialImg) editorialImg.src = IMAGES.editorial;
  if (logoImg) logoImg.src = IMAGES.logo;
  if (footerLogo) footerLogo.src = IMAGES.logo;
});
