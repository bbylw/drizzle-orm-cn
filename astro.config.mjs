// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import fumadocs from '@fumadocs/astro';
import mdastBaseLinks from './src/lib/mdast-base-links.mjs';

export default defineConfig({
  site: 'https://bbylw.github.io',
  base: process.env.PAGES_BASE ?? '/',
  integrations: [
    fumadocs({
      components: './src/components/mdx.tsx',
      includeProcessedMarkdown: true,
      mdastPlugins: [mdastBaseLinks],
      rehypeCodeOptions: {
        themes: {
          light: 'github-light',
          dark: 'vesper',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});