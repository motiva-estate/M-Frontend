import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getLand, type LandParcel } from "@/data/land";
import { LandStatusBadge } from "@/components/motiva/StatusBadge";
import { PaymentPlanBlock } from "@/components/motiva/PaymentPlanBlock";
import { WhatsAppCta, landWhatsAppText } from "@/components/motiva/WhatsAppCta";
import { ArrowUpRight, MapPin, Ruler, Check } from "lucide-react";

export const Route = createFileRoute("/land/$slug")({
  loader: ({ params }) => {
    const parcel = getLand(params.slug);
    if (!parcel) throw notFound();
    return { parcel };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.parcel.name} — Land — Motiva` },
          {
            name: "description",
            content: `${loaderData.parcel.name} estate land at ${loaderData.parcel.location}. Sizes: ${loaderData.parcel.sizes.join(", ")} SQM.`,
          },
          { property: "og:title", content: `${loaderData.parcel.name} — Land — Motiva` },
          { property: "og:description", content: `Estate land at ${loaderData.parcel.location}.` },
        ]
      : [{ title: "Land not found — Motiva" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-ivory text-ink px-6">
      <div className="text-center max-w-md">
        <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">404 · No such parcel</div>
        <h1 className="font-display text-5xl mb-4">Not in our current inventory.</h1>
        <Link to="/land" className="text-[13px] tracking-wide bg-ink text-ivory px-5 py-2 rounded-full hover:bg-ink/90">
          Browse land
        </Link>
      </div>
    </div>
  ),
  component: LandDetail,
});

function LandDetail() {
  const { parcel } = Route.useLoaderData() as { parcel: LandParcel };
  const [size, setSize] = useState<number>(parcel.sizes[0]);

  return (
    <>
      <section className="relative h-[72svh] min-h-[520px] bg-ink text-ivory overflow-hidden">
        <img src={parcel.cover} alt={parcel.name} className="absolute inset-0 h-full w-full object-cover ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/20 to-ink/80" />
        <div className="relative z-10 h-full mx-auto max-w-[1500px] px-6 md:px-10 flex flex-col">
          <nav className="pt-28 md:pt-32 flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-ivory/70">
            <Link to="/" className="hover:text-ivory">Motiva</Link>
            <span>/</span>
            <Link to="/land" className="hover:text-ivory">Land</Link>
            <span>/</span>
            <span className="text-ivory">{parcel.name}</span>
          </nav>
          <div className="mt-auto pb-16 md:pb-20">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <LandStatusBadge status={parcel.status} />
              <span className="text-[11px] tracking-[0.3em] uppercase text-ivory/70 inline-flex items-center gap-2">
                <MapPin className="h-3 w-3" strokeWidth={1.5} /> {parcel.location}
              </span>
            </div>
            <h1 className="font-display text-[13vw] md:text-[7vw] lg:text-[6rem] leading-[0.95] tracking-[-0.02em] text-ivory">
              {parcel.name}
            </h1>
            <p className="mt-6 max-w-xl text-[16px] text-ivory/80">
              Estate land at {parcel.estate}.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-ivory">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10 grid md:grid-cols-12 gap-12 lg:gap-16">
          <div className="md:col-span-8 space-y-16">
            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">Overview</div>
              <p className="font-display text-2xl md:text-[2rem] leading-[1.3] tracking-[-0.01em] text-ink max-w-2xl">
                {parcel.description}
              </p>
            </div>

            {/* Size selector */}
            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">Choose a plot size</div>
              <div className="flex flex-wrap gap-3">
                {parcel.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-full border text-[13px] tracking-wide transition-colors ${
                      s === size
                        ? "bg-ink text-ivory border-ink"
                        : "bg-ivory text-ink border-ink/20 hover:border-ink/50"
                    }`}
                  >
                    <Ruler className="h-3.5 w-3.5" strokeWidth={1.5} />
                    {s} SQM
                  </button>
                ))}
              </div>
              <p className="mt-4 text-[13px] text-ink/60">
                Your selected size is passed into the WhatsApp enquiry so we can quote current terms for the {size} SQM plot directly.
              </p>
            </div>

            {parcel.estateAmenities && parcel.estateAmenities.length > 0 && (
              <div>
                <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">Estate amenities</div>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  {parcel.estateAmenities.map((a) => (
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
                {parcel.photos.map((src, i) => (
                  <div
                    key={i}
                    className={`overflow-hidden bg-ink ${i % 3 === 0 ? "md:col-span-8 aspect-[16/10]" : "md:col-span-4 aspect-[4/5]"}`}
                  >
                    <img src={src} alt={`${parcel.name} — view ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="md:col-span-4">
            <div className="md:sticky md:top-28 space-y-6">
              <div className="bg-ink text-ivory p-8">
                <div className="text-[10px] tracking-[0.3em] uppercase text-gilt mb-4">Speak with us</div>
                <div className="font-display text-[2rem] leading-[1.1] mb-4">
                  Enquire about {parcel.name}.
                </div>
                <p className="text-ivory/70 text-[14px] mb-6">
                  Selected: <span className="text-ivory">{size} SQM</span>. Pricing moves with approvals — we'll share current terms directly.
                </p>
                <WhatsAppCta
                  text={landWhatsAppText(parcel.name, size)}
                  label={`Enquire — ${size} SQM`}
                  variant="primary"
                />
                <Link
                  to="/contact"
                  search={{ intent: "enquiry", project: parcel.slug }}
                  className="mt-3 inline-flex items-center justify-between gap-6 w-full border border-ivory/30 text-ivory px-5 py-3 rounded-full text-[13px] tracking-wide hover:border-ivory transition-colors"
                >
                  <span>Send an enquiry</span>
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
