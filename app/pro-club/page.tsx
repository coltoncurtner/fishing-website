import type { Metadata } from "next";
import { Leaf, TrendingDown, Truck, Sparkles } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { MembershipTiers } from "@/components/marketing/MembershipTiers";
import { Testimonials } from "@/components/marketing/Testimonials";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pro Club Membership",
  description:
    "Join the Salt & Stream Pro Club for member pricing, free shipping, and early access to lead-free tackle drops. Plans for every angler.",
  path: "/pro-club",
});

const benefits = [
  {
    icon: TrendingDown,
    title: "Member pricing",
    body: "Save 10–25% on every single order, automatically.",
  },
  {
    icon: Truck,
    title: "Free shipping",
    body: "No minimums on Angler and Pro Captain plans.",
  },
  {
    icon: Sparkles,
    title: "Early access",
    body: "First dibs on limited lead-free runs and restocks.",
  },
  {
    icon: Leaf,
    title: "Do more good",
    body: "A share of every membership funds clean-water projects.",
  },
];

export default function ProClubPage() {
  return (
    <>
      <PageHero
        eyebrow="Salt & Stream Pro Club"
        title="Membership that pays for itself"
        subtitle="Pick a plan, unlock member pricing across the whole store, and fish knowing you're funding cleaner water."
        seed="pro-club-hero"
      />

      <section className="container-page py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-2xl bg-white p-6 shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-kelp/10 text-kelp-dark">
                <b.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-deep">
                {b.title}
              </h3>
              <p className="mt-1.5 text-sm text-ink/65">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="text-center">
          <p className="eyebrow">Choose your plan</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-deep sm:text-4xl">
            Plans for every angler
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink/65">
            Activate a plan below to see Pro Club pricing applied live across the
            store — then browse and watch the prices drop.
          </p>
        </div>
        <div className="mt-10">
          <MembershipTiers />
        </div>
      </section>

      <Testimonials />
    </>
  );
}
