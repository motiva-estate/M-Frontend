import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { useSectionReveal } from "@/hooks/use-section-reveal";

export function ContactCTA() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);
  return (
    <section ref={ref} id="contact" className="py-28 md:py-40 bg-ink text-ivory">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-14 md:gap-20">
          <div className="md:col-span-6">
            <div data-reveal className="text-[10px] tracking-[0.4em] uppercase text-ivory/50 mb-8">
              008 — Begin a conversation
            </div>
            <h2 data-reveal className="font-display text-[2.5rem] md:text-[4.5rem] leading-[1] tracking-[-0.02em] text-ivory">
              Let us design the one that lasts.
            </h2>
            <p data-reveal className="mt-10 text-[15px] leading-relaxed text-ivory/70 max-w-md">
              We take on a small number of new residences each year. Share a little about your plot, your rhythm, your reasons — we will respond within two working days.
            </p>

            <div data-reveal className="mt-14 pt-10 border-t border-ivory/15 grid grid-cols-2 gap-8 max-w-md text-[13px] text-ivory/70">
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-ivory/40 mb-2">Abuja</div>
                5 OP Fingesi Street<br />Utako, Abuja
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-ivory/40 mb-2">Lagos</div>
                11 Michael Adebamowo<br />Olorunda Estate, Ketu
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-ivory/40 mb-2">Direct</div>
                +234 815 324 2398<br />askme@motivaestate.com
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-ivory/40 mb-2">Web</div>
                www.motivaestate.com
              </div>
            </div>
          </div>

          <form
            data-reveal
            className="md:col-span-6 md:pl-10 md:border-l md:border-ivory/15 space-y-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="text-[10px] tracking-[0.3em] uppercase text-ivory/50">
                Your name
              </label>
              <input
                type="text"
                placeholder="Elena Söderberg"
                className="mt-3 w-full bg-transparent border-b border-ivory/20 py-3 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-ivory transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.3em] uppercase text-ivory/50">
                Email
              </label>
              <input
                type="email"
                placeholder="elena@studio.co"
                className="mt-3 w-full bg-transparent border-b border-ivory/20 py-3 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-ivory transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.3em] uppercase text-ivory/50">
                Interested in
              </label>
              <select className="mt-3 w-full bg-transparent border-b border-ivory/20 py-3 text-ivory focus:outline-none focus:border-ivory transition-colors">
                <option className="bg-ink">A new residence</option>
                <option className="bg-ink">An existing property</option>
                <option className="bg-ink">Land + architecture</option>
                <option className="bg-ink">Studio consultation</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] tracking-[0.3em] uppercase text-ivory/50">
                Tell us a little
              </label>
              <textarea
                rows={3}
                placeholder="A plot on the northern coast…"
                className="mt-3 w-full bg-transparent border-b border-ivory/20 py-3 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-ivory transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="group inline-flex items-center gap-3 border-b border-ivory pb-2 text-sm tracking-wide hover:gap-5 transition-all"
            >
              Send enquiry
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
