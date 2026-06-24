import { Leaf, Star } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { ProductImage } from "@/components/ui/ProductImage";
import { getBestSellers } from "@/lib/data/products";

export function Hero() {
  const featured = getBestSellers(1)[0];
  return (
    <section className="relative overflow-hidden bg-deep text-white">
      <div className="bg-wave">
        <div className="container-page grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-kelp-light ring-1 ring-white/15">
              <Leaf className="h-3.5 w-3.5" /> 100% Lead-Free Tackle
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl">
              Out-fish the old stuff.
              <span className="block text-kelp-light">
                Protect the water.
              </span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-white/75">
              Premium salt &amp; freshwater lures, baits, weights, and hooks —
              engineered lead-free so every cast is better for the fish and the
              water you love.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/shop" size="lg">
                Shop the tackle
              </ButtonLink>
              <ButtonLink href="/eco" variant="dark" size="lg">
                Why lead-free?
              </ButtonLink>
            </div>
            <div className="mt-8 flex items-center gap-4 text-sm text-white/70">
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span>Loved by 12,000+ conscientious anglers</span>
            </div>
          </div>

          <div className="relative animate-fade-up">
            <div className="absolute -inset-4 rounded-[2rem] bg-kelp/20 blur-2xl" />
            <div className="relative rounded-[2rem] bg-white/5 p-3 ring-1 ring-white/10 backdrop-blur">
              <ProductImage
                seed={featured?.images[0]?.seed ?? "hero"}
                alt={featured?.name ?? "Featured tackle"}
                category={featured?.category}
                className="aspect-[4/3] w-full rounded-[1.5rem]"
                priority
              />
              <div className="absolute bottom-6 left-6 rounded-xl bg-white/95 px-4 py-3 shadow-lift">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-kelp-dark">
                  Best Seller
                </p>
                <p className="font-display text-sm font-bold text-deep">
                  {featured?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
