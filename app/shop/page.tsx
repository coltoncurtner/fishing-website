import type { Metadata } from "next";
import { products } from "@/lib/data/products";
import { CatalogView } from "@/components/commerce/CatalogView";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Shop All Tackle",
  description:
    "Shop the full Salt & Stream lineup of lead-free lures, baits, weights, hooks, and performance apparel for salt and freshwater.",
  path: "/shop",
});

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="The full lineup"
        subtitle="Every lure, bait, weight, hook, and layer we make — all lead-free, all built to out-fish the old stuff."
        seed="shop-all"
      />
      <div className="container-page py-12">
        <CatalogView products={products} showCategoryFilter />
      </div>
    </>
  );
}
