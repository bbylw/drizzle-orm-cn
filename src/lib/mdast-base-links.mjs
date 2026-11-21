const base = process.env.PAGES_BASE ?? '/';
const prefix = base.endsWith('/') ? base.slice(0, -1) : base;

function withBase(url) {
  if (base === '/' || typeof url !== 'string') return url;
  if (!url.startsWith('/') || url.startsWith('//')) return url;
  return prefix + url;
}

function rewriteAttributes(node, ctx) {
  for (const attr of node.attributes ?? []) {
    if (attr.type !== 'mdxJsxAttribute') continue;
    if (attr.name !== 'href' && attr.name !== 'url') continue;
    const next = withBase(attr.value);
    if (next !== attr.value) ctx.setAttribute(node, attr.name, next);
  }
}

export default {
  name: 'base-links',
  link(node, ctx) {
    const next = withBase(node.url);
    if (next !== node.url) ctx.setField(node, 'url', next);
  },
  mdxJsxFlowElement: rewriteAttributes,
  mdxJsxTextElement: rewriteAttributes,
};