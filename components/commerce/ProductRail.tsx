import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/commerce/ProductCard";

export function ProductRail({
  title,
  eyebrow,
  products,
}: {
  title: string;
  eyebrow?: string;
  products: Product[];
}) {
  if (products.length === 0) return null;
  return (
    <section className="container-page py-12">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-1 font-display text-2xl font-extrabold text-deep sm:text-3xl">
        {title}
      </h2>
      <div className="mt-6 flex gap-4 overflow-x-auto pb-4 no-scrollbar sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible lg:grid-cols-4">
        {products.map((p) => (
          <div key={p.id} className="w-64 shrink-0 sm:w-auto">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
