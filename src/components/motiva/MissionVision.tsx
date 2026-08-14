import { useRef } from "react";
import { useSectionReveal } from "@/hooks/use-section-reveal";

export function MissionVision() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);
  return (
    <section ref={ref} id="mission" className="py-24 md:py-32 bg-mist">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div data-reveal className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-12">
          003 — Mission &amp; Vision
        </div>
        <div className="grid md:grid-cols-12 gap-10">
          <div data-reveal className="md:col-span-6 border-t border-ink/15 pt-8">
            <div className="text-[10px] tracking-[0.3em] uppercase text-gilt mb-4">Mission</div>
            <p className="font-display text-[1.5rem] md:text-[2rem] leading-[1.25] text-ink">
              To provide the best fully integrated real-estate solutions in line with the utmost interest of our clients — with human capital and modern technology working seamlessly, so every client receives value.
            </p>
          </div>
          <div data-reveal className="md:col-span-6 border-t border-ink/15 pt-8">
            <div className="text-[10px] tracking-[0.3em] uppercase text-gilt mb-4">Vision</div>
            <p className="font-display text-[1.5rem] md:text-[2rem] leading-[1.25] text-ink">
              To be a foremost player in the real-estate industry, noted for unmatched quality of service delivery to our clients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
