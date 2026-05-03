// Open Atlas – render helpers for repeating UI: post cards, gear items,
// destination tables, photo rows. Pages call these with a slot element.

import { html, esc, formatDate, withBase } from "./site.js";

/**
 * Render a single post card anchor.
 */
export function renderPostCard(post, { compact = false } = {}) {
  return html`
    <a class="card ${compact ? "card--compact" : ""}" href="${esc(withBase(post.url))}">
      <div class="card__media">
        <img
          src="${esc(withBase(post.image))}"
          alt="${esc(post.imageAlt ?? post.title)}"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="card__body">
        ${post.category ? html`<span class="card__tag">${esc(post.category)}</span>` : ""}
        <h3 class="card__title">${esc(post.title)}</h3>
        <p class="card__excerpt">${esc(post.excerpt)}</p>
        <div class="card__meta">
          <time datetime="${esc(post.date)}">${esc(formatDate(post.date))}</time>
          ${post.readMinutes ? html`<span>·</span><span>${post.readMinutes} min read</span>` : ""}
          <span class="card__cta">Read the field notes →</span>
        </div>
      </div>
    </a>
  `;
}

/**
 * Render a grid of post cards into a slot element (selector or element).
 */
export function renderPostGrid(slotOrSelector, posts, opts) {
  const slot =
    typeof slotOrSelector === "string"
      ? document.querySelector(slotOrSelector)
      : slotOrSelector;
  if (!slot) return;
  slot.innerHTML = posts.map((p) => renderPostCard(p, opts)).join("");
}

/**
 * Render a photo tile (no link), used in fund panels and galleries.
 */
export function renderPhotoTile({ src, alt, caption }) {
  return html`
    <figure class="photo-tile">
      <img src="${esc(withBase(src))}" alt="${esc(alt)}" loading="lazy" decoding="async" />
      ${caption ? html`<figcaption class="photo-tile__caption">${esc(caption)}</figcaption>` : ""}
    </figure>
  `;
}

/**
 * Render a row of photo tiles.
 */
export function renderPhotoRow(photos) {
  return html`<div class="photo-row">${photos.map(renderPhotoTile).join("")}</div>`;
}

/**
 * Render a gear item card.
 */
export function renderGearItem(item, postLookup = {}) {
  const reviewUrl = item.review && postLookup[item.review]?.url;
  const links = (item.links ?? [])
    .map(
      (l) => html`<a class="btn btn--ghost btn--sm" href="${esc(l.href)}" rel="nofollow sponsored">${l.label === "Affiliate link" ? "Buy on Amazon" : esc(l.label)}</a>`
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
        <p class="card__tag">${esc(item.brand)}</p>
        <h3 class="gear-item__title">${esc(item.name)}</h3>
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

/**
 * Render a destinations-by-state section.
 */
export function renderDestinationsByState(groups, postLookup = {}) {
  return groups
    .map((group) => {
      const rows =
        group.destinations.length === 0
          ? html`<tr class="empty-row"><td colspan="4">More destinations in ${esc(
              group.state
            )} coming soon — we're scouting.</td></tr>`
          : group.destinations
              .map((d) => {
                const nameCell = d.post && postLookup[d.post]
                  ? html`<a href="${esc(withBase(postLookup[d.post].url))}">${esc(d.name)}</a>`
                  : esc(d.name);
                const plannedTag = d.planned
                  ? html` <span class="tag tag--planned">Planned</span>`
                  : "";
                return html`
                  <tr>
                    <td>${nameCell}${plannedTag}</td>
                    <td>${esc(d.region ?? "")}</td>
                    <td>${esc(d.difficulty ?? "")}</td>
                    <td><span class="text-muted">${esc(d.agency ?? "")}</span></td>
                  </tr>
                `;
              })
              .join("");

      const count = group.destinations.length;
      return html`
        <section class="state-section reveal">
          <div class="state-section__head">
            <div>
              <h2 class="state-section__title">${esc(group.state)}</h2>
              <p class="text-secondary" style="margin:0.35rem 0 0; max-width:42rem;">${esc(group.tagline ?? "")}</p>
            </div>
            <span class="state-section__count">${count} ${count === 1 ? "place" : "places"}</span>
          </div>
          <table class="dest-table">
            <thead>
              <tr>
                <th>Destination</th>
                <th>Region</th>
                <th>Difficulty</th>
                <th>Managed by</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </section>
      `;
    })
    .join("");
}

/**
 * Build a post lookup table { slug: post } from the posts array.
 */
export function postLookup(posts) {
  return Object.fromEntries(posts.map((p) => [p.slug, p]));
}

/**
 * Render a "More posts" row on a journal entry.
 */
export function renderMorePosts(slot, posts) {
  const el = typeof slot === "string" ? document.querySelector(slot) : slot;
  if (!el) return;
  el.innerHTML = html`
    <h3 class="more-posts__title">More from the journal</h3>
    <div class="card-grid">${posts.map((p) => renderPostCard(p, { compact: true })).join("")}</div>
  `;
}

/**
 * Render a grid of "stats" (value + label + optional note). Reads from
 * `site.stats` on the home page.
 */
export function renderStats(slot, stats) {
  const el = typeof slot === "string" ? document.querySelector(slot) : slot;
  if (!el) return;
  el.innerHTML = stats
    .map(
      (s) => html`
        <div class="stat">
          <div class="stat__value display-sunrise">${esc(s.value)}</div>
          <div class="stat__label">${esc(s.label)}</div>
          ${s.note ? html`<div class="stat__note">${esc(s.note)}</div>` : ""}
        </div>
      `,
    )
    .join("");
}

const PILLAR_ICONS = {
  map: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20l5-12 4 7 3-5 6 10H3z"/><circle cx="17" cy="6" r="2"/></svg>`,
  compass: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/><path d="M12 12l3-6M12 12l-3 6"/></svg>`,
  truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17h14l-2-5H7l-2 5z"/><circle cx="8" cy="18.5" r="1.5"/><circle cx="16" cy="18.5" r="1.5"/><path d="M7 12V8a2 2 0 012-2h6l3 6"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 4C9 4 4 9 4 20c11 0 16-5 16-16z"/><path d="M4 20l10-10"/></svg>`,
};

/**
 * Render the four "pillars" rail. Defaults to vertical (in the mission aside);
 * pass { layout: 'grid' } for the standalone grid used on the About page.
 */
export function renderPillars(slot, pillars, { layout = "aside" } = {}) {
  const el = typeof slot === "string" ? document.querySelector(slot) : slot;
  if (!el) return;

  const wrapper = layout === "grid" ? "pillar-grid" : "pillar-aside";
  el.innerHTML = html`
    <div class="${wrapper}">
      ${pillars
        .map(
          (p) => html`
            <div class="pillar">
              <span class="pillar__icon" aria-hidden="true">
                ${PILLAR_ICONS[p.icon] ?? PILLAR_ICONS.map}
              </span>
              <div>
                <h3 class="pillar__title">${esc(p.title)}</h3>
                <p class="pillar__body">${esc(p.body)}</p>
              </div>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

/**
 * Render a "region rail" — cards that summarize coverage per state/region.
 */
export function renderRegionRail(slot, groups) {
  const el = typeof slot === "string" ? document.querySelector(slot) : slot;
  if (!el) return;
  el.innerHTML = groups
    .map(
      (g) => html`
        <a class="region-card" href="${esc(
          withBase("/pages/pages/pacific-northwest/") + `#${g.state.toLowerCase()}`,
        )}">
          <div class="region-card__head">
            <h3>${esc(g.state)}</h3>
            <span>${g.destinations.length} ${g.destinations.length === 1 ? "place" : "places"}</span>
          </div>
          <p>${esc(g.tagline ?? "")}</p>
          <span class="card__cta">Open the directory →</span>
        </a>
      `,
    )
    .join("");
}

/**
 * Render a trip-planning / resource group from resources.js.
 */
export function renderPlanningGroup(group) {
  const items = group.items
    .map(
      (it) => html`
        <div class="planning-row">
          <div class="planning-row__head">
            <span class="planning-row__kind">${esc(it.kind)}</span>
            <strong>${esc(it.name)}</strong>
          </div>
          <p>${esc(it.why)}</p>
        </div>
      `,
    )
    .join("");

  return html`
    <section class="planning-card reveal" id="${esc(group.id)}">
      <header>
        <h3>${esc(group.title)}</h3>
        <p class="text-secondary">${esc(group.lede)}</p>
      </header>
      <div class="planning-list">${items}</div>
    </section>
  `;
}

/**
 * Render the quick "field signals" strip used on home + resources.
 */
export function renderFieldSignals(slot, signals) {
  const el = typeof slot === "string" ? document.querySelector(slot) : slot;
  if (!el) return;
  el.innerHTML = signals
    .map(
      (s) => html`
        <div class="signal signal--${esc(s.accent ?? "ember")}">
          <span class="signal__label">${esc(s.label)}</span>
          <span class="signal__value">${esc(s.value)}</span>
        </div>
      `,
    )
    .join("");
}
