import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/motiva/Nav";
import { Footer } from "@/components/motiva/Footer";
import { WhatsAppBubble } from "@/components/motiva/WhatsAppBubble";
import { PageHeader } from "@/components/motiva/PageHeader";
import { useState } from "react";
import g1 from "@/assets/motiva/gallery-1.jpg";
import g2 from "@/assets/motiva/gallery-2.jpg";
import g3 from "@/assets/motiva/gallery-3.jpg";
import g4 from "@/assets/motiva/gallery-4.jpg";
import g5 from "@/assets/motiva/gallery-5.jpg";
import g6 from "@/assets/motiva/gallery-6.jpg";
import r1 from "@/assets/motiva/residence-1.jpg";
import r2 from "@/assets/motiva/residence-2.jpg";
import r3 from "@/assets/motiva/residence-3.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Motiva Real Estate" },
      { name: "description", content: "Fragments from the last season — interiors, exteriors, kitchens, and details from Motiva's residential portfolio." },
      { property: "og:title", content: "Gallery — Motiva Real Estate" },
      { property: "og:description", content: "Interiors, exteriors, kitchens, and details from Motiva's residential portfolio." },
    ],
  }),
  component: GalleryPage,
});

type Cat = "All" | "Exterior" | "Interior" | "Kitchen" | "Bedroom" | "Detail";
const items: { img: string; tag: Cat; title: string; span: string }[] = [
  { img: r1, tag: "Exterior", title: "Casa Solano — façade", span: "md:col-span-8 aspect-[16/10]" },
  { img: g1, tag: "Interior", title: "Aerie — the great room", span: "md:col-span-4 aspect-[4/5]" },
  { img: g3, tag: "Kitchen", title: "Solano kitchen", span: "md:col-span-4 aspect-[4/5]" },
  { img: r2, tag: "Exterior", title: "Kestrel Lodge", span: "md:col-span-4 aspect-[4/5]" },
  { img: g4, tag: "Bedroom", title: "Ridge Suite", span: "md:col-span-4 aspect-[4/5]" },
  { img: g6, tag: "Interior", title: "Solano table", span: "md:col-span-12 aspect-[21/9]" },
  { img: r3, tag: "Exterior", title: "Aerie House at dusk", span: "md:col-span-6 aspect-[4/3]" },
  { img: g5, tag: "Exterior", title: "Mira pavilion", span: "md:col-span-6 aspect-[4/3]" },
  { img: g2, tag: "Detail", title: "Kestrel ascent", span: "md:col-span-4 aspect-[4/5]" },
];

const cats: Cat[] = ["All", "Exterior", "Interior", "Kitchen", "Bedroom", "Detail"];

function GalleryPage() {
  const [cat, setCat] = useState<Cat>("All");
  const shown = cat === "All" ? items : items.filter((i) => i.tag === cat);

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
              {shown.map((it, i) => (
                <figure key={i} className={`group relative overflow-hidden bg-ink ${it.span}`}>
                  <img src={it.img} alt={it.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]" />
                  <figcaption className="absolute inset-x-6 bottom-6 text-ivory">
                    <div className="text-[10px] tracking-[0.35em] uppercase text-ivory/70 mb-1">{it.tag}</div>
                    <div className="font-display text-lg md:text-xl">{it.title}</div>
                  </figcaption>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppBubble />
    </div>
  );
}
