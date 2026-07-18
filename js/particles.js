/**
 * Floating dust particles — ported 1:1 from FloatingParticles.tsx.
 * Transform/opacity-only motes so they stay smooth even on low-power devices.
 */
function renderParticles(container, count) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("i");
    dot.className = "particle";
    dot.setAttribute("aria-hidden", "true");

    const size = i % 5 === 0 ? 2 : 1;
    dot.style.left = `${(i * 37 + 13) % 100}%`;
    dot.style.top = `${(i * 61 + 7) % 100}%`;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;

    if (reduceMotion) {
      dot.style.opacity = "1";
    } else {
      const duration = 5 + (i % 6);
      const delay = -(i % 5);
      dot.style.animationDuration = `${duration}s`;
      dot.style.animationDelay = `${delay}s`;
    }

    fragment.appendChild(dot);
  }

  container.appendChild(fragment);
}
