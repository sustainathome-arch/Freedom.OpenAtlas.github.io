// Open Atlas – shared site chrome (header, footer, mobile nav) and utilities. Imported by every page via main.js.

import { site } from "/data/site.js";

/**
 * Public path prefix when the site is hosted under a subpath (e.g. GitHub Project Pages).
 * Derived from this module's URL: …/assets/js/site.js → prefix is everything before /assets/.
 */
export function getPublicBase() {
  try {
    const path = new URL(import.meta.url).pathname;
    const i = path.indexOf("/assets/");
    return i === -1 ? "" : path.slice(0, i);
  } catch {
    return "";
  }
}

/**
 * Prefix root-absolute internal paths with {@link getPublicBase}. External URLs and hashes are unchanged.
 */
export function withBase(href) {
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
  return getPublicBase() + h;
}

function normalizePathname(path) {
  let x = path.replace(/\/index\.html$/, "");
  if (x === "") x = "/";
  if (!x.endsWith("/")) x += "/";
  return x;
}

/**
 * Simple HTML escape for user-supplied strings.
 * Values in our data modules are authored, so this is belt-and-suspenders.
 */
export function esc(value) {
  if (value == null) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Tagged template literal that just concatenates safely; mostly a readability
 * helper so page source looks like HTML.
 */
export function html(strings, ...values) {
  return strings.reduce((acc, str, i) => acc + str + (values[i] ?? ""), "");
}

/**
 * Return true if the given href matches the current page pathname (allowing
 * for trailing-slash variance and nested paths under a section).
 */
function isActive(href) {
  const cur = normalizePathname(window.location.pathname);
  if (href === "/") {
    const base = getPublicBase();
    if (!base) return cur === "/";
    return cur === normalizePathname(`${base}/`);
  }
  const dest = normalizePathname(withBase(href));
  return cur === dest || cur.startsWith(dest);
}

/**
 * Render the compass/logo mark used beside the wordmark.
 */
function renderMark() {
  return html`
    <img 
      class="brand__mark" 
      src="${withBase("/assets/images/Final Site Brand.svg")}" 
      alt="" 
      aria-hidden="true"
    />
  `;
}

/**
 * Render the top site header (fixed, overlays the hero).
 */
export function renderHeader() {
  const slot = document.querySelector("[data-site-header]");
  if (!slot) return;

  const nav = site.nav
    .map(
      (n) => html`
        <li>
          <a
            class="primary-nav__link ${n.cta
              ? "primary-nav__link--cta"
              : ""} ${isActive(n.href) ? "is-active" : ""}"
            href="${esc(withBase(n.href))}"
          >
            ${esc(n.label)}
          </a>
        </li>
      `,
    )
    .join("");

  const mobileNav = site.nav
    .map(
      (n) => html`
        <li>
          <a class="mobile-nav__link" href="${esc(withBase(n.href))}">${esc(n.label)}</a>
        </li>
      `,
    )
    .join("");

  slot.outerHTML = html`
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header is-floating" data-site-header-el>
      <div class="container site-header__inner">
        <a class="brand" href="${esc(withBase("/"))}" aria-label="${esc(site.brand.name)} — home">
  ${renderMark()}
</a>

        <nav class="primary-nav" aria-label="Primary">
          <ul class="primary-nav__list">
            ${nav}
          </ul>
        </nav>

        <button
          class="nav-toggle"
          type="button"
          aria-expanded="false"
          aria-controls="mobile-nav"
          aria-label="Open menu"
          data-nav-toggle
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          >
            <path d="M4 7h16" />
            <path d="M4 12h16" />
            <path d="M4 17h16" />
          </svg>
        </button>
      </div>
    </header>

    <div class="mobile-nav" id="mobile-nav" data-mobile-nav>
      <ul class="mobile-nav__list">
        ${mobileNav}
      </ul>
    </div>
  `;

  bindHeader();
}

/**
 * Fix the header to a solid state once the user has scrolled past the hero.
 */
function bindHeader() {
  const header = document.querySelector("[data-site-header-el]");
  if (!header) return;

  const toggle = document.querySelector("[data-nav-toggle]");
  const mobile = document.querySelector("[data-mobile-nav]");

  const onScroll = () => {
    const scrolled = window.scrollY > 16;
    header.classList.toggle("is-solid", scrolled);
    header.classList.toggle("is-floating", !scrolled);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const open = mobile.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
    });
    mobile.addEventListener("click", (e) => {
      if (e.target instanceof HTMLAnchorElement) {
        mobile.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        document.body.style.overflow = "";
      }
    });
  }
}

/**
 * Render the site footer.
 */
export function renderFooter() {
  const slot = document.querySelector("[data-site-footer]");
  if (!slot) return;

  const cols = site.footerColumns
    .map(
      (col) => html`
        <div>
          <h4 class="site-footer__col-title">${esc(col.title)}</h4>
          <ul>
            ${col.links
              .map(
                (l) =>
                  html`<li><a href="${esc(withBase(l.href))}">${esc(l.label)}</a></li>`,
              )
              .join("")}
          </ul>
        </div>
      `,
    )
    .join("");

  slot.outerHTML = html`
    <footer class="site-footer">
      <div class="container">
        <div class="site-footer__grid">
          <div class="site-footer__brand">
  <a
    class="brand"
    href="${esc(withBase("/"))}"
    aria-label="${esc(site.brand.name)} — home"
  >
    ${renderMark()}
  </a>
  <p class="site-footer__tagline">${esc(site.description)}</p>
  <p class="site-footer__tagline">“${esc(site.brand.tagline)}”</p>
</div>
          ${cols}
        </div>
        <div class="site-footer__bottom">
          <span
            >© ${site.copyrightYear} ${esc(site.copyrightHolder)}. All rights
            reserved.</span
          >
          <span>Made with field notes, long drives, and strong coffee.</span>
        </div>
      </div>
    </footer>
  `;
}

/**
 * Set the document title and meta description for a page.
 */
export function setPageMeta({ title, description } = {}) {
  if (title) {
    document.title = `${title} — ${site.brand.name}`;
  }
  if (description) {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }
}

/**
 * Format an ISO date (YYYY-MM-DD) as "Month D, YYYY".
 */
export function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
