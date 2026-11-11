/* Senna Advocacia — animações ao rolar a página (leve, sem bibliotecas) */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('anim');

  // Grupos de elementos que surgem ao rolar; irmãos aparecem em sequência curta.
  var groups = [
    '.strip .container > div',
    '.section-head',
    '.area-group-title',
    '.area-grid > .area-card',
    '.steps > .step',
    '.steps-cta',
    '.about .container > div',
    '.about-facts > li',
    '.faq-list > details',
    '.contact .container > div'
  ];

  var items = [];
  groups.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      var index = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.setAttribute('data-reveal', '');
      el.style.setProperty('--delay', Math.min(index, 4) * 0.08 + 's');
      items.push(el);
    });
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      el.classList.add('is-visible');
      observer.unobserve(el);
      // depois da entrada, remove o atraso para o hover responder na hora
      setTimeout(function () { el.style.removeProperty('--delay'); el.classList.add('done'); }, 1200);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(function (el) { observer.observe(el); });
})();
