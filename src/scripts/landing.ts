const toast = document.getElementById('toast');
let toastTimer: ReturnType<typeof setTimeout> | undefined;

function showToast(message: string) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 1800);
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('已复制到剪贴板');
  } catch {
    showToast('复制失败，请手动选择');
  }
}

function initTabs() {
  for (const root of document.querySelectorAll<HTMLElement>('[data-tabs]')) {
    const buttons = root.querySelectorAll<HTMLButtonElement>('[data-tab]');
    const panels = root.querySelectorAll<HTMLElement>('[data-panel]');

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const name = button.dataset.tab;
        buttons.forEach((item) => {
          const active = item === button;
          item.classList.toggle('is-active', active);
          item.setAttribute('aria-selected', String(active));
        });
        panels.forEach((panel) => {
          panel.classList.toggle('is-active', panel.dataset.panel === name);
        });
      });
    });
  }
}

function initCopyButtons() {
  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-copy-target]')) {
    button.addEventListener('click', () => {
      const target = button.dataset.copyTarget;
      if (!target) return;

      if (target === 'window') {
        const windowEl = button.closest('.code-window');
        const code =
          windowEl?.querySelector<HTMLElement>('.code-tab-panel.is-active pre') ??
          windowEl?.querySelector<HTMLElement>('pre');
        if (code) void copyText(code.innerText.replace(/\n$/, ''));
        return;
      }

      const node = document.querySelector<HTMLElement>(target);
      if (node) void copyText(node.textContent?.trim() ?? '');
    });
  }
}

function initMenu() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('hidden') === false;
    toggle.setAttribute('aria-expanded', String(open));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initFeatureGlow() {
  for (const card of document.querySelectorAll<HTMLElement>('.feature-card')) {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--y', `${event.clientY - rect.top}px`);
    });
  }
}

initTabs();
initCopyButtons();
initMenu();
initFeatureGlow();