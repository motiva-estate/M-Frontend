import { useEffect, useRef, useState } from "react";

type Quote = {
  text: string;
  name: string;
  residence: string;
};

const QUOTES: Quote[] = [
  {
    text: "Motiva didn't sell us a house. They listened for a year, then drew the one we didn't know how to describe.",
    name: "Elena Söderberg",
    residence: "Owner, Saoirse Villa",
  },
  {
    text: "Every detail was considered before we ever asked. The house arrived already knowing us.",
    name: "Adaeze Okonkwo",
    residence: "Owner, Harmony Terraces",
  },
  {
    text: "Two years in and nothing has aged. That is the quietest luxury I know.",
    name: "Tunde Bakare",
    residence: "Owner, Linea Row",
  },
  {
    text: "We came for the address. We stayed for the way they still answer the phone.",
    name: "Ngozi & Femi Adeyemi",
    residence: "Owners, Ember Court",
  },
];

const INTERVAL_MS = 6000;
const MORPH_MS = 700;

export function Testimonial() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    timerRef.current = window.setTimeout(() => {
      setI((n) => (n + 1) % QUOTES.length);
    }, INTERVAL_MS);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [i, paused, reducedMotion]);

  const goTo = (n: number) => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setI(n);
  };

  return (
    <section className="py-28 md:py-40 bg-ivory border-y border-ink/10">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-16 text-center">
          In the words of an owner
        </div>

        <div
          className="relative mx-auto max-w-4xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          aria-live="polite"
        >
          {/* Sizer: invisible copy of longest quote keeps height stable */}
          <div
            aria-hidden
            className="invisible font-display text-[1.75rem] md:text-[2.75rem] leading-[1.2] tracking-[-0.01em] text-center px-2"
          >
            {QUOTES.reduce((a, b) => (a.text.length > b.text.length ? a : b)).text}
            <div className="mt-14 h-[13px]" />
          </div>

          {/* Stacked morph layers */}
          <div className="absolute inset-0 flex flex-col items-center justify-start">
            {QUOTES.map((q, idx) => {
              const active = idx === i;
              const style: React.CSSProperties = reducedMotion
                ? { opacity: active ? 1 : 0 }
                : {
                    opacity: active ? 1 : 0,
                    filter: active ? "blur(0px)" : "blur(8px)",
                    transform: active ? "translateY(0)" : "translateY(-6px)",
                    transition: `opacity ${MORPH_MS}ms cubic-bezier(0.2, 0.7, 0.2, 1) ${
                      active ? "120ms" : "0ms"
                    }, filter ${MORPH_MS}ms cubic-bezier(0.2, 0.7, 0.2, 1) ${
                      active ? "120ms" : "0ms"
                    }, transform ${MORPH_MS}ms cubic-bezier(0.2, 0.7, 0.2, 1) ${
                      active ? "120ms" : "0ms"
                    }`,
                    pointerEvents: active ? "auto" : "none",
                  };
              return (
                <div
                  key={idx}
                  className="absolute inset-0 flex flex-col items-center"
                  style={style}
                  aria-hidden={!active}
                >
                  <blockquote className="font-display text-[1.75rem] md:text-[2.75rem] leading-[1.2] tracking-[-0.01em] text-ink text-center px-2">
                    {q.text}
                  </blockquote>
                  <div className="mt-14 flex items-center justify-center gap-4 text-[13px]">
                    <span className="text-ink">{q.name}</span>
                    <span className="h-px w-6 bg-ink/30" />
                    <span className="text-ink/60 tracking-[0.2em] uppercase text-[11px]">
                      {q.residence}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-12 flex items-center justify-center gap-3">
          {QUOTES.map((_, idx) => {
            const active = idx === i;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => goTo(idx)}
                aria-label={`Show testimonial ${idx + 1}`}
                aria-current={active ? "true" : undefined}
                className="group relative h-6 w-6 flex items-center justify-center"
              >
                <span
                  className="block rounded-full transition-all duration-500"
                  style={{
                    width: active ? "28px" : "6px",
                    height: "6px",
                    backgroundColor: active
                      ? "var(--gilt)"
                      : "rgba(52, 49, 72, 0.25)",
                  }}
                />
              </button>
            );
          })}
        </div>

        <div className="mt-20 grid grid-cols-3 gap-8 border-t border-ink/10 pt-14 max-w-3xl mx-auto">
          {[
            { n: "120", l: "Homes delivered" },
            { n: "2010", l: "Founded" },
            { n: "2", l: "Cities · Lagos & Abuja" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-display text-4xl md:text-5xl text-ink">
                {s.n}
              </div>
              <div className="mt-3 text-[10px] tracking-[0.3em] uppercase text-ink/50">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
