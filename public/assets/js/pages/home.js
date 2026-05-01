import { site } from "/data/site.js";
import { latestPosts } from "/data/posts.js";
import { destinationsByState } from "/data/destinations.js";
import { fieldSignals } from "/data/resources.js";
import {
  renderPostGrid,
  renderStats,
  renderPillars,
  renderRegionRail,
  renderFieldSignals,
} from "../components.js";
import { initReveal } from "../motion.js";

export function init() {
  renderPostGrid("[data-latest-posts]", latestPosts(3));
  renderStats("[data-stats]", site.stats);
  renderPillars("[data-pillars]", site.pillars);
  renderRegionRail("[data-region-rail]", destinationsByState);
  renderFieldSignals("[data-field-signals]", fieldSignals);
  initReveal();
}
