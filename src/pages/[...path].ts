import type { APIRoute, GetStaticPaths } from 'astro';
import { docsLlms } from '@/lib/source';
import { basePath } from '@/lib/shared';

export const prerender = true;

export const getStaticPaths = (async () => {
  const paths: { params: { path: string }; props: { full: string } }[] = [];
  for (const path of await docsLlms.files()) {
    const rel = path.startsWith(basePath) ? path.slice(basePath.length) : path.slice(1);
    paths.push({ params: { path: decodeURI(rel) }, props: { full: path } });
  }
  return paths;
}) satisfies GetStaticPaths;

// remarkLlms slices links from the authored source, so the mdast base-links
// plugin never reaches text outputs; prefix root-relative links here instead.
function withBaseLinks(text: string) {
  if (basePath === '/') return text;
  return text.replace(/\]\((\/[^)\s]*)\)/g, (match, url: string) => {
    if (url.startsWith('//') || url.startsWith(basePath)) return match;
    return `](${basePath}${url.slice(1)})`;
  });
}

export const GET: APIRoute = async ({ props }) => {
  const res = (await docsLlms.serve((props as { full: string }).full))!;
  if (basePath === '/') return res;
  return new Response(withBaseLinks(await res.text()), { headers: res.headers });
};