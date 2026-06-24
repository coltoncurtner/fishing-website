"use client";

import Link from "next/link";
import { Trash2, Leaf, ArrowRight } from "lucide-react";
import { useCart, memberDiscountFor } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "@/components/ui/ProductImage";
import { QuantityStepper } from "@/components/commerce/QuantityStepper";
import { FreeShippingMeter } from "@/components/commerce/FreeShippingMeter";
import { ButtonLink, Button } from "@/components/ui/Button";

export default function CartPage() {
  const { items, updateQty, removeItem, membershipTierId } = useCart();
  const discount = memberDiscountFor(membershipTierId);
  const rawSubtotal = items.reduce(
    (s, i) => s + i.unitPrice * i.quantity,
    0,
  );
  const subtotal = rawSubtotal * (1 - discount);

  if (items.length === 0) {
    return (
      <div className="container-page flex min-h-[50vh] flex-col items-center justify-center gap-4 py-20 text-center">
        <h1 className="font-display text-3xl font-extrabold text-deep">
          Your cart is empty
        </h1>
        <p className="text-ink/60">
          Let&apos;s find you some lead-free tackle that gets bit.
        </p>
        <ButtonLink href="/shop" size="lg">
          Shop the tackle
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl font-extrabold text-deep sm:text-4xl">
        Your Cart
      </h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <ul className="divide-y divide-sand">
          {items.map((item) => (
            <li key={item.key} className="flex gap-4 py-5">
              <ProductImage
                seed={item.imageSeed}
                alt={item.name}
                className="h-28 w-28 shrink-0 rounded-xl"
              />
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-3">
                  <Link
                    href={`/product/${item.slug}`}
                    className="font-display font-bold text-deep hover:text-tide"
                  >
                    {item.name}
                  </Link>
                  <span className="font-bold text-deep">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
                {item.variantLabel && (
                  <span className="text-sm text-ink/55">
                    {item.variantLabel}
                  </span>
                )}
                <span className="text-sm text-ink/55">
                  {formatPrice(item.unitPrice)} each
                </span>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <QuantityStepper
                    value={item.quantity}
                    onChange={(q) => updateQty(item.key, q)}
                  />
                  <button
                    onClick={() => removeItem(item.key)}
                    className="inline-flex items-center gap-1 text-sm text-ink/50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl bg-white p-6 shadow-card">
            <h2 className="font-display text-lg font-bold text-deep">
              Order summary
            </h2>
            <div className="mt-4 space-y-3 text-sm">
              <Row label="Subtotal" value={formatPrice(rawSubtotal)} />
              {discount > 0 && (
                <Row
                  label={
                    <span className="inline-flex items-center gap-1 text-kelp-dark">
                      <Leaf className="h-3.5 w-3.5" /> Pro Club discount
                    </span>
                  }
                  value={
                    <span className="text-kelp-dark">
                      -{formatPrice(rawSubtotal * discount)}
                    </span>
                  }
                />
              )}
              <Row label="Shipping" value="Calculated at checkout" />
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-sand pt-4">
              <span className="font-semibold text-deep">Total</span>
              <span className="font-display text-2xl font-bold text-deep">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="mt-4">
              <FreeShippingMeter subtotal={subtotal} />
            </div>
            <ButtonLink href="/checkout" size="lg" className="mt-5 w-full">
              Checkout <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            {discount === 0 && (
              <ButtonLink
                href="/pro-club"
                variant="outline"
                className="mt-3 w-full"
              >
                <Leaf className="h-4 w-4" /> Save with Pro Club
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink/65">{label}</span>
      <span className="font-medium text-deep">{value}</span>
    </div>
  );
}
