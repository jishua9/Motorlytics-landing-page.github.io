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
