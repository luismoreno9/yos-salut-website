/**
 * YOS SALUT — Scripts principales
 * Smooth scroll, menú móvil, header scroll effect, FAQ accordion
 */
(function () {
  'use strict';

  /* ------------------------------------------------
   * DOM ready
   * ---------------------------------------------- */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
    initFaqAccordion();
    initTiltCards();
    initParallaxMotion();
    initImageFallbacks();
    initRevealOnScroll();
    initBodyMap();
    initBookingModal();
    initMagneticButtons();
    initRipple();
    initMethodScrollTelling();
    initCarousel();
  }

  /* ------------------------------------------------
   * Menú móvil (hamburguesa)
   * ---------------------------------------------- */
  function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');
    const body = document.body;

    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('nav--open');
      toggle.setAttribute('aria-expanded', isOpen);
      body.classList.toggle('no-scroll', isOpen);
    });

    // Cerrar menú al hacer clic en un enlace
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav--open');
        toggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('no-scroll');
      });
    });
  }

  /* ------------------------------------------------
   * Smooth scroll para anclas internas
   * ---------------------------------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  /* ------------------------------------------------
   * Smart Navbar: transparent → solid, hide ↓ show ↑
   * ---------------------------------------------- */
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    var lastY = 0;
    var ticking = false;
    var delta = 5;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var y = window.scrollY;

          // Transparent → Solid
          header.classList.toggle('header--scrolled', y > 50);

          // Transparent over hero (no background when at top)
          header.classList.toggle('header--top', y <= 50);

          // Hide on scroll down, show on scroll up
          if (Math.abs(y - lastY) > delta) {
            if (y > lastY && y > 120) {
              header.classList.add('header--hidden');
            } else {
              header.classList.remove('header--hidden');
            }
            lastY = y;
          }

          ticking = false;
        });
        ticking = true;
      }
    });

    // Set initial state
    header.classList.toggle('header--top', window.scrollY <= 50);
  }

  /* ------------------------------------------------
   * FAQ Accordion
   * ---------------------------------------------- */
  function initFaqAccordion() {
    document.querySelectorAll('.faq__question').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const item = this.closest('.faq__item');
        const isOpen = item.classList.contains('faq__item--open');

        // Cerrar todos
        document.querySelectorAll('.faq__item--open').forEach(function (openItem) {
          openItem.classList.remove('faq__item--open');
          openItem.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
        });

        // Abrir el actual si estaba cerrado
        if (!isOpen) {
          item.classList.add('faq__item--open');
          this.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ------------------------------------------------
   * 3D tilt en tarjetas con data-tilt
   * ---------------------------------------------- */
  function initTiltCards() {
    const cards = document.querySelectorAll('[data-tilt]');
    if (!cards.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (event) {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateY = ((x / rect.width) - 0.5) * 10;
        const rotateX = (0.5 - (y / rect.height)) * 10;
        card.style.transform = 'perspective(900px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translateY(-6px)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ------------------------------------------------
   * Parallax suave en elementos flotantes
   * ---------------------------------------------- */
  function initParallaxMotion() {
    const elements = document.querySelectorAll('.floating-3d, .particle');
    if (!elements.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId = null;

    window.addEventListener('mousemove', function (event) {
      if (rafId) return;
      rafId = requestAnimationFrame(function () {
        const xRatio = (event.clientX / window.innerWidth) - 0.5;
        const yRatio = (event.clientY / window.innerHeight) - 0.5;

        elements.forEach(function (el, index) {
          const intensity = (index % 5 + 1) * 2;
          const tx = xRatio * intensity;
          const ty = yRatio * intensity;
          el.style.translate = tx.toFixed(2) + 'px ' + ty.toFixed(2) + 'px';
        });

        rafId = null;
      });
    });
  }

  /* ------------------------------------------------
   * Fallback de imágenes locales (assets/*)
   * ---------------------------------------------- */
  function initImageFallbacks() {
    const fallbackByName = {
      'masaje-hero.jpg': 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1600&q=80',
      'kine.webp': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
      'terapeutico.jpg': 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=800&q=80',
      'masaje-descontracturante.webp': 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80',
      'masaje-relajante.jpg': 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
      'drenaje-linfatico.png': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      'foto-profesional.jpeg': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80',
      'foto-profesional.webp': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80',
      'masaje-hero-video.mp4': null,
      'masaje-hero-video.webm': null,
    };

    const allImages = document.querySelectorAll('img[src^="assets/"]');
    allImages.forEach(function (img) {
      img.addEventListener('error', function onError() {
        const fileName = img.getAttribute('src').split('/').pop() || '';
        const fallback = fallbackByName[fileName];
        if (fallback && img.getAttribute('src') !== fallback) {
          img.setAttribute('src', fallback);
        }
      }, { once: true });
    });
  }

  /* ------------------------------------------------
   * Reveal al hacer scroll
   * ---------------------------------------------- */
  function initRevealOnScroll() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = document.querySelectorAll('.service-row, .service-card, .blog-card, .value-card, .step, .schedule-card, .body-map-layout, .testimonial-card, .about-layout, .pricing-card, .services-compare');
    if (!targets.length || !('IntersectionObserver' in window)) return;

    targets.forEach(function (el) {
      el.classList.add('reveal-item');
    });

    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('reveal-item--visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }
  /* ------------------------------------------------
   * Mapa corporal interactivo
   * ---------------------------------------------- */
  function initBodyMap() {
    var svg = document.querySelector('.body-map__svg');
    var infoPanel = document.getElementById('body-map-info');
    if (!svg || !infoPanel) return;

    var zones = svg.querySelectorAll('.body-zone');
    var cards = infoPanel.querySelectorAll('.body-map-info__card');
    var defaultHint = infoPanel.querySelector('.body-map-info__default');

    zones.forEach(function (zone) {
      zone.addEventListener('click', function () {
        var zoneName = this.getAttribute('data-zone');

        // Remove active from all zones with same name
        zones.forEach(function (z) {
          z.classList.remove('body-zone--active');
        });

        // Activate all SVG shapes for this zone
        svg.querySelectorAll('[data-zone="' + zoneName + '"]').forEach(function (z) {
          z.classList.add('body-zone--active');
        });

        // Hide all info cards
        cards.forEach(function (c) {
          c.hidden = true;
        });

        // Show matching card
        var target = infoPanel.querySelector('[data-info="' + zoneName + '"]');
        if (target) {
          target.hidden = false;
          if (defaultHint) defaultHint.hidden = true;
        }
      });
    });
  }

  /* ------------------------------------------------
   * Reserva híbrida: Calendly (modal) + WhatsApp
   * ---------------------------------------------- */
  function initBookingModal() {
    var modal = document.getElementById('booking-modal');
    if (!modal) return;

    var openers = document.querySelectorAll('[data-open-booking]');
    var closers = modal.querySelectorAll('[data-close-booking]');
    var fallbackWrap = document.getElementById('booking-modal-fallback');
    var fallbackText = document.getElementById('booking-modal-fallback-text');
    var fallbackWhatsapp = document.getElementById('booking-modal-whatsapp');
    var calendlyWrap = document.getElementById('booking-modal-calendly');
    var calendlyInline = document.getElementById('calendly-inline');

    if (fallbackWhatsapp) {
      fallbackWhatsapp.setAttribute('href', (window.CONFIG?.whatsappBaseUrl || 'https://wa.me/34660385358') + '?text=' + (window.CONFIG?.whatsappDefaultMsg || ''));
    }

    function ensureCalendlyScriptLoaded() {
      if (document.querySelector('script[data-calendly-widget]')) return;
      var script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.setAttribute('data-calendly-widget', 'true');
      document.body.appendChild(script);
    }

    function openModal() {
      modal.hidden = false;
      document.body.classList.add('no-scroll');

      var url = (window.CONFIG && window.CONFIG.calendlyUrl) ? String(window.CONFIG.calendlyUrl).trim() : '';
      if (url) {
        if (fallbackWrap) fallbackWrap.hidden = true;
        if (calendlyWrap) calendlyWrap.hidden = false;
        if (calendlyInline) {
          calendlyInline.setAttribute('data-url', url);
        }
        ensureCalendlyScriptLoaded();
      } else {
        if (calendlyWrap) calendlyWrap.hidden = true;
        if (fallbackWrap) fallbackWrap.hidden = false;
        if (fallbackText) {
          fallbackText.textContent = (window.CONFIG && window.CONFIG.calendlyFallbackText) ? window.CONFIG.calendlyFallbackText : '';
        }
      }

      // Focus close button for accessibility
      var closeBtn = modal.querySelector('.modal__close');
      if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
      modal.hidden = true;
      document.body.classList.remove('no-scroll');
    }

    openers.forEach(function (btn) {
      btn.addEventListener('click', openModal);
    });

    closers.forEach(function (btn) {
      btn.addEventListener('click', closeModal);
    });

    window.addEventListener('keydown', function (e) {
      if (modal.hidden) return;
      if (e.key === 'Escape') closeModal();
    });
  }

  /* ------------------------------------------------
   * Premium testimonial carousel (drag + arrows + dots)
   * ---------------------------------------------- */
  function initCarousel() {
    var el = document.getElementById('testimonial-carousel');
    if (!el) return;

    var track = el.querySelector('.carousel__track');
    var slides = el.querySelectorAll('.carousel__slide');
    var prevBtn = el.querySelector('.carousel__arrow--prev');
    var nextBtn = el.querySelector('.carousel__arrow--next');
    var dotsWrap = el.querySelector('.carousel__dots');
    if (!track || !slides.length) return;

    var current = 0;
    var perView = getPerView();
    var total = slides.length;
    var maxIndex = Math.max(0, total - perView);

    // Build dots
    function buildDots() {
      dotsWrap.innerHTML = '';
      for (var i = 0; i <= maxIndex; i++) {
        var dot = document.createElement('button');
        dot.className = 'carousel__dot' + (i === current ? ' carousel__dot--active' : '');
        dot.setAttribute('aria-label', 'Ir a reseña ' + (i + 1));
        dot.dataset.index = i;
        dot.addEventListener('click', function () { goTo(+this.dataset.index); });
        dotsWrap.appendChild(dot);
      }
    }

    function getPerView() {
      if (window.innerWidth <= 640) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    function goTo(index) {
      current = Math.max(0, Math.min(index, maxIndex));
      var slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(track).gap || 24);
      track.style.transform = 'translateX(-' + (current * slideWidth) + 'px)';
      updateDots();
    }

    function updateDots() {
      dotsWrap.querySelectorAll('.carousel__dot').forEach(function (d, i) {
        d.classList.toggle('carousel__dot--active', i === current);
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

    // Touch / drag support
    var startX = 0, moveX = 0, isDragging = false;

    track.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      isDragging = true;
      startX = e.clientX;
      moveX = 0;
      track.classList.add('is-dragging');
      track.setPointerCapture(e.pointerId);
    });

    track.addEventListener('pointermove', function (e) {
      if (!isDragging) return;
      moveX = e.clientX - startX;
      var slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(track).gap || 24);
      var base = current * slideWidth;
      track.style.transform = 'translateX(' + (-base + moveX) + 'px)';
    });

    track.addEventListener('pointerup', function () {
      if (!isDragging) return;
      isDragging = false;
      track.classList.remove('is-dragging');
      if (moveX < -50) goTo(current + 1);
      else if (moveX > 50) goTo(current - 1);
      else goTo(current);
    });

    // Recalc on resize
    window.addEventListener('resize', function () {
      perView = getPerView();
      maxIndex = Math.max(0, total - perView);
      current = Math.min(current, maxIndex);
      buildDots();
      goTo(current);
    });

    // Auto-play (pause on hover)
    var autoTimer = setInterval(function () {
      goTo(current >= maxIndex ? 0 : current + 1);
    }, 5000);

    el.addEventListener('pointerenter', function () { clearInterval(autoTimer); });
    el.addEventListener('pointerleave', function () {
      autoTimer = setInterval(function () {
        goTo(current >= maxIndex ? 0 : current + 1);
      }, 5000);
    });

    buildDots();
    goTo(0);
  }

  /* ------------------------------------------------
   * Scroll-telling: Mi método (swap steps on scroll)
   * ---------------------------------------------- */
  function initMethodScrollTelling() {
    var steps = document.querySelectorAll('.method__step');
    var visuals = document.querySelectorAll('.method__visual');
    if (!steps.length || !visuals.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        var stepNum = entry.target.getAttribute('data-step');

        // Activate the matching step
        steps.forEach(function (s) {
          s.classList.toggle('method__step--active', s.getAttribute('data-step') === stepNum);
        });

        // Swap the visual
        visuals.forEach(function (v) {
          v.classList.toggle('method__visual--active', v.getAttribute('data-step') === stepNum);
        });
      });
    }, { threshold: 0.6, rootMargin: '-20% 0px -20% 0px' });

    steps.forEach(function (step) {
      observer.observe(step);
    });
  }

  /* ------------------------------------------------
   * Magnetic CTA buttons (cursor attraction effect)
   * ---------------------------------------------- */
  function initMagneticButtons() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if ('ontouchstart' in window) return; // skip on touch devices

    var magnets = document.querySelectorAll('.btn--whatsapp, .btn--primary, .header__actions .btn');
    if (!magnets.length) return;

    magnets.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (x * 0.25).toFixed(1) + 'px, ' + (y * 0.25).toFixed(1) + 'px) scale(1.04)';
      });

      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }

  /* ------------------------------------------------
   * Ripple effect on button click
   * ---------------------------------------------- */
  function initRipple() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.btn');
      if (!btn) return;

      var ripple = document.createElement('span');
      ripple.classList.add('ripple');
      var rect = btn.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);

      ripple.addEventListener('animationend', function () {
        ripple.remove();
      });
    });
  }
})();
