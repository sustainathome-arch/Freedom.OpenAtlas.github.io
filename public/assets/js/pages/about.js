import { site } from "/data/site.js";
import { renderPillars, renderStats } from "../components.js";
import { initReveal } from "../motion.js";

export function init() {
  renderPillars("[data-pillars-grid]", site.pillars, { layout: "grid" });
  renderStats("[data-about-stats]", site.stats);
  initReveal();
}
