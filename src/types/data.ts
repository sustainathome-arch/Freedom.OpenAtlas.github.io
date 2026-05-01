// Destination data types
export interface Destination {
  name: string;
  location: string;
  region?: string;
  difficulty?: string;
  agency?: string;
  post?: string;
  planned?: boolean;
}

export interface StateGroup {
  state: string;
  tagline: string;
  destinations: Destination[];
}

// Gear data types
export interface GearLink {
  label: string;
  href: string;
}

export interface GearItem {
  brand: string;
  name: string;
  image: string;
  imageAlt: string;
  blurb: string;
  details?: string[];
  review?: string;
  links?: GearLink[];
}

export interface GearCategory {
  id: string;
  title: string;
  tag: string;
  items: GearItem[];
}

// Post data types (for src/data/posts.ts)
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

// Library data types
export interface LibraryLink {
  label: string;
  href: string;
}

export interface LibraryItem {
  author?: string;
  name: string;
  publisher?: string;
  image: string;
  imageAlt: string;
  blurb: string;
  details?: string[];
  links?: LibraryLink[];
}

export interface LibraryCategory {
  id: string;
  title: string;
  tag: string;
  items: LibraryItem[];
}

// Resources data types
export interface PlanningKitItem {
  name: string;
  kind: string;
  why: string;
}

export interface PlanningKitGroup {
  id: string;
  title: string;
  lede: string;
  items: PlanningKitItem[];
}

export interface FieldSignal {
  label: string;
  value: string;
  accent?: string;
}

// FJ13 data types
export interface FJ13GalleryImage {
  src: string;
  alt: string;
}

export interface FJ13Spec {
  label: string;
  value: string;
}

export interface FJ13Upgrade {
  title: string;
  status: string;
  body: string;
}

export interface FJ13Config {
  name: string;
  subtitle: string;
  acquired: string;
  purpose: string;
  gallery: FJ13GalleryImage[];
  specs: FJ13Spec[];
  upgrades: FJ13Upgrade[];
}

// Site data types
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
