# Deploying

`dist/` is a complete static site. It has no build step at the host and no runtime dependency.

## Any static host

Upload `dist/` as the web root. Paths are root-relative (`/styles/site.css`), so it must be served from a domain root. For a subfolder preview, run `node src/tools/preview.mjs /<base>`, which writes a prefixed, `noindex` copy to `_site/`.

## Redirects and headers

- `dist/_redirects`: 183 permanent (301) redirects, one per line (`/old  /new/  301`). This is the Netlify / Cloudflare Pages syntax. On Apache, translate each line to `Redirect 301 /old /new/`; on nginx, to `location = /old { return 301 /new/; }`.
- `dist/_headers`: HSTS, `nosniff`, `Referrer-Policy`, `X-Frame-Options: SAMEORIGIN` and a Content-Security-Policy. Other hosts need the same headers set in their own configuration. The CSP allows exactly one inline script (the `js` class flag) by its sha256 hash. If that script changes, `build.mjs` recomputes the hash.
- The CSP allows frames only from `youtube-nocookie.com`, `maps.google.com` and `google.com`, which are the embeds the content uses.

## Forms

The source forms are Gravity Forms on www.briargroveeye.com. The rebuild:

1. links to them (`LIVE_FORMS` in `src/tools/routes.mjs`), and
2. rebuilds each form field for field as `<form data-needs-backend="/api/…">`. `site.js` blocks submission with an explanation until the form is marked `data-backend-ready="true"`.

To go live, choose a processor suitable for patient data (the registration form collects medical history, so it must be HIPAA-appropriate). Then point each form's `action` at it, add `data-backend-ready="true"`, and add the processor's origin to the CSP `form-action`. Until then, **do not** launch on www.briargroveeye.com while `LIVE_FORMS` still points there: `_redirects` would send those URLs back to the rebuilt pages.

## Booking

Every Book / Schedule button links to the practice's Zocdoc page (`facts/client-facts.json` → `links.book`), as the source does.

## Cache

`/assets/*` is cached for 30 days. File names do not change when an image is replaced, so after replacing an asset, purge the host cache or rename the file.
