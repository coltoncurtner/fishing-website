"use client";

import Link from "next/link";
import { X, ShoppingBag, Trash2, Leaf } from "lucide-react";
import { useCart, memberDiscountFor } from "@/lib/cart-store";
import { formatPrice, cn } from "@/lib/utils";
import { ProductImage } from "@/components/ui/ProductImage";
import { QuantityStepper } from "@/components/commerce/QuantityStepper";
import { FreeShippingMeter } from "@/components/commerce/FreeShippingMeter";
import { ButtonLink } from "@/components/ui/Button";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, membershipTierId } =
    useCart();
  const discount = memberDiscountFor(membershipTierId);
  const rawSubtotal = items.reduce(
    (sum, i) => sum + i.unitPrice * i.quantity,
    0,
  );
  const subtotal = rawSubtotal * (1 - discount);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50",
        isOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!isOpen}
    >
      <div
        className={cn(
          "absolute inset-0 bg-deep/40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0",
        )}
        onClick={closeCart}
      />
      <aside
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-shell shadow-lift transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-sand p-4">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-deep">
            <ShoppingBag className="h-5 w-5" /> Your Cart
          </h2>
          <button onClick={closeCart} aria-label="Close cart" className="p-2">
            <X className="h-5 w-5 text-deep" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-sand">
              <ShoppingBag className="h-7 w-7 text-deep/60" />
            </div>
            <p className="font-semibold text-deep">Your cart is empty</p>
            <p className="text-sm text-ink/60">
              Tackle that's good for the catch — and the water.
            </p>
            <ButtonLink href="/shop" onClick={closeCart}>
              Start shopping
            </ButtonLink>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-3">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.key} className="flex gap-3">
                    <ProductImage
                      seed={item.imageSeed}
                      alt={item.name}
                      className="h-20 w-20 shrink-0 rounded-lg"
                    />
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="text-sm font-semibold leading-snug text-deep hover:text-tide"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.key)}
                          aria-label={`Remove ${item.name}`}
                          className="text-ink/40 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      {item.variantLabel && (
                        <span className="text-xs text-ink/50">
                          {item.variantLabel}
                        </span>
                      )}
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <QuantityStepper
                          size="sm"
                          value={item.quantity}
                          onChange={(q) => updateQty(item.key, q)}
                        />
                        <span className="text-sm font-bold text-deep">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 border-t border-sand p-4">
              <FreeShippingMeter subtotal={subtotal} />
              {discount > 0 && (
                <p className="flex items-center justify-between text-sm text-kelp-dark">
                  <span className="inline-flex items-center gap-1">
                    <Leaf className="h-3.5 w-3.5" /> Pro Club discount
                  </span>
                  <span>-{formatPrice(rawSubtotal * discount)}</span>
                </p>
              )}
              <div className="flex items-center justify-between">
                <span className="font-semibold text-deep">Subtotal</span>
                <span className="font-display text-xl font-bold text-deep">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <ButtonLink
                href="/checkout"
                size="lg"
                className="w-full"
                onClick={closeCart}
              >
                Checkout
              </ButtonLink>
              <button
                onClick={closeCart}
                className="w-full text-center text-sm font-medium text-ink/60 hover:text-deep"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
