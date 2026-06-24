import { brand } from "@/lib/brand";

export interface LegalDoc {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
}

export const legalDocs: Record<string, LegalDoc> = {
  shipping: {
    title: "Shipping",
    intro:
      "We ship lead-free tackle across the U.S. with fast, tracked delivery.",
    sections: [
      {
        heading: "Rates & free shipping",
        body: `Standard shipping is a flat $6.95. Orders over $${brand.freeShippingThreshold} ship free. Pro Club members enjoy free shipping with no minimum on Angler and Pro Captain plans.`,
      },
      {
        heading: "Processing time",
        body: "Orders placed before 1pm ET on business days ship the same day. Most orders arrive within 3–5 business days.",
      },
      {
        heading: "Tracking",
        body: "You'll receive a tracking link by email as soon as your order leaves our warehouse.",
      },
    ],
  },
  returns: {
    title: "Returns",
    intro: "Not satisfied? We make returns easy and hassle-free.",
    sections: [
      {
        heading: "30-day guarantee",
        body: "Return any unused item within 30 days for a full refund. Pro Captain members get free replacement on defective gear, no questions asked.",
      },
      {
        heading: "How to start a return",
        body: `Email ${brand.email} with your order number and we'll send a prepaid label.`,
      },
      {
        heading: "Refunds",
        body: "Refunds are issued to your original payment method within 3–5 business days of us receiving the return.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    intro:
      "Your privacy matters. Here's how we handle your information. (Demo policy — replace with your reviewed legal text before launch.)",
    sections: [
      {
        heading: "What we collect",
        body: "We collect the information you provide at checkout and account sign-up, plus basic analytics to improve the store.",
      },
      {
        heading: "How we use it",
        body: "To fulfill orders, provide support, and (with your consent) send you offers. We never sell your personal data.",
      },
      {
        heading: "Your choices",
        body: `You can request access to or deletion of your data anytime by emailing ${brand.email}.`,
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    intro:
      "These terms govern your use of our store. (Demo terms — replace with your reviewed legal text before launch.)",
    sections: [
      {
        heading: "Orders",
        body: "All orders are subject to acceptance and availability. Prices are shown in USD and may change without notice.",
      },
      {
        heading: "Pro Club memberships",
        body: "Memberships renew automatically until cancelled. You can cancel anytime; benefits continue through the paid period.",
      },
      {
        heading: "Liability",
        body: "Use fishing tackle responsibly and follow all local regulations. We are not liable for misuse of our products.",
      },
    ],
  },
};
