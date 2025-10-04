// Hamburger toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navButtons = document.querySelector(".nav-buttons");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  navButtons.classList.toggle("active");
});

// Active link on scroll
const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  links.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// Optional: Dark mode toggle
// Example: Toggle dark mode by clicking logo
const logo = document.querySelector(".logo");
logo.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
