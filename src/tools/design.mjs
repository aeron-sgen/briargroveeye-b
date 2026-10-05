// DESIGN B — "Galleria Bright".
// Light, modern clinic: white and blush surfaces, forest green as the accent (Briargrove's own measured
// colours, audit/design-baseline.json), Bricolage Grotesque over Plus Jakarta Sans, a floating pill
// header, bento layouts, big soft-cornered panels. Same content pipeline as design A (build.mjs);
// this file, home.mjs and src/styles/* are the only differences.

export const NAME = 'design-b-galleria-bright';

export const ICON = {
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  glasses: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 14h4M3 14l1.5-6H7M21 14l-1.5-6H17"/></svg>',
  lens: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><ellipse cx="12" cy="12" rx="9" ry="6"/><path d="M5 10c2 1.5 12 1.5 14 0"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3l2.8 5.8 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.3l1-6.2L3 9.7l6.2-.9z"/></svg>',
  form: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  arrowL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
  arrowR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
};

const FONTS = ['bricolage-normal-200-800.woff2', 'jakarta-normal-200-800.woff2'];

// Eye Trends-style two-tone heading: the last `n` words in the accent colour. Text is unchanged (only wrapped).
export function hl(esc, text, n = 2) {
  const w = String(text).trim().split(/\s+/);
  if (w.length <= n + 1) return esc(text);
  return esc(w.slice(0, -n).join(' ')) + ' <span class="hl">' + esc(w.slice(-n).join(' ')) + '</span>';
}
const LOGO = '/assets/brand/briargrove-logo.jpg';

function header(current, k) {
  const { esc, NAV, ART, BOOK, EXT, PHONE_CALL, tel } = k;
  const cur = (href) => (current === href || (href !== '/' && current.startsWith(href + '/')) ? ' aria-current="page"' : '');
  const list = (arr) => arr.map(([h, t]) => '<li><a href="' + h + '/">' + esc(t) + '</a></li>').join('');
  const svc = NAV.services.map(([h, links]) => '<div class="mega-group"><p class="mega-h">' + esc(h) + '</p><ul>' + list(links) + '</ul></div>').join('');
  const eyeCards = NAV.eyewear.map(([href, t, art]) => '<a class="mega-tile" href="' + href + '/"><img src="' + ART[art].src + '" alt="" width="120" height="90" loading="lazy" sizes="140px"><span>' + esc(t) + '</span></a>').join('');
  const { A, PHONE_NAP } = k;
  // Eye Trends structure: a dark utility strip (address, hours, phone) above a solid full-width header
  return `<a class="skip" href="#main">Skip to main content</a>
<div class="utility"><div class="wrap"><span class="u-addr">${ICON.pin}${esc(A.street)}, ${esc(A.city)}, ${esc(A.region)} ${esc(A.postal)}</span><span class="u-hours">${ICON.clock}Mon, Tue, Thu, Fri 9:00 AM - 6:00 PM · Sat 8:00 AM - 2:00 PM</span><a class="u-phone" href="${tel(PHONE_NAP)}">${ICON.phone}${esc(PHONE_NAP)}</a></div></div>
<header class="site-header"><div class="wrap"><div class="bar">
<a class="brand" href="/"><img src="${LOGO}" alt="Briargrove Eye Center" width="199" height="118" sizes="80px"></a>
<nav class="nav" aria-label="Primary"><ul>
<li class="has-mega"><button type="button" aria-expanded="false" aria-controls="mega-services">Eye Care ${ICON.chev}</button><div class="mega mega-svc" id="mega-services">${svc}<a class="mega-all" href="/services/">All eye care services ${ICON.arrow}</a></div></li>
<li class="has-mega"><button type="button" aria-expanded="false" aria-controls="mega-eyewear">Eyewear ${ICON.chev}</button><div class="mega mega-eye" id="mega-eyewear"><div class="mega-tiles">${eyeCards}</div><ul class="mega-links">${list([['/products', 'Eyeglasses & Frames'], ['/products/eyeglass-basics', 'Eyeglass Basics'], ['/products/prescription-eyeglasses', 'Prescription Eyeglasses'], ['/products/lens-treatments', 'Lens Treatments'], ['/products/transitions-lenses', 'Transitions Lenses'], ['/products/specialty-eyewear', 'Specialty Eyewear']])}</ul></div></li>
<li class="has-mega"><button type="button" aria-expanded="false" aria-controls="mega-practice">Practice ${ICON.chev}</button><div class="mega mega-prac" id="mega-practice"><div class="mega-group"><p class="mega-h">Practice</p><ul>${list(NAV.practice)}</ul></div><div class="mega-group"><p class="mega-h">Patients</p><ul>${list(NAV.patients)}</ul></div></div></li>
<li><a href="/insurance/"${cur('/insurance')}>Insurance</a></li>
<li><a href="/visit-us/"${cur('/visit-us')}>Visit</a></li>
</ul></nav>
<div class="header-cta"><a class="icon-btn" href="${tel(PHONE_CALL)}" aria-label="Call ${esc(PHONE_CALL)}">${ICON.phone}</a><a class="btn btn-primary" href="${BOOK}"${EXT}><span>Book Appointment</span>${ICON.arrow}</a>
<button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="drawer">${ICON.menu}</button></div>
</div></div></header>
<div class="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="Menu"><div class="drawer-scrim" data-close></div><div class="drawer-panel">
<div class="drawer-head"><a class="brand" href="/"><img src="${LOGO}" alt="Briargrove Eye Center" width="199" height="118" sizes="72px"></a><button class="menu-close" type="button" aria-label="Close menu" data-close>${ICON.close}</button></div>
<a class="d-link" href="/">Home</a>
<details><summary>Eye Care</summary><ul><li><a href="/services/">All eye care services</a></li>${NAV.services.flatMap(([, l]) => l).map(([h, t]) => '<li><a href="' + h + '/">' + esc(t) + '</a></li>').join('')}</ul></details>
<details><summary>Eyewear</summary><ul><li><a href="/products/">Eyeglasses &amp; Frames</a></li>${NAV.eyewear.map(([h, t]) => '<li><a href="' + h + '/">' + esc(t) + '</a></li>').join('')}</ul></details>
<details><summary>Practice</summary><ul>${list(NAV.practice)}${list(NAV.patients)}</ul></details>
<a class="d-link" href="/insurance/">Insurance</a><a class="d-link" href="/visit-us/">Hours &amp; Location</a>
<div class="drawer-cta"><a class="btn btn-primary" href="${BOOK}"${EXT}>Book Appointment</a><a class="btn btn-soft" href="${tel(PHONE_CALL)}">${ICON.phone} Call ${esc(PHONE_CALL)}</a></div>
</div></div>`;
}

function footer(k) {
  const { esc, NAV, BOOK, EXT, PHONE_NAP, PHONE_CALL, tel, A, hoursTable, facts } = k;
  return `<footer class="site-footer"><div class="wrap">
<div class="foot-panel">
<div class="foot-head"><h2 class="foot-name"><a href="/visit-us/briargrove-eye-center/">Briargrove Eye Center</a></h2><p class="foot-actions"><a class="btn btn-primary" href="${BOOK}"${EXT}>Schedule Appointment</a><a class="btn btn-soft" href="${facts.links.directions}"${EXT}>Directions</a></p></div>
<div class="foot-grid">
<div><h3>Visit</h3><p>${esc(A.street)}<br>${esc(A.city)}, ${esc(A.region)} ${esc(A.postal)}</p><p class="muted">${esc(A.landmark)}</p><p>Phone: <a href="${tel(PHONE_NAP)}">${esc(PHONE_NAP)}</a><br>Fax: ${esc(facts.fax)}</p></div>
<div><h3>Hours</h3>${hoursTable('hours hours-foot')}</div>
<div><h3>Eye Care</h3><ul>${NAV.services.map(([h, l]) => '<li><a href="' + l[0][0] + '/">' + esc(h) + '</a></li>').join('')}<li><a href="/services/">All services</a></li></ul></div>
<div><h3>Eyewear</h3><ul>${NAV.eyewear.map(([h, t]) => '<li><a href="' + h + '/">' + esc(t) + '</a></li>').join('')}<li><a href="/products/prescription-eyeglasses/">Prescription Eyeglasses</a></li><li><a href="/products/eyeglass-basics/">Eyeglass Basics</a></li></ul></div>
</div>
<div class="foot-search"><form class="site-search" role="search" action="/search/" method="get"><label for="footer-q">Search the site</label><div><input id="footer-q" name="q" type="search" placeholder="Dry eye, contacts, insurance…" autocomplete="off"><button class="btn btn-primary" type="submit">Search</button></div></form>
<p class="foot-social"><a href="${facts.links.facebook}"${EXT}>Facebook</a><a href="${facts.links.reviewsYelp}"${EXT}>Yelp</a><a href="${facts.links.reviewsGoogle}"${EXT}>Review us on Google</a></p></div>
</div>
<div class="foot-bottom"><span>© 2026 Briargrove Eye Center</span><ul><li><a href="/contact/">Contact Us</a></li><li><a href="/eye-health/">What’s New</a></li><li><a href="/products/prescription-eyeglasses/">Prescription Eyeglasses</a></li><li><a href="/accessibility/">Accessibility</a></li><li><a href="/privacy-policy/">Privacy</a></li><li><a href="/disclaimer/">Disclaimer</a></li></ul></div>
</div></footer>
<div class="mobile-bar"><a class="btn btn-soft" href="${tel(PHONE_CALL)}">${ICON.phone} Call</a><a class="btn btn-primary" href="${BOOK}"${EXT}>Book Appointment</a></div>`;
}

export function layout({ title, description, canonical, body, current, ogImage, jsonld = [] }, k) {
  const { esc, SITE, ART, JS_FLAG } = k;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
${description ? '<meta name="description" content="' + esc(description) + '">' : ''}
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
${description ? '<meta property="og:description" content="' + esc(description) + '">' : ''}
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:image" content="${esc(SITE + (ogImage || ART.hero.src))}">
<meta name="theme-color" content="#fdfcfa">
<link rel="icon" href="/assets/brand/favicon.png">
${FONTS.map((f) => '<link rel="preload" href="/assets/fonts/' + f + '" as="font" type="font/woff2" crossorigin>').join('\n')}
<link rel="stylesheet" href="/styles/tokens.css">
<link rel="stylesheet" href="/styles/site.css">
${jsonld.map((j) => '<script type="application/ld+json">' + JSON.stringify(j) + '</script>').join('\n')}
<script>${JS_FLAG}</script>
</head>
<body>
${header(current, k)}
<main id="main">
${body}
</main>
${footer(k)}
<script src="/scripts/site.js" defer></script>
</body>
</html>
`;
}

export function ctaBand(k, h = 'Eye Exams & Eye Care For Your Entire Family', p = 'To book your eye exam, contact us today!') {
  const { esc, BOOK, EXT, PHONE_CALL, tel, ART } = k;
  // modern refresh: a deep-green panel with a generated eyewear still life (no people) beside the copy
  const a = ART['g-still-cta'];
  const media = a ? `<div class="cta-media"><img src="${a.src}" alt="" width="${a.w}" height="${a.h}" loading="lazy" decoding="async" sizes="(max-width: 960px) 100vw, 560px"></div>` : '';
  return `<section class="cta"><div class="wrap"><div class="cta-panel${a ? ' has-media' : ''} reveal"><div class="cta-copy"><h2>${hl(esc, h)}</h2><p>${esc(p)}</p><div class="actions"><a class="btn btn-light btn-lg" href="${BOOK}"${EXT}>Book Appointment ${ICON.arrow}</a><a class="btn btn-outline-light btn-lg" href="${tel(PHONE_CALL)}">${ICON.phone} ${esc(PHONE_CALL)}</a></div></div>${media}</div></div></section>`;
}

export function formHandoff({ name, href, kind }, k) {
  const { esc, BOOK, EXT, PHONE_NAP, tel } = k;
  return '<div class="form-handoff">'
    + '<h2>' + esc(name) + '</h2>'
    + '<p>The form opens on briargroveeye.com in a new tab. Fill it in there and it goes straight to our office.</p>'
    + '<p class="form-handoff-actions"><a class="btn btn-primary" href="' + esc(href) + '" target="_blank" rel="noopener">Open the ' + esc(name) + '</a>'
    + (kind === 'contact' ? '<a class="btn btn-soft" href="' + BOOK + '"' + EXT + '>Book an appointment instead</a>' : '') + '</p>'
    + '<p class="hint">Prefer to talk? Call <a href="' + tel(PHONE_NAP) + '">' + esc(PHONE_NAP) + '</a>.</p>'
    + '</div>';
}

export function interior({ page, title, lead, heroImg, crumbs, prose, related }, k) {
  const { esc, BOOK, EXT, PHONE_CALL, tel, A, hoursTable } = k;
  const tall = heroImg && heroImg.h && heroImg.w && heroImg.h >= heroImg.w * 0.9;
  // Eye Trends structure: split hero, copy on the left and the photo in a card on the right
  const banner = heroImg ? '<div class="banner' + (heroImg.contain ? ' contain' : '') + (tall ? ' tall' : '') + '"><img src="' + heroImg.src + '" alt="' + esc(heroImg.alt) + '" width="' + (heroImg.w || 1600) + '" height="' + (heroImg.h || 1200) + '" fetchpriority="high" sizes="(max-width: 960px) calc(100vw - 40px), 600px"></div>' : '';
  const side = (related.links.length ? '<nav class="side-card side-links" aria-label="' + esc(related.heading) + '"><p class="side-h">' + esc(related.heading) + '</p><ul>' + related.links.map(([h, t, isCur]) => '<li><a href="' + h + '"' + (isCur ? ' aria-current="page"' : '') + '>' + esc(t) + '</a></li>').join('') + '</ul></nav>' : '')
    + '<div class="side-card side-book"><p class="side-h">Eye Exams &amp; Eye Care For Your Entire Family</p><p>To book your eye exam, contact us today!</p><a class="btn btn-primary" href="' + BOOK + '"' + EXT + '>Schedule An Appointment</a><a class="btn btn-soft" href="/patient-forms/">Patient History Form</a><a class="btn btn-soft" href="/contact/email-us/">Email Us</a></div>'
    + '<div class="side-card side-hours"><p class="side-h">Hours &amp; Location</p><p>' + esc(A.street) + '<br>' + esc(A.city) + ', ' + esc(A.region) + ' ' + esc(A.postal) + '</p>' + hoursTable() + '<a class="link-arrow" href="/visit-us/">Hours &amp; Location</a></div>';
  return `
<section class="page-hero${heroImg ? ' split' : ' no-media'}"><div class="wrap${heroImg ? ' page-hero-grid' : ' narrow'}">
<div class="page-hero-copy">${crumbs}${page.group !== 'article' && related.heading && related.heading !== 'In this section' && related.heading !== title ? '<p class="eyebrow">' + esc(related.heading) + '</p>' : ''}<h1>${hl(esc, title)}</h1>${lead ? '<p class="lead">' + lead + '</p>' : ''}
<div class="hero-actions"><a class="btn btn-primary" href="${BOOK}"${EXT}>Book Appointment ${ICON.arrow}</a><a class="btn btn-soft" href="${tel(PHONE_CALL)}">${ICON.phone} ${esc(PHONE_CALL)}</a></div></div>
${banner}</div></section>
<div class="wrap page-body">
<aside class="side" aria-label="Related">${side}</aside>
<article class="prose">
${prose}
</article>
</div>
${ctaBand(k)}`;
}

export function simplePage({ title, html, after = '' }, k) {
  return '<section class="page-hero no-media"><div class="wrap narrow"><h1>' + k.esc(title) + '</h1>' + html + '</div></section>' + after + ctaBand(k);
}
