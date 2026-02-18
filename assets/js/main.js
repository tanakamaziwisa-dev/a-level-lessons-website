/*
  Tanaka A-Level Lessons - Main JS
  Handles navigation highlighting, dark mode, animations, and forms.
*/

document.addEventListener("DOMContentLoaded", () => {
  // --- Active navigation highlighting ---
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a, .main-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath) {
      document.querySelectorAll(".site-nav a, .main-nav a").forEach((a) => a.classList.remove("active"));
      link.classList.add("active");
    }
  });

  // --- Dark mode toggle ---
  const toggleBtn = document.querySelector("[data-dark-toggle]");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const storedTheme = localStorage.getItem("tanaka-theme");

  const setTheme = (mode) => {
    document.body.classList.toggle("dark", mode === "dark");
    localStorage.setItem("tanaka-theme", mode);
    if (toggleBtn) {
      toggleBtn.textContent = mode === "dark" ? "Light mode" : "Dark mode";
    }
  };

  if (storedTheme) {
    setTheme(storedTheme);
  } else if (prefersDark) {
    setTheme("dark");
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark");
      setTheme(isDark ? "light" : "dark");
    });
  }

  // --- Back to top button ---
  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("show", window.scrollY > 400);
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- Simple fade-in animations ---
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  // --- Contact form validation ---
// --- Unified Contact Form & WhatsApp Logic ---
const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // 1. Collect form data
    const name = document.getElementById("name").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const lessonType = document.getElementById("lesson-type").value;
    const location = document.getElementById("location").value.trim(); // Matches your HTML ID
    const message = document.getElementById("message").value.trim();
    const status = contactForm.querySelector(".form-status");

    // 2. Simple Validation
    if (!name || !contact || !subject || !lessonType || !location || !message) {
      status.textContent = "Please fill in all fields.";
      status.style.color = "#d93025";
      return;
    }

    // 3. Construct WhatsApp Message
    const whatsappNumber = "263777414157";
    const text = 
      `New lesson enquiry from website:%0A%0A` +
      `Name: ${encodeURIComponent(name)}%0A` +
      `Contact: ${encodeURIComponent(contact)}%0A` +
      `Subject: ${encodeURIComponent(subject)}%0A` +
      `Lesson type: ${encodeURIComponent(lessonType)}%0A` +
      `City: ${encodeURIComponent(location)}%0A%0A` +
      `Message:%0A${encodeURIComponent(message)}`;

    // 4. Open WhatsApp and Reset
    const url = `https://wa.me/${whatsappNumber}?text=${text}`;
    window.open(url, "_blank");
    
    status.textContent = "Opening WhatsApp...";
    status.style.color = "#1aa96b";
    contactForm.reset();
  });
}
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const contact = document.getElementById("contact").value;

    const subject = document.getElementById("subject")?.value || "Not selected";
    const lessonType = document.getElementById("lessonType")?.value || "Not selected";
    const city = document.getElementById("city")?.value || "Not provided";
    const message = document.getElementById("message")?.value || "";

    const whatsappNumber = "263777414157";

    const text =
      `New lesson enquiry from website:%0A%0A` +
      `Name: ${name}%0A` +
      `Contact: ${contact}%0A` +
      `Subject: ${subject}%0A` +
      `Lesson type: ${lessonType}%0A` +
      `City: ${city}%0A%0A` +
      `Message:%0A${message}`;

    const url = `https://wa.me/${whatsappNumber}?text=${text}`;

    window.open(url, "_blank");
  });
}
