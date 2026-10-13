/* ============================================================
   Muhammad Kamil — Portfolio interactions
   Vanilla JavaScript, no libraries.

   1. Footer year
   2. Header shadow on scroll
   3. Mobile navigation toggle
   4. Scroll-triggered reveal animations (Intersection Observer)
   5. Active nav link highlighting
   6. Count-up numbers in the stats strip
   7. Copy-to-clipboard for email addresses
   ============================================================ */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var supportsIO = 'IntersectionObserver' in window;

  /* ---------- 1. Footer year: always shows the current year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 2. Header gets a border/shadow once the page scrolls ---------- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 3. Mobile navigation ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  var toggleLabel = toggle ? toggle.querySelector('.visually-hidden') : null;

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    if (toggleLabel) toggleLabel.textContent = open ? 'Close menu' : 'Open menu';
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close the menu after choosing a link
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });

    // Close with Escape and return focus to the button
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
    });

    // Reset when resizing up to desktop width
    window.matchMedia('(min-width: 861px)').addEventListener('change', function (mq) {
      if (mq.matches) setMenu(false);
    });
  }

  /* ---------- 4. Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  // Children of a [data-stagger] container animate one after another
  document.querySelectorAll('[data-stagger]').forEach(function (group) {
    group.querySelectorAll(':scope > .reveal').forEach(function (el, i) {
      el.style.setProperty('--delay', Math.min(i * 90, 540) + 'ms');
    });
  });

  if (!supportsIO || prefersReducedMotion) {
    // No animation: just show everything
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // animate only once
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- 5. Highlight the nav link for the section in view ---------- */
  var navLinks = document.querySelectorAll('.nav-link');
  var linkById = {};
  navLinks.forEach(function (link) {
    linkById[link.getAttribute('href').slice(1)] = link;
  });

  // Sections without their own nav link map to the nearest one
  var aliases = { featured: 'work' };

  if (supportsIO) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = aliases[entry.target.id] || entry.target.id;
        navLinks.forEach(function (l) { l.removeAttribute('aria-current'); });
        if (linkById[id]) linkById[id].setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    document.querySelectorAll('main section[id]').forEach(function (s) {
      sectionObserver.observe(s);
    });
  }

  /* ---------- 6. Count-up numbers ---------- */
  // Each .stat-num with data-count animates from 0 to that value.
  // The final value is already in the HTML, so nothing breaks without JS.
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1400;
    var start = null;

    function frame(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  var counters = document.querySelectorAll('[data-count]');
  if (supportsIO && !prefersReducedMotion) {
    var countObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          countUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { countObserver.observe(c); });
  }

  /* ---------- 7. Copy email to clipboard ---------- */
  var toast = document.getElementById('toast');
  var status = document.getElementById('copy-status');
  var toastTimer;

  function showToast(message) {
    if (status) status.textContent = message; // announced to screen readers
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-shown');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-shown'); }, 2200);
  }

  function fallbackCopy(text) {
    // Older browsers / non-HTTPS: temporary textarea trick
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text)
          .then(function () { showToast('Copied ' + text); })
          .catch(function () {
            showToast(fallbackCopy(text) ? 'Copied ' + text : 'Copy failed, please select the address');
          });
      } else {
        showToast(fallbackCopy(text) ? 'Copied ' + text : 'Copy failed, please select the address');
      }
    });
  });
})();
