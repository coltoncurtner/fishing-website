import type { Metadata } from "next";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/marketing/ContactForm";
import { pageMetadata } from "@/lib/seo";
import { brand } from "@/lib/brand";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Get in touch with the ${brand.name} crew. We're here to help you fish lead-free.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="We're here to help"
        title="Get in touch"
        subtitle="Questions about gear, an order, or going lead-free? We answer fast."
        seed="contact-hero"
      />
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          <ContactCard icon={<Mail className="h-5 w-5" />} title="Email">
            <a href={`mailto:${brand.email}`} className="hover:text-tide">
              {brand.email}
            </a>
          </ContactCard>
          <ContactCard icon={<Phone className="h-5 w-5" />} title="Phone">
            {brand.phone}
          </ContactCard>
          <ContactCard
            icon={<MessageCircle className="h-5 w-5" />}
            title="Hours"
          >
            Mon–Fri, 8am–6pm ET
          </ContactCard>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
          <ContactForm />
        </div>
      </div>
    </>
  );
}

function ContactCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card">
      <span className="grid h-11 w-11 place-items-center rounded-full bg-kelp/10 text-kelp-dark">
        {icon}
      </span>
      <div>
        <p className="text-sm font-bold text-deep">{title}</p>
        <p className="text-sm text-ink/65">{children}</p>
      </div>
    </div>
  );
}
