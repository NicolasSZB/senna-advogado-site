/* Senna Advocacia — interações leves (sem bibliotecas) */
(function () {
  var root = document.documentElement;

  /* Cabeçalho: transparente sobre a abertura, sólido ao rolar */
  var header = document.querySelector('.header');
  function onScroll() {
    header.classList.toggle('is-solid', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Animações ao rolar */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  root.classList.add('anim');

  var groups = [
    '.sec-head',
    '.area-col',
    '.about',
    '.pillars > li',
    '.steps > li',
    '.faq',
    '.contact-cta',
    '.contact-list'
  ];

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  groups.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      var index = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.setAttribute('data-reveal', '');
      el.style.setProperty('--delay', Math.min(index, 3) * 0.1 + 's');
      observer.observe(el);
    });
  });
})();
