import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data/membership";
import { StarRating } from "@/components/ui/StarRating";

export function Testimonials() {
  return (
    <section className="bg-sand/40 py-16">
      <div className="container-page">
        <div className="text-center">
          <p className="eyebrow">From the water</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-deep sm:text-4xl">
            Anglers who made the switch
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-card"
            >
              <Quote className="h-6 w-6 text-kelp/40" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink/80">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 border-t border-sand pt-4">
                <StarRating rating={t.rating} />
                <p className="mt-2 text-sm font-bold text-deep">{t.name}</p>
                <p className="text-xs text-ink/55">{t.location}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
