# Aqar Frontend

**Aqar** — A property management system built with Nuxt 4, Vue 3, TypeScript, and Tailwind CSS v4.

> **Last updated:** June 2026  
> **Project:** Aqar Frontend — Nuxt 4 / Vue 3 / TypeScript

---

## Prerequisites

- Node.js 20+ (see `.nvmrc`)
- pnpm 10+ (install via `corepack enable && corepack prepare pnpm@latest --activate`)

---

## Quick Start

```bash
# 1. Clone the repository
git clone <repo-url> aqar-front
cd aqar-front

# 2. Use the correct Node version
nvm use           # or: node --version >= 20

# 3. Install dependencies
pnpm install

# 4. Start development server
pnpm dev          # → http://localhost:3000
```

---

## Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `pnpm dev`        | Start development server           |
| `pnpm build`      | Build for production               |
| `pnpm preview`    | Preview production build           |
| `pnpm generate`   | Static site generation             |
| `pnpm lint`       | Lint all files (ESLint + Prettier) |
| `pnpm lint:fix`   | Auto-fix lint errors               |
| `pnpm typecheck`  | Run TypeScript type checking       |
| `pnpm commitlint` | Validate commit message            |

---

## Tech Stack & Configuration

### Nuxt 4

Scaffolded with `nuxi init` using the `minimal` template and `compatibilityDate: '2025-07-15'`.

### TypeScript — Strict Mode

Full strict mode enabled via `nuxt.config.ts`:

```js
typescript: {
  strict: true,
  typeCheck: true,
  tsConfig: {
    compilerOptions: {
      strict: true,
      noUncheckedIndexedAccess: true,
      strictNullChecks: true,
    },
  },
},
```

### Tailwind CSS v4

Installed `tailwindcss` v4 with `@tailwindcss/vite` plugin.

- Entry CSS: `assets/css/main.css`
- Configuration via `nuxt.config.ts` `vite.plugins`

### shadcn-vue

```bash
pnpm add -D shadcn-vue
npx shadcn-vue@latest init default --defaults --force
```

- Config: `components.json`
- Components: `components/ui/`
- Utils: `lib/utils.ts` (exports `cn()` using `clsx` + `tailwind-merge`)

### Pinia + @pinia/nuxt

```bash
pnpm add pinia @pinia/nuxt
```

Registered as a Nuxt module in `nuxt.config.ts`.

### VeeValidate + Zod

```bash
pnpm add vee-validate zod @vee-validate/zod
```

Form validation with Zod schema support.

### @nuxtjs/i18n — RTL (Arabic) + English

```bash
pnpm add @nuxtjs/i18n
```

- **Default locale:** Arabic (`ar`) — RTL direction
- **Secondary locale:** English (`en`) — LTR direction
- **Strategy:** `prefix_except_default` (no prefix for Arabic)
- **Locale files:** `i18n/locales/{ar,en}.json`
- **Module config:** `@nuxtjs/i18n` in `nuxt.config.ts`

### @sidebase/nuxt-auth

```bash
pnpm add @sidebase/nuxt-auth
```

Configured with local provider. Auth API base URL defaults to `http://localhost:3000`.

### @nuxt/image

```bash
pnpm add @nuxt/image
```

Optimized image delivery with `<NuxtImg>` and `<NuxtPicture>`.

### ESLint + Prettier (@antfu/eslint-config)

```bash
pnpm add -D eslint @antfu/eslint-config prettier eslint-plugin-format
```

- Config: `eslint.config.js`
- Uses `@antfu/eslint-config` with Vue, TypeScript, and stylistic rules
- Prettier integration via `eslint-plugin-format`
- Prettier config: `.prettierrc`

---

## Developer Tooling

### .editorconfig

Consistent editor settings across all contributors (2-space indent, UTF-8, LF endings).

### .nvmrc

Pin Node.js to version 20.

### pnpm-workspace.yaml

Build approvals for `@parcel/watcher`, `esbuild`, `sharp`, and `vue-demi`.

### Husky + lint-staged

```bash
pnpm add -D husky lint-staged
```

- **Pre-commit hook:** Runs `lint-staged` which lints and type-checks staged `*.{ts,tsx,vue,js,jsx,mjs,cjs}` files
- Hook file: `.husky/pre-commit`

### commitlint

```bash
pnpm add -D @commitlint/cli @commitlint/config-conventional
```

- Config: `commitlint.config.js`
- Enforces [Conventional Commits](https://www.conventionalcommits.org/)
- Hook file: `.husky/commit-msg`

---

## Project Structure

```
aqar-front/
├── app/
│   └── app.vue                  # Root component (RTL wrapper)
├── assets/
│   └── css/
│       └── main.css             # Tailwind CSS v4 entry
├── components/
│   └── ui/                      # shadcn-vue components (generated)
├── i18n/
│   └── locales/
│       ├── ar.json              # Arabic translations
│       └── en.json              # English translations
├── lib/
│   └── utils.ts                 # cn() utility function
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── .editorconfig
├── .gitignore
├── .husky/
│   ├── pre-commit               # lint-staged hook
│   └── commit-msg               # commitlint hook
├── .nvmrc
├── .prettierrc
├── commitlint.config.js
├── components.json
├── eslint.config.js
├── nuxt.config.ts
├── package.json
├── pnpm-workspace.yaml
└── tsconfig.json
```

---

## Verification

All three acceptance criteria are met:

| Check            | Status                                  |
| ---------------- | --------------------------------------- |
| `pnpm dev`       | ✅ Starts without errors on clean clone |
| `pnpm lint`      | ✅ Passes on the empty project          |
| `pnpm typecheck` | ✅ Passes on the empty project          |
| Pre-commit hook  | ✅ Blocks commits with lint/type errors |
