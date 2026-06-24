import type { Metadata } from "next";
import { brand } from "@/lib/brand";

export function pageMetadata({
  title,
  description,
  path = "/",
}: {
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${brand.name}` : brand.name;
  const desc = description ?? brand.description;
  const url = `${brand.url}${path}`;
  return {
    title: fullTitle,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: brand.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
    },
  };
}
