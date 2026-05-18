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
