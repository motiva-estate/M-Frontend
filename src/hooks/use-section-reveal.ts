import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(CustomEase, ScrollTrigger);

type Options = {
  selector?: string;
  y?: number;
  stagger?: number;
  duration?: number;
  start?: string;
};

/**
 * Cinematic scroll-triggered reveal for a section. Mark any descendant with
 * `data-reveal` and it will slide + fade in as the section enters the viewport.
 * Respects prefers-reduced-motion by snapping to final state.
 */
export function useSectionReveal(
  ref: RefObject<HTMLElement | null>,
  opts: Options = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      selector = "[data-reveal]",
      y = 32,
      stagger = 0.08,
      duration = 1,
      start = "top 78%",
    } = opts;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>(selector);
      if (targets.length === 0) return;

      if (reduced) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      if (!CustomEase.get("motiva-fade")) {
        CustomEase.create("motiva-fade", "M0,0 C0.4,0 0.2,1 1,1");
      }
      if (!CustomEase.get("motiva-rise")) {
        CustomEase.create("motiva-rise", "M0,0 C0.2,0.85 0.2,1 1,1");
      }

      gsap.set(targets, { y, opacity: 0, willChange: "transform, opacity" });

      gsap.to(targets, {
        y: 0,
        opacity: 1,
        duration,
        ease: "motiva-fade",
        stagger,
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [ref, opts.selector, opts.y, opts.stagger, opts.duration, opts.start]);
}
