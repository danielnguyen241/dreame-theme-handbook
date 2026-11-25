'use strict';

const g1Reference = 'https://www.dreametech.com/products/x50-ultra-robot-vacuum';
const g1Stage = document.getElementById('g1-preview');
const g1Table = document.getElementById('g1-media-table');
const g1Tabs = new Map([
  [9, [
    ['Climb over ledges', 'The retractable legs raise the chassis to cross stepped thresholds.'],
    ['Lower noise', 'The shock-absorbing mechanism helps reduce noise when crossing obstacles.'],
  ]],
  [11, [
    ['360° scanning', 'The DToF sensor scans around the robot to map the room.'],
    ['Low-profile cleaning', 'The sensor retracts so the robot can reach under low furniture.'],
  ]],
]);
const g1FeatureTitles = {
  5: 'X50 Ultra highlights', 6: 'What the Pros Say', 7: 'Trusted Media Recognition', 8: 'ProLeap™ obstacle clearing', 9: 'Conquer ledges',
  10: 'With Dreame vs. others', 11: 'VersaLift™ navigation', 12: 'Obstacle avoidance',
  13: 'HyperStream™ Detangling DuoBrush', 14: 'SideReach™ and MopExtend™',
  15: 'TripleUp cleaning', 16: 'Adaptive Intelligent PowerDock™', 17: 'PowerDock features',
  18: 'Mop rewashing and remopping', 19: 'Carpet settings', 20: 'Carpet cleaning modes',
  21: 'Pet features', 22: 'Curtain cleaning', 23: 'A connected clean', 24: 'What is in the box',
  25: 'Specifications', 26: 'FAQ', 27: 'Customer Reviews',
};

function g1Node(tag, text, className) {
  const result = document.createElement(tag);
  if (text) result.textContent = text;
  if (className) result.className = className;
  return result;
}

function g1Link(text, href) {
  const link = g1Node('a', text);
  link.href = href;
  return link;
}

function g1Size(source) {
  return source.size.join(' × ');
}

function g1Thumbnail(url, width) {
  if (new URL(url).hostname === 'i.ytimg.com') return url;
  return url + (url.includes('?') ? '&' : '?') + 'width=' + width;
}

function g1MediaElement(asset, key) {
  const slot = g1Node('div', '', 'g3-media');
  slot.dataset.g1Media = key;
  slot.dataset.g3Media = key;
  const { desktop, mobile } = asset;
  if (asset.type === 'Video') {
    const video = g1Node('video');
    video.controls = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'none';
    video.setAttribute('aria-label', asset.label);
    video.dataset.g3Video = '';
    video.dataset.desktop = desktop.url;
    video.dataset.mobile = mobile.url;
    slot.classList.add('g1-video');
    slot.append(video);
  } else {
    const picture = g1Node('picture');
    if (desktop.url !== mobile.url) {
      const source = g1Node('source');
      source.media = '(max-width: 850px)';
      source.srcset = mobile.preview;
      source.setAttribute('width', mobile.size[0]);
      source.setAttribute('height', mobile.size[1]);
      picture.append(source);
    }
    const image = g1Node('img');
    image.src = desktop.preview;
    [image.width, image.height] = desktop.size;
    image.alt = asset.label;
    image.loading = key === '2-0' || key === '4-0' ? 'eager' : 'lazy';
    picture.append(image);
    slot.append(picture);
  }
  if (desktop.size.length) slot.style.setProperty('--g1-desktop-ratio', desktop.size.join('/'));
  if (mobile.size.length) slot.style.setProperty('--g1-mobile-ratio', mobile.size.join('/'));
  return slot;
}

function g1Switcher(items, key, gallery = false) {
  const group = g1Node('div', '', 'g3-switcher' + (gallery ? ' guide-gallery' : ' g1-switcher'));
  group.dataset.g3Switcher = '';
  const tabs = g1Node('div', '', 'g3-switcher__tabs');
  tabs.setAttribute('role', 'tablist');
  tabs.setAttribute('aria-label', gallery ? 'Product Gallery' : g1FeatureTitles[key]);
  const panels = g1Node('div', '', 'g3-switcher__panels');
  for (const [index, item] of items.entries()) {
    const id = 'g1-tab-' + key + '-' + index;
    const button = g1Node('button', gallery ? '' : item.label);
    button.type = 'button';
    button.id = id;
    button.dataset.g3Tab = '';
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-selected', String(index === 0));
    button.setAttribute('aria-controls', id + '-panel');
    button.tabIndex = index === 0 ? 0 : -1;
    if (gallery) {
      button.setAttribute('aria-label', item.label);
      const thumb = g1Node('img');
      thumb.src = g1Thumbnail(item.asset.desktop.url, 120);
      thumb.alt = '';
      thumb.loading = 'lazy';
      button.append(thumb);
    }
    const panel = g1Node('div');
    panel.id = id + '-panel';
    panel.dataset.g3Panel = '';
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', id);
    panel.hidden = index !== 0;
    if (item.asset) panel.append(g1MediaElement(item.asset, key + '-' + item.index));
    if (item.copy) panel.append(g1Node('p', item.copy, 'g1-tab-copy'));
    tabs.append(button);
    panels.append(panel);
  }
  group.append(...(gallery ? [panels, tabs] : [tabs, panels]));
  return group;
}

function g1Cards(assets, key, mode = '') {
  const deck = g1Node('div', '', 'g1-cards ' + mode);
  for (const [index, asset] of assets.entries()) {
    const card = g1Node('article', '', 'g1-card');
    card.append(g1MediaElement(asset, key + '-' + index));
    card.append(g1Node('h3', asset.label));
    if (key === 21) {
      const context = [
        'Detect pets and clean around them.',
        'Locate your pet from the app.',
        'Use the robot camera to check on your pet.',
        'Set cleaning behavior around pet areas.',
        'Increase suction where more pickup is needed.',
      ];
      card.append(g1Node('p', context[index]));
    }
    deck.append(card);
  }
  if (mode === 'g1-carousel') {
    const group = g1Node('div', '', 'g3-scroll-group');
    group.dataset.g3Scroll = '';
    deck.dataset.g3Track = '';
    const controls = g1Node('div', '', 'g3-controls');
    for (const [action, arrow] of [['previous', '‹'], ['next', '›']]) {
      const button = g1Node('button', arrow);
      button.type = 'button';
      button.setAttribute('data-g3-' + action, '');
      button.setAttribute('aria-label', action === 'previous' ? 'Previous card' : 'Next card');
      controls.append(button);
    }
    group.append(deck, controls);
    return group;
  }
  return deck;
}

function g1PressCards(assets) {
  const quotes = [
    'Retractable legs lift the robot to cross raised thresholds.',
    'ProLeap™ helps it climb and VersaLift™ helps it reach low spaces.',
    'The robot can negotiate small obstructions and slopes.',
    'The lifting system helps it cross steps and ledges.',
    'The robot can continue cleaning across obstacles.',
    'The robot can cross short steps between rooms.',
  ];
  const group = g1Node('div', '', 'g1-press-grid');
  for (const [index, asset] of assets.entries()) {
    const card = g1Node('article', '', 'g3-quote');
    const copy = g1Node('div');
    copy.append(g1Node('h3', asset.label), g1Node('p', quotes[index]));
    card.append(g1MediaElement(asset, '7-' + index), copy);
    group.append(card);
  }
  return group;
}

function g1ExpertCards(assets) {
  const ids = ['Q8yIdW3uoTE', '39OtFmiLcsM', '9nuiowaPHzQ'];
  const channels = ['Max Tech', 'Digital Trends', 'Expert review 3'];
  const group = g1Node('div', '', 'g1-expert-grid');
  for (const [index, video] of ids.entries()) {
    const card = g1Node('article', '', 'g1-expert-card');
    const link = g1Link('Watch expert review', 'https://www.youtube.com/watch?v=' + video);
    link.className = 'g1-review-link';
    const logo = g1Node('div', '', 'g1-expert-channel');
    logo.append(g1MediaElement(assets[index * 2 + 1], '6-' + (index * 2 + 1)), g1Node('h3', channels[index]));
    card.append(g1MediaElement(assets[index * 2], '6-' + (index * 2)), logo, link);
    group.append(card);
  }
  return group;
}

function g1PackList(assets) {
  const layout = g1Node('div', '', 'g1-pack-layout');
  const hero = g1Node('figure', '', 'g1-pack-hero');
  hero.append(g1MediaElement(assets[0], '24-0'), g1Node('figcaption', assets[0].label));
  const items = g1Node('div', '', 'g1-pack-items');
  for (const [index, asset] of assets.slice(1).entries()) {
    const card = g1Node('figure');
    card.append(g1MediaElement(asset, '24-' + (index + 1)), g1Node('figcaption', asset.label));
    items.append(card);
  }
  layout.append(hero, items);
  return layout;
}

function g1SideReach(asset) {
  const layout = g1Node('div', '', 'g1-side-reach');
  const copy = g1Node('div');
  copy.append(g1Node('h3', 'Reach edges and corners with SideReach™'), g1Node('p', 'The side brush extends into edges. MopExtend™ reaches into spaces along furniture.'));
  const stats = g1Node('dl', '', 'g1-sidereach-stats');
  for (const [label, value] of [['Edge and corner coverage', '99%*'], ['Along the edge', '<1 mm*']]) {
    stats.append(g1Node('dt', label), g1Node('dd', value));
  }
  layout.append(copy, g1MediaElement(asset, '14-0'), stats);
  return layout;
}

function g1ConnectedRows(assets) {
  const list = g1Node('div', '', 'g1-connected-rows');
  const description = ['Control cleaning from a supported Apple Watch.', 'Start cleaning with a compatible voice assistant.', 'Open the controls from phone widgets.'];
  for (const [index, asset] of assets.entries()) {
    const row = g1Node('article');
    const copy = g1Node('div');
    copy.append(g1Node('h3', asset.label), g1Node('p', description[index]));
    row.append(copy, g1MediaElement(asset, '23-' + index));
    list.append(row);
  }
  return list;
}

function g1Accordion(assets, key) {
  const accordion = g1Node('div', '', 'g1-accordion');
  accordion.dataset.g1Accordion = '';
  const controls = g1Node('div', '', 'g1-accordion__controls');
  const visuals = g1Node('div');
  for (const [index, asset] of assets.entries()) {
    const button = g1Node('button', asset.label);
    button.type = 'button';
    button.setAttribute('aria-expanded', String(index === 0));
    const visual = g1MediaElement(asset, key + '-' + index);
    visual.id = 'g1-accordion-' + key + '-' + index;
    visual.hidden = index !== 0;
    button.setAttribute('aria-controls', visual.id);
    controls.append(button);
    visuals.append(visual);
  }
  accordion.append(controls, visuals);
  return accordion;
}

function mountG1Controls(root) {
  for (const accordion of root.querySelectorAll('[data-g1-accordion]')) {
    accordion.addEventListener('click', event => {
      const button = event.target.closest('button[aria-controls]');
      if (!button || !accordion.contains(button)) return;
      const target = accordion.ownerDocument.getElementById(button.getAttribute('aria-controls'));
      if (!target) return;
      for (const tab of accordion.querySelectorAll('button[aria-controls]')) {
        tab.setAttribute('aria-expanded', String(tab === button));
      }
      for (const panel of target.parentElement.children) panel.hidden = panel !== target;
    });
  }
}

function g1Nav() {
  const wrapper = g1Node('div', '', 'g3-nav-section');
  wrapper.dataset.hbStickyNav = '';
  const nav = g1Node('nav', '', 'g3 g3-nav');
  nav.id = 'g1-03';
  nav.dataset.g3Nav = '';
  nav.setAttribute('aria-label', 'Product sections');
  const bar = g1Node('div', '', 'g3-wrap g3-nav__inner');
  const title = g1Link('Dreame X50 Ultra', '#g1-04');
  title.className = 'g3-nav__brand';
  const toggle = g1Node('button', '⌄', 'g3-nav__toggle');
  toggle.type = 'button';
  toggle.dataset.g3NavToggle = '';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'g1-nav-links');
  toggle.setAttribute('aria-label', 'Show product sections');
  const links = g1Node('div', '', 'g3-nav__links');
  links.id = 'g1-nav-links';
  for (const [target, label] of [[4, 'Overview'], [8, 'Clear reaches'], [13, 'Powerful cleaning'], [16, 'PowerDock'], [20, 'Intelligence'], [24, 'Package list & specs']]) {
    links.append(g1Link(label, '#g1-' + String(target).padStart(2, '0')));
  }
  bar.append(title, toggle, links);
  nav.append(bar);
  wrapper.append(nav);
  return wrapper;
}

function g1TextSection(key, body) {
  if (key === 25) {
    const specs = g1Node('dl', '', 'g3-spec-table g3-specs');
    for (const [label, value] of [['Robot weight', '4.53 kg'], ['Base station dimensions', '457 × 340 × 590 mm'], ['Base station weight', '9.09 kg'], ['Maximum suction', '20,000 Pa'], ['Battery capacity', '6,400 mAh'], ['Dust box capacity', '395 mL']]) {
      const row = g1Node('div');
      row.append(g1Node('dt', label), g1Node('dd', value));
      specs.append(row);
    }
    body.append(specs);
    const comparison = g1Node('details', '', 'g1-spec-details');
    comparison.append(g1Node('summary', 'Compare X50 Ultra and X40 Ultra'));
    comparison.append(g1DetailTable(['Feature', 'X50 Ultra', 'X40 Ultra'], [
      ['Maximum suction', '20,000 Pa', '12,000 Pa'],
      ['Dust box capacity', '395 mL', '300 mL'],
      ['Obstacle crossing', '60 mm (two steps)', '22 mm'],
      ['Navigation', 'VersaLift™ DToF', 'LDS'],
    ]));
    const notes = g1Node('details', '', 'g1-spec-details');
    notes.append(g1Node('summary', 'Remarks'), g1Node('p', 'Model specifications and performance conditions are listed on the Dreame US PDP.'));
    body.append(comparison, notes);

  }
  if (key === 26) {
    const faq = g1Node('div', '', 'g3-faq');
    for (const [label, text] of [
      ['X50 Ultra vs. X40 Ultra', 'The X50 Ultra adds retractable legs, VersaLift™ navigation and the HyperStream™ DuoBrush.'],
      ['Cleaning modes', 'Choose a vacuuming or mopping mode in the Dreamehome app.'],
      ['Package contents', 'See the Package List above for the accessories shown on the US PDP.'],
    ]) {
      const item = g1Node('details');
      item.append(g1Node('summary', label), g1Node('p', text));
      faq.append(item);
    }
    body.append(faq);
  }
  if (key >= 25) body.append(g1Link('View on the X50 Ultra US PDP', g1Reference));
}

function g1BuildPreview() {
  const buy = g1Node('section', '', 'g3 g3-light-panel guide-buybox');
  buy.id = 'g1-01';
  const buyInner = g1Node('div', '', 'g3-wrap guide-buybox__inner');
  const gallery = g1Switcher(g1Media[2].map((asset, index) => ({ asset, label: asset.label, index })), 2, true);
  gallery.id = 'g1-02';
  const column = g1Node('div', '', 'guide-gallery-column');
  column.append(gallery);
  const text = g1Node('div', '', 'guide-buybox__text');
  text.append(g1Node('h1', 'Dreame X50 Ultra Robot Vacuum'), g1Node('p', 'X Series · Matrix'), g1Link('View X50 Ultra on Dreame US', g1Reference));
  buyInner.append(column, text);
  buy.append(buyInner);
  g1Stage.append(buy, g1Nav());

  for (let key = 4; key <= 27; key++) {
    const section = g1Sections[key - 1];
    const assets = g1Media[key] ?? [];
    const title = g1FeatureTitles[key] ?? section.name;
    const block = g1Node('section', '', 'g3 g3-section g1-block');
    block.id = section.id.toLowerCase();
    if (key === 4) {
      block.className = 'g3 g3-hero';
      const scene = g1Node('div', '', 'g3-hero__scene');
      const copy = g1Node('div', '', 'g3-wrap g3-hero__copy');
      copy.append(g1Node('h2', 'Dreame X50 Ultra'), g1Node('p', 'Rise up, clean beneath'));
      scene.append(g1MediaElement(assets[0], '4-0'), copy);
      block.append(scene);
    } else {
      if ([21, 22, 23, 24, 25, 26, 27].includes(key)) block.classList.add('g3-light-panel');
      const body = g1Node('div', '', 'g3-wrap g1-block__inner');
      body.append(g1Node('h2', title, 'g3-group-heading'));
      if (key === 6) {
        body.append(g1ExpertCards(assets));
      } else if (key === 7) {
        body.append(g1PressCards(assets));
      } else if (key === 14) {
        body.append(g1SideReach(assets[0]));
      } else if (key === 23) {
        body.append(g1ConnectedRows(assets));
      } else if (key === 24) {
        body.append(g1PackList(assets));
      } else if ([17, 18].includes(key)) {
        body.append(g1Accordion(assets, key));
      } else if (g1Tabs.has(key)) {
        for (const [index, asset] of assets.entries()) body.append(g1MediaElement(asset, key + '-' + index));
        body.append(g1Switcher(g1Tabs.get(key).map(([label, copy]) => ({ label, copy })), key));
      } else if ([13, 20].includes(key)) {
        const items = assets.map((asset, index) => ({ label: asset.label, index, asset }));
        body.append(g1Switcher(items, key));
      } else if ([8, 12, 16, 19, 22, 25].includes(key)) {
        for (const [index, asset] of assets.entries()) body.append(g1MediaElement(asset, key + '-' + index));
      } else if (assets.length) {
        const mode = key === 21 ? 'g1-carousel' : key === 5 ? 'g1-bento' : [10, 15].includes(key) ? 'g1-pair' : '';
        body.append(g1Cards(assets, key, mode));
      }
      g1TextSection(key, body);
      block.append(body);
    }
    g1Stage.append(block);
  }
}

function g1BuildTable() {
  const head = g1Table.createTHead().insertRow();
  for (const text of ['ID', 'Section name', 'Image / video', 'Desktop (px)', 'Mobile (px)', 'Versions', 'Desktop source', 'Image']) {
    const col = g1Node('th', text);
    col.scope = 'col';
    head.append(col);
  }
  const body = g1Table.createTBody();
  for (const [key, assets] of Object.entries(g1Media)) {
    for (const asset of assets) {
      const section = g1Sections[Number(key) - 1];
      const row = body.insertRow();
      const id = g1Node('th', section.id);
      id.scope = 'row';
      row.append(id);
      row.insertCell().textContent = section.name;
      row.insertCell().textContent = asset.label;
      for (const source of [asset.desktop, asset.mobile]) {
        const cell = row.insertCell();
        cell.className = 'guide-dimensions';
        cell.append(g1Link(g1Size(source) || 'Unverified', source.url));
        if (source.ratio) cell.append(g1Node('small', source.ratio));
      }
      row.insertCell().textContent = asset.desktop.url === asset.mobile.url ? '1' : '2';
      row.insertCell().append(g1Link('Open source', asset.desktop.url));
      if (asset.type === 'Image') {
        const preview = g1Node('img');
        preview.alt = asset.label;
        preview.loading = 'lazy';
        preview.src = g1Thumbnail(asset.desktop.url, 200);
        row.insertCell().append(preview);
      } else {
        row.insertCell().textContent = 'MP4';
      }
    }
  }
}

g1BuildPreview();
mountG1Controls(g1Stage);
const g1Configs = g1Sections.map((section, index) => {
  const key = index + 1;
  const specs = (g1Media[key] ?? []).flatMap((asset, slot) => {
    if (!asset.desktop.size.length || !asset.mobile.size.length) return [];
    return [{
      sel: '[data-g1-media="' + key + '-' + slot + '"]',
      slot: asset.label,
      pc: g1Size(asset.desktop), mb: g1Size(asset.mobile),
      pcRatio: asset.desktop.ratio, mbRatio: asset.mobile.ratio,
      fmt: asset.type === 'Video' ? 'MP4' : key === 7 || (key === 6 && slot % 2) ? 'Logo' : 'Image',
      sm: [2, 5, 7, 24].includes(key) || (key === 6 && slot % 2 === 1),
    }];
  });
  return {
    id: section.id,
    sel: key === 3 ? '[data-hb-sticky-nav]' : '#' + section.id.toLowerCase(),
    name: section.vnModules.join(' + ') + ' · ' + section.name,
    meta: section.weight,
    req: !section.optional,
    inlineTag: key === 2,
    specs,
  };
});
g1BuildTable();
const g1Browser = prepareG1FieldBrowser(g1Configs);
initHandbook(g1Configs);
const g1FieldBrowser = initG3ShopifyFields(g1Browser.sections, {
  sectionData: g1Browser.sectionData,
  defaultSection: 'g1-04',
  previewStylesheet: '/g1/guide.css',
  mountControls: mountG1Controls,
  sourceURL: g1Reference,
  inline: false,
});

const g1Query = new URLSearchParams(location.search);
let g1Detail;
let g1Team = g1Query.get('team') === 'content' ? 'content' : 'design';

function g1Facts(entries) {
  const facts = g1Node('dl', '', 'g1-facts');
  for (const [label, value] of entries) {
    if (value && value !== '-') facts.append(g1Node('dt', label), g1Node('dd', value));
  }
  return facts;
}

function g1DetailTable(headers, rows) {
  const table = g1Node('table');
  const headings = table.createTHead().insertRow();
  for (const title of headers) {
    const th = g1Node('th', title);
    th.scope = 'col';
    headings.append(th);
  }
  const body = table.createTBody();
  for (const values of rows) {
    const row = body.insertRow();
    for (const value of values) {
      const cell = row.insertCell();
      if (value instanceof HTMLElement) cell.append(value);
      else cell.textContent = value || '—';
    }
  }
  return table;
}

function g1Reveal(key, slot) {
  const target = document.querySelector('[data-g1-media="' + key + '-' + slot + '"]');
  if (!target) return;
  const tab = target.closest('[data-g3-panel][hidden]');
  if (tab) document.getElementById(tab.getAttribute('aria-labelledby'))?.click();
  if (target.hidden) {
    document.querySelector('[aria-controls="' + target.id + '"]')?.click();
  }
  document.querySelector('[data-g3-inline-active]')?.removeAttribute('data-g3-inline-active');
  target.setAttribute('data-g3-inline-active', '');
  scrollToHandbookSection(target);
}

function g1DesignDetails(section, key) {
  const pane = g1Node('div');
  const media = section.media;
  const assets = g1Media[key] ?? [];
  pane.append(g1Facts([
    ['VN module', section.vnModules.join(' + ')],
    ['VN export size', media?.size],
    ['Text allowed in artwork', media?.imageText],
    ['Keep clear for typed text', media?.clearSpace],
    ['Notes', media?.note || section.note],
  ]));
  if (assets.length) {
    const rows = assets.map((asset, slot) => {
      const button = g1Node('button', asset.label, 'g3-fields__reveal');
      button.type = 'button';
      button.addEventListener('click', () => g1Reveal(key, slot));
      return [button, g1Size(asset.desktop), g1Size(asset.mobile)];
    });
    pane.append(g1DetailTable(['US media slot', 'Desktop (px)', 'Mobile (px)'], rows));
  }
  if (section.clean) {
    const link = g1Link('Open artwork reference from workbook', '/g1/' + section.clean.path);
    link.target = '_blank';
    link.rel = 'noopener';
    pane.append(link);
  }
  if (section.reference) {
    const link = g1Link('Open section reference from workbook', '/g1/' + section.reference.path);
    link.target = '_blank';
    link.rel = 'noopener';
    pane.append(link);
  }
  return pane;
}

function g1ContentDetails(section) {
  const pane = g1Node('div');
  const rows = section.fields.map(field => [field.name, field.kind, field.location, field.limit]);
  if (rows.length) pane.append(g1DetailTable(['Content field', 'Type', 'Position', 'Limit'], rows));
  else pane.append(g1Node('p', 'No separate content fields in the workbook.'));
  return pane;
}

function g1CloseDetail() {
  if (!g1Detail) return;
  g1Detail.button.setAttribute('aria-expanded', 'false');
  g1Detail.panel.hidden = true;
  g1Detail.panel.replaceChildren();
  document.querySelector('[data-g3-inline-active]')?.removeAttribute('data-g3-inline-active');
  g1Detail = null;
}

function g1OpenDetail(button, panel, section, key) {
  if (g1Detail?.button === button) return;
  g1CloseDetail();
  const teams = g1Node('div', '', 'g3-fields__teams');
  teams.setAttribute('role', 'group');
  teams.setAttribute('aria-label', 'Choose a team');
  const content = g1Node('div', '', 'g3-fields__content g3-section-fields__content');
  const panes = { design: g1DesignDetails(section, key), content: g1ContentDetails(section) };
  for (const [role, pane] of Object.entries(panes)) {
    const rows = (g1ShopifyFields[key] ?? []).filter(field => field[3] === role).map(([label, id, block]) => [
      label, g1Node('code', id), block,
    ]);
    if (!rows.length) continue;
    const schema = g1Node('details', '', 'g3-fields__settings');
    schema.append(g1Node('summary', 'Shopify fields'), g1DetailTable(['Theme Editor label', 'Liquid ID', 'Block'], rows));
    pane.append(schema);
  }
  const buttons = {};
  function select(team) {
    g1Team = team;
    for (const role of ['design', 'content']) {
      buttons[role].setAttribute('aria-pressed', String(role === team));
      panes[role].hidden = role !== team;
    }
    content.scrollTop = 0;
  }
  for (const [role, title, label] of [['design', 'Design', 'Images & video'], ['content', 'Content', 'Text fields']]) {
    const tab = g1Node('button');
    tab.type = 'button';
    tab.dataset.g1Team = role;
    tab.append(g1Node('span', title), g1Node('strong', label));
    tab.addEventListener('click', () => select(role));
    buttons[role] = tab;
    teams.append(tab);
    content.append(panes[role]);
  }
  select(g1Team);
  const footer = g1Node('div', '', 'g3-fields__footer');
  const browserButton = g1Node('button', 'Shopify fields', 'g3-fields__reveal');
  browserButton.type = 'button';
  browserButton.addEventListener('click', () => g1FieldBrowser.open(section.id.toLowerCase()));
  footer.append(browserButton);
  panel.append(teams, content, footer);
  panel.hidden = false;
  button.setAttribute('aria-expanded', 'true');
  g1Detail = { button, panel };
}

for (const [index, section] of g1Sections.entries()) {
  const id = section.id.toLowerCase();
  const tag = document.getElementById('sec-' + id);
  const button = g1Node('button', '', 'g3-section-toggle');
  button.type = 'button';
  button.id = tag.id + '-toggle';
  button.setAttribute('aria-expanded', 'false');
  const content = g1Node('span', '', 'hb-sec-tag__inner');
  for (const side of tag.firstElementChild.children) {
    const span = g1Node('span', '', side.className);
    span.append(...side.childNodes);
    content.append(span);
  }
  const arrow = g1Node('span', '', 'g3-section-toggle__chevron');
  arrow.setAttribute('aria-hidden', 'true');
  content.lastElementChild.append(g1Node('span', 'Details', 'g3-section-toggle__label'), arrow);
  button.append(content);
  tag.classList.add('g3-section-heading');
  tag.replaceChildren(button);

  const panel = g1Node('section', '', 'g3-section-fields');
  panel.id = tag.id + '-details';
  panel.hidden = true;
  panel.setAttribute('aria-labelledby', button.id);
  button.setAttribute('aria-controls', panel.id);
  tag.after(panel);
  button.addEventListener('click', () => {
    if (g1Detail?.button === button) g1CloseDetail();
    else g1OpenDetail(button, panel, section, index + 1);
  });
  if ((g1Query.get('fields') === id && g1Query.get('view') !== 'fields') || location.hash === '#' + id) {
    document.addEventListener('DOMContentLoaded', () => {
      const jump = document.getElementById('hb-jump');
      if (!document.body.classList.contains('is-embed')) jump.value = tag.id;
      g1OpenDetail(button, panel, section, index + 1);
      requestAnimationFrame(() => scrollToHandbookSection(tag));
    }, { once: true });
  }
}
