"use client";

import { formatPrice } from "@/lib/utils";
import { useCart, memberDiscountFor } from "@/lib/cart-store";

/**
 * Shows price, sale compare-at, and a Pro Club member price.
 * When a membership is active, the member price is applied live.
 * When not, we tease the best available member price to drive sign-ups.
 */
export function PriceTag({
  price,
  compareAtPrice,
  size = "md",
  className = "",
}: {
  price: number;
  compareAtPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const tierId = useCart((s) => s.membershipTierId);
  const discount = memberDiscountFor(tierId);
  const memberPrice = price * (1 - (discount || 0.15));
  const isMember = discount > 0;

  const priceSize =
    size === "lg" ? "text-3xl" : size === "sm" ? "text-base" : "text-xl";

  return (
    <div className={className}>
      <div className="flex items-baseline gap-2">
        <span className={`font-display font-bold text-deep ${priceSize}`}>
          {formatPrice(isMember ? memberPrice : price)}
        </span>
        {compareAtPrice && !isMember && (
          <span className="text-sm text-ink/40 line-through">
            {formatPrice(compareAtPrice)}
          </span>
        )}
        {isMember && (
          <span className="text-sm text-ink/40 line-through">
            {formatPrice(price)}
          </span>
        )}
      </div>
      {isMember ? (
        <span className="text-xs font-semibold text-kelp-dark">
          Pro Club price applied
        </span>
      ) : (
        <span className="text-xs text-tide">
          {formatPrice(memberPrice)} with Pro Club
        </span>
      )}
    </div>
  );
}
