(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  var links = document.querySelectorAll('.site-nav__link[data-spy]');

  /* ---------- Mobile menu ---------- */
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', function () {
    setMenu(!nav.classList.contains('is-open'));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) { setMenu(false); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { setMenu(false); }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) { setMenu(false); }
  });

  /* ---------- Scroll spy ---------- */
  var sections = Array.prototype.map.call(links, function (link) {
    return { link: link, el: document.getElementById(link.getAttribute('data-spy')) };
  }).sort(function (a, b) { return a.el.offsetTop - b.el.offsetTop; });

  function updateSpy() {
    var line = header.offsetHeight + 40;
    var current = sections[0];
    sections.forEach(function (s) {
      if (s.el.getBoundingClientRect().top <= line) { current = s; }
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = sections[sections.length - 1];
    }
    links.forEach(function (l) { l.classList.toggle('is-active', l === current.link); });
  }

  window.addEventListener('scroll', updateSpy, { passive: true });
  window.addEventListener('resize', updateSpy);
  updateSpy();
}());
