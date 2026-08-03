import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/motiva/PageHeader";
import { journalEntriesQueryOptions } from "@/lib/sanity/queries";
import { resolveImage } from "@/lib/sanity/image";
import { journalImage } from "@/lib/sanity/fallbacks";
import { usePageReveal } from "@/hooks/use-page-reveal";

const PAGE_SIZE = 9;

const searchSchema = z.object({
  category: fallback(z.string(), "all").default("all"),
  page: fallback(z.number(), 1).default(1),
});

export const Route = createFileRoute("/journal/")({
  validateSearch: zodValidator(searchSchema),
  loader: ({ context }) => context.queryClient.ensureQueryData(journalEntriesQueryOptions),
  head: () => ({
    meta: [
      { title: "The Journal — Motiva Real Estate" },
      {
        name: "description",
        content:
          "Architecture, property investment and slow living — editorial from the Motiva studio. Insights on real estate in Abuja, Lagos and Ogun State.",
      },
      { property: "og:title", content: "The Journal — Motiva Real Estate" },
      {
        property: "og:description",
        content:
          "Architecture, investment and living — from the Motiva studio.",
      },
      { name: "keywords", content: "real estate blog Nigeria, property investment Abuja, Lagos real estate articles, Ogun State property, architecture insights Nigeria, Motiva journal" },
    ],
  }),
  component: JournalIndex,
});

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("en-US", { month: "long", year: "numeric" });
}

function JournalIndex() {
  usePageReveal();
  const { data: posts } = useSuspenseQuery(journalEntriesQueryOptions);
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/journal/" });

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(posts.map((p) => p.category).filter((c): c is string => !!c)))],
    [posts],
  );

  const filtered = useMemo(
    () => (search.category === "all" ? posts : posts.filter((p) => p.category === search.category)),
    [posts, search.category],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(search.page, totalPages);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const setCategory = (category: string) =>
    navigate({ search: { category, page: 1 } });
  const setPage = (p: number) =>
    navigate({ search: (prev: typeof search) => ({ ...prev, page: p }) });

  return (
    <>
      <PageHeader
        eyebrow="007 — The Journal"
        title={<>Slow reading,<br />from the studio.</>}
        intro="Architecture, investment and living well — editorial from the Motiva team."
        crumbs={[{ label: "Motiva", to: "/" }, { label: "Journal" }]}
        right={
          <div className="text-right">
            <div className="font-display text-5xl md:text-6xl text-ink leading-none">
              {String(filtered.length).padStart(2, "0")}
            </div>
            <div className="mt-2 text-[10px] tracking-[0.3em] uppercase text-ink/50">
              {filtered.length === 1 ? "Entry" : "Entries"}
            </div>
          </div>
        }
      />

      {/* Category filter */}
      {categories.length > 1 && (
        <div className="sticky top-16 md:top-20 z-30 bg-ivory/95 backdrop-blur-xl border-b border-ink/10">
          <div className="mx-auto max-w-[1500px] px-6 md:px-10 py-4">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-1.5 text-[12px] tracking-wide rounded-full transition-colors capitalize border ${
                    search.category === cat
                      ? "bg-ink text-ivory border-ink"
                      : "border-ink/15 text-ink/70 hover:text-ink hover:border-ink/40"
                  }`}
                >
                  {cat === "all" ? "All topics" : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10">
          {paginated.length === 0 ? (
            <div className="py-20 text-center text-ink/40 text-[14px]">No entries in this category yet.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {paginated.map((p) => {
                const src = journalImage(p.slug, resolveImage(p.cover) ?? p.coverUrl);
                const date = formatDate(p.publishedAt);
                const slug = p.slug ?? p._id;
                return (
                  <Link
                    key={p._id}
                    to="/journal/$slug"
                    params={{ slug }}
                    className="group block"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-mist mb-6">
                      <img
                        src={src}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-ink/50 mb-3">
                      {p.category && <span>{p.category}</span>}
                      {p.category && date && <span className="h-px w-4 bg-ink/20" />}
                      {date && <span>{date}</span>}
                      {p.readingTime && <span className="h-px w-4 bg-ink/20" />}
                      {p.readingTime && <span>{p.readingTime}</span>}
                    </div>
                    <h2 className="font-display text-xl md:text-2xl leading-snug text-ink group-hover:text-ink/70 transition-colors mb-3">
                      {p.title}
                    </h2>
                    {p.excerpt && (
                      <p className="text-[13px] leading-relaxed text-ink/60 line-clamp-2">{p.excerpt}</p>
                    )}
                    <div className="mt-4 inline-flex items-center gap-2 text-[12px] tracking-wide text-ink/60 border-b border-ink/20 pb-0.5 group-hover:text-ink group-hover:border-ink transition-colors">
                      Read entry <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-20 flex items-center justify-center gap-3">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
                className="px-5 py-2 text-[13px] border border-ink/15 rounded-full hover:bg-ink hover:text-ivory disabled:opacity-30 transition-colors"
              >
                ← Previous
              </button>
              <span className="text-[12px] tracking-[0.2em] uppercase text-ink/50">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
                className="px-5 py-2 text-[13px] border border-ink/15 rounded-full hover:bg-ink hover:text-ivory disabled:opacity-30 transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
