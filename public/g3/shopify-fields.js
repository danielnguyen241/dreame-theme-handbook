'use strict';

function initG3ShopifyFields(sections) {
  const dialog = document.getElementById('shopify-fields');
  const picker = document.getElementById('g3-fields-section');
  const content = document.getElementById('g3-fields-content');
  const source = document.getElementById('g3-fields-source');
  const inspected = document.getElementById('g3-fields-inspected');
  const deviceButtons = dialog.querySelectorAll('[data-g3-field-viewport]');
  const preview = createG3FieldPreview(
    document.getElementById('g3-fields-preview'),
    inspect,
    () => dialog.close()
  );
  const rows = new Map();
  const teamButtons = dialog.querySelectorAll('[data-g3-field-team]');
  const query = new URLSearchParams(location.search);
  let team = query.get('team') === 'content' ? 'content' : 'design';
  let inspectedId;
  let renderedLanguage;
  let viewport;
  const themeRoot = 'https://github.com/danielnguyen241/dreame-shopify-g2/blob/' + g3ShopifyFieldSource + '/';
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
    return field.media || field.id === 'product.media' || field.type === 'checkbox' ? 'design' : 'content';
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

  function inspect(id) {
    if (id && id === inspectedId) return;
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
    inspected.replaceChildren(element('strong', fieldName(field), !!field.type), element('code', id, true));

    const visible = content.getBoundingClientRect();
    const position = row.getBoundingClientRect();
    const headerHeight = row.closest('table').tHead.getBoundingClientRect().height;
    if (position.top < visible.top + headerHeight) {
      content.scrollTop += position.top - visible.top - headerHeight;
    } else if (position.bottom > visible.bottom) {
      content.scrollTop += position.bottom - visible.bottom;
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

  function fieldTable(fields, mediaSpecs, fieldIds) {
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
        label.addEventListener('click', () => {
          const device = g3FieldViewport(field);
          if (device && device !== viewport) selectViewport(device);
          preview.reveal(field.id);
        });
      }
      heading.append(label);
      if (field.id) {
        heading.append(element('code', field.id, true));
        rows.set(field.id, { row, field });
      }
      row.append(heading);

      const reference = row.insertCell();
      const media = mediaSpecs.get(field.media);
      if (media) {
        reference.append(element('span', media.slot));
        if (field.info) reference.append(element('small', field.info, true));
      } else if (field.type === 'checkbox') {
        reference.append(element('span', 'Controls the Z30 fallback media for empty slots.'));
      } else if (field.example) {
        reference.append(element('span', field.example, !!field.type));
      }
    }
    return table;
  }

  function render() {
    renderedLanguage = handbookLanguage.current();
    const key = picker.value;
    const section = sections.find(({ id }) => id.toLowerCase() === key);
    const mapping = g3ShopifyFields[key];
    const fields = mapping?.fields.length ? mapping.fields
      : key === 'g3-01' ? buyBoxFields
      : key === 'g3-02' ? galleryFields
      : reviewFields;
    const media = new Map(section.specs.map(spec => [spec.sel.match(/"([^"]+)"/)?.[1], spec]));
    rows.clear();
    inspectedId = null;
    inspect();
    const heading = element('p');
    if (mapping) {
      heading.append(element('span', 'Theme Editor section'), ' · ', element('strong', mapping.name, true));
    } else {
      heading.append(element('strong', section.name));
    }
    content.replaceChildren(heading);
    for (const button of teamButtons) {
      const targetTeam = button.dataset.g3FieldTeam;
      const panel = element('div');
      panel.dataset.g3TeamPanel = targetTeam;
      const sectionFields = fields.filter(field => fieldTeam(field) === targetTeam && field.type !== 'checkbox');
      if (sectionFields.length) panel.append(fieldTable(sectionFields, media, section.fieldIds));
      else panel.append(element('p', targetTeam === 'design'
        ? 'This section has no image or video fields.'
        : 'This section has no content fields.'));
      for (const block of mapping?.blocks ?? []) {
        const blockFields = block.fields.filter(field => fieldTeam(field) === targetTeam);
        if (!blockFields.length) continue;
        const label = element('h3');
        label.append(element('span', 'Block'), ' · ', element('strong', block.name, true), ' ', element('code', block.type, true));
        panel.append(label, element('p', 'Repeat for each item.'), fieldTable(blockFields, media, section.fieldIds));
      }
      const settings = fields.filter(field => field.type === 'checkbox' && fieldTeam(field) === targetTeam);
      if (settings.length) {
        const disclosure = element('details');
        disclosure.className = 'g3-fields__settings';
        disclosure.append(element('summary', 'Preview settings'), fieldTable(settings, media, section.fieldIds));
        panel.append(disclosure);
      }
      content.append(panel);
    }

    source.href = themeRoot + (mapping?.path ?? 'sections/main-product.liquid');
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

  for (const { id, name } of sections) {
    const key = id.toLowerCase();
    const option = element('option', id + ' · ' + name);
    option.value = key;
    picker.append(option);

    const sectionTag = document.querySelector('#sec-' + key + ' .hb-sec-tag__right');
    const button = element('button', 'Fields');
    button.type = 'button';
    button.className = 'hb-media-link g3-fields-link';
    button.addEventListener('click', () => open(key));
    sectionTag.append(button);
  }

  picker.value = 'g3-04';
  picker.addEventListener('change', render);
  for (const button of teamButtons) {
    button.addEventListener('click', () => selectTeam(button.dataset.g3FieldTeam));
  }
  for (const button of deviceButtons) {
    button.addEventListener('click', () => selectViewport(button.dataset.g3FieldViewport));
  }
  dialog.addEventListener('close', () => {
    if (!dialog.open) preview.clear();
  });
  document.addEventListener('hb-language-change', () => {
    if (dialog.open && renderedLanguage !== handbookLanguage.current()) render();
  });
  document.querySelector('[data-g3-open-fields]').addEventListener('click', () => open());

  const requested = query.get('fields');
  if ([...picker.options].some(option => option.value === requested) && !document.body.classList.contains('is-embed')) {
    document.addEventListener('DOMContentLoaded', () => open(requested), { once: true });
  }
}
