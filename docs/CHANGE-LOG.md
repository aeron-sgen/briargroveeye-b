# Change log — what the rebuild changed, and why

Every decision is also a row in `audit/change-control.json` (530 rows: 459 IMPROVE, 69 REMOVE, 2 ADD).

## Structure

- Every Briargrove page was moved into the Eye Trends information architecture (`src/tools/routes.mjs`). Each moved URL 301s to its new home.
- Blog posts land at `/eye-health/<slug>`. The blog index (`/whats-new`) becomes `/eye-health`.
- The six `/testimonial/*` posts become `/reviews/<slug>`, under `/reviews` (the source's patient testimonials page).
- "We Also Serve" (Tanglewood, the Galleria) moves under `/visit-us/areas-we-serve`.

## Removed (48 URLs, each with a 301)

- WordPress archives (42: 36 tag, 5 category, 1 author). These are auto-generated link lists with no unique copy; `/eye-health` lists every post.
- Theme template parts exposed as URLs (5: `/template/header`, `/template/footer`, …).
- The platform HTML sitemap (1), replaced by `sitemap.xml`.
- Separately, `/404-page-not-found` is one of the 23 aliases the live server already redirected to `/`; its 301 is kept.

## Content repairs (each traced to the capture)

- **Mis-hosted links.** `/pediatric-eye-exams-at-briargrove-eye-center` linked four of the practice's own pages on `chatgpt.com` instead of `briargroveeye.com` (verified in `audit/raw`). They now point at the rebuilt pages; the list is in `audit/build-report.json` → `hostFixes`.
- **Shouted titles.** All-caps source H1s ("EYE CARE SERVICES IN Uptown Houston, TX") are set in title case. There are 4 such pages, which parity reports as minor `h1-changed`. The words are unchanged.
- **Testimonial ratings.** On each testimonial the source carries the rating only as hidden schema (`itemprop="ratingValue"`). It is now shown as stars, read from the raw capture.
- **Home reviews.** The source's review slider repeats one review five times; it is shown once.

## Kept exactly

- All body copy. Parity mean recall is 99.8%, with 0 content-loss findings and 0 lost source H2 sections.
- Both phone numbers, each where the source used it.
- The Zocdoc booking link, and the Google review, Yelp and Facebook links.
- The source's "SAVE $300" Dailies Total1 promotion image on the home page.
- Every source redirect (23 aliases).

## Not carried over

- 16 images that appeared in page bodies could not be downloaded (CDN 403 or already 404 on the live site). They are listed in `audit/build-report.json` → `imgDropped` and `audit/failures.json` (all 22 failures accepted with reasons).
- The source's animations (91 keyframes) are replaced by the new design's own motion. The originals are kept verbatim in `src/styles/motion.css`.
- The three AI-processed optical photos (garbled poster text) are not used; the real optical photos are used instead.
