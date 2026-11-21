type CopyCommandEvent = Event & { command: string; source: Element | null };
type PopoverToggleEvent = Event & { newState: string };

let lastMessage = '';
let toastClearTimer: ReturnType<typeof setTimeout> | undefined;
const timers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>();
let cleanups: Array<() => void> = [];
let menuOpen = false;

if (!Object.hasOwn(HTMLElement.prototype, 'focusGroup')) {
  void import('@microsoft/focusgroup-polyfill').then(({ polyfill }) => polyfill());
}

if (!Object.hasOwn(HTMLElement.prototype, 'popover')) {
  void import('@oddbird/popover-polyfill');
}

function report(button: HTMLElement, ok: boolean) {
  const toast = document.getElementById('toast');
  clearTimeout(timers.get(button));
  clearTimeout(toastClearTimer);
  button.removeAttribute('data-copied');
  button.removeAttribute('data-failed');
  let message = ok ? '已复制到剪贴板' : '复制失败，请手动选择';
  if (message === lastMessage) message += String.fromCharCode(0xa0);
  lastMessage = message;
  button.setAttribute(ok ? 'data-copied' : 'data-failed', '');
  if (toast) {
    toast.classList.remove('is-visible');
    toast.textContent = '';
    void toast.offsetWidth;
    requestAnimationFrame(() => {
      toast.textContent = message;
      toast.classList.add('is-visible');
    });
  }
  timers.set(
    button,
    setTimeout(() => {
      button.removeAttribute('data-copied');
      button.removeAttribute('data-failed');
      if (!toast) return;
      toast.classList.remove('is-visible');
      toastClearTimer = setTimeout(() => {
        toast.textContent = '';
      }, 300);
    }, 2000),
  );
}

async function copy(button: HTMLElement, target: HTMLElement) {
  const text = target.matches('input, textarea')
    ? (target as HTMLInputElement | HTMLTextAreaElement).value
    : target.innerText.trim();
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    report(button, true);
  } catch {
    report(button, false);
  }
}

document.addEventListener(
  'command',
  (event) => {
    const { command, source } = event as CopyCommandEvent;
    if (!command.startsWith('--copy') || !source) return;
    void copy(source as HTMLElement, event.target as HTMLElement);
  },
  true,
);

if (!('CommandEvent' in window)) {
  document.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest?.('button[command^="--copy"]');
    if (!button) return;
    const target = document.getElementById(button.getAttribute('commandfor') ?? '');
    if (target) void copy(button, target);
  });
}

function selectTab(root: HTMLElement, name: string) {
  for (const tab of root.querySelectorAll<HTMLButtonElement>('[role="tab"]')) {
    const active = tab.dataset.tab === name;
    tab.setAttribute('aria-selected', String(active));
    tab.toggleAttribute('focusgroupstart', active);
    if (active) {
      tab.scrollIntoView({ block: 'nearest', inline: 'nearest', container: 'nearest' });
    }
  }
  for (const panel of root.querySelectorAll<HTMLElement>('[data-panel]')) {
    const active = panel.dataset.panel === name;
    if (active) panel.removeAttribute('hidden');
    else panel.setAttribute('hidden', 'until-found');
    const pre = panel.querySelector('pre');
    if (!pre) continue;
    if (active) pre.tabIndex = 0;
    else pre.removeAttribute('tabindex');
  }
  root.querySelector('[data-copy-window]')?.setAttribute('commandfor', `panel-${name}`);
}

document.addEventListener('focusin', (event) => {
  const tab = (event.target as HTMLElement).closest?.<HTMLElement>('[role="tab"]');
  const root = tab?.closest<HTMLElement>('[data-tabs]');
  if (root && tab?.dataset.tab) selectTab(root, tab.dataset.tab);
});

document.addEventListener('beforematch', (event) => {
  const panel = (event.target as HTMLElement).closest?.<HTMLElement>('[data-panel]');
  const root = panel?.closest<HTMLElement>('[data-tabs]');
  if (root && panel?.dataset.panel) selectTab(root, panel.dataset.panel);
});

document.addEventListener(
  'toggle',
  (event) => {
    if ((event.target as HTMLElement).id !== 'site-menu') return;
    menuOpen = (event as PopoverToggleEvent).newState === 'open';
    document.querySelector('[data-menu-button]')?.setAttribute('aria-expanded', String(menuOpen));
  },
  true,
);

function initNavbar(): () => void {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  const inner = header?.querySelector<HTMLElement>('[data-header-inner]');
  const menu = header?.querySelector<HTMLElement>('#site-menu');
  if (!header || !inner || !menu) return () => {};

  menuOpen = false;
  header.querySelector('[data-menu-button]')?.setAttribute('aria-expanded', 'false');

  let prevWidth = 0;
  const measure = () => {
    const width = inner.clientWidth;
    const wide = header.classList.contains('is-wide');
    if (!wide && width <= prevWidth) {
      prevWidth = width;
      return;
    }
    prevWidth = width;
    const wasOpen = menuOpen;
    header.classList.add('is-measuring', 'is-wide');
    menu.removeAttribute('popover');
    const fits = inner.scrollWidth <= inner.clientWidth;
    if (!fits) {
      header.classList.remove('is-wide');
      menu.setAttribute('popover', 'auto');
      if (wasOpen) {
        requestAnimationFrame(() => {
          if (!header.classList.contains('is-wide')) menu.showPopover?.();
        });
      }
    }
    requestAnimationFrame(() => header.classList.remove('is-measuring'));
  };

  const observer = new ResizeObserver(measure);
  observer.observe(inner);
  observer.observe(menu);
  measure();
  return () => observer.disconnect();
}

document.addEventListener('click', (event) => {
  const button = (event.target as HTMLElement).closest?.<HTMLElement>('[data-marquee-toggle]');
  if (!button) return;
  const track = document.querySelector('.marquee-track');
  if (!track) return;
  const paused = track.classList.toggle('is-paused');
  button.toggleAttribute('data-paused', paused);
  button.setAttribute('aria-label', paused ? '继续滚动' : '暂停滚动');
});

document.addEventListener('pointermove', (event) => {
  const card = (event.target as HTMLElement).closest?.<HTMLElement>('.feature-card');
  if (!card) return;
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--x', `${event.clientX - rect.left}px`);
  card.style.setProperty('--y', `${event.clientY - rect.top}px`);
});

function init() {
  for (const cleanup of cleanups) cleanup();
  cleanups = [];

  for (const panel of document.querySelectorAll<HTMLElement>('[data-panel]')) {
    const pre = panel.querySelector('pre');
    if (!pre) continue;
    if (panel.hasAttribute('hidden')) pre.removeAttribute('tabindex');
    else pre.tabIndex = 0;
  }

  cleanups.push(initNavbar());

  if (!CSS.supports('animation-timeline', 'scroll()')) {
    for (const list of document.querySelectorAll<HTMLElement>('.code-tablist')) {
      const first = list.firstElementChild;
      const last = list.lastElementChild;
      if (!first || !last) continue;
      const observer = new IntersectionObserver(
        (entries) => {
          for (const { target, intersectionRatio } of entries) {
            list.classList.toggle(
              target === first ? 'more-start' : 'more-end',
              intersectionRatio < 1,
            );
          }
        },
        { root: list, threshold: 1, rootMargin: '1px' },
      );
      observer.observe(first);
      observer.observe(last);
      cleanups.push(() => observer.disconnect());
    }
  }
}

document.addEventListener('astro:page-load', init);