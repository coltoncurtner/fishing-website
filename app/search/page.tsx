"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import { searchProducts } from "@/lib/data/products";
import { ProductGrid } from "@/components/commerce/ProductGrid";

function SearchInner() {
  const params = useSearchParams();
  const router = useRouter();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);
  const results = searchProducts(query);

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl font-extrabold text-deep sm:text-4xl">
        Search
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.replace(`/search?q=${encodeURIComponent(query)}`);
        }}
        className="mt-6 flex max-w-xl items-center gap-2 rounded-full border border-sand bg-white px-4 shadow-card focus-within:border-kelp"
      >
        <SearchIcon className="h-5 w-5 text-ink/40" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try 'tungsten', 'circle hooks', 'redfish'..."
          className="h-12 w-full bg-transparent text-sm text-deep placeholder:text-ink/40 focus:outline-none"
          aria-label="Search products"
        />
      </form>

      <div className="mt-10">
        {query.trim() === "" ? (
          <p className="text-ink/60">Start typing to find lead-free tackle.</p>
        ) : results.length > 0 ? (
          <>
            <p className="mb-6 text-sm text-ink/60">
              <span className="font-semibold text-deep">{results.length}</span>{" "}
              result{results.length === 1 ? "" : "s"} for “{query}”
            </p>
            <ProductGrid products={results} />
          </>
        ) : (
          <p className="text-ink/60">
            No results for “{query}”. Try a broader term.
          </p>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container-page py-12" />}>
      <SearchInner />
    </Suspense>
  );
}
