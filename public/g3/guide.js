(() => {
  const doc = document.documentElement;
  const embedded = new URLSearchParams(location.search).get('embed') === '1';
  if (embedded) doc.dataset.embedded = '';

  const jump = document.getElementById('guide-jump');
  jump.addEventListener('change', () => {
    const target = document.getElementById(jump.value);
    if (!target) return;
    target.scrollIntoView({ block: 'start', behavior: 'instant' });
    history.replaceState(null, '', '#' + jump.value);
  });

  const sizes = document.getElementById('guide-sizes');
  const positionBadge = (badge) => {
    const { left, right } = badge.parentElement.getBoundingClientRect();
    const width = badge.offsetWidth;
    badge.dataset.edge = right < width + 8 && left + width <= innerWidth - 4 ? 'left' : 'right';
  };
  const positionBadges = () => document.querySelectorAll('.guide-size').forEach(positionBadge);
  sizes.addEventListener('click', () => {
    const enabled = doc.toggleAttribute('data-show-sizes');
    sizes.setAttribute('aria-pressed', String(enabled));
    sizes.textContent = enabled ? 'Hide sizes' : 'Show sizes';
    if (enabled) positionBadges();
  });
  window.addEventListener('resize', positionBadges, { passive: true });
  document.addEventListener('pointerover', (event) => {
    const badge = event.target.closest('[data-g3-media]')?.querySelector('.guide-size');
    if (badge) positionBadge(badge);
  });

  const phone = document.getElementById('guide-phone');
  document.getElementById('guide-mobile').addEventListener('click', () => {
    const frame = phone.querySelector('iframe');
    if (!frame.getAttribute('src')) frame.src = '/g3/?embed=1' + location.hash;
    phone.showModal();
  });

  const toast = document.querySelector('.guide-toast');
  let toastTimer;
  document.addEventListener('click', async (event) => {
    const badge = event.target.closest('[data-copy-spec]');
    if (!badge) return;
    const title = badge.querySelector('strong').textContent;
    const values = Array.from(badge.querySelectorAll('.guide-size-line'), (line) =>
      Array.from(line.children, (part) => part.textContent).join(' ')
    );
    try {
      await navigator.clipboard.writeText([title, ...values].join('\n'));
      toast.textContent = 'Source sizes copied';
    } catch {
      toast.textContent = 'Sizes are available in Media specs.';
    }
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 1900);
  });

  positionBadges();
})();
