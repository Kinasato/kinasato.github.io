document.documentElement.classList.add('js');

const header = document.querySelector('.site-header');
const nav = document.querySelector('.site-nav');
const drawer = document.getElementById('site-drawer');
const menuButton = document.querySelector('[aria-controls="site-drawer"]');
const sections = [...document.querySelectorAll('main .section[id]')];

// ダークモード切替（初期値は <head> 内のスクリプトがOS設定または保存済みの選択から決める）
const root = document.documentElement;
const themeButtons = [...document.querySelectorAll('[data-theme-toggle]')];
const savedTheme = () => {
  try { return localStorage.getItem('theme'); } catch { return null; }
};
const applyTheme = (theme) => {
  root.dataset.theme = theme;
  for (const button of themeButtons) button.setAttribute('aria-pressed', String(theme === 'dark'));
};
for (const button of themeButtons) {
  button.hidden = false;
  button.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', next); } catch {}
    applyTheme(next);
  });
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
  if (!savedTheme()) applyTheme(event.matches ? 'dark' : 'light');
});
applyTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');

// ドロワー（モバイルメニュー）
if (drawer && menuButton && typeof drawer.showModal === 'function') {
  menuButton.hidden = false;
  menuButton.addEventListener('click', () => {
    drawer.showModal();
    menuButton.setAttribute('aria-expanded', 'true');
  });
  drawer.addEventListener('close', () => menuButton.setAttribute('aria-expanded', 'false'));
  drawer.querySelector('[data-drawer-close]').addEventListener('click', () => drawer.close());
  // 背景（::backdrop）のクリックで閉じる
  drawer.addEventListener('click', (event) => {
    if (event.target === drawer) drawer.close();
  });
  // メニュー項目を選んだら閉じて、移動先にフォーカスを移す
  for (const link of drawer.querySelectorAll('a[href^="#"]')) {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.hash);
      if (!target) return;
      event.preventDefault();
      drawer.close();
      history.pushState(null, '', link.hash);
      target.setAttribute('tabindex', '-1');
      target.scrollIntoView();
      target.focus({ preventScroll: true });
    });
  }
}

// 追従ヘッダーの影
const updateStuck = () => {
  const scrolled = window.scrollY > 0;
  header.classList.toggle('is-stuck', scrolled);
  nav.classList.toggle('is-stuck', scrolled && nav.getBoundingClientRect().top <= 0);
};
window.addEventListener('scroll', updateStuck, { passive: true });
updateStuck();

if ('IntersectionObserver' in window) {
  // 現在地のメニュー項目を強調
  const menuLinks = [...document.querySelectorAll('.site-nav a[href^="#"], #site-drawer a[href^="#"]')];
  const setCurrent = (id) => {
    for (const link of menuLinks) {
      const isCurrent = link.hash === `#${id}`;
      if (isCurrent) {
        link.setAttribute('aria-current', 'true');
        if (link.closest('#site-drawer')) link.setAttribute('data-current', '');
      } else {
        link.removeAttribute('aria-current');
        link.removeAttribute('data-current');
      }
    }
  };
  const currentObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) setCurrent(entry.target.id);
    }
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((section) => currentObserver.observe(section));
}

// スキル一覧の絞り込み（ジャンルのチップ色＝領域で判定）
const skillFilter = document.querySelector('.skill-filter');
if (skillFilter) {
  const rows = [...document.querySelectorAll('.skills-table tbody tr')];
  const domainOf = (row) => row.querySelector('.dads-chip-label')?.dataset.color ?? 'gray';
  const filterButtons = [...skillFilter.querySelectorAll('[data-filter]')];
  const status = skillFilter.querySelector('.skill-filter__status');
  const skillCount = document.querySelector('.skill-count');
  if (skillCount) {
    skillCount.textContent = `（全${rows.length}件）`;
    skillCount.hidden = false;
  }
  const labels = new Map();
  for (const button of filterButtons) {
    const key = button.dataset.filter;
    labels.set(key, button.textContent.trim());
    const count = key === 'all' ? rows.length : rows.filter((row) => domainOf(row) === key).length;
    button.append(`（${count}）`);
  }
  const applyFilter = (key) => {
    let shown = 0;
    for (const row of rows) {
      const match = key === 'all' || domainOf(row) === key;
      row.hidden = !match;
      if (match) shown += 1;
    }
    for (const button of filterButtons) {
      const selected = button.dataset.filter === key;
      button.setAttribute('aria-pressed', String(selected));
      button.dataset.type = selected ? 'solid-fill' : 'outline';
    }
    status.textContent = key === 'all'
      ? `全${rows.length}件を表示しています。`
      : `「${labels.get(key)}」の${shown}件を表示しています。`;
  };
  for (const button of filterButtons) {
    button.addEventListener('click', () => applyFilter(button.dataset.filter));
  }
  applyFilter('all');
  skillFilter.hidden = false;
}

// 経歴の在籍期間バー：全期間（最初の入社月〜今月）を軸に、各項目の位置と長さを計算する
(() => {
  const items = [...document.querySelectorAll('.tenure[data-start]')];
  if (!items.length) return;

  const toMonth = (value) => {
    const [y, m] = value.split('-').map(Number);
    return y * 12 + (m - 1);
  };
  const now = new Date();
  const thisMonth = now.getFullYear() * 12 + now.getMonth();
  const axisStart = Math.min(...items.map((el) => toMonth(el.dataset.start)));
  const axisLength = thisMonth - axisStart + 1;

  const formatLength = (months) => {
    const years = Math.floor(months / 12);
    const rest = months % 12;
    if (years === 0) return `${rest}か月`;
    return rest === 0 ? `${years}年` : `${years}年${rest}か月`;
  };

  for (const el of items) {
    const start = toMonth(el.dataset.start);
    const end = el.dataset.end ? toMonth(el.dataset.end) : thisMonth;
    const months = end - start + 1;
    el.style.setProperty('--from', ((start - axisStart) / axisLength).toFixed(4));
    el.style.setProperty('--span', (months / axisLength).toFixed(4));
    el.querySelector('.tenure__length').textContent = `${el.dataset.end ? '' : '継続中・'}${formatLength(months)}`;
    el.hidden = false;
  }
  const note = document.querySelector('.tenure-note');
  if (note) note.hidden = false;
})();
