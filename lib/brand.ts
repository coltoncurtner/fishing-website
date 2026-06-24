/**
 * Single source of truth for brand identity.
 * Rename the store, change taglines, contact info, and social links here.
 */
export const brand = {
  name: "Salt & Stream",
  shortName: "S&S",
  tagline: "Tackle that's good for the catch — and the water.",
  description:
    "Premium lead-free, non-toxic fishing tackle for salt and freshwater anglers. Lures, baits, weights, hooks, and apparel that protect the fish and the water you love.",
  url: "https://saltandstream.example.com",
  email: "hello@saltandstream.com",
  phone: "1-800-555-CAST",
  freeShippingThreshold: 75,
  social: {
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
  },
  mission:
    "Every weight and hook we make is lead-free and non-toxic — better for the fish, cleaner for the water, and built to out-fish the old stuff.",
} as const;

export type Brand = typeof brand;
