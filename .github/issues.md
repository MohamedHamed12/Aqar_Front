# Aqar Frontend — GitHub Issues

> Written from a senior engineering perspective.
> Each issue includes context, acceptance criteria, and technical notes.

---

## Legend

| Label | Meaning |
|---|---|
| `feat` | New feature |
| `bug` | Something broken |
| `dx` | Developer experience / tooling |
| `perf` | Performance improvement |
| `a11y` | Accessibility |
| `i18n` | Internationalization / RTL |
| `infra` | CI/CD, Docker, deployment |
| `test` | Testing coverage |

---

---

## Issue #001 — Project Scaffolding & Toolchain Setup

**Labels:** `feat` `dx`
**Priority:** P0 — Blocker
**Milestone:** v1.0

### Context

Nothing can start without a clean, opinionated project foundation. The scaffolding must enforce consistency from day one so junior contributors don't introduce style drift or type-unsafe patterns later.

### Tasks

- [ ] Init Nuxt 4 project with `nuxi init` using `compatibilityVersion: 4`
- [ ] Configure TypeScript strict mode (`strict: true`, `noUncheckedIndexedAccess: true`)
- [ ] Install and configure Tailwind CSS v4
- [ ] Install shadcn-vue, run `shadcn-vue init`, commit `components.json`
- [ ] Install Pinia with `@pinia/nuxt`
- [ ] Install VeeValidate + Zod (`vee-validate`, `zod`, `@vee-validate/zod`)
- [ ] Install `@nuxtjs/i18n` with Arabic (RTL default) and English locales
- [ ] Install `@sidebase/nuxt-auth`
- [ ] Install `@nuxt/image` for optimized image delivery
- [ ] Configure ESLint with `@antfu/eslint-config` + Prettier
- [ ] Add `.editorconfig`, `.nvmrc` (Node 20), `pnpm-workspace.yaml`
- [ ] Add `husky` + `lint-staged` pre-commit hook (lint + type-check)
- [ ] Add `commitlint` enforcing Conventional Commits
- [ ] Write `README.md` with setup instructions

### Acceptance Criteria

- `pnpm dev` starts without errors on a clean clone
- `pnpm lint` and `pnpm typecheck` both pass on the empty project
- Pre-commit hook blocks commits with lint errors or type errors

---

---

## Issue #002 — Global Layout, Navbar & Footer

**Labels:** `feat` `i18n` `a11y`
**Priority:** P0
**Milestone:** v1.0

### Context

Every page shares the same shell. The navbar must handle auth state (guest vs. logged-in), language switching, and RTL direction without layout breaks. This is a foundational component that will be seen on 100% of page views.

### Tasks

- [ ] Create `layouts/default.vue` with `<slot />`
- [ ] Create `layouts/auth.vue` (centered card, no navbar)
- [ ] Create `layouts/dashboard.vue` (sidebar + main content)
- [ ] Build `components/shared/Navbar.vue`
  - Logo (links to `/`)
  - Navigation links: Home, Search, Post a Listing
  - Language switcher (AR / EN) using `useI18n`
  - Auth state: show Login/Register buttons for guests; show user avatar dropdown (My Dashboard, Logout) for authenticated users
  - Mobile hamburger menu using shadcn-vue `Sheet`
- [ ] Build `components/shared/Footer.vue`
  - Links, copyright, social icons
  - RTL-aware column order
- [ ] Apply `dir="rtl"` / `dir="ltr"` globally via i18n locale `dir` config
- [ ] Verify Tailwind `rtl:` variants work correctly for all flex/padding/margin

### Acceptance Criteria

- Navbar renders correctly in both AR (RTL) and EN (LTR) without overlap or cutoff
- Language switch updates direction and content instantly without full page reload
- Hamburger menu is keyboard-accessible (focus trap, ESC to close)
- Authenticated user dropdown shows correct user name from Pinia auth store

---

---

## Issue #003 — Auth: Login, Register & Google OAuth

**Labels:** `feat` `i18n`
**Priority:** P0
**Milestone:** v1.0

### Context

Auth is a prerequisite for listing creation, favorites, and saved searches. The implementation must use the backend JWT flow with refresh token rotation. Google OAuth is a first-class option, not an afterthought.

### API Endpoints Used

```
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
```

### Tasks

- [ ] Configure `@sidebase/nuxt-auth` with credentials provider (email/password) and Google OAuth provider
- [ ] Implement token refresh logic — intercept 401 responses, call `/auth/refresh`, retry original request
- [ ] Build `pages/auth/login.vue`
  - Email + password fields with VeeValidate + Zod validation
  - "Continue with Google" button
  - Link to register
  - Error banner for invalid credentials (do not expose whether email or password is wrong)
- [ ] Build `pages/auth/register.vue`
  - Name, email, password, confirm password fields
  - Zod schema: password min 8 chars, must contain uppercase + number
  - Link to login
- [ ] Write `middleware/auth.ts` — redirects unauthenticated users to `/auth/login`
- [ ] Write `middleware/guest.ts` — redirects authenticated users away from `/auth/*` to `/dashboard`
- [ ] Populate Pinia `authStore` on session hydration
- [ ] Handle logout: call `/auth/logout` then clear store + redirect to home

### Acceptance Criteria

- Login with valid credentials sets access token and redirects to intended page
- Expired access token is refreshed transparently without user seeing an error
- Google OAuth callback works in both development and production origins
- Visiting `/auth/login` while authenticated redirects to `/dashboard`

### Security Notes

- Never store the JWT access token in `localStorage` — use `httpOnly` cookie via the auth module
- Display generic "Invalid email or password" — never confirm which field is wrong
- Rate limiting on login is handled server-side; frontend should disable the submit button after 3 rapid failures and show a cooldown message

---

---

## Issue #004 — Home Page & Hero Search

**Labels:** `feat` `i18n` `perf`
**Priority:** P0
**Milestone:** v1.0

### Context

The home page is the top of the funnel. The hero search must feel instant. Featured neighborhoods and recent listings drive discovery for users who don't have a specific address in mind.

### API Endpoints Used

```
GET /api/v1/search
GET /api/v1/neighborhoods/{id}/stats
```

### Tasks

- [ ] Build `pages/index.vue`
- [ ] Hero section
  - Purpose toggle (بيع / إيجار — Sale / Rent) using shadcn-vue `Tabs`
  - Location / keyword input with debounced suggestions
  - Prominent search button that navigates to `/listings` with query params
- [ ] Featured Neighborhoods section
  - Fetch top 6 neighborhoods via `useAsyncData`
  - Each card: neighborhood name, city, median price per sqm, listing count
  - Navigate to `/neighborhoods/{id}` on click
- [ ] Recent Listings section
  - Fetch 8 most recent published listings
  - Use `ListingCard` component (created in Issue #005)
- [ ] Skeleton loaders for both sections during SSR hydration
- [ ] `useSeoMeta` with Arabic default title and OG tags

### Acceptance Criteria

- Page scores 90+ on Lighthouse Performance (mobile)
- Hero search navigates to `/listings?purpose=SALE&query=...` with correct params
- Neighborhoods and recent listings are rendered server-side (visible in page source)
- Page renders correctly in RTL (Arabic) and LTR (English)

---

---

## Issue #005 — Listing Card Component

**Labels:** `feat` `i18n` `a11y`
**Priority:** P0
**Milestone:** v1.0

### Context

`ListingCard` is the most-rendered component in the app — used in search results, home page, dashboard, and favorites. It must be pixel-perfect, performant, and accessible. Getting it wrong means fixing it everywhere.

### Tasks

- [ ] Build `components/listing/ListingCard.vue`
  - Thumbnail image (first image, lazy loaded via `<NuxtImg>`)
  - Purpose badge (Sale / Rent) with color distinction
  - Price (formatted with locale-aware `toLocaleString`)
  - Price per sqm (calculated client-side)
  - Area (m²), bedrooms, bathrooms with icons
  - Neighborhood + city
  - "New" badge if listed within last 48h
  - Favorite (heart) button — auth-gated, calls favorites API
  - Navigates to `/listings/{id}` on click
- [ ] Skeleton variant `ListingCardSkeleton.vue` for loading states
- [ ] Price formatting util: `formatPrice(price, locale)` — Arabic numerals for AR locale, EGP suffix
- [ ] Emit `@favorite-toggled` event for parent list to update without refetch

### Props Interface

```ts
interface Props {
  listing: Listing
  showFavoriteButton?: boolean  // default: true
  loading?: boolean             // shows skeleton
}
```

### Acceptance Criteria

- Card is fully keyboard-navigable (Tab to card, Enter to navigate)
- `<NuxtImg>` applies `loading="lazy"` and correct `sizes` attribute
- Favorite toggle works optimistically (UI updates immediately, reverts on API error)
- RTL layout mirrors correctly without explicit `rtl:` overrides on every element

---

---

## Issue #006 — Search Results Page with Filters & Map

**Labels:** `feat` `i18n` `perf`
**Priority:** P0
**Milestone:** v1.0

### Context

This is the core product page. Users land here from the hero search, shared links, and saved search alerts. The URL must be the single source of truth for all filter state so links are shareable and the back button works correctly.

### API Endpoints Used

```
GET /api/v1/search?lat=...&lng=...&radius_km=...&purpose=...&type=...&page=...
```

### Tasks

- [ ] Build `pages/listings/index.vue` with three-panel layout:
  - Left: filter sidebar (collapsible on mobile as `Sheet`)
  - Center: results grid with sort controls and pagination
  - Right: map panel (toggleable on mobile)
- [ ] Sync all filter state bidirectionally with URL query params using `useRoute` / `useRouter`
  - On load: read params from URL → populate filters
  - On change: update URL → trigger new fetch
- [ ] Build `components/search/SearchFilters.vue`
  - Purpose (Sale / Rent)
  - Property type (multi-select)
  - Price range (dual-handle slider)
  - Area range (dual-handle slider)
  - Bedrooms (0 / 1 / 2 / 3 / 4+)
  - Amenities (multi-select checkboxes)
  - Neighborhood (searchable combobox using shadcn-vue `Command`)
  - "Near me" button (calls browser Geolocation API, sets lat/lng/radius)
  - Reset filters button
- [ ] Sort controls: Newest, Price ↑, Price ↓, Distance, Price/m²
- [ ] Pagination using shadcn-vue `Pagination`
- [ ] Results count: "١٢٣ عقار" / "123 Properties"
- [ ] Empty state illustration when no results
- [ ] Map panel using `PropertyMap` component (Issue #010)
  - Markers update in sync with current search results
  - Clicking a marker highlights the corresponding listing card

### Acceptance Criteria

- Sharing the URL produces identical results for another user
- Pressing browser Back restores previous filter state
- Filter changes debounce API calls (300ms) to avoid hammering the backend
- "Near me" geolocation request fires only after explicit user click, never on load
- Map and list stay in sync — selecting a map marker scrolls the card into view

---

---

## Issue #007 — Listing Detail Page

**Labels:** `feat` `i18n` `a11y` `perf`
**Priority:** P0
**Milestone:** v1.0

### Context

This page is the conversion point. It must load fast (cached listing detail P95 < 100ms per backend SLA), present all listing data clearly, and give the user a clear next action (contact agent, save, share).

### API Endpoints Used

```
GET /api/v1/listings/{id}
GET /api/v1/listings/{id}/price-history
GET /api/v1/neighborhoods/{id}/stats
```

### Tasks

- [ ] Build `pages/listings/[id].vue`
- [ ] Image gallery
  - Full-width main image with thumbnail strip
  - Lightbox on click (keyboard-navigable, ESC to close)
  - `<NuxtImg>` with priority on first image (LCP candidate)
- [ ] Listing header: title, price, purpose badge, status badge, posted date
- [ ] Details grid: area, bedrooms, bathrooms, property type, floor
- [ ] Amenities list with icons
- [ ] Description section (Arabic text with correct `dir` attribute)
- [ ] Price history chart
  - Line chart using `unovis` or `recharts-vue`
  - Show price over time with date labels
  - Hide section if fewer than 2 data points
- [ ] Neighborhood stats card: median price/sqm, listing count, link to neighborhood page
- [ ] Map with single listing pin + neighborhood boundary polygon
- [ ] Agent card: name, phone (masked until "Show number" click), profile link
- [ ] Action bar (sticky on mobile): Favorite, Share, Contact Agent
- [ ] Similar listings carousel (same neighborhood, same type)
- [ ] `useSeoMeta`: listing title, price, first image as OG image
- [ ] 404 handling: if listing not found or archived, show `error.vue`

### Acceptance Criteria

- Page renders server-side (content in HTML source before JS executes)
- LCP image has `fetchpriority="high"` applied via `<NuxtImg>`
- Lightbox traps focus when open; ESC closes it
- Phone number reveal logs an analytics event (view tracking via Kafka on backend)
- Price history chart renders correctly with 1, 2, and 20+ data points

---

---

## Issue #008 — Create & Edit Listing Flow

**Labels:** `feat` `i18n`
**Priority:** P1
**Milestone:** v1.0

### Context

Listing creation is a multi-step flow with file uploads. The form must validate client-side before any API call is made. The image upload uses a two-step API (upload → confirm) and must handle partial failures gracefully.

### API Endpoints Used

```
POST   /api/v1/listings
PATCH  /api/v1/listings/{id}
POST   /api/v1/listings/{id}/images/upload
POST   /api/v1/listings/{id}/images/confirm
DELETE /api/v1/listings/{id}/images/{imageId}
PATCH  /api/v1/listings/{id}/images/order
PATCH  /api/v1/listings/{id}/status
```

### Tasks

- [ ] Build `pages/listings/create.vue` (protected by `auth` middleware)
- [ ] Build `pages/listings/[id]/edit.vue`
- [ ] Multi-step form with progress indicator
  - Step 1: Basic info (purpose, type, title, description)
  - Step 2: Details (price, area, bedrooms, bathrooms, amenities)
  - Step 3: Location (neighborhood picker + map pin drag to set lat/lng)
  - Step 4: Images
  - Step 5: Review & Publish
- [ ] Zod schema for each step, validated before proceeding
- [ ] Image upload component
  - Drag & drop zone + file picker
  - Preview thumbnails with remove button
  - Drag-to-reorder (sets image order)
  - Max 20 images, accepted types: JPEG, PNG, WebP
  - Client-side magic-byte validation (read file header, not just extension)
  - Upload progress indicator per file
  - Call `/images/upload` then `/images/confirm` on step completion
- [ ] Location step: embed Leaflet map, allow user to drop a pin; reverse geocode via Nominatim to suggest neighborhood
- [ ] Save draft at end of each step (PATCH to listing in DRAFT status)
- [ ] Publish button on final step: PATCH status to PUBLISHED

### Acceptance Criteria

- User cannot proceed to next step with validation errors
- Uploading a non-image file (e.g., PDF) is blocked client-side with a clear error
- Losing connection mid-upload shows per-file error state; other files are unaffected
- Edit page pre-populates all fields from existing listing data
- Listing created as DRAFT is not visible in public search results

---

---

## Issue #009 — Dashboard: My Listings, Favorites & Saved Searches

**Labels:** `feat` `i18n`
**Priority:** P1
**Milestone:** v1.0

### Context

The dashboard is where agents manage their inventory and buyers manage their intent. It must give a clear overview without overwhelming with data.

### API Endpoints Used

```
GET    /api/v1/listings          (filtered by agent)
PATCH  /api/v1/listings/{id}/status
DELETE /api/v1/listings/{id}
GET    /api/v1/saved-searches
DELETE /api/v1/saved-searches/{id}
```

### Tasks

- [ ] Build `layouts/dashboard.vue` with sidebar navigation
- [ ] Build `pages/dashboard/index.vue` — summary stats (total listings, active, drafts, total favorites)
- [ ] Build `pages/dashboard/my-listings.vue`
  - Table view using shadcn-vue `DataTable` (TanStack Table)
  - Columns: thumbnail, title, status badge, price, created date, actions
  - Status filter tabs: All / Published / Draft / Archived
  - Inline status toggle (Publish / Archive / Draft)
  - Delete with confirmation `AlertDialog`
  - Link to edit page
- [ ] Build `pages/dashboard/favorites.vue`
  - Grid of `ListingCard` with favorite button pre-toggled
  - Empty state if no favorites
- [ ] Build `pages/dashboard/saved-searches.vue`
  - List of saved search criteria as readable tags
  - "Run search" button navigates to `/listings` with saved params
  - Delete button with confirmation

### Acceptance Criteria

- Status changes are reflected immediately (optimistic update)
- Deleting a listing asks for confirmation and cannot be accidentally triggered
- Dashboard is inaccessible to unauthenticated users (middleware applied at layout level)
- Empty states have clear CTAs (e.g., "Post your first listing")

---

---

## Issue #010 — Map Component (Leaflet)

**Labels:** `feat` `perf`
**Priority:** P1
**Milestone:** v1.0

### Context

Maps are used in three contexts: the search results panel, the listing detail pin, and the listing creation location picker. All three share the same underlying Leaflet integration but have different behaviors. Leaflet must be client-side only — SSR will break.

### Tasks

- [ ] Register Leaflet as a client-only Nuxt plugin (`plugins/leaflet.client.ts`)
- [ ] Fix Leaflet default icon path issue (broken in bundlers — must override `L.Icon.Default.prototype._getIconUrl`)
- [ ] Build `components/search/PropertyMap.vue`
  - Renders multiple listing markers
  - Custom marker icon with price bubble
  - Marker cluster for dense areas (`leaflet.markercluster`)
  - Emits `@marker-click(listingId)` for parent to highlight card
  - Re-centers map when listings prop changes
- [ ] Build `components/listing/ListingLocationMap.vue`
  - Single marker, fixed, no interaction
  - Neighborhood boundary polygon (GeoJSON from backend or derived from PostGIS)
  - Compact height for embedding in detail page
- [ ] Build `components/listing/LocationPickerMap.vue`
  - Draggable marker for listing creation
  - Emits `@location-change({ lat, lng })`
  - Shows crosshair at center + "drag to set location" hint
- [ ] Wrap all map components in `<ClientOnly>` with a skeleton fallback

### Acceptance Criteria

- No SSR errors — maps render only on client
- Map does not cause layout shift (skeleton placeholder has the same dimensions)
- Marker clusters work correctly with 100+ listings on the viewport

---

---

## Issue #011 — Neighborhood Analytics Page

**Labels:** `feat` `i18n`
**Priority:** P1
**Milestone:** v1.0

### Context

Price transparency is a core value proposition of Aqar. The neighborhood page must present analytics in a way that builds trust, not just dumps numbers.

### API Endpoints Used

```
GET /api/v1/neighborhoods/{id}/stats
GET /api/v1/search?neighborhoodId={id}&size=6
```

### Tasks

- [ ] Build `pages/neighborhoods/[id].vue`
- [ ] Neighborhood header: name, city, boundary map
- [ ] Stats cards (shadcn-vue `Card`):
  - Median price per m²
  - Average listing price
  - Min / Max price
  - Total active listings
- [ ] Price distribution by property type (bar chart)
- [ ] Sale vs Rent split (donut chart)
- [ ] Recent listings in this neighborhood (6 cards, link to full search)
- [ ] "Set alert for this neighborhood" shortcut — creates saved search pre-filled with `neighborhoodId`
- [ ] `useSeoMeta` with neighborhood name in title

### Acceptance Criteria

- Stats are rendered server-side
- Charts are wrapped in `<ClientOnly>` (canvas-based charts cannot SSR)
- Charts show a "no data" message gracefully when analytics are empty
- "Set alert" is auth-gated with redirect to login if not authenticated

---

---

## Issue #012 — Saved Search Alert Creation

**Labels:** `feat`
**Priority:** P1
**Milestone:** v1.0

### Context

Saved searches are a retention driver. When a user finds a search they care about, a single click should save it. The UX must not break the search flow.

### API Endpoints Used

```
POST   /api/v1/saved-searches
GET    /api/v1/saved-searches
DELETE /api/v1/saved-searches/{id}
```

### Tasks

- [ ] Add "Save this search" button to `pages/listings/index.vue` (visible when at least one filter is active)
- [ ] On click: if unauthenticated, redirect to login with `redirect` param back to search
- [ ] On click: if authenticated, POST current search params to `/saved-searches` — show success `Toast`
- [ ] Detect if current search params already match an existing saved search — show "Saved ✓" state instead
- [ ] In `useSavedSearches` composable: fetch all saved searches on auth, cache in Pinia

### Acceptance Criteria

- Saving a search takes one click and shows immediate feedback
- Duplicate saves are prevented (compare params before POST)
- Saved searches appear in dashboard immediately after saving

---

---

## Issue #013 — i18n Completeness & RTL Polish

**Labels:** `i18n` `a11y`
**Priority:** P1
**Milestone:** v1.0

### Context

Arabic is the default locale and the primary audience. RTL is not an afterthought — it must be tested on every component. This issue tracks the translation completeness pass and RTL visual audit.

### Tasks

- [ ] Complete `locales/ar.json` — all UI strings, form labels, error messages, empty states
- [ ] Complete `locales/en.json` — same keys
- [ ] Audit every component for hardcoded Arabic or English strings — replace with `t()` calls
- [ ] RTL visual audit checklist:
  - [ ] Navbar link order mirrors correctly
  - [ ] Cards: image on correct side, text aligned right in AR
  - [ ] Form labels align right in AR
  - [ ] Icons that imply direction (arrows, chevrons) flip with `rtl:rotate-180`
  - [ ] Price and area numbers: use Arabic-Indic numerals in AR locale
  - [ ] Date formatting: use `Intl.DateTimeFormat` with locale
- [ ] Arabic number formatting util: `formatNumber(n, locale)` — outputs `١٢٣` in AR, `123` in EN
- [ ] Test with a native RTL browser session (Firefox with `layout.writing-mode.enabled`)

### Acceptance Criteria

- Zero hardcoded strings in any component
- `pnpm typecheck` catches missing i18n keys via typed `useI18n` (configure `vue-i18n` with type generation)
- Both locales render without layout overflow on 375px (mobile) and 1440px (desktop)

---

---

## Issue #014 — Performance: SSR, Caching & Bundle Optimization

**Labels:** `perf` `infra`
**Priority:** P1
**Milestone:** v1.0

### Context

The backend targets P95 < 100ms for cached listing detail. The frontend must not squander that. Bundle bloat and render-blocking resources are the most common frontend performance killers.

### Tasks

- [ ] Audit initial JS bundle: run `nuxt build --analyze`, identify chunks > 50 KB
- [ ] Lazy-load heavy components (Leaflet map, charts) using `defineAsyncComponent`
- [ ] Configure `@nuxt/image` with proper `sizes` on all `<NuxtImg>` tags
- [ ] Set `fetchpriority="high"` on LCP images (listing hero, first gallery image)
- [ ] Configure Nuxt route rules for caching:
  ```ts
  routeRules: {
    '/listings/**': { swr: 60 },          // listing detail: stale-while-revalidate 60s
    '/neighborhoods/**': { swr: 300 },    // neighborhood stats: 5min
    '/': { prerender: true },             // home: static
  }
  ```
- [ ] Arabic font: load only the subset needed (Basic Arabic + Latin) using `@nuxtjs/google-fonts` or self-hosted Noto Naskh Arabic
- [ ] Preconnect to API domain in `useHead` for faster first API call
- [ ] Remove unused shadcn-vue components from `components/ui/` before production build

### Acceptance Criteria

- Lighthouse Performance score ≥ 90 on mobile for home page and listing detail
- Initial JS payload < 200 KB gzip
- No render-blocking resources flagged by Lighthouse
- Arabic font does not cause layout shift (use `font-display: swap` + size-adjust)

---

---

## Issue #015 — Error Handling & Global UX States

**Labels:** `feat` `a11y` `dx`
**Priority:** P1
**Milestone:** v1.0

### Context

Production apps fail. The question is whether they fail gracefully. Every API call must have a loading state, an error state, and an empty state. Global errors (network down, 500s) must be caught and displayed without crashing the app.

### Tasks

- [ ] Build global `error.vue` for Nuxt unhandled errors (404, 500)
  - 404: "This property was not found" with link back to search
  - 500: "Something went wrong" with retry button
- [ ] Create `composables/useApiError.ts` — maps API error codes to user-facing Arabic/English messages
- [ ] Add global `$fetch` interceptor in `plugins/api.ts` for 401 (trigger token refresh) and 5xx (show toast)
- [ ] Build `components/shared/Toast.vue` wrapper using shadcn-vue `Sonner` or `Toast`
- [ ] Ensure every `useFetch` / `useAsyncData` call handles:
  - `pending`: show skeleton
  - `error`: show error alert with retry
  - empty `data`: show empty state
- [ ] Add `<NuxtLoadingIndicator>` for route transitions
- [ ] Offline detection: show banner when `navigator.onLine` is false

### Acceptance Criteria

- No unhandled promise rejections in browser console in any user flow
- API error codes (e.g., `LISTING_NOT_FOUND`, `UNAUTHORIZED`) map to readable Arabic messages
- Error toast auto-dismisses after 5 seconds and is screen-reader announced via `role="alert"`

---

---

## Issue #016 — Testing: Unit, Component & E2E Coverage

**Labels:** `test`
**Priority:** P1
**Milestone:** v1.0

### Context

The test suite is the safety net for refactoring and contributor confidence. We need meaningful coverage, not coverage theater. Focus on behavior, not implementation details.

### Tasks

**Unit / Component (Vitest + Vue Test Utils)**

- [ ] `ListingCard` — renders price, area, bedrooms; favorite toggle emits correct event
- [ ] `SearchFilters` — changing price range updates emitted params
- [ ] `useSearch` composable — URL params sync, debounce behavior
- [ ] `useAuth` composable — login, logout, token refresh
- [ ] `formatPrice` util — Arabic numerals in AR locale, EGP suffix
- [ ] `createListingSchema` Zod schema — valid and invalid inputs

**E2E (Playwright)**

- [ ] Guest user: search → view listing detail → attempt favorite → redirected to login
- [ ] Auth user: login → create listing draft → upload image → publish
- [ ] Auth user: run search → save search → verify in dashboard → delete saved search
- [ ] RTL smoke test: load home in AR locale, assert `<html dir="rtl">`

**Setup**

- [ ] Configure Vitest with Nuxt test environment (`@nuxt/test-utils/vitest`)
- [ ] Configure Playwright with base URL from env
- [ ] Add coverage reporting (`@vitest/coverage-v8`), target 70% on composables and utils
- [ ] Add `pnpm test`, `pnpm test:e2e`, `pnpm test:coverage` scripts

### Acceptance Criteria

- `pnpm test` passes on CI with no flaky tests
- E2E tests run against a real Nuxt dev server with mocked API (MSW or Playwright `route()`)
- Coverage report generated and uploaded as CI artifact

---

---

## Issue #017 — CI/CD Pipeline

**Labels:** `infra`
**Priority:** P1
**Milestone:** v1.0

### Context

Every push to `main` should be deployable. Every PR should be blocked if tests fail. The pipeline must be fast enough that it doesn't become a reason to skip it.

### Tasks

- [ ] Create `.github/workflows/ci.yml`
  - Trigger: push to `main`, all PRs
  - Jobs:
    1. `lint` — ESLint + Prettier check
    2. `typecheck` — `nuxi typecheck`
    3. `test:unit` — Vitest
    4. `build` — `nuxt build`
    5. `test:e2e` — Playwright (runs against built app)
  - Cache `node_modules` and `.nuxt` between jobs using `actions/cache`
- [ ] Create `.github/workflows/deploy.yml`
  - Trigger: push to `main` (after CI passes)
  - Jobs:
    1. Docker build + tag with Git SHA
    2. Push image to Amazon ECR
    3. Deploy to ECS staging (auto)
    4. Deploy to ECS production (manual approval via `environment: production`)
- [ ] Add Lighthouse CI check (`lhci autorun`) on PR — fail if Performance < 85
- [ ] Add branch protection: require `ci` workflow to pass before merge to `main`
- [ ] Add `CODEOWNERS` file assigning frontend to `@aqar/frontend-team`

### Acceptance Criteria

- CI pipeline completes in under 5 minutes on a typical PR
- Pushing a commit with a TypeScript error blocks the PR
- Production deployment requires explicit manual approval and is logged in GitHub Environments

---

---

## Issue #018 — Accessibility Audit (WCAG 2.1 AA)

**Labels:** `a11y`
**Priority:** P2
**Milestone:** v1.1

### Context

WCAG 2.1 AA compliance is a legal requirement in many MENA markets and is non-negotiable for government tender clients. This is a dedicated audit issue, not a "fix as you go" item.

### Tasks

- [ ] Run `axe-core` audit across all main pages and document all violations
- [ ] Keyboard navigation audit — every interactive element reachable and operable via Tab / Enter / Space / Arrow keys
- [ ] Focus management — modals, dialogs, drawers trap focus; focus returns to trigger on close
- [ ] Color contrast — all text meets 4.5:1 ratio (normal), 3:1 (large); verify in both light and dark mode
- [ ] Images — all `<img>` and `<NuxtImg>` have meaningful `alt` text; decorative images use `alt=""`
- [ ] Forms — all inputs have associated `<label>` elements; errors are announced via `aria-describedby`
- [ ] Map — Leaflet map has `role="application"` with a keyboard-accessible alternative listing
- [ ] Screen reader test: VoiceOver (Safari/macOS) + NVDA (Chrome/Windows) on listing detail and search pages
- [ ] Fix all Critical and Serious violations before v1.1 release

### Acceptance Criteria

- Zero Critical or Serious axe-core violations on Home, Search, and Listing Detail pages
- All interactive components are fully operable without a mouse

---

---

*Last updated: June 2026*
*Project: Aqar Frontend — Nuxt 4 / Vue 3 / TypeScript*