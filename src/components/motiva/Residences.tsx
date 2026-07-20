import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useSectionReveal } from "@/hooks/use-section-reveal";
import { StatusBadge } from "@/components/motiva/StatusBadge";
import { featuredProjectsQueryOptions } from "@/lib/sanity/queries";
import { resolveImage } from "@/lib/sanity/image";
import { projectCover } from "@/lib/sanity/fallbacks";

export function Residences() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);
  const { data } = useQuery(featuredProjectsQueryOptions);
  const featured = (data ?? []).slice(0, 3);

  return (
    <section ref={ref} id="residences" className="relative py-28 md:py-40 bg-mist">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 items-end mb-20">
          <div className="md:col-span-8">
            <div data-reveal className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">
              003 — Residences in pre-sale
            </div>
            <h2 data-reveal className="font-display text-[2.5rem] md:text-[4rem] lg:text-[5rem] leading-[1] tracking-[-0.02em] text-ink">
              A small, honest set,<br />currently in planning.
            </h2>
            <p data-reveal className="mt-6 text-[15px] text-ink/60 max-w-xl">
              Six residences across Abuja. Pricing and timelines move with approvals — enquire on WhatsApp for the current terms of the one that matters to you.
            </p>
          </div>
          <Link
            data-reveal
            to="/projects"
            className="md:col-span-4 md:justify-self-end inline-flex items-center gap-3 text-sm tracking-wide text-ink border-b border-ink/40 pb-2 hover:border-ink transition-colors w-fit"
          >
            View all residences
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-x-8 gap-y-16">
          {featured.map((p, i) => {
            const cover = projectCover(p.slug, resolveImage(p.cover, { width: 1200 }) ?? p.coverUrl);
            return (
              <Link
                data-reveal
                key={p._id}
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className={`group block ${i === 1 ? "md:mt-16" : ""}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                  <img
                    src={cover}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                  />
                  <div className="absolute top-4 left-4">
                    <StatusBadge status={p.projectStatus} phaseLabel={p.phaseLabel} />
                  </div>
                </div>
                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <div className="text-[10px] tracking-[0.35em] uppercase text-ink/50 mb-3">
                      {p.location}
                    </div>
                    <h3 className="font-display text-2xl md:text-[1.75rem] text-ink leading-tight">
                      {p.title}
                    </h3>
                    {p.buildingType && (
                      <div className="mt-2 text-[13px] text-ink/60">{p.buildingType}</div>
                    )}
                  </div>
                  <ArrowUpRight
                    className="h-5 w-5 text-ink/50 group-hover:text-ink transition-colors shrink-0 mt-1"
                    strokeWidth={1.25}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
