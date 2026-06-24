import type { Metadata } from "next";
import "./globals.css";
import { brand } from "@/lib/brand";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/commerce/CartDrawer";

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.name} — Lead-Free Fishing Tackle`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  keywords: [
    "lead-free fishing weights",
    "non-toxic fishing tackle",
    "eco-friendly lures",
    "saltwater fishing gear",
    "freshwater bass tackle",
    "tungsten worm weights",
    "circle hooks",
  ],
  openGraph: {
    title: `${brand.name} — Lead-Free Fishing Tackle`,
    description: brand.description,
    siteName: brand.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: brand.name,
              url: brand.url,
              description: brand.description,
              email: brand.email,
            }),
          }}
        />
      </head>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
