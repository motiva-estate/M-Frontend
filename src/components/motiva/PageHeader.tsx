import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

interface Crumb {
  label: string;
  to?: string;
}

export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
  right,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: Crumb[];
  right?: ReactNode;
}) {
  return (
    <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 bg-ivory border-b border-ink/10">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        {crumbs && crumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-ink/50 mb-8">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {c.to ? (
                  <Link to={c.to} className="hover:text-ink">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-ink">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <ChevronRight className="h-3 w-3 text-ink/30" strokeWidth={1.5} />}
              </span>
            ))}
          </nav>
        )}
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-8">
            <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">{eyebrow}</div>
            <h1 className="font-display text-[2.5rem] md:text-[4.5rem] leading-[1] tracking-[-0.02em] text-ink">
              {title}
            </h1>
            {intro && (
              <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-ink/70">{intro}</p>
            )}
          </div>
          {right && <div className="md:col-span-4 md:justify-self-end">{right}</div>}
        </div>
      </div>
    </section>
  );
}
