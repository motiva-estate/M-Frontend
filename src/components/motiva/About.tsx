import about1 from "@/assets/motiva/about-1.jpg";
import about2 from "@/assets/motiva/about-2.jpg";

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-40 bg-ivory">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-8">
              002 — About Motiva
            </div>
            <div className="text-[13px] tracking-wide text-ink/60 space-y-1">
              <div>Lagos &amp; Abuja</div>
              <div>Founded 2010</div>
              <div>Integrated real-estate development company</div>
            </div>
          </div>

          <div className="md:col-span-8">
            <h2 className="sr-only">About Motiva Estate Company</h2>
            <p className="font-display text-[2rem] md:text-[2.75rem] leading-[1.15] tracking-[-0.01em] text-ink">
              Motiva Estate Company is a fully integrated real-estate practice, quietly serving private, corporate and public-sector clients across Nigeria — with tailored, leading-edge services held to a single standard of care.
            </p>

            <div className="mt-14 grid grid-cols-2 gap-10 md:gap-14 max-w-2xl text-[14px] leading-relaxed text-ink/70">
              <p>
                We understand that no two clients are alike. Our teams shape bespoke solutions — from home and office accommodation to development advisory — so our clients can stay focused on the lives and businesses that matter to them.
              </p>
              <p>
                Every engagement balances leading-edge features with safety, environment and enduring value — delivered with unmatched attention to the details that outlast fashion.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-28 grid md:grid-cols-12 gap-6">
          <figure className="md:col-span-7">
            <div className="aspect-[16/11] overflow-hidden">
              <img
                src={about1}
                alt="Interior of a Motiva residence"
                width={1024}
                height={1280}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-4 flex justify-between text-[11px] tracking-[0.3em] uppercase text-ink/50">
              <span>Aerie House — living</span>
              <span>Fig. 01</span>
            </figcaption>
          </figure>
          <figure className="md:col-span-5 md:mt-24">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={about2}
                alt="Studio detail"
                width={1024}
                height={1280}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-4 flex justify-between text-[11px] tracking-[0.3em] uppercase text-ink/50">
              <span>Studio — drafting</span>
              <span>Fig. 02</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
