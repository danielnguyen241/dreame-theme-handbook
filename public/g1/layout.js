'use strict';

function g1Img(src, alt, width, height, className) {
  const image = g1Node('img');
  image.src = src;
  image.alt = alt || '';
  if (width) image.width = width;
  if (height) image.height = height;
  image.loading = 'lazy';
  if (className) image.className = className;
  return image;
}

function g1Step(number, title, body, media) {
  const step = g1Node('article', '', 'g1-step');
  if (media) step.append(media);
  if (title) step.append(g1Node('h3', title));
  if (body) step.append(g1Node('p', body));
  return step;
}

function g1Portrait(asset, key) {
  return g1MediaElement(asset, key);
}

function g1CopyTabs(key, assets, items) {
  const group = g1Switcher(items.map((item, index) => ({
    label: item.title,
    index,
    asset: assets[index],
  })), key);
  group.classList.add('g1-tabs-below');
  const copies = g1Node('div', '', 'g1-tab-copies');
  items.forEach((item, index) => {
    const copy = g1Node('p', item.body, 'g1-tab-copy');
    copy.hidden = index !== 0;
    copies.append(copy);
  });
  group.append(copies);
  return group;
}

function g1CopyAccordion(key, assets, items) {
  const accordion = g1Node('div', '', 'g1-accordion');
  accordion.dataset.g1Accordion = '';
  const controls = g1Node('div', '', 'g1-accordion__controls');
  const visuals = g1Node('div');
  items.forEach((item, index) => {
    const button = g1Node('button');
    button.type = 'button';
    button.setAttribute('aria-expanded', String(index === 0));
    button.append(g1Node('strong', item.title), g1Node('span', item.body, 'g1-acc-body'));
    const visual = g1MediaElement(assets[index], key + '-' + index);
    visual.id = 'g1-accordion-' + key + '-' + index;
    visual.hidden = index !== 0;
    button.setAttribute('aria-controls', visual.id);
    controls.append(button);
    visuals.append(visual);
  });
  accordion.append(controls, visuals);
  return accordion;
}

function g1Dots(count) {
  const dots = g1Node('div', '', 'g1-dots');
  dots.setAttribute('aria-hidden', 'true');
  for (let index = 0; index < count; index += 1) dots.append(g1Node('i'));
  return dots;
}

function g1BuyColumn() {
  const buy = g1Copy.buy;
  const column = g1Node('div', '', 'g1-buy');
  column.append(g1Node('p', buy.promoNote, 'g1-ref-note'));
  column.append(g1Node('h1', buy.title));
  column.append(g1Node('p', buy.rating, 'g1-buy__rating'));
  const price = g1Node('p', '', 'g1-buy__price');
  price.append(g1Node('span', buy.price), g1Node('s', buy.compare), g1Node('span', buy.off, 'g1-buy__off'));
  column.append(price);
  column.append(g1Node('p', buy.affirm, 'g1-buy__affirm'));
  const bullets = g1Node('ul', '', 'g1-buy__bullets');
  for (const line of buy.bullets) bullets.append(g1Node('li', line));
  column.append(bullets);
  column.append(g1Node('h2', buy.option, 'g1-buy__label'));
  const bundles = g1Node('div', '', 'g1-bundles');
  buy.bundles.forEach((bundle, index) => {
    const card = g1Node('button', '', 'g1-bundle');
    card.type = 'button';
    card.dataset.g1Bundle = String(index);
    card.setAttribute('aria-pressed', String(index === 0));
    card.append(g1Img(bundle.image, bundle.title, 100, 100));
    const meta = g1Node('span', '', 'g1-bundle__meta');
    const priceLine = g1Node('span', '', 'g1-bundle__price');
    priceLine.append(g1Node('span', bundle.price), g1Node('s', bundle.compare), g1Node('span', bundle.badge, 'g1-buy__off'));
    meta.append(g1Node('strong', bundle.title), priceLine);
    if (bundle.text) meta.append(g1Node('small', bundle.text));
    card.append(meta);
    bundles.append(card);
  });
  column.append(bundles);
  column.append(g1Node('h2', buy.together, 'g1-buy__label'));
  const addons = g1Node('div', '', 'g1-addons');
  for (const addon of buy.addons) {
    const card = g1Node('article');
    card.append(g1Img(addon.image, addon.name, 38, 38), g1Node('h3', addon.name), g1Node('span', addon.price));
    addons.append(card);
  }
  column.append(addons);
  const gift = g1Node('div', '', 'g1-gift');
  gift.append(g1Node('h2', buy.giftTitle, 'g1-buy__label'), g1Node('p', buy.giftMessage));
  gift.append(g1Img('https://cdn.shopify.com/s/files/1/0553/1320/3405/files/Dreame_Gift_Card_30.webp?v=1794564399', buy.giftOpen.name, 64, 64));
  gift.append(g1Node('p', buy.giftOpen.name + ' ' + buy.giftOpen.now));
  column.append(gift);
  const actions = g1Node('div', '', 'g1-buy__actions');
  actions.append(g1Node('span', buy.addToCart, 'g1-btn g1-btn--solid'), g1Node('span', buy.buyNow, 'g1-btn'));
  column.append(actions);
  const services = g1Node('ul', '', 'g1-services');
  for (const service of buy.services) {
    const item = g1Node('li');
    item.append(g1Img(service.src, '', service.w, service.h), g1Node('span', service.label));
    services.append(item);
  }
  column.append(services);
  column.append(g1Node('h2', buy.firework, 'g1-buy__label'));
  const firework = g1Node('div', '', 'g1-firework__row');
  const posters = [
    'https://cdn7.fireworktv.com/medias/2025/4/24/1745478904-prvqygnz/transcoded/240x400/X50Ultra.jpg.62.jpg',
    'https://cdn5.fireworktv.com/medias/2025/5/27/1748336641-zhiyptuj/transcoded/240x400/UnboxingthenewDreameX50Ultrawithlila_drila.jpg.62.jpg',
    'https://cdn4.fireworktv.com/medias/2025/7/30/1753860229-toupylrs/transcoded/240x400/X50Ultra.jpg.62.jpg',
  ];
  for (const src of posters) firework.append(g1Img(src, buy.firework, 108, 168));
  column.append(firework);
  return column;
}

function g1MediaRow(assets, key, className) {
  const row = g1Node('div', '', className);
  assets.forEach((asset, index) => row.append(g1MediaElement(asset, key + '-' + index)));
  return row;
}

function g1UsLayout(key, body, assets) {
  if (key === 5) {
    const deck = g1Node('div', '', 'g1-cards g1-bento');
    assets.forEach((asset, index) => {
      const card = g1Node('article', '', 'g1-card');
      card.append(g1MediaElement(asset, '5-' + index));
      deck.append(card);
    });
    body.append(deck, g1Dots(assets.length));
    return;
  }
  if (key === 6) {
    body.append(g1MediaRow(assets, 6, 'g1-expert-grid g1-media-row'));
    return;
  }
  if (key === 7) {
    body.append(g1MediaRow(assets, 7, 'g1-press-logos'));
    return;
  }
  if (key === 13 || key === 20) {
    const count = key === 20 ? 4 : assets.length;
    body.append(g1MediaRow(assets.slice(0, count), key, 'g1-tab-frames'));
    if (key === 20 && assets[4]) body.append(g1MediaElement(assets[4], '20-4'));
    body.append(g1Dots(count));
    return;
  }
  if (key === 17) {
    body.append(g1MediaRow(assets.slice(0, 5), 17, 'g1-tab-frames'));
    body.append(g1Dots(5));
    if (assets.length > 5) {
      const icons = g1Node('div', '', 'g1-icon-row');
      assets.slice(5).forEach((asset, index) => icons.append(g1MediaElement(asset, '17-' + (index + 5))));
      body.append(icons);
    }
    return;
  }
  if (key === 21) {
    body.append(g1MediaRow(assets, 21, 'g1-cards g1-carousel'));
    body.append(g1Dots(assets.length));
    return;
  }
  if (key === 22) {
    const slides = assets.slice(0, 3).map((asset, index) => {
      const slide = g1Node('article', '', 'g1-hslide');
      slide.append(g1MediaElement(asset, '22-' + index));
      return slide;
    });
    body.append(g1HScroll(slides), g1Dots(3));
    if (assets[3]) body.append(g1MediaElement(assets[3], '22-3'));
    return;
  }
  if (key === 23) {
    body.append(g1MediaRow(assets.slice(0, 4), 23, 'g1-connect-media'));
    if (assets.length > 4) {
      const icons = g1Node('div', '', 'g1-icon-row');
      assets.slice(4).forEach((asset, index) => icons.append(g1MediaElement(asset, '23-' + (index + 4))));
      body.append(icons);
    }
    return;
  }
  if (key === 24) {
    const hero = assets.find(asset => asset.role === 'Package hero') || assets[0];
    const thumbs = assets.filter(asset => asset.role === 'Grid thumbnail');
    const enlarged = assets.filter(asset => asset.role === 'Accessory enlarged view');
    if (hero) body.append(g1MediaElement(hero, '24-0'));
    const grid = g1Node('div', '', 'g1-pack-grid');
    thumbs.forEach((asset, index) => grid.append(g1MediaElement(asset, '24-' + (index + 1))));
    body.append(grid);
    const hidden = g1Node('div', '', 'g1-pack-zoom');
    hidden.hidden = true;
    enlarged.forEach((asset, index) => hidden.append(g1MediaElement(asset, '24-' + (thumbs.length + 1 + index))));
    body.append(hidden);
    return;
  }
  if (key === 26) return;
  if (key === 27) {
    const photos = g1Node('div', '', 'g1-review-photos');
    const sources = [
      'https://review-images.judgeme.com/dreame/1786840523__img_5911__original.jpeg?quality=80&width=160',
      'https://review-images.judgeme.com/dreame/1771377529__img_9452__original.jpeg?quality=80&width=160',
      'https://review-images.judgeme.com/dreame/1771377530__img_9451__original.jpeg?quality=80&width=160',
      'https://review-images.judgeme.com/dreame/1763387753__image__original.jpg?quality=80&width=160',
      'https://review-images.judgeme.com/dreame/1762748886__0__K7cRLdUP__31DGbJr-4xL._SY200__original.jpg?quality=80&width=160',
      'https://review-images.judgeme.com/dreame/1760750294__image__original.jpg?quality=80&width=160',
    ];
    for (const src of sources) photos.append(g1Img(src, '', 80, 80));
    body.append(photos);
    return;
  }
  body.append(g1MediaRow(assets, key, 'g1-us-stack'));
}

function g1Highlights(assets) {
  const deck = g1Cards(assets, 5, 'g1-bento');
  deck.querySelectorAll('.g1-card h3').forEach((heading, index) => {
    heading.textContent = g1Copy.highlights[index];
  });
  const ui = g1Node('div', '', 'g1-bento-ui');
  const play = g1Node('button', '', 'g1-bento-play');
  play.type = 'button';
  play.dataset.g1BentoPlay = '';
  play.setAttribute('aria-pressed', 'true');
  const pause = g1Node('span', g1Copy.ui.pause);
  const playLabel = g1Node('span', g1Copy.ui.play);
  playLabel.hidden = true;
  play.append(pause, playLabel);
  const dots = g1Node('div', '', 'g1-bento-dots');
  assets.forEach((_, index) => {
    const dot = g1Node('button', '', 'g1-dot');
    dot.type = 'button';
    dot.dataset.g1Dot = String(index);
    dot.setAttribute('aria-label', g1Copy.ui.slide + ' ' + (index + 1));
    dot.setAttribute('aria-current', String(index === 0));
    dots.append(dot);
  });
  ui.append(play, dots);
  const wrap = g1Node('div', '', 'g1-bento-wrap');
  wrap.dataset.g1Bento = '';
  wrap.append(deck, ui);
  return wrap;
}

function g1Pros(assets) {
  const block = g1Node('div', '', 'g1-pros');
  block.append(g1Node('h2', g1Copy.pros.title, 'g3-group-heading'));
  const grid = g1Node('div', '', 'g1-expert-grid');
  const videos = ['Q8yIdW3uoTE', '39OtFmiLcsM', '9nuiowaPHzQ'];
  g1Copy.pros.cards.forEach((card, index) => {
    const article = g1Node('article', '', 'g1-expert-card');
    const frame = g1Node('div', '', 'g1-expert-thumb');
    frame.append(g1MediaElement(assets[index * 2], '6-' + (index * 2)));
    const play = g1Link('', 'https://www.youtube.com/watch?v=' + videos[index]);
    play.className = 'g1-play';
    play.setAttribute('aria-label', g1Copy.ui.watch);
    play.append(g1Node('span', '▶', 'g1-play__icon'));
    frame.append(play);
    const channel = g1Node('div', '', 'g1-expert-channel');
    const logo = g1MediaElement(assets[index * 2 + 1], '6-' + (index * 2 + 1));
    logo.classList.add('g1-mark');
    const meta = g1Node('div', '', 'g1-expert-meta');
    meta.append(g1Node('h3', card.channel), g1Node('p', card.subs, 'g1-subs'));
    channel.append(logo, meta);
    article.append(frame, channel, g1Node('p', card.quote, 'g1-expert-quote'));
    grid.append(article);
  });
  const wrap = g1Node('div', '', 'g1-expert-scroll');
  const controls = g1Node('div', '', 'g3-controls');
  for (const [dir, label] of [[-1, 'Previous review'], [1, 'Next review']]) {
    const button = g1Node('button', dir < 0 ? '‹' : '›');
    button.type = 'button';
    button.dataset.g1ExpertDir = String(dir);
    button.setAttribute('aria-label', label);
    controls.append(button);
  }
  wrap.append(grid, controls);
  block.append(wrap);
  return block;
}

function g1Press(assets) {
  const block = g1Node('div');
  block.append(g1Node('h2', g1Copy.press.title, 'g3-group-heading'));
  const grid = g1Node('div', '', 'g1-press-grid');
  g1Copy.press.quotes.forEach((quote, index) => {
    const card = g1Node('article', '', 'g3-quote');
    card.append(g1MediaElement(assets[index], '7-' + index), g1Node('p', quote));
    grid.append(card);
  });
  block.append(g1ScrollCards(grid, 'g1-press-scroll'));
  return block;
}

function g1HScroll(slides) {
  const root = g1Node('div', '', 'g1-hscroll');
  root.dataset.g1Hscroll = '';
  const track = g1Node('div', '', 'g1-hscroll__track');
  track.dataset.g1Htrack = '';
  slides.forEach(slide => track.append(slide));
  const bar = g1Node('div', '', 'g1-hscroll__bar');
  bar.append(g1Node('span'));
  root.append(track, bar);
  return root;
}

function g1Stat(value, label) {
  const item = g1Node('p');
  if (value) item.append(g1Node('strong', value));
  if (label) item.append(g1Node('span', label));
  return item;
}

function g1PinStory(steps) {
  const story = g1Node('div', '', 'g1-pin');
  story.dataset.g1Pin = '';
  story.style.setProperty('--g1-steps', String(Math.max(steps.length, 1)));
  const stage = g1Node('div', '', 'g1-pin__stage');
  const media = g1Node('div', '', 'g1-pin__media');
  const copy = g1Node('div', '', 'g1-pin__copy');
  steps.forEach((step, index) => {
    if (step.asset) {
      const frame = g1MediaElement(step.asset, step.mediaKey);
      frame.classList.add('g1-pin__frame');
      frame.dataset.g1Step = String(index);
      frame.hidden = index !== 0;
      media.append(frame);
    }
    const text = g1Node('div', '', 'g1-pin__step');
    text.dataset.g1Step = String(index);
    text.hidden = index !== 0;
    if (step.title) text.append(g1Node('h2', step.title));
    if (step.body) text.append(g1Node('p', step.body));
    if (step.stats) {
      const row = g1Node('div', '', 'g1-pin__stats');
      for (const [value, label] of step.stats) row.append(g1Stat(value, label));
      text.append(row);
    }
    copy.append(text);
  });
  stage.append(media, g1Node('div', '', 'g1-pin__mask'), copy);
  story.append(stage);
  return story;
}

function g1CoverCopy(asset, key, ...nodes) {
  const wrap = g1Node('div', '', 'g1-cover-copy');
  wrap.append(g1MediaElement(asset, key));
  const text = g1Node('div', '', 'g1-cover-copy__text');
  for (const node of nodes) text.append(node);
  wrap.append(text);
  return wrap;
}

function g1FeatureMedia(asset, key, chip) {
  const wrap = g1Node('div', '', 'g1-feature');
  wrap.append(g1MediaElement(asset, key));
  if (chip) wrap.append(chip);
  return wrap;
}

function g1MarkCell(value) {
  if (value === '✓') return g1Node('span', '✓', 'g1-tick');
  if (value === '×' || value === 'x' || value === 'X') return g1Node('span', '×', 'g1-cross');
  return value;
}

function g1PackCaption(caption) {
  const raw = caption.textContent.replace(/ · enlarged view$/, '');
  const match = raw.match(/^(.*)\s+(x\d+)$/i);
  caption.replaceChildren();
  if (match) caption.append(g1Node('span', match[1], 'g1-pack-name'), g1Node('span', match[2], 'g1-pack-qty'));
  else caption.append(g1Node('span', raw, 'g1-pack-name'));
}

function g1Warning() {
  const banner = g1Node('aside', '', 'g3 g1-warning');
  banner.id = 'g1-p65';
  const line = g1Node('p', '', 'g3-wrap');
  const link = g1Link(g1Copy.warning.link, 'https://www.p65warnings.ca.gov/');
  line.append(g1Node('strong', g1Copy.warning.lead), g1Node('span', ' ' + g1Copy.warning.body + ' '), link, g1Node('span', '.'));
  banner.append(line);
  return banner;
}

function g1RenderSection(key, body, assets) {
  if (key === 4) {
    const scene = g1Node('div', '', 'g3-hero__scene');
    if (assets[0]) scene.append(g1MediaElement(assets[0], '4-0'));
    const copy = g1Node('div', '', 'g3-wrap g3-hero__copy');
    copy.append(g1Node('h2', g1Copy.hero[0]));
    const subtitle = g1Node('p');
    subtitle.append(g1Node('span', g1Copy.hero[1]), document.createTextNode(' '), g1Node('span', g1Copy.hero[2]));
    copy.append(subtitle);
    scene.append(copy);
    body.append(scene);
    return;
  }
  if (key === 5) {
    body.append(g1Highlights(assets));
    return;
  }
  if (key === 6) {
    body.append(g1Pros(assets));
    return;
  }
  if (key === 7) {
    body.append(g1Press(assets));
    return;
  }
  if (key === 8) {
    body.append(g1PinStory([
      { title: g1Copy.clear.title, asset: assets[0], mediaKey: '8-0' },
      { body: g1Copy.clear.body },
    ]));
    return;
  }
  if (key === 9) {
    body.append(g1Node('h2', g1Copy.ledges.title, 'g3-group-heading'));
    body.append(g1MediaElement(assets[0], '9-0'));
    const stack = g1Node('div', '', 'g1-stack');
    for (const block of g1Copy.ledges.blocks) {
      const card = g1Node('article');
      card.append(g1Node('h3', block.title), g1Node('p', block.body));
      stack.append(card);
    }
    body.append(stack);
    return;
  }
  if (key === 10) {
    const pair = g1Node('div', '', 'g1-compare-pair');
    g1Copy.versus.forEach((card, index) => {
      const article = g1Node('article', '', 'g1-versus');
      const frame = g1Node('div', '', 'g1-versus__frame');
      const media = g1MediaElement(assets[index], '10-' + index);
      const cover = assets[index + 2];
      const video = media.querySelector('video');
      if (cover && video) {
        video.poster = cover.desktop.preview;
        video.dataset.posterDesktop = cover.desktop.preview;
        video.dataset.posterMobile = cover.mobile.preview;
      }
      frame.append(media);
      if (cover) {
        const poster = g1MediaElement(cover, '10-' + (index + 2));
        poster.classList.add('g1-versus__poster');
        frame.append(poster);
      }
      const badge = g1Node('p', '', 'g1-versus__badge');
      badge.append(g1Node('span', card.kicker || 'with'), g1Node('b', card.name));
      frame.append(badge);
      article.append(frame, g1Node('p', card.body, 'g1-versus__caption'));
      pair.append(article);
    });
    body.append(pair);
    return;
  }
  if (key === 11) {
    body.append(g1Node('h2', g1Copy.legs.title, 'g3-group-heading'));
    body.append(g1MediaElement(assets[0], '11-0'), g1Node('p', g1Copy.legs.body));
    body.append(g1Node('h2', g1Copy.legs.mapTitle, 'g3-group-heading'));
    body.append(g1MediaElement(assets[1], '11-1'));
    const tabs = g1Switcher(g1Copy.legs.tabs.map(tab => ({ label: tab.title, copy: tab.body })), 'legs');
    tabs.classList.add('g1-tabs-below');
    body.append(tabs);
    return;
  }
  if (key === 12) {
    const copy = g1Copy.avoid;
    const intro = g1Node('div', '', 'g1-twotext');
    const head = g1Node('div', '', 'g1-twotext__head');
    head.append(g1Node('h2', copy.obstacles.title), g1Node('p', copy.obstacles.body, 'g1-twotext__desk'));
    const chip = g1Node('p', '', 'g1-stat-chip');
    chip.append(g1Node('strong', copy.obstacles.stat), g1Node('span', copy.obstacles.statLabel));
    intro.append(head, g1FeatureMedia(assets[0], '12-0', chip), g1Node('p', copy.obstacles.body, 'g1-twotext__mob'));
    const light = g1CoverCopy(assets[1], '12-1', g1Node('h2', copy.light.title), g1Node('p', copy.light.body));
    const turbo = g1CoverCopy(assets[3], '12-3', g1Node('h2', copy.turbo.title), g1Node('p', copy.turbo.body));
    const hairStats = g1Node('div', '', 'g1-hair-stats');
    for (const [value, label] of copy.hair.stats) hairStats.append(g1Stat(value, label));
    const hair = g1Node('div', '', 'g1-hair');
    hair.append(g1Node('h2', copy.hair.title), g1FeatureMedia(assets[4], '12-4', hairStats), g1Node('p', copy.hair.body));
    body.append(
      intro,
      light,
      g1PinStory([{ title: copy.peace.title, asset: assets[2], mediaKey: '12-2' }]),
      turbo,
      hair,
    );
    return;
  }
  if (key === 13) {
    body.append(g1Node('h2', g1Copy.brushes.title, 'g3-group-heading'));
    body.append(g1CopyTabs(13, assets, g1Copy.brushes.tabs));
    return;
  }
  if (key === 14) {
    const reach = g1Copy.reach;
    const layout = g1Node('div', '', 'g1-side-reach g1-bleed');
    if (assets[0]) layout.append(g1MediaElement(assets[0], '14-0'));
    const copy = g1Node('div');
    copy.append(g1Node('h2', reach.title), g1Node('p', reach.body));
    const stats = g1Node('dl', '', 'g1-sidereach-stats');
    for (const [value, label] of reach.stats) stats.append(g1Node('dt', label), g1Node('dd', value));
    layout.append(copy, stats);
    body.append(layout);
    body.append(g1Node('h2', reach.corners, 'g3-group-heading'), g1Node('p', reach.cornersBody, 'g1-story__body'));
    return;
  }
  if (key === 15) {
    const pair = g1Node('div', '', 'g1-cards g1-pair');
    g1Copy.triple.forEach((card, index) => {
      const article = g1Node('article', '', 'g1-card');
      article.append(g1MediaElement(assets[index], '15-' + index), g1Node('h3', card.title), g1Node('p', card.body));
      pair.append(article);
    });
    body.append(pair);
    return;
  }
  if (key === 16) {
    const copy = g1Copy.dock;
    const chip = g1Node('p', '', 'g1-stat-chip');
    chip.append(g1Node('span', copy.statLabel), g1Node('strong', copy.stat));
    const follow = g1Node('div', '', 'g1-follow g1-follow--dark');
    const inner = g1Node('div', '', 'g1-follow__inner');
    inner.append(g1Node('h2', copy.title), g1Node('p', copy.body), g1FeatureMedia(assets[1], '16-1', chip));
    follow.append(inner);
    body.append(g1PinStory([{ title: copy.overlay, asset: assets[0], mediaKey: '16-0' }]), follow);
    return;
  }
  if (key === 17) {
    const copy = g1Copy.dockFeatures;
    body.append(g1CopyAccordion(17, assets.slice(0, 5), copy.items));
    const icons = g1Node('div', '', 'g1-dock-icons');
    assets.slice(5, 7).forEach((asset, index) => {
      const item = g1Node('div');
      item.append(g1MediaElement(asset, '17-' + (index + 5)), g1Node('span', copy.items[0].icons[index]));
      icons.append(item);
    });
    body.append(icons);
    body.append(g1Node('h2', copy.dirtTitle, 'g3-group-heading'), g1Node('p', copy.dirtBody));
    if (assets[7]) body.append(g1MediaElement(assets[7], '17-7'));
    return;
  }
  if (key === 18) {
    body.append(g1CopyAccordion(18, assets.slice(0, 2), g1Copy.remop));
    return;
  }
  if (key === 19) {
    const copy = g1Copy.carpetApp;
    const follow = g1Node('div', '', 'g1-follow');
    const inner = g1Node('div', '', 'g1-follow__inner');
    inner.append(g1Node('h2', copy.title), g1Node('p', copy.body), g1FeatureMedia(assets[1], '19-1'));
    follow.append(inner);
    body.append(
      g1PinStory([{ title: copy.overlay, body: copy.line, asset: assets[0], mediaKey: '19-0' }]),
      follow,
    );
    return;
  }
  if (key === 20) {
    body.append(g1CopyTabs(20, assets.slice(0, 4), g1Copy.carpetModes.tabs));
    if (assets[4]) {
      body.append(g1Node('h2', g1Copy.carpetModes.end, 'g3-group-heading'));
      body.append(g1MediaElement(assets[4], '20-4'));
    }
    return;
  }
  if (key === 21) {
    body.append(g1Node('h2', g1Copy.pets.title, 'g3-group-heading'));
    const deck = g1Node('div', '', 'g1-cards g1-carousel');
    g1Copy.pets.cards.forEach((card, index) => {
      const article = g1Node('article', '', 'g1-card');
      article.append(g1MediaElement(assets[index], '21-' + index), g1Node('h3', card.title), g1Node('p', card.body));
      deck.append(article);
    });
    body.append(g1ScrollCards(deck));
    return;
  }
  if (key === 22) {
    const group = g1Node('div', '', 'g3-switcher g1-switcher g1-tabs-below g1-split-tabs');
    group.dataset.g3Switcher = '';
    const tabs = g1Node('div', '', 'g3-switcher__tabs');
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', 'Cleaning features');
    const panels = g1Node('div', '', 'g3-switcher__panels');
    g1Copy.slides.items.forEach((item, index) => {
      const id = 'g1-tab-22-' + index;
      const button = g1Node('button', item.title);
      button.type = 'button';
      button.id = id;
      button.dataset.g3Tab = '';
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-selected', String(index === 0));
      button.setAttribute('aria-controls', id + '-panel');
      button.tabIndex = index === 0 ? 0 : -1;
      const panel = g1Node('div');
      panel.id = id + '-panel';
      panel.dataset.g3Panel = '';
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', id);
      panel.hidden = index !== 0;
      const head = g1Node('div', '', 'g1-split');
      head.append(g1Node('h3', item.title), g1Node('p', item.body));
      panel.append(head);
      if (assets[index]) panel.append(g1MediaElement(assets[index], '22-' + index));
      tabs.append(button);
      panels.append(panel);
    });
    group.append(tabs, panels);
    body.append(group);
    const matter = g1Node('div', '', 'g1-matter');
    matter.append(g1Node('h2', g1Copy.slides.matter.title, 'g3-group-heading'), g1Node('p', g1Copy.slides.matter.body));
    if (assets[3]) matter.append(g1MediaElement(assets[3], '22-3'));
    body.append(matter);
    return;
  }
  if (key === 23) {
    const copy = g1Copy.connected;
    body.append(g1Node('h2', copy.title, 'g3-group-heading'));
    const bento = g1Node('div', '', 'g1-connect');
    const watch = g1Node('article', '', 'g1-connect__watch');
    watch.append(g1Node('h3', copy.watch.title), g1Node('p', copy.watch.body), g1MediaElement(assets[0], '23-0'));
    const voice = g1Node('article');
    voice.append(g1Node('h3', copy.voice.title), g1Node('p', copy.voice.body));
    if (assets[1]) voice.append(g1MediaElement(assets[1], '23-1'));
    const icons = g1Node('div', '', 'g1-connected-icons');
    assets.slice(4, 8).forEach((asset, index) => {
      const item = g1Node('div');
      item.append(g1MediaElement(asset, '23-' + (index + 4)), g1Node('span', copy.voice.icons[index]));
      icons.append(item);
    });
    voice.append(icons);
    const widgets = g1Node('article');
    widgets.append(g1Node('h3', copy.widgets.title), g1Node('p', copy.widgets.body));
    if (assets[2]) widgets.append(g1MediaElement(assets[2], '23-2'));
    bento.append(watch, voice, widgets);
    body.append(bento);
    const charge = g1Node('div', '', 'g1-charge');
    charge.append(g1Node('h2', copy.charge.title, 'g3-group-heading'), g1Node('p', copy.charge.body));
    if (assets[3]) charge.append(g1MediaElement(assets[3], '23-3'));
    const stats = g1Node('div', '', 'g1-statrow g1-statrow--four');
    for (const stat of copy.charge.stats) stats.append(g1Node('p', stat));
    charge.append(stats);
    body.append(charge);
    return;
  }
  if (key === 24) {
    body.append(g1Node('h2', g1Copy.box.title, 'g3-group-heading'));
    const layout = g1PackList(assets);
    const figures = [...layout.querySelectorAll('.g1-pack-items > figure')];
    figures.forEach((figure, index) => {
      if (index >= 4) figure.classList.add('g1-pack-past-mobile');
      if (index >= 9) figure.classList.add('g1-pack-past-desktop');
    });
    layout.querySelectorAll('figcaption').forEach(g1PackCaption);
    const more = g1Node('button', '', 'g1-pack-more');
    more.type = 'button';
    more.dataset.g1PackMore = '';
    more.setAttribute('aria-expanded', 'false');
    const moreLabel = g1Node('span', g1Copy.box.more);
    const lessLabel = g1Node('span', g1Copy.box.less);
    lessLabel.hidden = true;
    more.append(moreLabel, lessLabel);
    layout.append(more);
    body.append(layout);
    return;
  }
  if (key === 25) {
    const copy = g1Copy.specs;
    body.append(g1Node('h2', copy.title, 'g3-group-heading'));
    if (assets[0]) body.append(g1MediaElement(assets[0], '25-0'));
    const groups = g1Node('div', '', 'g1-spec-groups');
    for (const [title, lines] of [
      [copy.robot, [[copy.dimensions, copy.robotDims[0]], [copy.dimensions, copy.robotDims[1]], [copy.weight, copy.robotWeight]]],
      [copy.station, [[copy.dimensions, copy.stationDims], [copy.weight, copy.stationWeight]]],
    ]) {
      const group = g1Node('section');
      group.append(g1Node('h3', title));
      const list = g1Node('dl', '', 'g3-spec-table');
      for (const [label, value] of lines) {
        list.append(g1Node('dt', label), g1Node('dd', value));
      }
      group.append(list);
      groups.append(group);
    }
    body.append(groups);
    body.append(g1Node('h2', copy.compareTitle, 'g3-group-heading'));
    const table = g1DetailTable(['', 'X50 Ultra', 'X40 Ultra'], copy.rows.map(row => row.map((cell, index) => index ? g1MarkCell(cell) : cell)));
    table.className = 'g1-compare-table';
    const head = table.tHead.rows[0];
    if (assets[1]) head.cells[0].append(g1MediaElement(assets[1], '25-1'));
    ['X50 Ultra', 'X40 Ultra'].forEach((name, index) => {
      const cell = head.cells[index + 1];
      cell.replaceChildren(g1Node('span', copy.newBadge, 'g1-new'), g1Node('strong', name));
    });
    body.append(table);
    const remarks = g1Node('section', '', 'g1-remarks');
    remarks.append(g1Node('h2', copy.remarksTitle));
    for (const line of copy.remarks) remarks.append(g1Node('p', line));
    body.append(remarks);
    return;
  }
  if (key === 26) {
    body.append(g1Node('h2', g1Copy.faq.title, 'g3-group-heading'));
    const faq = g1Node('div', '', 'g3-faq');
    g1Copy.faq.items.forEach((item, index) => {
      const details = g1Node('details');
      details.append(g1Node('summary', item[0]), g1Node('p', item[1]));
      if (index === 4) {
        const temps = g1Node('ul');
        for (const temp of g1Copy.faq.temps) temps.append(g1Node('li', temp));
        details.append(temps);
      }
      faq.append(details);
    });
    body.append(faq);
    return;
  }
  if (key === 27) {
    const copy = g1Copy.reviews;
    body.append(g1Node('h2', copy.title, 'g3-group-heading'));
    const summary = g1Node('div', '', 'g1-reviews__summary');
    summary.append(g1Node('strong', copy.average), g1Node('p', copy.based));
    const histogram = g1Node('div', '', 'g1-histogram');
    const highest = Math.max(...copy.histogram.map(row => Number(row[1]))) || 1;
    for (const [star, count] of copy.histogram) {
      const row = g1Node('p');
      const bar = g1Node('span', '', 'g1-hist-bar');
      const fill = g1Node('i');
      fill.style.width = (Number(count) / highest * 100) + '%';
      bar.append(fill);
      row.append(g1Node('span', star), bar, g1Node('span', count));
      histogram.append(row);
    }
    summary.append(histogram);
    body.append(summary);
    const actions = g1Node('p', '', 'g1-reviews__actions');
    actions.append(g1Node('span', copy.write, 'g1-btn'), g1Node('span', copy.ask, 'g1-btn'));
    body.append(actions);
    body.append(g1Node('h3', copy.photos));
    const photos = g1Node('div', '', 'g1-review-photos');
    const sources = [
      'https://review-images.judgeme.com/dreame/1786840523__img_5911__original.jpeg?quality=80&width=160',
      'https://review-images.judgeme.com/dreame/1771377529__img_9452__original.jpeg?quality=80&width=160',
      'https://review-images.judgeme.com/dreame/1771377530__img_9451__original.jpeg?quality=80&width=160',
      'https://review-images.judgeme.com/dreame/1763387753__image__original.jpg?quality=80&width=160',
      'https://review-images.judgeme.com/dreame/1762748886__0__K7cRLdUP__31DGbJr-4xL._SY200__original.jpg?quality=80&width=160',
      'https://review-images.judgeme.com/dreame/1762748886__0__osa_4sVH__71i4uqttdcL._SY200__original.jpg?quality=80&width=160',
      'https://review-images.judgeme.com/dreame/1760750294__image__original.jpg?quality=80&width=160',
      'https://review-images.judgeme.com/dreame/1762748894__0__HQqqRDFC__617DbwhDvtL._SY200__original.jpg?quality=80&width=160',
    ];
    for (const src of sources) photos.append(g1Img(src, 'User picture', 80, 80));
    body.append(photos);
    const medal = g1Node('p', '', 'g1-medal');
    medal.append(g1Img('https://public-images.judge.me/judgeme/medals-v2-2025-rebranding/auth/silver.svg?auto=format', copy.medalLabel, 80, 80), g1Node('strong', copy.medal));
    body.append(medal);
    const tabs = g1Node('p', '', 'g1-review-tabs');
    tabs.append(g1Node('span', copy.reviewsTab), g1Node('span', copy.questionsTab));
    body.append(tabs);
    const list = g1Node('div', '', 'g1-review-list');
    for (const [date, author, title, text] of copy.items) {
      const card = g1Node('article');
      card.append(g1Node('time', date), g1Node('span', author), g1Node('h3', title), g1Node('p', text));
      list.append(card);
    }
    body.append(list);
    const pages = g1Node('p', '', 'g1-review-pages');
    for (const page of ['1', '2', '3']) pages.append(g1Node('span', page));
    body.append(pages);
  }
}

function g1MountExtra(root) {
  const bento = root.querySelector('[data-g1-bento]');
  if (bento) {
    const track = bento.querySelector('[data-g3-track]');
    const cards = [...track.children];
    const dots = [...bento.querySelectorAll('[data-g1-dot]')];
    const play = bento.querySelector('[data-g1-bento-play]');
    let index = 0;
    let timer = 0;
    let playing = true;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    function go(next) {
      if (!cards.length) return;
      index = (next + cards.length) % cards.length;
      const card = cards[index];
      track.scrollTo({ left: card.offsetLeft, behavior: reduced.matches ? 'instant' : 'smooth' });
      dots.forEach((dot, dotIndex) => dot.setAttribute('aria-current', String(dotIndex === index)));
    }
    function stop() { window.clearInterval(timer); }
    function start() {
      stop();
      if (!playing || reduced.matches || !window.matchMedia('(max-width: 850px)').matches) return;
      timer = window.setInterval(() => go(index + 1), 3200);
    }
    play.addEventListener('click', () => {
      playing = !playing;
      play.querySelector('span').hidden = !playing;
      play.querySelector('span + span').hidden = playing;
      play.setAttribute('aria-pressed', String(playing));
      if (playing) start();
      else stop();
    });
    dots.forEach(dot => dot.addEventListener('click', () => { go(Number(dot.dataset.g1Dot)); start(); }));
    start();
  }
  const scroller = root.querySelector('[data-g1-hscroll]');
  if (scroller) {
    const track = scroller.querySelector('[data-g1-htrack]');
    const fill = scroller.querySelector('.g1-hscroll__bar span');
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      fill.style.transform = 'scaleX(' + (max > 0 ? track.scrollLeft / max : 0) + ')';
    };
    track.addEventListener('scroll', update, { passive: true });
    update();
  }
  root.querySelectorAll('.g1-tabs-below').forEach(group => {
    group.addEventListener('click', event => {
      const tab = event.target.closest('[data-g3-tab]');
      if (!tab || !group.contains(tab)) return;
      const index = [...group.querySelectorAll('[data-g3-tab]')].indexOf(tab);
      group.querySelectorAll('.g1-tab-copies p').forEach((copy, copyIndex) => {
        copy.hidden = copyIndex !== index;
      });
    });
  });
  root.querySelectorAll('[data-g1-pin]').forEach(pin => {
    const stage = pin.querySelector('.g1-pin__stage');
    const mask = pin.querySelector('.g1-pin__mask');
    const steps = [...pin.querySelectorAll('.g1-pin__step')];
    const frames = [...pin.querySelectorAll('.g1-pin__frame')];
    let current = -1;
    const show = (index, progress) => {
      if (index !== current) {
        current = index;
        steps.forEach((step, stepIndex) => { step.hidden = stepIndex !== index; });
        let frameIndex = 0;
        frames.forEach((frame, position) => {
          if (Number(frame.dataset.g1Step) <= index) frameIndex = position;
        });
        frames.forEach((frame, position) => {
          const active = position === frameIndex;
          frame.hidden = !active;
          const video = frame.querySelector('video');
          if (!video) return;
          if (active) video.play().catch(() => {});
          else video.pause();
        });
      }
      const active = steps[index];
      if (active) active.style.opacity = steps.length === 1 ? String(0.2 + progress * 0.8) : '1';
      if (mask) mask.style.transform = 'translateY(' + ((1 - progress) * 100) + '%)';
    };
    const update = () => {
      const top = stage.getBoundingClientRect().top;
      const pinTop = pin.getBoundingClientRect().top;
      const travel = Math.max(pin.offsetHeight - stage.offsetHeight, 1);
      const progress = Math.min(1, Math.max(0, (top - pinTop) / travel));
      show(Math.min(steps.length - 1, Math.floor(progress * steps.length * 0.999)), progress);
    };
    pin._g1Update = update;
    update();
  });
  const pinView = root.ownerDocument.defaultView;
  if (pinView && !pinView.__g1PinBound) {
    pinView.__g1PinBound = true;
    const onScroll = () => pinView.document.querySelectorAll('[data-g1-pin]').forEach(pin => pin._g1Update?.());
    pinView.addEventListener('scroll', onScroll, { passive: true });
    pinView.addEventListener('resize', onScroll);
  }
  root.querySelectorAll('.g1-versus video').forEach(video => {
    const frame = video.closest('.g1-versus__frame');
    const reveal = () => frame?.classList.add('is-playing');
    video.addEventListener('playing', reveal);
    if (video.readyState >= 2 && !video.paused) reveal();
  });
  root.querySelectorAll('[data-g1-bundle]').forEach(button => {
    button.addEventListener('click', () => {
      button.parentElement.querySelectorAll('[data-g1-bundle]').forEach(peer => {
        peer.setAttribute('aria-pressed', String(peer === button));
      });
    });
  });
  root.querySelectorAll('.g1-expert-scroll').forEach(wrap => {
    const track = wrap.querySelector('.g1-expert-grid');
    wrap.addEventListener('click', event => {
      const button = event.target.closest('[data-g1-expert-dir]');
      if (!button || !track) return;
      const card = track.querySelector('.g1-expert-card');
      const gap = parseFloat(getComputedStyle(track).columnGap) || 20;
      track.scrollBy({
        left: Number(button.dataset.g1ExpertDir) * (card.offsetWidth + gap),
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      });
    });
  });
  const more = root.querySelector('[data-g1-pack-more]');
  if (more) {
    more.addEventListener('click', () => {
      const layout = more.closest('.g1-pack-layout');
      const open = layout.classList.toggle('is-open');
      more.children[0].hidden = open;
      more.children[1].hidden = !open;
      more.setAttribute('aria-expanded', String(open));
    });
  }
  root.querySelectorAll('[data-g1-model]').forEach(button => {
    button.addEventListener('click', () => {
      for (const peer of root.querySelectorAll('[data-g1-model]')) {
        peer.setAttribute('aria-pressed', String(peer === button));
      }
    });
  });
}
