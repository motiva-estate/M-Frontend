import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Nav } from "@/components/motiva/Nav";
import { Footer } from "@/components/motiva/Footer";
import { WhatsAppBubble } from "@/components/motiva/WhatsAppBubble";
import { PageHeader } from "@/components/motiva/PageHeader";
import { ArrowUpRight } from "lucide-react";
import about1 from "@/assets/motiva/about-1.jpg";
import about2 from "@/assets/motiva/about-2.jpg";
import { companyInfoQueryOptions } from "@/lib/sanity/queries";
import { usePageReveal } from "@/hooks/use-page-reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Practice — Motiva Estate Company" },
      { name: "description", content: "Motiva Estate Company (MEC) is a fully integrated real-estate practice founded in 2010, with offices in Lagos and Abuja. Meet the mission, method and guarantees behind the work." },
      { property: "og:title", content: "The Practice — Motiva Estate Company" },
      { property: "og:description", content: "Fully integrated real-estate solutions for private, corporate and public-sector clients since 2010." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(companyInfoQueryOptions),
  component: About,
});

const responsibilities = [
  { n: "I", title: "To our clients", body: "Individuals, families, firms and corporations — our topmost responsibility is to provide valuable, tailored service at every point of contact." },
  { n: "II", title: "To our team", body: "The people who work coherently, day in and day out, to make sure the common goal is met — and rewarded for it." },
  { n: "III", title: "To our stewards", body: "The management and shareholders who keep the practice a going concern, and who ask that we keep raising the standard." },
];

const guarantees = [
  "A healthy, clean and safe environment for every client, occupant and visitor.",
  "Developments of high quality, functionality and aesthetic composure.",
  "Full compliance with safety, planning and building regulations.",
  "Building systems that remain fully functional, safe and well-tended.",
  "Support services that translate to a hitch-free working and living condition.",
  "Preserved and enhanced value across the property and its building systems.",
  "An extended life-span for the building and its appurtenances.",
];

const qualityAssurance = [
  "Strict principles adopted across every building development and preventive-maintenance engagement.",
  "Attention to detail at every stage — design, delivery and after-care.",
  "Response to client requests within hours, not days.",
  "Employment and continuous training of competent, motivated professionals.",
  "Use of the best available equipment, materials and building systems.",
  "Performance monitored through structured client feedback.",
  "Adherence to clearly written Service Level Agreements on every engagement.",
];

const clientele = [
  "Linear Insurance Brokers Ltd",
  "The Nigerian Red Cross",
  "Accord Homes Ltd",
  "AMCON",
  "IITA",
  "American University of Nigeria",
  "Alexander Blage Ltd",
  "Exprotech",
  "Power Plus Ltd",
];

function About() {
  usePageReveal();
  const { data: company } = useSuspenseQuery(companyInfoQueryOptions);
  const missionText = company?.mission ??
    "To provide the best fully integrated real-estate solutions in line with the utmost interest of our clients — with human capital and modern technology working seamlessly, so every client receives value.";
  const visionText = company?.vision ??
    "To be a foremost player in the real-estate industry, noted for unmatched quality of service delivery to our clients.";
  const stats = company?.stats ?? [];

  return (
    <div className="bg-ivory text-ink min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <PageHeader
          eyebrow="004 — About Us"
          title={<>A practice, not<br />a placeholder.</>}
          intro="Motiva Estate Company (MEC) is a limited liability company founded in 2010 by a team of experienced built-environment professionals. With offices in Lagos and Abuja, we deliver fully integrated real-estate solutions to private, corporate and public-sector clients."
          crumbs={[{ label: "Motiva", to: "/" }, { label: "About" }]}
        />


        {/* Manifesto */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-[1500px] px-6 md:px-10 grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-6">
              <img src={about1} alt="A Motiva residence interior" className="w-full aspect-[4/5] object-cover" />
            </div>
            <div className="md:col-span-6 md:pt-24">
              <p className="font-display text-[1.75rem] md:text-[2.25rem] leading-[1.25] text-ink max-w-lg">
                We understand that <span className="text-gilt italic">no two clients are alike</span> — so we offer tailor-made, leading-edge real-estate services for individuals, corporations and the public sector, so each client can stay focused on the life or business that matters to them.
              </p>
              <p className="mt-8 text-[15px] leading-relaxed text-ink/70 max-w-lg">
                Our services balance leading-edge features with safety and a positive environment, delivered with an unmatched level of client service and attention to detail. From development and advisory to property, facilities and project management, one integrated team carries every engagement through.
              </p>
              <img src={about2} alt="A residence under construction" className="mt-12 w-full aspect-[4/3] object-cover" />
            </div>
          </div>
        </section>

        {/* Mission / Vision */}
        <section className="py-24 md:py-32 bg-mist">
          <div className="mx-auto max-w-[1500px] px-6 md:px-10 grid md:grid-cols-12 gap-10">
            <div className="md:col-span-6 border-t border-ink/15 pt-8">
              <div className="text-[10px] tracking-[0.3em] uppercase text-gilt mb-4">Mission</div>
              <p className="font-display text-[1.5rem] md:text-[2rem] leading-[1.25] text-ink">
                {missionText}
              </p>
            </div>
            <div className="md:col-span-6 border-t border-ink/15 pt-8">
              <div className="text-[10px] tracking-[0.3em] uppercase text-gilt mb-4">Vision</div>
              <p className="font-display text-[1.5rem] md:text-[2rem] leading-[1.25] text-ink">
                {visionText}
              </p>
            </div>
            {stats.length > 0 && (
              <div className="md:col-span-12 mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-ink/15 pt-10">
                {stats.map((s, i) => (
                  <div key={s._key ?? i}>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-ink/50 mb-2">{s.label}</div>
                    <div className="font-display text-[1.5rem] md:text-[1.85rem] text-ink leading-tight">{s.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>


        {/* Core ideology */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-[1500px] px-6 md:px-10">
            <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-8">Core ideology — three responsibilities</div>
            <div className="grid md:grid-cols-3 gap-8 border-t border-ink/15 pt-14">
              {responsibilities.map((r) => (
                <div key={r.n} className="md:pr-6">
                  <div className="font-display text-4xl text-ink/30 mb-8">{r.n}</div>
                  <h3 className="font-display text-xl md:text-2xl text-ink mb-3">{r.title}</h3>
                  <p className="text-[14px] text-ink/70 leading-relaxed">{r.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guarantees */}
        <section className="py-24 md:py-32 bg-ink text-ivory">
          <div className="mx-auto max-w-[1500px] px-6 md:px-10 grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <div className="text-[10px] tracking-[0.4em] uppercase text-ivory/50 mb-6">The Motiva guarantee</div>
              <h2 className="font-display text-[2.25rem] md:text-[3rem] leading-[1.05] text-ivory">
                What we hold ourselves to.
              </h2>
              <p className="mt-6 text-[14px] text-ivory/60 max-w-sm leading-relaxed">
                Quality assurance is a discipline, not a promise. We adopt strict principles across building development and preventive maintenance, attend to every request within hours, and monitor our own performance through client feedback and written SLAs.
              </p>
            </div>
            <ul className="md:col-span-8 border-t border-ivory/15">
              {guarantees.map((g, i) => (
                <li key={i} className="flex gap-6 py-5 border-b border-ivory/15">
                  <span className="font-display text-[11px] tracking-[0.3em] uppercase text-gilt shrink-0 w-10 pt-1">0{i + 1}</span>
                  <span className="text-[15px] text-ivory/85 leading-relaxed">{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Quality Assurance */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-[1500px] px-6 md:px-10 grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">Quality assurance</div>
              <h2 className="font-display text-[2.25rem] md:text-[3rem] leading-[1.05] text-ink">
                A discipline, not a promise.
              </h2>
              <p className="mt-6 text-[14px] text-ink/70 max-w-sm leading-relaxed">
                Seven commitments we hold ourselves to on every engagement — from the first site visit to long-term facilities care.
              </p>
            </div>
            <ul className="md:col-span-8 border-t border-ink/15">
              {qualityAssurance.map((q, i) => (
                <li key={i} className="flex gap-6 py-5 border-b border-ink/10">
                  <span className="font-display text-[11px] tracking-[0.3em] uppercase text-gilt shrink-0 w-10 pt-1">Q{i + 1}</span>
                  <span className="text-[15px] text-ink/85 leading-relaxed">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Staff & Partnership */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-[1500px] px-6 md:px-10 grid md:grid-cols-2 gap-12">
            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">Our people</div>
              <p className="font-display text-[1.5rem] md:text-[1.85rem] leading-[1.3] text-ink">
                A vibrant human-capital department recruits, trains and retrains highly motivated professionals with proven competence in the built-environment industry.
              </p>
              <p className="mt-6 text-[14px] text-ink/70 leading-relaxed max-w-lg">
                We invest continuously in staff development so our team stays abreast of dynamic global practices — the right people, attending to every detail with a professional and excellent approach. A functional health and safety policy, and a good health insurance plan, sit behind them.
              </p>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">Technical partnership</div>
              <p className="font-display text-[1.5rem] md:text-[1.85rem] leading-[1.3] text-ink">
                A standing partnership with The Setscape Building and Engineering Services Limited.
              </p>
              <p className="mt-6 text-[14px] text-ink/70 leading-relaxed max-w-lg">
                Setscape is a high-end, technologically driven engineering firm with international affiliations and competent service delivery across the built-environment industry — a quiet complement to our in-house teams.
              </p>
            </div>
          </div>
        </section>

        {/* Clientele */}
        <section className="py-24 md:py-32 bg-mist">
          <div className="mx-auto max-w-[1500px] px-6 md:px-10">
            <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-8">Selected clientele</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 border-t border-ink/15 pt-10">
              {clientele.map((c) => (
                <div key={c} className="text-[15px] text-ink/80 py-2 border-b border-ink/10">{c}</div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32 bg-ink text-ivory">
          <div className="mx-auto max-w-[1500px] px-6 md:px-10 grid md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-8">
              <h2 className="font-display text-[2.5rem] md:text-[4rem] leading-[1] text-ivory">
                See the projects, or begin a conversation.
              </h2>
            </div>
            <div className="md:col-span-4 md:justify-self-end flex flex-col gap-3 w-full md:w-auto">
              <Link to="/projects" className="inline-flex items-center justify-between gap-6 border-b border-ivory/40 pb-3 text-sm tracking-wide hover:border-ivory transition-colors">
                <span>View projects</span>
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-between gap-6 border-b border-gilt pb-3 text-sm tracking-wide text-gilt hover:text-ivory">
                <span>Begin a conversation</span>
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
