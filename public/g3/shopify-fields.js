'use strict';

function initG3ShopifyFields(sections) {
  const dialog = document.getElementById('shopify-fields');
  const picker = document.getElementById('g3-fields-section');
  const content = document.getElementById('g3-fields-content');
  const source = document.getElementById('g3-fields-source');
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

  function fieldTable(fields, mediaSpecs) {
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
      heading.append(element('strong', field.group ? field.group + ' › ' + field.label : field.label, !!field.type));
      if (field.id) heading.append(element('code', field.id, true));
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
    const key = picker.value;
    const section = sections.find(({ id }) => id.toLowerCase() === key);
    const mapping = g3ShopifyFields[key];
    const fields = mapping?.fields.length ? mapping.fields
      : key === 'g3-01' ? buyBoxFields
      : key === 'g3-02' ? galleryFields
      : reviewFields;
    const media = new Map(section.specs.map(spec => [spec.sel.match(/"([^"]+)"/)?.[1], spec]));
    const heading = element('p');
    if (mapping) {
      heading.append(element('span', 'Theme Editor section'), ' · ', element('strong', mapping.name, true));
    } else {
      heading.append(element('strong', section.name));
    }
    content.replaceChildren(heading, fieldTable(fields, media));

    for (const block of mapping?.blocks ?? []) {
      const label = element('h3');
      label.append(element('span', 'Block'), ' · ', element('strong', block.name, true), ' ', element('code', block.type, true));
      content.append(label, element('p', 'Repeat for each item.'), fieldTable(block.fields, media));
    }
    source.href = themeRoot + (mapping?.path ?? 'sections/main-product.liquid');
    content.scrollTop = 0;
  }

  function open(key = picker.value) {
    picker.value = key;
    render();
    if (!dialog.open) dialog.showModal();
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
  document.querySelector('[data-g3-open-fields]').addEventListener('click', () => open());

  const requested = new URLSearchParams(location.search).get('fields');
  if ([...picker.options].some(option => option.value === requested) && !document.body.classList.contains('is-embed')) {
    open(requested);
  }
}
