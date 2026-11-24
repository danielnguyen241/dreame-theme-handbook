'use strict';

function g3FieldViewport(field) {
  if (!field.media) return null;
  if (field.label.startsWith('Desktop ')) return 'desktop';
  if (field.label.startsWith('Mobile ')) return 'mobile';
  return null;
}

function createG3FieldPreview(canvas, onInspect, onClose) {
  let frame;
  let previewDocument;
  let viewport = 'desktop';
  let inspectedTarget;
  let pendingField;
  let fields = [];
  const targets = new Map();

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

  function inspect(target) {
    const id = target?.dataset.g3PreviewField;
    if (!id) return;
    if (inspectedTarget !== target) {
      inspectedTarget?.removeAttribute('data-g3-preview-active');
      target.setAttribute('data-g3-preview-active', '');
      inspectedTarget = target;
    }
    onInspect(id);
  }

  function bindTargets() {
    if (!previewDocument) return;

    targets.clear();
    const knownFields = new Set(fields.map(field => field.id));
    const mediaBySlot = new Map(
      fields.filter(field => field.media && (g3FieldViewport(field) ?? viewport) === viewport)
        .map(field => [field.media, field])
    );
    for (const target of previewDocument.querySelectorAll('[data-g3-media], [data-g3-field]')) {
      const media = mediaBySlot.get(target.dataset.g3Media);
      const id = media?.id ?? target.dataset.g3Field;
      if (!id || !knownFields.has(id)) continue;
      target.dataset.g3PreviewField = id;
      if (!target.matches('button, a, summary')) target.tabIndex = 0;
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
    const details = target.closest('details');
    if (details) details.open = true;
    const nav = target.closest('.g3-nav__links');
    if (nav && !visible(target)) nav.previousElementSibling.click();
    target.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' });
    inspect(target);
  }

  function mount(section, nextFields) {
    clear();
    fields = nextFields;
    const template = document.createElement('template');
    template.innerHTML = section.markup;
    const root = template.content.firstElementChild;
    handbookLanguage.localize(root);
    root.querySelectorAll('[data-g3-story]').forEach(story => story.removeAttribute('data-g3-story'));
    root.querySelectorAll('img[loading="eager"]').forEach(image => { image.loading = 'lazy'; });
    for (const link of root.querySelectorAll('a[href^="https://"]')) {
      link.target = '_blank';
      link.rel = 'noopener';
    }

    // Keep the nav's real labels visible in the isolated preview.
    const navAnchors = Array.from(root.querySelectorAll('.g3-nav__links a'), link => {
      const anchor = document.createElement('span');
      anchor.id = link.getAttribute('href').slice(1);
      anchor.hidden = true;
      return anchor.outerHTML;
    }).join('');

    const nextFrame = document.createElement('iframe');
    nextFrame.title = 'Section preview';
    nextFrame.className = 'g3-fields__frame';
    nextFrame.srcdoc = [
      '<!doctype html><html lang="' + handbookLanguage.current() + '"><head><meta charset="utf-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1">',
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">',
      '<link rel="stylesheet" href="/g3/dreame-g3.css">',
      '<link rel="stylesheet" href="/handbook-ui.css">',
      '<link rel="stylesheet" href="/g3/guide.css">',
      '<script src="/g3/dreame-g3.js" defer></script></head>',
      '<body class="g3-field-preview">', root.outerHTML, navAnchors, '</body></html>',
    ].join('');
    nextFrame.addEventListener('load', () => {
      if (frame !== nextFrame || !nextFrame.contentDocument?.body.classList.contains('g3-field-preview')) return;
      previewDocument = nextFrame.contentDocument;
      fit();
      bindTargets();

      const targetFor = event => event.target.closest?.('[data-g3-preview-field]');
      previewDocument.addEventListener('pointerover', event => {
        if (event.pointerType !== 'touch') inspect(targetFor(event));
      });
      previewDocument.addEventListener('focusin', event => inspect(targetFor(event)));
      previewDocument.addEventListener('click', event => {
        if (event.target.closest('a[href^="#"]')) {
          event.preventDefault();
          event.stopPropagation();
        }
        inspect(targetFor(event));
      }, { capture: true });
      previewDocument.addEventListener('keydown', event => {
        if (event.key === 'Escape') onClose();
      });

      if (pendingField) {
        reveal(pendingField);
        pendingField = null;
      }
    });
    frame = nextFrame;
    canvas.replaceChildren(frame);
    fit();
  }

  function setViewport(next) {
    if (viewport === next) return;
    viewport = next;
    fit();
    bindTargets();
  }

  function clear() {
    frame?.remove();
    frame = null;
    previewDocument = null;
    inspectedTarget = null;
    pendingField = null;
    targets.clear();
  }

  return { mount, setViewport, reveal, clear };
}
