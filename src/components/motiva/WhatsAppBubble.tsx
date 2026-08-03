import { MessageCircle } from "lucide-react";

export function WhatsAppBubble() {
  return (
    <a
      href="https://wa.me/2348153242398"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Motiva on WhatsApp"
      className="fixed bottom-6 right-6 z-40 group flex items-center md:gap-3 rounded-full bg-ink text-ivory p-2 md:pl-4 md:pr-5 md:py-3 shadow-lift hover:bg-ink/90 transition-colors"
    >
      <span className="h-9 w-9 rounded-full bg-gilt text-ink flex items-center justify-center">
        <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
      </span>
      <span className="hidden sm:inline text-[13px] tracking-wide">Talk to a specialist</span>
    </a>
  );
}
