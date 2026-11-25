(() => {
  const phone = window.matchMedia('(max-width: 850px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scrollStory = window.matchMedia('(min-width: 851px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)');
  const initialized = new WeakSet();
  const activeVideos = new Set();
  const storySwitchers = new Map();

  function playVideo(video) {
    const src = phone.matches ? video.dataset.mobile : video.dataset.desktop;
    if (video.getAttribute('src') !== src) video.setAttribute('src', src);
    if (!reducedMotion.matches && video.dataset.userPaused !== 'true') {
      video.play().catch(() => {});
    }
  }

  function pauseVideo(video) {
    if (video.paused) return;
    video.dataset.autoPaused = 'true';
    video.pause();
  }

  function updatePoster(video) {
    const poster = phone.matches ? video.dataset.posterMobile : video.dataset.posterDesktop;
    if (poster) video.poster = poster;
  }

  const videoObserver = new IntersectionObserver((entries) => {
    for (const { target: video, isIntersecting, intersectionRatio } of entries) {
      if (!video.isConnected) continue;
      if (isIntersecting && intersectionRatio >= 0.15) {
        activeVideos.add(video);
        playVideo(video);
      } else {
        activeVideos.delete(video);
        pauseVideo(video);
      }
    }
  }, { threshold: 0.15 });

  function initVideo(video) {
    updatePoster(video);
    video.addEventListener('pause', () => {
      if (video.dataset.autoPaused === 'true') {
        delete video.dataset.autoPaused;
      } else if (activeVideos.has(video)) {
        video.dataset.userPaused = 'true';
      }
    });
    video.addEventListener('play', () => {
      delete video.dataset.userPaused;
    });
    videoObserver.observe(video);
  }

  function initNavigation(nav) {
    const toggle = nav.querySelector('[data-g3-nav-toggle]');
    const close = () => toggle.setAttribute('aria-expanded', 'false');

    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) close();
    });
    nav.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        close();
        toggle.focus();
      }
    });
  }

  function initSwitcher(switcher) {
    const tabs = Array.from(switcher.querySelectorAll('[data-g3-tab]'));
    const panels = Array.from(switcher.querySelectorAll('[data-g3-panel]'));
    const story = switcher.closest('[data-g3-story]');
    let active = 0;

    function select(index, { focus = false, seek = false } = {}) {
      active = (index + tabs.length) % tabs.length;
      tabs.forEach((tab, position) => {
        const selected = position === active;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        panels[position].hidden = !selected;
      });
      if (focus) tabs[active].focus({ preventScroll: true });
      if (seek && story && scrollStory.matches) {
        const distance = story.offsetHeight - switcher.offsetHeight;
        const step = distance / tabs.length;
        const stickyTop = parseFloat(getComputedStyle(story.firstElementChild).top) || 0;
        window.scrollBy({
          top: story.getBoundingClientRect().top - stickyTop + step * (active + 0.25),
          behavior: 'instant'
        });
      }
    }

    if (story) storySwitchers.set(story, { select, count: tabs.length, switcher });
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => select(index, { seek: true }));
      tab.addEventListener('keydown', (event) => {
        const steps = { ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1 };
        let next = index;
        if (event.key in steps) next += steps[event.key];
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else return;
        event.preventDefault();
        select(next, { focus: true, seek: true });
      });
    });

    switcher.querySelector('[data-g3-tab-prev]')?.addEventListener('click', () => select(active - 1, { seek: true }));
    switcher.querySelector('[data-g3-tab-next]')?.addEventListener('click', () => select(active + 1, { seek: true }));

    let start;
    const stage = switcher.querySelector('.g3-switcher__panels');
    stage.addEventListener('touchstart', (event) => {
      if (event.touches.length !== 1 || event.target.closest('button, a')) return;
      const { clientX, clientY } = event.touches[0];
      start = { x: clientX, y: clientY };
    }, { passive: true });
    stage.addEventListener('touchend', (event) => {
      if (!start) return;
      const { clientX, clientY } = event.changedTouches[0];
      const deltaX = clientX - start.x;
      const deltaY = clientY - start.y;
      start = null;
      if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
        select(active + (deltaX < 0 ? 1 : -1));
      }
    }, { passive: true });
    stage.addEventListener('touchcancel', () => { start = null; }, { passive: true });
  }

  function initScrollGroup(group) {
    const track = group.querySelector('[data-g3-track]');
    const scroll = (direction) => track.scrollBy({
      left: direction * track.clientWidth,
      behavior: reducedMotion.matches ? 'instant' : 'smooth'
    });
    group.querySelector('[data-g3-previous]').addEventListener('click', () => scroll(-1));
    group.querySelector('[data-g3-next]').addEventListener('click', () => scroll(1));
  }

  function init(root) {
    for (const [selector, initElement] of [
      ['[data-g3-nav]', initNavigation],
      ['[data-g3-switcher]', initSwitcher],
      ['[data-g3-scroll]', initScrollGroup],
      ['[data-g3-video]', initVideo]
    ]) {
      root.querySelectorAll(selector).forEach((element) => {
        if (initialized.has(element)) return;
        initialized.add(element);
        initElement(element);
      });
    }
    scheduleMeasure();
  }

  let measureQueued = false;
  const header = document.querySelector('sticky-header header, .section-header header, [data-g3-handbook-bar]');
  let lastTop = -1;
  let lastHeight = -1;

  function measure() {
    measureQueued = false;
    const nav = document.querySelector('[data-g3-nav]');
    const navHeight = nav?.offsetHeight || 0;
    const headerTop = header ? Math.max(0, Math.round(header.getBoundingClientRect().bottom)) : 0;
    if (headerTop !== lastTop) {
      document.documentElement.style.setProperty('--g3-nav-top', headerTop + 'px');
      lastTop = headerTop;
    }
    if (navHeight !== lastHeight) {
      document.documentElement.style.setProperty('--g3-nav-height', navHeight + 'px');
      lastHeight = navHeight;
    }
    nav?.querySelectorAll('.g3-nav__links a').forEach((link) => {
      link.hidden = !document.getElementById(link.hash.slice(1));
    });

    if (!scrollStory.matches) return;
    storySwitchers.forEach(({ select, count, switcher }, story) => {
      const stickyTop = headerTop + navHeight + 18;
      const remaining = story.offsetHeight - switcher.offsetHeight;
      const progress = (stickyTop - story.getBoundingClientRect().top) / remaining;
      if (progress >= 0 && progress <= 1) {
        const next = Math.min(count - 1, Math.floor(count * progress));
        if (switcher.querySelectorAll('[data-g3-tab]')[next].getAttribute('aria-selected') === 'false') select(next);
      }
    });
  }

  function scheduleMeasure() {
    if (measureQueued) return;
    measureQueued = true;
    requestAnimationFrame(measure);
  }

  window.addEventListener('scroll', scheduleMeasure, { passive: true });
  window.addEventListener('resize', scheduleMeasure, { passive: true });
  header?.addEventListener('transitionend', scheduleMeasure);
  if (header) new ResizeObserver(scheduleMeasure).observe(header);
  phone.addEventListener('change', () => {
    document.querySelectorAll('[data-g3-video][data-poster-desktop]').forEach(updatePoster);
    activeVideos.forEach(playVideo);
  });
  reducedMotion.addEventListener('change', () => activeVideos.forEach(reducedMotion.matches ? pauseVideo : playVideo));
  document.addEventListener('shopify:section:load', (event) => init(event.target));
  document.addEventListener('shopify:section:unload', (event) => {
    event.target.querySelectorAll('[data-g3-video]').forEach((video) => {
      activeVideos.delete(video);
      videoObserver.unobserve(video);
    });
    event.target.querySelectorAll('[data-g3-story]').forEach((story) => storySwitchers.delete(story));
  });
  init(document);
})();
