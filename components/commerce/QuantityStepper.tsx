"use client";

import { Minus, Plus } from "lucide-react";

export function QuantityStepper({
  value,
  onChange,
  size = "md",
}: {
  value: number;
  onChange: (v: number) => void;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-8" : "h-11";
  const btn = size === "sm" ? "w-8" : "w-11";
  return (
    <div
      className={`inline-flex items-center rounded-full border border-sand bg-white ${dim}`}
    >
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className={`grid ${btn} h-full place-items-center text-deep hover:text-tide disabled:opacity-40`}
        aria-label="Decrease quantity"
        disabled={value <= 1}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span
        className="min-w-[2ch] text-center text-sm font-semibold tabular-nums"
        aria-live="polite"
      >
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className={`grid ${btn} h-full place-items-center text-deep hover:text-tide`}
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
