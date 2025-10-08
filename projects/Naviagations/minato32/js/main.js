(function () {
  const nav = document.getElementById('primaryNav');
  const toggle = document.getElementById('navToggle');
  const overlay = document.getElementById('navOverlay');
  const searchInput = document.getElementById('navSearch');
  const clearSearchBtn = document.getElementById('clearSearch');
  const themeToggle = document.getElementById('themeToggle');

  const subToggles = Array.from(document.querySelectorAll('.has-sub > .sub-toggle'));
  const menuLinks = Array.from(document.querySelectorAll('.menu a, .submenu a'));

  const THEME_KEY = 'minato.theme';

  const isMobile = () => window.matchMedia('(max-width:820px)').matches;

  /* NAV toggle */
  toggle?.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('show', !expanded);
    overlay.hidden = expanded; // show overlay when nav is open (expanded=false => we are opening)
    if (!expanded) {
      // focus the first menu item for keyboard users
      const first = nav.querySelector('.menu a, .menu button');
      first?.focus();
      document.documentElement.classList.add('no-scroll');
    } else {
      // close: return focus
      toggle.focus();
      document.documentElement.classList.remove('no-scroll');
      closeAllSubmenus();
    }
  });

  /* overlay click closes nav */
  overlay?.addEventListener('click', () => {
    closeNav();
  });

  function closeNav() {
    nav.classList.remove('show');
    toggle.setAttribute('aria-expanded', 'false');
    overlay.hidden = true;
    document.documentElement.classList.remove('no-scroll');
    closeAllSubmenus();
  }

  /* SUBMENU handling */
  function closeAllSubmenus() {
    subToggles.forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      const sub = b.nextElementSibling;
      sub?.classList.remove('show');
      sub?.setAttribute('aria-hidden', 'true');
    });
  }

  subToggles.forEach(btn => {
    const submenu = btn.nextElementSibling;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      // close others
      closeAllSubmenus();
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        submenu.classList.add('show');
        submenu.setAttribute('aria-hidden', 'false');
        // focus first submenu item
        const first = submenu.querySelector('[role="menuitem"]');
        first?.focus();
      } else {
        btn.setAttribute('aria-expanded', 'false');
        submenu.classList.remove('show');
        submenu.setAttribute('aria-hidden', 'true');
      }
    });

    // keyboard on button
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        // open and focus first child
        btn.click();
      } else if (e.key === 'Escape') {
        closeAllSubmenus();
        btn.focus();
      }
    });

    // keyboard navigation in submenu
    submenu?.addEventListener('keydown', (e) => {
      const items = Array.from(submenu.querySelectorAll('[role="menuitem"]'));
      const idx = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        items[(idx + 1) % items.length].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        items[(idx - 1 + items.length) % items.length].focus();
      } else if (e.key === 'Escape') {
        closeAllSubmenus();
        btn.focus();
      }
    });
  });

  /* close menus on document click (outside nav) */
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target) && !overlay.contains(e.target)) {
      closeNav();
    }
  });

  /* ESC closes everything */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeNav();
    }
  });

  /* SEARCH: live filter, clear button */
  function normalize(s) { return String(s || '').trim().toLowerCase(); }

  searchInput?.addEventListener('input', () => {
    const q = normalize(searchInput.value);
    clearSearchBtn.hidden = q.length === 0;
    if (!q) {
      // show all
      menuLinks.forEach(a => a.closest('li')?.classList.remove('hidden'));
      document.querySelectorAll('.has-sub').forEach(h => h.classList.remove('hidden'));
      return;
    }
    menuLinks.forEach(a => {
      const text = normalize(a.textContent);
      const li = a.closest('li');
      if (text.includes(q)) li?.classList.remove('hidden');
      else li?.classList.add('hidden');
    });
    // hide parent menu if none of its children visible
    document.querySelectorAll('.has-sub').forEach(h => {
      const any = Array.from(h.querySelectorAll('a')).some(a => !a.closest('li')?.classList.contains('hidden'));
      h.classList.toggle('hidden', !any);
    });
  });

  clearSearchBtn?.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.hidden = true;
    searchInput.focus();
    menuLinks.forEach(a => a.closest('li')?.classList.remove('hidden'));
    document.querySelectorAll('.has-sub').forEach(h => h.classList.remove('hidden'));
  });

  /* smooth scroll for anchor links in the menu */
  menuLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href') || '';
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const top = Math.max(target.getBoundingClientRect().top + window.scrollY - 80, 0);
          window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
          // close nav on mobile after selection
          if (isMobile()) closeNav();
        }
      }
    });
  });

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* THEME TOGGLE */
  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.classList.remove('light-mode');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    themeToggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
  }

  themeToggle?.addEventListener('click', () => {
    const current = localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });

  // initialize
  applyTheme(localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark');
  document.querySelectorAll('.submenu').forEach(s => s.setAttribute('aria-hidden', 'true'));
  if (clearSearchBtn) clearSearchBtn.hidden = !searchInput?.value;

  /* Respect reduced motion */
  if (prefersReducedMotion()) document.documentElement.classList.add('reduce-motion');

  // Add active class to current section in viewport
  function setActiveNavItem() {
    const sections = document.querySelectorAll('section, article.panel');
    const navLinks = document.querySelectorAll('.menu a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 100)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveNavItem);

})();