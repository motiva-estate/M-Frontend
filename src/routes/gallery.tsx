import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Nav } from "@/components/motiva/Nav";
import { Footer } from "@/components/motiva/Footer";
import { WhatsAppBubble } from "@/components/motiva/WhatsAppBubble";
import { PageHeader } from "@/components/motiva/PageHeader";
import { useMemo, useState } from "react";
import { galleryItemsQueryOptions } from "@/lib/sanity/queries";
import { resolveImage } from "@/lib/sanity/image";
import { galleryImage } from "@/lib/sanity/fallbacks";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Motiva Real Estate" },
      { name: "description", content: "Fragments from the last season — interiors, exteriors, kitchens, and details from Motiva's residential portfolio." },
      { property: "og:title", content: "Gallery — Motiva Real Estate" },
      { property: "og:description", content: "Interiors, exteriors, kitchens, and details from Motiva's residential portfolio." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(galleryItemsQueryOptions),
  component: GalleryPage,
});

// Give items visual variety while keeping content data-driven.
const SPANS = [
  "md:col-span-8 aspect-[16/10]",
  "md:col-span-4 aspect-[4/5]",
  "md:col-span-4 aspect-[4/5]",
  "md:col-span-4 aspect-[4/5]",
  "md:col-span-4 aspect-[4/5]",
  "md:col-span-12 aspect-[21/9]",
  "md:col-span-6 aspect-[4/3]",
  "md:col-span-6 aspect-[4/3]",
  "md:col-span-4 aspect-[4/5]",
];

function GalleryPage() {
  const { data: items } = useSuspenseQuery(galleryItemsQueryOptions);
  const cats = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => i.category && set.add(i.category));
    return ["All", ...Array.from(set)];
  }, [items]);
  const [cat, setCat] = useState<string>("All");
  const shown = cat === "All" ? items : items.filter((i) => i.category === cat);

  return (
    <div className="bg-ivory text-ink min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <PageHeader
          eyebrow="006 — The Gallery"
          title={<>Residential project<br />gallery.</>}
          intro="Interiors, exteriors, and details from residences delivered across Lagos, Abuja, and Port Harcourt."
          crumbs={[{ label: "Motiva", to: "/" }, { label: "Gallery" }]}
        />

        <div className="mx-auto max-w-[1500px] px-6 md:px-10 mt-4 mb-10 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-1.5 rounded-full text-[12px] tracking-wide border transition-colors ${
                cat === c ? "bg-ink text-ivory border-ink" : "border-ink/15 text-ink/60 hover:text-ink hover:border-ink/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <section className="pb-24">
          <div className="mx-auto max-w-[1500px] px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {shown.map((it, i) => {
                const src = galleryImage(it.caption, resolveImage(it.image) ?? it.url);
                const span = SPANS[i % SPANS.length];
                return (
                  <figure key={it._id} className={`group relative overflow-hidden bg-ink ${span}`}>
                    <img src={src} alt={it.caption ?? "Motiva gallery"} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]" />
                    <figcaption className="absolute inset-x-6 bottom-6 text-ivory">
                      {it.category && (
                        <div className="text-[10px] tracking-[0.35em] uppercase text-ivory/70 mb-1">{it.category}</div>
                      )}
                      {it.caption && (
                        <div className="font-display text-lg md:text-xl">{it.caption}</div>
                      )}
                    </figcaption>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                  </figure>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppBubble />
    </div>
  );
}
