import type { MetadataRoute } from "next";
import { products } from "@/lib/data/products";
import { collections } from "@/lib/data/collections";
import { brand } from "@/lib/brand";
import { CATEGORY_LABELS } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = brand.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/shop",
    "/pro-club",
    "/eco",
    "/about",
    "/contact",
    "/cart",
    "/legal/shipping",
    "/legal/returns",
    "/legal/privacy",
    "/legal/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const categoryRoutes = Object.keys(CATEGORY_LABELS).map((c) => ({
    url: `${base}/shop/${c}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/product/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const collectionRoutes = collections.map((c) => ({
    url: `${base}/collections/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...collectionRoutes,
    ...productRoutes,
  ];
}
