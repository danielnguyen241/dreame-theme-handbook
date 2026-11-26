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
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('aria-label', asset.label);
    video.dataset.g3Video = '';
    video.dataset.desktop = desktop.url;
    video.dataset.mobile = mobile.url;
    video.src = desktop.url;
    if (desktop.size.length) {
      video.width = desktop.size[0];
      video.height = desktop.size[1];
    }
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
  for (const [device, source] of Object.entries({ desktop, mobile })) {
    if (source.size.length) slot.style.setProperty('--g1-' + device + '-ratio', source.size.join('/'));
    if (source.usFrame) slot.style.setProperty('--g1-us-' + device + '-ratio', source.usFrame.join('/'));
  }
  if (asset.role === 'Desktop feature art') slot.classList.add('g1-desktop-art');
  for (const [device, width] of [['desktop', 1440], ['mobile', 390]]) {
    if (asset[device].usFrame?.[0] === width) slot.classList.add('g1-full-' + device);
  }
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
  if (mode === 'g1-carousel') return g1ScrollCards(deck);
  if (mode === 'g1-bento') return g1ScrollCards(deck, 'g1-bento-scroll');
  return deck;
}

function g1ScrollCards(deck, className) {
  const group = g1Node('div', '', 'g3-scroll-group');
  group.dataset.g3Scroll = '';
  if (className) group.classList.add(className);
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
    card.append(g1MediaElement(asset, '7-' + index), g1Node('p', quotes[index]));
    group.append(card);
  }
  return g1ScrollCards(group, 'g1-press-scroll');
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
  hero.id = 'g1-pack-hero';
  hero.append(g1MediaElement(assets[0], '24-0'), g1Node('figcaption', assets[0].label));
  const viewer = g1Node('div', '', 'g1-pack-viewer');
  viewer.append(hero);
  const items = g1Node('div', '', 'g1-pack-items');
  const slots = assets.map((asset, index) => ({ asset, index }));
  const thumbnails = slots.filter(({ asset }) => asset.role === 'Grid thumbnail');
  const enlargements = slots.filter(({ asset }) => asset.role === 'Accessory enlarged view');
  for (const [position, { asset, index }] of thumbnails.entries()) {
    const enlargement = enlargements[position];
    const panel = g1Node('figure', '', 'g1-pack-enlarged');
    panel.dataset.g1PackDetail = String(index);
    panel.id = 'g1-pack-detail-' + index;
    panel.hidden = true;
    const close = g1Node('button', 'Close');
    close.type = 'button';
    close.dataset.g1PackClose = '';
    close.setAttribute('aria-controls', hero.id);
    panel.append(g1MediaElement(enlargement.asset, '24-' + enlargement.index), g1Node('figcaption', asset.label), close);
    viewer.append(panel);

    const card = g1Node('figure');
    const control = g1Node('button', '+');
    control.type = 'button';
    control.dataset.g1PackOpen = String(index);
    control.setAttribute('aria-controls', panel.id);
    control.setAttribute('aria-expanded', 'false');
    control.setAttribute('aria-label', asset.label);
    card.append(g1MediaElement(asset, '24-' + index), control, g1Node('figcaption', asset.label));
    items.append(card);
  }
  layout.append(viewer, items);
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
  layout.append(g1MediaElement(asset, '14-0'), copy, stats);
  return layout;
}

function g1ConnectedRows(assets) {
  const list = g1Node('div', '', 'g1-connected-rows');
  const description = [
    'Control cleaning from a supported Apple Watch.',
    'Start cleaning with a compatible voice assistant.',
    'Open the controls from phone widgets.',
    'Battery and charging on the US X50 Ultra PDP.',
  ];
  for (const [index, asset] of assets.slice(0, 4).entries()) {
    const row = g1Node('article');
    const copy = g1Node('div');
    copy.append(g1Node('h3', asset.label), g1Node('p', description[index]));
    if (index === 1) {
      const icons = g1Node('div', '', 'g1-connected-icons');
      assets.slice(4).forEach((icon, i) => icons.append(g1MediaElement(icon, '23-' + (i + 4))));
      copy.append(icons);
    }
    row.append(copy, g1MediaElement(asset, '23-' + index));
    list.append(row);
  }
  return list;
}

function g1Comparison(assets) {
  const comparison = g1Node('div', '', 'g1-compare-pair');
  for (const [index, asset] of assets.slice(0, 2).entries()) {
    const card = g1Node('article');
    const media = g1MediaElement(asset, '10-' + index);
    const cover = assets[index + 2];
    if (cover) {
      const video = media.querySelector('video');
      video.dataset.posterDesktop = cover.desktop.preview;
      video.dataset.posterMobile = cover.mobile.preview;
      const reference = g1MediaElement(cover, '10-' + (index + 2));
      const details = g1Node('details', '', 'g1-video-cover');
      details.append(g1Node('summary', 'Video cover'), reference);
      card.append(g1Node('h3', asset.label), media, details);
    } else card.append(g1Node('h3', asset.label), media);
    comparison.append(card);
  }
  return comparison;
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
  for (const pack of root.querySelectorAll('.g1-pack-layout')) {
    pack.addEventListener('click', event => {
      const button = event.target.closest('[data-g1-pack-open], [data-g1-pack-close]');
      if (!button) return;
      const open = button.hasAttribute('data-g1-pack-open') && button.getAttribute('aria-expanded') === 'false';
      const activeControl = pack.querySelector('[data-g1-pack-open][aria-expanded="true"]');
      const hero = pack.querySelector('.g1-pack-hero');
      const panels = pack.querySelectorAll('[data-g1-pack-detail]');
      hero.hidden = open;
      for (const panel of panels) panel.hidden = !open || panel.id !== button.getAttribute('aria-controls');
      for (const control of pack.querySelectorAll('[data-g1-pack-open]')) {
        control.setAttribute('aria-expanded', String(open && control === button));
      }
      const view = root.ownerDocument.defaultView;
      if (open && view.matchMedia('(max-width: 850px)').matches) {
        hero.parentElement.scrollIntoView({ block: 'center', behavior: 'instant' });
      }
      if (!open) activeControl?.focus();
    });
  }
  if (typeof g1MountExtra === 'function') g1MountExtra(root);
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
  const gallery = g1Switcher((g1Media[2] || []).map((asset, index) => ({ asset, label: asset.label, index })), 2, true);
  gallery.id = 'g1-02';
  const column = g1Node('div', '', 'guide-gallery-column');
  column.append(gallery);
  const text = g1Node('div', '', 'guide-buybox__text');
  text.append(g1BuyColumn());
  buyInner.append(column, text);
  buy.append(buyInner);
  g1Stage.append(buy, g1Nav());

  for (let key = 4; key <= 27; key++) {
    const section = g1Sections[key - 1];
    const assets = g1Media[key] ?? [];
    const block = g1Node('section', '', 'g3 g3-section g1-block');
    block.id = section.id.toLowerCase();
    if (key === 4) {
      block.className = 'g3 g3-hero g1-block';
      g1RenderSection(key, block, assets);
      g1Stage.append(block);
      continue;
    }
    if ([21, 22, 23, 24, 25, 26, 27].includes(key)) block.classList.add('g3-light-panel');
    const body = g1Node('div', '', 'g3-wrap g1-block__inner');
    g1RenderSection(key, body, assets);
    block.append(body);
    g1Stage.append(block);
    if (key === 25) g1Stage.append(g1Warning());
  }
}

function g1BuildTable() {
  const head = g1Table.createTHead().insertRow();
  for (const text of ['ID', 'Section name', 'Image / video', 'Desktop file (px)', 'Mobile file (px)', 'US frame · Desktop', 'US frame · Mobile', 'Versions', 'Desktop source', 'Image']) {
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
        if (source === asset.mobile && asset.role === 'Desktop feature art') {
          cell.textContent = 'Desktop only';
          continue;
        }
        cell.append(g1Link(g1Size(source) || 'Unverified', source.url));
        if (source.ratio) cell.append(g1Node('small', source.ratio));
      }
      for (const source of [asset.desktop, asset.mobile]) {
        const cell = row.insertCell();
        cell.className = 'guide-dimensions';
        cell.textContent = source.usFrame?.join(' × ')
          || (source === asset.mobile && asset.role === 'Desktop feature art' ? 'Desktop only' : '—');
        if (source.usFrameRatio) cell.append(g1Node('small', source.usFrameRatio));
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
      pc: g1Size(asset.desktop), mb: asset.role === 'Desktop feature art' ? '' : g1Size(asset.mobile),
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
const g1AuditDate = document.getElementById('g1-audit-date');
g1AuditDate.dateTime = g1USAudit.date;
g1AuditDate.textContent = g1USAudit.date.split('-').reverse().join('/');
const g1Browser = prepareG1FieldBrowser(g1Configs);
initHandbook(g1Configs);
const g1FieldBrowser = initG3ShopifyFields(g1Browser.sections, {
  sectionData: g1Browser.sectionData,
  defaultSection: 'g1-04',
  previewStylesheet: '/g1/guide.css',
  mountControls: mountG1Controls,
  sourceURL: g1Reference,
  exampleHeading: 'X50 Ultra example or source',
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
  const enlarged = target.closest('[data-g1-pack-detail][hidden]');
  if (enlarged) document.querySelector('[data-g1-pack-open="' + enlarged.dataset.g1PackDetail + '"]')?.click();
  const cover = target.closest('.g1-video-cover');
  if (cover) cover.open = true;
  const packageHero = target.closest('.g1-pack-hero[hidden]');
  if (packageHero) packageHero.parentElement.querySelector('[data-g1-pack-detail]:not([hidden]) [data-g1-pack-close]')?.click();
  if (target.hidden) {
    document.querySelector('[aria-controls="' + target.id + '"]')?.click();
  }
  document.querySelector('[data-g3-inline-active]')?.removeAttribute('data-g3-inline-active');
  target.setAttribute('data-g3-inline-active', '');
  scrollToHandbookSection(target);
}

function g1Join(items) {
  return items.filter(Boolean).join('\n');
}

function g1SectionCopy(key) {
  const c = g1Copy;
  if (key === 4) return [['Hero', c.hero.join('\n')]];
  if (key === 5) return c.highlights.map((title, index) => ['Tile ' + (index + 1), title]);
  if (key === 6) return [['Heading', c.pros.title]].concat(c.pros.cards.map(card => [card.channel, card.subs + '\n' + card.quote]));
  if (key === 7) return [['Heading', c.press.title]].concat(c.press.quotes.map((quote, index) => ['Quote ' + (index + 1), quote]));
  if (key === 8) return [['Heading', c.clear.title], ['Body', c.clear.body]];
  if (key === 9) return [['Heading', c.ledges.title]].concat(c.ledges.blocks.map(block => [block.title, block.body]));
  if (key === 10) return c.versus.map(card => [card.title, g1Join([card.kicker, card.name, card.body])]);
  if (key === 11) return [['Heading', c.legs.title], ['Body', c.legs.body], ['Heading', c.legs.mapTitle]].concat(c.legs.tabs.map(tab => [tab.title, tab.body]));
  if (key === 12) return [
    [c.avoid.obstacles.title, c.avoid.obstacles.body + '\n' + c.avoid.obstacles.stat + ' ' + c.avoid.obstacles.statLabel],
    [c.avoid.light.title, c.avoid.light.body],
    [c.avoid.peace.title, ''],
    [c.avoid.turbo.title, c.avoid.turbo.body],
    [c.avoid.hair.title, c.avoid.hair.body],
  ];
  if (key === 13) return [['Heading', c.brushes.title]].concat(c.brushes.tabs.map(tab => [tab.title, tab.body]));
  if (key === 14) return [[c.reach.title, c.reach.body], [c.reach.corners, c.reach.cornersBody]].concat(c.reach.stats.map(stat => [stat[0], stat[1]]));
  if (key === 15) return c.triple.map(card => [card.title, card.body]);
  if (key === 16) return [[c.dock.overlay, ''], [c.dock.title, c.dock.body], [c.dock.statLabel, c.dock.stat]];
  if (key === 17) return c.dockFeatures.items.map(item => [item.title, item.body]).concat([[c.dockFeatures.dirtTitle, c.dockFeatures.dirtBody]]);
  if (key === 18) return c.remop.map(item => [item.title, item.body]);
  if (key === 19) return [[c.carpetApp.overlay, c.carpetApp.line], [c.carpetApp.title, c.carpetApp.body]];
  if (key === 20) return c.carpetModes.tabs.map(tab => [tab.title, tab.body]).concat([['End', c.carpetModes.end]]);
  if (key === 21) return [['Heading', c.pets.title]].concat(c.pets.cards.map(card => [card.title, card.body]));
  if (key === 22) return c.slides.items.map(item => [item.title, item.body]).concat([[c.slides.matter.title, c.slides.matter.body]]);
  if (key === 23) return [
    ['Heading', c.connected.title],
    [c.connected.watch.title, c.connected.watch.body],
    [c.connected.voice.title, c.connected.voice.body + '\n' + c.connected.voice.icons.join(', ')],
    [c.connected.widgets.title, c.connected.widgets.body],
    [c.connected.charge.title, c.connected.charge.body + '\n' + c.connected.charge.stats.join('\n')],
  ];
  if (key === 24) return [['Heading', c.box.title]];
  if (key === 25) return [
    ['Heading', c.specs.title],
    [c.specs.robot, c.specs.robotDims.join('\n') + '\n' + c.specs.robotWeight],
    [c.specs.station, c.specs.stationDims + '\n' + c.specs.stationWeight],
    [c.specs.compareTitle, ''],
  ].concat(c.specs.rows.map(row => [row[0], row[1] + ' | ' + row[2]])).concat(c.specs.remarks.map((line, index) => ['Remark ' + (index + 1), line]));
  if (key === 26) return c.faq.items.map(item => [item[0], item[1]]).concat(c.faq.temps.map(line => ['Temperature', line]));
  if (key === 27) return [[c.reviews.title, c.reviews.average + '\n' + c.reviews.based]].concat(c.reviews.items.map(item => [item[2], item[0] + ' ' + item[1] + '\n' + item[3]]));
  return [];
}

function g1BuyCopyTable() {
  const buy = g1Copy.buy;
  const rows = [
    ['Product title', buy.title],
    ['Rating', buy.rating],
    ['Price', buy.price + '  ' + buy.compare + '  ' + buy.off],
    ['HSA/FSA', buy.hsa],
    ['Bullets', buy.bullets.join('\n')],
    ['Affirm', buy.affirm + '  ' + buy.affirmDate],
  ];
  buy.bundles.forEach((bundle, index) => {
    rows.push(['Bundle ' + (index + 1), [bundle.badge, bundle.title, bundle.price, bundle.compare, bundle.text].filter(Boolean).join('\n')]);
  });
  rows.push(['Models', buy.models.map(model => model.name + '  ' + model.price).join('\n')]);
  rows.push(['Colors', buy.colors.join(', ')]);
  rows.push(['Add-ons', buy.addons.map(addon => addon.name + '  ' + addon.price).join('\n')]);
  rows.push(['Gift tabs', buy.giftTabs.join('  ')]);
  rows.push(['Gift message', buy.giftMessage]);
  rows.push(['Open gift', buy.giftOpen.name + '  ' + buy.giftOpen.was + '  ' + buy.giftOpen.now]);
  rows.push(['Buttons', buy.addToCart + '  ' + buy.buyNow]);
  rows.push(['Services', buy.services.map(service => service.label).join('\n')]);
  rows.push(['Share', buy.share.join('  ')]);
  const table = g1DetailTable(['US copy', 'Text'], rows);
  table.className = 'g1-copy-table';
  return table;
}

function g1DetailNotes(key, team) {
  const notes = {
    1: {
      content: [g1Copy.buy.giftClosedNote, g1Copy.buy.fireworkNote, g1Copy.buy.promoNote],
    },
    8: { design: [g1Copy.ui.crop] },
    12: { design: [g1Copy.ui.crop] },
    27: { content: [g1Copy.reviews.note] },
  };
  return notes[key]?.[team] ?? [];
}

function g1Provenance(key) {
  const id = g1USAudit.sections[String(key)];
  const note = g1Node('p', 'Liquid setting IDs for this section were not in the US page DOM on 2026-11-25, so they stay unverified. The live section element id is in Shopify fields.', 'g1-order-note');
  if (id) note.dataset.usSection = id;
  return note;
}

function g1DesignDetails(section, key) {
  const pane = g1Node('div');
  const media = section.media;
  const assets = g1Media[key] ?? [];
  pane.append(g1Facts([
    ['VN module', section.vnModules.join(' + ')],
    ['US file size to order', media?.size],
    ['Text allowed in artwork', media?.imageText],
    ['Keep clear for typed text', media?.clearSpace],
    ['Notes', media?.note || section.note],
  ]));
  pane.append(g1Provenance(key));
  for (const line of g1DetailNotes(key, 'design')) pane.append(g1Node('p', line, 'g1-order-note'));
  if (assets.length) {
    const rows = assets.map((asset, slot) => {
      const button = g1Node('button', asset.label, 'g3-fields__reveal');
      button.type = 'button';
      button.addEventListener('click', () => g1Reveal(key, slot));
      return [button, g1Size(asset.desktop), asset.role === 'Desktop feature art' ? 'Desktop only' : g1Size(asset.mobile),
        asset.desktop.usFrame?.join(' × '),
        asset.mobile.usFrame?.join(' × ') || (asset.role === 'Desktop feature art' ? 'Desktop only' : '')];
    });
    pane.append(g1DetailTable(['US media slot', 'Desktop file (px)', 'Mobile file (px)', 'US frame · Desktop', 'US frame · Mobile'], rows));
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

function g1ContentDetails(section, key) {
  const pane = g1Node('div');
  pane.append(g1Provenance(key));
  for (const line of g1DetailNotes(key, 'content')) pane.append(g1Node('p', line, 'g1-order-note'));
  if (key === 1) pane.append(g1BuyCopyTable());
  const copyRows = g1SectionCopy(key);
  if (copyRows.length) {
    const copyTable = g1DetailTable(['US copy', 'Text'], copyRows);
    copyTable.className = 'g1-copy-table';
    pane.append(copyTable);
  }
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
  const panes = { design: g1DesignDetails(section, key), content: g1ContentDetails(section, key) };
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
  const source = g1Link('View this section on Dreame US', g1Reference + '#' + g1USAudit.sections[key]);
  source.target = '_blank';
  source.rel = 'noopener';
  footer.append(browserButton, source);
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
