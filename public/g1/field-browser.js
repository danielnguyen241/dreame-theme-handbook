'use strict';

function prepareG1FieldBrowser(configs) {
  const data = new Map();
  const renderFields = {
    3: [['section.settings.product_name', '.g3-nav__brand'], ['block.settings.label', '.g3-nav__links a']],
    4: [['section.settings.heading', 'h2'], ['section.settings.subtitle', '.g3-hero__copy p']],
    5: [['section.settings.heading', 'h2'], ['block.settings.heading', '.g1-card h3']],
    8: [['section.settings.heading', 'h2']],
    14: [['section.settings.heading', 'h2'], ['section.settings.body', '.g1-side-reach p'], ['block.settings.number', '.g1-sidereach-stats dd'], ['block.settings.label', '.g1-sidereach-stats dt']],
    16: [['section.settings.heading', 'h2']],
    21: [['section.settings.heading', 'h2'], ['block.settings.heading', '.g1-card h3']],
    24: [['section.settings.heading', 'h2'], ['section.settings.product_label', '.g1-pack-hero figcaption'], ['block.settings.name', '.g1-pack-items figcaption']],
    25: [['section.settings.heading', 'h2'], ['block.settings.label', '.g3-spec-table dt'], ['block.settings.value', '.g3-spec-table dd']],
    26: [['section.settings.heading', 'h2'], ['block.settings.question', '.g3-faq summary'], ['block.settings.answer', '.g3-faq p']],
  };

  function addTargets(root, selector, id) {
    if (!selector) return;
    for (const element of root.querySelectorAll(selector)) {
      if (!element.dataset.g3Field) element.dataset.g3Field = id;
    }
  }

  function workbookSelector(label) {
    if (/section.*(?:title|heading)|^(?:title|heading)$/i.test(label)) return 'h2';
    if (/tab label/i.test(label)) return '[data-g3-tab]';
    if (/accordion.*title|item title/i.test(label)) return '.g1-accordion__controls button';
    if (/review|quote/i.test(label)) return '.g1-press-grid .g3-quote p';
    if (/source|publisher|channel/i.test(label)) return '.g1-press-grid h3, .g1-expert-channel h3';
    if (/card.*(?:title|label)|item name/i.test(label)) return 'article h3, figcaption';
    if (/subtitle|body|description/i.test(label)) return '.g1-block__inner > p, article p';
    return '';
  }

  function mediaBinding(key, fieldId, assets) {
    const indices = assets.map((asset, i) => i);
    const desktop = 'desktop';
    const mobile = 'mobile';
    const name = fieldId.split('.').at(-1);
    let slots = [];
    let viewport = null;
    if (key === 2 && fieldId === 'product.media') slots = indices;
    else if (key === 4 && /^image_(desktop|mobile)$/.test(name)) {
      slots = [0];
      viewport = name.endsWith('mobile') ? mobile : desktop;
    } else if ([5, 14, 21].includes(key) && ['image', 'image_mobile'].includes(name)) {
      slots = indices;
      viewport = name.endsWith('mobile') ? mobile : desktop;
    } else if ([8, 16].includes(key) && /^(video|image)_(desktop|mobile)$/.test(name)) {
      slots = indices.filter(i => (assets[i].type === 'Video') === name.startsWith('video'));
      viewport = name.endsWith('mobile') ? mobile : desktop;
    } else if (key === 24 && ['hero_image', 'icon'].includes(name)) {
      slots = name === 'hero_image' ? [0] : indices.filter(i => assets[i].role === 'Grid thumbnail');
    } else if (key === 25 && ['diagram', 'diagram_mobile'].includes(name)) {
      slots = [0];
      viewport = name.endsWith('mobile') ? mobile : desktop;
    }
    return { slots: slots.map(i => key + '-' + i), viewport };
  }

  const sections = configs.map((config, index) => {
    const key = index + 1;
    const section = g1Sections[index];
    const root = document.querySelector(config.sel);
    const assets = g1Media[key] ?? [];
    const verified = g1ShopifyFields[key] ?? [];
    function mediaInfo(slot, viewport) {
      const asset = assets[Number(slot?.split('-').at(-1))];
      if (!asset) return '';
      const dimension = source => g1Size(source) + ' px · ' + source.ratio;
      if (viewport) return dimension(asset[viewport]);
      return asset.desktop.url === asset.mobile.url ? dimension(asset.desktop)
        : dimension(asset.desktop) + ' / ' + dimension(asset.mobile);
    }
    const fields = verified.map(([label, id, group, team]) => {
      const binding = mediaBinding(key, id, assets);
      return { label, id, group, team, type: 'verified', media: binding.slots[0], info: mediaInfo(binding.slots[0], binding.viewport), ...binding };
    });
    if (key === 1) {
      fields.push({ label: 'Product title', id: 'product.title', team: 'content', example: 'Products → Title' });
      addTargets(root, 'h1', 'product.title');
    }
    if (key === 2) {
      const binding = mediaBinding(key, 'product.media', assets);
      fields.push({ label: 'Products → Media', id: 'product.media', team: 'design', media: binding.slots[0], ...binding });
      fields.push({ label: 'Alt text', id: 'media.alt', team: 'content', example: 'Alt text for each media item' });
    }

    for (const [id, selector] of renderFields[key] ?? []) {
      if (fields.some(field => field.id === id)) addTargets(root, selector, id);
    }
    const workbook = section.fields.map((field, i) => ({
      id: section.id + '-brief-' + i,
      label: field.name,
      team: field.kind === 'IN IMAGE' ? 'design' : 'content',
      showId: false,
      examples: [field.kind, field.location, field.limit].filter(Boolean),
    }));
    for (const field of workbook) {
      if (!verified.length) addTargets(root, workbookSelector(field.label), field.id);
    }
    for (const [label, selector] of [['Section heading', 'h2'], ['Card title', 'article h3'], ['Tab label', '[data-g3-tab], .g1-accordion__controls button']]) {
      const unbound = Array.from(root.querySelectorAll(selector)).filter(node => !node.dataset.g3Field);
      if (!unbound.length) continue;
      const id = section.id + '-preview-' + label;
      fields.push({ label, id, team: 'content', showId: false });
      unbound.forEach(node => { node.dataset.g3Field = id; });
    }

    for (const [i, asset] of assets.entries()) {
      const slot = key + '-' + i;
      const covered = device => fields.some(field => field.slots?.includes(slot) && (!field.viewport || field.viewport === device));
      const media = { media: slot, team: 'design', showId: false };
      if (asset.role === 'Desktop feature art') {
        fields.push({ ...media, label: asset.label + ' · Desktop', id: 'g1-ref-' + slot + '-desktop', viewport: 'desktop', info: mediaInfo(slot, 'desktop') });
      } else if (!covered('desktop') && !covered('mobile') && asset.desktop.url === asset.mobile.url) {
        fields.push({ ...media, label: asset.label, id: 'g1-ref-' + slot, viewport: null, info: mediaInfo(slot, null) });
      } else {
        for (const device of ['desktop', 'mobile']) {
          if (covered(device)) continue;
          const label = asset.label + ' · ' + (device === 'desktop' ? 'Desktop' : 'Mobile');
          fields.push({ ...media, label, id: 'g1-ref-' + slot + '-' + device, viewport: device, info: mediaInfo(slot, device) });
        }
      }
    }
    data.set(config.id, {
      fields: fields.concat(workbook),
      media: new Map(config.specs.map(spec => [spec.sel.match(/"([^"]+)"/)[1], spec])),
      note: verified.length || [1, 2].includes(key)
        ? 'Verified Shopify IDs are shown below each matching field.'
        : 'Workbook fields and US media reference. Shopify schema unverified.',
    });
    return {
      ...config,
      markup: root.outerHTML,
      fieldIds: new Set(Array.from(root.querySelectorAll('[data-g3-field]'), element => element.dataset.g3Field)),
    };
  });
  return { sections, sectionData: section => data.get(section.id) };
}
