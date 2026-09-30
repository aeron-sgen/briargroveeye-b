// DESIGN B home page: Eye Trends section order, Briargrove Eye Center copy.
// Section copy is read from audit/content-blocks/index.json by heading. Card labels, post titles and the
// review title live in markup the block extractor skips; they are taken from the rendered page text
// (audit/rendered/index.json) through S(), which THROWS if the string is not in the source verbatim.
// Every source H1/H2/H3 stays a heading element (sr-parity counts source H2 sections).
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')), '../..');

export function renderHome(page, k) {
  const { esc, inline, ART, localImage, BOOK, EXT, PHONE_CALL, PHONE_NAP, tel, hoursTable, facts, SITE, seo, layout, imageUse, fullTitle, D, A } = k;
  const { ICON } = D;
  // prev/next for a phone-only carousel (m-carousel); site.js unhides it only while the track overflows
  const mNav = (id, label) => '<div class="carousel-nav m-carousel-nav" data-carousel-nav="' + id + '" hidden><button type="button" class="carousel-btn" data-dir="-1" aria-controls="' + id + '" aria-label="Previous ' + label + '">' + ICON.arrowL + '</button><button type="button" class="carousel-btn" data-dir="1" aria-controls="' + id + '" aria-label="Next ' + label + '">' + ICON.arrowR + '</button></div>';
  const RENDERED = JSON.parse(fs.readFileSync(path.join(ROOT, 'audit/rendered/index.json'), 'utf8')).bodyText.replace(/\s+/g, ' ');
  const S = (t) => { if (!RENDERED.includes(t.replace(/\s+/g, ' '))) throw new Error('home: string not in the rendered source: ' + t); return t; };
  const B = page.data.blocks;
  const hIdx = (h) => { const i = B.findIndex((b) => b.t === 'h' && b.text.replace(/\s+/g, ' ').startsWith(h)); if (i < 0) throw new Error('home: heading not found in source: ' + h); return i; };
  const H = (h) => B[hIdx(h)].text.replace(/\s+/g, ' ').trim();
  const eyebrowLine = (b) => b.t === 'p' && b.html.replace(/\[\[[^\]]*\]\]/g, '') === b.html.replace(/\[\[[^\]]*\]\]/g, '').toUpperCase();
  const after = (h, { passImages = false } = {}) => { const out = []; for (let j = hIdx(h) + 1; j < B.length && B[j].t !== 'h' && (passImages || B[j].t !== 'img') && !eyebrowLine(B[j]); j++) if (B[j].t === 'p') out.push(B[j].html); return out; };
  const P = (arr) => arr.map((h) => '<p>' + inline(h) + '</p>').join('');
  const img = (a, sizes, { lazy = true, alt = '' } = {}) => '<img src="' + a.src + '" alt="' + esc(alt) + '" width="' + a.w + '" height="' + a.h + '"' + (lazy ? ' loading="lazy"' : ' fetchpriority="high"') + ' decoding="async" sizes="' + sizes + '">';
  const src = (u) => { const l = localImage(u); if (l) imageUse.push({ page: '/', src: l.src }); return l; };
  const SZ = { hero: '(max-width: 960px) calc(100vw - 48px), 420px', half: '(max-width: 960px) calc(100vw - 48px), 600px', card: '(max-width: 640px) calc(100vw - 48px), (max-width: 1100px) calc(50vw - 36px), 400px', small: '(max-width: 960px) 45vw, 260px', full: '(max-width: 1288px) calc(100vw - 48px), 1240px', post: '(max-width: 640px) 80vw, 360px' };

  const h1 = H('Comprehensive Eye Care in Houston');
  const [heroLead, ...heroRest] = after('Comprehensive Eye Care in Houston');
  const promo = src('https://da4e1j5r7gw87.cloudfront.net/wp-content/uploads/sites/2426/2025/06/image-26.png');
  const promoAlt = (B.find((b) => b.t === 'img' && /image-26/.test(b.src)) || {}).alt || '';
  const pillars = [['TOP CONTACT LENSES', ICON.lens, '/contact-lenses/'], ['EYEGLASSES', ICON.glasses, '/eyeglasses/'], ['EYE EMERGENCIES', ICON.alert, '/eye-care-services/emergency-eye-care-services/']];
  const cards = [
    [S('TRY OUR NEW LOOK'), '/eyeglasses/designer-frames/', 'green-frames-fashion-640.jpg'],
    [S('CONTACTS'), '/contact-lenses/', 'contacts6.jpg'],
    [S('OUR OPTOMETRISTS'), '/our-eye-doctors/', 'back-of-staff-member3.jpg'],
    [S('EYE EXAMS'), '/eye-care-services/eye-exams/', 'contacts3.jpg'],
  ].map(([t, href, file]) => { const b = B.find((x) => x.t === 'img' && x.src.endsWith(file)); return [t, href, b ? src(b.src) : null]; });
  // "Our Optometrists" shows the practice's real doctor, not the source's stock photo of a man's back: a
  // generated person on this card would read as the optometrist
  cards[2][2] = { ...ART.exam, alt: 'Dr. Muldoon examining a patient at the slit lamp' };
  const brands = [[S('RAY - BAN'), 'Ray-ban-thumbnail-1.jpg'], [S('KATE SPADE'), 'KATE-SPADE-.jpg'], [S('RALPH LAUREN'), 'ralph-lauren.jpg'], [S('TOMMY HILFIGER'), 'Tommy-Hifiger-Ad.jpg']]
    .map(([t, f]) => { const b = B.find((x) => x.t === 'img' && x.src.endsWith(f)); return [t, b ? src(b.src) : null]; });
  const postTitles = [S('New Glaucoma Treatments in 2026: Beyond Eye Drops'), S('At-Home vs. In-Office Dry Eye Treatments'), S('Why Your Reading Vision Came Back'), S('Silent Vision Loss and Emergency Eye Care in Uptown Houston')];
  const postHrefs = ['/new-glaucoma-treatments-in-2026-beyond-eye-drops/', '/at-home-vs-in-office-dry-eye-treatments/', '/why-your-reading-vision-came-back/', '/silent-vision-loss-and-emergency-eye-care-in-uptown-houston/'];
  const ei = B.findIndex((b) => b.t === 'p' && /EYE HEALTH BLOGS/.test(b.html));
  const postExcerpts = B.slice(ei + 1, ei + 5).map((b) => b.html);
  // each card shows its own post's hero, so card and article match
  const postArt = ['g-drops', 'dry-eye', 'g-reading', 'g-retina-light'];
  const review = facts.testimonials[0];
  S(review.title); S(review.text);

  const body = `
<section class="home-hero" aria-labelledby="hero-h1">
<div class="hero-photo">${img(ART['g-home-wide'], '100vw', { lazy: false })}</div>
<div class="wrap hero-grid">
<div class="hero-copy">
<p class="eyebrow">${esc(S('WELCOME!'))}</p>
<h1 id="hero-h1">${esc(h1)}</h1>
<p class="lead">${inline(heroLead)}</p>
${P(heroRest)}
<div class="hero-actions"><a class="btn btn-primary btn-lg" href="${BOOK}"${EXT}>Book Appointment ${ICON.arrow}</a><a class="btn btn-soft btn-lg" href="${tel(PHONE_CALL)}">${ICON.phone} Call ${esc(PHONE_CALL)}</a></div>
</div>
<aside class="hero-card" aria-labelledby="made-h">
<div class="hero-card-media">${img(ART.optical, '88px', { alt: 'The Briargrove Eye Center frame wall' })}</div>
<h2 id="made-h">${esc(S('Eyewear Made For You!'))}</h2><p>${inline(B.find((b) => b.t === 'p' && b.html.startsWith('Choosing your eyewear')).html)}</p><a class="link-arrow" href="/eyeglasses/">Eyeglasses &amp; Frames</a>
</aside>
</div>
<div class="wrap"><ul class="fact-pills">
<li>${ICON.pin}<span>${esc(A.landmark)}</span></li>
<li>${ICON.clock}<span>Mon, Tue, Thu, Fri 9:00 AM - 6:00 PM · Sat 8:00 AM - 2:00 PM</span></li>
<li>${ICON.phone}<a href="${tel(PHONE_NAP)}">${esc(PHONE_NAP)}</a></li>
</ul></div>
</section>

<section class="section" aria-labelledby="svc-h"><div class="wrap">
<div class="section-head reveal"><div><p class="eyebrow">${esc(S('QUICK LINKS FOR YOU'))}</p><h2 id="svc-h">${esc(H('Our Eyecare Services'))}</h2></div><a class="btn btn-soft" href="/eye-care-services/">All eye care services ${ICON.arrow}</a></div>
<ul class="bento m-carousel" id="svc-track">${cards.map(([t, href, im], n) => '<li class="reveal b' + n + '"><a href="' + href + '">' + (im ? img(im, SZ.card) : '') + '<span class="bento-label"><b>' + esc(fullTitle(t)) + '</b><i>' + ICON.arrow + '</i></span></a></li>').join('')}</ul>${mNav('svc-track', 'services')}
</div></section>

<section class="section tight" aria-labelledby="why-h"><div class="wrap"><div class="panel mint">
<div class="section-head reveal"><div><p class="eyebrow">${esc(S('WHY US?'))}</p><h2 id="why-h">${esc(H('3 Things That Make'))}</h2></div></div>
<ul class="tiles m-carousel" id="why-track">${pillars.map(([h, ic, href]) => '<li class="tile reveal"><span class="tile-ic">' + ic + '</span><h3><a href="' + href + '">' + esc(fullTitle(H(h))) + '</a></h3>' + P(after(h)) + '</li>').join('')}</ul>${mNav('why-track', 'reasons')}
</div>
${promo ? '<figure class="promo reveal">' + img(promo, SZ.full, { alt: promoAlt }) + '</figure>' : ''}
</div></section>

<section class="section" aria-labelledby="exam-h"><div class="wrap feature">
<div class="feature-copy reveal"><p class="eyebrow">${esc(S('OUR FOCUS IS…'))}</p><h2 id="exam-h">${esc(H('Comprehensive Eye Exams with'))}</h2>${P(after('Comprehensive Eye Exams with'))}
<p class="actions"><a class="btn btn-primary" href="${tel(PHONE_CALL)}">${ICON.phone} ${esc(S('Call Us'))} ${esc(PHONE_CALL)}</a><a class="link-arrow" href="/eye-care-services/eye-exams/">Eye exams</a></p></div>
<div class="feature-media reveal">${img(ART.exam, SZ.half, { alt: 'Dr. Muldoon examining a patient at the slit lamp' })}</div>
</div></section>

<section class="section" aria-labelledby="cl-h"><div class="wrap feature flip">
<div class="feature-copy reveal"><h2 id="cl-h">${esc(H('Comfortable Contact Lens Fittings'))}</h2>${P(after('Comfortable Contact Lens Fittings'))}
<p class="actions"><a class="btn btn-primary" href="${BOOK}"${EXT}>${esc(S('Schedule An Appointment'))}</a><a class="link-arrow" href="/contact-lenses/">Contact lenses</a></p></div>
<div class="feature-media tall reveal">${img(ART.contacts, SZ.half, { alt: 'Contact lens trial sets in the Briargrove Eye Center optical' })}</div>
</div></section>

<section class="section tight" aria-labelledby="kids-h"><div class="wrap"><div class="panel blush feature">
<div class="feature-copy reveal"><p class="eyebrow">${esc(S('OUR FOCUS IS…'))}</p><h2 id="kids-h">${esc(H('Pediatric Eye Exams'))}</h2>${P(after('Pediatric Eye Exams'))}
<p class="actions"><a class="btn btn-primary" href="${BOOK}"${EXT}>Schedule An Appointment</a><a class="link-arrow" href="/eye-care-services/eye-exams/pediatric-eye-exams/">Pediatric eye exams</a></p></div>
<div class="feature-media reveal">${img(ART['kids-frames'], SZ.half, { alt: 'Colourful kids’ frame wall at Briargrove Eye Center' })}</div>
</div></div></section>

<section class="section" aria-labelledby="frames-h"><div class="wrap">
<div class="section-head center reveal"><div><p class="eyebrow">${esc(S('OUR FAVOURITES'))}</p><h2 id="frames-h">${esc(H('Stylish Optical Boutique'))}</h2></div></div>
<ul class="brands reveal m-carousel" id="brand-track" aria-label="Featured brands">${brands.map(([t, im]) => '<li>' + (im ? img(im, SZ.small) : '') + '<span>' + esc(t) + '</span></li>').join('')}</ul>${mNav('brand-track', 'brands')}
<div class="boutique reveal"><div class="boutique-copy">${P(after('Stylish Optical Boutique', { passImages: true }))}<p class="actions"><a class="btn btn-primary" href="/eyeglasses/designer-frames/">Designer Frames ${ICON.arrow}</a><a class="link-arrow" href="/eyeglasses/sunglasses/">Sunglasses</a></p></div>
<div class="boutique-media">${img(ART['optical-tall'], SZ.half, { alt: 'McAllister eyewear display in the Briargrove optical' })}</div></div>
</div></section>

<section class="section tight" aria-labelledby="tech-h"><div class="wrap feature flip">
<div class="feature-copy reveal"><h2 id="tech-h">${esc(H('Advanced Technology'))}</h2>${P(after('Advanced Technology'))}
<p class="actions"><a class="btn btn-primary" href="${BOOK}"${EXT}>Schedule An Appointment</a><a class="link-arrow" href="/eye-care-services/eye-exams/advanced-technology/">Advanced technology</a></p></div>
<div class="feature-media reveal">${img(ART['front-desk'], SZ.half, { alt: 'The Briargrove Eye Center front desk' })}</div>
</div></section>

<section class="section" aria-labelledby="rev-h"><div class="wrap"><div class="review-card reveal">
<div class="review-body"><p class="eyebrow on-dark" id="rev-h">${esc(S('REVIEWS'))}</p><span class="stars" aria-hidden="true">${ICON.star.repeat(5)}</span>
<blockquote><p class="review-title">${esc(review.title)}</p><p>${esc(review.text)}</p></blockquote>
<p class="actions"><a class="btn btn-light" href="${facts.links.reviewsYelp}"${EXT}>${esc(S('Read Our Reviews'))}</a><a class="link-arrow on-dark" href="/contact-us/patient-testimonials/">Patient testimonials</a></p></div>
<div class="review-media">${img(ART.team, SZ.half, { alt: 'The Briargrove Eye Center team' })}</div>
</div></div></section>

<section class="section tight" aria-labelledby="news-h"><div class="wrap">
<div class="section-head reveal"><div><h2 id="news-h">${esc(fullTitle(S('EYE HEALTH BLOGS & LATEST NEWS')))}</h2></div>
<div class="carousel-nav" data-carousel-nav="post-track" hidden><button type="button" class="carousel-btn" data-dir="-1" aria-controls="post-track" aria-label="Previous articles">${ICON.arrowL}</button><button type="button" class="carousel-btn" data-dir="1" aria-controls="post-track" aria-label="Next articles">${ICON.arrowR}</button></div></div>
<div class="carousel" role="region" aria-roledescription="carousel" aria-labelledby="news-h"><ul class="carousel-track" id="post-track" tabindex="0">${postTitles.map((t, i) => '<li class="slide"><a class="post" href="' + postHrefs[i] + '"><span class="post-ph">' + img(ART[postArt[i]], SZ.post) + '</span><h3>' + esc(t) + '</h3><p>' + esc(postExcerpts[i].replace(/\[\[[^\]]*\]\]/g, '')) + '</p><span class="more">Read more ' + ICON.arrow + '</span></a></li>').join('')}</ul></div>
<p class="more-link"><a class="link-arrow" href="/whats-new/">What’s New</a></p>
</div></section>

<section class="section tight" aria-labelledby="visit-h"><div class="wrap"><div class="visit reveal">
<div class="visit-info"><p class="eyebrow">Visit us</p><h2 id="visit-h"><a href="/hours-location/">Hours &amp; Location</a></h2>
<p class="visit-addr">${ICON.pin}<span>Briargrove Eye Center<br>${esc(A.street)}<br>${esc(A.city)}, ${esc(A.region)} ${esc(A.postal)}</span></p>
<p class="muted">${esc(A.landmark)}</p>
<p class="actions"><a class="btn btn-primary" href="${BOOK}"${EXT}>Book Appointment</a><a class="btn btn-soft" href="${facts.links.directions}"${EXT}>Directions</a></p></div>
<div class="visit-hours">${hoursTable()}</div>
</div></div></section>
${D.ctaBand(k)}`;

  const s = seo.pages.find((x) => x.url === page.url) || {};
  const ld = {
    '@context': 'https://schema.org', '@type': 'Optometrist', name: 'Briargrove Eye Center', url: SITE + '/',
    telephone: PHONE_NAP, faxNumber: facts.fax, image: SITE + ART.hero.src,
    address: { '@type': 'PostalAddress', streetAddress: A.street, addressLocality: A.city, addressRegion: A.region, postalCode: A.postal, addressCountry: A.country },
    openingHoursSpecification: facts.hoursStructured.filter((d) => d.slots.length).flatMap((d) => d.slots.map((sl) => { const [o, c] = sl.split(' - '); const t = (x) => { const [hm, ap] = x.split(' '); let [h, m] = hm.split(':').map(Number); if (ap === 'PM' && h !== 12) h += 12; return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0'); }; return { '@type': 'OpeningHoursSpecification', dayOfWeek: d.day, opens: t(o), closes: t(c) }; })),
    employee: { '@type': 'Person', name: facts.people[0].name, jobTitle: facts.people[0].role },
    sameAs: [facts.links.facebook, facts.links.reviewsYelp],
  };
  return layout({ title: s.title || page.data.title, description: s.metaDescription || page.data.description, canonical: SITE + '/', body, current: '/', jsonld: [ld] });
}
