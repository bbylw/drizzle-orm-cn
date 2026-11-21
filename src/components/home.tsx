import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { Provider, type ProviderProps } from '@/components/provider';
import { baseOptions } from '@/lib/layout.shared';
import { basePath, docsRoute } from '@/lib/shared';

/**
 * The React island of pages in the home layout, the content is passed as children.
 */
export function Home({ children, ...props }: ProviderProps) {
  return (
    <Provider {...props}>
      <HomeLayout {...baseOptions()}>{children}</HomeLayout>
    </Provider>
  );
}

export function NotFound(props: ProviderProps) {
  return (
    <Home {...props}>
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="font-mono text-sm text-fd-primary">404</p>
        <h1 className="text-2xl font-semibold">页面不存在</h1>
        <p className="text-sm text-fd-muted-foreground">你访问的页面不存在或已被移动。</p>
        <div className="mt-2 flex gap-3">
          <a
            href={basePath}
            className="rounded-lg bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground"
          >
            返回首页
          </a>
          <a
            href={docsRoute}
            className="rounded-lg border border-fd-border px-4 py-2 text-sm font-medium text-fd-muted-foreground"
          >
            浏览文档
          </a>
        </div>
      </div>
    </Home>
  );
}
