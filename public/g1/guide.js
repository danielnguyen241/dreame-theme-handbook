'use strict';

const layout = document.getElementById('layout');
const jump = document.getElementById('sections');
const panels = new Map();

function node(tag, text, className) {
  const element = document.createElement(tag);
  if (text) element.textContent = text;
  if (className) element.className = className;
  return element;
}

function populated(value) {
  return value && value !== '-';
}

function facts(entries) {
  const list = node('dl', '', 'facts');
  for (const [label, value] of entries) {
    if (populated(value)) list.append(node('dt', label), node('dd', value));
  }
  return list;
}

function referenceImage(reference, section) {
  const box = node('figure', '', 'reference');
  const image = node('img');
  image.src = reference.path;
  image.width = reference.width;
  image.height = reference.height;
  image.alt = section.name;
  image.loading = 'lazy';
  const labels = {
    us: 'Ảnh chụp PDP X50 Ultra US',
    module: 'Hình minh họa từ Module Library',
    layout: 'Mẫu trong workbook đã bỏ lớp chữ nhập trên web',
  };
  const source = node('a', 'Mở ảnh tham chiếu');
  source.href = reference.path;
  source.target = '_blank';
  source.rel = 'noopener';
  const caption = node('figcaption');
  caption.append(node('span', labels[reference.kind]), source);
  box.append(image, caption);
  return box;
}

function designDetails(section) {
  const view = node('div');
  const media = section.media;
  if (media) {
    view.append(facts([
      ['Hạng mục', media.asset],
      ['Khổ xuất / tỷ lệ', media.size],
      ['Chữ được phép trong ảnh', media.imageText],
      ['Vùng chừa cho chữ web', media.clearSpace],
      ['Nguồn media trong brief', media.source],
    ]));
  } else {
    view.append(node('p', 'Media Order không có hạng mục riêng cho section này.'));
  }
  if (media?.note && media.note !== section.note) view.append(node('p', media.note, 'note'));
  if (section.id === 'G1-25') view.append(node('p', 'Khổ bản vẽ áp dụng cho M25. M26 cần chốt phạm vi trước khi order media.', 'note'));
  if (section.clean) view.append(referenceImage(section.clean, section));
  return view;
}

function contentDetails(section) {
  const view = node('div');
  if (!section.fields.length) {
    view.append(node('p', 'Content Input không có dòng riêng cho section này.'));
    return view;
  }
  const table = node('table');
  const header = table.createTHead().insertRow();
  for (const label of ['Field trong brief', 'Loại', 'Vị trí', 'Giới hạn']) {
    const column = node('th', label);
    column.scope = 'col';
    header.append(column);
  }
  const body = table.createTBody();
  for (const field of section.fields) {
    const row = body.insertRow();
    for (const value of [field.name, field.kind, field.location, field.limit]) row.append(node('td', value || '—'));
  }
  const scroller = node('div', '', 'table-scroll');
  scroller.tabIndex = 0;
  scroller.setAttribute('aria-label', 'Bảng field nội dung');
  scroller.append(table);
  view.append(scroller);
  return view;
}

function sectionPanel(section) {
  const panel = node('details', '', 'section');
  panel.id = section.id.toLowerCase();
  const summary = node('summary');
  const title = node('span', '', 'section-title');
  title.append(node('span', section.id, 'id'), node('strong', section.name));
  const meta = node('span', '', 'section-meta');
  meta.append(node('span', section.vnModules.join(' + '), 'module'));
  if (section.optional) meta.append(node('span', 'Tùy chọn', 'optional'));
  summary.append(title, meta);
  panel.append(summary);

  panel.addEventListener('toggle', () => {
    if (!panel.open || panel.childElementCount > 1) return;
    const body = node('div', '', 'section-body');
    const visual = node('div', '', 'visual');
    if (section.reference) visual.append(referenceImage(section.reference, section));
    const moduleDescription = section.moduleDetails.map(module => module.layout).filter(Boolean).join(' · ');
    visual.append(facts([
      ['Module gốc US', section.module],
      ['Module áp dụng VN', section.vnModules.join(' + ')],
      ['Bố cục', moduleDescription],
      ['Ghi chú', section.note],
    ]));

    const brief = node('div', '', 'brief');
    const tabs = node('div', '', 'team-switch');
    tabs.setAttribute('role', 'group');
    tabs.setAttribute('aria-label', 'Nhóm thực hiện');
    const design = node('button', 'Ảnh & video', '');
    const content = node('button', 'Nội dung', '');
    design.type = content.type = 'button';
    const designView = designDetails(section);
    const contentView = contentDetails(section);
    function select(showContent) {
      design.setAttribute('aria-pressed', String(!showContent));
      content.setAttribute('aria-pressed', String(showContent));
      designView.hidden = showContent;
      contentView.hidden = !showContent;
    }
    design.addEventListener('click', () => select(false));
    content.addEventListener('click', () => select(true));
    select(new URLSearchParams(location.search).get('team') === 'content');
    tabs.append(design, content);
    brief.append(tabs, designView, contentView);
    body.append(visual, brief);
    panel.append(body);
  });
  return panel;
}

for (const section of g1Sections) {
  const panel = sectionPanel(section);
  const option = node('option', section.id + ' · ' + section.name);
  option.value = panel.id;
  panels.set(panel.id, panel);
  jump.append(option);
  layout.append(panel);
}

function openSection(key, scroll) {
  const panel = panels.get(key);
  if (!panel) return false;
  panel.open = true;
  jump.value = key;
  if (scroll) requestAnimationFrame(() => panel.scrollIntoView({ block: 'start' }));
  return true;
}

jump.addEventListener('change', () => {
  if (openSection(jump.value, true)) history.replaceState(history.state, '', '#' + jump.value);
});
window.addEventListener('hashchange', () => openSection(location.hash.slice(1), true));
if (!openSection(location.hash.slice(1) || new URLSearchParams(location.search).get('fields'), true)) {
  openSection('g1-04', false);
}
