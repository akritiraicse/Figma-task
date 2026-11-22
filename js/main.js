(function ($) {
  'use strict';

  /* ---------- Header: mobile menu ---------- */
  var $toggle = $('.nav-toggle');
  var $nav = $('#site-nav');

  function closeMenu() {
    $nav.removeClass('is-open');
    $toggle.attr('aria-expanded', 'false');
  }

  $toggle.on('click', function () {
    var open = !$nav.hasClass('is-open');
    $nav.toggleClass('is-open', open);
    $toggle.attr('aria-expanded', String(open));
  });

  $nav.on('click', 'a', closeMenu);
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') { closeMenu(); }
  });
  $(window).on('resize', function () {
    if (window.innerWidth > 768) { closeMenu(); }
  });

  /* ---------- Header: scroll spy ---------- */
  var sections = $('.site-nav__link[data-spy]').map(function () {
    var id = $(this).data('spy');
    return { $link: $(this), el: document.getElementById(id) };
  }).get();

  function updateSpy() {
    var offset = $('.site-header').outerHeight() + 40;
    var current = sections[0];
    sections.forEach(function (s) {
      if (s.el && s.el.getBoundingClientRect().top <= offset) { current = s; }
    });
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) { current = sections[sections.length - 1]; }
    $('.site-nav__link').removeClass('is-active');
    current.$link.addClass('is-active');
  }

  $(window).on('scroll resize', updateSpy);
  updateSpy();
}(jQuery));
