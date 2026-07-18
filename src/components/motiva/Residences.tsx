import r1 from "@/assets/motiva/residence-1.jpg";
import r2 from "@/assets/motiva/residence-2.jpg";
import r3 from "@/assets/motiva/residence-3.jpg";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { useSectionReveal } from "@/hooks/use-section-reveal";

const residences = [
  {
    img: r1,
    name: "Casa Solano",
    page: "/projects/casa-solano",
    location: "Ikoyi, Lagos",
    year: "2025",
    meta: "4 bd · 5 ba · 5,400 sqft",
  },
  {
    img: r2,
    name: "Kestrel Lodge",
    page: "/projects/kestrel-lodge",
    location: "Katampe, Abuja",
    year: "2024",
    meta: "3 bd · 4 ba · 4,100 sqft",
  },
  {
    img: r3,
    name: "Aerie House",
    page: "/projects/aerie-house",
    location: "Old GRA, Port Harcourt",
    year: "2024",
    meta: "5 bd · 6 ba · 8,200 sqft",
  },
];

export function Residences() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);
  return (
    <section ref={ref} id="residences" className="relative py-28 md:py-40 bg-mist">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 items-end mb-20">
          <div className="md:col-span-8">
            <div data-reveal className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">
              003 — Signature Residences
            </div>
            <h2 data-reveal className="font-display text-[2.5rem] md:text-[4rem] lg:text-[5rem] leading-[1] tracking-[-0.02em] text-ink">
              A quiet collection,<br />composed for the few.
            </h2>
          </div>
          <a
            data-reveal
            href="/projects"
            className="md:col-span-4 md:justify-self-end inline-flex items-center gap-3 text-sm tracking-wide text-ink border-b border-ink/40 pb-2 hover:border-ink transition-colors w-fit"
          >
            View the full portfolio
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-x-8 gap-y-16">
          {residences.map((r, i) => (
            <a
              data-reveal
              key={r.name}
              href={r.page}
              className={`group block ${i === 1 ? "md:mt-16" : ""}`}
            >
              <div className="aspect-[4/5] overflow-hidden bg-ink">
                <img
                  src={r.img}
                  alt={r.name}
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <div className="text-[10px] tracking-[0.35em] uppercase text-ink/50 mb-3">
                    {r.location} · {r.year}
                  </div>
                  <h3 className="font-display text-2xl md:text-[1.75rem] text-ink leading-tight">
                    {r.name}
                  </h3>
                  <div className="mt-2 text-[13px] text-ink/60">{r.meta}</div>
                </div>
                <ArrowUpRight
                  className="h-5 w-5 text-ink/50 group-hover:text-ink transition-colors shrink-0 mt-1"
                  strokeWidth={1.25}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
