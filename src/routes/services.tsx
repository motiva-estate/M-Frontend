import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/motiva/Nav";
import { Footer } from "@/components/motiva/Footer";
import { WhatsAppBubble } from "@/components/motiva/WhatsAppBubble";
import { PageHeader } from "@/components/motiva/PageHeader";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Motiva Estate Company" },
      { name: "description", content: "Six disciplines under one roof: property development & investments, advisory, property management, facilities management, project management and brokerage — across Lagos and Abuja." },
      { property: "og:title", content: "Services — Motiva Estate Company" },
      { property: "og:description", content: "Fully integrated real-estate services across development, advisory, management, project delivery and brokerage." },
    ],
  }),
  component: ServicesPage,
});

type Service = {
  n: string;
  title: string;
  lede: string;
  body: string;
  items?: string[];
};

const services: Service[] = [
  {
    n: "01",
    title: "Property Development & Investments",
    lede: "We develop properties through the synergy of sector players — identifying opportunity and bringing the right resources together to harness it.",
    body: "Our development arm partners with government and its agencies to provide quality, affordable housing for the populace, and structures private developments where market demand and land quietly align.",
  },
  {
    n: "02",
    title: "Advisory Services",
    lede: "Our consultancy provides the requisite knowledge and analytical rigour to meet each client's specific needs.",
    body: "Experienced, qualified professionals are on standby to answer the real-estate questions that decide whether a decision is a good one — from feasibility and market read to structuring and exit.",
  },
  {
    n: "03",
    title: "Property Management",
    lede: "Real estate is a large-volume, valuable asset. It should meet the unique goal of its investor.",
    body: "We keep the property in good shape and ensure returns are maximised — with clear reporting, disciplined tenant relations and preventive care that protects both yield and long-term value.",
  },
  {
    n: "04",
    title: "Facilities Management",
    lede: "A qualified, dedicated team of engineers and technicians committed to solving simple and complex maintenance across the building.",
    body: "We maintain and retain the functions and services of your building under a written SLA — with response measured in hours, not weeks.",
    items: [
      "Mechanical, electrical, plumbing and civil works",
      "Generator and lift maintenance",
      "CCTV, telephone, internet and DSTV services",
      "Swimming pool and water-treatment plant",
      "Air-conditioning services",
      "Fumigation, cleaning and dislodgement",
      "Security services",
      "Landscaping",
    ],
  },
  {
    n: "05",
    title: "Project Management",
    lede: "Engineers and project managers with the knowledge and experience to translate complex designs into reality.",
    body: "From inception to delivery, we manage the drawing, the site, the schedule and the specification — paying close attention to design details, quality and timing.",
  },
  {
    n: "06",
    title: "Brokerage Services",
    lede: "Tailored representation for individual clients whose interests deserve to be defended, not just processed.",
    body: "We respond to unique client requests with professionalism, urgency and satisfaction — and we represent our clients in dealings with other parties so value and fair terms are actually attained.",
  },
];

function ServicesPage() {
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
                <article key={s.n} className="grid md:grid-cols-12 gap-8 md:gap-16 py-14 md:py-20 border-b border-ink/15">
                  <div className="md:col-span-4">
                    <div className="text-[11px] tracking-[0.35em] uppercase text-gilt mb-6">{s.n}</div>
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
