const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

document.querySelectorAll(".accordion details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;

    document.querySelectorAll(".accordion details").forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");

if (header && menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const toTop = document.querySelector(".to-top");

if (toTop) {
  const toggleToTop = () => {
    toTop.classList.toggle("is-visible", window.scrollY > 520);
  };

  window.addEventListener("scroll", toggleToTop, { passive: true });
  toggleToTop();
}

const cursor = document.querySelector(".cursor-follow");
const canUseCustomCursor =
  cursor &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canUseCustomCursor) {
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let targetX = x;
  let targetY = y;

  const moveCursor = () => {
    x += (targetX - x) * 0.18;
    y += (targetY - y) * 0.18;
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
    requestAnimationFrame(moveCursor);
  };

  window.addEventListener("pointermove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    cursor.classList.add("is-active");
  });

  document.querySelectorAll("a, button, summary, details").forEach((element) => {
    element.addEventListener("pointerenter", () => cursor.classList.add("is-hovering"));
    element.addEventListener("pointerleave", () => cursor.classList.remove("is-hovering"));
  });

  moveCursor();
}
