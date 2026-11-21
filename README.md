<div align="center">
  <img src="https://raw.githubusercontent.com/drizzle-team/drizzle-orm/main/misc/readme/logo-github-sq-dark.svg#gh-dark-mode-only" />
  <img src="https://raw.githubusercontent.com/drizzle-team/drizzle-orm/main/misc/readme/logo-github-sq-light.svg#gh-light-mode-only" />
</div>

<br/>
<div align="center">
  <h3>适用于 NodeJS、TypeScript 与 JavaScript 的无头 ORM 🚀</h3>
  <a href="https://orm.drizzle.team">网站</a> •
  <a href="https://orm.drizzle.team/docs/overview">文档</a> •
  <a href="https://x.com/drizzleorm">Twitter</a> •
  <a href="https://driz.link/discord">Discord</a>
</div>

<br/>
<br/>

### Drizzle 是什么？
Drizzle 是一个现代 TypeScript ORM，开发者[愿意在下一个项目中选用它](https://stateofdb.com/tools/drizzle)。
它[足够轻量](https://bundlephobia.com/package/drizzle-orm)：minify + gzip 后仅约 7.4kb，支持 tree shaking，且依赖数恰好为 0。

**Drizzle 支持所有 PostgreSQL、MySQL 与 SQLite 数据库**，包括 [Turso](https://orm.drizzle.team/docs/get-started-sqlite#turso)、[Neon](https://orm.drizzle.team/docs/get-started-postgresql#neon)、[Xata](https://orm.drizzle.team/docs/connect-xata)、[PlanetScale](https://orm.drizzle.team/docs/get-started-mysql#planetscale)、[Cloudflare D1](https://orm.drizzle.team/docs/get-started-sqlite#cloudflare-d1)、[FlyIO LiteFS](https://fly.io/docs/litefs/)、[Vercel Postgres](https://orm.drizzle.team/docs/get-started-postgresql#vercel-postgres)、[Supabase](https://orm.drizzle.team/docs/get-started-postgresql#supabase) 与 [AWS Data API](https://orm.drizzle.team/docs/get-started-postgresql#aws-data-api) 等 serverless 数据库。没有花哨的附加组件，没有 Rust 二进制，没有 serverless 适配器——一切开箱即用。

**Drizzle 天生为 serverless 而设计**。它可运行于所有主流 JavaScript 运行时：NodeJS、Bun、Deno、Cloudflare Workers、Supabase functions、任意 Edge 运行时，甚至浏览器。
使用 Drizzle，你可以[**开箱即获得高性能**](https://orm.drizzle.team/benchmarks)，节省时间与成本，且无需在基础设施中引入任何数据代理层。

虽然 Drizzle 可以作为 JavaScript 库使用，但它在 TypeScript 中才真正大放异彩。它让你[**声明 SQL schema**](https://orm.drizzle.team/docs/sql-schema-declaration)，构建[**关系式查询**](https://orm.drizzle.team/docs/rqb)与[**类 SQL 查询**](https://orm.drizzle.team/docs/select)，同时在类型安全与可扩展性之间保持平衡，供工具作者在其之上继续构建。

### 生态系统
Drizzle ORM 始终是 SQL 之上的一层薄薄的类型化封装；与此同时，我们打造了一整套工具，只为提供尽可能好的开发体验。

Drizzle 配备了强大的 [**Drizzle Kit**](https://orm.drizzle.team/kit-docs/overview) CLI 伴侣，让迁移不再繁琐：它既能为你生成 SQL 迁移文件，也能将 schema 变更直接应用到数据库。

我们还提供 [**Drizzle Studio**](https://orm.drizzle.team/drizzle-studio/overview)，让你轻松浏览与操作所选数据库中的数据。

### 文档
完整文档请见[官方网站](https://orm.drizzle.team/docs/overview)。

### 我们的赞助商 ❤️
<p align="center">
<a href="https://drizzle.team" target="_blank">
<img src='https://api.drizzle.team/v2/sponsors/svg'/>
</a>
</p>