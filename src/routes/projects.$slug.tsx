import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowUpRight, MapPin, Bed, Bath, Home as HomeIcon, Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SubscribeModal } from "@/components/motiva/SubscribeModal";
import { StatusBadge } from "@/components/motiva/StatusBadge";
import { PaymentPlanBlock } from "@/components/motiva/PaymentPlanBlock";
import { WhatsAppCta, projectWhatsAppText } from "@/components/motiva/WhatsAppCta";
import { projectBySlugQueryOptions } from "@/lib/sanity/queries";
import { resolveImage } from "@/lib/sanity/image";
import { projectCover, projectGallery } from "@/lib/sanity/fallbacks";

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ params, context }) => {
    const project = await context.queryClient.ensureQueryData(projectBySlugQueryOptions(params.slug));
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.title} — Motiva` },
          {
            name: "description",
            content: `${loaderData.project.tagline ?? ""} ${loaderData.project.location ?? ""}. Pre-sale — enquire for current terms.`.trim(),
          },
          { property: "og:title", content: `${loaderData.project.title} — Motiva` },
          {
            property: "og:description",
            content: `${loaderData.project.tagline ?? ""} ${loaderData.project.location ?? ""}.`.trim(),
          },
        ]
      : [{ title: "Residence not found — Motiva" }, { name: "robots", content: "noindex" }],
    scripts: loaderData
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SingleFamilyResidence",
              name: loaderData.project.title,
              description: loaderData.project.description ?? loaderData.project.tagline,
              address: {
                "@type": "PostalAddress",
                addressLocality: loaderData.project.location,
                addressCountry: "NG",
              },
              numberOfBedrooms: loaderData.project.beds || undefined,
              numberOfBathroomsTotal: loaderData.project.baths || undefined,
            }),
          },
        ]
      : [],
  }),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center bg-ivory text-ink px-6">
      <div className="text-center max-w-md">
        <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">Unable to load</div>
        <h1 className="font-display text-4xl mb-4">This residence didn't load.</h1>
        <p className="text-ink/60">{error.message}</p>
      </div>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-ivory text-ink px-6">
      <div className="text-center max-w-md">
        <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">404 · No such residence</div>
        <h1 className="font-display text-5xl mb-4">Not in our portfolio.</h1>
        <p className="text-ink/60 mb-8">The residence you're looking for isn't part of Motiva's current work.</p>
        <Link to="/projects" className="text-[13px] tracking-wide bg-ink text-ivory px-5 py-2 rounded-full hover:bg-ink/90">
          Browse all residences
        </Link>
      </div>
    </div>
  ),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { slug } = Route.useParams();
  const { data: projectData } = useSuspenseQuery(projectBySlugQueryOptions(slug));
  const project = projectData!;
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const showSpecs = project.projectStatus === "delivered";

  const cover = projectCover(project.slug, resolveImage(project.cover, { width: 2000 }) ?? project.coverUrl);
  const galleryResolved = (project.gallery ?? [])
    .map((g) => resolveImage(g, { width: 1600 }))
    .filter((u): u is string => Boolean(u));
  const gallery = projectGallery(project.slug, galleryResolved);

  return (
    <>
      <section className="relative h-[80svh] min-h-[560px] bg-ink text-ivory overflow-hidden">
        <img src={cover} alt={project.title} className="absolute inset-0 h-full w-full object-cover ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/20 to-ink/80" />
        <div className="relative z-10 h-full mx-auto max-w-[1500px] px-6 md:px-10 flex flex-col">
          <nav className="pt-28 md:pt-32 flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-ivory/70">
            <Link to="/" className="hover:text-ivory">Motiva</Link>
            <span>/</span>
            <Link to="/projects" className="hover:text-ivory">Residences</Link>
            <span>/</span>
            <span className="text-ivory">{project.title}</span>
          </nav>

          <div className="mt-auto pb-16 md:pb-20">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <StatusBadge status={project.projectStatus} phaseLabel={project.phaseLabel} />
              {project.location && (
                <span className="text-[11px] tracking-[0.3em] uppercase text-ivory/70 inline-flex items-center gap-2">
                  <MapPin className="h-3 w-3" strokeWidth={1.5} /> {project.location}
                </span>
              )}
            </div>
            <h1 className="font-display text-[13vw] md:text-[7vw] lg:text-[6rem] leading-[0.95] tracking-[-0.02em] text-ivory">
              {project.title}
            </h1>
            {project.tagline && <p className="mt-6 max-w-xl text-[16px] text-ivory/80">{project.tagline}</p>}
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-ivory">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {project.buildingType && (
            <Fact icon={<HomeIcon className="h-4 w-4" strokeWidth={1.25} />} label="Type" value={project.buildingType} />
          )}
          {(project.beds ?? 0) > 0 && (
            <Fact icon={<Bed className="h-4 w-4" strokeWidth={1.25} />} label="Bedrooms" value={String(project.beds)} />
          )}
          {(project.baths ?? 0) > 0 && (
            <Fact icon={<Bath className="h-4 w-4" strokeWidth={1.25} />} label="Bathrooms" value={String(project.baths)} />
          )}
          {project.city && (
            <Fact icon={<MapPin className="h-4 w-4" strokeWidth={1.25} />} label="Location" value={project.city} />
          )}
        </div>
      </section>

      <section className="py-20 md:py-28 bg-ivory">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10 grid md:grid-cols-12 gap-12 lg:gap-16">
          <div className="md:col-span-8 space-y-20">
            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">Overview</div>
              {project.description && (
                <p className="font-display text-2xl md:text-[2rem] leading-[1.3] tracking-[-0.01em] text-ink max-w-2xl">
                  {project.description}
                </p>
              )}
              {!showSpecs && (
                <p className="mt-6 text-[14px] leading-relaxed text-ink/60 max-w-2xl">
                  This project is currently in {project.phaseLabel ?? "planning"}. Pricing and
                  timelines depend on approvals and subscriber commitments, so we quote current
                  terms per enquiry — please reach out on WhatsApp for the latest.
                </p>
              )}
            </div>

            {project.amenities && project.amenities.length > 0 && (
              <div>
                <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">Amenities</div>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  {project.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-3 py-3 border-b border-ink/10 text-[14px] text-ink/80">
                      <Check className="h-4 w-4 text-gilt" strokeWidth={1.5} /> {a}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <PaymentPlanBlock />

            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">Gallery</div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {gallery.map((src, i) => {
                  const wide = i % 5 === 0 || i % 5 === 3;
                  return (
                    <div
                      key={i}
                      className={`overflow-hidden bg-ink ${wide ? "md:col-span-8 aspect-[16/10]" : "md:col-span-4 aspect-[4/5]"}`}
                    >
                      <img src={src} alt={`${project.title} — view ${i + 1}`} loading="lazy" className="h-full w-full object-cover hover:scale-[1.03] transition-transform duration-[1200ms]" />
                    </div>
                  );
                })}
              </div>
            </div>

            {project.location && (
              <div>
                <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">Location & neighbourhood</div>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div className="bg-mist aspect-[4/3] rounded-sm relative overflow-hidden">
                    <iframe
                      title={`Map of ${project.location}`}
                      className="absolute inset-0 h-full w-full grayscale-[40%] contrast-[0.95]"
                      src={`https://www.google.com/maps?q=${encodeURIComponent(project.location)}&output=embed`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <div>
                    <div className="font-display text-2xl text-ink mb-2">{project.location}</div>
                    {project.coords && (
                      <div className="text-[12px] tracking-[0.3em] uppercase text-ink/50 mb-6">{project.coords}</div>
                    )}
                    {project.nearby && project.nearby.length > 0 && (
                      <ul className="space-y-3">
                        {project.nearby.map((n) => (
                          <li key={n} className="text-[14px] text-ink/70 border-b border-ink/10 pb-3">{n}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}

            {project.faq && project.faq.length > 0 && (
              <div>
                <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">Questions & answers</div>
                <Accordion type="single" collapsible className="border-t border-ink/10">
                  {project.faq.map((f, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border-b border-ink/10">
                      <AccordionTrigger className="font-display text-xl md:text-2xl text-ink hover:no-underline py-6">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-[15px] text-ink/70 leading-relaxed pb-6">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>

          <aside className="md:col-span-4">
            <div className="md:sticky md:top-28 space-y-6">
              <div className="bg-ink text-ivory p-8">
                <div className="text-[10px] tracking-[0.3em] uppercase text-gilt mb-4">Speak with us</div>
                <div className="font-display text-[2rem] leading-[1.1] mb-4">
                  Enquire about {project.title}.
                </div>
                <p className="text-ivory/70 text-[14px] mb-6">
                  Pricing and timelines move with approvals — we'll share current terms directly, no obligation.
                </p>
                <WhatsAppCta
                  text={projectWhatsAppText(project.title)}
                  label="Enquire on WhatsApp"
                  variant="primary"
                />
                <Link
                  to="/contact"
                  search={{ intent: "enquiry", project: project.slug }}
                  className="mt-3 inline-flex items-center justify-between gap-6 w-full border border-ivory/30 text-ivory px-5 py-3 rounded-full text-[13px] tracking-wide hover:border-ivory transition-colors"
                >
                  <span>Send an enquiry</span>
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
                <button
                  type="button"
                  onClick={() => setSubscribeOpen(true)}
                  className="mt-3 inline-flex items-center justify-between gap-6 w-full border border-ivory/30 text-ivory px-5 py-3 rounded-full text-[13px] tracking-wide hover:border-ivory transition-colors"
                >
                  <span>Reserve your spot</span>
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>

              <div className="bg-mist p-8">
                <div className="text-[10px] tracking-[0.3em] uppercase text-ink/50 mb-4">Direct lines</div>
                <div className="font-display text-2xl text-ink">Motiva Estate Co.</div>
                <div className="text-[13px] text-ink/60 mt-1">Lagos · Abuja</div>
                <div className="mt-4 flex flex-col gap-2 text-[13px] text-ink/70">
                  <a href="tel:+2348153242398" className="hover:text-ink">+234 815 324 2398</a>
                  <a href="mailto:askme@motivaestate.com" className="hover:text-ink">askme@motivaestate.com</a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <SubscribeModal open={subscribeOpen} onOpenChange={setSubscribeOpen} projectName={project.title} />
    </>
  );
}

function Fact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-10 w-10 rounded-full bg-mist flex items-center justify-center text-ink shrink-0">{icon}</div>
      <div>
        <div className="text-[10px] tracking-[0.3em] uppercase text-ink/50">{label}</div>
        <div className="text-[15px] text-ink font-medium">{value}</div>
      </div>
    </div>
  );
}
