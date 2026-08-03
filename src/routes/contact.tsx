import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Nav } from "@/components/motiva/Nav";
import { Footer } from "@/components/motiva/Footer";
import { WhatsAppBubble } from "@/components/motiva/WhatsAppBubble";
import { PageHeader } from "@/components/motiva/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { projectsQueryOptions, landQueryOptions } from "@/lib/sanity/queries";
import type { SanityProject, SanityLand } from "@/lib/sanity/types";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { usePageReveal } from "@/hooks/use-page-reveal";
import { submitEnquiry } from "@/lib/api";

const searchSchema = z.object({
  intent: fallback(z.enum(["enquiry", "inspection"]), "enquiry").default("enquiry"),
  project: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/contact")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Contact & Inspections — Motiva Real Estate" },
      {
        name: "description",
        content:
          "Speak to a Motiva specialist, book a private site inspection, or request a diaspora video walkthrough.",
      },
      { property: "og:title", content: "Contact & Inspections — Motiva Real Estate" },
      {
        property: "og:description",
        content: "Book a private inspection or begin a Motiva conversation.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Motiva Estate Company",
          telephone: "+234-815-324-2398",
          email: "askme@motivaestate.com",
          url: "https://www.motivaestate.com",
          address: [
            {
              "@type": "PostalAddress",
              streetAddress: "5 OP Fingesi Street, Utako",
              addressLocality: "Abuja",
              addressCountry: "NG",
            },
            {
              "@type": "PostalAddress",
              streetAddress: "11 Michael Adebamowo, Olorunda Estate, Ketu",
              addressLocality: "Lagos",
              addressCountry: "NG",
            },
          ],
          areaServed: ["Lagos", "Abuja"],
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  usePageReveal();
  const { intent, project } = Route.useSearch();
  const [tab, setTab] = useState<string>(intent);

  return (
    <div className="bg-ivory text-ink min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <PageHeader
          eyebrow="008 — Begin"
          title={
            <>
              Begin a Motiva
              <br />
              conversation.
            </>
          }
          intro="Every enquiry is read by a member of the sales team within the working day. Site inspections are hosted by a specialist, not an agent."
          crumbs={[{ label: "Motiva", to: "/" }, { label: "Contact" }]}
        />

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[1500px] px-6 md:px-10 grid md:grid-cols-12 gap-12 lg:gap-16">
            <div className="md:col-span-7">
              <Tabs value={tab} onValueChange={setTab}>
                <TabsList className="bg-mist p-1 rounded-full h-auto">
                  <TabsTrigger
                    value="enquiry"
                    className="rounded-full px-6 py-2 data-[state=active]:bg-ink data-[state=active]:text-ivory"
                  >
                    General enquiry
                  </TabsTrigger>
                  <TabsTrigger
                    value="inspection"
                    className="rounded-full px-6 py-2 data-[state=active]:bg-ink data-[state=active]:text-ivory"
                  >
                    Book an inspection
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="enquiry" className="mt-10">
                  <EnquiryForm defaultProject={project} />
                </TabsContent>
                <TabsContent value="inspection" className="mt-10">
                  <InspectionForm defaultProject={project} />
                </TabsContent>
              </Tabs>
            </div>

            <aside className="md:col-span-5">
              <div className="bg-ink text-ivory p-8 md:p-10">
                <div className="text-[10px] tracking-[0.3em] uppercase text-gilt mb-4">
                  Direct lines
                </div>
                <div className="font-display text-3xl md:text-4xl leading-[1.15] mb-8">
                  Prefer to speak with someone now?
                </div>
                <ul className="space-y-5 text-[14px] text-ivory/80">
                  <li className="flex items-center gap-4">
                    <span className="h-9 w-9 rounded-full bg-ivory/10 flex items-center justify-center">
                      <Phone className="h-4 w-4 text-gilt" strokeWidth={1.5} />
                    </span>
                    <a href="tel:+2348153242398" className="hover:text-ivory">
                      +234 815 324 2398
                    </a>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="h-9 w-9 rounded-full bg-ivory/10 flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 text-gilt" strokeWidth={1.5} />
                    </span>
                    <a href="https://wa.me/2348153242398" className="hover:text-ivory">
                      WhatsApp — reply in ~10 min
                    </a>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="h-9 w-9 rounded-full bg-ivory/10 flex items-center justify-center">
                      <Mail className="h-4 w-4 text-gilt" strokeWidth={1.5} />
                    </span>
                    <a href="mailto:askme@motivaestate.com" className="hover:text-ivory">
                      askme@motivaestate.com
                    </a>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="h-9 w-9 rounded-full bg-ivory/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-4 w-4 text-gilt" strokeWidth={1.5} />
                    </span>
                    <span>
                      <span className="block text-[10px] tracking-[0.3em] uppercase text-gilt mb-1">
                        Abuja
                      </span>
                      5 OP Fingesi Street, Utako
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="h-9 w-9 rounded-full bg-ivory/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-4 w-4 text-gilt" strokeWidth={1.5} />
                    </span>
                    <span>
                      <span className="block text-[10px] tracking-[0.3em] uppercase text-gilt mb-1">
                        Lagos
                      </span>
                      11 Michael Adebamowo,
                      <br />
                      Olorunda Estate, Ketu
                    </span>
                  </li>
                </ul>
                <div className="mt-10 pt-8 border-t border-ivory/15">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-gilt mb-3">
                    Diaspora buyers
                  </div>
                  <p className="text-[13px] text-ivory/70 leading-relaxed">
                    We host live-video walkthroughs of any residence, on request. Write to{" "}
                    <a
                      href="mailto:motivaestate@gmail.com"
                      className="text-ivory underline underline-offset-4"
                    >
                      motivaestate@gmail.com
                    </a>{" "}
                    and ask for the Diaspora Desk.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppBubble />
    </div>
  );
}

// ── Interest → what additional field to show ──────────────────────────────────
type Interest =
  | "A specific residence"
  | "Land"
  | "A general portfolio conversation"
  | "Diaspora buying"
  | "Rental"
  | "Investment / partnership";

const INTERESTS: Interest[] = [
  "A specific residence",
  "Land",
  "A general portfolio conversation",
  "Diaspora buying",
  "Rental",
  "Investment / partnership",
];

function EnquiryForm({ defaultProject }: { defaultProject: string }) {
  const { data: projects } = useQuery(projectsQueryOptions);
  const { data: lands } = useQuery(landQueryOptions);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [interest, setInterest] = useState<Interest>("A specific residence");

  async function handle(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = (fd.get("name") as string)?.trim();
    const email = (fd.get("email") as string)?.trim();
    const phone = (fd.get("phone") as string)?.trim();
    const message = (fd.get("message") as string)?.trim();

    // Selected property/land id (sent as propertyId) and display name
    const propertyId = (fd.get("propertyId") as string)?.trim() || undefined;
    const propertyName = (fd.get("propertyName") as string)?.trim() || undefined;

    if (!name || !email || !phone || !message) {
      toast.error("Please complete all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      await submitEnquiry({
        name,
        email,
        phone,
        message: [
          `Subject: ${interest}`,
          propertyName ? `Property of interest: ${propertyName}` : "",
          "",
          message,
        ]
          .filter((l, i) => i < 2 || l !== "")
          .join("\n"),
        propertyId,
      });
      setDone(true);
      form.reset();
      setInterest("A specific residence");
      toast.success("Your enquiry is with the sales team. Reply within the working day.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="border border-ink/15 p-10 text-center">
        <div className="text-[10px] tracking-[0.4em] uppercase text-gilt mb-4">Received</div>
        <div className="font-display text-3xl text-ink mb-3">Thank you.</div>
        <p className="text-ink/60 mb-8">A Motiva specialist will reply within the working day.</p>
        <button
          onClick={() => setDone(false)}
          className="text-[13px] tracking-wide text-ink border-b border-ink/40 pb-1 hover:border-ink"
        >
          Send another message
        </button>
      </div>
    );
  }

  const showResidences = interest === "A specific residence";
  const showLand = interest === "Land";

  return (
    <form onSubmit={handle} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Full name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" required />
        {/* Interest selector — controls which property picker appears */}
        <div>
          <Label className="text-[11px] tracking-[0.25em] uppercase text-ink/60">
            I'm interested in *
          </Label>
          <select
            name="subject"
            required
            value={interest}
            onChange={(e) => setInterest(e.target.value as Interest)}
            className="mt-2 w-full appearance-none rounded-md border border-ink/15 bg-ivory px-3 py-2 text-[14px] text-ink focus:outline-none focus:ring-2 focus:ring-gilt"
          >
            {INTERESTS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Conditionally show residence OR land picker */}
      {showResidences && (
        <PropertyPicker
          label="Which residence?"
          items={(projects ?? []).map((p) => ({ id: p._id, name: p.title }))}
          defaultId={defaultProject}
        />
      )}
      {showLand && (
        <PropertyPicker
          label="Which land parcel?"
          items={(lands ?? []).map((l) => ({ id: l._id, name: l.name }))}
          defaultId=""
        />
      )}

      <div>
        <Label className="text-[11px] tracking-[0.25em] uppercase text-ink/60">Message *</Label>
        <Textarea
          name="message"
          required
          rows={5}
          className="mt-2 bg-ivory border-ink/15 focus-visible:ring-gilt"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-3 bg-ink text-ivory px-6 py-3 rounded-full text-[13px] tracking-wide hover:bg-ink/90 disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send the enquiry"}
      </button>
    </form>
  );
}

/** Renders a dropdown of properties/land parcels.
 *  Emits two hidden fields: propertyId (the _id) and propertyName (the title). */
function PropertyPicker({
  label,
  items,
  defaultId,
}: {
  label: string;
  items: { id: string; name: string }[];
  defaultId: string;
}) {
  const [selected, setSelected] = useState(defaultId);
  const selectedName = items.find((i) => i.id === selected)?.name ?? "";
  return (
    <div>
      <Label className="text-[11px] tracking-[0.25em] uppercase text-ink/60">{label}</Label>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="mt-2 w-full appearance-none rounded-md border border-ink/15 bg-ivory px-3 py-2 text-[14px] text-ink focus:outline-none focus:ring-2 focus:ring-gilt"
      >
        <option value="">— select —</option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      {/* Hidden fields so handle() can read id and name */}
      <input type="hidden" name="propertyId" value={selected} />
      <input type="hidden" name="propertyName" value={selectedName} />
    </div>
  );
}

function InspectionForm({ defaultProject }: { defaultProject: string }) {
  const { data: projects } = useQuery(projectsQueryOptions);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  async function handle(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = (fd.get("name") as string)?.trim();
    const email = (fd.get("email") as string)?.trim();
    const phone = (fd.get("phone") as string)?.trim();
    const date = (fd.get("date") as string)?.trim();
    const time = (fd.get("time") as string)?.trim();
    const propertyId = (fd.get("propertyId") as string)?.trim() || undefined;
    const propertyName = (fd.get("propertyName") as string)?.trim();
    const notes = (fd.get("notes") as string)?.trim();

    if (!name || !email || !phone || !date || !time || !propertyId) {
      toast.error("Please complete all required fields including selecting a residence.");
      return;
    }
    setSubmitting(true);
    try {
      await submitEnquiry({
        name,
        email,
        phone,
        message: `INSPECTION REQUEST\nResidence: ${propertyName}\nPreferred date: ${date} at ${time}${notes ? `\n\nNotes: ${notes}` : ""}`,
        propertyId,
      });
      setDone(true);
      form.reset();
      toast.success("Inspection request received. Confirmation by email shortly.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="border border-ink/15 p-10 text-center">
        <div className="text-[10px] tracking-[0.4em] uppercase text-gilt mb-4">Booked</div>
        <div className="font-display text-3xl text-ink mb-3">See you on site.</div>
        <p className="text-ink/60 mb-8">
          A specialist will confirm the exact time by email and WhatsApp.
        </p>
        <button
          onClick={() => setDone(false)}
          className="text-[13px] tracking-wide text-ink border-b border-ink/40 pb-1 hover:border-ink"
        >
          Book another inspection
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handle} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Full name" name="name" required />
        <Field label="Phone" name="phone" type="tel" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Preferred date" name="date" type="date" required min={today} />
        <SelectField
          label="Preferred time"
          name="time"
          required
          options={[
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
          ]}
        />
      </div>
      <PropertyPicker
        label="Residence *"
        items={(projects ?? []).map((p) => ({ id: p._id, name: p.title }))}
        defaultId={defaultProject}
      />
      <div>
        <Label className="text-[11px] tracking-[0.25em] uppercase text-ink/60">
          Notes (optional)
        </Label>
        <Textarea
          name="notes"
          rows={4}
          className="mt-2 bg-ivory border-ink/15 focus-visible:ring-gilt"
          placeholder="Anything the specialist should know before you meet."
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-3 bg-ink text-ivory px-6 py-3 rounded-full text-[13px] tracking-wide hover:bg-ink/90 disabled:opacity-60"
      >
        {submitting ? "Booking…" : "Request the inspection"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  min,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  min?: string;
}) {
  return (
    <div>
      <Label className="text-[11px] tracking-[0.25em] uppercase text-ink/60">
        {label}
        {required && " *"}
      </Label>
      <Input
        name={name}
        type={type}
        required={required}
        min={min}
        className="mt-2 bg-ivory border-ink/15 focus-visible:ring-gilt"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <Label className="text-[11px] tracking-[0.25em] uppercase text-ink/60">
        {label}
        {required && " *"}
      </Label>
      <select
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="mt-2 w-full appearance-none rounded-md border border-ink/15 bg-ivory px-3 py-2 text-[14px] text-ink focus:outline-none focus:ring-2 focus:ring-gilt"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o || "— select —"}
          </option>
        ))}
      </select>
    </div>
  );
}
