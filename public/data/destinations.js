// Pacific Northwest directory. Grouped by state. To add a destination, push
// an entry under the appropriate state. If the destination has a journal
// entry, set `post` to its slug to auto-link it.

export const destinationsByState = [
  {
    state: "Oregon",
    tagline:
      "Old-growth forests, volcanic high desert, and a coast that refuses to be boring.",
    destinations: [
      {
        name: "Tamolitch Falls (Blue Pool)",
        location: "National Forest Road 2672-655, McKenzie Bridge, OR 97413",
        region: "Central Cascades",
        difficulty: "Moderate",
        agency: "US Forest Service",
        post: "tamolitch-falls-blue-pool",
      },
      {
        name: "Hug Point State Recreation Site",
        location: "US-101, Arch Cape, OR 97102",
        region: "North Coast",
        difficulty: "Easy",
        agency: "Oregon Parks & Recreation",
        post: "oregon-coast-101-highlights",
      },
      {
        name: "Cape Meares State Scenic Viewpoint",
        location: "Cape Meares Lighthouse Dr, Tillamook, OR 97141",
        region: "North Coast",
        difficulty: "Easy",
        agency: "Oregon Parks & Recreation",
        post: "oregon-coast-101-highlights",
      },
      {
        name: "Mount Hood National Forest — Timberline",
        location: "27500 E Timberline Rd, Government Camp, OR 97028",
        region: "Cascade Range",
        difficulty: "Variable",
        agency: "US Forest Service",
      },
      {
        name: "Smith Rock State Park",
        location: "9241 NE Crooked River Dr, Terrebonne, OR 97760",
        region: "High Desert",
        difficulty: "Strenuous (Misery Ridge)",
        agency: "Oregon Parks & Recreation",
      },
      {
        name: "Crater Lake National Park",
        location: "Crater Lake, OR 97604",
        region: "Southern Cascades",
        difficulty: "Variable",
        agency: "National Park Service",
      },
      {
        name: "Painted Hills Unit, John Day Fossil Beds",
        location: "Bear Creek Rd, Mitchell, OR 97750",
        region: "High Desert",
        difficulty: "Easy",
        agency: "National Park Service",
      },
      {
        name: "Briggs Creek Dispersed Camping",
        location: "Rogue River-Siskiyou NF, OR",
        region: "Siskiyous",
        difficulty: "Drive: rough; hike: easy",
        agency: "US Forest Service",
      },
    ],
  },
  {
    state: "Washington",
    tagline:
      "Alpine passes, temperate rainforest, and miles of wild coast.",
    destinations: [
      {
        name: "Hoh Rainforest, Olympic National Park",
        location: "18113 Upper Hoh Rd, Forks, WA 98331",
        region: "Olympic Peninsula",
        difficulty: "Easy (Hall of Mosses)",
        agency: "National Park Service",
      },
      {
        name: "Paradise at Mount Rainier",
        location: "Paradise Inn Rd, Ashford, WA 98304",
        region: "Cascade Range",
        difficulty: "Moderate",
        agency: "National Park Service",
      },
      {
        name: "Ape Cave Lava Tube, Gifford Pinchot NF",
        location: "FR 8303, Cougar, WA 98616",
        region: "Mt. St. Helens",
        difficulty: "Moderate (lower) / Strenuous (upper)",
        agency: "US Forest Service",
      },
      {
        name: "North Cascades Highway (SR-20)",
        location: "Marblemount to Winthrop, WA",
        region: "North Cascades",
        difficulty: "Drive: easy; hikes: variable",
        agency: "National Park Service / WSDOT",
      },
      {
        name: "Ruby Beach, Olympic National Park",
        location: "US-101, Forks, WA 98331",
        region: "Pacific Coast",
        difficulty: "Easy",
        agency: "National Park Service",
      },
    ],
  },
  {
    state: "California",
    tagline:
      "Northern California's volcanic heartland is closer to the PNW than the map suggests.",
    destinations: [
      {
        name: "Lava Beds National Monument",
        location: "1 Indian Well, Tulelake, CA 96134",
        region: "Medicine Lake Volcano",
        difficulty: "Variable",
        agency: "National Park Service",
        post: "lava-beds-national-monument",
      },
      {
        name: "Valentine Cave",
        location: "Lava Beds National Monument, Tulelake, CA 96134",
        region: "Medicine Lake Volcano",
        difficulty: "Easy",
        agency: "National Park Service",
        post: "valentine-cave-lava-beds",
      },
      {
        name: "Lassen Volcanic National Park",
        location: "21820 Lassen National Park Hwy, Mineral, CA 96063",
        region: "Southern Cascades",
        difficulty: "Variable",
        agency: "National Park Service",
        post: "lassen-volcanic-national-park",
      },
      {
        name: "Emerald Lake Overlook",
        location: "Lassen Park Hwy, Mineral, CA 96063",
        region: "Southern Cascades",
        difficulty: "Easy roadside pullout",
        agency: "National Park Service",
        post: "lassen-volcanic-national-park",
      },
      {
        name: "Bumpass Hell Hydrothermal Area",
        location: "Lassen Volcanic NP, CA",
        region: "Southern Cascades",
        difficulty: "Moderate (3 mi out-and-back)",
        agency: "National Park Service",
      },
      {
        name: "Lake Tahoe — Emerald Bay State Park",
        location: "138 Emerald Bay Rd, South Lake Tahoe, CA 96150",
        region: "Sierra Nevada",
        difficulty: "Moderate",
        agency: "California State Parks",
      },
    ],
  },
  {
    state: "Alaska",
    tagline:
      "The long route north — a multi-year roadmap for when the rig and the crew are ready.",
    destinations: [
      {
        name: "Dalton Highway (Prudhoe Bay Route)",
        location: "AK-11, Livengood to Deadhorse, AK",
        region: "Arctic",
        difficulty: "Expedition",
        agency: "Alaska DOT",
        planned: true,
      },
      {
        name: "Denali National Park & Preserve",
        location: "Mile 237 AK-3, Denali Park, AK 99755",
        region: "Interior",
        difficulty: "Variable",
        agency: "National Park Service",
        planned: true,
      },
      {
        name: "Kenai Fjords National Park",
        location: "Seward, AK 99664",
        region: "South-central",
        difficulty: "Variable",
        agency: "National Park Service",
        planned: true,
      },
    ],
  },
];

// Flat list helper for the home page "region map".
export function flatDestinations() {
  return destinationsByState.flatMap((g) =>
    g.destinations.map((d) => ({ ...d, state: g.state })),
  );
}
