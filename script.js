const header = document.querySelector("[data-header]");
const cursorGlow = document.querySelector(".cursor-glow");
const revealItems = document.querySelectorAll(".reveal");
const yearItems = document.querySelectorAll("[data-year]");

yearItems.forEach((item) => {
  item.textContent = new Date().getFullYear();
});

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 32);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (cursorGlow) {
  window.addEventListener("pointermove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
    cursorGlow.style.opacity = "1";
  });

  window.addEventListener("pointerleave", () => {
    cursorGlow.style.opacity = "0";
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
  revealObserver.observe(item);
});

document.querySelectorAll(".fleet-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-4px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});
