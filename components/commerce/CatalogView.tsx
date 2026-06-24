"use client";

import { useMemo, useState } from "react";
import { Leaf, SlidersHorizontal, X } from "lucide-react";
import type { Product, WaterType } from "@/lib/types";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { CATEGORY_LABELS, cn } from "@/lib/utils";

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

const SORTS: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export function CatalogView({
  products,
  showCategoryFilter = false,
}: {
  products: Product[];
  showCategoryFilter?: boolean;
}) {
  const [water, setWater] = useState<WaterType | "all">("all");
  const [ecoOnly, setEcoOnly] = useState(false);
  const [category, setCategory] = useState<string | "all">("all");
  const [sort, setSort] = useState<Sort>("featured");
  const [mobileFilters, setMobileFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (water !== "all" && p.waterType !== water && p.waterType !== "both")
        return false;
      if (ecoOnly && !p.eco.leadFree) return false;
      if (category !== "all" && p.category !== category) return false;
      return true;
    });
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        list = [...list].sort(
          (a, b) => Number(b.isBestSeller) - Number(a.isBestSeller),
        );
    }
    return list;
  }, [products, water, ecoOnly, category, sort]);

  const filters = (
    <div className="space-y-6">
      <FilterGroup label="Water type">
        <div className="flex flex-wrap gap-2">
          {(["all", "salt", "fresh"] as const).map((w) => (
            <Chip
              key={w}
              active={water === w}
              onClick={() => setWater(w)}
            >
              {w === "all" ? "All water" : w === "salt" ? "Saltwater" : "Freshwater"}
            </Chip>
          ))}
        </div>
      </FilterGroup>

      {showCategoryFilter && (
        <FilterGroup label="Category">
          <div className="flex flex-wrap gap-2">
            <Chip active={category === "all"} onClick={() => setCategory("all")}>
              All
            </Chip>
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <Chip
                key={key}
                active={category === key}
                onClick={() => setCategory(key)}
              >
                {label}
              </Chip>
            ))}
          </div>
        </FilterGroup>
      )}

      <FilterGroup label="Conservation">
        <button
          onClick={() => setEcoOnly((v) => !v)}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition",
            ecoOnly
              ? "border-kelp bg-kelp/10 text-kelp-dark"
              : "border-sand text-deep hover:border-kelp",
          )}
          aria-pressed={ecoOnly}
        >
          <Leaf className="h-4 w-4" /> Lead-free only
        </button>
      </FilterGroup>
    </div>
  );

  return (
    <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-10">
      <aside className="hidden lg:block">
        <div className="sticky top-28">{filters}</div>
      </aside>

      <div>
        <div className="mb-6 flex items-center justify-between gap-3">
          <p className="text-sm text-ink/60">
            <span className="font-semibold text-deep">{filtered.length}</span>{" "}
            products
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileFilters(true)}
              className="inline-flex items-center gap-2 rounded-full border border-sand px-3 py-2 text-sm font-semibold text-deep lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
            <label className="sr-only" htmlFor="sort">
              Sort by
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-full border border-sand bg-white px-4 py-2 text-sm font-semibold text-deep focus:border-kelp focus:outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filtered.length > 0 ? (
          <ProductGrid products={filtered} />
        ) : (
          <div className="rounded-2xl bg-white p-12 text-center shadow-card">
            <p className="font-semibold text-deep">No products match.</p>
            <p className="mt-1 text-sm text-ink/60">
              Try clearing a filter to see more gear.
            </p>
          </div>
        )}
      </div>

      {/* Mobile filter sheet */}
      {mobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-deep/40"
            onClick={() => setMobileFilters(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[80%] overflow-y-auto rounded-t-2xl bg-shell p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-deep">Filters</h3>
              <button
                onClick={() => setMobileFilters(false)}
                aria-label="Close filters"
              >
                <X className="h-6 w-6 text-deep" />
              </button>
            </div>
            {filters}
            <button
              onClick={() => setMobileFilters(false)}
              className="mt-6 w-full rounded-full bg-kelp py-3 font-semibold text-white"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-ink/50">
        {label}
      </h4>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm font-medium transition",
        active
          ? "border-deep bg-deep text-white"
          : "border-sand text-deep hover:border-tide",
      )}
    >
      {children}
    </button>
  );
}
