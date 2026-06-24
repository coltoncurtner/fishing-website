import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { legalDocs } from "@/app/legal/legal-content";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return Object.keys(legalDocs).map((doc) => ({ doc }));
}

export function generateMetadata({
  params,
}: {
  params: { doc: string };
}): Metadata {
  const doc = legalDocs[params.doc];
  if (!doc) return {};
  return pageMetadata({
    title: doc.title,
    description: doc.intro,
    path: `/legal/${params.doc}`,
  });
}

export default function LegalPage({ params }: { params: { doc: string } }) {
  const doc = legalDocs[params.doc];
  if (!doc) notFound();

  return (
    <>
      <PageHero eyebrow="Legal" title={doc.title} seed={`legal-${params.doc}`} />
      <article className="container-page max-w-3xl py-12">
        <p className="text-lg text-ink/75">{doc.intro}</p>
        <div className="mt-8 space-y-8">
          {doc.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-xl font-bold text-deep">
                {s.heading}
              </h2>
              <p className="mt-2 leading-relaxed text-ink/75">{s.body}</p>
            </section>
          ))}
        </div>
        <p className="mt-10 text-sm text-ink/45">
          Last updated: {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </article>
    </>
  );
}
