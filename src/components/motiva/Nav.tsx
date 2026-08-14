import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
if (!CustomEase.get("motivaCurtain")) {
  CustomEase.create("motivaCurtain", "0.86, 0, 0.07, 1");
}

type NavLink = { label: string; to: string; hash?: boolean };
const links: NavLink[] = [
  { label: "Projects", to: "/projects" },
  { label: "Land", to: "/land" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

// Top-level pages get a dark ink nav; nested routes and the homepage stay
// transparent until scrolled, then switch to the ivory glass treatment.
const darkTopLevelRoutes = [
  "/projects",
  "/land",
  "/services",
  "/about",
  "/gallery",
  "/contact",
  "/faq",
  "/journal",
];

const PANEL_COUNT = 5;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [rendered, setRendered] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const isDarkPage = darkTopLevelRoutes.includes(normalized);
  // const isHome = pathname === "/";

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);
  const itemsRef = useRef<HTMLLIElement[]>([]);
  const metaRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // const inverted = isSolidPage || scrolled;
  // const anotherPage = !isHome;

  // mount overlay when opening; unmount after close animation
  useEffect(() => {
    if (open) setRendered(true);
  }, [open]);

  useEffect(() => {
    if (!rendered) return;
    const panels = panelsRef.current.filter(Boolean);
    const items = itemsRef.current.filter(Boolean);
    const meta = metaRef.current;
    if (!panels.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    tlRef.current?.kill();

    if (open) {
      const tl = gsap.timeline();
      gsap.set(panels, { yPercent: -101 });
      gsap.set(items, { yPercent: 120, opacity: 0, rotate: 4 });
      if (meta) gsap.set(meta, { opacity: 0, y: 20 });

      if (reduce) {
        tl.set(panels, { yPercent: 0 })
          .set(items, { yPercent: 0, opacity: 1, rotate: 0 })
          .set(meta ?? {}, { opacity: 1, y: 0 });
      } else {
        tl.to(panels, {
          yPercent: 0,
          duration: 1.05,
          ease: "motivaCurtain",
          stagger: { each: 0.07, from: "start" },
        })
          .to(
            items,
            {
              yPercent: 0,
              opacity: 1,
              rotate: 0,
              duration: 0.9,
              ease: "expo.out",
              stagger: 0.075,
            },
            "-=0.55",
          )
          .to(
            meta ?? {},
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.5",
          );
      }
      tlRef.current = tl;
    } else {
      const tl = gsap.timeline({
        onComplete: () => setRendered(false),
      });
      if (reduce) {
        tl.set(panels, { yPercent: -101 });
      } else {
        tl.to(items, {
          yPercent: -60,
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
          stagger: 0.03,
        })
          .to(meta ?? {}, { opacity: 0, duration: 0.2 }, 0)
          .to(
            panels,
            {
              yPercent: -101,
              duration: 0.75,
              ease: "motivaCurtain",
              stagger: { each: 0.05, from: "end" },
            },
            "-=0.15",
          );
      }
      tlRef.current = tl;
    }

    return () => {
      tlRef.current?.kill();
    };
  }, [open, rendered]);

  // lock scroll when open
  useEffect(() => {
    if (!rendered) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [rendered]);

  const headerBg = open
    ? "bg-transparent"
    : isDarkPage
      ? "bg-ink text-white"
      : scrolled
        ? "bg-ivory/90 backdrop-blur-xl border-b border-ink/10"
        : "bg-transparent";

  const logoClass = open
    ? "text-ivory"
    : isDarkPage
      ? "text-white"
      : scrolled
        ? "text-ink"
        : "text-ivory";

  const navLinkBase = open
    ? "text-ivory/80 hover:text-ivory"
    : isDarkPage
      ? "text-white/80 hover:text-white"
      : scrolled
        ? "text-ink/70 hover:text-ink"
        : "text-ivory/80 hover:text-ivory";

  const activeLinkClass = open
    ? "text-ivory"
    : isDarkPage
      ? "text-white"
      : scrolled
        ? "text-ink"
        : "text-ivory";

  const ctaClass = open
    ? "text-ivory border-ivory/40 hover:border-ivory"
    : isDarkPage
      ? "text-white border-white/40 hover:border-white"
      : scrolled
        ? "text-ink border-ink/40 hover:border-ink"
        : "text-ivory border-ivory/40 hover:border-ivory";

  const buttonClass = open
    ? "text-ivory"
    : isDarkPage
      ? "text-white"
      : scrolled
        ? "text-ink"
        : "text-ivory";

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${headerBg}`}
      >
        <div className="mx-auto max-w-[1500px] px-6 md:px-10">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link
              to="/"
              className={`font-display text-2xl tracking-tight relative z-[60] ${logoClass}`}
            >
              Motiva
            </Link>

            <nav className="hidden lg:flex items-center gap-10">
              {links.map((l) =>
                l.hash ? (
                  <a
                    key={l.to}
                    href={l.to}
                    className={`text-[13px] tracking-wide transition-colors ${navLinkBase}`}
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`text-[13px] tracking-wide transition-colors ${navLinkBase}`}
                    activeProps={{ className: activeLinkClass }}
                  >
                    {l.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="flex items-center gap-6">
              {/* <Link
                to="/contact"
                search={{ intent: "inspection" }}
                className={`hidden sm:inline-block text-[13px] tracking-wide border-b pb-0.5 transition-colors relative z-[60] ${
                  open
                    ? "text-ivory border-ivory/40 hover:border-ivory"
                    : inverted
                      ? "text-ink border-ink/40 hover:border-ink"
                      : "text-ivory border-ivory/40 hover:border-ivory"
                }`}
              >
                Book an inspection
              </Link> */}
              <Link
                to="/contact"
                // search={{ intent: "inspection" }}
                className={`hidden sm:inline-block text-[13px] tracking-wide border-b pb-0.5 transition-colors relative z-[60] ${ctaClass}`}
              >
                Make Enquiry
              </Link>
              <button
                onClick={() => setOpen((o) => !o)}
                className={`lg:hidden relative z-[60] ${buttonClass}`}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                {open ? <X className="h-5 w-5" strokeWidth={1.25} /> : <Menu className="h-5 w-5" strokeWidth={1.25} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {rendered && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-40 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          {/* Curtain panels */}
          <div className="absolute inset-0 flex pointer-events-none">
            {Array.from({ length: PANEL_COUNT }).map((_, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) panelsRef.current[i] = el;
                }}
                className="h-full flex-1"
                style={{
                  background:
                    i % 2 === 0
                      ? "#343148"
                      : "linear-gradient(180deg, #3b3852 0%, #343148 100%)",
                  borderRight:
                    i < PANEL_COUNT - 1 ? "1px solid rgba(215,196,158,0.06)" : "none",
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-between px-8 pt-24 pb-10 overflow-hidden">
            <nav>
              <ul className="space-y-1">
                {links.map((l, i) => (
                  <li
                    key={l.to}
                    ref={(el) => {
                      if (el) itemsRef.current[i] = el;
                    }}
                    className="overflow-hidden"
                    style={{ perspective: "800px" }}
                  >
                    {l.hash ? (
                      <a
                        href={l.to}
                        onClick={() => setOpen(false)}
                        className="block font-display text-ivory text-[clamp(2.5rem,10vw,5rem)] leading-[1.05] tracking-tight hover:text-[#D7C49E] transition-colors"
                        style={{ fontVariationSettings: "'opsz' 144, 'wght' 400" }}
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        to={l.to}
                        onClick={() => setOpen(false)}
                        className="block font-display text-ivory text-[clamp(2.5rem,10vw,5rem)] leading-[1.05] tracking-tight hover:text-[#D7C49E] transition-colors"
                        style={{ fontVariationSettings: "'opsz' 144, 'wght' 400" }}
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div
              ref={metaRef}
              className="flex items-end justify-between text-ivory/60 text-[11px] tracking-[0.24em] uppercase"
            >
              <div className="space-y-1">
                <div className="text-[#D7C49E]">Motiva Estate Co.</div>
                <div>Lagos · Abuja</div>
              </div>
              <a
                href="mailto:askme@motivaestate.com"
                className="hover:text-ivory transition-colors"
              >
                askme@motivaestate.com
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
