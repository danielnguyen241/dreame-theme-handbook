'use strict';

const handbookLanguage = (() => {
  const initialUrl = new URL(location.href);
  const requested = initialUrl.searchParams.get('lang');
  const supported = (language) => language === 'vi' || language === 'en';
  // A fresh visit with no ?lang=vi is English. The toggle writes ?lang; nothing is saved,
  // and the browser language is not consulted.
  try {
    localStorage.removeItem('dreame-handbook-language');
  } catch {
    // Storage can be disabled. The page still follows the URL.
  }
  let language = requested === 'vi' ? 'vi' : 'en';
  document.documentElement.lang = language;

  const textSources = new WeakMap();
  const attributeSources = new WeakMap();
  const attributes = ['alt', 'aria-label', 'title'];
  const excluded = 'script, style, svg, noscript, [translate="no"]';
  const csv = document.querySelector('[data-hb-csv]');
  const englishCsv = csv?.getAttribute('href');

  function translate(source) {
    if (language === 'en') return source;
    const clean = source.trim().replace(/\s+/gu, ' ');
    const prefix = clean.match(/^(?:(?:G[123]-\d+|M\d+) · )*/u)[0];
    const key = clean.slice(prefix.length);
    let value = Object.hasOwn(handbookVietnamese, key) ? handbookVietnamese[key] : null;
    const copyPrefix = 'Copy source sizes for ';
    if (key.startsWith(copyPrefix)) {
      value = handbookVietnamese[copyPrefix] + translate(key.slice(copyPrefix.length));
    }
    if (value === null) return source;
    return source.match(/^\s*/u)[0] + prefix + value + source.match(/\s*$/u)[0];
  }

  function localizeText(node) {
    const source = textSources.get(node) ?? node.data;
    const translated = translate(source);
    if (node.data === translated) return;
    textSources.set(node, source);
    node.data = translated;
  }

  function localizeAttributes(node) {
    const state = attributeSources.get(node) ?? {};
    for (const name of attributes) {
      const current = node.getAttribute(name);
      if (current === null) continue;
      const previous = state[name];
      const source = previous?.rendered === current ? previous.source : current;
      const translated = translate(source);
      if (current !== translated) {
        state[name] = { source, rendered: translated };
        attributeSources.set(node, state);
        node.setAttribute(name, translated);
      }
    }
  }

  function localizeTree(root) {
    if (root.nodeType === Node.TEXT_NODE) {
      if (!root.parentElement?.closest(excluded)) localizeText(root);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE || root.closest(excluded)) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.nodeType === Node.ELEMENT_NODE && node.matches(excluded)
          ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    for (let node = root; node; node = walker.nextNode()) {
      if (node.nodeType === Node.TEXT_NODE) localizeText(node);
      else localizeAttributes(node);
    }
  }

  function share(next) {
    const url = new URL(location.href);
    if (next === 'vi') url.searchParams.set('lang', 'vi');
    else url.searchParams.delete('lang');
    history.replaceState(history.state, '', url);
  }

  function set(next) {
    if (!supported(next)) return;
    language = next;
    document.documentElement.lang = next;
    localizeTree(document.documentElement);
    for (const button of document.querySelectorAll('[data-hb-language]')) {
      const active = button.dataset.hbLanguage === next;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    }
    for (const link of document.querySelectorAll('[data-hb-layout-link]')) {
      const target = new URL(link.href);
      target.searchParams.set('lang', next);
      link.href = target.href;
    }
    if (csv) csv.setAttribute('href', next === 'vi' ? csv.dataset.hbCsv : englishCsv);
    document.dispatchEvent(new Event('hb-language-change'));
  }

  document.addEventListener('DOMContentLoaded', () => {
    set(language);
    for (const button of document.querySelectorAll('[data-hb-language]')) {
      button.addEventListener('click', () => {
        const next = button.dataset.hbLanguage;
        if (next === language) return;
        share(next);
        set(next);
      });
    }
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === 'attributes') localizeAttributes(record.target);
        else record.addedNodes.forEach(localizeTree);
      }
    });
    observer.observe(document.body, { subtree: true, childList: true, attributeFilter: attributes });
  });

  return { current: () => language, translate, localize: localizeTree, set };
})();
