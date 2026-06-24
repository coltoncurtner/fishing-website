import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "eco" | "sale" | "new" | "dark";
  className?: string;
}) {
  const tones = {
    neutral: "bg-sand text-deep",
    eco: "bg-kelp/15 text-kelp-dark",
    sale: "bg-red-100 text-red-700",
    new: "bg-tide/15 text-tide",
    dark: "bg-deep text-white",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function EcoBadge({
  label = "Lead-Free",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <Badge tone="eco" className={className}>
      <Leaf className="h-3 w-3" /> {label}
    </Badge>
  );
}
