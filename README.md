# Open Atlas — site

Rebuild of [openatlas.wiki](https://openatlas.wiki/).
Built as an Astro site with route files in `src/pages/pages/` and static assets in `public/`.
There is no React/Vue/Svelte UI framework — pages are authored as HTML-first Astro route files plus browser ES modules.

**Data source of truth:** All site content data lives in `src/data/*.ts` (TypeScript). Browser-compatible JavaScript files in `public/data/` are auto-generated during build — never edit those directly.

## Run locally

Use the Astro dev server:

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (typically `http://localhost:4321/`).

To preview the production build:

```bash
npm run build
npm run preview
```

## Folder tour

```
├── astro.config.mjs                 Astro site + GitHub Pages base URL
├── package.json
├── public/                          copied verbatim to build output
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── CNAME                        GitHub Pages custom domain (openatlas.wiki)
│   ├── data/                        AUTO-GENERATED — do not edit
│   │   └── *.js                     built from src/data/*.ts at build time
│   └── assets/
│       ├── css/                     tokens, base, components, pages
│       ├── js/                      site chrome, components, page inits
│       │   └── pages/               one init module per page
│       ├── images/
│       │   ├── hero/                full-bleed hero photography
│       │   ├── posts/               journal thumbnails and inline shots
│       │   ├── destinations/        PNW feature photography
│       │   ├── gear/                real gear photos + SVG illustrations
│       │   ├── fj13/                FJ Cruiser photography
│       │   ├── travel/              travel-fund supporting photography
│       │   └── meta/                favicon + social-card assets
│       └── icons/                   reserved for shared inline SVGs
└── src/
    ├── data/                        SOURCE OF TRUTH for all site content
    │   ├── site.ts                  brand, nav, footer, pillars, stats
    │   ├── posts.ts                 journal entries
    │   ├── destinations.ts          PNW directory
    │   ├── gear.ts                  gear catalog
    │   ├── library.ts               library catalog
    │   ├── fj13.ts                  FJ13 rig profile
    │   └── resources.ts             trip-planning resources
    ├── env.d.ts
    └── pages/                       Astro-native route files
        ├── index.astro              /
        ├── 404.astro                /404.html
        └── pages/*.astro            /pages/pages/... routes
```

## How the site is wired

- Every page loads the same four stylesheets and boots `public/assets/js/main.js` via a path relative to that HTML file.

- `main.js` renders the shared **header** and **footer** into `<div data-site-header></div>` and `<div data-site-footer></div>` slots, so you only define the chrome in one place (`src/data/site.ts` + `public/assets/js/site.js`). If the site is ever served under a URL prefix, that prefix is derived automatically using `import.meta.url`.

- If a page sets `<body data-page="home">`, `main.js` dynamically imports `public/assets/js/pages/pages/home.js` and calls its `init()` function.

- Reveal-on-scroll is automatic for any element with the `reveal` class `prefers-reduced-motion` is respected.

## Editing content

### Nav, brand, footer, tagline

Edit `src/data/site.ts`.

### Add a journal entry

1. Copy an existing route under `src/pages/pages/journal/` (e.g.
   `src/pages/pages/journal/yeti-rambler-26oz-review.astro`).
2. Create your new route as `src/pages/pages/journal/new-trip.astro`.
3. Update the `<title>`, meta description, breadcrumbs, and body content.
4. Set `data-slug="new-trip"` on `<body>` (drives the "more posts" list).
5. Open `src/data/posts.ts` and prepend a new entry:

   ```ts
   {
     slug: "new-trip",
     title: "Your title",
     excerpt: "…",
     category: "Destination",
     tags: ["Hiking", "Volcano"],
     author: "freedomland",
     date: "2026-05-01",
     readMinutes: 7,
     image: "/assets/images/posts/new-trip-hero.jpg",
     imageAlt: "Describe the image.",
     url: "/pages/pages/journal/new-trip/",
   }
   ```

6. Drop the cover image into `public/assets/images/posts/`.

That's it — the entry now shows up on the home page, on `/pages/pages/explore/`,
and in the "more posts" row of every existing journal entry.

### Add a PNW destination

Open `src/data/destinations.ts` and push an entry under the right state.
Supported fields: `name`, `region`, `difficulty`, `managedBy`, `note`,
`planned` (boolean for "future trip" badge), and `post: "<slug>"` to
auto-link the destination name to a journal entry.

### Add a gear item

Open `src/data/gear.ts` and push into the right category's `items` array.
Each item supports `brand`, `name`, `image`, `imageAlt`, `blurb`, a
`details` array (rendered as bullet points), optional `review: "<slug>"`
(adds a "Read the review" button), and one or more `links`.

If a real photo isn't available, add a custom SVG to
`public/assets/images/gear/<slug>.svg` following the pattern already in that
folder (dark background gradient + ember accent geometry). The gear media
tile automatically switches SVGs to `object-fit: contain` with padding, so
illustrations read cleanly without cropping.

### Add new reference materials (Library)

Open `src/data/library.ts` and push into the right category's `items` array.
Each item supports:

| Field | Description |
|-------|-------------|
| `author` | Author name (displayed as category tag) |
| `name` | Book/title name (displayed as title) |
| `publisher` | Publisher name (displayed below title) |
| `image` | Path to cover image in `/assets/images/library/` |
| `imageAlt` | Alt text for the image |
| `blurb` | Short description of the item |
| `details` | Array of bullet points with additional info |
| `links` | Array of `{ label, href }` for buy/affiliate links |
| `review` | Optional slug to link to a journal review |

**Example item:**
```javascript
{
  author: "Author Name",
  name: "Book Title",
  publisher: "Publisher Name",
  image: "/assets/images/library/my-book.jpg",
  imageAlt: "Book cover description",
  blurb: "Short description of why this is recommended",
  details: [
    "Key detail 1",
    "Key detail 2",
    "Key detail 3"
  ],
  links: [{ label: "Buy on Amazon", href: "https://..." }]
}
```

**To add a new category:** Add a new object to `libraryCategories`:
```javascript
{
  id: "category-id",
  title: "Category Title",
  tag: "Short tagline",
  items: [
    // ... book items
  ]
}
```

**Images:** Drop cover images into `public/assets/images/library/` and reference by relative path.

### Update FJ13

Everything — specs, gallery, and upgrades — is in `src/data/fj13.ts`.

### Trip-planning resources

`src/data/resources.ts` exports two arrays: `planningKit` (grouped
planning cards with `title`, `lede`, `items`) and `fieldSignals` (the
Weather / Cell / Permits / Fire strip reused on Home and Resources). Add
an entry to either to make it appear everywhere it's used.

### Pillars and stats

`src/data/site.ts` also exports `pillars` (four editorial principles
rendered on Home and About) and `stats` (the "By the numbers" strip).
Update the copy or reorder the array and both pages follow automatically.

## Design system

All design tokens are in `public/assets/css/tokens.css`:

- Surfaces: `--bg-base`, `--bg-surface`, `--bg-elevated`
- Text: `--text-primary`, `--text-secondary`, `--text-muted`
- Accents: `--accent-ember` (FJ orange), `--accent-moss`, `--accent-sky`, `--accent-sand`
- Gradient: `--grad-sunrise`
- Type: `--font-display` (Fraunces), `--font-ui` (Manrope), `--font-mono` (Fira Code)
- Spacing: `--sp-1` … `--sp-10` on an 8 px baseline
- Radii, shadows, motion durations and easings

## Data build pipeline

All content data is authored as TypeScript in `src/data/*.ts`. Running `npm run build` automatically transpiles these files to browser-compatible JavaScript in `public/data/` via esbuild before the Astro build runs.

```bash
npm run build       # runs prebuild (data transpile) + astro build
npm run build:data  # regenerate public/data/*.js only
```

After a fresh clone, `npm install` runs the data build automatically via `postinstall`.

**Important:** Never edit `public/data/*.js` directly — those files are generated and will be overwritten on the next build.

## Deploy

- **Production URL**: [https://openatlas.wiki/](https://openatlas.wiki/) via `public/CNAME` and GitHub Pages **Custom domain** settings.
- **GitHub Actions**: `.github/workflows/deploy.yml` builds with `npm run build` and publishes `dist/`. Enable Pages once: **Settings → Pages → Build and deployment → GitHub Actions**, then under **Custom domain** enter `openatlas.wiki` and follow DNS instructions (when DNS is ready).
- **Canonical URLs**: `site` in `astro.config.mjs` plus `public/sitemap.xml`, `public/robots.txt`, and `og:image` tags should all stay aligned with the live hostname.
- **Other hosts**: run `npm run build` and upload the `dist/` directory (and copy `public/CNAME` if the host uses it).

No server-side runtime. No WordPress.
