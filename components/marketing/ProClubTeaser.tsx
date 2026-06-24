import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

const perks = [
  "Up to 25% off every order",
  "Free shipping on everything",
  "Early access to limited lead-free drops",
  "Members-only conservation events",
];

export function ProClubTeaser() {
  return (
    <section className="container-page py-16">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-tide to-kelp-dark text-white">
        <div className="bg-wave grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              Salt &amp; Stream Pro Club
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
              Join the club. Fish for less.
            </h2>
            <p className="mt-4 max-w-md text-white/85">
              Membership pays for itself in a trip or two — member pricing, free
              shipping, and first dibs on every new lead-free run.
            </p>
            <ButtonLink href="/pro-club" variant="dark" size="lg" className="mt-6">
              See membership plans
            </ButtonLink>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {perks.map((p) => (
              <li
                key={p}
                className="flex items-start gap-2 rounded-xl bg-white/10 p-4 text-sm font-medium ring-1 ring-white/15"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
