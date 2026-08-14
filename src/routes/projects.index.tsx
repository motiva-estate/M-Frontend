import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowUpRight, Search } from "lucide-react";
import { PageHeader } from "@/components/motiva/PageHeader";
import { StatusBadge } from "@/components/motiva/StatusBadge";
import { WhatsAppCta, projectWhatsAppText } from "@/components/motiva/WhatsAppCta";
import { projectsQueryOptions } from "@/lib/sanity/queries";
import { resolveImage } from "@/lib/sanity/image";
import { projectCover } from "@/lib/sanity/fallbacks";
import type { SanityProject } from "@/lib/sanity/types";
import { usePageReveal } from "@/hooks/use-page-reveal";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  status: fallback(z.enum(["all", "pre-sale", "ongoing", "delivered"]), "all").default("all"),
  city: fallback(z.string(), "all").default("all"),
  type: fallback(z.string(), "all").default("all"),
});

export const Route = createFileRoute("/projects/")({
  validateSearch: zodValidator(searchSchema),
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQueryOptions),
  head: () => ({
    meta: [
      { title: "Residences — Motiva Real Estate" },
      {
        name: "description",
        content:
          "Motiva residences currently in pre-sale across Abuja — enquire for current pricing and terms.",
      },
      { property: "og:title", content: "Residences — Motiva Real Estate" },
      {
        property: "og:description",
        content: "A small, considered set of residences currently in pre-sale.",
      },
    ],
  }),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center bg-ivory text-ink px-6">
      <div className="text-center max-w-md">
        <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">Unable to load</div>
        <h1 className="font-display text-4xl mb-4">Residences didn't load.</h1>
        <p className="text-ink/60">{error.message}</p>
      </div>
    </div>
  ),
  notFoundComponent: () => <div>No residences found.</div>,
  component: ProjectsIndex,
});

function ProjectsIndex() {
  usePageReveal();
  const { data: projects } = useSuspenseQuery(projectsQueryOptions);
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/projects" });

  const update = (patch: Partial<typeof search>) =>
    navigate({ search: (prev: typeof search) => ({ ...prev, ...patch }) });

  const cities = useMemo(
    () => Array.from(new Set(projects.map((p) => p.city).filter((c): c is string => Boolean(c)))),
    [projects],
  );
  const propertyTypes = useMemo(
    () =>
      Array.from(
        new Set(projects.map((p) => p.propertyType).filter((t): t is NonNullable<typeof t> => Boolean(t))),
      ),
    [projects],
  );

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (search.status !== "all" && p.projectStatus !== search.status) return false;
      if (search.city !== "all" && p.city !== search.city) return false;
      if (search.type !== "all" && p.propertyType !== search.type) return false;
      if (search.q.trim()) {
        const q = search.q.toLowerCase();
        if (
          !p.title.toLowerCase().includes(q) &&
          !(p.location ?? "").toLowerCase().includes(q) &&
          !(p.tagline ?? "").toLowerCase().includes(q) &&
          !(p.buildingType ?? "").toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [projects, search]);

  return (
    <>
      <PageHeader
        eyebrow="002 — Projects"
        title={
          <>
            Projects currently<br />in pre-sale.
          </>
        }
        intro="A small, honest set of projects in review and planning across Abuja. Pricing and delivery timelines move with approvals — we quote current terms per enquiry."
        crumbs={[{ label: "Motiva", to: "/" }, { label: "Projects" }]}
        right={
          <div className="text-right">
            <div className="font-display text-5xl md:text-6xl text-ink leading-none">
              {String(filtered.length).padStart(2, "0")}
            </div>
            <div className="mt-2 text-[10px] tracking-[0.3em] uppercase text-ink/50">
              {filtered.length === 1 ? "Project shown" : "Project shown"}
            </div>
          </div>
        }
      />

      <div className="sticky top-16 md:top-20 z-30 bg-ivory/95 backdrop-blur-xl border-b border-ink/10">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-full border border-ink/15 p-1 bg-ivory">
              {(["all", "pre-sale", "ongoing", "delivered"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => update({ status: s })}
                  className={`px-4 py-1.5 text-[12px] tracking-wide rounded-full transition-colors capitalize ${
                    search.status === s ? "bg-ink text-ivory" : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {s === "all" ? "All" : s === "pre-sale" ? "Pre-sale" : s === "ongoing" ? "Ongoing" : "Delivered"}
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

            <div className="flex-1 min-w-[220px] relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/40" strokeWidth={1.5} />
              <input
                type="text"
                value={search.q}
                onChange={(e) => update({ q: e.target.value })}
                placeholder="Search by name, location, or type…"
                className="w-full rounded-full border border-ink/15 bg-ivory pl-11 pr-4 py-2 text-[13px] text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-gilt focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10">
          {filtered.length === 0 ? (
            <EmptyState onReset={() => navigate({ search: {} as never })} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-14">
              {filtered.map((p, i) => (
                <ProjectCard key={p._id} project={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function ProjectCard({ project, index }: { project: SanityProject; index: number }) {
  const isWide = index % 5 === 0;
  const stagger = !isWide && index % 3 === 2 ? "md:mt-16" : "";
  const cols = isWide ? "md:col-span-8" : "md:col-span-4";
  const aspect = isWide ? "aspect-[16/10]" : "aspect-[4/5]";
  const cover = projectCover(project.slug, resolveImage(project.cover, { width: 1400 }) ?? project.coverUrl);

  return (
    <div className={`group ${cols} ${stagger}`}>
      <Link to="/projects/$slug" params={{ slug: project.slug }} className="block">
        <div className={`relative overflow-hidden bg-ink ${aspect}`}>
          <img
            src={cover}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
          />
          <div className="absolute top-4 left-4">
            <StatusBadge status={project.projectStatus} phaseLabel={project.phaseLabel} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
        </div>

        <div className="mt-6 flex items-start justify-between gap-6">
          <div>
            <div className="text-[10px] tracking-[0.35em] uppercase text-ink/50 mb-3">
              {project.location}
              {project.propertyType ? ` · ${project.propertyType}` : ""}
            </div>
            <h3 className="font-display text-2xl md:text-[1.75rem] text-ink leading-tight">
              {project.title}
            </h3>
            {project.buildingType && (
              <div className="mt-2 text-[13px] text-ink/60">{project.buildingType}</div>
            )}
          </div>
          <ArrowUpRight
            className="h-5 w-5 text-ink/50 group-hover:text-ink transition-colors shrink-0 mt-1"
            strokeWidth={1.25}
          />
        </div>
      </Link>
      <div className="mt-4">
        <WhatsAppCta
          text={projectWhatsAppText(project.title)}
          label="Enquire on WhatsApp"
          variant="outline"
        />
      </div>
    </div>
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
        No projects match those filters.
      </div>
      <p className="text-ink/60 max-w-md mx-auto mb-8">
        Try widening your search — or reach out and we'll walk through what's currently available.
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
