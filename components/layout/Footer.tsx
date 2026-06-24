import Link from "next/link";
import { Instagram, Youtube, Facebook, Leaf } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { brand } from "@/lib/brand";
import { NewsletterSignup } from "@/components/marketing/NewsletterSignup";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "Lures", href: "/shop/lures" },
      { label: "Baits", href: "/shop/baits" },
      { label: "Lead-Free Weights", href: "/shop/weights" },
      { label: "Hooks", href: "/shop/hooks" },
      { label: "Apparel", href: "/shop/apparel" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Pro Club", href: "/pro-club" },
      { label: "Our Lead-Free Mission", href: "/eco" },
      { label: "Saltwater Starter Kit", href: "/collections/saltwater-starter" },
      { label: "Freshwater Bass Box", href: "/collections/freshwater-bass-box" },
      { label: "About Us", href: "/about" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Shipping", href: "/legal/shipping" },
      { label: "Returns", href: "/legal/returns" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-deep text-white">
      <div className="bg-wave">
        <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              {brand.mission}
            </p>
            <NewsletterSignup />
            <div className="mt-6 flex gap-3">
              <SocialIcon href={brand.social.instagram} label="Instagram">
                <Instagram className="h-5 w-5" />
              </SocialIcon>
              <SocialIcon href={brand.social.youtube} label="YouTube">
                <Youtube className="h-5 w-5" />
              </SocialIcon>
              <SocialIcon href={brand.social.facebook} label="Facebook">
                <Facebook className="h-5 w-5" />
              </SocialIcon>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-bold uppercase tracking-wide text-white/90">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-white/65 transition hover:text-kelp-light"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1.5">
            <Leaf className="h-3.5 w-3.5 text-kelp-light" />
            Proudly 100% lead-free since day one.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-kelp"
    >
      {children}
    </a>
  );
}
