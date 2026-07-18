import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo } from "react";
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";
import { projects, cities, propertyTypes, listings, type Project } from "@/data/projects";
import { PageHeader } from "@/components/motiva/PageHeader";

const sortValues = ["featured", "newest", "price-asc", "price-desc"] as const;

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  listing: fallback(z.enum(["all", "Buy", "Rent", "Off-plan"]), "all").default("all"),
  city: fallback(z.string(), "all").default("all"),
  type: fallback(z.string(), "all").default("all"),
  beds: fallback(z.enum(["any", "1", "2", "3", "4", "5"]), "any").default("any"),
  max: fallback(z.enum(["any", "300", "500", "1000", "2000"]), "any").default("any"),
  sort: fallback(z.enum(sortValues), "featured").default("featured"),
});

export const Route = createFileRoute("/projects/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Residences — Motiva Real Estate" },
      {
        name: "description",
        content:
          "Browse Motiva's current residences across Lagos, Abuja, and Port Harcourt — villas, apartments, penthouses, and serviced plots.",
      },
      { property: "og:title", content: "Residences — Motiva Real Estate" },
      {
        property: "og:description",
        content: "A quiet portfolio of residences currently in composition — for buyers who ask their spaces to mean something.",
      },
    ],
  }),
  component: ProjectsIndex,
});

function ProjectsIndex() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/projects" });

  const update = (patch: Partial<typeof search>) =>
    navigate({ search: (prev: typeof search) => ({ ...prev, ...patch }) });

  const filtered = useMemo(() => {
    let list = projects.filter((p) => {
      if (search.listing !== "all" && p.listing !== search.listing) return false;
      if (search.city !== "all" && p.city !== search.city) return false;
      if (search.type !== "all" && p.propertyType !== search.type) return false;
      if (search.beds !== "any" && p.beds < parseInt(search.beds)) return false;
      if (search.max !== "any" && p.priceNaira > parseInt(search.max) * 1_000_000) return false;
      if (search.q.trim()) {
        const q = search.q.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.location.toLowerCase().includes(q) &&
          !p.tagline.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });

    switch (search.sort) {
      case "newest":
        list = [...list].reverse();
        break;
      case "price-asc":
        list = [...list].sort((a, b) => a.priceNaira - b.priceNaira);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.priceNaira - a.priceNaira);
        break;
      case "featured":
      default:
        list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return list;
  }, [search]);

  return (
    <>
      <PageHeader
        eyebrow="002 — The Portfolio"
        title={
          <>
            Residences currently<br />in composition.
          </>
        }
        intro="Eight projects across Lagos, Abuja, and Port Harcourt — from serviced plots on the Katampe ridge to a triplex penthouse above the Atlantic. Filter by what you're looking for, or read our recommendation."
        crumbs={[{ label: "Motiva", to: "/" }, { label: "Residences" }]}
        right={
          <div className="text-right">
            <div className="font-display text-5xl md:text-6xl text-ink leading-none">
              {String(filtered.length).padStart(2, "0")}
            </div>
            <div className="mt-2 text-[10px] tracking-[0.3em] uppercase text-ink/50">
              {filtered.length === 1 ? "Residence shown" : "Residences shown"}
            </div>
          </div>
        }
      />

      {/* Filter shelf */}
      <div className="sticky top-16 md:top-20 z-30 bg-ivory/95 backdrop-blur-xl border-b border-ink/10">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10 py-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Listing segmented */}
            <div className="inline-flex rounded-full border border-ink/15 p-1 bg-ivory">
              {(["all", ...listings] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => update({ listing: l })}
                  className={`px-4 py-1.5 text-[12px] tracking-wide rounded-full transition-colors ${
                    search.listing === l
                      ? "bg-ink text-ivory"
                      : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {l === "all" ? "All" : l}
                </button>
              ))}
            </div>

            <Select
              value={search.city}
              onChange={(v) => update({ city: v })}
              options={[["all", "Any city"], ...cities.map((c) => [c, c] as [string, string])]}
              label="City"
            />
            <Select
              value={search.type}
              onChange={(v) => update({ type: v })}
              options={[["all", "Any type"], ...propertyTypes.map((c) => [c, c] as [string, string])]}
              label="Type"
            />
            <Select
              value={search.beds}
              onChange={(v) => update({ beds: v as typeof search.beds })}
              options={[
                ["any", "Any beds"],
                ["1", "1+ bed"],
                ["2", "2+ bed"],
                ["3", "3+ bed"],
                ["4", "4+ bed"],
                ["5", "5+ bed"],
              ]}
              label="Beds"
            />
            <Select
              value={search.max}
              onChange={(v) => update({ max: v as typeof search.max })}
              options={[
                ["any", "Any price"],
                ["300", "Up to ₦300M"],
                ["500", "Up to ₦500M"],
                ["1000", "Up to ₦1B"],
                ["2000", "Up to ₦2B"],
              ]}
              label="Max price"
            />

            <div className="flex-1 min-w-[220px] relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/40" strokeWidth={1.5} />
              <input
                type="text"
                value={search.q}
                onChange={(e) => update({ q: e.target.value })}
                placeholder="Search by name or neighbourhood…"
                className="w-full rounded-full border border-ink/15 bg-ivory pl-11 pr-4 py-2 text-[13px] text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-gilt focus:border-transparent"
              />
            </div>

            <div className="inline-flex items-center gap-2 text-[12px] text-ink/60">
              <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} />
              <select
                value={search.sort}
                onChange={(e) => update({ sort: e.target.value as typeof search.sort })}
                className="bg-transparent border-0 text-ink text-[12px] focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10">
          {filtered.length === 0 ? (
            <EmptyState onReset={() => navigate({ search: {} as never })} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-14">
              {filtered.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  // Asymmetric grid: every 6th card is wide (8 cols), others alternate 4-4-4 with a stagger.
  const isWide = index % 6 === 0;
  const stagger = !isWide && index % 3 === 2 ? "md:mt-16" : "";
  const cols = isWide ? "md:col-span-8" : "md:col-span-4";
  const aspect = isWide ? "aspect-[16/10]" : "aspect-[4/5]";

  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className={`group block ${cols} ${stagger}`}
    >
      <div className={`relative overflow-hidden bg-ink ${aspect}`}>
        <img
          src={project.cover}
          alt={project.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
        />
        <StatusPill status={project.status} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
      </div>

      <div className="mt-6 flex items-start justify-between gap-6">
        <div>
          <div className="text-[10px] tracking-[0.35em] uppercase text-ink/50 mb-3">
            {project.location} · {project.propertyType}
          </div>
          <h3 className="font-display text-2xl md:text-[1.75rem] text-ink leading-tight">
            {project.name}
          </h3>
          <div className="mt-2 text-[13px] text-ink/60">
            {project.beds > 0
              ? `${project.beds} bd · ${project.baths} ba · ${project.sqft.toLocaleString()} sqft`
              : `${project.sqft.toLocaleString()} sqm · ${project.units.length} plots`}
          </div>
          <div className="mt-3 text-[14px] text-ink font-medium">{project.priceLabel}</div>
        </div>
        <ArrowUpRight
          className="h-5 w-5 text-ink/50 group-hover:text-ink transition-colors shrink-0 mt-1"
          strokeWidth={1.25}
        />
      </div>
    </Link>
  );
}

function StatusPill({ status }: { status: Project["status"] }) {
  const tone =
    status === "Sold out"
      ? "bg-ink/70 text-ivory/90"
      : status === "Off-plan"
        ? "bg-ivory/90 text-ink"
        : "bg-gilt text-ink";
  return (
    <span className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-[0.25em] uppercase ${tone}`}>
      <span className="h-1 w-1 rounded-full bg-current" />
      {status}
    </span>
  );
}

function Select({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
  label: string;
}) {
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-full border border-ink/15 bg-ivory pl-4 pr-9 py-2 text-[12px] text-ink focus:outline-none focus:ring-2 focus:ring-gilt cursor-pointer hover:border-ink/30 transition-colors"
      >
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
      <svg className="pointer-events-none absolute right-3 h-3 w-3 text-ink/50" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </label>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="py-24 text-center">
      <div className="font-display text-4xl md:text-5xl text-ink mb-4">
        No residences match those filters.
      </div>
      <p className="text-ink/60 max-w-md mx-auto mb-8">
        Try widening your search — or let us send a curated shortlist based on what you're looking for.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onReset}
          className="text-[13px] tracking-wide text-ink border-b border-ink/40 pb-1 hover:border-ink"
        >
          Reset filters
        </button>
        <Link
          to="/contact"
          className="text-[13px] tracking-wide bg-ink text-ivory px-5 py-2 rounded-full hover:bg-ink/90"
        >
          Speak to a specialist
        </Link>
      </div>
    </div>
  );
}
