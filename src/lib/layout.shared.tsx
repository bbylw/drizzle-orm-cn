import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { basePath } from '@/lib/shared';

function Logo() {
  return (
    <span className="inline-flex items-center gap-2">
      <img src={`${basePath}logo.svg`} alt="Drizzle" width={116} height={22} className="h-[21px] w-auto" />
    </span>
  );
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
      url: basePath,
    },
    themeSwitch: { enabled: false },
  };
}