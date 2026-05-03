/// <reference types="astro/client" />

// Content Collections types
import type { CollectionEntry } from "astro:content";

// Journal collection type
type JournalEntry = CollectionEntry<"journal">;

// Global data file declarations
declare const site: import("./types/data").SiteConfig;
declare const destinationsByState: Array<{
  state: string;
  destinations: import("./types/data").Destination[];
}>;
declare const flatDestinations: () => import("./types/data").Destination[];
declare const gearCategories: import("./types/data").GearCategory[];
declare const libraryCategories: Array<{
  id: string;
  label: string;
  items: import("./types/data").LibraryItem[];
}>;
declare const posts: import("./types/data").Post[];
declare const postsByTag: (tag: string) => import("./types/data").Post[];
declare const postsByCategory: (category: string) => import("./types/data").Post[];
declare const planningKit: import("./types/data").PlanningKitItem[];
declare const fieldSignals: import("./types/data").GearItem[];
declare const fj13: {
  title: string;
  subtitle: string;
  heroImage: string;
  heroAlt: string;
  gallery: Array<{ src: string; alt: string }>;
  specs: import("./types/data").FJ13Spec[];
  upgrades: import("./types/data").FJ13Upgrade[];
};

// Google Tag Manager dataLayer
declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown> | unknown[]>;
    gtag: (...args: unknown[]) => void;
  }
}
declare const dataLayer: Array<Record<string, unknown> | unknown[]>;

// Google Analytics gtag function
declare const gtag: (...args: unknown[]) => void;
