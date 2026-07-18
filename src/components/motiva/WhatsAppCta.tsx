import { MessageCircle } from "lucide-react";

export const MOTIVA_WHATSAPP = "2348153242398";

export function buildWhatsAppUrl(text: string) {
  return `https://wa.me/${MOTIVA_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

export function projectWhatsAppText(projectName: string) {
  return `Hello Motiva, I'd like to enquire about ${projectName}. Please share current terms and availability.`;
}

export function landWhatsAppText(parcelName: string, size?: number) {
  return size
    ? `Hello Motiva, I'd like to enquire about ${parcelName} land (${size} SQM). Please share current terms and availability.`
    : `Hello Motiva, I'd like to enquire about ${parcelName} land. Please share current terms and available sizes.`;
}

export function WhatsAppCta({
  text,
  label = "Enquire on WhatsApp",
  variant = "primary",
  className = "",
}: {
  text: string;
  label?: string;
  variant?: "primary" | "outline" | "dark";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-between gap-6 w-full px-5 py-3 rounded-full text-[13px] tracking-wide transition-colors";
  const tone =
    variant === "primary"
      ? "bg-gilt text-ink hover:bg-gilt/90"
      : variant === "dark"
        ? "bg-ink text-ivory hover:bg-ink/90"
        : "border border-ink/30 text-ink hover:border-ink";
  return (
    <a
      href={buildWhatsAppUrl(text)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${tone} ${className}`}
    >
      <span>{label}</span>
      <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
    </a>
  );
}
