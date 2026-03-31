// Mobile nav toggle
function toggleMenu() {
  const ul = document.querySelector('#desktop-nav ul.nav-links');
  const btn = document.querySelector('.hamburger-btn');
  if (ul) ul.classList.toggle('mobile-open');
  if (btn) btn.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => {
  // -------- nav highlight --------
  const nav = document.querySelector('#desktop-nav');
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  const sections = Array.from(document.querySelectorAll('section[id]'));
  if (nav && navLinks.length && sections.length) {
    const navIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.target.id) return;
        const link = navLinks.find(l => l.getAttribute('href') === `#${e.target.id}`);
        if (!link) return;
        if (e.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }, { root: null, rootMargin: `-${nav.offsetHeight}px 0px 0px 0px`, threshold: 0.25 });
    sections.forEach(s => navIO.observe(s));
  }

  // -------- timeline animation (ONE-TIME) --------
  const exp = document.querySelector('#experience');
  if (!exp) return;

  const containers = Array.from(exp.querySelectorAll('.container'));

  function revealTimeline() {
    if (!exp.classList.contains('animate')) exp.classList.add('animate');
    containers.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('play');
        el.style.visibility = '';
        el.style.opacity = '';
      }, i * 120);
    });
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        revealTimeline();
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  io.observe(exp);
});


