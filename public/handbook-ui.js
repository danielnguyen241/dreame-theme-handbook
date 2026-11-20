'use strict';

function scrollToHandbookSection(target) {
  var toolbar = document.querySelector('.hb-topbar');
  var sticky = document.querySelector('[data-hb-sticky-nav]');
  var afterNav = sticky && (sticky.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING);
  var offset = (toolbar?.offsetHeight || 0) + (afterNav ? sticky.offsetHeight : 0) + 8;
  window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
}

function initHandbook(sections) {
  var isEmbed = new URLSearchParams(location.search).get('embed') === '1';
  if (isEmbed) {
    document.body.classList.add('is-embed');
  }

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

  function formatAspectRatio(dimensions) {
    var parts = dimensions.split(' × ').map(Number);
    var width = parts[0];
    var height = parts[1];
    var a = width;
    var b = height;
    while (b) {
      var remainder = a % b;
      a = b;
      b = remainder;
    }

    var horizontal = width / a;
    var vertical = height / a;
    if (Math.max(horizontal, vertical) <= 21) return horizontal + ':' + vertical;

    return width >= height
      ? '≈' + (width / height).toFixed(2) + ':1'
      : '≈1:' + (height / width).toFixed(2);
  }

  function specLine(label, dimensions, ratio) {
    return '<div class="hb-spec-line"><span>' + label + '</span>' +
      '<div class="hb-spec-value"><strong>' + dimensions + ' px</strong>' +
      '<span class="hb-spec-ratio">' + ratio + '</span></div></div>';
  }

  // Keep the centered compact badges readable on narrow media slots near the viewport edges.
  const compactBadges = new Map();
  function fitCompactBadge(item, box) {
    const rect = item.getBoundingClientRect();
    if (!rect.width) return;
    box.classList.toggle('hb-spec-box--narrow', rect.width >= 48 && rect.width < 152);
    const half = box.offsetWidth / 2;
    const center = rect.left + rect.width / 2;
    const clamped = Math.min(Math.max(center, half + 4), document.documentElement.clientWidth - half - 4);
    box.style.setProperty('--hb-spec-offset', (clamped - center) + 'px');
  }
  const compactObserver = new ResizeObserver((entries) => {
    entries.forEach(({ target }) => fitCompactBadge(target, compactBadges.get(target)));
  });
  const fitAllCompactBadges = () => compactBadges.forEach((box, item) => fitCompactBadge(item, box));
  window.addEventListener('resize', fitAllCompactBadges, { passive: true });
  document.addEventListener('hb-language-change', () => {
    toast.classList.remove('is-visible');
    fitAllCompactBadges();
  });

  function decorateItem(el, { slot, pc, mb, fmt, sm, pcRatio, mbRatio }) {
    if (!el || el.querySelector(':scope > .hb-spec-box')) return;
    if (window.getComputedStyle(el).position === 'static') {
      el.style.position = 'relative';
    }
    el.setAttribute('data-hb-item', '1');
    var box = document.createElement('div');
    box.className = 'hb-spec-box' + (sm ? ' hb-spec-box--sm' : '');
    var desktopRatio = pcRatio || formatAspectRatio(pc);
    var mobileRatio = mbRatio || formatAspectRatio(mb);
    box.title = 'Click to copy US source sizes and aspect ratios';
    box.innerHTML =
      '<div class="hb-spec-slot"><span>' + slot + '</span><span class="hb-spec-fmt">US source' +
      (sm ? '' : ' · ' + fmt) + '</span></div>' +
      specLine('Desktop', pc, desktopRatio) +
      specLine('Mobile', mb, mobileRatio);
    box.addEventListener('click', async function (e) {
      e.stopPropagation();
      const t = handbookLanguage.translate;
      var txt = t(slot) + ' — ' + t('Desktop') + ': ' + pc + ' px (' + desktopRatio + ')' +
        ' | ' + t('Mobile') + ': ' + mb + ' px (' + mobileRatio + ')';
      try {
        await navigator.clipboard.writeText(txt);
        showToast(t('Copied') + ': ' + txt);
      } catch {
        showToast('Could not copy source sizes');
      }
    });
    if (!el.closest('button, a')) {
      box.tabIndex = 0;
      box.setAttribute('role', 'button');
      box.setAttribute('aria-label', 'Copy source sizes for ' + slot);
      box.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        box.click();
      });
    }
    el.appendChild(box);
    if (sm) {
      compactBadges.set(el, box);
      compactObserver.observe(el);
      fitCompactBadge(el, box);
    }
  }

  var jumpSelect = document.getElementById('hb-jump');

  sections.forEach(function (cfg) {
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
      jumpSelect.add(opt, jumpSelect.querySelector('[data-hb-extra]'));
    }

    cfg.specs.forEach(function (sp) {
      if (sp.sel === ':scope') {
        decorateItem(el, sp);
        return;
      }
      el.querySelectorAll(sp.sel).forEach(function (target) {
        decorateItem(target, sp);
      });
    });
  });

  if (isEmbed) {
    window.addEventListener('message', function (ev) {
      if (ev.origin !== location.origin || ev.source !== window.parent) return;
      if (!ev.data || typeof ev.data !== 'object') return;
      if (ev.data.type === 'hb-pin') {
        document.body.classList.toggle('hb-show-all', !!ev.data.on);
      } else if (ev.data.type === 'hb-language') {
        handbookLanguage.set(ev.data.lang);
      } else if (ev.data.type === 'hb-jump' && ev.data.id) {
        var t = document.getElementById(ev.data.id);
        if (t) scrollToHandbookSection(t);
      }
    });
    return;
  }

  var mobileShell = document.getElementById('hb-mobile-shell');
  var mobileIframe = document.getElementById('hb-mobile-iframe');
  var viewportButtons = document.querySelectorAll('[data-vp]');
  var phoneWidth = window.matchMedia('(max-width: 850px)');

  function sendToPreview(message) {
    mobileIframe?.contentWindow?.postMessage(message, location.origin);
  }

  function jumpToSelection() {
    if (!jumpSelect?.value) return;
    if (document.body.classList.contains('hb-vp-mobile')) {
      sendToPreview({ type: 'hb-jump', id: jumpSelect.value });
    } else {
      var target = document.getElementById(jumpSelect.value);
      if (target) scrollToHandbookSection(target);
    }
  }

  document.addEventListener('hb-language-change', function () {
    sendToPreview({ type: 'hb-language', lang: handbookLanguage.current() });
  });

  jumpSelect?.addEventListener('change', jumpToSelection);
  mobileIframe?.addEventListener('load', function () {
    if (!document.body.classList.contains('hb-vp-mobile')) return;
    sendToPreview({ type: 'hb-language', lang: handbookLanguage.current() });
    sendToPreview({ type: 'hb-pin', on: document.body.classList.contains('hb-show-all') });
    jumpToSelection();
  });

  var pinBtn = document.getElementById('hb-pin');
  if (pinBtn) {
    pinBtn.addEventListener('click', function () {
      var on = document.body.classList.toggle('hb-show-all');
      pinBtn.classList.toggle('is-active', on);
      pinBtn.textContent = on ? 'Hide All Sizes' : 'Show All Sizes';
      sendToPreview({ type: 'hb-pin', on: on });
    });
  }

  function switchViewport(isMobile) {
    document.body.classList.toggle('hb-vp-mobile', isMobile);
    if (mobileShell) mobileShell.hidden = !isMobile;
    if (isMobile && mobileIframe && !mobileIframe.hasAttribute('src')) {
      mobileIframe.src = location.pathname + '?embed=1&lang=' + handbookLanguage.current();
    } else {
      jumpToSelection();
    }
    viewportButtons.forEach(function (button) {
      var active = (button.dataset.vp === 'mobile') === isMobile;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  viewportButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      switchViewport(button.dataset.vp === 'mobile');
    });
  });
  phoneWidth.addEventListener('change', function (event) {
    if (event.matches && document.body.classList.contains('hb-vp-mobile')) switchViewport(false);
  });
}
