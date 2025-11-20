// script.js (timeline + nav helpers)
// Put this file at the end of <body> and ensure <script src="script.js"></script> is present

document.addEventListener('DOMContentLoaded', () => {
  // -------- nav highlight (optional) --------
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
  if (!exp) {
    console.warn('Timeline: #experience not found');
    return;
  }

  const containers = Array.from(exp.querySelectorAll('.container'));
  console.log('Timeline: containers found =', containers.length);

  // Helper: reveal timeline once with staggered .play class
  function revealTimeline() {
    if (!exp.classList.contains('animate')) exp.classList.add('animate');
    containers.forEach((el, i) => {
      const delay = i * 120; // stagger in ms
      setTimeout(() => {
        el.classList.add('play');
        // optional: remove forced inline styles if present
        el.style.visibility = '';
        el.style.opacity = '';
      }, delay);
    });
  }

  // IntersectionObserver triggers reveal when #experience crosses 15% into view
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        revealTimeline();
        obs.unobserve(entry.target); // run once
      }
    });
  }, { threshold: 0.15 });

  io.observe(exp);

  // Debug info: prints state of last container a little after load
  setTimeout(() => {
    const last = containers[containers.length - 1];
    if (last) {
      console.log('DEBUG last container classes:', last.className);
      console.log('DEBUG last computed opacity/visibility:', getComputedStyle(last).opacity, getComputedStyle(last).visibility);
    }
  }, 600);
});


