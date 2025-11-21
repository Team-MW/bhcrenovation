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
});

