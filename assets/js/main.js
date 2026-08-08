(function () {
  'use strict';

  // Mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.hidden = isOpen;
      toggle.textContent = isOpen ? 'MENU' : 'CLOSE';
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        mobileNav.hidden = true;
        toggle.textContent = 'MENU';
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    btn.addEventListener('click', function () {
      var isOpen = item.getAttribute('data-open') === 'true';
      // close all others
      document.querySelectorAll('.faq-item').forEach(function (i) {
        i.setAttribute('data-open', 'false');
        i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.setAttribute('data-open', 'true');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Contact form (Formspree AJAX submit)
  var form = document.getElementById('contact-form');
  if (form) {
    var successEl = document.getElementById('form-success');
    var errorEl = document.getElementById('form-error');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      errorEl.style.display = 'none';
      successEl.style.display = 'none';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            successEl.style.display = 'block';
            submitBtn.textContent = 'Sent';
          } else {
            throw new Error('Server error');
          }
        })
        .catch(function () {
          errorEl.style.display = 'block';
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });
    });
  }
})();
