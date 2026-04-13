// Dot navigation — track active section
const pages = document.getElementById('pages');
const dots = document.querySelectorAll('.dot-nav .dot');
const sections = document.querySelectorAll('.page');

// Click dot to navigate
dots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(dot.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Observe which section is in view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      dots.forEach(d => d.classList.remove('active'));
      const active = document.querySelector(`.dot-nav a[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, {
  root: null,
  threshold: 0.3
});

sections.forEach(s => observer.observe(s));

// Keyboard navigation — arrow up/down to switch pages
document.addEventListener('keydown', (e) => {
  const currentIndex = [...dots].findIndex(d => d.classList.contains('active'));
  if (e.key === 'ArrowDown' && currentIndex < dots.length - 1) {
    e.preventDefault();
    dots[currentIndex + 1].click();
  } else if (e.key === 'ArrowUp' && currentIndex > 0) {
    e.preventDefault();
    dots[currentIndex - 1].click();
  }
});
