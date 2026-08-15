const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const year = document.querySelector("[data-year]");

function closeMenu() {
  navMenu?.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
}

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 10);
}

function markCurrentPage() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    const target = link.getAttribute("href");
    if (target === current) {
      link.setAttribute("aria-current", "page");
    }
  });
}

updateHeader();
markCurrentPage();
window.addEventListener("scroll", updateHeader, { passive: true });

if (year) {
  year.textContent = new Date().getFullYear();
}

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu?.classList.toggle("is-open") ?? false;
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    closeMenu();
  }
});

document.addEventListener("click", (event) => {
  if (!navMenu?.classList.contains("is-open")) return;
  if (event.target instanceof Node && !header?.contains(event.target)) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    navToggle?.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1120) closeMenu();
});
