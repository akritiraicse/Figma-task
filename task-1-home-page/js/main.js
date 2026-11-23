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

/* ---------- Recommendations slider ---------- */
(function ($) {
  'use strict';

  $('.rec-slider').slick({
    infinite: true,
    centerMode: true,
    centerPadding: '74px',
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    swipe: true,
    touchMove: true,
    speed: 500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, centerMode: false } },
      { breakpoint: 640, settings: { slidesToShow: 1, centerMode: true, centerPadding: '28px' } }
    ]
  });
}(jQuery));

/* ---------- Contact form (nothing is stored or sent) ---------- */
(function ($) {
  'use strict';

  var $form = $('#contact-form');
  var $status = $('#form-status');
  var statusTimer = null;
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setError($input, message) {
    $input.attr('aria-invalid', message ? 'true' : 'false');
    $('#' + $input.attr('id') + '-error').text(message || '');
  }

  function validate() {
    var $name = $('#name');
    var $email = $('#email');
    var valid = true;

    if (!$.trim($name.val())) {
      setError($name, 'Please enter your full name.');
      valid = false;
    } else {
      setError($name, '');
    }

    if (!$.trim($email.val())) {
      setError($email, 'Please enter your email address.');
      valid = false;
    } else if (!emailPattern.test($.trim($email.val()))) {
      setError($email, 'Please enter a valid email address.');
      valid = false;
    } else {
      setError($email, '');
    }

    if (!valid) { $form.find('[aria-invalid="true"]').first().trigger('focus'); }
    return valid;
  }

  $form.on('input', '#name, #email', function () {
    if ($(this).attr('aria-invalid') === 'true') { setError($(this), ''); }
  });

  $form.on('submit', function (e) {
    e.preventDefault();
    if (!validate()) { return; }

    $form[0].reset();
    $status.text('Thanks, message sent');
    clearTimeout(statusTimer);
    statusTimer = setTimeout(function () { $status.text(''); }, 4000);
  });
}(jQuery));
