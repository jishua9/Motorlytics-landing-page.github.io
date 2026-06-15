/* ═══════════════════════════════════════════════════════════════════
   Motorlytics Hero — Telemetry Screen
   Vanilla JS / Canvas. No frameworks.
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

// ── constants ────────────────────────────────────────────────────────
const LAP_LOOP_SECONDS = 11;         // full lap duration for animation
const TAIL_LENGTH      = 12;         // comet tail points behind car
const BRAKE_THRESHOLD  = 8;          // brake > this → braking zone
const REDUCED_MOTION   = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// colour stops for speed gradient  (blue → yellow → red)
const C_BLUE   = [59, 130, 246];
const C_YELLOW = [234, 179,   8];
const C_RED    = [239,  68,  68];

// ── projection helpers ───────────────────────────────────────────────
function lonLatToMerc(lon, lat) {
  const x = lon * 20037508.34 / 180;
  const y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180) * 20037508.34 / 180;
  return [x, y];
}

function project(lon, lat, mb) {
  const [x, y] = lonLatToMerc(lon, lat);
  const u = (x - mb.x0) / (mb.x1 - mb.x0);
  const v = 1 - (y - mb.y0) / (mb.y1 - mb.y0);
  return [u, v];
}

// ── colour helpers ───────────────────────────────────────────────────
function lerpRGB(a, b, t) {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

function speedColour(t) {
  // t in 0..1, blue→yellow for t<0.5, yellow→red for t≥0.5
  if (t < 0.5) {
    const [r, g, b] = lerpRGB(C_BLUE, C_YELLOW, t / 0.5);
    return `rgb(${r},${g},${b})`;
  } else {
    const [r, g, b] = lerpRGB(C_YELLOW, C_RED, (t - 0.5) / 0.5);
    return `rgb(${r},${g},${b})`;
  }
}

function speedColourRGBA(t, a) {
  let rgb;
  if (t < 0.5) {
    rgb = lerpRGB(C_BLUE, C_YELLOW, t / 0.5);
  } else {
    rgb = lerpRGB(C_YELLOW, C_RED, (t - 0.5) / 0.5);
  }
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;
}

// ── lerp a floating index between trace points ───────────────────────
function interpPoint(trace, fi) {
  const i0 = Math.floor(fi) % trace.length;
  const i1 = (i0 + 1) % trace.length;
  const t  = fi - Math.floor(fi);
  const a  = trace[i0];
  const b  = trace[i1];
  return {
    u:        a.u        + (b.u        - a.u)        * t,
    v:        a.v        + (b.v        - a.v)        * t,
    speed:    a.speed    + (b.speed    - a.speed)    * t,
    throttle: a.throttle + (b.throttle - a.throttle) * t,
    brake:    a.brake    + (b.brake    - a.brake)    * t,
    rpm:      a.rpm      + (b.rpm      - a.rpm)      * t,
    gLat:     a.gLat     + (b.gLat     - a.gLat)     * t,
    gLon:     a.gLon     + (b.gLon     - a.gLon)     * t,
  };
}

// ── state ────────────────────────────────────────────────────────────
let lapData    = null;   // sample-lap.json
let satMeta    = null;   // satellite-meta.json
let trace      = [];     // enriched trace points (with u, v, speedT)
let floatIdx   = 0;      // current fractional index into trace
let lastTime   = null;
let animHandle = null;

// DOM refs
const speedVal     = document.getElementById('speedVal');
const throttleBar  = document.getElementById('throttleBar');
const brakeBar     = document.getElementById('brakeBar');
const throttleVal  = document.getElementById('throttleVal');
const brakeVal     = document.getElementById('brakeVal');
const rpmVal       = document.getElementById('rpmVal');
const glatVal      = document.getElementById('glatVal');
const glonVal      = document.getElementById('glonVal');

const mapCanvas  = document.getElementById('mapCanvas');
const mapCtx     = mapCanvas.getContext('2d');

const ggCanvas   = document.getElementById('ggCanvas');
const ggCtx      = ggCanvas.getContext('2d');

const graphCanvas = document.getElementById('graphCanvas');
const graphCtx    = graphCanvas.getContext('2d');

const trackImg    = document.getElementById('trackImg');
const mapWrapper  = document.getElementById('mapWrapper');

// playback scrubber refs
const scrubberFill = document.getElementById('scrubberFill');
const scrubberDot  = document.getElementById('scrubberDot');
const playbackPct  = document.getElementById('playbackPct');

// ── canvas sizing ────────────────────────────────────────────────────
// The satellite image is 1600×900 landscape. The map-wrapper fills the
// entire 16:9 map-area (object-fit:cover), so the canvas should match
// the wrapper's own pixel dimensions — not the image element rect.

function resizeCanvases() {
  // map canvas — fill the map-wrapper (which is position:absolute inset:0)
  const wrapRect = mapWrapper.getBoundingClientRect();
  if (wrapRect.width > 0 && wrapRect.height > 0) {
    mapCanvas.width  = wrapRect.width;
    mapCanvas.height = wrapRect.height;
    mapCanvas.style.width  = wrapRect.width  + 'px';
    mapCanvas.style.height = wrapRect.height + 'px';
    mapCanvas.style.left = '0px';
    mapCanvas.style.top  = '0px';
  }

  // GG canvas — size to the float-gg card (id=ggInset)
  const ggInset = document.getElementById('ggInset');
  ggCanvas.width  = ggInset.clientWidth  || 150;
  ggCanvas.height = ggInset.clientHeight || 150;

  // graph canvas
  const graphWrap = document.getElementById('graphWrap');
  graphCanvas.width  = graphWrap.clientWidth  || 600;
  graphCanvas.height = graphWrap.clientHeight || 130;
}

// ── pre-render: static graph layers ─────────────────────────────────
// We draw throttle/brake area fills once into an offscreen canvas and
// composite them on every frame with just the cursor updated.
let graphOffscreen = null;

function buildGraphOffscreen() {
  const W = graphCanvas.width;
  const H = graphCanvas.height;

  graphOffscreen = document.createElement('canvas');
  graphOffscreen.width  = W;
  graphOffscreen.height = H;
  const ctx = graphOffscreen.getContext('2d');

  // background
  ctx.fillStyle = 'rgba(255,255,255,0.015)';
  ctx.fillRect(0, 0, W, H);

  const n = trace.length;

  // throttle area (green, faint)
  ctx.beginPath();
  ctx.moveTo(0, H);
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * W;
    const y = H - (trace[i].throttle / 100) * H;
    if (i === 0) ctx.lineTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.lineTo(W, H);
  ctx.closePath();
  ctx.fillStyle = 'rgba(34,197,94,0.18)';
  ctx.fill();

  // brake area (red, faint)
  ctx.beginPath();
  ctx.moveTo(0, H);
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * W;
    const y = H - (trace[i].brake / 100) * H;
    if (i === 0) ctx.lineTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.lineTo(W, H);
  ctx.closePath();
  ctx.fillStyle = 'rgba(239,68,68,0.18)';
  ctx.fill();

  // speed line (orange, on its own scale)
  const sMin = lapData.speedRange.min;
  const sMax = lapData.speedRange.max;
  ctx.beginPath();
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * W;
    const y = H - ((trace[i].speed - sMin) / (sMax - sMin)) * (H * 0.85) - H * 0.05;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = 'rgba(255,136,0,0.85)';
  ctx.lineWidth = 1.5;
  ctx.lineJoin = 'round';
  ctx.stroke();

  // axis lines
  ctx.strokeStyle = '#2d3139';
  ctx.lineWidth = 1;
  // horizontal grid at 25%, 50%, 75%
  for (const frac of [0.25, 0.5, 0.75]) {
    const y = Math.round(H * frac) + 0.5;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
}

// ── draw: map canvas ─────────────────────────────────────────────────
function drawMap(fi) {
  const W = mapCanvas.width;
  const H = mapCanvas.height;
  if (W === 0 || H === 0) return;

  mapCtx.clearRect(0, 0, W, H);

  const n = trace.length;

  // 1) faint full-lap outline
  mapCtx.beginPath();
  for (let i = 0; i < n; i++) {
    const px = trace[i].u * W;
    const py = trace[i].v * H;
    if (i === 0) mapCtx.moveTo(px, py); else mapCtx.lineTo(px, py);
  }
  mapCtx.closePath();
  mapCtx.strokeStyle = 'rgba(255,255,255,0.12)';
  mapCtx.lineWidth = 1;
  mapCtx.stroke();

  // 2) speed-coloured trace
  for (let i = 0; i < n - 1; i++) {
    const t = trace[i].speedT;
    mapCtx.beginPath();
    mapCtx.moveTo(trace[i].u * W,     trace[i].v * H);
    mapCtx.lineTo(trace[i+1].u * W,   trace[i+1].v * H);
    mapCtx.strokeStyle = speedColour(t);
    mapCtx.lineWidth = 2.5;
    mapCtx.stroke();
  }

  // 3) braking-zone highlights
  mapCtx.save();
  mapCtx.shadowColor = '#ef4444';
  mapCtx.shadowBlur  = 6;
  for (let i = 0; i < n - 1; i++) {
    if (trace[i].brake > BRAKE_THRESHOLD) {
      mapCtx.beginPath();
      mapCtx.moveTo(trace[i].u * W,   trace[i].v * H);
      mapCtx.lineTo(trace[i+1].u * W, trace[i+1].v * H);
      mapCtx.strokeStyle = '#ef4444';
      mapCtx.lineWidth = 3.5;
      mapCtx.stroke();
    }
  }
  mapCtx.restore();

  // 4) car marker with comet tail
  const ci = Math.floor(fi) % n;

  // tail (previous TAIL_LENGTH points — getting more faint further back)
  for (let k = TAIL_LENGTH; k >= 1; k--) {
    const ti = ((ci - k) + n) % n;
    const alpha = (TAIL_LENGTH - k + 1) / TAIL_LENGTH * 0.6;
    const radius = 1.5 + (TAIL_LENGTH - k) * 0.15;
    mapCtx.beginPath();
    mapCtx.arc(trace[ti].u * W, trace[ti].v * H, radius, 0, Math.PI * 2);
    mapCtx.fillStyle = `rgba(255,136,0,${alpha.toFixed(2)})`;
    mapCtx.fill();
  }

  // current car position (interpolated)
  const cp = interpPoint(trace, fi);
  const cx = cp.u * W;
  const cy = cp.v * H;

  mapCtx.save();
  mapCtx.shadowColor = '#ff8800';
  mapCtx.shadowBlur  = 12;
  mapCtx.beginPath();
  mapCtx.arc(cx, cy, 5, 0, Math.PI * 2);
  mapCtx.fillStyle = '#ffffff';
  mapCtx.fill();
  mapCtx.restore();

  // 5) attribution text (also shown in the legend float card)
  mapCtx.fillStyle = 'rgba(255,255,255,0.0)'; // hidden — shown in legend card
  mapCtx.font      = '8px DM Sans, sans-serif';
  mapCtx.fillText('', 5, H - 5);
}

// ── draw: G-G diagram ────────────────────────────────────────────────
function drawGG(fi) {
  const W = ggCanvas.width;
  const H = ggCanvas.height;
  const cx = W / 2;
  const cy = H / 2;
  const scale = (W * 0.42) / 2; // ±2g maps to 42% of W

  ggCtx.clearRect(0, 0, W, H);

  // crosshair
  ggCtx.strokeStyle = 'rgba(255,255,255,0.15)';
  ggCtx.lineWidth = 1;
  ggCtx.beginPath(); ggCtx.moveTo(cx, 0); ggCtx.lineTo(cx, H); ggCtx.stroke();
  ggCtx.beginPath(); ggCtx.moveTo(0, cy); ggCtx.lineTo(W, cy); ggCtx.stroke();

  // faint circle at 1g and 2g
  for (const g of [1, 2]) {
    ggCtx.beginPath();
    ggCtx.arc(cx, cy, g * scale, 0, Math.PI * 2);
    ggCtx.strokeStyle = 'rgba(255,255,255,0.08)';
    ggCtx.lineWidth = 1;
    ggCtx.stroke();
  }

  // scatter all points faint
  const n = trace.length;
  for (let i = 0; i < n; i++) {
    const px = cx + trace[i].gLat * scale;
    const py = cy - trace[i].gLon * scale;
    ggCtx.fillStyle = 'rgba(255,255,255,0.07)';
    ggCtx.fillRect(px - 0.5, py - 0.5, 1, 1);
  }

  // current point
  const cp = interpPoint(trace, fi);
  const px = cx + cp.gLat * scale;
  const py = cy - cp.gLon * scale;

  ggCtx.save();
  ggCtx.shadowColor = '#ff8800';
  ggCtx.shadowBlur  = 8;
  ggCtx.beginPath();
  ggCtx.arc(px, py, 3, 0, Math.PI * 2);
  ggCtx.fillStyle = '#ff8800';
  ggCtx.fill();
  ggCtx.restore();
}

// ── draw: channel graph ──────────────────────────────────────────────
function drawGraph(fi) {
  const W = graphCanvas.width;
  const H = graphCanvas.height;
  if (!graphOffscreen || graphOffscreen.width !== W || graphOffscreen.height !== H) {
    buildGraphOffscreen();
  }

  graphCtx.clearRect(0, 0, W, H);
  graphCtx.drawImage(graphOffscreen, 0, 0);

  // vertical cursor
  const n = trace.length;
  const cursorX = (fi % n) / (n - 1) * W;

  graphCtx.save();
  graphCtx.shadowColor = 'rgba(255,136,0,0.5)';
  graphCtx.shadowBlur  = 8;
  graphCtx.beginPath();
  graphCtx.moveTo(cursorX, 0);
  graphCtx.lineTo(cursorX, H);
  graphCtx.strokeStyle = '#ff8800';
  graphCtx.lineWidth   = 1.5;
  graphCtx.stroke();
  graphCtx.restore();
}

// ── update HUD readouts ──────────────────────────────────────────────
function updateHUD(cp) {
  const spd = Math.round(cp.speed);
  speedVal.textContent    = String(spd).padStart(3, '0');

  const thr = Math.min(100, Math.round(cp.throttle));
  throttleBar.style.width = thr + '%';
  throttleVal.textContent = thr + '%';

  const brk = Math.min(100, Math.round(cp.brake));
  brakeBar.style.width = brk + '%';
  brakeVal.textContent = brk + '%';

  rpmVal.textContent  = Math.round(cp.rpm).toString();
  glatVal.textContent = cp.gLat.toFixed(2);
  glonVal.textContent = cp.gLon.toFixed(2);
}

// ── update playback scrubber ─────────────────────────────────────────
function updateScrubber(fi) {
  if (!trace.length) return;
  const pct = ((fi % trace.length) / (trace.length - 1)) * 100;
  const pctStr = pct.toFixed(1) + '%';
  if (scrubberFill) scrubberFill.style.width = pctStr;
  if (scrubberDot)  scrubberDot.style.left   = pctStr;
  if (playbackPct)  playbackPct.textContent   = Math.round(pct) + '%';
}

// ── main animation loop ──────────────────────────────────────────────
function frame(timestamp) {
  if (!trace.length) return;

  if (lastTime === null) lastTime = timestamp;
  const dt = (timestamp - lastTime) / 1000; // seconds
  lastTime = timestamp;

  // advance index: full lap (n points) in LAP_LOOP_SECONDS
  const n = trace.length;
  floatIdx = (floatIdx + dt * n / LAP_LOOP_SECONDS) % n;

  const cp = interpPoint(trace, floatIdx);

  resizeCanvases();
  drawMap(floatIdx);
  drawGG(floatIdx);
  drawGraph(floatIdx);
  updateHUD(cp);
  updateScrubber(floatIdx);

  animHandle = requestAnimationFrame(frame);
}

// ── static frame (reduced motion) ───────────────────────────────────
function staticFrame() {
  const n = trace.length;
  floatIdx = Math.floor(n * 0.35);
  resizeCanvases();
  buildGraphOffscreen();
  drawMap(floatIdx);
  drawGG(floatIdx);
  drawGraph(floatIdx);
  updateHUD(interpPoint(trace, floatIdx));
  updateScrubber(floatIdx);
}

// ── load data & start ────────────────────────────────────────────────
async function init() {
  try {
    const [lapResp, metaResp] = await Promise.all([
      fetch('assets/sample-lap.json'),
      fetch('assets/satellite-meta.json'),
    ]);

    lapData  = await lapResp.json();
    satMeta  = await metaResp.json();

    const mb   = satMeta.merc_bbox;
    const sMin = lapData.speedRange.min;
    const sMax = lapData.speedRange.max;

    // pre-compute (u, v) and speedT for every point
    trace = lapData.trace.map(pt => {
      const [u, v] = project(pt.lon, pt.lat, mb);
      return {
        u,
        v,
        speedT:   (pt.speed - sMin) / (sMax - sMin),
        speed:    pt.speed,
        throttle: Math.min(100, pt.throttle),
        brake:    pt.brake,
        rpm:      pt.rpm,
        gLat:     pt.gLat,
        gLon:     pt.gLon,
      };
    });

    // ── sanity check projection ──────────────────────────────────────
    const first = trace[0];
    const second = trace[1];
    console.log('[projection] point[0] (u,v):', first.u.toFixed(4), first.v.toFixed(4));
    console.log('[projection] point[1] (u,v):', second.u.toFixed(4), second.v.toFixed(4));

    const allU = trace.map(p => p.u);
    const allV = trace.map(p => p.v);
    const minU = Math.min(...allU), maxU = Math.max(...allU);
    const minV = Math.min(...allV), maxV = Math.max(...allV);
    console.log('[projection] u range:', minU.toFixed(4), '→', maxU.toFixed(4));
    console.log('[projection] v range:', minV.toFixed(4), '→', maxV.toFixed(4));

    if (minU < -0.1 || maxU > 1.1 || minV < -0.1 || maxV > 1.1) {
      console.warn('[projection] WARNING: some points fall outside 0..1 — check projection!');
    } else {
      console.log('[projection] OK — all points within ~0..1');
    }

    // wait for image to fully render so getBoundingClientRect() is reliable
    if (!trackImg.complete) {
      await new Promise(r => { trackImg.onload = r; });
    }
    // give layout a tick to settle
    await new Promise(r => requestAnimationFrame(r));

    resizeCanvases();
    buildGraphOffscreen();

    if (REDUCED_MOTION) {
      staticFrame();
    } else {
      animHandle = requestAnimationFrame(frame);
    }

  } catch (err) {
    console.error('[motorlytics-hero] Failed to initialise:', err);
  }
}

// re-build offscreen buffer on resize
window.addEventListener('resize', () => {
  graphOffscreen = null;
  resizeCanvases();
});

init();
