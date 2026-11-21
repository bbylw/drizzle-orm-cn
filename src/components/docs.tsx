import { type SerializedPageTree, useFumadocsLoader } from 'fumadocs-core/source/client';
import type { TOCItemType } from 'fumadocs-core/toc';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import {
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
} from 'fumadocs-ui/layouts/docs/page';
import { Provider, type ProviderProps } from '@/components/provider';
import { baseOptions } from '@/lib/layout.shared';
import { githubUrl } from '@/lib/shared';

function GithubFooter() {
  return (
    <a
      href={githubUrl}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-between gap-2 rounded-lg border border-fd-border bg-fd-card/60 px-3 py-2.5 text-sm font-medium text-fd-muted-foreground transition-colors hover:border-fd-primary/40 hover:text-fd-foreground"
    >
      <span className="inline-flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.921.678 1.856 0 1.34-.012 2.421-.012 2.75 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
        </svg>
        GitHub
      </span>
      <span className="text-xs tabular-nums text-fd-muted-foreground/80">36.3k ↗</span>
    </a>
  );
}

export interface DocsProps extends ProviderProps {
  tree: SerializedPageTree;
  title: string;
  description?: string;
  toc: TOCItemType[];
  markdownUrl: string;
}

/**
 * The React island of docs pages, the content is passed as children.
 */
export function Docs({
  tree,
  title,
  description,
  toc,
  markdownUrl,
  children,
  ...props
}: DocsProps) {
  const data = useFumadocsLoader({ tree });

  return (
    <Provider {...props}>
      <DocsLayout {...baseOptions()} tree={data.tree} sidebar={{ footer: <GithubFooter /> }}>
        <DocsPage toc={toc}>
          <DocsTitle>{title}</DocsTitle>
          <DocsDescription>{description}</DocsDescription>
          <div className="flex flex-row gap-2 items-center border-b -mt-4 pb-6">
            <MarkdownCopyButton markdownUrl={markdownUrl} />
          </div>
          {children}
        </DocsPage>
      </DocsLayout>
    </Provider>
  );
}