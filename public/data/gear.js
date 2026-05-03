// Gear catalog, grouped by category. Each item can include an optional
// `review` (slug of a journal post) and `links` for affiliate URLs. When
// you add a new item, drop a photo into `/assets/images/gear/` and
// reference it by relative path.

export const gearCategories = [
  {
    id: "vision",
    title: "Vision",
    tag: "See it clearly",
    items: [
      {
        brand: "Columbia Outfitters",
        name: "C3057 Titanium Frames",
        image: "/assets/images/gear/columbia-frames.jpg",
        imageAlt: "Columbia Outfitters C3057 titanium eyeglass frames.",
        blurb:
          "For the avid adventurer who needs frames that hold up to the moisture of the underground and the high winds of the summit — comfortable, durable, and forgettable in the best way.",
        details: [
          "Titanium alloy frame, spring-hinge temples.",
          "Weight: featherweight under a headlamp strap.",
          "Finish holds up to sweat, rain, and the occasional slot-canyon scrape.",
        ],
        links: [{ label: "Affiliate link", href: "https://amzn.to/41PP4KR" }],
      },
    ],
  },
  {
    id: "hydration",
    title: "Hydration",
    tag: "Keep drinking",
    items: [
      {
        brand: "YETI",
        name: "Rambler Trio — 30 oz Tumbler, 10 oz Mug, 26 oz Bottle",
        image: "/assets/images/gear/yeti-trio.jpg",
        imageAlt: "YETI Rambler trio — tumbler, mug, and bottle.",
        blurb:
          "We found the best way to match consistency and utility during our travels with YETI. From coffee before hitting the trail to staying hydrated on steep ascents, the Rambler lineup covers every leg of the day.",
        details: [
          "Double-wall vacuum insulation across the set.",
          "DuraCoat finish resists chips and scuffs.",
          "Dishwasher safe — a rarity at this build quality.",
        ],
        review: "yeti-rambler-26oz-review",
        links: [
          { label: "Buy Tumbler on Amazon", href: "https://amzn.to/3QtNKe8" },
          { label: "Buy Mug on Amazon", href: "https://amzn.to/4mQcPvH" },
          { label: "Buy Bottle on Amazon", href: "https://amzn.to/4tydkNy" },
        ],
      },
    ],
  },
  {
    id: "coffee",
    title: "Coffee",
    tag: "First task of the day",
    items: [
      {
        brand: "Stanley",
        name: "Classic 48 oz French Press",
        image: "/assets/images/gear/stanley-french-press.jpg",
        imageAlt:
          "A scuffed Stanley classic 48 oz French press on a camp table.",
        blurb:
          "Don't let its beat-up appearance fool you. Coffee is the first task of any successful day of outdoor exploration, and the Stanley French Press has come to our rescue to simplify the morning routine.",
        details: [
          "18/8 stainless steel — survives tailgate drops and bear-box jostles.",
          "Insulated walls keep the second cup hot 30 min later.",
          "Big enough for two, small enough to pack every trip.",
        ],
        links: [{ label: "Affiliate link", href: "https://amzn.to/48ipCRN" }],
      },
    ],
  },
  {
    id: "shelter",
    title: "Shelter & Sleep",
    tag: "Leave the ground behind",
    items: [
      {
        brand: "Eagle's Nest Outfitters (ENO)",
        name: "OneLink Hammock System",
        image: "/assets/images/gear/eno-hammock.svg",
        imageAlt: "Illustration of a hammock slung between two trees at dusk.",
        blurb:
          "Tents are so overrated. Poles, footprints, rain fly, stakes — give yourself a break. The OneLink system from ENO is lightweight, easy to pack, and rocks you to sleep off the ground.",
        details: [
          "Integrated hammock, straps, bug net, and rain tarp.",
          "Pack weight in the low four-pound range.",
          "Shoulder sling carries; sets up in under five minutes at camp.",
        ],
        links: [{ label: "Affiliate link", href: "https://amzn.to/496g1xC" }],
      },
    ],
  },
  {
    id: "clothing-packs",
    title: "Clothing & Packs",
    tag: "Layer, pack, repeat",
    items: [],
  },
  {
    id: "technology",
    title: "Technology",
    tag: "Navigate and capture",
    items: [
      {
        brand: "Garmin",
        name: "Montana 710i Handheld GPS",
        image: "/assets/images/gear/garmin-montana.svg",
        imageAlt: "Illustration of a rugged handheld GPS device.",
        blurb:
          "This handheld GPS gives us the best of both worlds. A large touch display improves trail planning and tracking accuracy, and with the suction mount it doubles as a basic automotive navigator.",
        details: [
          "inReach two-way satellite messaging + SOS.",
          "Preloaded TopoActive maps; expandable via microSD.",
          "Mounts to the FJ13's windshield with the suction kit.",
        ],
        links: [
          { label: "Buy Montana 710i on Amazon", href: "https://amzn.to/4mQdRrz" },
        ],
      },
      {
        brand: "Garmin",
        name: "Suction Cup Mount for Montana 710i Handheld GPS",
        image: "/assets/images/gear/garmin-montana.svg",
        imageAlt: "Illustration of a rugged handheld GPS device.",
        blurb:
          "This handheld GPS gives us the best of both worlds. A large touch display improves trail planning and tracking accuracy, and with the suction mount it doubles as a basic automotive navigator.",
        details: [
          "inReach two-way satellite messaging + SOS.",
          "Preloaded TopoActive maps; expandable via microSD.",
          "Mounts to the FJ13's windshield with the suction kit.",
        ],
        links: [
          { label: "Buy Suction Cup Mount on Amazon", href: "https://amzn.to/48ivTwP" },
        ],
      },
      {
        brand: "Garmin",
        name: "Instinct Esports Edition GPS Smartwatch",
        image: "/assets/images/gear/garmin-instinct.svg",
        imageAlt: "Illustration of a rugged GPS smartwatch on a trail face.",
        blurb:
          "A rugged GPS smartwatch that tracks trails as easily as it tracks sleep — our everyday piece on and off the trail.",
        details: [
          "Solar charging extends battery on multi-day trips.",
          "Barometric altimeter + compass for quick orientation.",
          "10 ATM water rating for rivers and rainstorms.",
        ],
        links: [{ label: "Affiliate link", href: "https://amzn.to/4t0V3HL" }],
      },
    ],
  },
  {
    id: "FJ13",
    title: "Overlanding in the FJ13",
    tag: "Get out there and stay out there",
    items: [],
  },
];

// Useful for gear-item template to render category descriptions on pages.
export const gearDisclosure =
  "Some links on this page are affiliate links. If you click through and buy something we recommend, Open Atlas may earn a small commission at no extra cost to you. We only recommend gear we actually carry and use on the trail.";
