import { destinationsByState } from "/data/destinations.js";
import { posts } from "/data/posts.js";
import { renderDestinationsByState, postLookup } from "../components.js";
import { initReveal } from "../motion.js";

export function init() {
  const slot = document.querySelector("[data-destinations]");
  if (slot) {
    slot.innerHTML = renderDestinationsByState(destinationsByState, postLookup(posts));
  }
  initReveal();
}
