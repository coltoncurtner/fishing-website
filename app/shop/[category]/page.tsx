import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductsByCategory } from "@/lib/data/products";
import { CatalogView } from "@/components/commerce/CatalogView";
import { PageHero } from "@/components/ui/PageHero";
import { CATEGORY_LABELS } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";
import type { Category } from "@/lib/types";

const CATEGORY_COPY: Record<Category, { title: string; subtitle: string }> = {
  lures: {
    title: "Lures",
    subtitle:
      "Topwater, swimbaits, jerkbaits, and jigs engineered to trigger strikes — with lead-free weighting systems throughout.",
  },
  baits: {
    title: "Baits",
    subtitle:
      "Scented, durable, biodegradable soft baits that out-fish live bait on the toughest days.",
  },
  weights: {
    title: "Lead-Free Weights",
    subtitle:
      "Tungsten, tin, steel, and bismuth sinkers that cast better and protect the water. Zero lead, zero compromise.",
  },
  hooks: {
    title: "Hooks",
    subtitle:
      "Sticky-sharp circle, worm, and live-bait hooks with non-toxic finishes and conservation-friendly designs.",
  },
  apparel: {
    title: "Apparel",
    subtitle:
      "Sun-blocking, quick-drying performance gear in recycled fabrics — built for long days on the water.",
  },
};

export function generateStaticParams() {
  return Object.keys(CATEGORY_LABELS).map((category) => ({ category }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string };
}): Metadata {
  const copy = CATEGORY_COPY[params.category as Category];
  if (!copy) return {};
  return pageMetadata({
    title: copy.title,
    description: copy.subtitle,
    path: `/shop/${params.category}`,
  });
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const copy = CATEGORY_COPY[params.category as Category];
  const products = getProductsByCategory(params.category);
  if (!copy || products.length === 0) notFound();

  const isEco = params.category === "weights" || params.category === "hooks";

  return (
    <>
      <PageHero
        eyebrow={isEco ? "100% Lead-Free" : "Shop"}
        title={copy.title}
        subtitle={copy.subtitle}
        seed={`category-${params.category}`}
      />
      <div className="container-page py-12">
        <CatalogView products={products} />
      </div>
    </>
  );
}
