import { useRef } from "react";
import { useSectionReveal } from "@/hooks/use-section-reveal";

const reasons = [
  {
    n: "01",
    title: "Locations chosen for growth",
    body: "Our sites sit within Abuja's consolidating districts — Lifecamp, Guzape, Gudu and Kaura — where infrastructure is already in place and demand outpaces supply.",
  },
  {
    n: "02",
    title: "Early-stage entry",
    body: "Pre-sale participation means positioning before completion, with structured payment plans agreed in writing rather than assumed.",
  },
  {
    n: "03",
    title: "One accountable team",
    body: "Design, construction and management are handled in-house, so specification is protected from brief to handover — and after it.",
  },
  {
    n: "04",
    title: "Value that is maintained",
    body: "Preventive maintenance, clear service-level agreements and quality equipment keep the asset — and its resale story — in good standing.",
  },
];

export function WhyInvest() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);
  return (
    <section ref={ref} id="why-invest" className="py-28 md:py-40 bg-ivory">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 mb-16 md:mb-20">
          <div className="md:col-span-4">
            <div data-reveal className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">
              004 — Why invest with Motiva
            </div>
          </div>
          <div className="md:col-span-8">
            <h2 data-reveal className="font-display text-[2.25rem] md:text-[3.5rem] leading-[1.05] tracking-[-0.02em] text-ink max-w-3xl">
              A considered position, not a speculative one.
            </h2>
            <p data-reveal className="mt-8 text-[14px] leading-relaxed text-ink/70 max-w-xl">
              We do not publish prices we cannot honour or dates we cannot hold. What we offer instead is a clear picture of each project, the terms in writing, and a team that answers in hours.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 border-t border-ink/15">
          {reasons.map((r, i) => (
            <div
              data-reveal
              key={r.n}
              className={`py-10 md:py-12 md:pr-10 border-b border-ink/15 ${
                i % 2 === 0 ? "md:border-r md:border-ink/15" : "md:pl-10"
              }`}
            >
              <div className="text-[11px] tracking-[0.35em] uppercase text-ink/40 mb-8">{r.n}</div>
              <h3 className="font-display text-2xl md:text-[1.75rem] leading-tight mb-4 text-ink">
                {r.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-ink/60 max-w-md">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
