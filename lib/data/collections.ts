import type { Collection } from "@/lib/types";

export const collections: Collection[] = [
  {
    slug: "saltwater-starter",
    title: "Saltwater Starter Kit",
    subtitle: "Everything you need for the flats and the surf",
    description:
      "A curated set of inshore lures, tough baits, and 100% lead-free weights and hooks to get you on redfish, trout, and snook without harming the water you fish.",
    heroSeed: "saltwater-starter-hero",
    productSlugs: [
      "reef-runner-topwater-popper",
      "eel-tail-bucktail-jig",
      "biocraft-scented-shrimp",
      "reef-anchor-bismuth-bank-sinkers",
      "cleanwater-circle-hooks",
      "sunguard-long-sleeve-upf50",
    ],
    waterType: "salt",
  },
  {
    slug: "freshwater-bass-box",
    title: "Freshwater Bass Box",
    subtitle: "Tournament-proven, lead-free bass essentials",
    description:
      "The lures, soft plastics, tungsten weights, and hooks our bass team relies on — all lead-free, all dialed for largemouth and smallmouth.",
    heroSeed: "freshwater-bass-hero",
    productSlugs: [
      "tidal-glide-swimbait",
      "marsh-minnow-soft-plastic",
      "live-match-crawfish",
      "ecocast-tungsten-worm-weights",
      "worm-hooks-ewg",
      "tideline-performance-hoodie",
    ],
    waterType: "fresh",
  },
  {
    slug: "lead-free-conversion",
    title: "The Lead-Free Conversion",
    subtitle: "Swap the toxic stuff in one click",
    description:
      "Replace every lead weight and old treble in your box with non-toxic, conservation-friendly gear that fishes as good or better.",
    heroSeed: "lead-free-hero",
    productSlugs: [
      "ecocast-tungsten-worm-weights",
      "puredrop-steel-egg-sinkers",
      "greenline-tin-split-shot",
      "cleanwater-circle-hooks",
      "treble-swap-inline-singles",
      "barbless-bait-hooks",
    ],
    waterType: "both",
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
