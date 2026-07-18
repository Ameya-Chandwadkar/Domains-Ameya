/**
 * Small animation helpers — reduced-motion detection and the staggered
 * chamber entrance (approximates the Framer Motion spring in DomainPod.tsx).
 */
function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Triggers each chamber's entrance transition with a per-pod stagger delay. */
function mountChamberEntrance(chamberEl, variation) {
  const delay = variation * 0.1;
  chamberEl.style.transitionDelay = `${delay}s`;

  const mount = () => {
    if (chamberEl.classList.contains("is-mounted")) return;
    chamberEl.classList.add("is-mounted");
  };

  // Two rAFs to guarantee the initial (pre-mount) styles have painted
  // before the class swap kicks off the CSS transition.
  requestAnimationFrame(() => requestAnimationFrame(mount));
  // Safety net: rAF is paused for backgrounded/prerendered tabs, so fall
  // back to a timer to guarantee chambers never stay stuck invisible.
  window.setTimeout(mount, 120);

  // Once the one-time entrance has played, drop the delay so later
  // hover/dim/active transitions react immediately.
  window.setTimeout(() => {
    chamberEl.style.transitionDelay = "";
  }, (delay + 0.6) * 1000);
}
