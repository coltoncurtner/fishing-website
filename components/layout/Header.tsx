"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingBag, Menu, X, Leaf } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useCart } from "@/lib/cart-store";
import { CATEGORY_LABELS } from "@/lib/utils";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Shop All", href: "/shop" },
  { label: "Lures", href: "/shop/lures" },
  { label: "Baits", href: "/shop/baits" },
  { label: "Weights", href: "/shop/weights", eco: true },
  { label: "Hooks", href: "/shop/hooks", eco: true },
  { label: "Apparel", href: "/shop/apparel" },
];

export function Header() {
  const count = useCart((s) =>
    s.items.reduce((n, i) => n + i.quantity, 0),
  );
  const openCart = useCart((s) => s.openCart);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-deep text-white">
        <div className="container-page flex h-9 items-center justify-center gap-2 text-center text-xs font-medium sm:text-[13px]">
          <Leaf className="h-3.5 w-3.5 text-kelp-light" />
          <span>
            100% lead-free tackle · Free shipping over $
            {brand.freeShippingThreshold} · 30-day returns
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-sand bg-shell/90 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              className="-ml-2 p-2 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6 text-deep" />
            </button>
            <Logo />
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative rounded-full px-3 py-2 text-sm font-semibold text-ink/80 transition hover:text-deep"
              >
                <span className="inline-flex items-center gap-1">
                  {item.label}
                  {item.eco && (
                    <Leaf className="h-3.5 w-3.5 text-kelp" aria-hidden />
                  )}
                </span>
              </Link>
            ))}
            <Link
              href="/pro-club"
              className="ml-1 rounded-full bg-kelp/15 px-3 py-2 text-sm font-bold text-kelp-dark transition hover:bg-kelp/25"
            >
              Pro Club
            </Link>
          </nav>

          <div className="flex items-center gap-1">
            <Link
              href="/search"
              className="p-2 text-deep hover:text-tide"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Link>
            <button
              onClick={openCart}
              className="relative p-2 text-deep hover:text-tide"
              aria-label={`Cart with ${count} items`}
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-kelp text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-deep/40 transition-opacity",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-80 max-w-[85%] bg-shell shadow-lift transition-transform",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-sand p-4">
            <Logo />
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="p-2"
            >
              <X className="h-6 w-6 text-deep" />
            </button>
          </div>
          <nav className="flex flex-col p-2">
            <MobileLink href="/shop" onClick={() => setMobileOpen(false)}>
              Shop All
            </MobileLink>
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <MobileLink
                key={key}
                href={`/shop/${key}`}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </MobileLink>
            ))}
            <MobileLink href="/pro-club" onClick={() => setMobileOpen(false)}>
              Pro Club
            </MobileLink>
            <MobileLink href="/eco" onClick={() => setMobileOpen(false)}>
              Our Lead-Free Mission
            </MobileLink>
          </nav>
        </div>
      </div>
    </>
  );
}

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-xl px-4 py-3 text-base font-semibold text-deep hover:bg-deep/5"
    >
      {children}
    </Link>
  );
}
