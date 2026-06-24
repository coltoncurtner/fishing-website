import { seededGradient } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  seed = "page-hero",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  seed?: string;
}) {
  const g = seededGradient(seed);
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{ background: `linear-gradient(120deg, ${g.from}, ${g.to})` }}
    >
      <div className="bg-wave">
        <div className="container-page py-16 sm:py-20">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-kelp-light">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-lg text-white/75">{subtitle}</p>
          )}
        </div>
      </div>
    </section>
  );
}
