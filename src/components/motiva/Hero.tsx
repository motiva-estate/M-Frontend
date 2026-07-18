import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import heroPoster from "@/assets/motiva/hero.jpg";
import heroVideo from "@/assets/motiva/hero.mp4";

gsap.registerPlugin(CustomEase);

// Split a string into word > syllable spans for staggered reveal.
// Uses a lightweight rule-based syllable splitter (good enough for editorial copy).
function splitSyllables(word: string): string[] {
  const w = word.toLowerCase();
  const matches = w.match(/[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi);
  if (!matches || matches.length === 0) return [word];
  // Re-cast to original casing per-char
  const out: string[] = [];
  let cursor = 0;
  for (const m of matches) {
    out.push(word.slice(cursor, cursor + m.length));
    cursor += m.length;
  }
  if (cursor < word.length) out[out.length - 1] += word.slice(cursor);
  return out;
}

function SegmentedHeadline({ line }: { line: string }) {
  const words = line.split(" ");
  return (
    <>
      {words.map((word, wi) => {
        const syls = splitSyllables(word);
        return (
          <span
            key={wi}
            className="inline-block overflow-hidden align-bottom mr-[0.22em] last:mr-0"
            data-hero-word
          >
            <span className="inline-block whitespace-nowrap">
              {syls.map((s, si) => (
                <span
                  key={si}
                  data-hero-syl
                  className="inline-block will-change-transform"
                  style={{ transform: "translate3d(0, 110%, 0)" }}
                >
                  {s}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </>
  );
}

export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Editorial custom ease — a smooth, weighted decel curve
    const ease =
      CustomEase.create("motiva", "M0,0 C0.2,0.72 0.15,1 1,1") ||
      "power4.out";

    const ctx = gsap.context(() => {
      const syls = root.querySelectorAll<HTMLElement>("[data-hero-syl]");
      const meta = root.querySelectorAll<HTMLElement>("[data-hero-meta]");
      const body = root.querySelector<HTMLElement>("[data-hero-body]");
      const links = root.querySelectorAll<HTMLElement>("[data-hero-link]");
      const cue = root.querySelector<HTMLElement>("[data-hero-cue]");
      const veil = root.querySelector<HTMLElement>("[data-hero-veil]");

      gsap.set(meta, { yPercent: 100, opacity: 0 });
      gsap.set(body, { yPercent: 40, opacity: 0 });
      gsap.set(links, { yPercent: 60, opacity: 0 });
      gsap.set(cue, { opacity: 0, y: 10 });

      const tl = gsap.timeline({ defaults: { ease } });

      tl.to(veil, { opacity: 0.55, duration: 1.4, ease: "power2.out" }, 0)
        .to(
          meta,
          { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.08 },
          0.15,
        )
        .to(
          syls,
          {
            y: 0,
            transform: "translate3d(0,0,0)",
            duration: 1.15,
            stagger: { each: 0.045, from: "start" },
          },
          0.35,
        )
        .to(body, { yPercent: 0, opacity: 1, duration: 1 }, "-=0.55")
        .to(
          links,
          { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.09 },
          "-=0.75",
        )
        .to(cue, { opacity: 0.6, y: 0, duration: 0.8 }, "-=0.4");

      // Attempt to play video (autoplay policies)
      const v = videoRef.current;
      if (v) {
        const tryPlay = () => v.play().catch(() => {});
        if (v.readyState >= 2) tryPlay();
        else v.addEventListener("loadeddata", tryPlay, { once: true });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink text-ivory"
    >
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={heroVideo}
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/10 to-ink/70" />
        <div
          data-hero-veil
          className="absolute inset-0 bg-ink"
          style={{ opacity: 1 }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 md:px-10 h-[100svh] flex flex-col">
        {/* Top meta */}
        <div className="pt-28 md:pt-32 flex items-center justify-between text-[11px] tracking-[0.3em] uppercase text-ivory/70">
          <span className="inline-block overflow-hidden">
            <span data-hero-meta className="inline-block">Est. 2010</span>
          </span>
          <span className="hidden md:inline-block overflow-hidden">
            <span data-hero-meta className="inline-block">
              Integrated Real-Estate Solutions
            </span>
          </span>
          <span className="hidden md:inline-block overflow-hidden">
            <span data-hero-meta className="inline-block">Lagos · Abuja</span>
          </span>
        </div>

        {/* Headline */}
        <div className="mt-auto pb-20 md:pb-28 max-w-6xl">
          <h1
            className="font-display font-light leading-[0.95] tracking-[-0.025em] text-ivory"
            style={{ fontSize: "clamp(2.75rem, 7.6vw, 7.5rem)" }}
          >
            <span className="block">
              <SegmentedHeadline line="Motiva — a fully integrated" />
            </span>
            <span className="block">
              <SegmentedHeadline line="real-estate practice." />
            </span>
          </h1>
          <p className="sr-only">
            Fully integrated real-estate solutions across Lagos and Abuja since
            2010 — development, advisory, property and facilities management,
            project delivery and brokerage.
          </p>

          <div className="mt-12 md:mt-16 grid md:grid-cols-12 gap-10 items-end">
            <p
              data-hero-body
              className="md:col-span-5 leading-relaxed text-ivory/80 max-w-md"
              style={{ fontSize: "clamp(0.95rem, 1.05vw, 1.0625rem)" }}
            >
              Since 2010, Motiva has quietly built, managed and advised on
              residences for private clients, corporations and the public
              sector — one integrated team, one standard of care.
            </p>

            <div className="md:col-span-4 md:col-start-9 flex flex-col gap-4">
              <a
                data-hero-link
                href="#residences"
                className="inline-flex items-center justify-between gap-6 border-b border-ivory/40 pb-3 text-sm tracking-wide hover:border-ivory transition-colors"
              >
                <span>Explore the residences</span>
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
              </a>
              <a
                data-hero-link
                href="#about"
                className="inline-flex items-center justify-between gap-6 border-b border-ivory/40 pb-3 text-sm tracking-wide hover:border-ivory transition-colors"
              >
                <span>Inside the studio</span>
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        data-hero-cue
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] uppercase text-ivory/50"
      >
        Scroll
      </div>
    </section>
  );
}
