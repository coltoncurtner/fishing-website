import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";
import { brand } from "@/lib/brand";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Salt & Stream builds premium, 100% lead-free fishing tackle for anglers who want to protect the water they fish.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="Built by anglers, for the water we love"
        seed="about-hero"
      />
      <article className="container-page max-w-3xl py-12">
        <div className="space-y-5 text-lg leading-relaxed text-ink/80">
          <p>
            {brand.name} started on a flat at first light, watching a loon dive
            for what we hoped wasn&apos;t a lost sinker. The gear we&apos;d trusted
            for years — the lead weights, the throwaway trebles — was quietly
            harming the places we built our lives around.
          </p>
          <p>
            So we set out to build tackle that performs at the highest level
            without the toxic legacy. Denser tungsten that casts farther.
            Bismuth and tin sinkers that hold bottom without poisoning it.
            Sticky-sharp circle hooks that release fish clean. Apparel spun from
            recycled bottles instead of virgin plastic.
          </p>
          <p>
            Today we make a full lineup for salt and freshwater anglers — and we
            put our money where our mission is, funding clean-water projects with
            every order and every Pro Club membership.
          </p>
          <p className="font-display text-xl font-bold text-deep">
            Tackle that&apos;s good for the catch — and the water.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/shop" size="lg">
            Shop the tackle
          </ButtonLink>
          <ButtonLink href="/eco" variant="outline" size="lg">
            Our lead-free mission
          </ButtonLink>
        </div>
      </article>
    </>
  );
}
