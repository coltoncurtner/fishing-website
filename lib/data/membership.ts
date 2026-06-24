import type { MembershipTier, Testimonial } from "@/lib/types";

export const membershipTiers: MembershipTier[] = [
  {
    id: "shorebound",
    name: "Shorebound",
    blurb: "For the weekend angler getting started the right way.",
    monthlyPrice: 9,
    annualPrice: 90,
    memberDiscount: 0.1,
    perks: [
      "10% off every order",
      "Free shipping over $35",
      "Members-only seasonal drops",
      "Lead-free tackle starter guide",
    ],
    waterFocus: "both",
    highlighted: false,
  },
  {
    id: "angler",
    name: "Angler",
    blurb: "Our most popular plan for anglers who fish every chance they get.",
    monthlyPrice: 19,
    annualPrice: 190,
    memberDiscount: 0.15,
    perks: [
      "15% off every order",
      "Free shipping on all orders",
      "Early access to new gear & restocks",
      "Quarterly eco-tackle field kit",
      "Saltwater or freshwater personalization",
    ],
    waterFocus: "both",
    highlighted: true,
  },
  {
    id: "pro-captain",
    name: "Pro Captain",
    blurb: "Maximum value for guides, tournament anglers, and die-hards.",
    monthlyPrice: 39,
    annualPrice: 390,
    memberDiscount: 0.25,
    perks: [
      "25% off every order",
      "Free expedited shipping",
      "First dibs on limited lead-free runs",
      "Pro pricing on bulk hooks & weights",
      "Free gear replacement guarantee",
      "Invite to members-only conservation events",
    ],
    waterFocus: "both",
    highlighted: false,
  },
];

export function getTier(id: string): MembershipTier | undefined {
  return membershipTiers.find((t) => t.id === id);
}

export const testimonials: Testimonial[] = [
  {
    name: "Marcus T.",
    location: "Tampa, FL",
    quote:
      "Switched my whole surf setup to the bismuth sinkers. They hold bottom just like lead and I sleep better knowing I'm not dumping toxins in the flats.",
    rating: 5,
    product: "Reef Anchor Bismuth Bank Sinkers",
  },
  {
    name: "Dana R.",
    location: "Lake of the Ozarks, MO",
    quote:
      "The EcoCast tungsten weights are smaller and way more sensitive than my old lead. Caught my PB smallmouth the first weekend.",
    rating: 5,
    product: "EcoCast Tungsten Worm Weights",
  },
  {
    name: "Captain Lee",
    location: "Montauk, NY",
    quote:
      "I run charters and the Pro Captain plan pays for itself in two trips. Circle hooks are sticky sharp and my release numbers are up.",
    rating: 5,
    product: "CleanWater Circle Hooks",
  },
  {
    name: "Sofia M.",
    location: "San Diego, CA",
    quote:
      "Finally a sun hoodie that fits women and actually dries. Wear it on and off the water now.",
    rating: 5,
    product: "Tideline Performance Hoodie",
  },
];
