
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
        track.scrollTo({ left: tiles[idx].offsetLeft - 16, behavior: 'smooth' });
      }
    });
  });

  track.addEventListener('scroll', function() {
    var center = track.scrollLeft + track.clientWidth / 2;
    var best = 0;
    var minDist = Infinity;
    tiles.forEach(function(t, i) {
      var d = Math.abs((t.offsetLeft + t.clientWidth / 2) - center);
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

  function stepSize() {
    return cards[0] ? cards[0].clientWidth + 20 : 380;
  }

  if (prev) prev.addEventListener('click', function() {
    track.scrollBy({ left: -stepSize(), behavior: 'smooth' });
  });
  if (next) next.addEventListener('click', function() {
    track.scrollBy({ left: stepSize(), behavior: 'smooth' });
  });
  dots.forEach(function(d, idx) {
    d.addEventListener('click', function() {
      if (cards[idx]) track.scrollTo({ left: cards[idx].offsetLeft, behavior: 'smooth' });
    });
  });

  track.addEventListener('scroll', function() {
    if (!dots.length) return;
    var best = 0;
    var minD = Infinity;
    cards.forEach(function(c, i) {
      var dist = Math.abs(c.offsetLeft - track.scrollLeft);
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
  if (!track) return;
  var slides = Array.from(track.children);

  function step() {
    return slides[0] ? slides[0].clientWidth + 20 : 500;
  }

  if (prev) prev.addEventListener('click', function() { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
  if (next) next.addEventListener('click', function() { track.scrollBy({ left: step(), behavior: 'smooth' }); });
  dots.forEach(function(d, idx) {
    d.addEventListener('click', function() {
      if (slides[idx]) track.scrollTo({ left: slides[idx].offsetLeft, behavior: 'smooth' });
    });
  });

  track.addEventListener('scroll', function() {
    var best = 0;
    var minD = Infinity;
    slides.forEach(function(s, i) {
      var dist = Math.abs(s.offsetLeft - track.scrollLeft);
      if (dist < minD) { minD = dist; best = i; }
    });
    dots.forEach(function(d, i) { d.classList.toggle('is-active', i === best); });
  }, { passive: true });
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
  links.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var id = link.getAttribute('data-nav-target');
      if (!id) return;
      var el = document.getElementById(id) || document.querySelector('[id$="' + id + '"]');
      if (el) {
        e.preventDefault();
        links.forEach(function(l) { l.classList.remove('is-active'); });
        link.classList.add('is-active');
        var y = el.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  var targets = links.map(function(l) {
    var id = l.getAttribute('data-nav-target');
    return id ? (document.getElementById(id) || document.querySelector('[id$="' + id + '"]')) : null;
  });

  window.addEventListener('scroll', function() {
    var scrollPos = window.scrollY + 140;
    var activeIdx = 0;
    targets.forEach(function(el, i) {
      if (el && el.offsetTop <= scrollPos) activeIdx = i;
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

  tabs.forEach(function(tab, idx) {
    tab.addEventListener('click', function() {
      tabs.forEach(function(t, i) {
        var on = i === idx;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      panels.forEach(function(p, i) { p.classList.toggle('is-active', i === idx); });
      descs.forEach(function(d, i) { d.classList.toggle('is-active', i === idx); });
    });
  });
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


'use strict';

(function () {
  var isEmbed = location.search.indexOf('embed=1') !== -1;
  if (isEmbed) {
    document.body.classList.add('is-embed');
  }

  var SECTIONS = [
    { sel: '#g2-02-gallery-demo', id: 'G2-02', name: 'M02 · Product Gallery', req: true, meta: '13 Images · 1600×1600', specs: [] },
    { sel: '.dpdp-sticky-nav-host', id: 'G2-03', name: 'M03 · Sticky Nav', req: true, meta: 'Text Only', specs: [] },
    {
      sel: '.dpdp-hero', id: 'G2-04', name: 'M04 · Hero Banner', req: true, meta: 'Desktop 1920×630 · Mobile 1080×1350',
      specs: [{ sel: '.dpdp-hero__stage', slot: 'Hero KV', pc: '1920 × 630', mb: '1080 × 1350', fmt: 'JPG/WebP' }]
    },
    {
      sel: '.dpdp-intro', id: 'G2-05', name: 'M05 · Intro Video Pill', req: true, meta: 'Video 1920×1080 · Pill 790×320',
      specs: [{ sel: '.dpdp-intro__pill', slot: 'Video Pill + Modal MP4', pc: '1920 × 1080 (Pill 790×320)', mb: '1920 × 1080', fmt: 'MP4 <8MB' }]
    },
    {
      sel: '.dpdp-album', id: 'G2-06', name: 'M06 · Highlight Album Grid', req: true, meta: '8 Tiles · Mobile 960×960',
      specs: [
        { sel: '.dpdp-album__tile--1', slot: 'Tile 1 (Wide)', pc: '1216 × 626', mb: '960 × 960', fmt: '1.94:1' },
        { sel: '.dpdp-album__tile--2', slot: 'Tile 2', pc: '718 × 640', mb: '960 × 960', fmt: '1.12:1' },
        { sel: '.dpdp-album__tile--3, .dpdp-album__tile--4', slot: 'Tile 3–4', pc: '968 × 698', mb: '960 × 960', fmt: '1.39:1' },
        { sel: '.dpdp-album__tile--5, .dpdp-album__tile--6, .dpdp-album__tile--7, .dpdp-album__tile--8', slot: 'Tile 5–8', pc: '940 × 1040', mb: '960 × 960', fmt: '0.9:1', sm: true }
      ]
    },
    { sel: '.dpdp-scroll-text', id: 'G2-07', name: 'M10 · Scroll Statement', req: false, meta: 'Text Only', specs: [] },
    {
      sel: '.dpdp-m19:not(.dpdp-m19--has-cards)', id: 'G2-08', name: 'M19 · Full-Width + Stat', req: true, meta: 'Desktop 1920×810 · Mobile 1170×1971',
      specs: [{ sel: '.dpdp-m19__stage', slot: 'Feature Banner', pc: '1920 × 810', mb: '1170 × 1971', fmt: '2.37:1' }]
    },
    {
      sel: '.dpdp-m19.dpdp-m19--has-cards', id: 'G2-09', name: 'M19 · BG + 2 Sub-Cards', req: false, meta: '1 BG + 2 Cards',
      specs: [
        { sel: '.dpdp-m19__stage', slot: 'Main BG', pc: '2400 × 1174', mb: '1170 × 2958', fmt: '2:1' },
        { sel: '.dpdp-m19__card', slot: 'Sub Card', pc: '1400 × 803', mb: '1026 × 588', fmt: '1.74:1' }
      ]
    },
    {
      sel: '.dpdp-m17', id: 'G2-10', name: 'M17 · Title + Image + Stat', req: true, meta: 'Desktop 1960×980 · Mobile 1023×945',
      specs: [{ sel: '.dpdp-m17__media-frame', slot: 'Feature Image', pc: '1960 × 980', mb: '1023 × 945', fmt: '2:1' }]
    },
    {
      sel: '.dpdp-m22', id: 'G2-11', name: 'M22 · Feature Slider (3 Slides)', req: false, meta: '3 Slides + 2 Icons',
      specs: [
        { sel: '.dpdp-m22__slide:nth-child(1)', slot: 'Slide 1 Full BG (+ Icon 64×64)', pc: '1920 × 1080', mb: '776 × 2168', fmt: '16:9' },
        { sel: '.dpdp-m22__slide:nth-child(2), .dpdp-m22__slide:nth-child(3)', slot: 'Slide 2–3 Card', pc: '1920 × 960', mb: '1028 × 514', fmt: '2:1' }
      ]
    },
    {
      sel: '.dpdp-m18', id: 'G2-12', name: 'M18 · Full-Width Video', req: false, meta: 'Desktop 2560×1080 · Mobile 720×720',
      specs: [{ sel: '.dpdp-m18__stage', slot: 'FW Video', pc: '2560 × 1080', mb: '720 × 720', fmt: 'MP4 <10MB' }]
    },
    {
      sel: '.dpdp-m20', id: 'G2-13', name: 'M20 · Two-Column Grid', req: true, meta: '1 Left + 2 Right Cards',
      specs: [
        { sel: '.dpdp-m20__main-card', slot: 'Left Main', pc: '1600 × 1187', mb: '1049 × 840', fmt: '1.35:1' },
        { sel: '.dpdp-m20__card-media', slot: 'Right Card', pc: '1156 × 881', mb: '510 × 534', fmt: '1.31:1' }
      ]
    },
    {
      sel: '.dpdp-m21--stats_above_wide', id: 'G2-14', name: 'M21 · Stats + Wide Image', req: true, meta: 'Desktop 1920×965 · Mobile 900×720',
      specs: [{ sel: '.dpdp-m21__wide-media', slot: 'Wide Image', pc: '1920 × 965', mb: '900 × 720', fmt: '2:1' }]
    },
    {
      sel: '.dpdp-m21--image_left', id: 'G2-15', name: 'M21 · Image Left + Icon List', req: false, meta: 'Desktop 1920×1600 + 3 SVG (64×64)',
      specs: [{ sel: '.dpdp-m21__side-media', slot: 'Left Image (+ Icon 64×64)', pc: '1920 × 1600', mb: '900 × 720', fmt: '1.2:1' }]
    },
    {
      sel: '.dpdp-m14__chapter', id: 'G2-16', name: 'M18 · Chapter Divider', req: false, meta: 'Desktop 1920×810 · Mobile 1170×1170',
      specs: [{ sel: ':scope', slot: 'Chapter Banner', pc: '1920 × 810', mb: '1170 × 1170', fmt: '2.37:1' }]
    },
    {
      sel: '.dpdp-m14--carousel', id: 'G2-17', name: 'M17 · Feature Video Showcase', req: true, meta: 'Desktop 2034×1080 · Mobile 596×480',
      specs: [{ sel: '.dpdp-m14__top-showcase', slot: 'Feature Video', pc: '2034 × 1080', mb: '596 × 480', fmt: 'MP4 <10MB' }]
    },
    {
      sel: '.dpdp-m14--carousel .dpdp-m14__track', id: 'G2-18', name: 'M14 · Feature Cards Carousel (5 Cards)', req: true, meta: 'Desktop 2295×1353 · Mobile 1026×840', inlineTag: true,
      specs: [{ sel: '.dpdp-m14__card-img', slot: 'Carousel Card', pc: '2295 × 1353', mb: '1026 × 840', fmt: '1.7:1' }]
    },
    {
      sel: '.dpdp-m16__chapter', id: 'G2-19', name: 'M18 · Lifestyle Divider', req: false, meta: 'Desktop 1920×810 · Mobile 1170×1170',
      specs: [{ sel: ':scope', slot: 'Lifestyle Banner', pc: '1920 × 810', mb: '1170 × 1170', fmt: '2.37:1' }]
    },
    {
      sel: '.dpdp-m16', id: 'G2-20', name: 'M16 · Slide Carousel (4 Slides)', req: false, meta: 'Desktop 2400×1440 · Mobile 960×840',
      specs: [{ sel: '.dpdp-m16__media', slot: 'Carousel Slide', pc: '2400 × 1440', mb: '960 × 840', fmt: '5:3' }]
    },
    {
      sel: '.dpdp-m11', id: 'G2-21', name: 'M11 · Tabbed Media (4 Tabs)', req: false, meta: 'Desktop 3600×1800 · Mobile 960×840',
      specs: [{ sel: '.dpdp-m11__stage', slot: 'Tab Image (×4)', pc: '3600 × 1800', mb: '960 × 840', fmt: '2:1' }]
    },
    {
      sel: '.dpdp-m14--grid_3', id: 'G2-22', name: 'M17 · Wide Feature Banner', req: false, meta: 'Desktop 2400×1200 · Mobile 1026×1032',
      specs: [{ sel: '.dpdp-m14__top-showcase', slot: 'Wide Banner', pc: '2400 × 1200', mb: '1026 × 1032', fmt: '2:1' }]
    },
    {
      sel: '.dpdp-m14--grid_3 .dpdp-m14__track', id: 'G2-23', name: 'M14 · 3-Column Feature Cards', req: false, meta: 'Desktop 800×760 · Mobile 1026×1140', inlineTag: true,
      specs: [{ sel: '.dpdp-m14__card-img', slot: 'Feature Card', pc: '800 × 760', mb: '1026 × 1140', fmt: '~1:1' }]
    },
    {
      sel: '.dpdp-m23', id: 'G2-24', name: 'M23 · Badge Banner', req: false, meta: 'Desktop 2400×818 · Mobile 1026×840',
      specs: [{ sel: '.dpdp-m23__banner', slot: 'Banner (+ Badge 200×200)', pc: '2400 × 818', mb: '1026 × 840', fmt: '2.93:1' }]
    },
    {
      sel: '.dpdp-m24', id: 'G2-25', name: 'M24 · What’s in the Box', req: true, meta: 'Hero 1000×1000 · Item 600×600',
      specs: [
        { sel: '.dpdp-m24__hero-card', slot: 'Box Hero', pc: '1000 × 1000', mb: '1000 × 1000', fmt: '1:1 PNG/JPG' },
        { sel: '.dpdp-m24__item-box', slot: 'Accessory', pc: '600 × 600', mb: '600 × 600', fmt: '1:1', sm: true }
      ]
    },
    {
      sel: '.dpdp-m25', id: 'G2-26', name: 'M25 · Specifications', req: true, meta: 'Diagram 2712×1348 · Mobile 607×898',
      specs: [{ sel: '.dpdp-m25__diagram', slot: 'Dimension Drawing (mm)', pc: '2712 × 1348', mb: '607 × 898', fmt: '2:1 PNG' }]
    },
    { sel: '.dpdp-m27', id: 'G2-27', name: 'M27 · FAQ Accordion', req: true, meta: 'Text Only', specs: [] },
    { sel: '#g2-28-reviews-auto', id: 'G2-28', name: 'M29 · Customer Reviews (Judge.me)', req: true, meta: 'Auto App', specs: [] },
    { sel: '.dpdp-m28', id: 'G2-29', name: 'M28 · Disclaimers', req: true, meta: 'Text Only', specs: [] }
  ];

  // Ensure toast element exists
  var toast = document.getElementById('hb-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'hb-toast';
    toast.className = 'hb-toast';
    document.body.appendChild(toast);
  }
  var toastTimer = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 1600);
  }

  function decorateItem(el, slot, pc, mb, fmt, sm) {
    if (!el || el.querySelector(':scope > .hb-spec-box')) return;
    if (window.getComputedStyle(el).position === 'static') {
      el.style.position = 'relative';
    }
    el.setAttribute('data-hb-item', '1');
    var box = document.createElement('div');
    box.className = 'hb-spec-box' + (sm ? ' hb-spec-box--sm' : '');
    box.title = 'Click to copy size';
    box.innerHTML =
      '<div class="hb-spec-slot"><span>' + slot + '</span>' + (sm ? '' : '<span class="hb-spec-fmt">' + (fmt || '') + '</span>') + '</div>' +
      '<div class="hb-spec-line"><span>Desktop</span><strong>' + pc + ' px</strong></div>' +
      '<div class="hb-spec-line"><span>Mobile</span><strong>' + mb + ' px</strong></div>';
    box.addEventListener('click', function (e) {
      e.stopPropagation();
      var txt = slot + ' — Desktop: ' + pc + ' px | Mobile: ' + mb + ' px';
      if (navigator.clipboard) navigator.clipboard.writeText(txt);
      showToast('Copied: ' + txt);
    });
    el.appendChild(box);
  }

  // Decorate pre-tagged gallery items (compact cards)
  document.querySelectorAll('[data-hb-item][data-pc]').forEach(function (el) {
    decorateItem(el, el.dataset.slot, el.dataset.pc, el.dataset.mb, el.dataset.fmt, true);
  });

  var jumpSelect = document.getElementById('hb-jump');

  SECTIONS.forEach(function (cfg) {
    var el = document.querySelector(cfg.sel);
    if (!el) return;

    var tagId = 'sec-' + cfg.id.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    var tag = document.createElement('div');
    tag.className = 'hb-sec-tag' + (cfg.inlineTag ? ' hb-sec-tag--inline' : '');
    tag.id = tagId;
    tag.innerHTML =
      '<div class="hb-sec-tag__inner">' +
        '<div class="hb-sec-tag__left">' +
          '<span class="hb-sec-id">' + cfg.id + '</span>' +
          '<span class="hb-sec-title">' + cfg.name + '</span>' +
        '</div>' +
        '<div class="hb-sec-tag__right">' +
          '<span class="hb-pill-meta">' + cfg.meta + '</span>' +
          '<span class="hb-pill-req ' + (cfg.req ? '' : 'is-opt') + '">' + (cfg.req ? 'Keep' : 'Optional') + '</span>' +
        '</div>' +
      '</div>';

    el.parentNode.insertBefore(tag, el);

    if (jumpSelect && !isEmbed) {
      var opt = document.createElement('option');
      opt.value = tagId;
      opt.textContent = cfg.id + ' · ' + cfg.name;
      jumpSelect.appendChild(opt);
    }

    cfg.specs.forEach(function (sp) {
      if (sp.sel === ':scope') {
        decorateItem(el, sp.slot, sp.pc, sp.mb, sp.fmt, sp.sm);
        return;
      }
      el.querySelectorAll(sp.sel).forEach(function (target) {
        decorateItem(target, sp.slot, sp.pc, sp.mb, sp.fmt, sp.sm);
      });
    });
  });

  if (isEmbed) {
    window.addEventListener('message', function (ev) {
      if (!ev.data || typeof ev.data !== 'object') return;
      if (ev.data.type === 'hb-pin') {
        document.body.classList.toggle('hb-show-all', !!ev.data.on);
      } else if (ev.data.type === 'hb-jump' && ev.data.id) {
        var t = document.getElementById(ev.data.id);
        if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 8, behavior: 'smooth' });
      }
    });
    return;
  }

  var mobileShell = document.getElementById('hb-mobile-shell');
  var mobileIframe = document.getElementById('hb-mobile-iframe');

  if (jumpSelect) {
    jumpSelect.addEventListener('change', function () {
      if (!jumpSelect.value) return;
      if (document.body.classList.contains('hb-vp-mobile') && mobileIframe && mobileIframe.contentWindow) {
        mobileIframe.contentWindow.postMessage({ type: 'hb-jump', id: jumpSelect.value }, '*');
      } else {
        var t = document.getElementById(jumpSelect.value);
        if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 52, behavior: 'smooth' });
      }
    });
  }

  var pinBtn = document.getElementById('hb-pin');
  if (pinBtn) {
    pinBtn.addEventListener('click', function () {
      var on = document.body.classList.toggle('hb-show-all');
      pinBtn.classList.toggle('is-active', on);
      pinBtn.textContent = on ? 'Hide All Sizes' : 'Show All Sizes';
      if (mobileIframe && mobileIframe.contentWindow) {
        mobileIframe.contentWindow.postMessage({ type: 'hb-pin', on: on }, '*');
      }
    });
  }

  document.querySelectorAll('[data-vp]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var isMob = btn.getAttribute('data-vp') === 'mobile';
      document.body.classList.toggle('hb-vp-mobile', isMob);
      if (mobileShell) mobileShell.hidden = !isMob;
      if (isMob && mobileIframe && !mobileIframe.getAttribute('src')) {
        mobileIframe.setAttribute('src', '/?embed=1');
        mobileIframe.addEventListener('load', function () {
          if (document.body.classList.contains('hb-show-all') && mobileIframe.contentWindow) {
            mobileIframe.contentWindow.postMessage({ type: 'hb-pin', on: true }, '*');
          }
        }, { once: true });
      }
      document.querySelectorAll('[data-vp]').forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
      });
    });
  });
})();
