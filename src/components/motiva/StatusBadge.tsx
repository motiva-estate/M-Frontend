import type { LandStatus, ProjectStatus } from "@/lib/sanity/types";

export function StatusBadge({
  status,
  phaseLabel,
  className = "",
}: {
  status: ProjectStatus;
  phaseLabel?: string;
  className?: string;
}) {
  const label =
    status === "pre-sale"
      ? "Pre-sale — enquire for current pricing"
      : status === "ongoing"
        ? `Ongoing${phaseLabel ? ` — ${phaseLabel}` : ""}`
        : "Delivered";
  const tone =
    status === "delivered"
      ? "bg-gilt text-ink"
      : status === "ongoing"
        ? "bg-ivory text-ink border border-ink/15"
        : "bg-ink text-ivory";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-[0.25em] uppercase ${tone} ${className}`}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {label}
    </span>
  );
}

export function LandStatusBadge({
  status,
  className = "",
}: {
  status: LandStatus;
  className?: string;
}) {
  const label = status === "available" ? "Available" : status === "reserved" ? "Reserved" : "Sold";
  const tone =
    status === "available"
      ? "bg-gilt text-ink"
      : status === "reserved"
        ? "bg-ivory text-ink border border-ink/15"
        : "bg-ink/70 text-ivory/90";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-[0.25em] uppercase ${tone} ${className}`}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {label}
    </span>
  );
}
