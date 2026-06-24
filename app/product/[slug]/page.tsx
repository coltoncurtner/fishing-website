import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getProduct, getRelated, products } from "@/lib/data/products";
import { ProductDetail } from "@/components/commerce/ProductDetail";
import { ProductRail } from "@/components/commerce/ProductRail";
import { CATEGORY_LABELS } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";
import { brand } from "@/lib/brand";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  return pageMetadata({
    title: product.name,
    description: product.tagline + " " + product.description.slice(0, 120),
    path: `/product/${product.slug}`,
  });
}

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = getRelated(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: CATEGORY_LABELS[product.category],
    brand: { "@type": "Brand", name: brand.name },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: "USD",
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb */}
      <nav
        className="container-page flex items-center gap-1 pt-6 text-sm text-ink/55"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-deep">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/shop/${product.category}`} className="hover:text-deep">
          {CATEGORY_LABELS[product.category]}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-deep">{product.name}</span>
      </nav>

      <ProductDetail product={product} />

      <ProductRail
        eyebrow="Pairs well with"
        title="Complete your setup"
        products={related}
      />

      {/* spacer so mobile sticky bar doesn't cover the footer */}
      <div className="h-20 lg:hidden" />
    </>
  );
}
