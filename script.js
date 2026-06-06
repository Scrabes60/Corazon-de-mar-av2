/* ============================================
   FLORERÍA CORAZÓN DE MARÍA - JavaScript
   ============================================ */

// ============================================
// CONFIGURACIÓN DE IMÁGENES - FÁCIL DE MODIFICAR
// ============================================
// Para cambiar cualquier imagen, solo edita las URLs aquí abajo.
// Puedes usar URLs de Unsplash, tu propio hosting, o subir imágenes a Imgur, Cloudinary, etc.

const IMAGES = {
  // Logo de la florería - URL de Cloudinary
  logo: 'https://res.cloudinary.com/dlab5qyc7/image/upload/f_auto,q_auto/1000214368_dx06bq',

  // Imagen del hero (fondo principal)
  hero: 'https://res.cloudinary.com/dlab5qyc7/image/upload/v1780703895/ChatGPT_Image_5_jun_2026_17_56_21_mtt47b.png',

  // Imagen editorial (sección "Nuestra mirada")
  editorial: 'https://res.cloudinary.com/dlab5qyc7/image/upload/v1780706564/93d8733b-422f-4776-be15-4c65d6bd61bc_hrrwkn.png',

  // Productos / Arreglos destacados
  products: [
    {
      name: 'Canasta Floral Sueños de Ballet',
      desc: 'Una composición luminosa con gesto suave y acabado limpio.',
      price: 'Pregunta por el descuento',
      image: 'https://res.cloudinary.com/dlab5qyc7/image/upload/v1780712181/052f5ccc-8839-450f-b043-1000959c0ee1_o1p7wz.jpg',
      waText: 'Hola, me interesa el arreglo floral'
    },
    {
      name: 'Ramo Rosas Rosadas Premium',
      desc: 'Elegante ramo de rosas rosadas acompañado de delicados detalles de nube (gypsophila), envuelto en papel coreano en tonos rosa y lila.',
      price: 'Pregunta por el descuento',
      image: 'https://res.cloudinary.com/dlab5qyc7/image/upload/v1780712381/5c245524-5940-4f82-b6fb-21f4227709aa_ykeulj.jpg',
      waText: 'Hola, me interesa el arreglo floral'
    },
    {
      name: 'Ramo Eterno Amor',
      desc: 'Impresionante bouquet de rosas rojas premium, cuidadosamente seleccionado para expresar amor, pasión y admiración.',
      price: 'Pregunta por el descuento',
      image: 'https://res.cloudinary.com/dlab5qyc7/image/upload/v1780712381/cfeef3e3-5c79-492e-84d2-428587415dc7_kmnzyt.jpg',
      waText: 'Hola, me interesa el arreglo floral'
    },
    {
      name: 'Dulce Armonía',
      desc: 'Un bouquet floral en tonos pastel que transmite serenidad, ternura y belleza natural..',
      price: 'Pregunta por el descuento',
      image: 'https://res.cloudinary.com/dlab5qyc7/image/upload/v1780706793/5e04ec81-e93e-4fa2-9ba7-0a94659637ca_lmbcha.jpg',
      waText: 'Hola, me interesa el arreglo floral'
    }
  ],

  // Galería de imágenes (se pueden agregar más fácilmente)
  gallery: [
    { src: 'https://res.cloudinary.com/dlab5qyc7/image/upload/v1780712476/copy_of_87f7f0b3-d254-4dfb-97e0-ceb0fd5da874_a6xnut.jpg', title: 'Aurora Rosada' },
    { src: 'https://res.cloudinary.com/dlab5qyc7/image/upload/v1780712380/4290cb1d-f266-4ecd-82f6-be52cb757f30_lkprne.jpg', title: 'Elegancia Urbana' },
    { src: 'https://res.cloudinary.com/dlab5qyc7/image/upload/v1780714274/7dbd7ea1-3ce2-4c87-9bc8-265e01232968_tb6i7m.jpg', title: 'Rayitos de Sol' },
    { src: 'https://res.cloudinary.com/dlab5qyc7/image/upload/v1780714275/1a35972e-726d-45e7-8325-16174eebf0a2_lytvos.jpg', title: 'Conejito de Amor' },
    { src: 'https://res.cloudinary.com/dlab5qyc7/image/upload/v1780714788/4224e324-346c-4320-8a1d-41a777b53748_cofknr.jpg', title: 'Destello Dorado' },
    { src: 'https://res.cloudinary.com/dlab5qyc7/image/upload/v1780714911/WhatsApp_Image_2026-06-03_at_7.01.06_PM_xza4xr.jpg', title: 'Felicidades mamá' }
  ]
};

// ============================================
// NÚMERO DE WHATSAPP - Cambia aquí tu número
// ============================================
const WHATSAPP_NUMBER = '525548838651';

function getWaLink(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// ============================================
// ACTUALIZAR ENLACES DE WHATSAPP ESTÁTICOS
// ============================================
function updateStaticWaLinks() {
  document.querySelectorAll('.wa-link').forEach(link => {
    const text = link.dataset.waText;
    if (text) {
      link.href = getWaLink(text);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  });
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

  if (btn) {
    if (galleryVisibleCount >= IMAGES.gallery.length) {
      btn.style.display = 'none';
    } else {
      btn.style.display = 'inline-flex';
    }
  }

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
  // Actualizar enlaces de WhatsApp PRIMERO (antes que smooth scroll)
  updateStaticWaLinks();

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
