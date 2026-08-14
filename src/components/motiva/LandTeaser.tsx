import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSectionReveal } from "@/hooks/use-section-reveal";
import { LandStatusBadge } from "@/components/motiva/StatusBadge";
import { landQueryOptions } from "@/lib/sanity/queries";
import { resolveImage } from "@/lib/sanity/image";
import { landCover } from "@/lib/sanity/fallbacks";

export function LandTeaser() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);
  const { data } = useQuery(landQueryOptions);
  const parcels = data ?? [];

  return (
    <section ref={ref} className="relative py-28 md:py-40 bg-ivory">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 items-end mb-16">
          <div className="md:col-span-8">
            <div data-reveal className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">
              006 — Land
            </div>
            <h2 data-reveal className="font-display text-[2.5rem] md:text-[4rem] lg:text-[5rem] leading-[1] tracking-[-0.02em] text-ink">
              Estate land at<br />Katampe Extension.
            </h2>
            <p data-reveal className="mt-6 text-[15px] text-ink/60 max-w-xl">
              Two parcels — Lanzarote and Kingspark — offered at a range of SQM sizes. Terms are current-market and released per subscriber.
            </p>
          </div>
          <Link
            data-reveal
            to="/land"
            className="md:col-span-4 md:justify-self-end inline-flex items-center gap-3 text-sm tracking-wide text-ink border-b border-ink/40 pb-2 hover:border-ink w-fit"
          >
            View land
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {parcels.map((l) => {
            const cover = landCover(l.slug, resolveImage(l.cover, { width: 1200 }) ?? l.coverUrl);
            return (
              <Link
                data-reveal
                key={l._id}
                to="/land/$slug"
                params={{ slug: l.slug }}
                className="group block"
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-ink">
                  <img
                    src={cover}
                    alt={l.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                  />
                  <div className="absolute top-4 left-4">
                    <LandStatusBadge status={l.status} />
                  </div>
                </div>
                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <div className="text-[10px] tracking-[0.35em] uppercase text-ink/50 mb-3">
                      {l.location}
                    </div>
                    <h3 className="font-display text-2xl md:text-[1.75rem] text-ink leading-tight">
                      {l.name}
                    </h3>
                    {l.sizes && l.sizes.length > 0 && (
                      <div className="mt-2 text-[13px] text-ink/60">
                        {l.sizes.join(" · ")} SQM
                      </div>
                    )}
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-ink/50 group-hover:text-ink transition-colors shrink-0 mt-1" strokeWidth={1.25} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
