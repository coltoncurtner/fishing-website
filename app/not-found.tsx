import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="font-display text-6xl font-extrabold text-deep">404</p>
      <h1 className="font-display text-2xl font-bold text-deep">
        This one got off the hook
      </h1>
      <p className="max-w-md text-ink/65">
        We couldn&apos;t find that page. Let&apos;s get you back to the tackle.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" size="lg">
          Back home
        </ButtonLink>
        <ButtonLink href="/shop" variant="outline" size="lg">
          Shop all tackle
        </ButtonLink>
      </div>
    </div>
  );
}
