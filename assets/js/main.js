/*
  Tanaka A-Level Lessons - Main JS
  Handles navigation highlighting, dark mode, animations, and forms.
*/

document.addEventListener("DOMContentLoaded", () => {
  // --- Active navigation highlighting ---
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath) {
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
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = contactForm.querySelector("#name");
      const contact = contactForm.querySelector("#contact");
      const subject = contactForm.querySelector("#subject");
      const lessonType = contactForm.querySelector("#lesson-type");
      const location = contactForm.querySelector("#location");
      const message = contactForm.querySelector("#message");
      const status = contactForm.querySelector(".form-status");

      const errors = [];
      if (!name.value.trim()) errors.push("Please enter your name.");
      if (!contact.value.trim()) {
        errors.push("Please enter an email or phone number.");
      } else {
        const isEmail = /@/.test(contact.value);
        const isPhone = /\d{7,}/.test(contact.value.replace(/\s+/g, ""));
        if (!isEmail && !isPhone) {
          errors.push("Enter a valid email or phone number.");
        }
      }
      if (!subject.value.trim()) errors.push("Please enter a subject.");
      if (!lessonType.value) errors.push("Please select a lesson type.");
      if (!location.value.trim()) errors.push("Please enter your city/location.");
      if (!message.value.trim()) errors.push("Please add a message.");

      if (errors.length) {
        status.textContent = errors.join(" ");
        status.style.color = "#d93025";
        return;
      }

      status.textContent = "Thanks! Your message has been received. We'll reply on WhatsApp within 24 hours.";
      status.style.color = "#1aa96b";
      contactForm.reset();
    });
  }

  // --- Email capture form ---
  const emailForm = document.querySelector("#email-capture");
  if (emailForm) {
    emailForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const emailInput = emailForm.querySelector("#email");
      const status = emailForm.querySelector(".form-status");
      if (!emailInput.value.trim() || !/@/.test(emailInput.value)) {
        status.textContent = "Please enter a valid email.";
        status.style.color = "#d93025";
        return;
      }
      status.textContent = "You're on the list! We'll share exam tips soon.";
      status.style.color = "#1aa96b";
      emailForm.reset();
    });
  }
});
const form = document.getElementById("contact-form");

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
