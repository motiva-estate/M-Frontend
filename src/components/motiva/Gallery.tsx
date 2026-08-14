import { useRef } from "react";
import { useSectionReveal } from "@/hooks/use-section-reveal";
import g1 from "@/assets/motiva/gallery-1.jpg";
import g2 from "@/assets/motiva/gallery-2.jpg";
import g3 from "@/assets/motiva/gallery-3.jpg";
import g4 from "@/assets/motiva/gallery-4.jpg";
import g5 from "@/assets/motiva/gallery-5.jpg";
import g6 from "@/assets/motiva/gallery-6.jpg";
import { ArrowUpRight } from "lucide-react";

const items = [
  { img: g5, tag: "Exterior", title: "Mira House", span: "md:col-span-8 aspect-[16/10]" },
  { img: g1, tag: "Interior", title: "The Bath, Aerie", span: "md:col-span-4 aspect-[4/5]" },
  { img: g3, tag: "Kitchen", title: "Solano Kitchen", span: "md:col-span-4 aspect-[4/5]" },
  { img: g2, tag: "Staircase", title: "Kestrel Ascent", span: "md:col-span-4 aspect-[4/5]" },
  { img: g4, tag: "Bedroom", title: "Ridge Suite", span: "md:col-span-4 aspect-[4/5]" },
  { img: g6, tag: "Dining", title: "Solano Table", span: "md:col-span-12 aspect-[21/9]" },
];

export function Gallery() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  return (
    <section ref={ref} className="py-28 md:py-40 bg-mist">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 items-end mb-20">
          <div className="md:col-span-8">
            <div data-reveal className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">
              009 — Recent Works
            </div>
            <h2 data-reveal className="font-display text-[2.5rem] md:text-[4rem] leading-[1] tracking-[-0.02em] text-ink">
              Fragments from<br />the last season.
            </h2>
          </div>
          <a data-reveal href="#" className="md:col-span-4 md:justify-self-end inline-flex items-center gap-3 text-sm text-ink border-b border-ink/40 pb-2 hover:border-ink transition-colors w-fit">
            Request the monograph
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {items.map((it, i) => (
            <figure
              data-reveal
              key={i}
              className={`group relative overflow-hidden bg-ink ${it.span}`}
            >
              <img
                src={it.img}
                alt={it.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
              />
              <figcaption className="absolute inset-x-6 bottom-6 flex items-end justify-between text-ivory">
                <div>
                  <div className="text-[10px] tracking-[0.35em] uppercase text-ivory/70 mb-1">
                    {it.tag}
                  </div>
                  <div className="font-display text-lg md:text-xl">
                    {it.title}
                  </div>
                </div>
              </figcaption>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
