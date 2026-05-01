import { libraryCategories } from "/data/library.js";
import { posts } from "/data/posts.js";
import { postLookup } from "../components.js";
import { esc, html } from "../site.js";
import { initReveal } from "../motion.js";

/**
 * Render a library item card.
 */
function renderLibraryItem(item, postLookup = {}) {
  const reviewUrl = item.review && postLookup[item.review]?.url;
  const links = (item.links ?? [])
    .map(
      (l) => html`<a class="btn btn--ghost btn--sm" href="${esc(l.href)}" rel="nofollow sponsored">${esc(l.label)}</a>`
    )
    .join("");

  const details = (item.details ?? [])
    .map((d) => html`<li>${esc(d)}</li>`)
    .join("");

  return html`
    <article class="gear-item">
      <div class="gear-item__media">
        <img src="${esc(withBase(item.image))}" alt="${esc(item.imageAlt)}" loading="lazy" decoding="async" />
      </div>
      <div class="gear-item__body">
        <p class="card__tag">${esc(item.author)}</p>
        <h3 class="gear-item__title">${esc(item.name)}</h3>
        ${item.publisher ? html`<p class="text-secondary" style="margin-top: -0.25rem; margin-bottom: 0.5rem;">${esc(item.publisher)}</p>` : ""}
        <p>${esc(item.blurb)}</p>
        ${details ? html`<ul class="gear-item__details">${details}</ul>` : ""}
        <div class="gear-item__links">
          ${links}
          ${
            reviewUrl
              ? html`<a class="btn btn--sm" href="${esc(withBase(reviewUrl))}">Read the review <svg class="btn__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></svg></a>`
              : ""
          }
        </div>
      </div>
    </article>
  `;
}

function withBase(href) {
  if (href == null || href === "") return href;
  const h = String(href);
  if (
    h.startsWith("http://") ||
    h.startsWith("https://") ||
    h.startsWith("//") ||
    h.startsWith("mailto:") ||
    h.startsWith("tel:") ||
    h.startsWith("#")
  ) {
    return h;
  }
  if (!h.startsWith("/")) return h;
  return h;
}

/**
 * Sort library items by field and direction.
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
 * Render the sort controls.
 */
function renderSortControls(currentSort, currentDir) {
  return html`
    <div class="row" data-library-sort style="gap: var(--sp-2); align-items: center; margin-bottom: var(--sp-4);">
      <span style="font-size: var(--fs-sm); color: var(--text-secondary);">Sort by:</span>
      <select class="btn" data-library-sort-field style="width: auto;">
        <option value="name" ${currentSort === "name" ? "selected" : ""}>Alphabetically</option>
        <option value="author" ${currentSort === "author" ? "selected" : ""}>Author</option>
        <option value="publisher" ${currentSort === "publisher" ? "selected" : ""}>Publisher</option>
      </select>
      <button class="btn btn--ghost btn--sm" data-library-sort-dir aria-label="Toggle sort direction">
        ${currentDir === "asc" ? "↑ Asc" : "↓ Desc"}
      </button>
    </div>
  `;
}

export function init() {
  const slot = document.querySelector("[data-library]");
  const toc = document.querySelector("[data-library-toc]");
  const container = slot?.closest(".container");
  if (!slot) return;

  const lookup = postLookup(posts);

  // Default sort
  let currentSort = "name";
  let currentDir = "asc";

  function render(sortedCategories) {
    // Only add sort controls if they don't exist yet
    const existingSort = container?.querySelector("[data-library-sort]");
    if (!existingSort) {
      const tocEl = container?.querySelector("[data-library-toc]");
      if (tocEl) {
        tocEl.insertAdjacentHTML("beforebegin", renderSortControls(currentSort, currentDir));
      }
    }

    // Render categories with sorted items
    slot.innerHTML = sortedCategories
      .map((cat) => {
        const body =
          cat.items.length === 0
            ? html`<p class="text-muted"><em>Stay tuned. More awesome books coming soon.</em></p>`
            : html`<div class="stack stack--lg">${cat.items
                .map((i) => renderLibraryItem(i, lookup))
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

    initReveal();
  }

  // Initial render with sorted items
  const sortedCategories = libraryCategories.map((cat) => ({
    ...cat,
    items: sortItems(cat.items, currentSort, currentDir),
  }));
  render(sortedCategories);

  // Handle sort changes
  container?.addEventListener("change", (e) => {
    if (e.target.matches("[data-library-sort-field]")) {
      currentSort = e.target.value;
      const sorted = libraryCategories.map((cat) => ({
        ...cat,
        items: sortItems(cat.items, currentSort, currentDir),
      }));
      render(sorted);
    }
  });

  container?.addEventListener("click", (e) => {
    if (e.target.matches("[data-library-sort-dir]")) {
      currentDir = currentDir === "asc" ? "desc" : "asc";
      const sorted = libraryCategories.map((cat) => ({
        ...cat,
        items: sortItems(cat.items, currentSort, currentDir),
      }));
      render(sorted);
    }
  });
}