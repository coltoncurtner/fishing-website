import Link from "next/link";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const text = tone === "light" ? "text-white" : "text-deep";
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label={`${brand.name} home`}
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-deep text-white transition-transform group-hover:scale-105">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          {/* wave */}
          <path
            d="M3 14c2.5-2.5 5-2.5 7.5 0s5 2.5 7.5 0"
            stroke="#5CC06B"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* hook */}
          <path
            d="M12 4v6.5a3 3 0 1 1-3-3"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="4" r="1" fill="#5CC06B" />
        </svg>
      </span>
      <span
        className={cn(
          "font-display text-lg font-extrabold leading-none tracking-tight",
          text,
        )}
      >
        {brand.name}
      </span>
    </Link>
  );
}
