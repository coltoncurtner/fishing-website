import { seededGradient } from "@/lib/utils";

/**
 * Branded placeholder imagery. Renders a premium gradient with a tackle
 * silhouette derived deterministically from a seed. Swap this component's
 * internals for <Image> when real product photography is available.
 */
export function ProductImage({
  seed,
  alt,
  category,
  className = "",
  priority = false,
}: {
  seed: string;
  alt: string;
  category?: string;
  className?: string;
  priority?: boolean;
}) {
  const g = seededGradient(seed);
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 70 Q 25 55 50 68 T 100 64 V100 H0 Z"
          fill={g.accent}
          opacity="0.5"
        />
        <path
          d="M0 80 Q 25 68 50 78 T 100 74 V100 H0 Z"
          fill="#ffffff"
          opacity="0.25"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <CategoryGlyph category={category} accent={g.accent} />
      </div>
      <span className="absolute bottom-2 right-3 text-[10px] font-semibold uppercase tracking-widest text-white/70">
        {category ?? "Salt & Stream"}
      </span>
    </div>
  );
}

function CategoryGlyph({
  category,
  accent,
}: {
  category?: string;
  accent: string;
}) {
  const common = {
    width: 72,
    height: 72,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#ffffff",
    strokeWidth: 1.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "drop-shadow",
    "aria-hidden": true,
  };
  switch (category) {
    case "hooks":
      return (
        <svg {...common}>
          <path d="M12 3v8a4 4 0 1 1-4-4" />
          <circle cx="12" cy="3" r="0.6" fill={accent} stroke={accent} />
        </svg>
      );
    case "weights":
      return (
        <svg {...common}>
          <path d="M8 7h8l2 12H6L8 7Z" />
          <path d="M10 7a2 2 0 0 1 4 0" />
        </svg>
      );
    case "apparel":
      return (
        <svg {...common}>
          <path d="M7 4 4 7l2 2 1-1v11h10V8l1 1 2-2-3-3-3 1a3 3 0 0 1-6 0L7 4Z" />
        </svg>
      );
    case "baits":
      return (
        <svg {...common}>
          <path d="M3 12c4-5 14-5 18 0-4 5-14 5-18 0Z" />
          <circle cx="16" cy="12" r="1" fill={accent} stroke={accent} />
          <path d="M3 12h-1" />
        </svg>
      );
    case "lures":
    default:
      return (
        <svg {...common}>
          <path d="M5 12c3-4 11-4 14 0-3 4-11 4-14 0Z" />
          <path d="M19 12l2-1m-2 1 2 1" />
          <circle cx="9" cy="12" r="1" fill={accent} stroke={accent} />
          <path d="M7 14l-1 3m4-2v3" />
        </svg>
      );
  }
}
