import { useEffect } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(CustomEase, ScrollTrigger);

/**
 * Page-wide cinematic reveal. Animates every <section> and its children
 * (headings, paragraphs, figures, list items, articles, cards) into view
 * on scroll. Respects prefers-reduced-motion. Safe to call once per page.
 */
export function usePageReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    if (!CustomEase.get("motiva-fade")) {
      CustomEase.create("motiva-fade", "M0,0 C0.4,0 0.2,1 1,1");
    }

    const ctx = gsap.context(() => {
      // Hero / page header: rise on load
      const header = document.querySelector<HTMLElement>("main > section:first-of-type");
      if (header) {
        const heroTargets = header.querySelectorAll<HTMLElement>(
          "h1, h2, p, nav, [data-hero]"
        );
        if (heroTargets.length) {
          gsap.from(heroTargets, {
            y: 36,
            opacity: 0,
            duration: 1.1,
            ease: "motiva-fade",
            stagger: 0.08,
          });
        }
      }

      // Subsequent sections: reveal on scroll
      const sections = gsap.utils.toArray<HTMLElement>("main > section");
      sections.forEach((section, idx) => {
        if (idx === 0) return; // skip hero (already animated)
        const targets = section.querySelectorAll<HTMLElement>(
          "h1, h2, h3, p, figure, img, li, article, [data-reveal], .reveal-item"
        );
        if (!targets.length) return;
        gsap.set(targets, { y: 32, opacity: 0, willChange: "transform, opacity" });
        gsap.to(targets, {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: "motiva-fade",
          stagger: 0.06,
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);
}
