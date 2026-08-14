import { useRef } from "react";
import { useSectionReveal } from "@/hooks/use-section-reveal";

const pillars = [
  {
    n: "01",
    title: "Integrated practice",
    body: "Development, advisory, management and brokerage under one roof — so nothing gets lost in the handover between teams.",
  },
  {
    n: "02",
    title: "Attention to detail",
    body: "We plan for the small things — the joinery, the specification, the service-level agreement — because they are what a client actually lives with.",
  },
  {
    n: "03",
    title: "Rapid response",
    body: "Requests and maintenance needs are attended to within hours, not weeks. Our engineers and technicians are on standby, not on retainer.",
  },
  {
    n: "04",
    title: "Enduring value",
    body: "Preventive maintenance, best-in-class equipment and clear SLAs — so the building, its systems and its resale story all age well.",
  },
];

export function Pillars() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);
  return (
    <section ref={ref} className="relative py-28 md:py-40 bg-ink text-ivory">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 mb-20 md:mb-28">
          <div className="md:col-span-4">
            <div data-reveal className="text-[10px] tracking-[0.4em] uppercase text-ivory/50 mb-6">
              007 — Principles
            </div>
          </div>
          <div className="md:col-span-8">
            <h2 data-reveal className="font-display text-[2.25rem] md:text-[3.5rem] leading-[1.05] tracking-[-0.02em] text-ivory max-w-3xl">
              The difference is how quietly we deliver it.
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 border-t border-ivory/15">
          {pillars.map((p, i) => (
            <div
              data-reveal
              key={p.n}
              className={`py-10 md:py-12 md:pr-8 border-b border-ivory/15 ${
                i < 3 ? "lg:border-r lg:border-ivory/15" : ""
              } ${i === 0 ? "" : "md:pl-0 lg:pl-8"}`}
            >
              <div data-reveal className="text-[11px] tracking-[0.35em] uppercase text-ivory/40 mb-8">
                {p.n}
              </div>
              <h3 data-reveal className="font-display text-2xl md:text-[1.75rem] leading-tight mb-4 text-ivory">
                {p.title}
              </h3>
              <p data-reveal className="text-[13px] leading-relaxed text-ivory/60 max-w-xs">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
