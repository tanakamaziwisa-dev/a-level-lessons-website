/*
  Tanaka A-Level Lessons
  Main JavaScript
  - Active navigation highlighting
  - Dark mode toggle with localStorage
  - Back-to-top button
  - Simple scroll animations
  - Contact form validation + success message
*/

const whatsappNumber = "+2637XXXXXXXX"; // Update number here for quick changes

// Highlight active nav link based on current file
const navLinks = document.querySelectorAll(".nav-links a");
const currentPath = window.location.pathname.split("/").pop() || "index.html";
navLinks.forEach((link) => {
  const linkPath = link.getAttribute("href");
  if (linkPath === currentPath) {
    link.classList.add("active");
  }
});

// Dark mode toggle
const themeToggle = document.querySelector("#theme-toggle");
const storedTheme = localStorage.getItem("theme");
if (storedTheme) {
  document.body.setAttribute("data-theme", storedTheme);
  if (themeToggle) {
    themeToggle.textContent = storedTheme === "dark" ? "Light mode" : "Dark mode";
  }
}

themeToggle?.addEventListener("click", () => {
  const currentTheme = document.body.getAttribute("data-theme") || "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", nextTheme);
  localStorage.setItem("theme", nextTheme);
  themeToggle.textContent = nextTheme === "dark" ? "Light mode" : "Dark mode";
});

// Back to top button
const backToTop = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
  if (!backToTop) return;
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});
backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Simple scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// Contact form validation
const contactForm = document.querySelector("#contact-form");
const successMessage = document.querySelector("#form-success");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const requiredFields = contactForm.querySelectorAll("[required]");
  let isValid = true;

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      isValid = false;
      field.setAttribute("aria-invalid", "true");
    } else {
      field.removeAttribute("aria-invalid");
    }
  });

  if (isValid) {
    successMessage?.classList.add("show");
    contactForm.reset();
  }
});

// Update WhatsApp CTA links
const whatsappLinks = document.querySelectorAll("[data-whatsapp-link]");
whatsappLinks.forEach((link) => {
  link.setAttribute(
    "href",
    `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`
  );
});
