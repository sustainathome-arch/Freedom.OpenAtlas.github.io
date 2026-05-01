import { fj13 } from "/data/fj13.js";
import { esc, html } from "../site.js";
import { renderPhotoRow } from "../components.js";
import { initReveal } from "../motion.js";

export function init() {
  const photoSlot = document.querySelector("[data-fj-gallery]");
  if (photoSlot) photoSlot.innerHTML = renderPhotoRow(fj13.gallery);

  const specSlot = document.querySelector("[data-fj-specs]");
  if (specSlot) {
    specSlot.innerHTML = fj13.specs
      .map(
        (s) => html`
          <tr>
            <th scope="row">${esc(s.label)}</th>
            <td><strong>${esc(s.value)}</strong></td>
          </tr>
        `
      )
      .join("");
  }

  const upgradeSlot = document.querySelector("[data-fj-upgrades]");
  if (upgradeSlot) {
    upgradeSlot.innerHTML = fj13.upgrades
      .map(
        (u) => html`
          <article class="upgrade-card reveal">
            <span class="upgrade-card__status">${esc(u.status)}</span>
            <h3>${esc(u.title)}</h3>
            <p class="text-secondary">${esc(u.body)}</p>
          </article>
        `
      )
      .join("");
  }
  initReveal();
}
