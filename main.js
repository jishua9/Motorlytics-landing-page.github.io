// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// FAQ accordion
document.querySelectorAll('.faq-q').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    item.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(item.classList.contains('open')));
  });
});

// Scroll-reveal
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduce && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
}

// Hero number count-up
if (!reduce) {
  document.querySelectorAll('[data-countup]').forEach((el) => {
    const target = parseFloat(el.getAttribute('data-countup'));
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const prefix = el.getAttribute('data-prefix') || '';
    const suffixEl = el.querySelector('span');
    const suffix = suffixEl ? suffixEl.outerHTML : '';
    const start = performance.now(), dur = 1100;
    function tick(now) {
      const p = Math.min(1, (now - start) / dur);
      const val = (target * (1 - Math.pow(1 - p, 3))).toFixed(decimals);
      el.innerHTML = prefix + val + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

// Stat band count-up
(function() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const statEls = document.querySelectorAll('.stat-val[data-stat]');
  if (!statEls.length) return;

  function countUp(el) {
    const target = parseInt(el.getAttribute('data-stat'), 10);
    if (isNaN(target) || reducedMotion) return; // ∞ has no data-stat
    const dur = 1200;
    const start = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - start) / dur);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * ease);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window && !reducedMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          countUp(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    statEls.forEach((el) => io.observe(el));
  } else {
    // reduced motion or no IO: show final values immediately
    statEls.forEach((el) => {
      const t = el.getAttribute('data-stat');
      if (t) el.textContent = t;
    });
  }
})();

// =====================================================================
// INTERACTIVE BENTO — expand/shrink tiles, play per-tile demos
// =====================================================================
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tiles = Array.from(document.querySelectorAll('#bentoGrid .tile'));
  if (!tiles.length) return;

  // ── Demo controllers ─────────────────────────────────────────────

  // Telemetry demo: draw speed line, animate playhead sweep
  let telemRAF = null;
  function startTelemDemo() {
    const wrap = document.querySelector('.demo-telem');
    if (!wrap) return;
    wrap.classList.remove('is-playing');
    // Force reflow so transition restarts
    void wrap.offsetWidth;
    if (reduce) { wrap.classList.add('is-playing'); return; }
    wrap.classList.add('is-playing');

    // Animate playhead from x=0 to x=280 over 2.5s, then loop
    const playhead = document.getElementById('demoPlayhead');
    if (!playhead) return;
    let startTime = null;
    const dur = 2500;

    function sweepTick(ts) {
      if (!startTime) startTime = ts;
      const elapsed = (ts - startTime) % (dur + 600); // +600ms pause at end
      const progress = Math.min(elapsed / dur, 1);
      const x = Math.round(progress * 280);
      playhead.setAttribute('x1', x);
      playhead.setAttribute('x2', x);
      telemRAF = requestAnimationFrame(sweepTick);
    }
    telemRAF = requestAnimationFrame(sweepTick);
  }

  function stopTelemDemo() {
    const wrap = document.querySelector('.demo-telem');
    if (wrap) wrap.classList.remove('is-playing');
    if (telemRAF) { cancelAnimationFrame(telemRAF); telemRAF = null; }
  }

  // Results demo: stagger-reveal rows
  let resultsTimers = [];
  function startResultsDemo() {
    const rows = document.querySelectorAll('#demo-results .demo-row');
    // Reset first
    rows.forEach((r) => r.classList.remove('is-visible'));
    resultsTimers.forEach(clearTimeout);
    resultsTimers = [];
    if (reduce) {
      rows.forEach((r) => r.classList.add('is-visible'));
      return;
    }
    rows.forEach((row, i) => {
      const t = setTimeout(() => row.classList.add('is-visible'), i * 110 + 80);
      resultsTimers.push(t);
    });
  }

  function stopResultsDemo() {
    resultsTimers.forEach(clearTimeout);
    resultsTimers = [];
    document.querySelectorAll('#demo-results .demo-row')
      .forEach((r) => r.classList.remove('is-visible'));
  }

  // ── Costs demo: count-up total + animate bars ─────────────────────
  let costsTimers = [];
  function startCostsDemo() {
    const card = document.querySelector('#demo-costs .demo-costs-card');
    if (!card) return;
    // Clear any previous animation
    card.classList.remove('is-playing');
    costsTimers.forEach(clearTimeout);
    costsTimers = [];

    if (reduce) {
      card.classList.add('is-playing');
      return;
    }

    // Count-up on total value
    const totalEl = document.getElementById('demoCostsTotal');
    if (totalEl) {
      const target = 18750;
      const dur = 900;
      const startT = performance.now();
      function tick(now) {
        const p = Math.min(1, (now - startT) / dur);
        const ease = 1 - Math.pow(1 - p, 3);
        const val = Math.round(target * ease);
        totalEl.textContent = '$' + val.toLocaleString('en-AU');
        if (p < 1) requestAnimationFrame(tick);
        else totalEl.textContent = '$18,750';
      }
      requestAnimationFrame(tick);
    }

    // Slight delay before bars animate (let count-up start first)
    const t = setTimeout(() => card.classList.add('is-playing'), 120);
    costsTimers.push(t);
  }

  function stopCostsDemo() {
    costsTimers.forEach(clearTimeout);
    costsTimers = [];
    const card = document.querySelector('#demo-costs .demo-costs-card');
    if (card) card.classList.remove('is-playing');
    const totalEl = document.getElementById('demoCostsTotal');
    if (totalEl) totalEl.textContent = '$18,750';
  }

  // ── Calendar demo: fade in current-event then upcoming rows ───────
  let calTimers = [];
  function startCalendarDemo() {
    const current = document.querySelector('#demo-calendar .demo-cal-current');
    const rows = document.querySelectorAll('#demo-calendar .demo-cal-upcoming-row');
    // Reset
    if (current) current.classList.remove('is-visible');
    rows.forEach((r) => r.classList.remove('is-visible'));
    calTimers.forEach(clearTimeout);
    calTimers = [];

    if (reduce) {
      if (current) current.classList.add('is-visible');
      rows.forEach((r) => r.classList.add('is-visible'));
      return;
    }

    // Animate current event in first
    const t0 = setTimeout(() => { if (current) current.classList.add('is-visible'); }, 80);
    calTimers.push(t0);
    // Then stagger upcoming rows
    rows.forEach((row, i) => {
      const t = setTimeout(() => row.classList.add('is-visible'), 280 + i * 110);
      calTimers.push(t);
    });
  }

  function stopCalendarDemo() {
    calTimers.forEach(clearTimeout);
    calTimers = [];
    const current = document.querySelector('#demo-calendar .demo-cal-current');
    if (current) current.classList.remove('is-visible');
    document.querySelectorAll('#demo-calendar .demo-cal-upcoming-row')
      .forEach((r) => r.classList.remove('is-visible'));
  }

  // ── Pit wall demo: countdown tick + row fade-in ───────────────────
  let pitCountdownInterval = null;
  let pitTimers = [];

  function startPitDemo() {
    const wrap = document.querySelector('.demo-pit');
    if (!wrap) return;

    // Reset rows
    const rows = document.querySelectorAll('#demo-pitwall .demo-pit-row');
    rows.forEach((r) => r.classList.remove('is-visible'));
    pitTimers.forEach(clearTimeout);
    pitTimers = [];

    if (reduce) {
      rows.forEach((r) => r.classList.add('is-visible'));
      return;
    }

    // Countdown ticker
    const countdownEl = document.getElementById('demoPitCountdown');
    let totalSec = 14 * 60 + 32; // 00:14:32
    function formatCountdown(s) {
      const h = Math.floor(s / 3600);
      const m = Math.floor((s % 3600) / 60);
      const sec = s % 60;
      const mm = String(m).padStart(2, '0');
      const ss = String(sec).padStart(2, '0');
      return h > 0 ? String(h).padStart(2,'0') + ':' + mm + ':' + ss : '00:' + mm + ':' + ss;
    }
    if (countdownEl) {
      countdownEl.textContent = formatCountdown(totalSec);
      pitCountdownInterval = setInterval(() => {
        totalSec = totalSec > 0 ? totalSec - 1 : 14 * 60 + 32;
        countdownEl.textContent = formatCountdown(totalSec);
      }, 1000);
    }

    // Stagger-reveal rows
    rows.forEach((row, i) => {
      const t = setTimeout(() => row.classList.add('is-visible'), i * 120 + 80);
      pitTimers.push(t);
    });
  }

  function stopPitDemo() {
    clearInterval(pitCountdownInterval);
    pitCountdownInterval = null;
    pitTimers.forEach(clearTimeout);
    pitTimers = [];
    const countdownEl = document.getElementById('demoPitCountdown');
    if (countdownEl) countdownEl.textContent = '00:14:32';
    document.querySelectorAll('#demo-pitwall .demo-pit-row')
      .forEach((r) => r.classList.remove('is-visible'));
  }

  // ── Car demo: stagger-reveal cards + animate progress bars ────────
  let carTimers = [];

  function startCarDemo() {
    const wrap = document.querySelector('.demo-car');
    if (!wrap) return;

    wrap.classList.remove('is-playing');
    const cards = document.querySelectorAll('#demo-car .demo-car-card');
    cards.forEach((c) => c.classList.remove('is-visible'));
    carTimers.forEach(clearTimeout);
    carTimers = [];

    if (reduce) {
      cards.forEach((c) => c.classList.add('is-visible'));
      wrap.classList.add('is-playing');
      return;
    }

    // Stagger cards in, then enable bar animation
    cards.forEach((card, i) => {
      const t = setTimeout(() => card.classList.add('is-visible'), i * 130 + 60);
      carTimers.push(t);
    });
    const barDelay = setTimeout(() => wrap.classList.add('is-playing'), 100);
    carTimers.push(barDelay);
  }

  function stopCarDemo() {
    carTimers.forEach(clearTimeout);
    carTimers = [];
    const wrap = document.querySelector('.demo-car');
    if (wrap) wrap.classList.remove('is-playing');
    document.querySelectorAll('#demo-car .demo-car-card')
      .forEach((c) => c.classList.remove('is-visible'));
  }

  // Generic demo starters/stoppers keyed by data-tile value
  const demoStart = {
    telemetry: startTelemDemo,
    results: startResultsDemo,
    costs: startCostsDemo,
    calendar: startCalendarDemo,
    pitwall: startPitDemo,
    car: startCarDemo,
  };
  const demoStop = {
    telemetry: stopTelemDemo,
    results: stopResultsDemo,
    costs: stopCostsDemo,
    calendar: stopCalendarDemo,
    pitwall: stopPitDemo,
    car: stopCarDemo,
  };

  // ── Core expand mechanic ──────────────────────────────────────────

  function activateTile(nextTile) {
    const current = tiles.find((t) => t.classList.contains('tile--feature'));
    if (current === nextTile) return; // already active

    const prevKey = current ? current.dataset.tile : null;
    const nextKey = nextTile.dataset.tile;

    function applySwap() {
      // Deactivate current
      if (current) {
        current.classList.remove('tile--feature');
        current.setAttribute('aria-pressed', 'false');
        const prevDemo = current.querySelector('.tile-demo');
        if (prevDemo) prevDemo.setAttribute('aria-hidden', 'true');
        if (prevKey && demoStop[prevKey]) demoStop[prevKey]();
      }
      // Activate next
      nextTile.classList.add('tile--feature');
      nextTile.setAttribute('aria-pressed', 'true');
      const nextDemo = nextTile.querySelector('.tile-demo');
      if (nextDemo) nextDemo.setAttribute('aria-hidden', 'false');
    }

    // Use View Transitions API when available and motion allowed
    if (!reduce && typeof document.startViewTransition === 'function') {
      document.startViewTransition(() => {
        applySwap();
      });
    } else {
      applySwap();
    }

    // Start the new demo (slight delay to let layout settle)
    if (nextKey && demoStart[nextKey]) {
      const delay = (!reduce && typeof document.startViewTransition === 'function') ? 250 : 50;
      setTimeout(() => demoStart[nextKey](), delay);
    }
  }

  // ── Wire up click + keyboard ──────────────────────────────────────

  tiles.forEach((tile) => {
    tile.addEventListener('click', () => activateTile(tile));
    tile.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateTile(tile);
      }
    });
  });

  // ── Auto-start telemetry demo when bento scrolls into view ───────

  const bentoGrid = document.getElementById('bentoGrid');
  if (bentoGrid) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            // Start the currently-active tile's demo
            const activeTile = tiles.find((t) => t.classList.contains('tile--feature'));
            if (activeTile) {
              const key = activeTile.dataset.tile;
              if (key && demoStart[key]) demoStart[key]();
            }
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.2 });
      io.observe(bentoGrid);
    } else {
      // No IO: start immediately
      startTelemDemo();
    }
  }
})();
