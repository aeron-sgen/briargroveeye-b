# Briargrove Eye Center — redesign, design B "Galleria Bright"

A total redesign experiment built with `/site-reforge` (redesign lane).

| | |
|---|---|
| **Page structure** | https://eyetrendsclearlake.com/ — information architecture only (43-page crawl in `../eyetrends-structure/`, re-checked against the live `sitemap-pages.xml` on 2026-09-28: identical). No Eye Trends content, facts or imagery is carried over. |
| **Content, facts, assets, brand** | https://www.briargroveeye.com/ (EyeCarePro "flex" WordPress theme on Beaver Builder, 165 URLs, crawled and browser-rendered 2026-09-28). |
| **Sibling design** | `../briargrove/` — design A, the same content pipeline with a different visual system (repo https://github.com/SGENCMS/briargroveeye, preview https://sgencms.github.io/briargroveeye/). |
| **Repository** | https://github.com/aeron-sgen/briargroveeye-b (public) |
| **Preview** | https://aeron-sgen.github.io/briargroveeye-b/ — a `noindex` copy of `dist/`, re-based for the subfolder by `src/tools/preview.mjs` in `.github/workflows/pages.yml`. It deploys on every push that changes `dist/`, so after a change: build, run the checks, commit `dist/`, push. |
| **This version** | Design B, modern restyle (2026-10-05).<br>**Layout from Eye Trends:** a utility strip and solid header; full-width cream / mist / deep-green bands; brass mono labels and two-tone headings; dark photo tiles; split interior heroes; a dark booking band and a dark footer.<br>**Patterns from the example https://sgencms.github.io/eyecarecatoosa-b/:** quick-link cards over the hero; ring breadcrumbs; round haloed interior photos; arched, numbered feature photos; a dark sidebar visit card. The nav has a hover underline.<br>**Imagery:** all 57 generated images redone in a "sunlit studio" style (Higgsfield Soul; prompts in `audit/generated-art.json`), plus 23 upscaled practice photos (`audit/upscaled.json`).<br>**Mobile:** spacing fixes and phone-only swipe carousels. |

## What is in the build (`dist/`)

- 117 pages: every Briargrove page that carries content, placed in the Eye Trends IA (`/services`, `/products`, `/our-doctor`, `/visit-us`, `/insurance`, `/reviews`, `/eye-health`, …), plus `/search/` and `404.html`.
- 48 source URLs removed as platform scaffolding (tag / category / author archives, theme template parts, the HTML sitemap). Each one 301s to its nearest real page; `dist/_redirects` holds 183 redirects in total (moved pages, removals and the 23 aliases the live server already redirected).
- 91 source images, served locally, with WebP `srcset` variants (`src/tools/responsive.mjs`).
- `sitemap.xml`, `robots.txt`, `llms.txt`, per-page canonical / Open Graph, `Optometrist` JSON-LD on the home page, `BreadcrumbList` on every interior page.
- `_headers`: security headers and a Content-Security-Policy (Netlify / Cloudflare Pages syntax; see DEPLOY.md for other hosts).

## Rebuild

```bash
P=<this folder>; CDP=<scratch>/cdp.mjs; S=~/.claude/skills/site-reforge/scripts
node $P/src/tools/extract-blocks.mjs $CDP        # only if extraction rules change (SHARD=i/n PORT=… to parallelise)
node $P/src/tools/build.mjs                      # regenerates dist/ (wipes it first)
node $P/src/tools/responsive.mjs $CDP            # only after images change; then build again
node $S/sr-seo.mjs --project $P --dir $P/dist --site-url https://www.briargroveeye.com --apply
node $S/sr-parity.mjs --project $P --dir $P/dist --new $P/dist --map $P/audit/route-map.json
node $S/sr-fabrication.mjs --project $P --dir $P/dist
node $S/sr-decontaminate.mjs --project $P --dir $P/dist --strict
node $S/sr-gate.mjs --project $P
node $S/sr-serve.mjs --root $P/dist --port 8802 --no-open
```

`sr-seo --apply` rewrites `dist/`, so it must run **before** parity / fabrication / decontamination, or the gate reports them stale.

## Code map

| file | role |
|---|---|
| `src/tools/routes.mjs` | every source URL → its Eye Trends route; removals with reasons; aliases; art slots; live form URLs |
| `src/tools/build.mjs` | content pipeline shared by both designs: routing, link rewriting, images, blocks → HTML, forms, search, redirects, sitemap, headers |
| `src/tools/design.mjs` | **design B** chrome and templates (floating pill header, mega-menu, drawer, footer panel, centred interior hero + banner + left sidebar, CTA panel, form handoff) |
| `src/tools/home.mjs` | **design B** home page: Eye Trends section order, Briargrove copy (every string asserted against the rendered source) |
| `src/styles/tokens.css` | sr-tokens baseline + the design B brand layer (`--bb-*`) |
| `src/styles/site.css` | design B stylesheet (tokens only, no colour literals) |
| `src/scripts/site.js` | progressive enhancement: menus, drawer, reveal, search, form guard, carousels |

## Open items for the practice

1. **Primary phone.** The source shows 855-974-4245 on its Call buttons and (713) 974-2020 in the NAP / JSON-LD. The rebuild keeps each where the source had it. 855 may be a call-tracking number — unverified.
2. **Forms.** `/patient-forms/` and `/contact/email-us/` link to the live Gravity Forms (domain-bound reCAPTCHA; they cannot be posted to or embedded from elsewhere). The full source form is rebuilt below each link but is inert until a processor is configured (DEPLOY.md). Before launch on the real domain, repoint `LIVE_FORMS` in `routes.mjs`.
3. **22 source images could not be downloaded** (19 refused by the CDN with HTTP 403, 3 already broken on the live site). The pages that used them fall back to existing-site photography. See `audit/failures.json`.
4. **Photo rights.** Stock photography came through the old platform; its licence terms are unverified.
