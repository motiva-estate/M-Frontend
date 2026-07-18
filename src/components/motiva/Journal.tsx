import g2 from "@/assets/motiva/gallery-2.jpg";
import g3 from "@/assets/motiva/gallery-3.jpg";
import g4 from "@/assets/motiva/gallery-4.jpg";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { useSectionReveal } from "@/hooks/use-section-reveal";

const posts = [
  {
    img: g4,
    tag: "Field notes",
    date: "March 2026",
    title: "How a ridge decides a floor plan",
    read: "6 min",
  },
  {
    img: g3,
    tag: "Materials",
    date: "February 2026",
    title: "Why our kitchens begin with stone",
    read: "4 min",
  },
  {
    img: g2,
    tag: "Studio",
    date: "January 2026",
    title: "The quiet return of the staircase",
    read: "8 min",
  },
];

export function Journal() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  return (
    <section ref={ref} id="journal" className="py-28 md:py-40 bg-ivory">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 items-end mb-20">
          <div className="md:col-span-8">
            <div data-reveal className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">
              007 — The Journal
            </div>
            <h2 data-reveal className="font-display text-[2.5rem] md:text-[4rem] leading-[1] tracking-[-0.02em] text-ink">
              Slow reading, from the studio.
            </h2>
          </div>
          <a data-reveal href="#" className="md:col-span-4 md:justify-self-end inline-flex items-center gap-3 text-sm text-ink border-b border-ink/40 pb-2 hover:border-ink transition-colors w-fit">
            All entries
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-x-8 gap-y-12">
          {posts.map((p) => (
            <a data-reveal key={p.title} href="#" className="group block">
              <div className="aspect-[4/5] overflow-hidden bg-mist mb-6">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-ink/50 mb-4">
                <span>{p.tag}</span>
                <span className="h-px w-4 bg-ink/20" />
                <span>{p.date}</span>
                <span className="h-px w-4 bg-ink/20" />
                <span>{p.read}</span>
              </div>
              <h3 className="font-display text-xl md:text-[1.5rem] leading-snug text-ink group-hover:text-ink/70 transition-colors">
                {p.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
