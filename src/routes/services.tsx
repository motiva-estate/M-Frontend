import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Nav } from "@/components/motiva/Nav";
import { Footer } from "@/components/motiva/Footer";
import { WhatsAppBubble } from "@/components/motiva/WhatsAppBubble";
import { PageHeader } from "@/components/motiva/PageHeader";
import { ArrowUpRight } from "lucide-react";
import { servicesQueryOptions } from "@/lib/sanity/queries";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Motiva Estate Company" },
      { name: "description", content: "Six disciplines under one roof: property development & investments, advisory, property management, facilities management, project management and brokerage — across Lagos and Abuja." },
      { property: "og:title", content: "Services — Motiva Estate Company" },
      { property: "og:description", content: "Fully integrated real-estate services across development, advisory, management, project delivery and brokerage." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(servicesQueryOptions),
  component: ServicesPage,
});

function ServicesPage() {
  const { data: services } = useSuspenseQuery(servicesQueryOptions);

  return (
    <div className="bg-ivory text-ink min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <PageHeader
          eyebrow="003 — Practice"
          title={<>Six disciplines,<br />one standard.</>}
          intro="Motiva is a fully integrated real-estate practice. Every engagement — from land acquisition to hour-by-hour facilities response — is carried by one team under one written standard of care."
          crumbs={[{ label: "Motiva", to: "/" }, { label: "Services" }]}
        />

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[1500px] px-6 md:px-10">
            <div className="border-t border-ink/15">
              {services.map((s) => (
                <article key={s._id} className="grid md:grid-cols-12 gap-8 md:gap-16 py-14 md:py-20 border-b border-ink/15">
                  <div className="md:col-span-4">
                    <div className="text-[11px] tracking-[0.35em] uppercase text-gilt mb-6">{s.number}</div>
                    <h2 className="font-display text-[1.85rem] md:text-[2.25rem] leading-[1.1] tracking-[-0.01em] text-ink">
                      {s.title}
                    </h2>
                  </div>
                  <div className="md:col-span-8">
                    <p className="font-display text-[1.35rem] md:text-[1.6rem] leading-[1.3] text-ink max-w-2xl">
                      {s.lede}
                    </p>
                    <p className="mt-6 text-[15px] text-ink/70 leading-relaxed max-w-2xl">{s.body}</p>
                    {s.items && (
                      <ul className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-2 max-w-2xl border-t border-ink/10 pt-6">
                        {s.items.map((item) => (
                          <li key={item} className="flex gap-3 py-2 border-b border-ink/10 text-[14px] text-ink/80">
                            <span className="text-gilt">—</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 bg-ink text-ivory">
          <div className="mx-auto max-w-[1500px] px-6 md:px-10 grid md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-8">
              <div className="text-[10px] tracking-[0.4em] uppercase text-ivory/50 mb-6">Begin a conversation</div>
              <h2 className="font-display text-[2.5rem] md:text-[4rem] leading-[1] text-ivory">
                Tell us the brief. We'll tell you honestly which discipline you need first.
              </h2>
            </div>
            <div className="md:col-span-4 md:justify-self-end w-full md:w-auto">
              <Link
                to="/contact"
                className="inline-flex items-center justify-between gap-6 border-b border-gilt pb-3 text-sm tracking-wide text-gilt hover:text-ivory w-full md:w-72"
              >
                <span>Speak to a specialist</span>
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppBubble />
    </div>
  );
}
