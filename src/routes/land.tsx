import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Nav } from "@/components/motiva/Nav";
import { Footer } from "@/components/motiva/Footer";
import { WhatsAppBubble } from "@/components/motiva/WhatsAppBubble";
import { PageHeader } from "@/components/motiva/PageHeader";
import { LandStatusBadge } from "@/components/motiva/StatusBadge";
import { WhatsAppCta, landWhatsAppText } from "@/components/motiva/WhatsAppCta";
import { ArrowUpRight } from "lucide-react";
import { landQueryOptions } from "@/lib/sanity/queries";
import { resolveImage } from "@/lib/sanity/image";
import { landCover } from "@/lib/sanity/fallbacks";
import type { SanityLand } from "@/lib/sanity/types";
import { usePageReveal } from "@/hooks/use-page-reveal";

export const Route = createFileRoute("/land")({
  loader: ({ context }) => context.queryClient.ensureQueryData(landQueryOptions),
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
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center bg-ivory text-ink px-6">
      <div className="text-center max-w-md">
        <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">Unable to load</div>
        <h1 className="font-display text-4xl mb-4">Land didn't load.</h1>
        <p className="text-ink/60">{error.message}</p>
      </div>
    </div>
  ),
  notFoundComponent: () => <div>No parcels found.</div>,
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
  usePageReveal();
  const { data: parcels } = useSuspenseQuery(landQueryOptions);
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
          {parcels.map((l) => (
            <LandCard key={l._id} parcel={l} />
          ))}
        </div>
      </section>
    </>
  );
}

function LandCard({ parcel }: { parcel: SanityLand }) {
  const cover = landCover(parcel.slug, resolveImage(parcel.cover, { width: 1400 }) ?? parcel.coverUrl);
  return (
    <div className="group">
      <Link to="/land/$slug" params={{ slug: parcel.slug }} className="block">
        <div className="relative aspect-[16/11] overflow-hidden bg-ink">
          <img
            src={cover}
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
            {parcel.sizes && parcel.sizes.length > 0 && (
              <div className="mt-2 text-[13px] text-ink/60">
                Sizes available: {parcel.sizes.join(" · ")} SQM
              </div>
            )}
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
