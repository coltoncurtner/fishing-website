import { Leaf, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { brand } from "@/lib/brand";

const items = [
  { icon: Leaf, label: "100% Lead-Free", sub: "Better for fish & water" },
  {
    icon: Truck,
    label: `Free shipping over $${brand.freeShippingThreshold}`,
    sub: "Fast, tracked delivery",
  },
  { icon: RotateCcw, label: "30-Day Returns", sub: "No-hassle guarantee" },
  { icon: ShieldCheck, label: "Secure Checkout", sub: "Encrypted & protected" },
];

export function TrustBar() {
  return (
    <section className="border-y border-sand bg-white">
      <div className="container-page grid grid-cols-2 gap-6 py-6 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-kelp/10 text-kelp-dark">
              <it.icon className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold text-deep">{it.label}</p>
              <p className="text-xs text-ink/55">{it.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
