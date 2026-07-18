import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getProject, type Project } from "@/data/projects";
import { PageHeader } from "@/components/motiva/PageHeader";
import { ArrowUpRight, MapPin, Bed, Bath, Ruler, CalendarClock, Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SubscribeModal } from "@/components/motiva/SubscribeModal";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.name} — Motiva` },
          { name: "description", content: `${loaderData.project.tagline} ${loaderData.project.location}. ${loaderData.project.priceLabel}.` },
          { property: "og:title", content: `${loaderData.project.name} — Motiva` },
          { property: "og:description", content: `${loaderData.project.tagline} ${loaderData.project.location}.` },
        ]
      : [{ title: "Residence not found — Motiva" }, { name: "robots", content: "noindex" }],
    scripts: loaderData
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SingleFamilyResidence",
              name: loaderData.project.name,
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
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-ivory text-ink px-6">
      <div className="text-center max-w-md">
        <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">404 · No such residence</div>
        <h1 className="font-display text-5xl mb-4">Not in our portfolio.</h1>
        <p className="text-ink/60 mb-8">The residence you're looking for isn't part of Motiva's current or past work.</p>
        <Link to="/projects" className="text-[13px] tracking-wide bg-ink text-ivory px-5 py-2 rounded-full hover:bg-ink/90">
          Browse all residences
        </Link>
      </div>
    </div>
  ),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData() as { project: Project };
  const [subscribeOpen, setSubscribeOpen] = useState(false);


  return (
    <>
      {/* Cinematic hero */}
      <section className="relative h-[80svh] min-h-[560px] bg-ink text-ivory overflow-hidden">
        <img
          src={project.cover}
          alt={project.name}
          className="absolute inset-0 h-full w-full object-cover ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/20 to-ink/80" />
        <div className="relative z-10 h-full mx-auto max-w-[1500px] px-6 md:px-10 flex flex-col">
          <nav className="pt-28 md:pt-32 flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-ivory/70">
            <Link to="/" className="hover:text-ivory">Motiva</Link>
            <span>/</span>
            <Link to="/projects" className="hover:text-ivory">Residences</Link>
            <span>/</span>
            <span className="text-ivory">{project.name}</span>
          </nav>

          <div className="mt-auto pb-16 md:pb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gilt text-ink text-[10px] tracking-[0.25em] uppercase">
                {project.status}
              </span>
              <span className="text-[11px] tracking-[0.3em] uppercase text-ivory/70 inline-flex items-center gap-2">
                <MapPin className="h-3 w-3" strokeWidth={1.5} /> {project.location}
              </span>
            </div>
            <h1 className="font-display text-[13vw] md:text-[7vw] lg:text-[6rem] leading-[0.95] tracking-[-0.02em] text-ivory">
              {project.name}
            </h1>
            <p className="mt-6 max-w-xl text-[16px] text-ivory/80">{project.tagline}</p>
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="border-b border-ink/10 bg-ivory">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10 py-8 grid grid-cols-2 md:grid-cols-5 gap-6">
          <Fact icon={<Ruler className="h-4 w-4" strokeWidth={1.25} />} label={project.propertyType === "Land" ? "Plot size" : "Interior"} value={`${project.sqft.toLocaleString()} ${project.propertyType === "Land" ? "sqm" : "sqft"}`} />
          {project.beds > 0 && <Fact icon={<Bed className="h-4 w-4" strokeWidth={1.25} />} label="Bedrooms" value={String(project.beds)} />}
          {project.baths > 0 && <Fact icon={<Bath className="h-4 w-4" strokeWidth={1.25} />} label="Bathrooms" value={String(project.baths)} />}
          <Fact icon={<CalendarClock className="h-4 w-4" strokeWidth={1.25} />} label="Delivery" value={project.delivery} />
          <Fact icon={<span className="font-display text-lg">₦</span>} label="From" value={project.priceLabel} />
        </div>
      </section>

      {/* Body: two-column */}
      <section className="py-20 md:py-28 bg-ivory">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10 grid md:grid-cols-12 gap-12 lg:gap-16">
          {/* Left */}
          <div className="md:col-span-8 space-y-20">
            {/* Overview */}
            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">Overview</div>
              <p className="font-display text-2xl md:text-[2rem] leading-[1.3] tracking-[-0.01em] text-ink max-w-2xl">
                {project.description}
              </p>
            </div>

            {/* Amenities */}
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

            {/* Payment plans */}
            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">Payment plans</div>
              <div className="border-t border-ink/10">
                {project.paymentPlans.map((p) => (
                  <div key={p.name} className="grid grid-cols-12 gap-4 py-5 border-b border-ink/10 items-baseline">
                    <div className="col-span-12 md:col-span-3 font-display text-xl text-ink">{p.name}</div>
                    <div className="col-span-4 md:col-span-3 text-[13px] text-ink/60">{p.term}</div>
                    <div className="col-span-4 md:col-span-3 text-[13px] text-ink/60">{p.note}</div>
                    <div className="col-span-4 md:col-span-3 md:text-right text-[13px] text-gilt tracking-wide">{p.discount}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Units */}
            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">Available units</div>
              <div className="border-t border-ink/10">
                {project.units.map((u) => (
                  <div key={u.name} className="grid grid-cols-12 gap-4 py-5 border-b border-ink/10 items-center">
                    <div className="col-span-6 md:col-span-3 font-display text-xl text-ink">{u.name}</div>
                    <div className="col-span-6 md:col-span-3 text-[13px] text-ink/60">{u.type}</div>
                    <div className="col-span-4 md:col-span-2 text-[13px] text-ink/60">{u.size}</div>
                    <div className="col-span-4 md:col-span-2 text-[13px] text-ink">{u.price}</div>
                    <div className="col-span-4 md:col-span-2 md:text-right">
                      <UnitStatus status={u.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">Gallery</div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {project.gallery.map((src, i) => {
                  const wide = i % 5 === 0 || i % 5 === 3;
                  return (
                    <div
                      key={i}
                      className={`overflow-hidden bg-ink ${wide ? "md:col-span-8 aspect-[16/10]" : "md:col-span-4 aspect-[4/5]"}`}
                    >
                      <img src={src} alt={`${project.name} — view ${i + 1}`} loading="lazy" className="h-full w-full object-cover hover:scale-[1.03] transition-transform duration-[1200ms]" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Location */}
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
                  <div className="text-[12px] tracking-[0.3em] uppercase text-ink/50 mb-6">{project.coords}</div>
                  <ul className="space-y-3">
                    {project.nearby.map((n) => (
                      <li key={n} className="text-[14px] text-ink/70 border-b border-ink/10 pb-3">{n}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* FAQ */}
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
          </div>

          {/* Sticky sidebar */}
          <aside className="md:col-span-4">
            <div className="md:sticky md:top-28 space-y-6">
              <div className="bg-ink text-ivory p-8">
                <div className="text-[10px] tracking-[0.3em] uppercase text-gilt mb-4">
                  Private inspection
                </div>
                <div className="font-display text-[2rem] leading-[1.1] mb-4">
                  Walk the site with a Motiva specialist.
                </div>
                <p className="text-ivory/70 text-[14px] mb-6">
                  Weekday appointments and Saturday guided tours. Diaspora buyers can request a live-video walkthrough.
                </p>
                <Link
                  to="/contact"
                  search={{ intent: "inspection", project: project.slug }}
                  className="inline-flex items-center justify-between gap-6 w-full bg-gilt text-ink px-5 py-3 rounded-full text-[13px] tracking-wide hover:bg-gilt/90 transition-colors"
                >
                  <span>Book an inspection</span>
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
                <button
                  type="button"
                  onClick={() => setSubscribeOpen(true)}
                  className="mt-3 inline-flex items-center justify-between gap-6 w-full border border-ivory/30 text-ivory px-5 py-3 rounded-full text-[13px] tracking-wide hover:border-ivory transition-colors"
                >
                  <span>Reserve Your Spot</span>
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>

              <div className="bg-mist p-8">
                <div className="text-[10px] tracking-[0.3em] uppercase text-ink/50 mb-4">Your specialist</div>
                <div className="font-display text-2xl text-ink">Adaeze Okafor</div>
                <div className="text-[13px] text-ink/60 mt-1">Head of Sales, Lagos</div>
                <div className="mt-4 flex flex-col gap-2 text-[13px] text-ink/70">
                  <a href="tel:+2348000000000" className="hover:text-ink">+234 (0) 800 000 0000</a>
                  <a href="mailto:adaeze@motiva.ng" className="hover:text-ink">adaeze@motiva.ng</a>
                  <a href="https://wa.me/2348000000000" className="hover:text-ink">WhatsApp</a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <SubscribeModal open={subscribeOpen} onOpenChange={setSubscribeOpen} projectName={project.name} />
    </>
  );
}

function Fact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-10 w-10 rounded-full bg-mist flex items-center justify-center text-ink">{icon}</div>
      <div>
        <div className="text-[10px] tracking-[0.3em] uppercase text-ink/50">{label}</div>
        <div className="text-[15px] text-ink font-medium">{value}</div>
      </div>
    </div>
  );
}

function UnitStatus({ status }: { status: "Available" | "Reserved" | "Sold" }) {
  const cls =
    status === "Available"
      ? "bg-gilt/25 text-ink"
      : status === "Reserved"
        ? "bg-ink/10 text-ink/60"
        : "bg-ink/70 text-ivory/90";
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] tracking-[0.25em] uppercase ${cls}`}>
      {status}
    </span>
  );
}
