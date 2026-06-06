<h1 align="center">vitepress-blog</h1>

<div align="center">

A personal technical blog built with [VitePress](https://vitepress.dev/) and [vitepress-theme-teek](https://github.com/Kele-Bingtang/vitepress-theme-teek).

</div>

[简体中文](./README.md) | **English**

## Project Structure

```
vitepress-blog/
├── source/              # Site source and Markdown articles
│   └── .vitepress/      # VitePress config and theme extensions
├── packages/            # Local theme-related packages
├── plugins/             # VitePress plugins (workspace)
├── scripts/             # Deployment and utility scripts
└── dist/                # Build output (git-ignored)
```

## Development

> This project only supports installing dependencies with [pnpm](https://pnpm.io/).

```bash
# Install (husky initializes automatically)
pnpm install

# Build @teek/helper (needed for package exports used when loading VitePress config)
pnpm helper:build

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# TypeScript (root + each workspace plugin package)
pnpm typecheck

# Build workspace plugins
pnpm plugins:build
```

## Theme Fork

The Teek theme is **vendored/customized under `packages/`**, using the npm package name `vitepress-theme-teek` in this workspace. It may diverge from upstream [`vitepress-theme-teek`](https://github.com/Kele-Bingtang/vitepress-theme-teek); merge upstream selectively.

`source/.vitepress/teekConfig.ts` resolves `packages/config` and the theme version via **relative imports**. Vite aliases still resolve `vitepress-theme-teek` / `@teek/*`; `@teek/theme-chalk/*.css` in components is wired to `.scss` sources by the plugin.

## packages & plugins

`packages/` and `plugins/` are wired through the pnpm workspace and site config: **plugins scan and transform Markdown at build time; components read that data and render UI at runtime**. There is no separate component playground—run `pnpm dev` and open the page that uses the piece you changed.

### How they connect

```
source/.vitepress/teekConfig.ts     # Site Teek config (incl. vitePlugins toggles)
        ↓ defineTeekConfig
packages/config                     # Registers plugins, markdown plugins, merges VP config
        ↓ vite.plugins
plugins/*                           # Build-time Vite plugins (scan MD, frontmatter, inject data)
        ↓ writes siteData / themeConfig
packages/teek + packages/components # Theme entry + Vue components
        ↓ extends
source/.vitepress/theme/            # Site theme extensions (styles, TeekLayoutProvider, …)
```

Key files:

| File                                                                     | Role                                                                |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| [`packages/config/vitePlugins.ts`](./packages/config/vitePlugins.ts)     | Registers all `plugins/` Vite plugins                               |
| [`source/.vitepress/teekConfig.ts`](./source/.vitepress/teekConfig.ts)   | This blog’s Teek config and `vitePlugins` switches                  |
| [`source/.vitepress/teekVite.ts`](./source/.vitepress/teekVite.ts)       | Aliases `@teek/*` and `vitepress-theme-teek` to `packages/` sources |
| [`packages/teek/index.ts`](./packages/teek/index.ts)                     | Theme entry: global components + `extends` default VP theme         |
| [`packages/components/theme/Layout`](./packages/components/theme/Layout) | Root layout; mounts page components from frontmatter / route        |

### `packages/` sub-packages

| Directory                               | Purpose                                                         | Used in this repo                                                          |
| --------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [`teek`](./packages/teek)               | npm entry `vitepress-theme-teek`                                | `source/.vitepress/theme/index.ts` → `extends: Teek`                       |
| [`config`](./packages/config)           | `defineTeekConfig`, types, plugin registration, post transforms | `teekConfig.ts`; `vitePlugins.ts` mounts `plugins/*`                       |
| [`components`](./packages/components)   | Vue components (`common/` + `theme/`)                           | `Layout`, feature pages, markdown containers                               |
| [`composables`](./packages/composables) | Composition API helpers                                         | Most components and theme logic                                            |
| [`theme-chalk`](./packages/theme-chalk) | SCSS / CSS variables                                            | `theme/index.ts` + per-component styles; `teekVite` maps `*.css` → `.scss` |
| [`locale`](./packages/locale)           | i18n strings                                                    | `useLocale()` in components                                                |
| [`helper`](./packages/helper)           | Utilities (dates, guards, analytics helpers)                    | Config, components, plugins; run `pnpm helper:build` first                 |
| [`markdown`](./packages/markdown)       | Custom markdown-it plugins (cards, demo blocks, containers)     | Registered in `packages/config/index.ts`                                   |
| [`static`](./packages/static)           | Icons, fonts                                                    | `Icon`, social icons, `DemoCode`, etc.                                     |

#### Common components vs theme pages

**`components/common/`** — reusable UI (`ArticlePage`, `Pagination`, `Icon`, `ImageViewer`, …).

**`components/theme/`** — blog features:

| Component / page                                     | Where it appears                                        |
| ---------------------------------------------------- | ------------------------------------------------------- |
| `Layout`                                             | Site-wide root layout                                   |
| `Home` + `Home*Card`                                 | Blog home when `teekHome: true`                         |
| `ArchivesPage`                                       | `source/routes/archives.md` → `/archives`               |
| `ArticleOverviewPage`                                | `source/routes/articleOverview.md` → `/articleOverview` |
| `CataloguePage`                                      | Articles with catalogue frontmatter                     |
| `RiskLinkPage`                                       | `source/routes/risk-link.md`; external link warning     |
| `ArticleTitle`, `ArticleBanner`, `ArticleAnalyze`, … | Article pages via `Layout` doc slots                    |
| `ThemeEnhance`, `RightBottomButton`, `Comment*`      | Global theme / comments per `teekConfig`                |

**Site extensions** under `source/.vitepress/theme/`:

| File                     | Slot                        | Role                                  |
| ------------------------ | --------------------------- | ------------------------------------- |
| `TeekLayoutProvider.vue` | wraps `Teek.Layout`         | Site layout extension entry           |
| `CategoriesTagsPage.vue` | `teek-home-features-before` | Categories / tags hub                 |
| `ContributeChart.vue`    | `teek-archives-top-before`  | Archives contribution chart (ECharts) |
| `404.vue`                | `not-found`                 | Custom 404                            |

Preview: `pnpm dev`, then open the route that uses the component; or add a sandbox page under `source/routes/`.

### `plugins/`

Registered in [`packages/config/vitePlugins.ts`](./packages/config/vitePlugins.ts) via [`defineTeekConfig`](./packages/config/index.ts).

- **Optional** (`teekConfig.vitePlugins`): `autoFrontmatter`, `sidebar`, `permalink`, `mdH1`, `docAnalysis`
- **Always on** (theme-tied): `catalogue`, `file-content-loader`

| Plugin                                                                                   | Purpose                       | Output consumed by                                     | This project                                                           |
| ---------------------------------------------------------------------------------------- | ----------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------- |
| [`vitepress-plugin-auto-frontmatter`](./plugins/vitepress-plugin-auto-frontmatter)       | Auto-fill / write frontmatter | Article `.md` YAML                                     | **On** + custom `transform` in `teekConfig.ts`                         |
| [`vitepress-plugin-sidebar-resolve`](./plugins/vitepress-plugin-sidebar-resolve)         | Auto sidebar from folders     | `themeConfig.sidebar`                                  | **Off** — manual [`sidebar.ts`](./source/.vitepress/config/sidebar.ts) |
| [`vitepress-plugin-permalink`](./plugins/vitepress-plugin-permalink)                     | Permalinks & rewrites         | Routes, 404 handling                                   | **Off**                                                                |
| [`vitepress-plugin-md-h1`](./plugins/vitepress-plugin-md-h1)                             | Inject H1 when missing        | Article page title                                     | **On** (default)                                                       |
| [`vitepress-plugin-doc-analysis`](./plugins/vitepress-plugin-doc-analysis)               | Word count, reading time      | `theme.docAnalysisInfo`                                | **On** (default)                                                       |
| [`vitepress-plugin-catalogue`](./plugins/vitepress-plugin-catalogue)                     | Catalogue page structure      | `CataloguePage`                                        | **Always on**                                                          |
| [`vitepress-plugin-file-content-loader`](./plugins/vitepress-plugin-file-content-loader) | Build post index              | `themeConfig.posts` → home, categories, tags, archives | **Always on**                                                          |

After changing a plugin: `pnpm plugins:build`, then `pnpm dev`.

## `pnpm-workspace.yaml` Catalog

`catalog` / `catalogs` centralize dependency versions across the workspace. Plugins are wired with `workspace:*` against **`plugins/*`**. The SemVer strings in `catalog` are mainly a **reference** aligned with upstream npm releases—they do **not** mean those exact versions are fetched from the registry for in-repo packages.

## Code Standards

This project uses the same frontend engineering standards as `vitepress-theme-teek`:

| Tool                | Description                                  |
| ------------------- | -------------------------------------------- |
| ESLint              | Code quality (Vue / TypeScript / JavaScript) |
| Prettier            | Code formatting                              |
| Husky               | Git hooks                                    |
| lint-staged         | Lint only staged files                       |
| commitlint + cz-git | Conventional commit messages                 |

```bash
# Run full lint and auto-fix
pnpm lint

# ESLint only
pnpm lint:eslint

# Prettier only
pnpm lint:prettier

# Interactive conventional commit (recommended)
pnpm cz
```

On commit, `pre-commit` runs ESLint / Prettier on staged files, and `commit-msg` validates messages against [Conventional Commits](https://www.conventionalcommits.org/).

### Commit Message Convention

The commit message format is:

```
<type>(<scope>): <subject>
```

- `type`: **Required** — the commit type
- `scope`: _Optional_ — the scope of change
- `subject`: **Required** — a short, concise description

Allowed `type` values:

| type       | emoji | Description                                               |
| ---------- | ----- | --------------------------------------------------------- |
| `feat`     | 🚀    | A new feature                                             |
| `fix`      | 🐞    | A bug fix                                                 |
| `docs`     | 📚    | Documentation only changes                                |
| `style`    | 🎨    | Code formatting (no logic change)                         |
| `refactor` | ♻️    | Code refactoring (neither fixes a bug nor adds a feature) |
| `perf`     | ⚡️    | Performance improvement                                   |
| `test`     | ✅    | Adding or correcting tests                                |
| `build`    | 📦️    | Build system or external dependencies                     |
| `ci`       | 🎡    | CI configuration and scripts                              |
| `revert`   | ⏪️    | Revert a previous commit                                  |
| `chore`    | 🔨    | Other changes (not modifying src or test files)           |

Examples:

```bash
git commit -m "feat: add article search functionality"
git commit -m "fix: fix mobile sidebar display issue"
git commit -m "docs: update deployment documentation"
```

> [cz-git](https://cz-git.qbb.sh/) is configured for interactive commits. Run `pnpm cz` to step through type, scope, description, etc. and auto-generate a compliant commit message. Commits containing `init` skip commitlint validation.

## Deployment

A unified deployment script supports both macOS and Windows.

### Configuration

Edit `scripts/deploy.config.json` to configure your server:

```json
{
  "distDir": "dist",
  "archiveName": "dist.tar.gz",
  "serverUser": "root",
  "serverIP": "your-server-ip",
  "serverDir": "/home/www/your-site"
}
```

### Commands

```bash
# Recommended
pnpm deploy

# Or run the script directly
pnpm exec tsx scripts/deploy.ts
```

### Deployment Steps

1. Verify SSH connection
2. Clean previous build artifacts
3. Build the site
4. Archive the `dist` directory
5. Upload to the server
6. Extract and deploy remotely
7. Remove local archive

### Prerequisites

- Passwordless SSH access to the server
- Node.js (>= 18.12) and pnpm installed locally
- `tar`, `ssh`, and `scp` available on your system (built into Windows 10/11)
