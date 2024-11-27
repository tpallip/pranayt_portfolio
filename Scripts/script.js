document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  function highlightNavLink() {
    let scrollPosition = window.scrollY || window.pageYOffset;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (
        scrollPosition >= sectionTop - sectionHeight / 3 &&
        scrollPosition < sectionTop + sectionHeight - sectionHeight / 3
      ) {
        const id = section.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNavLink);
  highlightNavLink(); // Initial call to highlight the active link on page load
});

const scrollArrow = document.querySelector(".scroll-arrow");

scrollArrow.addEventListener("click", function () {
  const scrollPosition = window.scrollY || window.pageYOffset;
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;

  const scrollMiddle = documentHeight / 2;

  if (scrollPosition < scrollMiddle) {
    window.scrollTo({ top: documentHeight - windowHeight, behavior: "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

// Update arrow direction based on scroll position
window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY || window.pageYOffset;
  const documentHeight = document.documentElement.scrollHeight;

  const scrollMiddle = documentHeight / 2;

  if (scrollPosition < scrollMiddle) {
    scrollArrow.querySelector(".arrow").textContent = "↓";
  } else {
    scrollArrow.querySelector(".arrow").textContent = "↑";
  }
});
