"use client";

import { useMemo, useState } from "react";
import {
  Leaf,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  ShoppingBag,
} from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductImage } from "@/components/ui/ProductImage";
import { Badge, EcoBadge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { QuantityStepper } from "@/components/commerce/QuantityStepper";
import { useCart, memberDiscountFor } from "@/lib/cart-store";
import { formatPrice, cn } from "@/lib/utils";
import { brand } from "@/lib/brand";

export function ProductDetail({ product }: { product: Product }) {
  const [activeImg, setActiveImg] = useState(0);
  const [variantIdx, setVariantIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const addItem = useCart((s) => s.addItem);
  const tierId = useCart((s) => s.membershipTierId);
  const discount = memberDiscountFor(tierId);

  const variant = product.variants[variantIdx];
  const unitPrice = product.price + (variant?.priceDelta ?? 0);
  const memberPrice = unitPrice * (1 - (discount || 0.15));
  const isMember = discount > 0;
  const onSale =
    product.compareAtPrice && product.compareAtPrice > product.price;

  const lowStock = useMemo(
    () => (variant ? variant.stock <= 10 : product.stock <= 10),
    [variant, product.stock],
  );

  function handleAdd() {
    addItem(
      {
        key: `${product.id}-${variant?.id ?? "default"}`,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        imageSeed: product.images[0]?.seed ?? product.slug,
        unitPrice,
        variantLabel: variant
          ? `${variant.label}: ${variant.value}`
          : undefined,
      },
      qty,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <>
      <div className="container-page grid gap-10 py-10 lg:grid-cols-2 lg:py-14">
        {/* Gallery */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ProductImage
            seed={product.images[activeImg]?.seed ?? product.slug}
            alt={product.images[activeImg]?.alt ?? product.name}
            category={product.category}
            className="aspect-square w-full rounded-2xl shadow-card"
            priority
          />
          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.images.map((img, i) => (
              <button
                key={img.seed}
                onClick={() => setActiveImg(i)}
                className={cn(
                  "overflow-hidden rounded-xl ring-2 transition",
                  i === activeImg ? "ring-deep" : "ring-transparent",
                )}
                aria-label={`View image ${i + 1}`}
              >
                <ProductImage
                  seed={img.seed}
                  alt={img.alt}
                  category={product.category}
                  className="aspect-square w-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Buy box */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {product.eco.leadFree && product.category !== "apparel" && (
              <EcoBadge label="100% Lead-Free" />
            )}
            {product.badges.slice(0, 2).map((b) => (
              <Badge key={b} tone="dark">
                {b}
              </Badge>
            ))}
          </div>

          <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight text-deep sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-lg text-ink/70">{product.tagline}</p>

          <div className="mt-3">
            <StarRating
              rating={product.rating}
              reviewCount={product.reviewCount}
              size="md"
            />
          </div>

          {/* Price */}
          <div className="mt-5 flex items-end gap-3">
            <span className="font-display text-4xl font-bold text-deep">
              {formatPrice(isMember ? memberPrice : unitPrice)}
            </span>
            {onSale && !isMember && (
              <span className="pb-1 text-lg text-ink/40 line-through">
                {formatPrice(product.compareAtPrice!)}
              </span>
            )}
            {isMember && (
              <span className="pb-1 text-lg text-ink/40 line-through">
                {formatPrice(unitPrice)}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-tide">
            {isMember
              ? "Pro Club price applied"
              : `${formatPrice(memberPrice)} with Pro Club membership`}
          </p>

          {/* Variants */}
          {product.variants.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-bold text-deep">
                {product.variants[0].label}:{" "}
                <span className="font-medium text-ink/70">
                  {variant?.value}
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => setVariantIdx(i)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-semibold transition",
                      i === variantIdx
                        ? "border-deep bg-deep text-white"
                        : "border-sand text-deep hover:border-tide",
                    )}
                  >
                    {v.value}
                    {v.priceDelta ? (
                      <span className="ml-1 text-xs opacity-70">
                        +{formatPrice(v.priceDelta)}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Qty + Add to cart */}
          <div className="mt-6 flex items-center gap-3">
            <QuantityStepper value={qty} onChange={setQty} />
            <button
              onClick={handleAdd}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-kelp px-6 font-semibold text-white shadow-card transition-all hover:bg-kelp-dark hover:shadow-lift active:scale-[0.99]"
            >
              {added ? (
                <>
                  <Check className="h-5 w-5" /> Added to cart
                </>
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5" /> Add to Cart ·{" "}
                  {formatPrice((isMember ? memberPrice : unitPrice) * qty)}
                </>
              )}
            </button>
          </div>

          {lowStock && (
            <p className="mt-3 text-sm font-semibold text-amber-600">
              ⚡ Only a few left — selling fast
            </p>
          )}

          {/* Trust row */}
          <div className="mt-6 grid grid-cols-3 gap-3 border-y border-sand py-4 text-center">
            <Trust icon={<Truck className="h-5 w-5" />}>
              Free shipping
              <br />
              over ${brand.freeShippingThreshold}
            </Trust>
            <Trust icon={<RotateCcw className="h-5 w-5" />}>
              30-day
              <br />
              returns
            </Trust>
            <Trust icon={<ShieldCheck className="h-5 w-5" />}>
              Secure
              <br />
              checkout
            </Trust>
          </div>

          {/* Description */}
          <div className="mt-6 space-y-4">
            <p className="leading-relaxed text-ink/80">{product.description}</p>

            <div className="rounded-2xl bg-kelp/10 p-4">
              <p className="flex items-center gap-2 font-bold text-kelp-dark">
                <Leaf className="h-4 w-4" /> Why it's better for the water
              </p>
              <p className="mt-1 text-sm text-ink/75">{product.eco.notes}</p>
            </div>

            {product.species.length > 0 && (
              <div className="text-sm text-ink/70">
                <span className="font-semibold text-deep">Targets: </span>
                {product.species.join(", ")}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky mobile add-to-cart bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-sand bg-shell/95 p-3 backdrop-blur lg:hidden">
        <div className="container-page flex items-center gap-3">
          <div className="leading-tight">
            <p className="font-display text-lg font-bold text-deep">
              {formatPrice(isMember ? memberPrice : unitPrice)}
            </p>
            <p className="text-[11px] text-ink/55">{variant?.value}</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-kelp font-semibold text-white active:scale-[0.99]"
          >
            {added ? (
              <>
                <Check className="h-5 w-5" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="h-5 w-5" /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

function Trust({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-1 text-xs font-medium text-ink/70">
      <span className="text-tide">{icon}</span>
      <span>{children}</span>
    </div>
  );
}
