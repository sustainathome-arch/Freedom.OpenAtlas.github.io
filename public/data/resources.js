const planningKit = [
  {
    id: "route-tools",
    title: "Route tools we actually open",
    lede: "Paper maps, digital topos, and offline-first navigation \u2014 the apps that have saved us from ghost roads and washed-out shortcuts.",
    items: [
      {
        name: "Gaia GPS",
        kind: "Mobile + desktop",
        why: "Our primary planner. Layer USFS MVUM, NPS boundaries, and public-land ownership to spot legal camping before you drive."
      },
      {
        name: "USFS MVUM (Motor Vehicle Use Maps)",
        kind: "Free PDF",
        why: "Every National Forest publishes one. Downloadable, legally binding, and the truth on which roads are actually open to vehicles."
      },
      {
        name: "OnX Offroad",
        kind: "Mobile",
        why: "Better for trail-by-trail detail and user-contributed trail reports once you're in the backcountry."
      },
      {
        name: "NOAA + Windy",
        kind: "Web + mobile",
        why: "NOAA for the authoritative forecast, Windy for visualizing fronts, snow lines, and high-country wind."
      }
    ]
  },
  {
    id: "packing",
    title: "The always-pack list",
    lede: "Eleven things that live in the FJ13 whether or not we think we need them. Most weekends we don't \u2014 until we do.",
    items: [
      {
        name: "Paper map of the region",
        kind: "Redundancy",
        why: "Phones die. Satellites lose fix. Paper doesn't."
      },
      {
        name: "Headlamp + spare battery",
        kind: "Safety",
        why: "Sunset is non-negotiable. Setting up camp in the dark should be optional."
      },
      {
        name: "Water (2L + treatment)",
        kind: "Survival",
        why: "Two liters per person per day on any hike, plus a Sawyer Squeeze or tablets."
      },
      {
        name: "First-aid kit",
        kind: "Safety",
        why: "Tourniquet, pressure bandage, ibuprofen, blister tape, tweezers for ticks."
      },
      {
        name: "Recovery gear",
        kind: "Vehicle",
        why: "MAXTRAX, a proper strap, and shackles that are rated and inspected."
      },
      {
        name: "Tire plug kit + compressor",
        kind: "Vehicle",
        why: "Most trail tire failures are punctures, not blowouts. A plug gets you to pavement."
      },
      { name: "Knife + multitool", kind: "Everyday", why: "Leatherman Wave-style. Used daily." },
      {
        name: "Fire kit",
        kind: "Safety",
        why: "Lighter, Ferro rod, and fuel that doesn't care if it's wet."
      },
      {
        name: "Insulated layer",
        kind: "Clothing",
        why: "Alpine weather turns. Nano Puff lives in the passenger footwell."
      },
      {
        name: "Garbage bag",
        kind: "Ethic",
        why: "Yours and anyone else's. Trash out is non-optional."
      },
      {
        name: "Backup comms",
        kind: "Safety",
        why: "Handheld GPS with inReach, or a PLB. Check in when you park at the trailhead."
      }
    ]
  },
  {
    id: "seasons",
    title: "PNW seasons, honestly",
    lede: "Your calendar is the most important piece of trip planning in this region. A rough guide to when things open, close, and change.",
    items: [
      {
        name: "Late May \u2013 June",
        kind: "Spring",
        why: "Snow melts off most trailheads. High-alpine passes are still closed; waterfalls run hard. Best for coastal and low-elevation trips."
      },
      {
        name: "July \u2013 mid September",
        kind: "Summer",
        why: "The window. High country opens up. Cascades passes are in. Expect crowds at famous trailheads; start before 7 AM."
      },
      {
        name: "Late September \u2013 October",
        kind: "Shoulder",
        why: "Our favorite. Larches change, crowds thin, and the light is long and warm. Prepare for dawn frost above 4,000 ft."
      },
      {
        name: "November \u2013 April",
        kind: "Winter",
        why: "Most high-country roads close. Coast and high desert become the move. Chains are required in the Cascades. Caves stay ~55\xB0F year round."
      }
    ]
  },
  {
    id: "ethics",
    title: "Trail ethics we won't compromise",
    lede: "Public lands aren't a commodity. These are the seven rules of Leave No Trace, adapted for how we actually travel.",
    items: [
      {
        name: "Plan ahead and prepare",
        kind: "Principle 1",
        why: "Know the regulations and special concerns of the area you visit."
      },
      {
        name: "Travel and camp on durable surfaces",
        kind: "Principle 2",
        why: "Existing trails, existing campsites, established roads only."
      },
      {
        name: "Dispose of waste properly",
        kind: "Principle 3",
        why: "Pack it in, pack it out \u2014 and that includes toilet paper."
      },
      {
        name: "Leave what you find",
        kind: "Principle 4",
        why: "No rock stacks, no souvenirs, no digging for fossils."
      },
      {
        name: "Minimize campfire impacts",
        kind: "Principle 5",
        why: "Check current fire restrictions every trip; use a stove when in doubt."
      },
      {
        name: "Respect wildlife",
        kind: "Principle 6",
        why: "Watch from distance. Never feed. Store food in a bear-rated container when required."
      },
      {
        name: "Be considerate of other visitors",
        kind: "Principle 7",
        why: "Yield to uphill hikers, keep music out of shared nature, camp out of sight."
      }
    ]
  }
];
const fieldSignals = [
  { label: "Weather", value: "NOAA + Windy, checked the morning-of.", accent: "ember" },
  { label: "Cell service", value: "Assume none above 3,000 ft. Share your plan.", accent: "sand" },
  {
    label: "Permits",
    value: "NW Forest Pass or America the Beautiful; check park-specific timed entry.",
    accent: "moss"
  },
  {
    label: "Fire",
    value: "Always check the district's current Industrial Fire Precaution Level.",
    accent: "ember"
  }
];
export {
  fieldSignals,
  planningKit
};
