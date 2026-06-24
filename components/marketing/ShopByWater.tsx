import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { seededGradient } from "@/lib/utils";

const cards = [
  {
    title: "Saltwater",
    blurb: "Flats, surf, and offshore — redfish to tuna.",
    href: "/shop?water=salt",
    seed: "saltwater-card",
  },
  {
    title: "Freshwater",
    blurb: "Lakes, rivers, and ponds — bass to trout.",
    href: "/shop?water=fresh",
    seed: "freshwater-card",
  },
];

export function ShopByWater() {
  return (
    <section className="container-page py-16">
      <div className="text-center">
        <p className="eyebrow">Find your water</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-deep sm:text-4xl">
          Shop by where you fish
        </h2>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {cards.map((c) => {
          const g = seededGradient(c.seed);
          return (
            <Link
              key={c.title}
              href={c.href}
              className="group relative flex h-64 items-end overflow-hidden rounded-2xl p-8 text-white shadow-card transition hover:shadow-lift"
              style={{
                background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
              }}
            >
              <div className="bg-wave absolute inset-0 opacity-70" />
              <div className="relative">
                <h3 className="font-display text-3xl font-extrabold">
                  {c.title}
                </h3>
                <p className="mt-1 text-white/80">{c.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-kelp-light">
                  Shop {c.title.toLowerCase()}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
