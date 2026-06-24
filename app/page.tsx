import { Hero } from "@/components/marketing/Hero";
import { TrustBar } from "@/components/marketing/TrustBar";
import { ShopByWater } from "@/components/marketing/ShopByWater";
import { ProductRail } from "@/components/commerce/ProductRail";
import { EcoStrip } from "@/components/marketing/EcoStrip";
import { CollectionCallouts } from "@/components/marketing/CollectionCallouts";
import { ProClubTeaser } from "@/components/marketing/ProClubTeaser";
import { Testimonials } from "@/components/marketing/Testimonials";
import { getBestSellers, getEcoWeightsAndHooks } from "@/lib/data/products";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProductRail
        eyebrow="Crowd favorites"
        title="Best sellers"
        products={getBestSellers(4)}
      />
      <ShopByWater />
      <EcoStrip />
      <ProductRail
        eyebrow="100% Lead-Free"
        title="Eco weights & hooks"
        products={getEcoWeightsAndHooks(4)}
      />
      <CollectionCallouts />
      <ProClubTeaser />
      <Testimonials />
    </>
  );
}
