// Generated hero art for interior pages that have no photo of their own (Higgsfield API, Soul standard).
// usage: HF_KEY=<id:secret> node src/tools/generate-art.mjs <cdp.mjs> [slot ...]
//
// Policy: lifestyle photographs of people wearing or using eyewear in everyday settings (home, outdoors,
// sport). Never a clinic, exam room or optical store, never anyone in scrubs or a white coat, never an
// exam, procedure or treatment result, and no text or logos, so no generated person can pass for this
// practice's doctor, staff or patients. Real practice photography (routes.mjs SOURCE_ART) stays on the
// pages about the practice.
//
// Writes assets/generated/<slot>.jpg (1600px wide, JPEG q0.86, downscaled with headless Chrome's canvas
// encoder like responsive.mjs) and records every prompt in audit/generated-art.json (committed; /assets/
// is not). Existing slots are skipped unless named on the command line.
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { pathToFileURL, fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'assets/generated');
const RECORD = path.join(ROOT, 'audit/generated-art.json');
const API = 'https://api.higgsfield.ai';
const MODEL = 'higgsfield-ai/soul/standard';
const POLICY = 'lifestyle photographs of people in everyday settings; never a clinic, exam room, optical store, medical staff, exam, procedure or treatment result; no text or logos';
// design B modern copy (2026-10-05 regeneration, owner's pick "A: sunlit studio"): a current eyewear-campaign look,
// hard sunlight with crisp graphic shadows over muted sage and warm cream, matching the restyled site (the earlier
// airy mint/blush set is archived in assets/generated/_before-regen-2026-10-05/)
const STYLE = 'modern eyewear brand campaign photograph, clean minimal composition, strong direct sunlight with crisp graphic shadows, muted sage green and warm cream palette with deep forest green accents, smooth plain surfaces, contemporary minimal styling in cream, sage, camel or forest green tones, crisp high-end commercial look, shallow depth of field, one single continuous photograph, close medium shot from the waist up, the person filling about two thirds of the frame height and centred with a little space above the head, face clearly visible, natural relaxed confident expression, full-bleed photograph filling the whole frame edge to edge, no border, no text, no labels, no logos';
// (describe what IS wanted: naming things to forbid them, e.g. coats, uniforms or eyewear, makes Soul draw them)

export const PROMPTS = {
  'g-lens-coating': 'a man in his thirties wearing clear thin-rimmed eyeglasses working on a laptop in a dim home office at night, his lenses clear with no glare or reflections',
  'g-uv': 'a woman in her forties wearing clear eyeglasses sitting by a bright sunny café window, sunlight across her face',
  'g-lens-workbench': 'a man in his fifties wearing slim lightweight rimless eyeglasses walking along a leafy city street, looking ahead',
  'g-frame-care': 'an older man in a checked flannel shirt sitting at a kitchen table polishing the lenses of a pair of eyeglasses held in his hands with a small cloth, looking down at the glasses, he is not wearing them, morning light',
  'g-frame-materials': 'a young woman at home by a window holding up two pairs of eyeglass frames, tortoiseshell and gold wire, deciding between them',
  'g-progressive': 'a woman in her sixties in a rust-coloured knit sweater wearing eyeglasses reading a hardcover book in a green armchair beside a warm lamp',
  'g-contact-case': 'a young woman at a bright bathroom vanity holding an open contact lens case, morning routine; she is not wearing glasses or any eyewear, bare face',
  'g-contact-macro': 'a young woman in a red sports top playing tennis on an outdoor court, mid-swing, focused and smiling, bright clear eyes, bare natural face',   // naming eyewear, even negated, makes Soul draw it
  'g-sunglasses': 'a woman wearing aviator sunglasses on a sunny terrace in the afternoon, relaxed',
  'g-kids-sunglasses': 'a smiling young child wearing colourful kids\' sunglasses and a sun hat at the beach',
  'g-sport': 'a cyclist wearing wraparound sport sunglasses and a helmet pausing on a country road at sunrise',
  'g-swim': 'a swimmer wearing swimming goggles resting at the edge of an outdoor pool, turquoise water',
  'g-shooting': 'a man wearing amber-tinted shooting glasses and ear protection earmuffs at an outdoor clay range in autumn, looking into the distance, no firearm visible',
  'g-photochromic': 'a woman in a green knit sweater walking outdoors on a sunny street wearing eyeglasses whose lenses are visibly tinted dark grey like sunglasses in the bright sun',
  'g-exam-optics': 'a middle-aged couple in casual autumn jackets walking together in a park in golden light, the man wearing eyeglasses, both smiling',
  'g-retina-light': 'an older man wearing eyeglasses reading a newspaper by a bright window at home, calm and focused',
  'g-drops': 'a woman in a blue sweater at home by a window, head tilted back, holding a small eye drop bottle above her open eye, a single clear drop falling from the bottle, soft daylight',
  'g-tap-water': 'a woman in a striped shirt in a bright kitchen filling a clear drinking glass with water from the tap, morning light',
  'g-safety': 'a woodworker wearing clear protective safety glasses at a workbench in a sunlit workshop, wood shavings',
  'g-benefits': 'a couple in casual knit sweaters at a home kitchen table looking over household paperwork and a laptop together, both wearing eyeglasses, relaxed',
  'g-prism': 'a young man in a green hoodie on a hillside trail at sunrise looking out over a wide valley view, bright clear eyes, bare natural face, smiling',
  'g-reading': 'an older man in a navy cardigan wearing reading glasses reading a book on a green sofa, warm lamp light',
  'g-clear-cloudy': 'an older woman wearing eyeglasses smiling outdoors in a sunny garden, bright clear daylight',
  // home heroes: design A lays copy over the left of a full-bleed photo; design B shows a tall tile
  'g-home-wide': 'a stylish man in his thirties in a forest-green overshirt wearing tortoiseshell eyeglasses, warm confident smile, standing on the right third of the frame on a leafy tree-lined city street at golden hour, the left half of the frame calm soft out-of-focus greenery and warm light',
  'g-home-tall': 'head-and-shoulders portrait of a smiling woman in her thirties in a rust-coloured blouse wearing gold wire-rim eyeglasses, outdoors in warm late-afternoon light with soft green foliage behind her',
  // in-body and card replacements for the source's generic stock photos (routes.mjs REIMAGE); the aspect
  // follows the photo each one replaces so page layouts keep their shape
  'g-family': 'a young family of four on a living-room sofa laughing together, two small children, the father wearing eyeglasses',
  'g-winter': 'a woman in a forest-green winter coat and knit hat walking outdoors on a cold windy day, blinking against the wind',
  'g-fashion': 'a fashionable young woman wearing bold green acetate eyeglasses, playful smile, hands lightly framing her face',
  'g-banner-sun': 'a woman with auburn hair wearing sunglasses looking up into warm sunlight',
  'g-eyestrain': 'a man in a navy sweater at a desk rubbing his tired eyes after long screen work, laptop open in front of him',
  'g-winter-wide': 'a young woman in an orange knit scarf outdoors on a crisp winter day, snow-dusted evergreen trees behind her',
  'g-photochromic-group': 'a group of smiling friends outdoors in bright sunshine, several wearing eyeglasses whose lenses are tinted grey in the sun',
  'g-kid-glasses': 'a smiling girl about seven years old wearing colourful kids\' eyeglasses, playing outdoors in a park',
  'g-banner-calm': 'a relaxed woman in a mustard-yellow sweater sitting on a green sofa by a sunny window, eyes gently closed, calm and refreshed, her whole face in view',
  'g-banner-eyes': 'close-up portrait of a smiling woman with bright clear eyes in soft daylight, bare natural face',
  'g-banner-smile': 'a smiling woman wearing tortoiseshell eyeglasses outdoors in warm golden light',
  'g-woman-glasses': 'a woman in her fifties in a denim jacket and striped top wearing modern eyeglasses sitting on a stone wall outdoors, relaxed',
  'g-computer': 'a man in a red plaid flannel shirt working at a desktop computer in a cosy home study with bookshelves, wearing eyeglasses',
  'g-new-glasses': 'waist-up photo of a young woman with curly hair in a mustard sweater adjusting a new pair of eyeglasses on her face and smiling, standing in a bright living room',
  'g-father-son': 'an older father in a navy quarter-zip sweater and his adult son in a green flannel shirt smiling together in a backyard, the father wearing eyeglasses',
  'g-cleaning': 'a person wearing yellow rubber gloves and clear protective glasses wiping a bright kitchen counter with a spray bottle',
  'g-card-exams': 'waist-up photo of a smiling woman in a wide-brimmed straw hat and a rust-coloured top wearing eyeglasses, standing in a garden in warm light',
  'g-card-contacts': 'a smiling young woman with curly hair outdoors, bright clear eyes, bare natural face',
  'g-dad-child': 'a father in a green t-shirt and jeans wearing eyeglasses carrying his young daughter on his hip and waving, in a sunny park',
  'g-banner-man': 'a smiling young man in a leather jacket in a sunlit field at golden hour, wearing eyeglasses',
  'g-banner-teen': 'a smiling teenage girl by a bright window, wearing eyeglasses',
  'g-reading-outdoor': 'a woman in a teal linen shirt reading a book in a garden chair in bright sun, wearing eyeglasses whose lenses are tinted grey',
  'g-banner-family': 'three generations of a family smiling together in a park: a grandfather in a blue cardigan and a grandmother in a red blouse, both wearing eyeglasses, their adult daughter and two children in colourful clothes',
  'g-young-woman': 'a young woman with long curly brown hair in a green knit sweater sitting on a park bench, photographed from a few metres away with space above her head, bright clear eyes, bare natural face, soft smile',
  'g-banner-suit': 'waist-up photo of a laughing bald man with a beard in a navy suit wearing eyeglasses, his whole head in view, in a bright office lobby',
  'g-insurance': 'a mother and young daughter hugging and smiling at home, the mother wearing eyeglasses',
  'g-seniors': 'two older women laughing together on a garden bench, one wearing eyeglasses',
  'g-photochromic-phone': 'a woman in a mustard trench coat talking on her phone on a sunny city street, wearing eyeglasses whose lenses are tinted grey',
  // HD stand-ins for small source illustrations that carry a message (the message is kept, the pixels are new)
  'g-antiglare': 'a man in his forties in a green sweater wearing eyeglasses reading a laptop at a desk at night, his lenses perfectly clear with no reflections or glare, warm desk lamp',
  'g-uv-sun': 'waist-up photo of a woman in a straw hat and a coral t-shirt wearing clear eyeglasses outdoors in strong midday sunshine in a park, blue sky and green trees behind her, her face and shoulders filling the lower half of the frame',
  'g-transitions-family': 'a smiling family of four in colourful casual clothes (a red jacket, a green sweater, denim) walking outdoors on a sunny day, the parents wearing eyeglasses whose lenses are tinted grey in the sun',
  'g-cataract-view': 'a sunny garden seen through a window, the left half of the view hazy, faded and cloudy as if through a clouded lens, the right half crisp, bright and clear, no people',
  'g-astig-view': 'wide photograph of a city street at dusk seen through slightly unfocused eyes, every streetlight and car headlight smeared into a doubled, stretched streak, shop windows glowing, a rainy reflective road, filling the whole frame',
};
// design B overrides: each names the clothing colour and the framing outright (B's first pass drew long white
// coats, uniforms and tiny far-off subjects when these were left open)
Object.assign(PROMPTS, {
  'g-fashion': 'waist-up photo of a fashionable young woman in a mustard-yellow knit sweater wearing bold green acetate eyeglasses, playful smile, hands lightly framing her face',
  'g-insurance': 'a mother in a denim shirt wearing eyeglasses hugging her young daughter in a pink t-shirt at home, both smiling, waist-up',
  'g-sunglasses': 'waist-up photo of a woman in a coral linen shirt wearing aviator sunglasses on a sunny terrace, relaxed',
  'g-banner-teen': 'waist-up photo of a smiling teenage girl in a green hoodie wearing eyeglasses by a bright window',
  'g-seniors': 'two older women laughing together on a garden bench, one in a red cardigan and one in a yellow floral blouse, one wearing eyeglasses',
  'g-lens-coating': 'a man in his thirties in a navy and white striped shirt wearing clear thin-rimmed eyeglasses working on a laptop in a home office at night, his lenses clear with no glare',
  'g-photochromic-group': 'a group of smiling friends in bright casual clothes (red, yellow, denim, green) outdoors in sunshine, several wearing eyeglasses whose lenses are tinted grey in the sun',
  'g-kid-glasses': 'close-up waist-up photo of a smiling girl about seven in a yellow t-shirt wearing colourful kids\' eyeglasses, in a park',
  'g-kids-sunglasses': 'close-up waist-up photo of a smiling young child in a striped t-shirt wearing colourful kids\' sunglasses and a sun hat at the beach',
  'g-lens-workbench': 'waist-up photo of a man in his fifties in a blue polo shirt wearing slim lightweight rimless eyeglasses on a city street, looking ahead',
  'g-banner-sun': 'waist-up photo of a smiling woman with auburn hair in a coral top wearing sunglasses sitting on a sunny terrace, centred in the frame',
  'g-card-contacts': 'waist-up photo of a smiling young woman with curly hair in a teal top outdoors, bright clear eyes, bare natural face',
  'g-winter': 'waist-up photo of a woman in a forest-green winter jacket and knit hat outdoors on a cold windy day, blinking against the wind',
  'g-cataract-view': 'soft-focus dreamy photograph of an older man in a navy cardigan in a sunny garden, waist-up, a milky glowing haze over the whole picture',
  'g-clear-cloudy': 'waist-up photo of a smiling older woman in a coral blouse wearing eyeglasses in a sunny garden with green hedges',
  // full-bleed home hero in design A's layout: headline on the left over a light wash, so the person stands on the right
  'g-home-wide': 'wide photo of a smiling woman in her thirties in a coral linen blouse wearing gold wire-rim eyeglasses, standing on the right side of the frame (not centred), waist-up, in a bright airy room; the left half of the frame is an open, softly out-of-focus plain white and mint-green wall with a tall green plant at the far edge',
});
// still lifes (no people) for the modern refresh: eyewear objects only, so they sit well inside the policy
const STILL = 'minimal modern product still-life photograph for an eyewear brand campaign, strong direct sunlight from the side with crisp graphic shadows, calm uncluttered composition with generous empty space on the left, palette of warm cream, muted sage, deep forest green and small touches of warm brass gold, shallow depth of field, full-bleed photograph filling the whole frame edge to edge, no border, no text, no labels, no logos';
const STILL_SLOTS = {
  'g-still-cta': 'two pairs of eyeglasses, one tortoiseshell acetate frame and one thin gold wire frame, resting on a smooth pale mint stone block, beside a small blush-pink ceramic vase holding one green eucalyptus sprig, against a plain warm cream wall, placed on the right half of the frame',
};
Object.assign(PROMPTS, STILL_SLOTS);
// modern-set fixes (2026-10-05): clothing stated outright, and no lobby (Soul wrote signage on its walls)
Object.assign(PROMPTS, {
  'g-contact-case': 'a young woman in a soft cream knit sweater at a bright minimal bathroom vanity holding an open contact lens case close to her face, morning routine, natural clear eyes',
  'g-banner-suit': 'waist-up photo of a laughing bald man with a beard in a navy suit wearing eyeglasses, his whole head in view, in a bright minimal space with smooth plain walls',
  // a named backdrop place (window, valley, living room) comes back as a small picture on the studio set, so
  // these keep the idea and drop the place
  'g-uv': 'a woman in her forties wearing clear eyeglasses, waist-up, bright sunlight falling across her face and shoulders, eyes relaxed',
  'g-retina-light': 'an older man wearing eyeglasses reading a newspaper held open in both hands, waist-up, calm and focused, sunlight falling across him',
  'g-prism': 'a young man in a green hoodie looking into the distance with a bright easy smile, clear eyes, waist-up',
  'g-sport': 'a cyclist in a helmet and wraparound sport sunglasses standing beside a road bike, waist-up, relaxed after a ride',
  // ("portrait" makes Soul hang a framed picture on the set wall, so these avoid the word)
  'g-family': 'wide candid photo of a young family of four laughing together, two small children held in their parents\' arms, the father wearing eyeglasses, standing close in front of a seamless sage green backdrop that fills the entire background from edge to edge, all four faces large',
  'g-uv-sun': 'head-and-shoulders portrait of a woman in a straw sun hat and eyeglasses, her face fully visible in bright sunlight, calm easy smile',
  'g-dad-child': 'candid close-up photo of a smiling father wearing eyeglasses holding his toddler daughter on his hip against a sage green wall, both faces large in the photo',
  'g-cataract-view': 'an older man in his seventies wearing eyeglasses smiling with clear bright eyes, waist-up, sunlight falling across his face',
});
// aspect per slot; the crop and output size follow it. Default 4:3 hero art. The live API accepts only
// 9:16, 16:9, 4:3, 3:4, 1:1, 2:3 and 3:2, so a 21:9 banner is requested at 16:9 and cropped here.
const ASPECT = {
  'g-home-wide': [16, 9], 'g-home-tall': [3, 4],
  'g-family': [16, 9], 'g-fashion': [3, 4], 'g-kid-glasses': [3, 4], 'g-card-exams': [3, 4], 'g-card-contacts': [3, 4],
  'g-eyestrain': [3, 2], 'g-woman-glasses': [3, 2], 'g-young-woman': [3, 2], 'g-insurance': [3, 2], 'g-seniors': [3, 2],
  'g-new-glasses': [16, 9], 'g-cleaning': [16, 9],
  'g-antiglare': [3, 2], 'g-uv-sun': [3, 2], 'g-transitions-family': [3, 2], 'g-cataract-view': [3, 2], 'g-astig-view': [16, 9],
  'g-still-cta': [3, 2],
  'g-banner-sun': [21, 9], 'g-winter-wide': [21, 9], 'g-banner-calm': [21, 9], 'g-banner-eyes': [21, 9], 'g-banner-smile': [21, 9],
  'g-computer': [21, 9], 'g-banner-man': [21, 9], 'g-banner-teen': [21, 9], 'g-banner-family': [21, 9], 'g-banner-suit': [21, 9],
};
// minimum usable width after trimming, where a slot is shown smaller than the 767px banner column
const MINW = { 'g-astig-view': 1000 };
const MAXW = { 'g-home-wide': 2048, 'g-home-tall': 1200, 'g-fashion': 1200, 'g-kid-glasses': 1200, 'g-card-exams': 1200, 'g-card-contacts': 1200 };

const [cdpPath, ...only] = process.argv.slice(2);
const KEY = process.env.HF_KEY;
if (!cdpPath || !KEY) { console.error('usage: HF_KEY=<id:secret> node src/tools/generate-art.mjs <cdp.mjs> [slot ...]'); process.exit(1); }
const AUTH = { Authorization: 'Key ' + KEY, 'Content-Type': 'application/json' };
const { launch, newPage } = await import(pathToFileURL(path.resolve(cdpPath)).href);
fs.mkdirSync(OUT, { recursive: true });
const record = fs.existsSync(RECORD) ? JSON.parse(fs.readFileSync(RECORD, 'utf8')) : { images: {} };
Object.assign(record, { policy: POLICY, model: MODEL, style: STYLE });
const todo = Object.keys(PROMPTS).filter((k) => only.length ? only.includes(k) : !fs.existsSync(path.join(OUT, k + '.jpg')));

// canvas downscale in headless Chrome. The download is served over loopback with its real type (Soul
// returns PNG; canvas refuses file:// images, and a multi-MB data: URL stalls the CDP eval).
const mime = (buf) => buf[0] === 0x89 && buf[1] === 0x50 ? 'image/png' : buf[0] === 0xff && buf[1] === 0xd8 ? 'image/jpeg' : buf.toString('latin1', 8, 12) === 'WEBP' ? 'image/webp' : 'application/octet-stream';
let serving = null;
const srv = http.createServer((q, r) => {
  if (!serving || !q.url.startsWith('/img')) { r.writeHead(200, { 'content-type': 'text/html' }); return r.end('<!doctype html><title>resize</title>'); }
  const buf = fs.readFileSync(serving);
  r.writeHead(200, { 'content-type': mime(buf) }); r.end(buf);
});
await new Promise((r) => srv.listen(8767, '127.0.0.1', r));
const b = await launch(9342); const p = await newPage(b.port);
await p.goto('http://127.0.0.1:8767/');

for (const slot of todo) {
  const prompt = PROMPTS[slot] + ', ' + (STILL_SLOTS[slot] ? STILL : STYLE);
  const [aw, ah] = ASPECT[slot] || [4, 3], aspect = aw + ':' + ah, maxW = MAXW[slot] || 1600;
  // a download left by an interrupted run is reused (with its sidecar) instead of paying to generate again
  const raw = path.join(OUT, slot + '.raw'), side = raw + '.json';
  let j = fs.existsSync(raw) && fs.existsSync(side) ? JSON.parse(fs.readFileSync(side, 'utf8')) : null;
  if (j && j.prompt !== prompt) j = null;   // the prompt changed since that download
  if (!j) {
    // Higgsfield is asynchronous: submit, then poll status_url until a terminal status
    const res = await fetch(API + '/' + MODEL, {
      method: 'POST', headers: AUTH,
      body: JSON.stringify({ prompt, aspect_ratio: aspect === '21:9' ? '16:9' : aspect, resolution: '1080p', num_images: 1 }),
    });
    if (!res.ok) { console.error(slot, 'HTTP', res.status, (await res.text()).slice(0, 300)); continue; }
    j = await res.json();
    const t0 = Date.now();
    while (!['completed', 'failed', 'nsfw', 'canceled'].includes(j.status) && Date.now() - t0 < 300000) {
      await new Promise((r) => setTimeout(r, 4000));
      const s = await fetch(j.status_url || API + '/requests/' + j.request_id + '/status', { headers: AUTH });
      if (s.ok) j = await s.json();
    }
    if (j.status !== 'completed') { console.error(slot, 'status', j.status, j.error || ''); continue; }
    const url = j.images && j.images[0] && j.images[0].url;
    if (!url) { console.error(slot, 'no image in response', JSON.stringify(j).slice(0, 300)); continue; }
    fs.writeFileSync(raw, Buffer.from(await (await fetch(url)).arrayBuffer()));
    j = { status: j.status, request_id: j.request_id, url, prompt };
    fs.writeFileSync(side, JSON.stringify(j));
  }
  serving = raw;
  const out = await p.eval(`(async () => {
    const bm = await createImageBitmap(await (await fetch('/img?' + Date.now())).blob());
    // Soul sometimes frames the photo in a flat matte despite the prompt: trim any edge band that is one
    // flat colour, then centre-crop back to the slot's aspect so every slot keeps its shape
    const W = bm.width, H = bm.height, s = document.createElement('canvas'); s.width = W; s.height = H;
    const sx = s.getContext('2d', { willReadFrequently: true }); sx.drawImage(bm, 0, 0);
    const px = sx.getImageData(0, 0, W, H).data;
    const at = (x, y) => { const i = (y * W + x) * 4; return [px[i], px[i + 1], px[i + 2]]; };
    // each edge is compared with its OWN corner colour: a flat band on one side only (e.g. a white strip under
    // the photo) is caught too, and then rejected below as an uneven matte
    const flat = (ref, x0, y0, x1, y1) => { for (let y = y0; y <= y1; y += 2) for (let x = x0; x <= x1; x += 2) { const p = at(x, y); if (Math.abs(p[0] - ref[0]) + Math.abs(p[1] - ref[1]) + Math.abs(p[2] - ref[2]) > 24) return false; } return true; };
    const rT = at(2, 2), rB = at(2, H - 3), rL = at(2, Math.floor(H / 2)), rR = at(W - 3, Math.floor(H / 2));
    let t = 0, bo = H - 1, l = 0, r = W - 1;
    // Soul's mattes are white; a flat band in any other colour is a plain backdrop (the "sunlit studio" style
    // shoots on seamless sage walls), so only near-white edges are treated as matte
    const white = (c) => Math.min(c[0], c[1], c[2]) > 225;
    while (white(rT) && t < H * 0.45 && flat(rT, 0, t, W - 1, t)) t++;
    while (white(rB) && bo > H * 0.55 && flat(rB, 0, bo, W - 1, bo)) bo--;
    while (white(rL) && l < W * 0.45 && flat(rL, l, 0, l, H - 1)) l++;
    while (white(rR) && r > W * 0.55 && flat(rR, r, 0, r, H - 1)) r--;
    // a real matte is even on opposite sides; a lopsided run is flat photo background (a wall, a sky), so
    // trim only the part both sides share
    const tb = Math.min(t, H - 1 - bo), lr = Math.min(l, W - 1 - r);
    // ...but a band much deeper on one side means the photo sits off-centre inside the matte: reject
    if (Math.abs(t - (H - 1 - bo)) > H * 0.05 || Math.abs(l - (W - 1 - r)) > W * 0.05) return { reject: true, trimmed: [t, W - 1 - r, H - 1 - bo, l] };
    t = tb; bo = H - 1 - tb; l = lr; r = W - 1 - lr;
    const pad = (t || l) ? 4 : 0;   // shave the matte's anti-aliased inner edge
    // a photo framed small inside a big matte is too low-resolution to use: report it for regeneration
    if ((r - l + 1) * (bo - t + 1) < W * H * 0.45) return { reject: true, trimmed: [t, W - 1 - r, H - 1 - bo, l] };
    let cx = l + pad, cy = t + pad, cw = r - l + 1 - 2 * pad, ch = bo - t + 1 - 2 * pad;
    const AR = ${aw} / ${ah};
    if (cw / ch > AR) { const nw = Math.round(ch * AR); cx += Math.round((cw - nw) / 2); cw = nw; }
    else { const nh = Math.round(cw / AR); cy += Math.round((ch - nh) / 2); ch = nh; }
    // too few pixels left for where the slot is shown (banners span the 767px column, twice that on
    // high-density screens): report it for regeneration rather than ship a soft photo
    if (cw < ${MINW[slot] ?? (aw / ah >= 16 / 9 ? 1500 : aw / ah >= 1.4 ? 1100 : 0)}) return { reject: true, trimmed: [t, W - 1 - r, H - 1 - bo, l] };
    const w = Math.min(${maxW}, cw), h = Math.round(w / AR);
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const x = c.getContext('2d'); x.imageSmoothingQuality = 'high'; x.drawImage(bm, cx, cy, cw, ch, 0, 0, w, h);
    return { w, h, rawW: W, rawH: H, trimmed: [t, W - 1 - r, H - 1 - bo, l], data: c.toDataURL('image/jpeg', 0.86).split(',')[1] };
  })()`);
  if (out.reject) {
    fs.unlinkSync(raw); fs.unlinkSync(side);
    // the slot's previous image is kept, so a reject never leaves the site without a picture
    console.error(slot, 'REJECTED: photo framed small or off-centre inside a matte (t/r/b/l ' + out.trimmed.join('/') + '); previous image kept; run again to regenerate');
    continue;
  }
  fs.writeFileSync(path.join(OUT, slot + '.jpg'), Buffer.from(out.data, 'base64'));
  fs.unlinkSync(raw); fs.unlinkSync(side);
  record.images[slot] = { file: 'assets/generated/' + slot + '.jpg', prompt, model: MODEL, aspect, request_id: j.request_id, width: out.w, height: out.h, generated: new Date().toISOString() };
  fs.writeFileSync(RECORD, JSON.stringify(record, null, 1));
  console.log(slot, out.rawW + 'x' + out.rawH, '->', out.w + 'x' + out.h, out.trimmed.some(Boolean) ? 'trimmed matte t/r/b/l ' + out.trimmed.join('/') : '');
}
p.close(); b.close(); srv.close();
