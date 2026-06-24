import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { collections, getCollection } from "@/lib/data/collections";
import { getProduct } from "@/lib/data/products";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";
import type { Product } from "@/lib/types";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const collection = getCollection(params.slug);
  if (!collection) return {};
  return pageMetadata({
    title: collection.title,
    description: collection.description,
    path: `/collections/${collection.slug}`,
  });
}

export default function CollectionPage({
  params,
}: {
  params: { slug: string };
}) {
  const collection = getCollection(params.slug);
  if (!collection) notFound();

  const products = collection.productSlugs
    .map((slug) => getProduct(slug))
    .filter((p): p is Product => Boolean(p));

  return (
    <>
      <PageHero
        eyebrow={collection.subtitle}
        title={collection.title}
        subtitle={collection.description}
        seed={collection.heroSeed}
      />
      <div className="container-page py-12">
        <ProductGrid products={products} />
      </div>
    </>
  );
}
