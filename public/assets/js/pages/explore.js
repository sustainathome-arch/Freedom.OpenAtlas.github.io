import { posts } from "/data/posts.js";
import { renderPostGrid } from "../components.js";
import { withBase } from "../site.js";
import { initReveal } from "../motion.js";

export function init() {
  const q = new URL(window.location.href).searchParams.get("tag");
  const filtered = q
    ? posts.filter((p) =>
        (p.tags ?? []).some((t) => t.toLowerCase() === q.toLowerCase())
      )
    : posts;

  renderPostGrid("[data-all-posts]", filtered);

  const tags = Array.from(
    new Set(posts.flatMap((p) => p.tags ?? []))
  ).sort();
  const tagEl = document.querySelector("[data-tags]");
  if (tagEl) {
    tagEl.innerHTML = [
      `<a class="btn btn--ghost btn--sm${!q ? " is-active" : ""}" href="${withBase("/pages/explore/")}">All</a>`,
      ...tags.map(
        (t) =>
          `<a class="btn btn--ghost btn--sm${
            q && q.toLowerCase() === t.toLowerCase() ? " is-active" : ""
          }" href="${withBase("/pages/explore/")}?tag=${encodeURIComponent(t)}">${t}</a>`
      ),
    ].join("");
  }
  initReveal();
}
