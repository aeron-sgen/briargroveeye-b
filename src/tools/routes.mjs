// Route map: every crawled Briargrove Eye Center URL -> its place in the Eye Trends information architecture.
// Structure source: eyetrends-structure/audit/content-inventory.json (nav + page tree, 43 pages, crawl
//                   re-checked against the live sitemap-pages.xml on 2026-09-28: identical).
// Content source:   briargrove/audit/rendered + audit/content-blocks (browser-rendered evidence).
// Every moved URL gets a 301 in dist/_redirects. Anything not listed and not removed is a blog post and
// lands at /eye-health/<slug> (the Eye Trends library).

export const SITE = 'https://www.briargroveeye.com';
export const SITE_HOST = /(^|\.)briargroveeye\.com$/i;

export const ROUTES = [
  // ── core
  ['/', '/', 'home'],
  ['/our-eye-care-clinic', '/about', 'practice'],
  ['/the-staff', '/about/our-staff', 'practice'],
  ['/our-eye-doctors', '/our-doctor', 'practice'],
  ['/team/dr-shawn-muldoon', '/our-doctor/dr-shawn-muldoon', 'practice'],
  ['/hours-location', '/visit-us', 'practice'],
  ['/location/briargrove-eye-center', '/visit-us/briargrove-eye-center', 'practice'],
  ['/eye-care-services/we-also-serve', '/visit-us/areas-we-serve', 'practice'],
  ['/eye-care-services/we-also-serve/tanglewood-houston', '/visit-us/areas-we-serve/tanglewood-houston', 'practice'],
  ['/eye-care-services/we-also-serve/the-galleria-houston-tx', '/visit-us/areas-we-serve/the-galleria-houston-tx', 'practice'],
  ['/contact-us', '/contact', 'practice'],
  ['/contact-us/contact-form', '/contact/email-us', 'forms'],
  ['/contact-us/patient-registration-form', '/patient-forms', 'forms'],
  ['/contact-us/patient-testimonials', '/reviews', 'reviews'],
  ['/testimonial/dr-muldoon-and-his-staff-go-above-and-beyond-to-give-efficient-friendly-service', '/reviews/above-and-beyond', 'reviews'],
  ['/testimonial/dr-muldoon-has-been-our-family-ophthalmologist-for-17-years', '/reviews/our-family-eye-doctor-for-17-years', 'reviews'],
  ['/testimonial/dr-muldoon-is-a-super-nice-guy', '/reviews/a-super-nice-guy', 'reviews'],
  ['/testimonial/highly-recommended', '/reviews/highly-recommended', 'reviews'],
  ['/testimonial/i-am-a-long-time-satisfied-customer', '/reviews/long-time-satisfied-customer', 'reviews'],
  ['/testimonial/i-highly-recommend-them', '/reviews/i-highly-recommend-them', 'reviews'],
  ['/insurance', '/insurance', 'insurance'],
  ['/insurance/carecredit', '/insurance/carecredit', 'insurance'],
  ['/insurance/faqs-of-vision-insurance-plans', '/insurance/vision-insurance-faqs', 'insurance'],
  ['/insurance/whats-in-your-vision-insurance-plan', '/insurance/whats-in-your-vision-plan', 'insurance'],

  // ── services (Eye Trends: /services + grouped children)
  ['/eye-care-services', '/services', 'services'],
  ['/eye-care-services/eye-exams', '/services/comprehensive-eye-exams', 'svc-exams'],
  ['/eye-care-services/eye-exams/what-to-expect', '/services/comprehensive-eye-exams/what-to-expect', 'svc-exams'],
  ['/eye-care-services/eye-exams/advanced-technology', '/services/comprehensive-eye-exams/advanced-technology', 'svc-exams'],
  ['/eye-care-services/eye-exams/pediatric-eye-exams', '/services/pediatric-eye-exams', 'svc-kids'],
  ['/eye-care-services/eye-exams/pediatric-eye-exams/kids-vision-learning', '/services/pediatric-eye-exams/kids-vision-and-learning', 'svc-kids'],
  ['/eye-care-services/management-of-ocular-diseases', '/services/medical-eye-care', 'svc-medical'],
  ['/eye-care-services/management-of-ocular-diseases/glaucoma-testing-treatment', '/services/glaucoma-management', 'svc-medical'],
  ['/eye-care-services/management-of-ocular-diseases/treating-diabetic-retinopathy', '/services/diabetic-eye-exams', 'svc-medical'],
  ['/eye-care-services/management-of-ocular-diseases/treating-macular-degeneration', '/services/macular-degeneration', 'svc-medical'],
  ['/eye-care-services/management-of-ocular-diseases/cataract-surgery-co-management', '/services/cataract-co-management', 'svc-medical'],
  ['/eye-care-services/lasik-refractive-surgery-co-management', '/services/lasik-co-management', 'svc-medical'],
  ['/eye-care-services/eye-conditions', '/services/eye-conditions', 'svc-medical'],
  ['/eye-care-services/eye-conditions/dry-eye-disease-and-treatment', '/services/dry-eye-treatment', 'svc-medical'],
  ['/eye-care-services/eye-conditions/astigmatism-diagnosis-treatment', '/services/astigmatism', 'svc-medical'],
  ['/eye-care-services/eye-conditions/presbyopia-diagnosis-and-treatment', '/services/presbyopia', 'svc-medical'],
  ['/eye-care-services/latisse', '/services/latisse', 'svc-medical'],
  ['/eye-care-services/emergency-eye-care-services', '/services/emergency-eye-care', 'svc-emergency'],
  ['/eye-care-services/contact-lens-exams', '/services/contact-lens-exams', 'svc-contacts'],
  ['/eye-care-services/contact-lens-exams/hard-to-fit', '/services/specialty-contacts', 'svc-contacts'],

  // ── eyewear (Eye Trends: /products + children)
  ['/eyeglasses', '/products', 'eyewear'],
  ['/eyeglasses/designer-frames', '/products/designer-frames', 'eyewear'],
  ['/eyeglasses/designer-frames/mcallister-eyewear', '/products/designer-frames/mcallister-eyewear', 'eyewear'],
  ['/eyeglasses/kids-optical', '/products/kids-eyewear', 'eyewear'],
  ['/eyeglasses/sunglasses', '/products/sunglasses', 'eyewear'],
  ['/contact-lenses', '/products/contact-lenses', 'eyewear'],
  ['/eyeglasses/eyeglass-guide', '/products/eyeglass-guide', 'eyewear-guide'],
  ['/eyeglasses/quality-eyeglass-lenses-in-houston-tx', '/products/quality-eyeglass-lenses', 'eyewear-guide'],
  ['/eyeglasses/eyeglass-basics', '/products/eyeglass-basics', 'eyewear-guide'],
  ['/eyeglasses/eyeglass-basics/eyeglass-frames', '/products/eyeglass-basics/frames', 'eyewear-guide'],
  ['/eyeglasses/eyeglass-basics/lens-options-for-eyeglasses', '/products/eyeglass-basics/lens-options', 'eyewear-guide'],
  ['/eyeglasses/eyeglass-basics/womens-eyeglass-frames', '/products/eyeglass-basics/womens-frames', 'eyewear-guide'],
  ['/eyeglasses/prescription-eyeglasses', '/products/prescription-eyeglasses', 'eyewear-guide'],
  ['/eyeglasses/prescription-eyeglasses/bifocal-lenses', '/products/prescription-eyeglasses/bifocal-lenses', 'eyewear-guide'],
  ['/eyeglasses/prescription-eyeglasses/caring-for-lenses', '/products/prescription-eyeglasses/caring-for-lenses', 'eyewear-guide'],
  ['/eyeglasses/prescription-eyeglasses/eyeglass-frame-materials', '/products/prescription-eyeglasses/frame-materials', 'eyewear-guide'],
  ['/eyeglasses/prescription-eyeglasses/frame-maintenance', '/products/prescription-eyeglasses/frame-maintenance', 'eyewear-guide'],
  ['/eyeglasses/prescription-eyeglasses/high-index-and-aspheric-lenses', '/products/prescription-eyeglasses/high-index-aspheric-lenses', 'eyewear-guide'],
  ['/eyeglasses/prescription-eyeglasses/polycarbonate-lenses', '/products/prescription-eyeglasses/polycarbonate-lenses', 'eyewear-guide'],
  ['/eyeglasses/lens-treatments', '/products/lens-treatments', 'eyewear-guide'],
  ['/eyeglasses/lens-treatments/anti-reflective', '/products/lens-treatments/anti-reflective', 'eyewear-guide'],
  ['/eyeglasses/lens-treatments/scratch-resistant', '/products/lens-treatments/scratch-resistant', 'eyewear-guide'],
  ['/eyeglasses/lens-treatments/uv-protection', '/products/lens-treatments/uv-protection', 'eyewear-guide'],
  ['/eyeglasses/sunglasses/nonprescription-sunglasses', '/products/sunglasses/nonprescription', 'eyewear-guide'],
  ['/eyeglasses/sunglasses/performance-and-sport-sunglasses', '/products/sunglasses/performance-and-sport', 'eyewear-guide'],
  ['/eyeglasses/sunglasses/prescription-sunglass-treatments', '/products/sunglasses/prescription-treatments', 'eyewear-guide'],
  ['/eyeglasses/sunglasses/prescription-sunglasses', '/products/sunglasses/prescription', 'eyewear-guide'],
  ['/eyeglasses/sunglasses/sunglasses-for-kids', '/products/sunglasses/for-kids', 'eyewear-guide'],
  ['/eyeglasses/transitions-lenses', '/products/transitions-lenses', 'eyewear-guide'],
  ['/eyeglasses/transitions-lenses/are-transitions-right-for-you', '/products/transitions-lenses/are-they-right-for-you', 'eyewear-guide'],
  ['/eyeglasses/transitions-lenses/original-transitions-lenses', '/products/transitions-lenses/original', 'eyewear-guide'],
  ['/eyeglasses/transitions-lenses/transition-solfx-sunwear-products', '/products/transitions-lenses/solfx-sunwear', 'eyewear-guide'],
  ['/eyeglasses/transitions-lenses/transitions-xtractive', '/products/transitions-lenses/xtractive', 'eyewear-guide'],
  ['/specialty-eyewear', '/products/specialty-eyewear', 'eyewear-guide'],
  ['/specialty-eyewear/specialty-eyewear-overview', '/products/specialty-eyewear/overview', 'eyewear-guide'],
  ['/specialty-eyewear/contacts-glasses-that-enhance-performance', '/products/specialty-eyewear/performance-eyewear', 'eyewear-guide'],
  ['/specialty-eyewear/safety-and-sports-glasses', '/products/specialty-eyewear/safety-and-sports-glasses', 'eyewear-guide'],
  ['/specialty-eyewear/scuba-masks-and-swim-goggles', '/products/specialty-eyewear/scuba-masks-and-swim-goggles', 'eyewear-guide'],
  ['/specialty-eyewear/shooting-glasses-and-hunting-eyewear', '/products/specialty-eyewear/shooting-and-hunting-eyewear', 'eyewear-guide'],
  ['/contact-lenses/best-sellers-top-contact-lenses-in-uptown-houston', '/products/contact-lenses/top-contact-lenses', 'eyewear-guide'],
  ['/contact-lenses/bifocal-and-multifocal-contact-lenses', '/products/contact-lenses/multifocal', 'eyewear-guide'],
  ['/contact-lenses/contact-lenses-for-the-hard-to-fit-patient', '/products/contact-lenses/hard-to-fit', 'eyewear-guide'],
  ['/contact-lenses/disposable-contacts', '/products/contact-lenses/disposable', 'eyewear-guide'],
  ['/contact-lenses/eye-exams-for-contact-lenses', '/products/contact-lenses/eye-exams-for-contacts', 'eyewear-guide'],
  ['/contact-lenses/gas-permeable-gp-contact-lenses', '/products/contact-lenses/gas-permeable', 'eyewear-guide'],
  ['/contact-lenses/toric-contact-lenses-for-astigmatism', '/products/contact-lenses/toric', 'eyewear-guide'],
  ['/contact-lenses/our-featured-brands', '/products/contact-lenses/brands', 'eyewear-guide'],
  ['/contact-lenses/order-contact-lenses-online', '/products/contact-lenses/order-online', 'eyewear-guide'],

  // ── eye health library (Eye Trends: /eye-health) — blog index; posts fall through to /eye-health/<slug>
  ['/whats-new', '/eye-health', 'library'],

  // ── legal
  ['/privacy-policy', '/privacy-policy', 'legal'],
  ['/disclaimer', '/disclaimer', 'legal'],
  ['/website-accessibility-policy', '/accessibility', 'legal'],
];

// Art slots: the existing site's own photography (assets/source), chosen per slot by subject.
// key = art slot used by build.mjs / home.mjs, value = downloaded source file in assets/source.
// Real practice photos are preferred (optical, front-desk, exam, team, kids-frames, contacts, sport);
// stock photos the source already used fill topic slots. build.mjs throws on a file not downloaded.
// Not used: the three 1792x2390 PNGs (an AI-processed copy of the optical photo with garbled poster text).
export const SOURCE_ART = {
  'hero': '15523cea-pexels-andrea-piacquadio-874158-1.jpg',        // the source home hero
  'optical': 'cf03cda9-briargrove-optical-banner.jpg',             // real: frame wall
  'optical-tall': '89cbae4c-briargrove-mcallister-scaled.jpg',     // real: McAllister display
  'front-desk': '2c7fabc3-briargrove-front-desk-banner.jpg',       // real: reception
  'exam': 'eadf7710-Dr-Muldoon-and-patient.jpg',                   // real: Dr. Muldoon at the slit lamp
  'team': 'b6b95104-group-briargrove.jpg',                         // real: the team
  'kids-frames': '799ac2d6-Prescription-glasses-and-frames-1536x1227.jpg', // real: kids' frame wall
  'contacts': 'ecf75e52-IMG-3901-scaled.jpg',                      // real: contact lens trial display
  'sport': '6569bf4f-IMG-2482-scaled.jpg',                         // real: Under Armour leaflet in store
  'sunglasses': '77beeced-BB-Hero-aviator-sunglasses-1280x853.jpg',
  'fashion': '3795ae61-green-frames-fashion-640.jpg',
  'family': '32270e54-Family-with-two-kids.jpg',
  'dry-eye': '60460c49-man_rubbing_eys_1280x480-640x427.jpg',
  'insurance': '35da2ff6-insurance-caring-family_1280x853-optimized.jpg',
  'winter': 'f6a67503-woman-dabbing-eyes-in-winter-coat.jpg',
  'lens-splash': '7011eb73-BGs-Recovered.jpg',
};

// Upscaled originals (src/tools/upscale.mjs, Real-ESRGAN x4plus blended 65/35 with a plain enlargement so
// faces keep their natural texture): the practice's own photos, area photos, and the stock/brand photos kept
// below, where the source file is small for how it is shown. Not upscaled, by decision: diagrams, OCT scans,
// the LATISSE before/after (clinical images; an AI upscaler invents detail) and logos/product boxes (text).
export const UPSCALE = [
  'ad5c30f7-Shawn-Muldoon-OD.jpg', 'eadf7710-Dr-Muldoon-and-patient.jpg', '9cf1f242-Doc-Ash-161x300.jpg', 'b6b95104-group-briargrove.jpg',
  '2c7fabc3-briargrove-front-desk-banner.jpg', 'cf03cda9-briargrove-optical-banner.jpg',
  '3ae0a00f-IMG-3903-225x300.jpg', '061902ad-IMG-3902-225x300.jpg', '56d90b29-IMG-2481-225x300.jpg',
  'b8102639-Screen-Shot-2022-04-24-at-8.58.52-PM-1.jpg', '37d76507-briargrove-doc-sunglasses.jpeg',
  'a3522ceb-tanglewood-tx.jpg', '743137e0-tanglewood-tx-300x147.jpg', '52b32c05-GalleriaShops-e1546947752742-300x147.jpg', '5c93ac5b-GalleriaShops-300x225.jpg',
  '2980dd92-lindberg2.jpg', 'e6e4e0bd-toy-20wearing-20glasses.jpg', '239a4aab-Contact-Lens-Info-Display-1280x480-640x240.jpg',
  'c3831135-Ray-ban-thumbnail-1.jpg', '0cc708c6-KATE-SPADE-.jpg', '698f2bd3-ralph-lauren.jpg', 'c9d00b46-Tommy-Hifiger-Ad.jpg',
  '79d10e45-zeiss-progressive_Individual_308-e1544256838727.jpg',
];

// Classic photo corrections applied after upscaling (upscale.mjs; no generative pixels): per-channel levels,
// contrast, saturation, a small warm shift and a light unsharp mask. [contrast, saturate, warm, sharpen]
export const ENHANCE = {
  'eadf7710-Dr-Muldoon-and-patient.jpg': [1.08, 1.12, 6, 0.55],   // flat, grey-beige source: lift it to match the practice's warm palette
};

// Re-imaging: the source's generic stock photos (models, stock families, banner portraits) are swapped for
// generated lifestyle photos (src/tools/generate-art.mjs) wherever they appear, via build.mjs localImage().
// Kept as they are: the practice's own photos (doctor, team, office, optical, storefront, displays), the
// area photos and maps, OCT scans, diagrams and illustrations, product and brand images, the promo image.
// key = downloaded source file, value = [generated slot, alt text for the new photo]
export const REIMAGE = {
  '77beeced-BB-Hero-aviator-sunglasses-1280x853.jpg': ['g-sunglasses', 'A woman wearing aviator sunglasses in the sun'],
  '32270e54-Family-with-two-kids.jpg': ['g-family', 'A young family laughing together on the sofa'],
  '258aea44-caucasian-family-pyramid-300x278.png': ['g-family', 'A young family laughing together on the sofa'],
  'f6a67503-woman-dabbing-eyes-in-winter-coat.jpg': ['g-winter', 'A woman walking outdoors on a cold, windy winter day'],
  '3795ae61-green-frames-fashion-640.jpg': ['g-fashion', 'A woman wearing bold green eyeglass frames'],
  'bc2a94c9-Woman-Sunglasses-Red-Hair-1280x480-640x240.jpg': ['g-banner-sun', 'A woman in sunglasses looking up into the sun'],
  '60460c49-man_rubbing_eys_1280x480-640x427.jpg': ['g-eyestrain', 'A man rubbing his tired eyes after screen work'],
  '2340eefb-Girl-Winter-Orange-Scarf-1280x480.jpg': ['g-winter-wide', 'A young woman in an orange scarf on a winter day'],
  'fa330841-transitions-groupshot.jpg': ['g-photochromic-group', 'Friends in the sun wearing lenses that have darkened outdoors'],
  'f7b61a9a-clipart-038.jpg': ['g-kid-glasses', 'A smiling girl wearing colourful kids’ eyeglasses'],
  'f769b860-transitions-girlwithbag.jpg': ['g-photochromic-phone', 'A woman on her phone in the sun with lenses that have darkened'],
  'ebdaa910-spa-beauty-1280x480-1-640x240.jpg': ['g-banner-calm', 'A woman resting with her eyes closed'],
  'e6faeb1e-Femal-Face-Closeup-Blue-Eyes-1280x480-1-640x240.jpg': ['g-banner-eyes', 'A smiling woman with bright, clear eyes'],
  'e6bd78ba-Woman-Smiling-1280x480-640x240.jpg': ['g-banner-smile', 'A smiling woman wearing tortoiseshell eyeglasses'],
  'dc599eed-Woman-with-glasses-sitting-by-wall-1280x853-300x200.jpg': ['g-woman-glasses', 'A woman wearing modern eyeglasses sitting outdoors'],
  'cd0f3f4a-Business20Man20Desk20Computer201280x480_preview1-640x240.jpeg': ['g-computer', 'A man in eyeglasses working at a computer'],
  '85cb860e-girl_using_computer.jpg': ['g-computer', 'A man in eyeglasses working at a computer'],
  'c4e771eb-adjusting-to-new-glasses_640x350.jpg': ['g-new-glasses', 'A young woman adjusting a new pair of eyeglasses'],
  'ab1ce6c4-father-20and-20son-20shaking-20hands.png': ['g-father-son', 'A father and his adult son smiling together'],
  'a53a0aec-Household-Cleaning_640x350.jpg': ['g-cleaning', 'Cleaning a kitchen counter wearing gloves and protective glasses'],
  '8d8965a2-contacts3.jpg': ['g-card-exams', 'A smiling woman in a sun hat wearing eyeglasses'],
  '8b72c07d-contacts6.jpg': ['g-card-contacts', 'A smiling young woman outdoors'],
  '8534b862-father-20waving-20with-20child.png': ['g-dad-child', 'A father in eyeglasses carrying his daughter and waving'],
  '7f804e42-Man20Smiling20Field201280x480_preview1-640x240.jpeg': ['g-banner-man', 'A smiling young man in eyeglasses at golden hour'],
  '76837f61-Teen-Girl-Smiling-Window-1280x480-640x240.jpg': ['g-banner-teen', 'A smiling teenage girl in eyeglasses by a window'],
  '67008b21-transitions-ladyreading.jpg': ['g-reading-outdoor', 'A woman reading in the sun with lenses that have darkened'],
  '486001ae-Happy20Family20Outside201280x480_preview2-1024x384.jpeg': ['g-banner-family', 'Three generations of a family smiling in a park'],
  '3f09c715-Girl20Brown20Hair201280x853_preview1-300x200.jpeg': ['g-young-woman', 'A young woman with curly hair outdoors'],
  '329028b3-Girl20Brown20Hair201280x480_preview1-640x240.jpeg': ['g-young-woman', 'A young woman with curly hair outdoors'],
  '3c9fc451-Man-Wearing-Suit-Laughing-1280x480-640x240.jpg': ['g-banner-suit', 'A laughing man in a suit wearing eyeglasses'],
  '35da2ff6-insurance-caring-family_1280x853-optimized.jpg': ['g-insurance', 'A mother and daughter hugging at home'],
  '28d2b9c3-Study_Shows_Vision_Problems_Are_Common_in_Older_Parkinson_s_Patients.jpg': ['g-seniors', 'Two older women laughing together on a garden bench'],
  '10a89bc9-transitions-girlonphone.jpg': ['g-photochromic-phone', 'A woman on her phone in the sun with lenses that have darkened'],
  // small illustrations whose message is kept with a sharp generated photo (diagrams, OCT scans, the LATISSE
  // before/after, logos, product boxes and the promo are deliberately NOT replaced: see docs/README.md)
  'e5e8716f-antireflective-large.jpg': ['g-antiglare', 'Eyeglasses with anti-reflective lenses: no glare from the laptop screen'],
  '074b1bdb-uv-large.jpg': ['g-uv-sun', 'Clear eyeglass lenses outdoors in strong midday sun'],
  '869c6be8-familybrands-icon.jpg': ['g-transitions-family', 'A family in the sun wearing lenses that have darkened outdoors'],
  '714fb532-cataracts-icon.jpg': ['g-cataract-view', 'A view that is cloudy on one side and clear on the other, as cataracts cloud vision'],
  // (the astigmatism focal image is kept: 8 generations of a half-blurred street all came back framed in a matte)
};

// The source's own forms are Gravity Forms behind a domain-bound reCAPTCHA; the rebuild links to them
// (the same decision the owner made for the sibling Vision Pro rebuild).
// ⚠ Once this rebuild goes live on www.briargroveeye.com these URLs no longer reach WordPress; repoint
// them at wherever the old forms keep running, or at a new form processor, before launch.
export const LIVE_FORMS = {
  registration: 'https://www.briargroveeye.com/contact-us/patient-registration-form/',
  contact: 'https://www.briargroveeye.com/contact-us/contact-form/',
};

// Aliases: old paths the live server 301s to a real page, taken verbatim from the crawl's redirect
// record (audit/site-inventory.json pages[].aliases, 2026-09-28). Links are pointed at the target's new
// URL, and each alias gets its own 301 in _redirects.
export const ALIASES = {
  '/404-page-not-found': '/',
  '/eye-care-services/your-eye-health/vision-over-40/how-progressive-lenses-work': '/contact-lenses',
  '/eyeglasses-contacts/contact-lenses': '/contact-lenses',
  '/eye-care-services/your-eye-health/eye-conditions-info/presbyopia': '/eye-care-services',
  '/eye-care-services/your-eye-health/eye-conditions-info/nearsighted-myopia': '/eye-care-services',
  '/eye-care-services/your-eye-health/eye-diseases/cataracts': '/eye-care-services',
  '/eye-care-services/emergency-eye-care': '/eye-care-services/emergency-eye-care-services',
  '/comprehensive-eye-exams': '/eye-care-services/eye-exams',
  '/eye-care-services/your-eye-health/eye-exams': '/eye-care-services/eye-exams',
  '/eye-care-services/pediatric-eye-exams': '/eye-care-services/eye-exams/pediatric-eye-exams',
  '/eye-care-services/your-eye-health/vision-surgery/lasik': '/eye-care-services/management-of-ocular-diseases/cataract-surgery-co-management',
  '/eye-care-services/your-eye-health/eye-diseases/diabetes-and-eyesight/treatment-for-diabetic-retinopathy': '/eye-care-services/management-of-ocular-diseases/treating-diabetic-retinopathy',
  '/tanglewood-houston': '/eye-care-services/we-also-serve/tanglewood-houston',
  '/eyeglasses-frames': '/eyeglasses',
  '/eyeglasses-frames/designer-frames': '/eyeglasses/designer-frames',
  '/designer-frames': '/eyeglasses/designer-frames',
  '/eyeglasses-contacts/designer-frames': '/eyeglasses/designer-frames',
  '/eyeglass-basics': '/eyeglasses/eyeglass-basics',
  '/eyeglasses-contacts/prescription-eyeglasses': '/eyeglasses/prescription-eyeglasses',
  '/eyeglasses-frames/sunglasses': '/eyeglasses/sunglasses',
  '/eyeglasses-contacts/sunglasses': '/eyeglasses/sunglasses',
  '/your-eye-health/protecting-your-eyes': '/protecting-your-eyes-from-the-desk-job',
  '/eyeglasses-contacts/specialty-eyewear': '/specialty-eyewear',
};

// Removals: platform scaffolding, not content. [pattern, reason, 301 target].
export const REMOVALS = [
  [/^\/tag\//, 'WordPress tag archive: auto-generated list of post links, no unique copy; posts are listed on /eye-health', '/eye-health'],
  [/^\/category\//, 'WordPress category archive: auto-generated list of post links, no unique copy', '/eye-health'],
  [/^\/author\//, 'WordPress author archive: auto-generated list of post links, no unique copy', '/eye-health'],
  [/^\/template\//, 'Theme template part (header/footer) exposed as a URL; not a page', '/'],
  [/^\/sitemap$/, 'HTML sitemap generated by the platform; replaced by sitemap.xml and the full footer index', '/'],
];
