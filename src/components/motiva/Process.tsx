import { useRef } from "react";
import { useSectionReveal } from "@/hooks/use-section-reveal";

const steps = [
  { n: "I", t: "Discover", d: "Briefs, site walks and the honest conversations that decide what a project is really being asked to become." },
  { n: "II", t: "Design", d: "In-house drawings, material samples and specifications shaped around the client's unique needs and the site's constraints." },
  { n: "III", t: "Deliver", d: "Directly-managed construction and project management — one point of contact, one schedule, one standard, held to a written SLA." },
  { n: "IV", t: "Steward", d: "Property and facilities management with preventive maintenance and hour-scale response, so the building and its systems age well." },
];

export function Process() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);
  return (
    <section ref={ref} id="process" className="py-28 md:py-40 bg-ivory">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 mb-20">
          <div className="md:col-span-4">
            <div data-reveal className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">
              008 — The Method
            </div>
          </div>
          <div className="md:col-span-8">
            <h2 data-reveal className="font-display text-[2.25rem] md:text-[3.5rem] leading-[1.05] tracking-[-0.02em] text-ink max-w-3xl">
              Four movements, one composition.
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-10 md:gap-6 border-t border-ink/15 pt-14">
          {steps.map((s) => (
            <div data-reveal key={s.n} className="md:pr-6">
              <div className="font-display text-4xl text-ink/30 mb-8">
                {s.n}
              </div>
              <h3 className="font-display text-xl md:text-2xl text-ink mb-3">
                {s.t}
              </h3>
              <p className="text-[13px] text-ink/60 leading-relaxed max-w-xs">
                {s.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
