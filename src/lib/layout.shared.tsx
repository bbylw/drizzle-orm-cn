import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { officialDocs } from './shared';

function Logo() {
  return (
    <span className="inline-flex items-center gap-2">
      <img src="/logo.svg" alt="Drizzle" width={116} height={22} className="h-[21px] w-auto" />
      <span className="rounded-full border border-fd-primary/25 bg-fd-primary/10 px-2 py-0.5 text-[10px] font-medium tracking-wide text-fd-primary">
        中文文档
      </span>
    </span>
  );
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
      url: '/',
    },
    themeSwitch: { enabled: false },
    links: [
      {
        type: 'button',
        text: '官方英文站',
        url: officialDocs,
        external: true,
        secondary: true,
        on: 'menu',
      },
    ],
  };
}