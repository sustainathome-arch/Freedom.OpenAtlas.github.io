import { gearCategories } from "/data/gear.js";
import { posts } from "/data/posts.js";
import { renderGearItem, postLookup } from "../components.js";
import { esc, html, withBase } from "../site.js";
import { initReveal } from "../motion.js";

/**
 * Sort items by field and direction.
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
 * Flatten all gear items from categories and add category info.
 */
function flattenGearItems(categories) {
  return categories.flatMap((cat) =>
    cat.items.map((item) => ({
      ...item,
      category: cat.id,
      categoryTitle: cat.title,
    }))
  );
}

/**
 * Get all unique categories.
 */
function getAllCategories(categories) {
  return categories.map((cat) => ({
    id: cat.id,
    title: cat.title,
  }));
}

export function init() {
  const itemsContainer = document.querySelector("[data-gear-items]");
  const tagsContainer = document.querySelector("[data-gear-tags]");
  const container = itemsContainer?.closest(".container");
  
  if (!itemsContainer) return;

  const lookup = postLookup(posts);
  const allItems = flattenGearItems(gearCategories);
  const allCategories = getAllCategories(gearCategories);

  // Get URL params for filtering
  const urlParams = new URL(window.location.href).searchParams;
  const selectedCategory = urlParams.get("category");

  // Default sort
  let currentSort = "name";
  let currentDir = "asc";
  let filteredItems = allItems;

  // Apply category filter if selected
  if (selectedCategory) {
    filteredItems = allItems.filter((item) => item.category === selectedCategory);
  }

  function renderCategoryTags() {
    if (!tagsContainer) return;
    
    tagsContainer.innerHTML = [
      `<a class="btn btn--ghost btn--sm${!selectedCategory ? " is-active" : ""}" href="${withBase("/pages/our-gear/")}">All</a>`,
      ...allCategories.map(
        (cat) =>
          `<a class="btn btn--ghost btn--sm${
            selectedCategory === cat.id ? " is-active" : ""
          }" href="${withBase("/pages/our-gear/")}?category=${encodeURIComponent(cat.id)}">${esc(cat.title)}</a>`
      ),
    ].join("");
  }

  function renderSortControls() {
    return html`
      <div class="row" data-gear-sort style="gap: var(--sp-2); align-items: center;">
        <span style="font-size: var(--fs-sm); color: var(--text-secondary);">Sort by:</span>
        <select class="btn" data-gear-sort-field style="width: auto;">
          <option value="name" ${currentSort === "name" ? "selected" : ""}>Name</option>
          <option value="brand" ${currentSort === "brand" ? "selected" : ""}>Brand</option>
          <option value="category" ${currentSort === "category" ? "selected" : ""}>Category</option>
        </select>
        <button class="btn btn--ghost btn--sm" data-gear-sort-dir aria-label="Toggle sort direction">
          ${currentDir === "asc" ? "↑ Asc" : "↓ Desc"}
        </button>
      </div>
    `;
  }

  function render(items) {
    // Add sort controls if they don't exist
    const existingSort = container?.querySelector("[data-gear-sort]");
    if (!existingSort && tagsContainer) {
      tagsContainer.insertAdjacentHTML("afterend", renderSortControls());
    }

    // Render gear items in a vertical stack like library page
    if (items.length === 0) {
      itemsContainer.innerHTML = `<p class="text-muted"><em>No gear found in this category.</em></p>`;
    } else {
      itemsContainer.innerHTML = `<div class="stack stack--lg">${items
        .map((item) => renderGearItem(item, lookup))
        .join("")}</div>`;
    }

    initReveal();
  }

  // Initial render
  renderCategoryTags();
  const sortedItems = sortItems(filteredItems, currentSort, currentDir);
  render(sortedItems);

  // Handle sort changes
  container?.addEventListener("change", (e) => {
    if (e.target.matches("[data-gear-sort-field]")) {
      currentSort = e.target.value;
      const sortedItems = sortItems(filteredItems, currentSort, currentDir);
      render(sortedItems);
    }
  });

  // Handle sort direction changes
  container?.addEventListener("click", (e) => {
    if (e.target.matches("[data-gear-sort-dir]")) {
      currentDir = currentDir === "asc" ? "desc" : "asc";
      const sortedItems = sortItems(filteredItems, currentSort, currentDir);
      render(sortedItems);
      
      // Update button text
      e.target.innerHTML = currentDir === "asc" ? "↑ Asc" : "↓ Desc";
    }
  });
}
