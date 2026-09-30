// Upscale small source photos (routes.mjs UPSCALE) with Real-ESRGAN, blended with a plain enlargement.
// usage: node src/tools/upscale.mjs <realesrgan-ncnn-vulkan.exe> <cdp.mjs> [file ...]
//
// For each file: read the untouched source (audit/image-inventory.json localFile), run realesrgan-x4plus
// at x4, then blend 65% AI / 35% the source enlarged with high-quality smoothing
// (keeps crisp edges without the waxy skin a pure GAN upscale gives faces), cap at 1600px wide and write
// assets/upscaled/<same name> as JPEG q0.9. audit/upscaled.json records each result. The old responsive
// variants of each file are deleted so responsive.mjs re-encodes them from the sharper file.
// build.mjs localImage() prefers assets/upscaled/<name> when it exists; URLs do not change.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';
import { execFileSync } from 'node:child_process';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { UPSCALE, ENHANCE } from './routes.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const [exe, cdpPath, ...only] = process.argv.slice(2);
if (!exe || !cdpPath) { console.error('usage: node src/tools/upscale.mjs <realesrgan-ncnn-vulkan.exe> <cdp.mjs> [file ...]'); process.exit(1); }
const { launch, newPage } = await import(pathToFileURL(path.resolve(cdpPath)).href);
const AI_WEIGHT = 0.65, MAX_W = 1600;
const OUT = path.join(ROOT, 'assets/upscaled'); fs.mkdirSync(OUT, { recursive: true });
const RECORD = path.join(ROOT, 'audit/upscaled.json');
const record = fs.existsSync(RECORD) ? JSON.parse(fs.readFileSync(RECORD, 'utf8')) : { method: 'realesrgan-x4plus (ncnn-vulkan v0.2.5.0) blended ' + AI_WEIGHT + ' AI / ' + (1 - AI_WEIGHT).toFixed(2) + ' smooth enlargement, max ' + MAX_W + 'px, JPEG q0.9', images: {} };
const inv = JSON.parse(fs.readFileSync(path.join(ROOT, 'audit/image-inventory.json'), 'utf8'));
const byName = new Map((inv.images || inv).filter((i) => i.localFile).map((i) => [path.basename(i.localFile), i.localFile]));
const RMAN_FILE = path.join(ROOT, 'assets/responsive/manifest.json');
const rman = fs.existsSync(RMAN_FILE) ? JSON.parse(fs.readFileSync(RMAN_FILE, 'utf8')) : null;

// the source and the x4 PNG reach the browser over loopback: a multi-MB data: URL stalls the CDP socket
const serving = {};
const srv = http.createServer((q, r) => {
  const f = serving[q.url.split('?')[0]];
  if (!f) { r.writeHead(200, { 'content-type': 'text/html' }); return r.end('<!doctype html><title>upscale</title>'); }
  r.writeHead(200, { 'content-type': /\.png$/i.test(f) ? 'image/png' : 'image/jpeg' }); fs.createReadStream(f).pipe(r);
});
await new Promise((r) => srv.listen(8768, '127.0.0.1', r));
const b = await launch(9392); const p = await newPage(b.port);
await p.goto('http://127.0.0.1:8768/');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'upscale-'));
for (const name of only.length ? only : UPSCALE) {
  const rel = byName.get(name);
  if (!rel || !fs.existsSync(path.join(ROOT, rel))) { console.error(name, 'no source file'); process.exitCode = 1; continue; }
  const src = path.join(ROOT, rel);
  serving['/src'] = src;
  const [w0, h0] = await p.eval(`(async()=>{const i=new Image();i.src='/src?'+Date.now();await i.decode();return [i.width,i.height]})()`);
  // always x4: realesrgan-x4plus is a 4x model, and this ncnn build's "-s 2" scrambles it into mismatched
  // tiles (seen on every x2 run). Small tiles (-t 128) keep GPU memory low; the blend below caps the width.
  const scale = 4;
  const ai = path.join(tmp, name.replace(/\.\w+$/, '') + '.png');
  execFileSync(exe, ['-i', src, '-o', ai, '-n', 'realesrgan-x4plus', '-s', '4', '-t', '128', '-f', 'png'], { cwd: path.dirname(exe), stdio: 'ignore' });
  serving['/ai'] = ai;
  const res = await p.eval(`(async()=>{const A=new Image();A.src='/src?'+Date.now();await A.decode();
    const U=new Image();U.src='/ai?'+Date.now();await U.decode();
    const W=Math.min(${MAX_W},U.width),H=Math.round(U.height*W/U.width);const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
    x.imageSmoothingQuality='high';x.drawImage(A,0,0,W,H);x.globalAlpha=${AI_WEIGHT};x.drawImage(U,0,0,W,H);x.globalAlpha=1;
    const E=${JSON.stringify(ENHANCE[name] || null)};
    if(E){const [ct,sa,wm,sh]=E;
      // contrast + saturation, then per-channel levels (0.4% clip), warm shift, unsharp mask (~1px)
      const t=document.createElement('canvas');t.width=W;t.height=H;const tx=t.getContext('2d',{willReadFrequently:true});tx.filter='contrast('+ct+') saturate('+sa+')';tx.drawImage(c,0,0);
      let d=tx.getImageData(0,0,W,H),a=d.data;const n=W*H;
      for(let ch=0;ch<3;ch++){const h=new Uint32Array(256);for(let i=ch;i<a.length;i+=4)h[a[i]]++;let lo=0,hi=255,acc=0;while(acc<n*0.004)acc+=h[lo++];acc=0;while(acc<n*0.004)acc+=h[hi--];
        const k=255/Math.max(1,hi-lo);for(let i=ch;i<a.length;i+=4)a[i]=Math.max(0,Math.min(255,(a[i]-lo)*k));}
      for(let i=0;i<a.length;i+=4){a[i]=Math.min(255,a[i]+wm);a[i+2]=Math.max(0,a[i+2]-wm);}
      tx.putImageData(d,0,0);
      const bl=document.createElement('canvas');bl.width=W;bl.height=H;const bx=bl.getContext('2d',{willReadFrequently:true});bx.filter='blur(1.1px)';bx.drawImage(t,0,0);
      const B=bx.getImageData(0,0,W,H).data;d=tx.getImageData(0,0,W,H);a=d.data;
      for(let i=0;i<a.length;i+=4)for(let q=0;q<3;q++){const v=a[i+q]+sh*(a[i+q]-B[i+q]);a[i+q]=v<0?0:v>255?255:v;}
      tx.putImageData(d,0,0);x.drawImage(t,0,0);}
    return {w:W,h:H,d:c.toDataURL('image/jpeg',0.9).split(',')[1]}})()`);
  fs.writeFileSync(path.join(OUT, name), Buffer.from(res.d, 'base64'));
  fs.rmSync(ai, { force: true });
  record.images[name] = { from: [w0, h0], to: [res.w, res.h], scale, source: rel, file: 'assets/upscaled/' + name, ...(ENHANCE[name] ? { enhance: ENHANCE[name] } : {}) };
  fs.writeFileSync(RECORD, JSON.stringify(record, null, 1));
  // drop the old variants (made from the small source) so responsive.mjs re-encodes them
  if (rman) { const key = '/assets/img/' + name; const m = rman[key]; if (m) { for (const [, v] of m.variants) fs.rmSync(path.join(ROOT, 'assets/responsive', path.basename(v)), { force: true }); delete rman[key]; fs.writeFileSync(RMAN_FILE, JSON.stringify(rman, null, 1)); } }
  console.log(name, w0 + 'x' + h0, 'x' + scale, '->', res.w + 'x' + res.h);
}
fs.rmSync(tmp, { recursive: true, force: true });
p.close(); b.close(); srv.close();
