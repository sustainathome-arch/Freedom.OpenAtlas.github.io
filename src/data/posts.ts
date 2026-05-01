// Journal entries. To add a new post:
//   1. Create `src/content/journal/<slug>.md` (use an existing post as a template).
//   2. Append a new entry to this array with the same `slug`.
//   3. Drop a cover image into `assets/images/posts/`.

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  image: string;
  imageAlt: string;
  url: string;
  readMinutes: number;
}

export const posts: Post[] = [
  {
    slug: "yeti-rambler-26oz-review",
    title: "YETI Rambler 26oz Water Bottle: Full Review, Pros, Cons, and Specs",
    excerpt:
      "The 26 oz Rambler pairs double-wall insulation with a rugged DuraCoat finish that has survived pavement drops, volcanic rock, and a dunk in the McKenzie.",
    category: "Gear Review",
    tags: ["Gear Review", "Yeti", "Hydration"],
    author: "freedomland",
    date: "2026-04-23",
    image: "/assets/images/gear/yeti-trio.jpg",
    imageAlt: "YETI Rambler trio — tumbler, stackable mug, and water bottle.",
    url: "/pages/journal/yeti-rambler-26oz-review/",
    readMinutes: 7,
  },
  {
    slug: "lava-beds-national-monument",
    title: "Lava Beds National Monument",
    excerpt:
      "Sharp lava, hidden caves, and wide open high desert shaped by the Medicine Lake volcano — with human history layered from Native rock art to the Modoc War.",
    category: "Destination",
    tags: ["Caving", "Hiking", "National Park Service", "Volcano", "California"],
    author: "freedomland",
    date: "2026-04-18",
    image: "/assets/images/posts/lava-beds-hero.jpg",
    imageAlt: "Visitor center at Lava Beds National Monument under a winter sky.",
    url: "/pages/journal/lava-beds-national-monument/",
    readMinutes: 11,
  },
  {
    slug: "tamolitch-falls-blue-pool",
    title: "Tamolitch Falls (Blue Pool)",
    excerpt:
      "A turquoise pool on the McKenzie River, fed by water that vanishes into an ancient lava flow and resurfaces through porous basalt at 37°F.",
    category: "Destination",
    tags: ["Hiking", "Hiking Trails", "US Forest Service", "Volcano", "Oregon"],
    author: "freedomland",
    date: "2026-04-17",
    image: "/assets/images/posts/tamolitch-hero.jpg",
    imageAlt: "The turquoise Blue Pool at Tamolitch Falls.",
    url: "/pages/journal/tamolitch-falls-blue-pool/",
    readMinutes: 9,
  },
  {
    slug: "valentine-cave-lava-beds",
    title: "Valentine Cave: An Easy Walk into a Lava Tube",
    excerpt:
      "A well-preserved lava tube at Lava Beds that rewards a quiet walk — cool air, smooth lavacicles, and a clear path where most visitors turn back after 200 feet.",
    category: "Field Notes",
    tags: ["Caving", "Lava Beds", "National Park Service", "California"],
    author: "freedomland",
    date: "2026-04-16",
    image: "/assets/images/posts/valentine-featured.jpg",
    imageAlt: "Valentine Cave entrance staircase descending into cool shadow.",
    url: "/pages/journal/valentine-cave-lava-beds/",
    readMinutes: 6,
  },
  {
    slug: "lassen-volcanic-national-park",
    title: "Lassen Volcanic: Emerald Lake, Lake Helen, and the Hydrothermal Basins",
    excerpt:
      "An overlooked National Park where a shield volcano, a plug dome, a strato, and a cinder cone sit in the same skyline — and where spring sun on alpine meltwater turns Emerald Lake unreal.",
    category: "Destination",
    tags: ["Hiking", "National Park Service", "Volcano", "California"],
    author: "freedomland",
    date: "2026-04-10",
    image: "/assets/images/travel/emerald-lake.jpg",
    imageAlt: "Emerald Lake at Lassen Volcanic, ringed by snowmelt and pine.",
    url: "/pages/journal/lassen-volcanic-national-park/",
    readMinutes: 10,
  },
  {
    slug: "oregon-coast-101-highlights",
    title: "Oregon Coast 101: Hug Point, Cape Meares, and Why You Slow Down",
    excerpt:
      "A quiet weekend tracing Highway 101 — low-tide arches at Hug Point, the crooked Sitka spruce on Cape Meares, and the slow rhythm of running the coast on FJ time.",
    category: "Destination",
    tags: ["Coast", "Oregon", "Overlanding", "Road Trip"],
    author: "freedomland",
    date: "2026-04-05",
    image: "/assets/images/travel/support-hug-point.jpg",
    imageAlt: "Hug Point sea arch on the Oregon coast at low tide.",
    url: "/pages/journal/oregon-coast-101-highlights/",
    readMinutes: 8,
  },
];

export function getPostBySlug(slug: string): Post | null {
  return posts.find((p) => p.slug === slug) ?? null;
}

export function getOtherPosts(slug: string, limit = 3): Post[] {
  return posts.filter((p) => p.slug !== slug).slice(0, limit);
}

export function postsByTag(tag: string): Post[] {
  const t = tag.toLowerCase();
  return posts.filter((p) => (p.tags ?? []).some((x) => x.toLowerCase() === t));
}

export function latestPosts(limit = 3): Post[] {
  return posts
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit);
}

export function postsByCategory(category: string): Post[] {
  return posts.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}
