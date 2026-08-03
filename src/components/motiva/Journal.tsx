import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSectionReveal } from "@/hooks/use-section-reveal";
import { journalEntriesQueryOptions } from "@/lib/sanity/queries";
import { resolveImage } from "@/lib/sanity/image";
import { journalImage } from "@/lib/sanity/fallbacks";

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("en-US", { month: "long", year: "numeric" });
}

export function Journal() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);
  const { data: posts } = useSuspenseQuery(journalEntriesQueryOptions);

  if (!posts || posts.length === 0) return null;

  return (
    <section ref={ref} id="journal" className="py-28 md:py-40 bg-ivory">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 items-end mb-20">
          <div className="md:col-span-8">
            <div data-reveal className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">
              007 — The Journal
            </div>
            <h2
              data-reveal
              className="font-display text-[2.5rem] md:text-[4rem] leading-[1] tracking-[-0.02em] text-ink"
            >
              Slow reading, from the studio.
            </h2>
          </div>
          <Link
            data-reveal
            to="/journal"
            className="md:col-span-4 md:justify-self-end inline-flex items-center gap-3 text-sm text-ink border-b border-ink/40 pb-2 hover:border-ink transition-colors w-fit"
          >
            All entries
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-x-8 gap-y-12">
          {posts.slice(0, 3).map((p) => {
            const src = journalImage(p.slug, resolveImage(p.cover) ?? p.coverUrl);
            const date = formatDate(p.publishedAt);
            const slug = p.slug ?? p._id;
            return (
              <Link
                data-reveal
                key={p._id}
                to="/journal/$slug"
                params={{ slug }}
                className="group block"
              >
                <div className="aspect-[4/5] overflow-hidden bg-mist mb-6">
                  <img
                    src={src}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-ink/50 mb-4">
                  {p.category && <span>{p.category}</span>}
                  {p.category && date && <span className="h-px w-4 bg-ink/20" />}
                  {date && <span>{date}</span>}
                  {p.readingTime && <span className="h-px w-4 bg-ink/20" />}
                  {p.readingTime && <span>{p.readingTime}</span>}
                </div>
                <h3 className="font-display text-xl md:text-[1.5rem] leading-snug text-ink group-hover:text-ink/70 transition-colors">
                  {p.title}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
