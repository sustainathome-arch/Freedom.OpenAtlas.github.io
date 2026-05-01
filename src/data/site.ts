// Site-wide metadata. Edit this file to change the brand name, nav items,
// tagline, or copyright notice.

export interface SiteNavLink {
  label: string;
  href: string;
  cta?: boolean;
}

export interface SiteFooterLink {
  label: string;
  href: string;
}

export interface SiteFooterColumn {
  title: string;
  links: SiteFooterLink[];
}

export interface SitePillar {
  title: string;
  body: string;
  icon: string;
}

export interface SiteStat {
  value: string;
  label: string;
  note?: string;
}

export interface SiteConfig {
  brand: {
    name: string;
    tagline: string;
  };
  description: string;
  copyrightHolder: string;
  copyrightYear: number;
  nav: SiteNavLink[];
  footerColumns: SiteFooterColumn[];
  pillars: SitePillar[];
  stats: SiteStat[];
}

export const site: SiteConfig = {
  brand: { name: "Open Atlas", tagline: "The road is calling." },
  description:
    "Practical field notes, honest gear reviews, and real stories from the backroads of the Pacific Northwest, with FJ13 taking us there.",
  copyrightHolder: "Open Atlas",
  copyrightYear: 2026,
  nav: [
    { label: "Explore", href: "/pages/explore/" },
    { label: "About", href: "/pages/about/" },
    { label: "Pacific Northwest", href: "/pages/pacific-northwest/" },
    { label: "Our Gear", href: "/pages/our-gear/" },
    { label: "Library", href: "/pages/library/" },
    { label: "FJ13", href: "/pages/fj13/" },
    {
      label: "Fuel the Adventure",
      href: "/pages/fuel-the-adventure/",
      cta: true,
    },
  ],
  footerColumns: [
    {
      title: "Adventures",
      links: [
        { label: "Latest Journal", href: "/pages/explore/" },
        { label: "Pacific Northwest", href: "/pages/pacific-northwest/" },
        { label: "Our Gear", href: "/pages/our-gear/" },
        { label: "Trip Planning", href: "/pages/resources/" },
      ],
    },
    {
      title: "Rig",
      links: [
        { label: "Meet FJ13", href: "/pages/fj13/" },
        { label: "Fuel the Adventure", href: "/pages/fuel-the-adventure/" },
      ],
    },
    {
      title: "Project",
      links: [
        { label: "About Open Atlas", href: "/pages/about/" },
        { label: "Contact", href: "/pages/contact/" },
        { label: "Home", href: "/" },
      ],
    },
  ],
  pillars: [
    {
      title: "Destinations that matter",
      body: "Waterfalls, lava tubes, forest roads, and the quiet corners most maps gloss over. Our destinations are curated based on each of their unique qualities. You won't find any hyped up rants or raves about that side of the road tourist attraction.",
      icon: "map",
    },
    {
      title: "Gear we actually use",
      body: "Our gear reviews are informed by miles of trail, mud, condensation, and the occasional river dunk. We can't give you a true review until we try to break something or have to recover our favorite water container from the banks of the Rogue Gorge.",
      icon: "compass",
    },
    {
      title: "A rig, kept ready",
      body: "The FJ13 is the foundation of our explorations and how we get to the good stuff. Keeping it capable is half the work. We share the maintenance, repairs, and upgrades that keep it ready for the next adventure.",
      icon: "truck",
    },
    {
      title: "Leave it better",
      body: "We travel on public roadways and explore the best that our public lands have to offer. That means tread lightly, respect the access we have been granted, and pack it out, even if we didn't bring it in. The forests, rivers, trails, and caves belong to us all. We lead by example to keep these places ready to awe the next visitor just as much as it did for us.",
      icon: "leaf",
    },
  ],
  stats: [
    { value: "3", label: "States covered", note: "and counting" },
    { value: "20+", label: "Destinations in the directory" },
    { value: "8", label: "Categories of field-tested gear" },
    { value: "1", label: "Trail rig", note: "the FJ13" },
  ],
};
