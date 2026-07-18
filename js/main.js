/**
 * Domains section behaviour — ported from DomainsSection/DomainPod/DomainInfoPanel/
 * BackgroundEffects (all .tsx). Manages hover + selection state with plain DOM APIs.
 */
(function () {
  "use strict";

  let selectedDomain = null;
  let hoveredDomain = null;

  const podsRow = document.getElementById("podsRow");
  const hoverDimOverlay = document.getElementById("hoverDimOverlay");
  const hoverAccentOverlay = document.getElementById("hoverAccentOverlay");
  const bgEffectsInner = document.getElementById("bgEffectsInner");
  const infoPanel = document.getElementById("infoPanel");
  const infoPanelTitle = document.getElementById("infoPanelTitle");
  const infoPanelDescription = document.getElementById("infoPanelDescription");
  const infoPanelClose = document.getElementById("infoPanelClose");
  const particlesLayer = document.getElementById("particlesLayer");

  const chamberEls = new Map(); // domain.id -> chamber button element

  function perDomainTuning(domain) {
    let vibScale = 1;
    let animDuration = "0.5s";
    if (domain.id === "levi") animDuration = "0.3s";
    if (domain.id === "mikasa") animDuration = "0.6s";
    if (domain.id === "eren") vibScale = 2;
    if (domain.id === "armin") animDuration = "0.45s";
    return { vibScale, animDuration };
  }

  function dustParticleSpecs() {
    return [
      { bottom: "20%", left: "20%", size: 4, dir: -1.2, delay: "0.0s" },
      { bottom: "25%", left: "30%", size: 6, dir: -0.5, delay: "0.4s" },
      { bottom: "18%", right: "25%", size: 4, dir: 0.8, delay: "0.2s" },
      { bottom: "22%", right: "35%", size: 6, dir: 1.5, delay: "0.7s" },
    ];
  }

  function buildChamber(domain) {
    const { vibScale, animDuration } = perDomainTuning(domain);

    const chamber = document.createElement("button");
    chamber.type = "button";
    chamber.className = `chamber group chamber--${domain.id}`;
    chamber.setAttribute("aria-pressed", "false");
    chamber.setAttribute("aria-label", `Open ${domain.title} domain`);
    chamber.style.setProperty("--accent", domain.accent);
    chamber.style.setProperty("--vib-scale", String(vibScale));
    chamber.style.setProperty("--anim-duration", animDuration);

    const dust = dustParticleSpecs()
      .map((d) => {
        const pos = [
          d.bottom ? `bottom:${d.bottom};` : "",
          d.left ? `left:${d.left};` : "",
          d.right ? `right:${d.right};` : "",
        ].join("");
        return `<span class="chamber__dust" style="${pos}width:${d.size}px;height:${d.size}px;--dust-drift-x:${d.dir * 10}px;animation-delay:${d.delay};"></span>`;
      })
      .join("");

    chamber.innerHTML = `
      <div class="chamber__frame"></div>
      <div class="chamber__inner-bg"></div>

      <div class="chamber__chamber-bg">
        <div class="chamber__fog"></div>
        <div class="chamber__fog-top"></div>
        <div class="chamber__inner-glow"></div>
        <div class="chamber__core-glow"></div>
      </div>

      <div class="chamber__pipe chamber__pipe--left">
        <div class="chamber__pipe-cap"></div>
        <div class="chamber__pipe-shadow"></div>
      </div>
      <div class="chamber__pipe chamber__pipe--right">
        <div class="chamber__pipe-cap"></div>
        <div class="chamber__pipe-shadow"></div>
      </div>

      <div class="chamber__lock chamber__lock--left chamber__lock--top"><span class="chamber__lock-dot"></span><span class="chamber__lock-dot"></span></div>
      <div class="chamber__lock chamber__lock--left chamber__lock--bottom"><span class="chamber__lock-dot"></span><span class="chamber__lock-dot"></span></div>
      <div class="chamber__lock chamber__lock--right chamber__lock--top"><span class="chamber__lock-dot"></span><span class="chamber__lock-dot"></span></div>
      <div class="chamber__lock chamber__lock--right chamber__lock--bottom"><span class="chamber__lock-dot"></span><span class="chamber__lock-dot"></span></div>

      <div class="chamber__piston chamber__piston--left">
        <div class="chamber__piston-rod"></div>
        <div class="chamber__piston-base"></div>
      </div>
      <div class="chamber__piston chamber__piston--right">
        <div class="chamber__piston-rod"></div>
        <div class="chamber__piston-base"></div>
      </div>

      <div class="chamber__character-wrap">
        <div class="chamber__character">
          <div class="chamber__rim-back"></div>
          <div class="chamber__steam chamber__steam--left"></div>
          <div class="chamber__steam chamber__steam--right"></div>
          ${dust}
          <div class="chamber__red-glow"></div>
          <img class="chamber__image" src="${domain.image}" alt="${domain.character}" loading="${domain.variation < 2 ? "eager" : "lazy"}" />
          <div class="chamber__rim-front"></div>
        </div>
      </div>

      <div class="chamber__glass">
        <div class="chamber__glass-reflect"></div>
        <div class="chamber__glass-sweep"></div>
        <div class="chamber__scratch-a"></div>
        <div class="chamber__scratch-b"></div>
        <div class="chamber__condensation-a"></div>
        <div class="chamber__condensation-b"></div>
      </div>

      <div class="chamber__ui">
        <div class="chamber__specimen">SPECIMEN&ndash;0${domain.variation + 1}</div>
        <div class="chamber__warning-lights">
          <span class="chamber__warning-dot--red"></span>
          <span class="chamber__warning-dot--amber"></span>
        </div>
        <div class="chamber__vent">
          <div class="chamber__vent-line"></div>
          <div class="chamber__vent-line"></div>
          <div class="chamber__vent-line"></div>
        </div>
        <div class="chamber__label-block">
          <p class="chamber__sector">CONTAINMENT SECTOR ${domain.variation + 1} // ${domain.character.toUpperCase()}</p>
          <h3 class="chamber__pod-title">${domain.title}</h3>
        </div>
      </div>

      <div class="chamber__bolt chamber__bolt--tl"><span class="chamber__bolt-slot"></span></div>
      <div class="chamber__bolt chamber__bolt--tr"><span class="chamber__bolt-slot"></span></div>
      <div class="chamber__bolt chamber__bolt--bl"><span class="chamber__bolt-slot"></span></div>
      <div class="chamber__bolt chamber__bolt--br"><span class="chamber__bolt-slot"></span></div>
    `;

    chamber.addEventListener("click", () => selectDomain(domain));
    chamber.addEventListener("mouseenter", () => setHovered(domain));
    chamber.addEventListener("mouseleave", () => setHovered(null));

    return chamber;
  }

  function setActiveOverlay(chamber, isActive) {
    let overlay = chamber.querySelector(".chamber__active-overlay");
    if (isActive) {
      if (overlay) return;
      overlay = document.createElement("div");
      overlay.className = "chamber__active-overlay";
      overlay.innerHTML = `
        <div class="chamber__door chamber__door--left"></div>
        <div class="chamber__door chamber__door--right"></div>
        <div class="chamber__active-ring"></div>
      `;
      chamber.appendChild(overlay);
    } else if (overlay) {
      overlay.remove();
    }
  }

  function renderPodStates() {
    chamberEls.forEach((chamber, id) => {
      const isActive = Boolean(selectedDomain && selectedDomain.id === id);
      const isDimmed = Boolean(selectedDomain && selectedDomain.id !== id);
      chamber.classList.toggle("is-active", isActive);
      chamber.classList.toggle("is-dimmed", isDimmed);
      chamber.setAttribute("aria-pressed", String(isActive));
      setActiveOverlay(chamber, isActive);
    });
  }

  function selectDomain(domain) {
    selectedDomain = selectedDomain && selectedDomain.id === domain.id ? null : domain;
    renderPodStates();
    renderInfoPanel();
  }

  function closeSelection() {
    if (!selectedDomain) return;
    selectedDomain = null;
    renderPodStates();
    renderInfoPanel();
  }

  function setHovered(domain) {
    hoveredDomain = domain;
    hoverDimOverlay.classList.toggle("is-active", Boolean(hoveredDomain));
    if (hoveredDomain) {
      hoverAccentOverlay.style.backgroundColor = hoveredDomain.accent;
      hoverAccentOverlay.classList.add("is-active");
    } else {
      hoverAccentOverlay.classList.remove("is-active");
    }
    bgEffectsInner.classList.toggle("is-hovered", Boolean(hoveredDomain));
  }

  let panelHideTimer = null;

  function renderInfoPanel() {
    window.clearTimeout(panelHideTimer);

    if (selectedDomain) {
      infoPanelTitle.textContent = selectedDomain.title;
      infoPanelDescription.textContent = selectedDomain.description;
      infoPanel.setAttribute("aria-label", `${selectedDomain.title} details`);
      infoPanel.hidden = false;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => infoPanel.classList.add("is-open"));
      });
    } else {
      infoPanel.classList.remove("is-open");
      panelHideTimer = window.setTimeout(() => {
        infoPanel.hidden = true;
      }, 400);
    }
  }

  function init() {
    DOMAINS.forEach((domain) => {
      const slot = document.createElement("div");
      slot.className = "pod-slot";

      const chamber = buildChamber(domain);
      slot.appendChild(chamber);
      podsRow.appendChild(slot);

      chamberEls.set(domain.id, chamber);
      mountChamberEntrance(chamber, domain.variation);
    });

    renderPodStates();

    infoPanelClose.addEventListener("click", closeSelection);
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeSelection();
    });

    renderParticles(particlesLayer, 60);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
