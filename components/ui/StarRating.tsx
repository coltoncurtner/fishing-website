import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  rating,
  reviewCount,
  size = "sm",
  className,
}: {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const px = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div
        className="flex"
        aria-label={`Rated ${rating} out of 5`}
        role="img"
      >
        {[0, 1, 2, 3, 4].map((i) => {
          const fill = Math.max(0, Math.min(1, rating - i));
          return (
            <span key={i} className="relative">
              <Star className={cn(px, "text-sand")} />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star className={cn(px, "fill-amber-400 text-amber-400")} />
              </span>
            </span>
          );
        })}
      </div>
      {reviewCount !== undefined && (
        <span
          className={cn(
            "text-ink/60",
            size === "sm" ? "text-xs" : "text-sm",
          )}
        >
          {rating.toFixed(1)} ({reviewCount})
        </span>
      )}
    </div>
  );
}
