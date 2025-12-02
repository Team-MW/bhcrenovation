document.addEventListener('DOMContentLoaded', () => {
  // Page Loader
  const pageLoader = document.querySelector('.page-loader');
  if (pageLoader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        pageLoader.classList.add('hidden');
        setTimeout(() => {
          pageLoader.style.display = 'none';
        }, 500);
      }, 800);
    });
  }

  // Burger Menu
  const burger = document.querySelector('.burger');
  const navigation = document.querySelector('#primary-navigation');

  if (burger && navigation) {
    const closeMenu = () => {
      burger.classList.remove('is-open');
      navigation.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    };

    const toggleMenu = () => {
      const isOpen = burger.classList.toggle('is-open');
      navigation.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('nav-open', isOpen);
    };

    burger.addEventListener('click', toggleMenu);

    navigation.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (burger.classList.contains('is-open')) {
          closeMenu();
        }
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) {
        closeMenu();
      }
    });

    document.addEventListener('click', (event) => {
      if (
        burger.classList.contains('is-open') &&
        !burger.contains(event.target) &&
        !navigation.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }

  // Scroll Reveal Animation
  const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealOnScroll = () => {
    scrollRevealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('revealed');
      }
    });
  };

  // Initial check
  revealOnScroll();
  
  // Throttled scroll listener
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        revealOnScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Parallax effect for hero section (light)
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        const rate = scrolled * 0.15;
        hero.style.transform = `translateY(${rate}px)`;
      }
    });
  }

  // Add hover effects to cards
  const cards = document.querySelectorAll('.service-card, .feature-card, .visual-card');
  cards.forEach((card) => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });

  // Before/After slider
  const beforeAfterSliders = document.querySelectorAll('.before-after-slider');
  beforeAfterSliders.forEach((slider) => {
    const inner = slider.querySelector('.before-after-slider-inner');
    const afterWrapper = slider.querySelector('.before-after-slider-after');
    const handle = slider.querySelector('.before-after-handle');
    const range = slider.querySelector('.before-after-range');

    if (!inner || !afterWrapper || !handle || !range) return;

    const setPosition = (value) => {
      const clamped = Math.min(100, Math.max(0, value));
      afterWrapper.style.width = clamped + '%';
      handle.style.left = clamped + '%';
    };

    setPosition(range.value || 50);

    range.addEventListener('input', (event) => {
      setPosition(Number(event.target.value));
    });

    const updateFromClientX = (clientX) => {
      const rect = inner.getBoundingClientRect();
      const relative = ((clientX - rect.left) / rect.width) * 100;
      setPosition(relative);
      range.value = String(Math.min(100, Math.max(0, relative)));
    };

    const startDrag = (event) => {
      event.preventDefault();
      const move = (moveEvent) => {
        const clientX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX;
        updateFromClientX(clientX);
      };
      const stop = () => {
        window.removeEventListener('mousemove', move);
        window.removeEventListener('touchmove', move);
        window.removeEventListener('mouseup', stop);
        window.removeEventListener('touchend', stop);
      };

      window.addEventListener('mousemove', move);
      window.addEventListener('touchmove', move);
      window.addEventListener('mouseup', stop);
      window.addEventListener('touchend', stop);
    };

    inner.addEventListener('mousedown', startDrag);
    inner.addEventListener('touchstart', startDrag, { passive: true });
  });

  // Gallery Lightbox
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length > 0) {
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Fermer">&times;</button>
        <img class="lightbox-image" src="" alt="">
        <button class="lightbox-prev" aria-label="Image précédente">‹</button>
        <button class="lightbox-next" aria-label="Image suivante">›</button>
      </div>
    `;
    document.body.appendChild(lightbox);

    let currentIndex = 0;
    const images = Array.from(galleryItems).map(item => ({
      src: item.querySelector('img').src,
      alt: item.querySelector('img').alt
    }));

    const openLightbox = (index) => {
      currentIndex = index;
      lightbox.classList.add('active');
      lightbox.querySelector('.lightbox-image').src = images[currentIndex].src;
      lightbox.querySelector('.lightbox-image').alt = images[currentIndex].alt;
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    const showNext = () => {
      currentIndex = (currentIndex + 1) % images.length;
      lightbox.querySelector('.lightbox-image').src = images[currentIndex].src;
      lightbox.querySelector('.lightbox-image').alt = images[currentIndex].alt;
    };

    const showPrev = () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      lightbox.querySelector('.lightbox-image').src = images[currentIndex].src;
      lightbox.querySelector('.lightbox-image').alt = images[currentIndex].alt;
    };

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => openLightbox(index));
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-next').addEventListener('click', showNext);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', showPrev);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
      }
    });
  }
});

