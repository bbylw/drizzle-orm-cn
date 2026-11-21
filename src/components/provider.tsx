import { navigate } from 'astro:transitions/client';
import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/astro';
import SearchDialog from '@/components/search';
import { uiTranslations } from '@/lib/i18n';

export interface ProviderProps {
  /** `Astro.url.pathname` */
  pathname: string;
  /** `Astro.params` */
  params: Record<string, string | undefined>;
  children?: ReactNode;
}

export function Provider({ pathname, params, children }: ProviderProps) {
  return (
    <RootProvider
      pathname={pathname}
      params={params}
      navigate={navigate}
      theme={{ enabled: false }}
      i18n={{ locale: 'zh-CN', translations: uiTranslations }}
      search={{ SearchDialog }}
    >
      {children}
    </RootProvider>
  );
}