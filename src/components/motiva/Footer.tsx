import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-ivory text-ink pt-24 pb-10 border-t border-ink/10">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 pb-16">
          <div className="md:col-span-5">
            <div className="font-display text-3xl tracking-tight mb-6">Motiva</div>
            <p className="text-ink/65 max-w-sm text-[14px] leading-relaxed">
              Motiva Estate Company — a fully integrated real-estate practice founded in 2010,
              delivering development, advisory, management, project and brokerage services from
              Lagos and Abuja.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-[13px]">
              <a
                href="https://wa.me/2348153242398"
                className="inline-flex items-center gap-2 rounded-full bg-ink text-ivory px-4 py-2 hover:bg-ink/90 transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gilt" /> WhatsApp us
              </a>
              <a href="tel:+2348153242398" className="text-ink/70 hover:text-ink">
                +234 815 324 2398
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="text-[10px] tracking-[0.3em] uppercase text-ink/50 mb-5">Practice</div>
            <ul className="space-y-3 text-[13px] text-ink/70">
              <li>
                <Link to="/about" className="hover:text-ink">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-ink">
                  Services
                </Link>
              </li>
              <li>
                <a href="/#process" className="hover:text-ink">
                  Method
                </a>
              </li>
              <li>
                <Link to="/journal" className="hover:text-ink">
                  Journal
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-ink">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-[10px] tracking-[0.3em] uppercase text-ink/50 mb-5">Work</div>
            <ul className="space-y-3 text-[13px] text-ink/70">
              <li>
                <Link to="/projects" className="hover:text-ink">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-ink">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-ink">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/contact" search={{ intent: "inspection" }} className="hover:text-ink">
                  Book inspection
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-[10px] tracking-[0.3em] uppercase text-ink/50 mb-5">Offices</div>
            <p className="text-[13px] text-ink/70 leading-relaxed">
              <span className="block text-[10px] tracking-[0.25em] uppercase text-gilt mb-1">
                Abuja
              </span>
              5 OP Fingesi Street, Utako
              <br />
              <span className="block text-[10px] tracking-[0.25em] uppercase text-gilt mt-4 mb-1">
                Lagos
              </span>
              11 Michael Adebamowo,
              <br />
              Olorunda Estate, Ketu
              <br />
              <span className="block mt-4">askme@motivaestate.com</span>
              <span className="block">+234 815 324 2398</span>
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-ink/10 flex flex-wrap items-center justify-between gap-4 text-[12px] text-ink/50">
          <span>© {new Date().getFullYear()} Motiva Estate Company Ltd.</span>
          <div className="flex gap-6">
            <a 
            href="https://www.instagram.com/motivaestate?igsh=MXk1YWd2dTI6bjRz&igsi=MXk1YWd2dTI6bjRz" 
            referrerPolicy="no-referrer" 
            target="_blank"
            rel="noreferrer" 
            className="hover:text-ink"
            >
              Instagram
            </a>
            <a 
            href="#" 
            referrerPolicy="no-referrer" 
            target="_blank"
            rel="noreferrer" 
            className="hover:text-ink"
            >
              LinkedIn
            </a>
            <a 
            href="#" 
            referrerPolicy="no-referrer" 
            target="_blank"
            rel="noreferrer" 
            className="hover:text-ink"
            >
              Pinterest
            </a>
            <a 
            href="#" 
            className="hover:text-ink"
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
