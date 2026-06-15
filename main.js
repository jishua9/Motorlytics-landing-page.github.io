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

// Draw-on chart trigger for feature tile SVG
(function() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const chartLine = document.querySelector('.tile-chart-line');
  if (!chartLine) return;

  if (reducedMotion) {
    chartLine.classList.add('drawn');
    return;
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          chartLine.classList.add('drawn');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    io.observe(chartLine.closest('.tile') || chartLine);
  } else {
    chartLine.classList.add('drawn');
  }
})();
