import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/motiva/Nav";
import { Footer } from "@/components/motiva/Footer";
import { WhatsAppBubble } from "@/components/motiva/WhatsAppBubble";
import { PageHeader } from "@/components/motiva/PageHeader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { usePageReveal } from "@/hooks/use-page-reveal";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Questions & Answers — Motiva Real Estate" },
      { name: "description", content: "Frequently asked questions about buying, financing, diaspora purchase, and site inspections with Motiva." },
      { property: "og:title", content: "Questions & Answers — Motiva Real Estate" },
      { property: "og:description", content: "Everything you might want to know before buying a Motiva residence." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: groups.flatMap((g) =>
            g.items.map((it) => ({
              "@type": "Question",
              name: it.q,
              acceptedAnswer: { "@type": "Answer", text: it.a },
            })),
          ),
        }),
      },
    ],
  }),
  component: FAQPage,
});

const groups: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Buying",
    items: [
      { q: "How do I reserve a residence?", a: "A reservation is confirmed with a signed offer letter and a 5% goodwill deposit, held in escrow until final documents are executed." },
      { q: "What documents will I receive?", a: "A signed Contract of Sale, a Deed of Assignment, and either a global or per-unit Certificate of Occupancy depending on the estate." },
      { q: "Do you handle title verification?", a: "Yes. Every Motiva project is subject to independent title search before land is acquired; buyers receive the search results on request." },
    ],
  },
  {
    title: "Payments",
    items: [
      { q: "Can I pay in installments?", a: "Yes. Outright, 6-, 12-, and 24-month structured plans are standard. Selected projects support 36 months. Terms vary by project — see the payment plan on each residence." },
      { q: "Are there hidden charges?", a: "No. Legal, documentation, and estate service charges are itemised in the offer letter before you sign. There are no undisclosed developer fees." },
      { q: "Do you accept foreign payment?", a: "Yes — USD, GBP, and EUR are accepted through licensed IMTOs, with a naira-equivalent receipt issued for records." },
    ],
  },
  {
    title: "Diaspora buyers",
    items: [
      { q: "Can I buy without visiting Nigeria?", a: "Yes. Our Diaspora Desk hosts live-video walkthroughs, arranges independent inspection reports, and executes documents via authenticated e-signature." },
      { q: "Who represents me on the ground?", a: "You may nominate a family member, or engage one of Motiva's vetted independent surveyors at cost." },
    ],
  },
  {
    title: "Inspections",
    items: [
      { q: "How do I book a site inspection?", a: "Choose a residence and click Book an inspection, or request one from any residence page. A specialist confirms within the working day." },
      { q: "Can I bring my architect or lawyer?", a: "Absolutely. We encourage it. Please note their name in the booking so security is arranged in advance." },
    ],
  },
];

function FAQPage() {
  usePageReveal();
  return (
    <div className="bg-ivory text-ink min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <PageHeader
          eyebrow="009 — Q&A"
          title={<>Questions we're<br />asked most often.</>}
          intro="Anything else? Write to us — every question is read by a person, not a bot."
          crumbs={[{ label: "Motiva", to: "/" }, { label: "FAQ" }]}
        />

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[1100px] px-6 md:px-10 space-y-16">
            {groups.map((g) => (
              <div key={g.title}>
                <div className="text-[10px] tracking-[0.4em] uppercase text-gilt mb-6">{g.title}</div>
                <Accordion type="single" collapsible className="border-t border-ink/10">
                  {g.items.map((it, i) => (
                    <AccordionItem key={i} value={`${g.title}-${i}`} className="border-b border-ink/10">
                      <AccordionTrigger className="font-display text-xl md:text-2xl text-ink hover:no-underline py-6">
                        {it.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-[15px] text-ink/70 leading-relaxed pb-6">
                        {it.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppBubble />
    </div>
  );
}
