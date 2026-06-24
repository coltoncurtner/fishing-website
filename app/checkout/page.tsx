"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Leaf, Check, CreditCard } from "lucide-react";
import { useCart, memberDiscountFor } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { brand } from "@/lib/brand";
import { ProductImage } from "@/components/ui/ProductImage";
import { ButtonLink } from "@/components/ui/Button";

export default function CheckoutPage() {
  const { items, membershipTierId, clear } = useCart();
  const discount = memberDiscountFor(membershipTierId);
  const rawSubtotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
  const subtotal = rawSubtotal * (1 - discount);
  const shipping = subtotal >= brand.freeShippingThreshold || subtotal === 0 ? 0 : 6.95;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  const [placed, setPlaced] = useState(false);

  function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    setPlaced(true);
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (placed) {
    return (
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-kelp text-white">
          <Check className="h-8 w-8" />
        </span>
        <h1 className="font-display text-3xl font-extrabold text-deep">
          Order confirmed!
        </h1>
        <p className="max-w-md text-ink/65">
          Thanks for fishing lead-free. A confirmation is on its way to your
          inbox. (This is a demo checkout — no payment was processed.)
        </p>
        <ButtonLink href="/shop" size="lg">
          Keep shopping
        </ButtonLink>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-page flex min-h-[50vh] flex-col items-center justify-center gap-4 py-20 text-center">
        <h1 className="font-display text-2xl font-extrabold text-deep">
          Nothing to check out
        </h1>
        <ButtonLink href="/shop">Shop the tackle</ButtonLink>
      </div>
    );
  }

  return (
    <div className="container-page py-12">
      <div className="flex items-center gap-2 text-sm text-ink/55">
        <Link href="/cart" className="hover:text-deep">
          Cart
        </Link>
        <span>/</span>
        <span className="text-deep">Checkout</span>
      </div>

      <form
        onSubmit={placeOrder}
        className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr]"
      >
        <div className="space-y-8">
          <Section title="Contact">
            <Field label="Email" type="email" placeholder="you@email.com" />
          </Section>

          <Section title="Shipping address">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" />
              <Field label="Last name" />
            </div>
            <Field label="Address" />
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="City" />
              <Field label="State" />
              <Field label="ZIP" />
            </div>
          </Section>

          <Section title="Payment">
            <div className="rounded-xl border border-sand bg-sand/30 p-4 text-sm text-ink/65">
              <p className="flex items-center gap-2 font-semibold text-deep">
                <CreditCard className="h-4 w-4" /> Demo payment
              </p>
              <p className="mt-1">
                This storefront is a demo — no real card is charged. Wire up
                Stripe here to go live.
              </p>
            </div>
            <div className="grid gap-4">
              <Field label="Card number" placeholder="4242 4242 4242 4242" />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Expiry" placeholder="MM/YY" />
                <Field label="CVC" placeholder="123" />
              </div>
            </div>
          </Section>

          <button
            type="submit"
            className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-kelp text-base font-semibold text-white shadow-card transition hover:bg-kelp-dark hover:shadow-lift active:scale-[0.99]"
          >
            <Lock className="h-5 w-5" /> Place order · {formatPrice(total)}
          </button>
          <p className="text-center text-xs text-ink/50">
            <Lock className="mr-1 inline h-3 w-3" />
            Secure, encrypted checkout
          </p>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl bg-white p-6 shadow-card">
            <h2 className="font-display text-lg font-bold text-deep">
              Order summary
            </h2>
            <ul className="mt-4 space-y-3">
              {items.map((item) => (
                <li key={item.key} className="flex items-center gap-3">
                  <div className="relative">
                    <ProductImage
                      seed={item.imageSeed}
                      alt={item.name}
                      className="h-14 w-14 rounded-lg"
                    />
                    <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-deep text-[10px] font-bold text-white">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-semibold leading-tight text-deep">
                      {item.name}
                    </p>
                    {item.variantLabel && (
                      <p className="text-xs text-ink/50">{item.variantLabel}</p>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-deep">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 space-y-2 border-t border-sand pt-4 text-sm">
              <Row label="Subtotal" value={formatPrice(rawSubtotal)} />
              {discount > 0 && (
                <Row
                  label={
                    <span className="inline-flex items-center gap-1 text-kelp-dark">
                      <Leaf className="h-3.5 w-3.5" /> Pro Club
                    </span>
                  }
                  value={
                    <span className="text-kelp-dark">
                      -{formatPrice(rawSubtotal * discount)}
                    </span>
                  }
                />
              )}
              <Row
                label="Shipping"
                value={shipping === 0 ? "Free" : formatPrice(shipping)}
              />
              <Row label="Tax (est.)" value={formatPrice(tax)} />
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-sand pt-4">
              <span className="font-semibold text-deep">Total</span>
              <span className="font-display text-2xl font-bold text-deep">
                {formatPrice(total)}
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 font-display text-lg font-bold text-deep">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink/70">
        {label}
      </span>
      <input
        type={type}
        required
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-sand bg-white px-4 text-sm text-deep placeholder:text-ink/30 focus:border-kelp focus:outline-none focus:ring-2 focus:ring-kelp/30"
      />
    </label>
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
