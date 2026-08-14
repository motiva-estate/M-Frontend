import { useRef } from "react";
import { useSectionReveal } from "@/hooks/use-section-reveal";

const ADDRESS = "5 OP Fingesi Street, Utako, Abuja";
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

export function OfficeMap() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);
  return (
    <section ref={ref} id="office" className="py-28 md:py-40 bg-mist">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <div data-reveal className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-8">
              012 — Our Office
            </div>
            <h2 data-reveal className="font-display text-[2rem] md:text-[2.75rem] leading-[1.1] tracking-[-0.02em] text-ink">
              Visit us in Utako.
            </h2>
            <div data-reveal className="mt-8 text-[14px] leading-relaxed text-ink/70">
              5 OP Fingesi Street,
              <br />
              Utako, Abuja
            </div>
            <a
              data-reveal
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block text-[13px] tracking-wide text-ink border-b border-ink/40 pb-0.5 hover:border-ink transition-colors"
            >
              Get directions
            </a>
          </div>

          <div data-reveal className="md:col-span-8">
            <div className="aspect-[16/10] overflow-hidden border border-ink/10">
              <iframe
                title={`Map of Motiva Estate Company office at ${ADDRESS}`}
                src={MAP_SRC}
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full grayscale-[0.35]"
                style={{ border: 0 }}
              />
            </div>
            <div className="mt-4 flex justify-between text-[11px] tracking-[0.3em] uppercase text-ink/50">
              <span>Head office — Utako</span>
              <span>Abuja, NG</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
