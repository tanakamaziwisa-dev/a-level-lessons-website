const WHATSAPP_LOCAL = "0714814951";
const WHATSAPP_INTL = "+263714814951";

const waNumberDigits = WHATSAPP_INTL.replace(/[^\d]/g, "");
const waBaseUrl = `https://wa.me/${waNumberDigits}`;

function createWhatsAppLink(message = "Hello Academic Hub, I would like to book A-Level tutoring.") {
  return `${waBaseUrl}?text=${encodeURIComponent(message)}`;
}

function wireWhatsAppLinks() {
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    const message = link.dataset.message || undefined;
    link.setAttribute("href", createWhatsAppLink(message));
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });

  document.querySelectorAll("[data-whatsapp-local]").forEach((el) => {
    el.textContent = WHATSAPP_LOCAL;
  });
}

function initThemeToggle() {
  const root = document.documentElement;
  const toggle = document.querySelector("[data-dark-toggle]");
  const key = "academicHubTheme";
  const saved = localStorage.getItem(key);

  if (saved === "dark") root.setAttribute("data-theme", "dark");

  if (!toggle) return;
  const updateText = () => {
    const dark = root.getAttribute("data-theme") === "dark";
    toggle.textContent = dark ? "Light mode" : "Dark mode";
  };

  toggle.addEventListener("click", () => {
    const dark = root.getAttribute("data-theme") === "dark";
    if (dark) {
      root.removeAttribute("data-theme");
      localStorage.setItem(key, "light");
    } else {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem(key, "dark");
    }
    updateText();
  });
  updateText();
}

function initMobileNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "✕" : "☰";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    });
  });
}

function highlightCurrentPage() {
  const page = document.body.dataset.page;
  if (!page) return;
  document.querySelectorAll("[data-nav] a").forEach((link) => {
    if (link.dataset.page === page) link.classList.add("active");
  });
}

function initScrollEffects() {
  const items = document.querySelectorAll("[data-animate]");
  if (!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach((item) => observer.observe(item));
}

function initBackToTop() {
  const button = document.querySelector("[data-back-to-top]");
  if (!button) return;

  const toggleButton = () => {
    button.classList.toggle("show", window.scrollY > 340);
  };

  window.addEventListener("scroll", toggleButton);
  toggleButton();
  button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function initContactFormValidation() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  const name = form.querySelector("#name");
  const message = form.querySelector("#message");
  const status = form.querySelector(".form-status");

  const setError = (input, text) => {
    const error = input.parentElement.querySelector(".error");
    error.textContent = text;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let hasError = false;

    setError(name, "");
    setError(message, "");
    status.textContent = "";

    if (!name.value.trim()) {
      setError(name, "Please enter your name.");
      hasError = true;
    }

    if (!message.value.trim()) {
      setError(message, "Please enter a message.");
      hasError = true;
    }

    if (hasError) return;

    status.textContent = "Thanks! Your message is ready. Tap WhatsApp to send it instantly.";
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  wireWhatsAppLinks();
  initThemeToggle();
  initMobileNav();
  highlightCurrentPage();
  initScrollEffects();
  initBackToTop();
  initContactFormValidation();
});
