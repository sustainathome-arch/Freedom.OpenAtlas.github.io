import { gearCategories } from "/data/gear.js";
import { posts } from "/data/posts.js";
import { renderGearItem, postLookup } from "../components.js";
import { esc, html } from "../site.js";
import { initReveal } from "../motion.js";

/**
 * Sort items within a category by field and direction.
 */
function sortItems(items, field, direction) {
  const sorted = [...items].sort((a, b) => {
    const aVal = (a[field] ?? "").toLowerCase();
    const bVal = (b[field] ?? "").toLowerCase();
    if (aVal < bVal) return -1;
    if (aVal > bVal) return 1;
    return 0;
  });
  return direction === "desc" ? sorted.reverse() : sorted;
}

/**
 * Sort categories by title.
 */
function sortCategories(categories, direction) {
  const sorted = [...categories].sort((a, b) => {
    const aVal = (a.title ?? "").toLowerCase();
    const bVal = (b.title ?? "").toLowerCase();
    if (aVal < bVal) return -1;
    if (aVal > bVal) return 1;
    return 0;
  });
  return direction === "desc" ? sorted.reverse() : sorted;
}

/**
 * Render the sort controls.
 */
function renderSortControls(currentSort, currentDir) {
  return html`
    <div class="row" data-gear-sort style="gap: var(--sp-2); align-items: center; margin-bottom: var(--sp-4);">
      <span style="font-size: var(--fs-sm); color: var(--text-secondary);">Sort by:</span>
      <select class="btn" data-gear-sort-field style="width: auto;">
        <option value="category" ${currentSort === "category" ? "selected" : ""}>Category</option>
        <option value="name" ${currentSort === "name" ? "selected" : ""}>Alphabetically</option>
        <option value="brand" ${currentSort === "brand" ? "selected" : ""}>Brand</option>
      </select>
      <button class="btn btn--ghost btn--sm" data-gear-sort-dir aria-label="Toggle sort direction">
        ${currentDir === "asc" ? "↑ Asc" : "↓ Desc"}
      </button>
    </div>
  `;
}

export function init() {
  const slot = document.querySelector("[data-gear]");
  const toc = document.querySelector("[data-gear-toc]");
  const container = slot?.closest(".container");
  if (!slot) return;

  const lookup = postLookup(posts);

  // Default sort
  let currentSort = "category";
  let currentDir = "asc";

  function render(sortedCategories) {
    // Only add sort controls if they don't exist yet
    const existingSort = container?.querySelector("[data-gear-sort]");
    if (!existingSort) {
      const tocEl = container?.querySelector("[data-gear-toc]");
      if (tocEl) {
        tocEl.insertAdjacentHTML("beforebegin", renderSortControls(currentSort, currentDir));
      }
    }

    // Render categories with sorted items
    slot.innerHTML = sortedCategories
      .map((cat) => {
        const body =
          cat.items.length === 0
            ? html`<p class="text-muted"><em>Stay tuned. More awesome gear coming soon.</em></p>`
            : html`<div class="stack stack--lg">${cat.items
                .map((i) => renderGearItem(i, lookup))
                .join("")}</div>`;
        return html`
          <section class="gear-section reveal" id="${esc(cat.id)}">
            <div class="gear-section__head">
              <h2 class="gear-section__title">${esc(cat.title)}</h2>
              <span class="gear-section__tag">${esc(cat.tag ?? "")}</span>
            </div>
            ${body}
          </section>
        `;
      })
      .join("");

    // Update TOC
    if (toc) {
      toc.innerHTML = sortedCategories
        .map(
          (c) =>
            html`<a class="btn btn--ghost btn--sm" href="#${esc(c.id)}">${esc(c.title)}</a>`
        )
        .join("");
    }

    initReveal();
  }

  // Initial render
  let sortedCategories = currentSort === "category"
    ? sortCategories(gearCategories, currentDir)
    : gearCategories.map((cat) => ({
        ...cat,
        items: sortItems(cat.items, currentSort, currentDir),
      }));
  render(sortedCategories);

  // Handle sort changes
  container?.addEventListener("change", (e) => {
    if (e.target.matches("[data-gear-sort-field]")) {
      currentSort = e.target.value;
      sortedCategories = currentSort === "category"
        ? sortCategories(gearCategories, currentDir)
        : gearCategories.map((cat) => ({
            ...cat,
            items: sortItems(cat.items, currentSort, currentDir),
          }));
      render(sortedCategories);
    }
  });

  container?.addEventListener("click", (e) => {
    if (e.target.matches("[data-gear-sort-dir]")) {
      currentDir = currentDir === "asc" ? "desc" : "asc";
      sortedCategories = currentSort === "category"
        ? sortCategories(gearCategories, currentDir)
        : gearCategories.map((cat) => ({
            ...cat,
            items: sortItems(cat.items, currentSort, currentDir),
          }));
      render(sortedCategories);
    }
  });
}
