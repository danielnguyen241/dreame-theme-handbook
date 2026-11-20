
document.addEventListener('click', function(e) {
  var btn = e.target.closest('[data-dpdp-vid-toggle]');
  if (!btn) return;
  var wrap = btn.closest('[data-dpdp-vid-wrap]');
  if (!wrap) return;
  var vids = wrap.querySelectorAll('video');
  var paused = true;
  vids.forEach(function(v) {
    if (v.offsetParent !== null) {
      if (v.paused) { v.play().catch(function(){}); paused = false; }
      else { v.pause(); paused = true; }
    }
  });
  btn.setAttribute('data-paused', paused ? 'true' : 'false');
  btn.innerHTML = paused
    ? '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>'
    : '<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>';
});


// dreame-pdp-album-grid.liquid
(function(){
document.querySelectorAll('[data-dpdp-album]').forEach(function(sec) {
  if (sec.dataset.bound) return;
  sec.dataset.bound = 'true';
  var track = sec.querySelector('[data-album-track]');
  var dots = Array.from(sec.querySelectorAll('[data-album-dot]'));
  if (!track || !dots.length) return;
  var tiles = Array.from(track.children);

  dots.forEach(function(dot, idx) {
    dot.addEventListener('click', function() {
      if (tiles[idx]) {
        track.scrollTo({ left: tiles[idx].offsetLeft - tiles[0].offsetLeft, behavior: 'smooth' });
      }
    });
  });

  track.addEventListener('scroll', function() {
    var center = track.scrollLeft + track.clientWidth / 2;
    var best = 0;
    var minDist = Infinity;
    tiles.forEach(function(t, i) {
      var d = Math.abs((t.offsetLeft - tiles[0].offsetLeft + t.clientWidth / 2) - center);
      if (d < minDist) { minDist = d; best = i; }
    });
    dots.forEach(function(d, i) { d.classList.toggle('is-active', i === best); });
  }, { passive: true });
});
})();

// dreame-pdp-card-row.liquid
(function(){
document.querySelectorAll('[data-dpdp-m14]').forEach(function(sec) {
  if (sec.dataset.bound) return;
  sec.dataset.bound = 'true';
  var track = sec.querySelector('[data-m14-track]');
  var prev = sec.querySelector('[data-m14-prev]');
  var next = sec.querySelector('[data-m14-next]');
  var dots = Array.from(sec.querySelectorAll('[data-m14-dot]'));
  if (!track) return;
  var cards = Array.from(track.children);

  if (sec.classList.contains('dpdp-m14--carousel')) {
    var toggles = cards.map(function(card) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'dpdp-m14__accordion-toggle';
      button.textContent = card.querySelector('.dpdp-m14__card-title').textContent;
      card.prepend(button);
      return button;
    });

    function expand(index) {
      toggles.forEach(function(button, i) {
        var open = i === index;
        button.setAttribute('aria-expanded', String(open));
        cards[i].classList.toggle('is-expanded', open);
      });
    }

    toggles.forEach(function(button, i) {
      button.addEventListener('click', function() {
        expand(button.getAttribute('aria-expanded') === 'true' ? -1 : i);
      });
    });
    expand(0);
  }

  function stepSize() {
    return cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth;
  }

  if (prev) prev.addEventListener('click', function() {
    track.scrollBy({ left: -stepSize(), behavior: 'smooth' });
  });
  if (next) next.addEventListener('click', function() {
    track.scrollBy({ left: stepSize(), behavior: 'smooth' });
  });
  dots.forEach(function(d, idx) {
    d.addEventListener('click', function() {
      if (cards[idx]) track.scrollTo({ left: cards[idx].offsetLeft - cards[0].offsetLeft, behavior: 'smooth' });
    });
  });

  track.addEventListener('scroll', function() {
    if (!dots.length) return;
    var best = 0;
    var minD = Infinity;
    cards.forEach(function(c, i) {
      var dist = Math.abs(c.offsetLeft - cards[0].offsetLeft - track.scrollLeft);
      if (dist < minD) { minD = dist; best = i; }
    });
    dots.forEach(function(d, i) { d.classList.toggle('is-active', i === best); });
  }, { passive: true });
});
})();

// dreame-pdp-feature-slider.liquid
(function(){
document.querySelectorAll('[data-dpdp-m22]').forEach(function(sec) {
  if (sec.dataset.bound) return;
  sec.dataset.bound = 'true';
  var slides = Array.from(sec.querySelectorAll('[data-m22-slide]'));
  var dots = Array.from(sec.querySelectorAll('[data-m22-dot]'));
  var prev = sec.querySelector('[data-m22-prev]');
  var next = sec.querySelector('[data-m22-next]');
  if (slides.length < 2) return;
  var cur = 0;

  function go(idx) {
    cur = Math.max(0, Math.min(slides.length - 1, idx));
    sec.classList.toggle('is-full-bg', cur === 0);
    slides.forEach(function(s, i) { s.classList.toggle('is-active', i === cur); });
    dots.forEach(function(d, i) { d.classList.toggle('is-active', i === cur); });
    if (prev) prev.disabled = cur === 0;
    if (next) next.disabled = cur === slides.length - 1;
  }

  if (prev) prev.addEventListener('click', function() { go(cur - 1); });
  if (next) next.addEventListener('click', function() { go(cur + 1); });
  dots.forEach(function(d, i) { d.addEventListener('click', function() { go(i); }); });
});
})();

// dreame-pdp-intro.liquid
(function(){
document.querySelectorAll('[data-dpdp-intro]').forEach(function(sec) {
  if (sec.dataset.bound) return;
  sec.dataset.bound = 'true';
  var openBtn = sec.querySelector('[data-intro-open]');
  var modal = sec.querySelector('[data-intro-modal]');
  if (!openBtn || !modal) return;
  var vid = modal.querySelector('video');

  openBtn.addEventListener('click', function() {
    modal.hidden = false;
    if (vid) vid.play().catch(function(){});
  });

  modal.querySelectorAll('[data-intro-close]').forEach(function(el) {
    el.addEventListener('click', function() {
      if (vid) vid.pause();
      modal.hidden = true;
    });
  });
});
})();

// dreame-pdp-scroll-text.liquid
(function(){
document.querySelectorAll('[data-dpdp-scroll-text]').forEach(function(sec) {
  if (sec.dataset.bound) return;
  sec.dataset.bound = 'true';
  var el = sec.querySelector('[data-scroll-blur-el]');
  if (!el) return;
  el.classList.add('is-blurred');
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        el.classList.remove('is-blurred');
      }
    });
  }, { threshold: 0.25 });
  io.observe(sec);
});
})();

// dreame-pdp-slide-carousel.liquid
(function(){
document.querySelectorAll('[data-dpdp-m16]').forEach(function(sec) {
  if (sec.dataset.bound) return;
  sec.dataset.bound = 'true';
  var track = sec.querySelector('[data-m16-track]');
  var prev = sec.querySelector('[data-m16-prev]');
  var next = sec.querySelector('[data-m16-next]');
  var dots = Array.from(sec.querySelectorAll('[data-m16-dot]'));
  var count = sec.querySelector('[data-m16-page-count]');
  if (!track) return;
  var slides = Array.from(track.children);

  function step() {
    return slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth;
  }

  if (prev) prev.addEventListener('click', function() { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
  if (next) next.addEventListener('click', function() { track.scrollBy({ left: step(), behavior: 'smooth' }); });
  dots.forEach(function(d, idx) {
    d.addEventListener('click', function() {
      if (slides[idx]) track.scrollTo({ left: slides[idx].offsetLeft - slides[0].offsetLeft, behavior: 'smooth' });
    });
  });

  function updateSlide() {
    var best = 0;
    var minD = Infinity;
    slides.forEach(function(s, i) {
      var dist = Math.abs(s.offsetLeft - slides[0].offsetLeft - track.scrollLeft);
      if (dist < minD) { minD = dist; best = i; }
    });
    dots.forEach(function(d, i) { d.classList.toggle('is-active', i === best); });
    if (prev) prev.disabled = best === 0;
    if (next) next.disabled = best === slides.length - 1;
    if (count) count.textContent = String(best + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
  }

  track.addEventListener('scroll', updateSlide, { passive: true });
  updateSlide();
});
})();

// dreame-pdp-specs.liquid
(function(){
document.querySelectorAll('[data-dpdp-m25]').forEach(function(sec) {
  if (sec.dataset.bound) return;
  sec.dataset.bound = 'true';
  var btn = sec.querySelector('[data-m25-toggle]');
  if (!btn) return;
  var extras = Array.from(sec.querySelectorAll('[data-m25-extra="true"]'));
  var open = false;
  btn.addEventListener('click', function() {
    open = !open;
    extras.forEach(function(el) { el.classList.toggle('is-collapsed', !open); });
    btn.classList.toggle('is-open', open);
    var span = btn.querySelector('span');
    if (span) span.textContent = open ? btn.dataset.lessLabel : btn.dataset.moreLabel;
  });
});
})();

// dreame-pdp-sticky-nav.liquid
(function(){
document.querySelectorAll('[data-dpdp-sticky-nav]').forEach(function(nav) {
  if (nav.dataset.bound) return;
  nav.dataset.bound = 'true';
  var links = Array.from(nav.querySelectorAll('[data-nav-target]'));
  var menu = nav.querySelector('[data-nav-menu]');
  if (menu) {
    menu.addEventListener('click', function() {
      menu.setAttribute('aria-expanded', String(menu.getAttribute('aria-expanded') !== 'true'));
    });
    nav.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
        menu.setAttribute('aria-expanded', 'false');
        menu.focus();
      }
    });
  }
  links.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var id = link.getAttribute('data-nav-target');
      if (!id) return;
      var el = document.getElementById(id) || document.querySelector('[id$="' + id + '"]');
      if (el) {
        e.preventDefault();
        links.forEach(function(l) { l.classList.remove('is-active'); });
        link.classList.add('is-active');
        if (menu) menu.setAttribute('aria-expanded', 'false');
        scrollToHandbookSection(el);
      }
    });
  });

  var targets = links.map(function(l) {
    var id = l.getAttribute('data-nav-target');
    return id ? (document.getElementById(id) || document.querySelector('[id$="' + id + '"]')) : null;
  });

  window.addEventListener('scroll', function() {
    var top = nav.getBoundingClientRect().bottom + 24;
    var activeIdx = 0;
    targets.forEach(function(el, i) {
      if (el && el.getBoundingClientRect().top <= top) activeIdx = i;
    });
    links.forEach(function(l, i) {
      l.classList.toggle('is-active', i === activeIdx);
    });
  }, { passive: true });
});
})();

// dreame-pdp-tabbed-media.liquid
(function(){
document.querySelectorAll('[data-dpdp-m11]').forEach(function(sec) {
  if (sec.dataset.bound) return;
  sec.dataset.bound = 'true';
  var tabs = Array.from(sec.querySelectorAll('[data-m11-tab]'));
  var panels = Array.from(sec.querySelectorAll('[data-m11-panel]'));
  var descs = Array.from(sec.querySelectorAll('[data-m11-desc]'));
  var tabList = sec.querySelector('.dpdp-m11__tabs');
  var stage = sec.querySelector('.dpdp-m11__stage');
  var mobile = window.matchMedia('(max-width: 850px)');
  var active = 0;
  if (!stage || !tabList || !panels.length || !tabs.length) return;

  function select(index) {
    active = index;
    tabs.forEach(function(tab, i) {
      var on = i === index;
      tab.classList.toggle('is-active', on);
      tab.setAttribute('aria-selected', String(on));
    });
    panels.forEach(function(panel, i) {
      panel.classList.toggle('is-active', i === index);
      panel.setAttribute('aria-hidden', String(i !== index));
    });
    descs.forEach(function(desc, i) { desc.classList.toggle('is-active', i === index); });
    if (mobile.matches) {
      tabList.scrollTo({ left: tabs[index].offsetLeft - tabs[0].offsetLeft, behavior: 'smooth' });
    }
  }

  function scrollToPanel(index, behavior) {
    stage.scrollTo({ left: panels[index].offsetLeft - panels[0].offsetLeft, behavior: behavior });
  }

  tabs.forEach(function(tab, idx) {
    tab.addEventListener('click', function() {
      select(idx);
      if (mobile.matches) scrollToPanel(idx, 'smooth');
    });
  });

  stage.addEventListener('scroll', function() {
    if (!mobile.matches) return;
    var step = panels[1] ? panels[1].offsetLeft - panels[0].offsetLeft : stage.clientWidth;
    if (!step) return;
    var index = Math.max(0, Math.min(panels.length - 1, Math.round(stage.scrollLeft / step)));
    if (index !== active) select(index);
  }, { passive: true });

  mobile.addEventListener('change', function() {
    if (mobile.matches) scrollToPanel(active, 'instant');
  });
  select(0);
});
})();

// dreame-pdp-whats-in-box.liquid
(function(){
document.querySelectorAll('[data-dpdp-m24]').forEach(function(sec) {
  if (sec.dataset.bound) return;
  sec.dataset.bound = 'true';
  var btn = sec.querySelector('[data-m24-toggle]');
  if (!btn) return;
  var extras = Array.from(sec.querySelectorAll('[data-m24-extra="true"]'));
  var open = false;
  btn.addEventListener('click', function() {
    open = !open;
    extras.forEach(function(el) { el.classList.toggle('is-collapsed', !open); });
    btn.classList.toggle('is-open', open);
    var span = btn.querySelector('span');
    if (span) span.textContent = open ? btn.dataset.lessLabel : btn.dataset.moreLabel;
  });
});
})();


initHandbook([
    { sel: '#g2-02-gallery', id: 'G2-02', name: 'M02 · Product Gallery', req: true, meta: '2000×2000 / 2000×2000',
      specs: [
        { sel: '.hb-gal-card', slot: 'Gallery image (6 shown)', pc: '2000 × 2000', mb: '2000 × 2000', fmt: 'Image', sm: true }
      ]
    },
    { sel: '.dpdp-sticky-nav-host', id: 'G2-03', name: 'M03 · Sticky Nav', req: true, meta: 'Text Only', specs: [] },
    {
      sel: '.dpdp-hero', id: 'G2-04', name: 'M04 · Hero Banner', req: true, meta: '5120×1680 / 1170×1740',
      specs: [
        { sel: '.dpdp-hero__stage', slot: 'Hero KV', pc: '5120 × 1680', mb: '1170 × 1740', fmt: 'Image' }
      ]
    },
    {
      sel: '.dpdp-intro', id: 'G2-05', name: 'M05 · Intro Video Pill', req: true, meta: 'Cover + video',
      specs: [
        { sel: '.dpdp-intro__pill', slot: 'Pill cover', pc: '790 × 320', mb: '790 × 320', fmt: 'Image' },
        { sel: '.dpdp-intro__modal-dialog', slot: 'Modal video', pc: '1920 × 1080', mb: '1920 × 1080', fmt: 'MP4' }
      ]
    },
    {
      sel: '.dpdp-album', id: 'G2-06', name: 'M06 · Highlight Album Grid', req: true, meta: '8 tiles',
      specs: [
        { sel: '.dpdp-album__tile--1', slot: 'Tile 1', pc: '2247 × 1161', mb: '960 × 960', fmt: 'Image' },
        { sel: '.dpdp-album__tile--2', slot: 'Tile 2', pc: '1302 × 1161', mb: '960 × 960', fmt: 'Image' },
        { sel: '.dpdp-album__tile--3', slot: 'Tile 3', pc: '1184 × 640', mb: '960 × 960', fmt: 'Image' },
        { sel: '.dpdp-album__tile--4', slot: 'Tile 4', pc: '1776 × 960', mb: '960 × 960', fmt: 'Image' },
        { sel: '.dpdp-album__tile--5, .dpdp-album__tile--7, .dpdp-album__tile--8', slot: 'Tiles 5, 7–8', pc: '870 × 960', mb: '960 × 960', fmt: 'Image', sm: true },
        { sel: '.dpdp-album__tile--6', slot: 'Tile 6', pc: '876 × 960', mb: '960 × 960', fmt: 'Image', sm: true }
      ]
    },
    { sel: '.dpdp-scroll-text', id: 'G2-07', name: 'M10 · Scroll Statement', req: false, meta: 'Text Only', specs: [] },
    {
      sel: '.dpdp-m19:not(.dpdp-m19--has-cards)', id: 'G2-08', name: 'M19 · Full-Width + Stat', req: true, meta: '7680×3240 / 1170×1971',
      specs: [
        { sel: '.dpdp-m19__stage', slot: 'Feature banner', pc: '7680 × 3240', mb: '1170 × 1971', fmt: 'Image' }
      ]
    },
    {
      sel: '.dpdp-m19.dpdp-m19--has-cards', id: 'G2-09', name: 'M19 · BG + 2 Sub-Cards', req: false, meta: 'Background + 2 cards',
      specs: [
        { sel: '.dpdp-m19__stage', slot: 'Main background', pc: '5120 × 2504', mb: '1170 × 2958', fmt: 'Image' },
        { sel: '.dpdp-m19__card:nth-child(1)', slot: 'Open spaces', pc: '1752 × 1005', mb: '1026 × 588', fmt: 'Image' },
        { sel: '.dpdp-m19__card:nth-child(2)', slot: 'Low spaces', pc: '1752 × 1005', mb: '1026 × 585', fmt: 'Image' }
      ]
    },
    {
      sel: '.dpdp-m17', id: 'G2-10', name: 'M17 · Title + Image + Stat', req: true, meta: '3600×1800 / 1023×945',
      specs: [
        { sel: '.dpdp-m17__media-frame', slot: 'Feature image', pc: '3600 × 1800', mb: '1023 × 945', fmt: 'Image' }
      ]
    },
    {
      sel: '.dpdp-m22', id: 'G2-11', name: 'M22 · Feature Slider (3 Slides)', req: false, meta: '3 slides + 2 icons',
      specs: [
        { sel: '.dpdp-m22__slide:nth-child(1)', slot: 'Slide 1 background', pc: '5120 × 2160', mb: '776 × 2168', fmt: 'Image' },
        { sel: '.dpdp-m22__slide:nth-child(2), .dpdp-m22__slide:nth-child(3)', slot: 'Slides 2–3', pc: '3600 × 1800', mb: '1028 × 514', fmt: 'Image' },
        { sel: '.dpdp-m22__icon-item:nth-child(1)', slot: 'SideReach icon', pc: '264 × 264', mb: '264 × 264', fmt: 'Image', sm: true },
        { sel: '.dpdp-m22__icon-item:nth-child(2)', slot: 'MopExtend icon', pc: '272 × 248', mb: '272 × 248', fmt: 'Image', sm: true }
      ]
    },
    {
      sel: '.dpdp-m18', id: 'G2-12', name: 'M18 · Full-Width Video', req: false, meta: '2560×1080 / 710×720',
      specs: [
        { sel: '.dpdp-m18__stage', slot: 'Full-width video', pc: '2560 × 1080', mb: '710 × 720', fmt: 'MP4' }
      ]
    },
    {
      sel: '.dpdp-m20', id: 'G2-13', name: 'M20 · Two-Column Grid', req: true, meta: '1 main + 2 cards',
      specs: [
        { sel: '.dpdp-m20__main-card', slot: 'Left main', pc: '2427 × 1800', mb: '1049 × 840', fmt: 'Image' },
        { sel: '.dpdp-m20__card-media:has(img[src*="zero-tangles-hair"])', slot: 'Hair detangling', pc: '1156 × 881', mb: '507 × 534', fmt: 'Image' },
        { sel: '.dpdp-m20__card-media:has(img[src*="zero-tangles-side-brush"])', slot: 'Side brush', pc: '1156 × 881', mb: '513 × 534', fmt: 'Image' }
      ]
    },
    {
      sel: '.dpdp-m21--stats_above_wide', id: 'G2-14', name: 'M21 · Stats + Wide Image', req: true, meta: '3582×1800 / 1050×840',
      specs: [
        { sel: '.dpdp-m21__wide-media', slot: 'Wide image', pc: '3582 × 1800', mb: '1050 × 840', fmt: 'Image' }
      ]
    },
    {
      sel: '.dpdp-m21--image_left', id: 'G2-15', name: 'M21 · Image Left + Icon List', req: false, meta: 'Image + 3 icons',
      specs: [
        { sel: '.dpdp-m21__side-media', slot: 'Left image', pc: '2160 × 1800', mb: '1050 × 840', fmt: 'Image' },
        { sel: '.dpdp-m21__icon-row:nth-child(1)', slot: 'Battery icon', pc: '173 × 97', mb: '173 × 97', fmt: 'Image', sm: true },
        { sel: '.dpdp-m21__icon-row:nth-child(2)', slot: 'Runtime icon', pc: '159 × 159', mb: '159 × 159', fmt: 'Image', sm: true },
        { sel: '.dpdp-m21__icon-row:nth-child(3)', slot: 'Coverage icon', pc: '162 × 158', mb: '162 × 158', fmt: 'Image', sm: true }
      ]
    },
    {
      sel: '.dpdp-m14__chapter', id: 'G2-16', name: 'M18 · Chapter Divider', req: false, meta: '5120×2158 / 1170×1170',
      specs: [
        { sel: ':scope', slot: 'Chapter banner', pc: '5120 × 2158', mb: '1170 × 1170', fmt: 'Image' }
      ]
    },
    {
      sel: '.dpdp-m14--carousel', id: 'G2-17', name: 'M17 · Feature Video Showcase', req: true, meta: '2034×1080 / 596×480',
      specs: [
        { sel: '.dpdp-m14__top-showcase', slot: 'Feature video', pc: '2034 × 1080', mb: '596 × 480', fmt: 'MP4' }
      ]
    },
    {
      sel: '.dpdp-m14--carousel .dpdp-m14__track', id: 'G2-18', name: 'M14 · Feature Cards Carousel (5 Cards)', req: true, meta: '2295×1353 / 1026×840', inlineTag: true,
      specs: [
        { sel: '.dpdp-m14__card-img', slot: 'Card image (×5)', pc: '2295 × 1353', mb: '1026 × 840', fmt: 'Image' }
      ]
    },
    {
      sel: '.dpdp-m16__chapter', id: 'G2-19', name: 'M18 · Lifestyle Divider', req: false, meta: '5120×2160 / 1170×1170',
      specs: [
        { sel: ':scope', slot: 'Lifestyle banner', pc: '5120 × 2160', mb: '1170 × 1170', fmt: 'Image' }
      ]
    },
    {
      sel: '.dpdp-m16', id: 'G2-20', name: 'M16 · Slide Carousel (4 Slides)', req: false, meta: '2400×1440 / 960×840',
      specs: [
        { sel: '.dpdp-m16__media', slot: 'Slide image (×4)', pc: '2400 × 1440', mb: '960 × 840', fmt: 'Image' }
      ]
    },
    {
      sel: '.dpdp-m11', id: 'G2-21', name: 'M11 · Tabbed Media (4 Tabs)', req: false, meta: '3600×1800 / 960×840',
      specs: [
        { sel: '.dpdp-m11__panel', slot: 'Tab image (×4)', pc: '3600 × 1800', mb: '960 × 840', fmt: 'Image' }
      ]
    },
    {
      sel: '.dpdp-m14--grid_3', id: 'G2-22', name: 'M17 · Wide Feature Banner', req: false, meta: '3600×1800 / 1026×1032',
      specs: [
        { sel: '.dpdp-m14__top-showcase', slot: 'Matter banner', pc: '3600 × 1800', mb: '1026 × 1032', fmt: 'Image' }
      ]
    },
    {
      sel: '.dpdp-m14--grid_3 .dpdp-m14__track', id: 'G2-23', name: 'M14 · 3-Column Feature Cards', req: false, meta: '1136×1080 / 1026×1140', inlineTag: true,
      specs: [
        { sel: '.dpdp-m14__card-img', slot: 'Card image (×3)', pc: '1136 × 1080', mb: '1026 × 1140', fmt: 'Image' }
      ]
    },
    {
      sel: '.dpdp-m23', id: 'G2-24', name: 'M23 · Badge Banner', req: false, meta: '3636×1239 / 1026×840',
      specs: [
        { sel: '.dpdp-m23__banner', slot: 'Privacy banner with built-in badge', pc: '3636 × 1239', mb: '1026 × 840', fmt: 'Image' }
      ]
    },
    {
      sel: '.dpdp-m24', id: 'G2-25', name: 'M24 · What’s in the Box', req: true, meta: 'Hero + 15 accessories',
      specs: [
        { sel: '.dpdp-m24__hero-card', slot: 'Box hero', pc: '1088 × 1088', mb: '1088 × 1088', fmt: 'Image' },
        { sel: '.dpdp-m24__item-box:not(:has(img[src*="washboard-filter"]))', slot: 'Accessory (×14)', pc: '600 × 600', mb: '600 × 600', fmt: 'Image', sm: true },
        { sel: '.dpdp-m24__item-box:has(img[src*="washboard-filter"])', slot: 'Washboard filter', pc: '639 × 643', mb: '639 × 643', fmt: 'Image', sm: true }
      ]
    },
    {
      sel: '.dpdp-m25', id: 'G2-26', name: 'M25 · Specifications', req: true, meta: '2712×1348 / 607×898',
      specs: [
        { sel: '.dpdp-m25__diagram', slot: 'Dimension drawing', pc: '2712 × 1348', mb: '607 × 898', fmt: 'Image' }
      ]
    },
    { sel: '.dpdp-m27', id: 'G2-27', name: 'M27 · FAQ Accordion', req: true, meta: 'Text Only', specs: [] },
    { sel: '#g2-28-reviews-auto', id: 'G2-28', name: 'M29 · Customer Reviews (Judge.me)', req: true, meta: 'Auto App', specs: [] },
    { sel: '.dpdp-m28', id: 'G2-29', name: 'M28 · Disclaimers', req: true, meta: 'Text Only', specs: [] }
]);
