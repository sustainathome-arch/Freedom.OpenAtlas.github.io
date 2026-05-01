import {
  planningKit,
  fieldSignals,
} from "/data/resources.js";
import {
  renderPlanningGroup,
  renderFieldSignals,
} from "../components.js";
import { initReveal } from "../motion.js";

export function init() {
  const slot = document.querySelector("[data-planning]");
  if (slot) {
    slot.innerHTML = planningKit.map(renderPlanningGroup).join("");
  }

  const toc = document.querySelector("[data-planning-toc]");
  if (toc) {
    toc.innerHTML = planningKit
      .map(
        (g) =>
          `<a class="toc-link" href="#${g.id}"><span>${g.title}</span><span>${g.items.length} notes</span></a>`,
      )
      .join("");
  }

  renderFieldSignals("[data-field-signals]", fieldSignals);
  initReveal();
}
