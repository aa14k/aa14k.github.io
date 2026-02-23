const menuButton = document.getElementById("menu-btn");
const nav = document.getElementById("site-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

const revealNodes = Array.from(document.querySelectorAll(".reveal"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const node = entry.target;
        const revealIndex = Number(node.getAttribute("data-reveal-index") || "0");
        node.style.transitionDelay = `${Math.min(revealIndex * 40, 220)}ms`;
        node.classList.add("visible");
        obs.unobserve(node);
      });
    },
    { threshold: 0.15 }
  );

  revealNodes.forEach((node, index) => {
    node.setAttribute("data-reveal-index", String(index));
    observer.observe(node);
  });
} else {
  revealNodes.forEach((node) => node.classList.add("visible"));
}
