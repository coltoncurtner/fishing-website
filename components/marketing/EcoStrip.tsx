import { Leaf, Fish, Droplets } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

const points = [
  {
    icon: Fish,
    title: "Safer for fish",
    body: "Lead poisons fish and the birds that eat them. Our tungsten, tin, and bismuth tackle is non-toxic from the first cast.",
  },
  {
    icon: Droplets,
    title: "Cleaner water",
    body: "Lost lead sinkers leach into lakes and rivers for decades. Lead-free gear keeps the watershed clean for the next generation.",
  },
  {
    icon: Leaf,
    title: "No performance trade-off",
    body: "Tungsten is denser than lead — smaller baits, longer casts, more sensitivity. You fish better and feel good doing it.",
  },
];

export function EcoStrip() {
  return (
    <section className="container-page py-16">
      <div className="grid gap-10 rounded-3xl bg-deep p-8 text-white sm:p-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-kelp-light">
            The lead-free difference
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            Tackle that's good for the catch — and the water.
          </h2>
          <p className="mt-4 text-white/75">
            We started Salt &amp; Stream because the gear we relied on was
            quietly poisoning the places we love to fish. So we rebuilt it,
            lead-free, with no compromise on performance.
          </p>
          <ButtonLink href="/eco" variant="dark" className="mt-6">
            Read our mission
          </ButtonLink>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:gap-6">
          {points.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-kelp/20 text-kelp-light">
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 font-display text-base font-bold">
                {p.title}
              </h3>
              <p className="mt-1.5 text-sm text-white/70">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
