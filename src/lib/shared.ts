export const appName = 'Drizzle 中文文档';
export const basePath = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;
export const docsRoute = `${basePath}docs`;
export const siteDescription =
  'Drizzle ORM 中文文档 —— 一个 SQL-first、无头、类型安全的 TypeScript ORM。支持 PostgreSQL、MySQL、SQLite 与所有主流运行时。';

export const gitConfig = {
  user: 'drizzle-team',
  repo: 'drizzle-orm',
  branch: 'main',
};

export const officialSite = 'https://orm.drizzle.team';
export const officialDocs = 'https://orm.drizzle.team/docs/overview';
export const githubUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;
export const discordUrl = 'https://driz.link/discord';
export const twitterUrl = 'https://x.com/drizzleorm';