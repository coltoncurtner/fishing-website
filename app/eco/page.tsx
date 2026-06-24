import type { Metadata } from "next";
import { Fish, Droplets, Recycle, Leaf, Award } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { ProductRail } from "@/components/commerce/ProductRail";
import { getEcoWeightsAndHooks } from "@/lib/data/products";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Lead-Free Mission",
  description:
    "Why Salt & Stream went 100% lead-free: lead poisons fish, waterfowl, and the water we fish. Learn how tungsten, tin, and bismuth tackle protects the watershed.",
  path: "/eco",
});

const stats = [
  { value: "0g", label: "Lead in any product we make" },
  { value: "100%", label: "Non-toxic weights & hooks" },
  { value: "1%", label: "Of sales fund clean-water work" },
];

const pillars = [
  {
    icon: Fish,
    title: "Safer for fish & wildlife",
    body: "Waterfowl and fish mistake lost lead shot and sinkers for food or grit. A single split shot can kill a loon. Our non-toxic metals end that cycle.",
  },
  {
    icon: Droplets,
    title: "Cleaner watersheds",
    body: "Lead lost on the bottom slowly dissolves into the water column for decades. Tungsten, tin, and bismuth are inert and safe.",
  },
  {
    icon: Recycle,
    title: "Built to last & recycle",
    body: "Durable materials and recycled fabrics mean less waste, and our metals are fully reclaimable at end of life.",
  },
  {
    icon: Award,
    title: "No performance trade-off",
    body: "Tungsten is denser than lead — so our weights are smaller, cast farther, and telegraph the bottom better. You fish better, period.",
  },
];

export default function EcoPage() {
  return (
    <>
      <PageHero
        eyebrow="Our mission"
        title="We went lead-free so the water we love stays fishable."
        subtitle="Every weight and hook we make is non-toxic from the first cast — no lead, no compromise."
        seed="eco-mission"
      />

      <section className="container-page py-12">
        <div className="grid gap-6 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-white p-8 text-center shadow-card"
            >
              <p className="font-display text-4xl font-extrabold text-kelp-dark">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-ink/65">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-4">
        <div className="grid gap-6 lg:grid-cols-2">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="flex gap-4 rounded-2xl bg-white p-6 shadow-card"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-kelp/10 text-kelp-dark">
                <p.icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-deep">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-12">
        <div className="overflow-hidden rounded-3xl bg-deep p-8 text-center text-white sm:p-12">
          <div className="bg-wave -m-8 p-8 sm:-m-12 sm:p-12">
            <Leaf className="mx-auto h-8 w-8 text-kelp-light" />
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-2xl font-extrabold sm:text-3xl">
              Make the switch in one click
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/75">
              Replace the lead in your tackle box with gear that fishes as good
              or better — and protects the water for the next generation.
            </p>
            <ButtonLink
              href="/collections/lead-free-conversion"
              variant="dark"
              size="lg"
              className="mt-6"
            >
              Shop the Lead-Free Conversion
            </ButtonLink>
          </div>
        </div>
      </section>

      <ProductRail
        eyebrow="Start here"
        title="Our lead-free essentials"
        products={getEcoWeightsAndHooks(4)}
      />
    </>
  );
}
