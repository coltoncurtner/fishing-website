"use client";

import { useState } from "react";
import { Check, Crown, Leaf } from "lucide-react";
import { membershipTiers } from "@/lib/data/membership";
import { useCart } from "@/lib/cart-store";
import { formatPrice, cn } from "@/lib/utils";

export function MembershipTiers() {
  const [annual, setAnnual] = useState(false);
  const activeTier = useCart((s) => s.membershipTierId);
  const setMembership = useCart((s) => s.setMembership);

  return (
    <div>
      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-3">
        <span
          className={cn(
            "text-sm font-semibold",
            !annual ? "text-deep" : "text-ink/50",
          )}
        >
          Monthly
        </span>
        <button
          onClick={() => setAnnual((v) => !v)}
          className="relative h-7 w-12 rounded-full bg-deep transition"
          aria-label="Toggle annual billing"
          aria-pressed={annual}
        >
          <span
            className={cn(
              "absolute top-1 h-5 w-5 rounded-full bg-white transition-all",
              annual ? "left-6" : "left-1",
            )}
          />
        </button>
        <span
          className={cn(
            "text-sm font-semibold",
            annual ? "text-deep" : "text-ink/50",
          )}
        >
          Annual
          <span className="ml-1 rounded-full bg-kelp/15 px-2 py-0.5 text-xs text-kelp-dark">
            Save ~17%
          </span>
        </span>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {membershipTiers.map((tier) => {
          const isActive = activeTier === tier.id;
          const price = annual ? tier.annualPrice : tier.monthlyPrice;
          return (
            <div
              key={tier.id}
              className={cn(
                "relative flex flex-col rounded-3xl border-2 bg-white p-7 shadow-card transition",
                tier.highlighted
                  ? "border-kelp shadow-lift"
                  : "border-sand",
              )}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-kelp px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  Most Popular
                </span>
              )}
              <div className="flex items-center gap-2">
                {tier.id === "pro-captain" ? (
                  <Crown className="h-5 w-5 text-amber-500" />
                ) : (
                  <Leaf className="h-5 w-5 text-kelp" />
                )}
                <h3 className="font-display text-xl font-extrabold text-deep">
                  {tier.name}
                </h3>
              </div>
              <p className="mt-2 text-sm text-ink/60">{tier.blurb}</p>

              <div className="mt-5 flex items-end gap-1">
                <span className="font-display text-4xl font-bold text-deep">
                  {formatPrice(price)}
                </span>
                <span className="pb-1 text-sm text-ink/50">
                  /{annual ? "yr" : "mo"}
                </span>
              </div>
              <p className="mt-1 text-sm font-semibold text-kelp-dark">
                {Math.round(tier.memberDiscount * 100)}% off every order
              </p>

              <ul className="mt-6 space-y-3">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-kelp" />
                    <span className="text-ink/80">{perk}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setMembership(isActive ? null : tier.id)}
                className={cn(
                  "mt-7 h-12 rounded-full font-semibold transition-all active:scale-[0.99]",
                  isActive
                    ? "bg-deep text-white"
                    : tier.highlighted
                      ? "bg-kelp text-white hover:bg-kelp-dark"
                      : "border-2 border-deep text-deep hover:bg-deep hover:text-white",
                )}
              >
                {isActive ? "✓ Active — tap to cancel" : `Join ${tier.name}`}
              </button>
            </div>
          );
        })}
      </div>

      {activeTier && (
        <p className="mt-6 text-center text-sm font-semibold text-kelp-dark">
          <Leaf className="mr-1 inline h-4 w-4" />
          Pro Club pricing is now applied across the store. Browse and watch
          prices drop.
        </p>
      )}
    </div>
  );
}
