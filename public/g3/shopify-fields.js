'use strict';

function initG3ShopifyFields(sections, options = {}) {
  const dialog = document.getElementById('shopify-fields');
  const picker = document.getElementById('g3-fields-section');
  const content = document.getElementById('g3-fields-content');
  const source = document.getElementById('g3-fields-source');
  const inspected = document.getElementById('g3-fields-inspected');
  const deviceButtons = dialog.querySelectorAll('[data-g3-field-viewport]');
  const preview = createG3FieldPreview(
    document.getElementById('g3-fields-preview'),
    inspect,
    () => dialog.close(),
    options
  );
  const rows = new Map();
  const teamButtons = dialog.querySelectorAll('[data-g3-field-team]');
  const query = new URLSearchParams(location.search);
  let team = query.get('team') === 'content' ? 'content' : 'design';
  let inspectedId;
  let scrollTimer;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let renderedLanguage;
  let viewport;
  const themeRoot = options.sourceURL ? '' : 'https://github.com/danielnguyen241/dreame-shopify-g2/blob/' + g3ShopifyFieldSource + '/';
  const buyBoxFields = [
    { label: 'Product title', id: 'product.title', example: 'Products → Title' },
    { label: 'Vendor', id: 'product.vendor', example: 'Products → Vendor' },
    { label: 'Price and options', example: 'Products → Pricing and Variants' },
    { label: 'Rating', example: 'Rating app selected in theme settings' },
  ];
  const galleryFields = [
    { label: 'Products → Media', id: 'product.media', example: 'Upload and arrange the product images and videos in the product record.' },
  ];
  const reviewFields = [
    { label: 'Customer Reviews', id: '@app', example: 'Add the store’s reviews app block to this section.' },
  ];

  function element(tag, value, exact = false) {
    const node = document.createElement(tag);
    if (value) node.textContent = value;
    if (exact) node.translate = false;
    return node;
  }

  function fieldName(field) {
    return field.group ? field.group + ' › ' + field.label : field.label;
  }

  function fieldTeam(field) {
    return field.team ?? (field.media || field.id === 'product.media' || field.type === 'checkbox' ? 'design' : 'content');
  }

  function selectTeam(next) {
    team = next;
    inspect();
    for (const button of teamButtons) {
      button.setAttribute('aria-pressed', String(button.dataset.g3FieldTeam === team));
    }
    for (const panel of content.querySelectorAll('[data-g3-team-panel]')) {
      panel.hidden = panel.dataset.g3TeamPanel !== team;
    }
    preview.setFields(new Set(Array.from(rows)
      .filter(([, { field }]) => fieldTeam(field) === team)
      .map(([id]) => id)));
    content.scrollTop = 0;
  }

  function scrollToField(row, smooth) {
    const visible = content.getBoundingClientRect();
    const position = row.getBoundingClientRect();
    const headerHeight = row.closest('table').tHead.getBoundingClientRect().height;
    const offset = position.top < visible.top + headerHeight
      ? position.top - visible.top - headerHeight
      : Math.max(0, position.bottom - visible.bottom);
    if (!offset) return;
    content.scrollTo({
      top: content.scrollTop + offset,
      behavior: smooth && !reducedMotion.matches ? 'smooth' : 'instant',
    });
  }

  function inspect(id, hover = false) {
    if (id && id === inspectedId) {
      if (!hover) {
        clearTimeout(scrollTimer);
        scrollToField(rows.get(id).row, false);
      }
      return;
    }
    clearTimeout(scrollTimer);
    rows.get(inspectedId)?.row.classList.remove('is-inspected');
    inspectedId = id;
    const match = rows.get(id);
    if (!match) {
      const hint = team === 'design'
        ? 'Hover or tap an image or video to find its Shopify field.'
        : 'Hover or tap text to find its Shopify field.';
      inspected.replaceChildren(element('span', hint));
      return;
    }

    const { row, field } = match;
    row.classList.add('is-inspected');
    inspected.replaceChildren(element('strong', fieldName(field), !!field.type));
    inspected.append(field.showId === false
      ? element('span', 'Shopify ID unverified')
      : element('code', id, true));

    if (hover) {
      scrollTimer = setTimeout(() => scrollToField(row, true), 140);
    } else {
      scrollToField(row, false);
    }
  }

  function selectViewport(next) {
    viewport = next;
    for (const button of deviceButtons) {
      const selected = button.dataset.g3FieldViewport === next;
      button.setAttribute('aria-pressed', String(selected));
      button.classList.toggle('is-active', selected);
    }
    preview.setViewport(next);
  }

  function fieldTable(fields, mediaSpecs, fieldIds, tableRows, reveal) {
    const table = element('table');
    const headers = table.createTHead().insertRow();
    for (const label of ['Theme Editor label and ID', 'Z30 example or source']) {
      const heading = element('th', label);
      heading.scope = 'col';
      headers.append(heading);
    }

    const body = table.createTBody();
    for (const field of fields) {
      const row = body.insertRow();
      const heading = element('th', null);
      heading.scope = 'row';
      const hasPreview = field.media || fieldIds.has(field.id);
      const label = element(hasPreview ? 'button' : 'strong', fieldName(field), !!field.type);
      if (hasPreview) {
        label.type = 'button';
        label.className = 'g3-fields__reveal';
        label.addEventListener('click', () => reveal(field));
      }
      heading.append(label);
      if (field.id) {
        if (field.showId !== false) heading.append(element('code', field.id, true));
        tableRows.set(field.id, { row, field });
      }
      row.append(heading);

      const reference = row.insertCell();
      const media = mediaSpecs.get(field.media);
      if (media) {
        reference.append(element('span', media.slot));
        if (field.info) reference.append(element('small', field.info, true));
      } else if (field.examples) {
        for (const value of field.examples) reference.append(element('small', value));
      } else if (field.type === 'checkbox') {
        reference.append(element('span', 'Controls the Z30 fallback media for empty slots.'));
      } else if (field.example) {
        reference.append(element('span', field.example, !!field.type));
      }
    }
    return table;
  }

  function sectionData(section) {
    if (options.sectionData) return options.sectionData(section);
    const key = section.id.toLowerCase();
    const mapping = g3ShopifyFields[key];
    const fields = mapping?.fields.length ? mapping.fields
      : key === 'g3-01' ? buyBoxFields
      : key === 'g3-02' ? galleryFields
      : reviewFields;
    const media = new Map(section.specs.map(spec => [spec.sel.match(/"([^"]+)"/)?.[1], spec]));
    return { mapping, fields, media };
  }

  function renderPanels(target, section, data, tableRows, reveal) {
    const { mapping, fields, media } = data;
    const heading = element('p');
    if (mapping) {
      heading.append(element('span', 'Theme Editor section'), ' · ', element('strong', mapping.name, true));
    } else {
      heading.append(element('strong', section.name));
    }
    target.replaceChildren(heading);
    if (data.note) target.append(element('p', data.note, false));
    for (const button of teamButtons) {
      const targetTeam = button.dataset.g3FieldTeam;
      const panel = element('div');
      panel.dataset.g3TeamPanel = targetTeam;
      const sectionFields = fields.filter(field => fieldTeam(field) === targetTeam && field.type !== 'checkbox');
      if (sectionFields.length) panel.append(fieldTable(sectionFields, media, section.fieldIds, tableRows, reveal));
      else panel.append(element('p', targetTeam === 'design'
        ? 'This section has no image or video fields.'
        : 'This section has no content fields.'));
      for (const block of mapping?.blocks ?? []) {
        const blockFields = block.fields.filter(field => fieldTeam(field) === targetTeam);
        if (!blockFields.length) continue;
        const label = element('h3');
        label.append(element('span', 'Block'), ' · ', element('strong', block.name, true), ' ', element('code', block.type, true));
        panel.append(label, element('p', 'Repeat for each item.'), fieldTable(blockFields, media, section.fieldIds, tableRows, reveal));
      }
      const settings = fields.filter(field => field.type === 'checkbox' && fieldTeam(field) === targetTeam);
      if (settings.length) {
        const disclosure = element('details');
        disclosure.className = 'g3-fields__settings';
        disclosure.append(element('summary', 'Preview settings'), fieldTable(settings, media, section.fieldIds, tableRows, reveal));
        panel.append(disclosure);
      }
      target.append(panel);
    }

  }

  function render() {
    renderedLanguage = handbookLanguage.current();
    const section = sections.find(({ id }) => id.toLowerCase() === picker.value);
    const data = sectionData(section);
    const { mapping, fields } = data;
    rows.clear();
    inspectedId = null;
    inspect();
    renderPanels(content, section, data, rows, field => {
      const device = g3FieldViewport(field);
      if (device && device !== viewport) selectViewport(device);
      preview.reveal(field.id);
    });
    source.href = options.sourceURL ?? themeRoot + (mapping?.path ?? 'sections/main-product.liquid');
    preview.mount(section, fields.concat((mapping?.blocks ?? []).flatMap(block => block.fields)));
    selectTeam(team);
  }

  function open(key = picker.value) {
    picker.value = key;
    if (!dialog.open) {
      const mobile = document.body.matches('.is-embed, .hb-vp-mobile') || window.matchMedia('(max-width: 850px)').matches;
      selectViewport(mobile ? 'mobile' : 'desktop');
      dialog.showModal();
    }
    render();
  }

  const inlineSections = new Map();
  let expanded;
  let inlineTeam = team;

  function closeDetails() {
    if (!expanded) return;
    expanded.toggle.setAttribute('aria-expanded', 'false');
    expanded.panel.hidden = true;
    expanded.panel.replaceChildren();
    expanded.root.classList.remove('g3-inspecting-section');
    expanded.highlight?.removeAttribute('data-g3-inline-active');
    expanded = null;
  }

  function selectInlineTeam(next) {
    inlineTeam = next;
    for (const button of expanded.panel.querySelectorAll('[data-g3-field-team]')) {
      button.setAttribute('aria-pressed', String(next === button.dataset.g3FieldTeam));
    }
    for (const panel of expanded.panel.querySelectorAll('[data-g3-team-panel]')) {
      panel.hidden = panel.dataset.g3TeamPanel !== next;
    }
    expanded.highlight?.removeAttribute('data-g3-inline-active');
    expanded.row?.classList.remove('is-inspected');
  }

  function markInline(state, match, target) {
    if (fieldTeam(match.field) !== inlineTeam) return;
    state.highlight?.removeAttribute('data-g3-inline-active');
    state.row?.classList.remove('is-inspected');
    target.setAttribute('data-g3-inline-active', '');
    match.row.classList.add('is-inspected');
    state.highlight = target;
    state.row = match.row;
  }

  function revealInline(state, field) {
    const selector = field.media ? '[data-g3-media="' + field.media + '"]'
      : '[data-g3-field="' + field.id + '"]';
    const matches = Array.from(state.root.querySelectorAll(selector));
    const target = matches.find(node => node.getClientRects().length) ?? matches[0];
    if (!target) return;
    const hiddenTab = target.closest('[data-g3-panel][hidden]');
    if (hiddenTab) document.getElementById(hiddenTab.getAttribute('aria-labelledby'))?.click();
    const details = target.closest('details');
    if (details) details.open = true;
    const nav = target.closest('.g3-nav__links');
    if (nav && !target.getClientRects().length) nav.previousElementSibling.click();
    markInline(state, state.rows.get(field.id), target);
    if (!nav) scrollToHandbookSection(target);
  }

  function openDetails(state, jump = false) {
    if (expanded !== state) {
      closeDetails();
      expanded = state;
      state.rows.clear();
      state.toggle.setAttribute('aria-expanded', 'true');
      state.panel.hidden = false;
      state.root.classList.add('g3-inspecting-section');
      const teams = dialog.querySelector('.g3-fields__teams').cloneNode(true);
      teams.addEventListener('click', event => {
        const button = event.target.closest('[data-g3-field-team]');
        if (button) selectInlineTeam(button.dataset.g3FieldTeam);
      });
      const details = element('div');
      details.className = 'g3-fields__content g3-section-fields__content';
      const data = sectionData(state.section);
      renderPanels(details, state.section, data, state.rows, field => revealInline(state, field));
      const footer = element('div');
      footer.className = 'g3-fields__footer';
      const schema = element('a', 'Shopify source');
      schema.href = themeRoot + (data.mapping?.path ?? 'sections/main-product.liquid');
      schema.target = '_blank';
      schema.rel = 'noopener';
      footer.append(schema);
      state.panel.append(teams, details, footer);
      selectInlineTeam(inlineTeam);
    }
    if (jump) scrollToHandbookSection(state.toggle.parentElement);
  }

  for (const section of sections) {
    const { id, name, sel } = section;
    const key = id.toLowerCase();
    const option = element('option', id + ' · ' + name);
    option.value = key;
    picker.append(option);
    if (options.inline === false) continue;

    const tag = document.getElementById('sec-' + key);
    const toggle = element('button');
    toggle.type = 'button';
    toggle.className = 'g3-section-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.id = tag.id + '-toggle';
    const inner = element('span');
    inner.className = 'hb-sec-tag__inner';
    for (const side of tag.firstElementChild.children) {
      const span = element('span');
      span.className = side.className;
      span.append(...side.childNodes);
      inner.append(span);
    }
    const label = element('span', 'Details');
    label.className = 'g3-section-toggle__label';
    const chevron = element('span');
    chevron.className = 'g3-section-toggle__chevron';
    chevron.setAttribute('aria-hidden', 'true');
    inner.lastElementChild.append(label, chevron);
    toggle.append(inner);
    tag.classList.add('g3-section-heading');
    tag.replaceChildren(toggle);

    const panel = element('section');
    panel.className = 'g3-section-fields';
    panel.id = tag.id + '-details';
    panel.hidden = true;
    panel.setAttribute('aria-labelledby', toggle.id);
    toggle.setAttribute('aria-controls', panel.id);
    tag.after(panel);

    const root = document.querySelector(sel);
    const state = { section, root, panel, toggle, rows: new Map() };
    inlineSections.set(key, state);
    toggle.addEventListener('click', () => {
      if (expanded === state) closeDetails();
      else openDetails(state);
    });

    function inspectInline(event) {
      if (expanded !== state || (event.type === 'pointerover' && event.pointerType === 'touch')) return;
      const target = event.target.closest?.('[data-g3-field], [data-g3-media]');
      if (!target || event.target.closest('.hb-spec-box')) return;
      const device = window.matchMedia('(max-width: 850px)').matches ? 'mobile' : 'desktop';
      const match = state.rows.get(target.dataset.g3Field) ?? Array.from(state.rows.values()).find(({ field }) =>
        field.media && field.media === target.dataset.g3Media && (g3FieldViewport(field) ?? device) === device);
      if (match) markInline(state, match, target);
    }
    root.addEventListener('pointerover', inspectInline);
    root.addEventListener('focusin', inspectInline);
    root.addEventListener('click', inspectInline);
  }

  picker.value = options.defaultSection ?? 'g3-04';
  picker.addEventListener('change', render);
  for (const button of teamButtons) {
    button.addEventListener('click', () => selectTeam(button.dataset.g3FieldTeam));
  }
  for (const button of deviceButtons) {
    button.addEventListener('click', () => selectViewport(button.dataset.g3FieldViewport));
  }
  dialog.addEventListener('close', () => {
    if (!dialog.open) {
      clearTimeout(scrollTimer);
      preview.clear();
    }
  });
  document.addEventListener('hb-language-change', () => {
    if (dialog.open && renderedLanguage !== handbookLanguage.current()) render();
  });
  document.querySelector('[data-g3-open-fields]').addEventListener('click', () => {
    const current = document.getElementById('hb-jump')?.value.replace(/^sec-/, '');
    const selected = sections.find(section => section.id.toLowerCase() === current);
    open(selected?.id.toLowerCase());
  });
  if (options.inline === false && query.get('view') === 'fields' && !document.body.classList.contains('is-embed')) {
    const section = sections.find(item => item.id.toLowerCase() === query.get('fields'));
    document.addEventListener('DOMContentLoaded', () => open(section?.id.toLowerCase()), { once: true });
  }

  const requested = inlineSections.get(query.get('fields'));
  if (requested) {
    document.addEventListener('DOMContentLoaded', () => {
      const jump = document.getElementById('hb-jump');
      if (jump && !document.body.classList.contains('is-embed')) jump.value = 'sec-' + requested.section.id.toLowerCase();
      requestAnimationFrame(() => openDetails(requested, true));
    }, { once: true });
  }
  return { open };
}
