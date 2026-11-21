// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import fumadocs from '@fumadocs/astro';

export default defineConfig({
  site: 'https://drizzle-cn.local',
  integrations: [
    fumadocs({
      components: './src/components/mdx.tsx',
      includeProcessedMarkdown: true,
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