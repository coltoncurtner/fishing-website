"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { Button } from "@/components/ui/Button";
import type { Product, Variant } from "@/lib/types";
import { cn } from "@/lib/utils";

export function AddToCartButton({
  product,
  variant,
  quantity = 1,
  size = "md",
  full = false,
  label = "Add to Cart",
  className,
}: {
  product: Product;
  variant?: Variant;
  quantity?: number;
  size?: "sm" | "md" | "lg";
  full?: boolean;
  label?: string;
  className?: string;
}) {
  const addItem = useCart((s) => s.addItem);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    const unitPrice = product.price + (variant?.priceDelta ?? 0);
    addItem(
      {
        key: `${product.id}${variant ? "-" + variant.id : ""}`,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        imageSeed: product.images[0]?.seed ?? product.slug,
        unitPrice,
        variantLabel: variant ? `${variant.label}: ${variant.value}` : undefined,
      },
      quantity,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <Button
      onClick={handleAdd}
      size={size}
      className={cn(full && "w-full", className)}
      aria-label={`Add ${product.name} to cart`}
    >
      {added ? (
        <>
          <Check className="h-4 w-4" /> Added
        </>
      ) : (
        <>
          <ShoppingBag className="h-4 w-4" /> {label}
        </>
      )}
    </Button>
  );
}
