"use client";

import { Truck, Check } from "lucide-react";
import { brand } from "@/lib/brand";
import { formatPrice } from "@/lib/utils";

export function FreeShippingMeter({ subtotal }: { subtotal: number }) {
  const threshold = brand.freeShippingThreshold;
  const remaining = Math.max(0, threshold - subtotal);
  const pct = Math.min(100, (subtotal / threshold) * 100);
  const qualified = remaining === 0;

  return (
    <div className="rounded-xl bg-sand/50 p-3">
      <div className="flex items-center gap-2 text-sm font-medium text-deep">
        {qualified ? (
          <>
            <Check className="h-4 w-4 text-kelp" />
            <span>You've unlocked free shipping!</span>
          </>
        ) : (
          <>
            <Truck className="h-4 w-4 text-tide" />
            <span>
              Add <strong>{formatPrice(remaining)}</strong> for free shipping
            </span>
          </>
        )}
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-gradient-to-r from-tide to-kelp transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
