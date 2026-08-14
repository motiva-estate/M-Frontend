import { ArrowUpRight } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useSectionReveal } from "@/hooks/use-section-reveal";
import { submitEnquiry } from "@/lib/api";

export function ContactCTA() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handle(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = (fd.get("name") as string)?.trim();
    const email = (fd.get("email") as string)?.trim();
    const interest = (fd.get("interest") as string)?.trim();
    const message = (fd.get("message") as string)?.trim();

    if (!name || !email || !message) {
      toast.error("Please fill in your name, email and message.");
      return;
    }

    setSubmitting(true);
    try {
      await submitEnquiry({
        name,
        email,
        message: interest ? `Interested in: ${interest}\n\n${message}` : message,
      });
      setDone(true);
      form.reset();
      toast.success("Your enquiry is with the team. We'll reply within two working days.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section ref={ref} id="contact" className="py-28 md:py-40 bg-ink text-ivory">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-14 md:gap-20">
          <div className="md:col-span-6">
            <div data-reveal className="text-[10px] tracking-[0.4em] uppercase text-ivory/50 mb-8">
              011 — Begin a conversation
            </div>
            <h2
              data-reveal
              className="font-display text-[2.5rem] md:text-[4.5rem] leading-[1] tracking-[-0.02em] text-ivory"
            >
              Let us design the one that lasts.
            </h2>
            <p data-reveal className="mt-10 text-[15px] leading-relaxed text-ivory/70 max-w-md">
              We take on a small number of new projects each year. Share a little about your plot,
              your rhythm, your reasons — we will respond within two working days.
            </p>

            <div
              data-reveal
              className="mt-14 pt-10 border-t border-ivory/15 grid grid-cols-2 gap-8 max-w-md text-[13px] text-ivory/70"
            >
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-ivory/40 mb-2">
                  Abuja
                </div>
                5 OP Fingesi Street
                <br />
                Utako, Abuja
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-ivory/40 mb-2">
                  Lagos
                </div>
                11 Michael Adebamowo
                <br />
                Olorunda Estate, Ketu
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-ivory/40 mb-2">
                  Direct
                </div>
                +234 815 324 2398
                <br />
                askme@motivaestate.com
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-ivory/40 mb-2">Web</div>
                www.motivaestate.com
              </div>
            </div>
          </div>

          {done ? (
            <div
              data-reveal
              className="md:col-span-6 md:pl-10 md:border-l md:border-ivory/15 flex flex-col justify-center"
            >
              <div className="text-[10px] tracking-[0.4em] uppercase text-ivory/50 mb-6">
                Received
              </div>
              <p className="font-display text-4xl text-ivory mb-6">Thank you.</p>
              <p className="text-ivory/70 text-[15px] leading-relaxed mb-10">
                A Motiva specialist will be in touch very soon.
              </p>
              <button
                onClick={() => setDone(false)}
                className="self-start text-[13px] tracking-wide text-ivory/60 border-b border-ivory/30 pb-1 hover:text-ivory hover:border-ivory transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              data-reveal
              className="md:col-span-6 md:pl-10 md:border-l md:border-ivory/15 space-y-8"
              onSubmit={handle}
            >
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-ivory/50">
                  Your name *
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Elena Söderberg"
                  className="mt-3 w-full bg-transparent border-b border-ivory/20 py-3 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-ivory transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-ivory/50">
                  Email *
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="elena@studio.co"
                  className="mt-3 w-full bg-transparent border-b border-ivory/20 py-3 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-ivory transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-ivory/50">
                  Interested in
                </label>
                <select
                  name="interest"
                  className="mt-3 w-full bg-transparent border-b border-ivory/20 py-3 text-ivory focus:outline-none focus:border-ivory transition-colors"
                >
                  <option className="bg-ink" value="A new residence">
                    A new residence
                  </option>
                  <option className="bg-ink" value="An existing property">
                    An existing property
                  </option>
                  <option className="bg-ink" value="Land + architecture">
                    Land + architecture
                  </option>
                  <option className="bg-ink" value="Studio consultation">
                    Studio consultation
                  </option>
                </select>
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-ivory/50">
                  Tell us a little *
                </label>
                <textarea
                  name="message"
                  required
                  rows={3}
                  placeholder="A plot on the northern coast…"
                  className="mt-3 w-full bg-transparent border-b border-ivory/20 py-3 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-ivory transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex items-center gap-3 border-b border-ivory pb-2 text-sm tracking-wide hover:gap-5 transition-all disabled:opacity-50"
              >
                {submitting ? "Sending…" : "Send enquiry"}
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
