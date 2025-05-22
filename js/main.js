document.addEventListener("DOMContentLoaded", () => {
  updateButtonsTheme();
});
// -------- Scroll-Reveal ----------
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// -------- Smooth Scroll + Active Nav ----------
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (ev) => {
    ev.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target && target.scrollIntoView({ behavior: "smooth" });
  });
});

const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
const sections = Array.from(navLinks).map((l) =>
  document.querySelector(l.hash)
);

window.addEventListener("scroll", () => {
  const pos = window.scrollY + 80; // offset for navbar
  sections.forEach((sec, i) => {
    if (sec.offsetTop <= pos && sec.offsetTop + sec.offsetHeight > pos) {
      navLinks[i].classList.add("active");
    } else {
      navLinks[i].classList.remove("active");
    }
  });
});

// -------- Dark-Mode Toggle ----------
const body = document.body;
const themeToggle = document.getElementById("themeToggle");
if (localStorage.getItem("theme") === "dark") body.classList.add("dark");

themeToggle?.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "");
  updateButtonsTheme();
});

// keyboard accessibility for theme toggle
themeToggle?.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    themeToggle.click();
    updateButtonsTheme();
  }
});

// -------- Back-to-Top ----------
const backBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backBtn.classList.toggle("visible", window.scrollY > 400);
});
backBtn.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

// --- Handle Dark and default color linkedin btn and GitHub btns ---
function updateButtonsTheme() {
  const isDark = document.body.classList.contains("dark");

  // GitHub buttons
  const githubButtons = document.querySelectorAll(".github-btn");
  githubButtons.forEach((btn) => {
    btn.classList.remove(
      isDark ? "btn-outline-secondary" : "btn-outline-light"
    );
    btn.classList.add(isDark ? "btn-outline-light" : "btn-outline-secondary");
  });

  // LinkedIn button
  const linkedinBtn = document.querySelector(".linkedin-btn");
  if (linkedinBtn) {
    linkedinBtn.classList.remove(isDark ? "btn-primary" : "btn-light");
    linkedinBtn.classList.add(isDark ? "btn-light" : "btn-primary");
  }
}

// --- Dynamic year in footer ---
document.getElementById("year").textContent = new Date().getFullYear();
