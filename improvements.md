# Website Performance + UX Acceleration Plan (Next.js)

This repo already has several good foundations (App Router, `next/font`, `next/image`, aggressive static routes in places, caching headers). The biggest remaining wins are structural: remove global client-side wrappers that force app-wide hydration, reduce always-on third-party JS, and stop competing with the critical rendering path via aggressive image preloads/caching.

## North Star Targets (what “big tech fast” means)

- Core Web Vitals (p75 mobile):
  - LCP < 2.0s
  - INP < 200ms
  - CLS < 0.1
- Home route:
  - Minimal hydration: only nav + truly interactive widgets
  - Keep initial JS (per-route) lean (set a budget and enforce it)
- Reliability:
  - No country-redirect flicker/loops
  - Third-party scripts never block initial render

## Current Hotspots Found In Code (highest impact)

- App-wide hydration forced by client providers wrapping `{children}`:
  - `app/layout.tsx` wraps the entire app with `PHProvider` and `ClientLogicWrapper`.
  - Client wrappers live in `src/components/PostHogProvider.tsx` and `src/components/ClientLogicWrapper.tsx`.
  - Because both are `"use client"` and they wrap `{children}`, nearly everything becomes a client subtree (more JS, more hydration, more CPU, worse INP).
- Aggressive image preloading that competes with LCP and main JS:
  - `app/HomeImagePreloader.tsx` injects multiple `<link rel="preload">` and creates `new Image()` instances immediately.
  - Similar patterns exist for testimonials/blogs (preloaders + IndexedDB cache).
- Custom client-side image caching (IndexedDB) adds JS + complexity:
  - `src/utils/imageCache.ts` + `src/components/blogs/CachedBlogImage.tsx` adds runtime work on every image (canvas placeholders, observers, blob URLs).
  - This is usually worse than relying on CDN + browser cache unless the gallery use-case is very specific and measured.
- Middleware adds work on every request and performs a local fetch on `/`:
  - `middleware.ts` calls `/api/geo` (which loads MaxMind DB via `@maxmind/geoip2-node`) to decide whether to redirect.
  - Geo implementation lives in `app/api/geo/route.ts` and `src/utils/geoip.ts`.
  - This adds latency and cold-start risk and is unnecessary on platforms that provide country headers.
- Third-party scripts are always present at the root layout:
  - Meta Pixel, GA, Ads, Freshworks, Calendly (plus PostHog) all add network + main-thread work.
  - Even with `lazyOnload`, they still compete for CPU and can hurt INP on low-end devices.

## P0 (Immediate, biggest win)

1) Stop wrapping the entire app in client providers
   - Goal: keep `app/layout.tsx` a Server Component that renders `{children}` as a server subtree.
   - Approach:
     - Replace `PHProvider` wrapper with a small client-only “Analytics” component that does NOT wrap `{children}`.
       - Example shape: `<Analytics />` as a sibling, not a provider wrapper.
       - Track route changes inside that component with `usePathname()` + `useSearchParams()`.
     - Move modal orchestration out of the global layout:
       - Only mount `ClientLogicWrapper` on routes that truly need it (booking flows, get-me-interview flows).
       - For marketing pages, keep them server-rendered and mount small client widgets where necessary.
   - Expected outcome: large drop in hydration/JS and noticeably snappier navigation + interaction.

2) Replace “preload everything” with “prioritize only LCP”
   - Goal: remove bandwidth contention and unnecessary early downloads.
   - Actions:
     - Remove/limit `app/HomeImagePreloader.tsx` and testimonial/blog preloaders.
     - For the single LCP image (hero), use `next/image` with `priority` + correct `sizes`.
     - For below-the-fold media, rely on `loading="lazy"` and `fetchPriority` defaults.
   - Acceptance: Lighthouse shows improved LCP and reduced “Network requests blocking” warnings.

3) Fix geo-routing to avoid `/api/geo` + MaxMind DB on the critical path
   - Goal: country redirect should be near-zero overhead.
   - Actions:
     - Use platform-provided geo headers when available (preferred):
       - Vercel often provides `x-vercel-ip-country`
       - Cloudflare provides `cf-ipcountry`
     - Persist decision with a cookie (e.g., `ff_country_code_v1`) so repeat visits don’t re-run logic.
     - Update `matcher` to avoid invoking middleware for static assets, including `/_next/image`.
   - Acceptance: `/` redirect adds minimal latency and doesn’t trigger extra server work.

4) Gate third-party scripts behind consent + intent
   - Goal: do not ship analytics/CRM/chat JS to users who haven’t consented or won’t use it.
   - Actions:
     - Add a simple consent mechanism (cookie-based) and only load:
       - Freshworks after consent or after first user interaction
       - Calendly script only on booking pages (or on first “Book now” intent)
       - Ads/Pixel/GA according to consent + sampling
     - Keep `Script` strategies but reduce *presence* of scripts on initial load.
   - Acceptance: lower JS execution time on first load; improved INP.

## P1 (High ROI refactor)

1) Convert marketing pages to Server Components by default
  - Target files: many pages and “pages” components currently start with `"use client"` (e.g. `src/components/pages/home/Home.tsx`).
  - Strategy:
     - Make the page composition server-side.
     - Isolate true client interactivity (accordion, modal triggers, carousel) into small leaf client components.
     - Prefer streaming + `loading.tsx` over client-side spinners.
  - Callout: `src/components/pages/home/Home.tsx` is currently a client component and uses `next/dynamic` with `ssr: true`, which still keeps the subtree client-hydrated; convert the page composition to server-first.

2) Reduce bundle bloat from icon libraries
   - You currently use `react-icons` widely (`react-icons/fa`, `react-icons/bs`).
   - Options:
     - Prefer `lucide-react` (already a dependency) for a consistent, smaller icon set.
     - Or inline a small set of SVGs for critical UI.
   - Acceptance: bundle analyzer confirms reduced icon-related chunks.

3) Simplify blog rendering to reduce client JS
   - Current: `BlogsClient` + custom image caching/preloading.
   - Plan:
     - Render blog lists/posts as server components (data is already local in `src/data/blogsData`).
     - Keep only minimal client code for search/filter UI (if needed).
     - Use `next/image` placeholders (static `blurDataURL` or generated at build time), avoid per-image canvas work.



## P2 (Production hardening) 

1) Add performance budgets + bundle analysis to CI
   - Add `@next/bundle-analyzer` behind `ANALYZE=true`.
   - Set budgets for:
     - Home route JS
     - Shared chunks
     - Largest third-party chunks
   - Fail CI if budgets regress.

2) Caching and headers validation
   - Validate that custom headers in `next.config.ts` aren’t overriding Next.js defaults in harmful ways.
   - Specifically review `Cache-Control` on `/_next/image` (immutable caching is usually not desired here).

3) Observability (real measurements)
   - Use RUM to track Core Web Vitals by route/device.
   - Tie changes to before/after metrics (LCP/INP/CLS + conversion rate).

## Execution Order (practical rollout)

1) P0.1: remove global `{children}` provider wrapping (largest win)
2) P0.2: remove aggressive image preloads/caching on home/blog
3) P0.3: geo routing via headers + cookie + slimmer middleware matcher
4) P0.4: consent + intent gating for scripts
5) P1: server-component refactor of marketing + blog
6) P2: budgets + CI + RUM

## Verification Checklist (use this to confirm improvements)

- Lighthouse (mobile) on:
  - `/` and `/en-ca`
  - `/blog` and a heavy blog post route
- DevTools Performance:
  - Measure hydration time and long tasks on `/`
  - Confirm click responsiveness (INP improvements)
- Network:
  - Confirm only 1-2 critical images are high priority
  - Confirm third-party scripts are not present before consent/intent
- Middleware:
  - Confirm `/` does not call `/api/geo` in production and does not run for static assets

## Notes About This Environment

- Running `node`/`npm` commands here fails due to a Snap confinement/AppArmor issue (not a code problem). Use a non-Snap Node installation (e.g., `nvm`) or run builds in CI/Vercel to generate bundle/route size reports.
