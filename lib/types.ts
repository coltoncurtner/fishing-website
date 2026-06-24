export type Category = "lures" | "baits" | "weights" | "hooks" | "apparel";

export type WaterType = "salt" | "fresh" | "both";

export interface EcoInfo {
  leadFree: boolean;
  nonToxic: boolean;
  recyclable: boolean;
  notes: string;
}

export interface Variant {
  id: string;
  /** e.g. "Size", "Color", "Weight" */
  label: string;
  /** e.g. "1/4 oz", "Chartreuse", "L" */
  value: string;
  priceDelta?: number;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  /** Short, punchy one-liner for cards. */
  tagline: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  memberPrice?: number;
  /** Branded placeholder swatches; swap for real photo URLs later. */
  images: ProductImage[];
  variants: Variant[];
  rating: number;
  reviewCount: number;
  waterType: WaterType;
  species: string[];
  eco: EcoInfo;
  badges: string[];
  stock: number;
  isBestSeller: boolean;
  isNew?: boolean;
}

export interface ProductImage {
  /** Used to generate a deterministic branded gradient placeholder. */
  seed: string;
  alt: string;
}

export interface MembershipTier {
  id: string;
  name: string;
  blurb: string;
  monthlyPrice: number;
  annualPrice: number;
  /** Discount applied to member pricing, as a fraction (0.1 = 10%). */
  memberDiscount: number;
  perks: string[];
  waterFocus: WaterType;
  highlighted: boolean;
}

export interface Collection {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  heroSeed: string;
  /** Product slugs included in this curated collection. */
  productSlugs: string[];
  waterType: WaterType;
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  rating: number;
  product?: string;
}
