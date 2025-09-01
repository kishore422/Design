console.clear();

const cardsContainer = document.querySelector(".cards");
const cards = Array.from(document.querySelectorAll(".cards__inner > .card"));
const overlay = document.querySelector(".overlay");

// Track pointer accurately (works with scroll)
function applyOverlayMask(e) {
  const rect = cardsContainer.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  overlay.style.setProperty("--opacity", "1");
  overlay.style.setProperty("--x", `${x}px`);
  overlay.style.setProperty("--y", `${y}px`);
}

// Make an overlay twin for each card, mirror size by ResizeObserver
const ro = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const index = cards.indexOf(entry.target);
    if (index < 0) return;
    const { width, height } = entry.contentRect; // broadly supported
    const twin = overlay.children[index];
    if (twin) {
      twin.style.width = `${width}px`;
      twin.style.height = `${height}px`;
    }
  });
});

function initOverlayCard(cardEl) {
  const twin = document.createElement("div");
  twin.className = "card";
  // clone CTA label for the colored button
  const cta = cardEl.querySelector(".cta");
  if (cta) {
    const clone = document.createElement("a");
    clone.className = "cta";
    clone.textContent = cta.textContent;
    clone.setAttribute("aria-hidden", "true");
    twin.appendChild(clone);
  }
  overlay.appendChild(twin);
  ro.observe(cardEl);
}

cards.forEach(initOverlayCard);

// Activate spotlight on pointer move within the whole document
document.addEventListener("pointermove", applyOverlayMask);
// Hide spotlight when leaving window
document.addEventListener("pointerleave", () => {
  overlay.style.setProperty("--opacity", "0");
});
