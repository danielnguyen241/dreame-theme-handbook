'use strict';

function g3FieldViewport(field) {
  if (field.viewport !== undefined) return field.viewport;
  if (!field.media) return null;
  if (field.label.startsWith('Desktop ')) return 'desktop';
  if (field.label.startsWith('Mobile ')) return 'mobile';
  return null;
}

function createG3FieldPreview(canvas, onInspect, onClose, { previewStylesheet, mountControls } = {}) {
  let frame;
  let previewDocument;
  let viewport = 'desktop';
  let inspectedTarget;
  let pendingField;
  let pendingSection;
  let fields = [];
  const targets = new Map();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let enabledFields = new Set();

  function fit() {
    if (!frame || !canvas.clientWidth || !canvas.clientHeight) return;
    const width = viewport === 'mobile' ? 390 : 1440;
    const scale = Math.min(1, canvas.clientWidth / width);
    frame.style.width = width + 'px';
    frame.style.height = Math.ceil(canvas.clientHeight / scale) + 'px';
    frame.style.left = Math.floor((canvas.clientWidth - width * scale) / 2) + 'px';
    frame.style.transform = 'scale(' + scale + ')';
    previewDocument?.documentElement.style.setProperty('--g3-preview-scale', scale);
  }

  new ResizeObserver(fit).observe(canvas);

  function inspect(target, hover = false) {
    const id = target?.dataset.g3PreviewField;
    if (!enabledFields.has(id)) return;
    if (inspectedTarget !== target) {
      inspectedTarget?.removeAttribute('data-g3-preview-active');
      target.setAttribute('data-g3-preview-active', '');
      inspectedTarget = target;
    }
    onInspect(id, hover);
  }

  function bindTargets() {
    if (!previewDocument) return;

    targets.clear();
    const knownFields = new Set(fields.map(field => field.id));
    const mediaBySlot = new Map(
      fields.filter(field => field.media && (g3FieldViewport(field) ?? viewport) === viewport)
        .flatMap(field => (field.slots ?? [field.media]).map(slot => [slot, field]))
    );
    for (const target of previewDocument.querySelectorAll('[data-g3-media], [data-g3-field]')) {
      const media = mediaBySlot.get(target.dataset.g3Media);
      const id = media?.id ?? target.dataset.g3Field;
      if (!id || !knownFields.has(id)) continue;
      target.dataset.g3PreviewField = id;
      const enabled = enabledFields.has(id);
      target.toggleAttribute('data-g3-preview-enabled', enabled);
      if (!target.matches('button, a, summary')) target.tabIndex = enabled ? 0 : -1;
      if (!targets.has(id)) targets.set(id, []);
      targets.get(id).push(target);
    }
    if (inspectedTarget) inspect(inspectedTarget);
  }

  function reveal(id) {
    if (!previewDocument) {
      pendingField = id;
      return;
    }

    const matches = targets.get(id);
    if (!matches) return;
    const visible = target => target.getBoundingClientRect().width > 1;
    const target = (matches.includes(inspectedTarget) && visible(inspectedTarget) ? inspectedTarget : matches.find(visible))
      ?? matches[0];
    const panel = target.closest('[data-g3-panel][hidden]');
    if (panel) previewDocument.getElementById(panel.getAttribute('aria-labelledby'))?.click();
    const collapsed = target.closest('[hidden][id]');
    if (collapsed) {
      previewDocument.querySelector('[aria-controls="' + collapsed.id + '"]')?.click();
    }
    const details = target.closest('details');
    if (details) details.open = true;
    const nav = target.closest('.g3-nav__links');
    if (nav && !visible(target)) nav.previousElementSibling.click();
    target.scrollIntoView({
      block: 'center',
      inline: 'nearest',
      behavior: reducedMotion.matches ? 'instant' : 'smooth',
    });
    inspect(target);
  }

  function sectionEvent(root, action) {
    root.dispatchEvent(new previewDocument.defaultView.CustomEvent('shopify:section:' + action, { bubbles: true }));
  }

  function unmountSection() {
    const root = previewDocument?.body.firstElementChild;
    if (!root) return;
    sectionEvent(root, 'unload');
    root.querySelectorAll('[data-g3-video]').forEach(video => {
      video.pause();
      video.removeAttribute('src');
      video.load();
    });
  }

  function renderSection() {
    if (!pendingSection || !previewDocument) return;
    const template = document.createElement('template');
    template.innerHTML = pendingSection.markup;
    pendingSection = null;
    const root = template.content.firstElementChild;
    handbookLanguage.localize(root);
    root.querySelectorAll('[data-g3-story]').forEach(story => story.removeAttribute('data-g3-story'));
    root.querySelectorAll('img[loading="eager"]').forEach(image => { image.loading = 'lazy'; });
    for (const link of root.querySelectorAll('a[href^="https://"]')) {
      link.target = '_blank';
      link.rel = 'noopener';
    }

    // Keep navigation labels visible even when their destination sections are not mounted.
    const navAnchors = Array.from(root.querySelectorAll('.g3-nav__links a'), link => {
      const anchor = previewDocument.createElement('span');
      anchor.id = link.getAttribute('href').slice(1);
      anchor.hidden = true;
      return anchor;
    });

    unmountSection();
    previewDocument.documentElement.lang = handbookLanguage.current();
    previewDocument.body.replaceChildren(root, ...navAnchors);
    previewDocument.defaultView.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    sectionEvent(previewDocument.body, 'load');
    mountControls?.(root);
    bindTargets();
    if (pendingField) {
      reveal(pendingField);
      pendingField = null;
    }
  }

  function mount(section, nextFields) {
    pendingSection = section;
    pendingField = null;
    inspectedTarget = null;
    fields = nextFields;
    if (frame) {
      renderSection();
      return;
    }

    frame = document.createElement('iframe');
    frame.title = 'Section preview';
    frame.className = 'g3-fields__frame';
    frame.srcdoc = [
      '<!doctype html><html><head><meta charset="utf-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1">',
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">',
      '<link rel="stylesheet" href="/g3/dreame-g3.css">',
      '<link rel="stylesheet" href="/handbook-ui.css">',
      '<link rel="stylesheet" href="/g3/guide.css">',
      previewStylesheet ? '<link rel="stylesheet" href="' + previewStylesheet + '">' : '',
      '<script src="/g3/dreame-g3.js" defer></script></head>',
      '<body class="g3-field-preview"></body></html>',
    ].join('');
    frame.addEventListener('load', () => {
      if (!frame.contentDocument?.body.classList.contains('g3-field-preview')) return;
      previewDocument = frame.contentDocument;
      fit();

      const targetFor = event => event.target.closest?.('[data-g3-preview-field]');
      previewDocument.addEventListener('pointerover', event => {
        if (event.pointerType !== 'touch') inspect(targetFor(event), true);
      });
      previewDocument.addEventListener('focusin', event => inspect(targetFor(event)));
      previewDocument.addEventListener('click', event => {
        if (event.target.closest?.('a[href^="#"]')) {
          event.preventDefault();
          event.stopPropagation();
        }
        inspect(targetFor(event));
      }, { capture: true });
      previewDocument.addEventListener('keydown', event => {
        if (event.key === 'Escape') onClose();
      });
      renderSection();
    });
    canvas.append(frame);
    fit();
  }

  function setViewport(next) {
    if (viewport === next) return;
    viewport = next;
    fit();
    bindTargets();
  }

  function setFields(ids) {
    enabledFields = ids;
    inspectedTarget?.removeAttribute('data-g3-preview-active');
    inspectedTarget = null;
    bindTargets();
  }

  function clear() {
    unmountSection();
    previewDocument?.body.replaceChildren();
    inspectedTarget = null;
    pendingSection = null;
    pendingField = null;
    targets.clear();
  }

  return { mount, setViewport, setFields, reveal, clear };
}
