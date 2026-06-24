/** Tiny classnames helper (no dependency needed). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

/**
 * Deterministic branded gradient + accent derived from a string seed.
 * Lets us render premium-feeling placeholder imagery without real photos.
 */
export function seededGradient(seed: string): {
  from: string;
  to: string;
  accent: string;
} {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  const palettes = [
    { from: "#0B3D45", to: "#1E6E7A", accent: "#3FA34D" },
    { from: "#08323A", to: "#2E7D39", accent: "#5CC06B" },
    { from: "#103A44", to: "#3A8E9B", accent: "#E9E1D2" },
    { from: "#0E2F36", to: "#1E6E7A", accent: "#5CC06B" },
    { from: "#0B3D45", to: "#2E7D39", accent: "#E9E1D2" },
  ];
  return palettes[Math.abs(h) % palettes.length];
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const CATEGORY_LABELS: Record<string, string> = {
  lures: "Lures",
  baits: "Baits",
  weights: "Weights",
  hooks: "Hooks",
  apparel: "Apparel",
};
