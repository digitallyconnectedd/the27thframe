/* ============================================================
   THE 27TH FRAME — script.js
   Minimal, intentional JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ── Page Transition ────────────────────────────────────── */
  const overlay = document.querySelector('.page-transition');

  function runExitAnimation(href) {
    if (!overlay) { window.location.href = href; return; }
    overlay.classList.remove('enter');
    overlay.classList.add('enter');
    overlay.addEventListener('animationend', () => {
      window.location.href = href;
    }, { once: true });
  }

  // Intercept nav clicks for cinematic transitions
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (
      !href ||
      href.startsWith('#') ||
      href.startsWith('mailto') ||
      href.startsWith('tel') ||
      href.startsWith('http') ||
      link.hasAttribute('data-no-transition')
    ) return;
    link.addEventListener('click', e => {
      e.preventDefault();
      runExitAnimation(href);
    });
  });

  // On page load: play exit animation in reverse
  if (overlay) {
    overlay.classList.add('exit');
    overlay.addEventListener('animationend', () => {
      overlay.classList.remove('exit');
    }, { once: true });
  }

  /* ── Navbar Scroll State ────────────────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile Hamburger Menu ──────────────────────────────── */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Intersection Observer: Reveal Animations ───────────── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if (revealEls.length) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));
  }

  /* ── Hero Headline Char Animation ───────────────────────── */
  const heroHeadline = document.querySelector('.hero__headline');
  if (heroHeadline) {
    heroHeadline.style.opacity = '1';
    // Already rendered; just ensure visibility after a short delay
    setTimeout(() => {
      heroHeadline.classList.add('visible');
    }, 200);
  }

  /* ── Ticker Duplication (seamless infinite loop) ────────── */
  // Duplicate items INSIDE the single track so animation can translateX(-50%)
  const tickerTrack = document.querySelector('.frame-ticker__track');
  if (tickerTrack) {
    const items = Array.from(tickerTrack.querySelectorAll('.frame-ticker__item'));
    items.forEach(item => tickerTrack.appendChild(item.cloneNode(true)));
  }

  /* ── Active Nav Link ─────────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__menu a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });

})();
