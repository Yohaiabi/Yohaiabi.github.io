// -------- Scroll-Reveal ----------
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("show");
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
});

// -------- Back-to-Top ----------
const backBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backBtn.classList.toggle("visible", window.scrollY > 400);
});
backBtn.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);
