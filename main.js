document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const navigation = document.querySelector('#primary-navigation');

  if (!burger || !navigation) {
    return;
  }

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
});

