import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductImage } from "@/components/ui/ProductImage";
import { Badge, EcoBadge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { PriceTag } from "@/components/ui/PriceTag";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";

export function ProductCard({ product }: { product: Product }) {
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Link
        href={`/product/${product.slug}`}
        className="relative block"
        aria-label={product.name}
      >
        <ProductImage
          seed={product.images[0]?.seed ?? product.slug}
          alt={product.name}
          category={product.category}
          className="aspect-square w-full"
        />
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.eco.leadFree && product.category !== "apparel" && (
            <EcoBadge label="Lead-Free" />
          )}
          {product.isNew && <Badge tone="new">New</Badge>}
          {onSale && <Badge tone="sale">Sale</Badge>}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-display text-sm font-bold leading-snug text-deep transition group-hover:text-tide">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-1 text-xs text-ink/55">
          {product.tagline}
        </p>
        <div className="mt-2">
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        </div>

        <div className="mt-3 flex items-end justify-between gap-2 pt-1">
          <PriceTag
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            size="sm"
          />
        </div>

        <div className="mt-3">
          <AddToCartButton
            product={product}
            variant={product.variants[0]}
            size="sm"
            full
            label="Quick Add"
          />
        </div>
      </div>
    </div>
  );
}
