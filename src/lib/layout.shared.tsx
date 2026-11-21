import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

function Logo() {
  return (
    <span className="inline-flex items-center gap-2">
      <img src="/logo.svg" alt="Drizzle" width={116} height={22} className="h-[21px] w-auto" />
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
  };
}