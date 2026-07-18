import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Nav } from "@/components/motiva/Nav";
import { Footer } from "@/components/motiva/Footer";
import { WhatsAppBubble } from "@/components/motiva/WhatsAppBubble";
import { landParcels, type LandParcel } from "@/data/land";
import { PageHeader } from "@/components/motiva/PageHeader";
import { LandStatusBadge } from "@/components/motiva/StatusBadge";
import { WhatsAppCta, landWhatsAppText } from "@/components/motiva/WhatsAppCta";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/land")({
  head: () => ({
    meta: [
      { title: "Land — Motiva Real Estate" },
      {
        name: "description",
        content:
          "Estate land at Katampe Extension, Abuja — Lanzarote and Kingspark parcels available in a range of SQM sizes.",
      },
      { property: "og:title", content: "Land — Motiva Real Estate" },
      {
        property: "og:description",
        content: "Estate land at Katampe Extension, Abuja. Enquire for current sizes and terms.",
      },
    ],
  }),
  component: LandLayout,
});

function LandLayout() {
  return (
    <div className="bg-ivory text-ink min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppBubble />
    </div>
  );
}

export function LandListing() {
  return (
    <>
      <PageHeader
        eyebrow="003 — Land"
        title={
          <>
            Estate land at<br />Katampe Extension.
          </>
        }
        intro="Two estate parcels in Abuja's Katampe Extension. Sizes are offered per parcel and feed directly into a WhatsApp conversation for current terms."
        crumbs={[{ label: "Motiva", to: "/" }, { label: "Land" }]}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10 grid md:grid-cols-2 gap-10 md:gap-14">
          {landParcels.map((l) => (
            <LandCard key={l.slug} parcel={l} />
          ))}
        </div>
      </section>
    </>
  );
}

function LandCard({ parcel }: { parcel: LandParcel }) {
  return (
    <div className="group">
      <Link to="/land/$slug" params={{ slug: parcel.slug }} className="block">
        <div className="relative aspect-[16/11] overflow-hidden bg-ink">
          <img
            src={parcel.cover}
            alt={parcel.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
          />
          <div className="absolute top-4 left-4">
            <LandStatusBadge status={parcel.status} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
        </div>
        <div className="mt-6 flex items-start justify-between gap-6">
          <div>
            <div className="text-[10px] tracking-[0.35em] uppercase text-ink/50 mb-3">
              {parcel.location}
            </div>
            <h3 className="font-display text-2xl md:text-[1.75rem] text-ink leading-tight">
              {parcel.name}
            </h3>
            <div className="mt-2 text-[13px] text-ink/60">
              Sizes available: {parcel.sizes.join(" · ")} SQM
            </div>
          </div>
          <ArrowUpRight className="h-5 w-5 text-ink/50 group-hover:text-ink transition-colors shrink-0 mt-1" strokeWidth={1.25} />
        </div>
      </Link>
      <div className="mt-4">
        <WhatsAppCta
          text={landWhatsAppText(parcel.name)}
          label="Enquire on WhatsApp"
          variant="outline"
        />
      </div>
    </div>
  );
}
