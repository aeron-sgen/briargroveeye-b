# Brand system — design B "Galleria Bright"

Light and modern. It uses the same measured Briargrove colours as design A, re-weighted: white and blush surfaces lead, forest green is the accent. Nothing is borrowed from Eye Trends.

## Colour (`src/styles/tokens.css`, `--bb-*` layer)

| token | value | source |
|---|---|---|
| `--bb-green` | `var(--c-3)` = #034c28 | the source site's section green, measured in the browser capture (`audit/design-baseline.json`) |
| `--bb-green-2` / `-ink` | #0a6b3d / #032e19 | a lighter step for links, a darker one for headings |
| `--bb-mint` / `-2` | #e3f1e8 / #cfe7d8 | tints of the green, for chips, soft buttons and panels |
| `--bb-walnut` | `var(--c-2)` = #603712 | the source's heading and button brown, measured; used for icons and ratings |
| `--bb-sun` / `-soft` | #f4c77d / #fdf1dc | a warm highlight derived from the walnut: stars, the boutique panel, the booking card |
| `--bb-blush` / `-2` | `var(--c-7)` = #f7ebe8 / #f1ddd8 | the source's page tint, measured; used for the hero wash and the footer panel |
| `--bb-page` | #fdfcfa | the page background |
| `--bb-ink` ramp | #14201a / #3b4a42 / #637068 | text |

Rule: `site.css` uses tokens only (C13). To change a colour, change it in `tokens.css`.

## Type

- **Display:** Bricolage Grotesque (variable 200–800, optical size pinned at 48), OFL, self-hosted. Weight 800 for H1, 700 elsewhere, tight tracking (-0.025em).
- **Body and UI:** Plus Jakarta Sans (variable 200–800, with italic), OFL, self-hosted.
- **Ramp:** `--bb-step--1 … --bb-step-4`, fluid `clamp()` values. Eyebrows are pill chips: uppercase, 700 weight, mint background.

## Shape

Soft rounded panels: `--bb-radius` 20px for cards, `--bb-radius-l` 32px for media, +8px for full panels. All buttons are pills. The header is a floating pill that stays sticky. Home and interior heroes sit under it on a blush wash.

## Components

- Floating pill header with mega-menus (image tiles for eyewear).
- Home hero: copy on the left; on the right a photo bento (hero portrait, optical wall, and the green "Eyewear Made For You!" card).
- Fact pills, then the service bento with label pills, the mint "Why us" panel with three tiles, and the promo banner.
- Alternating feature rows, the blush kids panel, brand portraits, and the sun-soft boutique panel.
- The green review card with the team photo, a scroll-snap blog carousel (prev/next plus drag), a visit card with an hours panel, and the mint CTA panel.
- A blush footer panel with a large wordmark.
- Interior pages: a centred hero (pill breadcrumb, title, actions) over a full-width rounded banner photo, then a left sticky sidebar (section links with a green current-page marker, booking card, hours) beside the prose.

## Accessibility and motion

- Every interactive target is at least 44px. Focus rings are green (`--bb-focus`).
- The reveal (rise and settle) runs only with JavaScript. `prefers-reduced-motion` disables all motion.
- The carousel is native scroll-snap. The buttons appear only when the track overflows. Keyboard and touch work without JavaScript.
