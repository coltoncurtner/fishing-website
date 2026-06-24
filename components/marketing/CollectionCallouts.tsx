import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { collections } from "@/lib/data/collections";
import { seededGradient } from "@/lib/utils";

export function CollectionCallouts() {
  return (
    <section className="container-page py-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Curated kits</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-deep sm:text-4xl">
            Ready-to-fish collections
          </h2>
        </div>
        <Link
          href="/shop"
          className="hidden shrink-0 items-center gap-1 text-sm font-bold text-tide hover:text-deep sm:inline-flex"
        >
          Shop all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {collections.map((c) => {
          const g = seededGradient(c.heroSeed);
          return (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-2xl p-7 text-white shadow-card transition hover:shadow-lift"
              style={{
                background: `linear-gradient(150deg, ${g.from}, ${g.to})`,
              }}
            >
              <div className="bg-wave absolute inset-0 opacity-60" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-wide text-kelp-light">
                  {c.subtitle}
                </p>
                <h3 className="mt-2 font-display text-2xl font-extrabold">
                  {c.title}
                </h3>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold">
                  Explore kit
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
