import { useEffect, useRef, useState } from "react";
import { Loader2, Check, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Configure once the Zoho form is published:
export const ZOHO_FORM_URL: string = "https://subscribe.motivaestate.com/midstromridge/form/motivaestateprojectenquiry/formperma/fdgefPWvxOmOsVcWZAwTzEgx8CqcZiXSZjDALesRjG4";
// The Zoho hidden-field key (e.g. the internal field name in the form URL) that carries the project attribution.
export const ZOHO_PROJECT_FIELD = "project";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectName: string;
};

export function SubscribeModal({ open, onOpenChange, projectName }: Props) {
  const src = ZOHO_FORM_URL
    ? `${ZOHO_FORM_URL}${ZOHO_FORM_URL.includes("?") ? "&" : "?"}${ZOHO_PROJECT_FIELD}=${encodeURIComponent(projectName)}`
    : "";

  const [loaded, setLoaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const loadCountRef = useRef(0);

  // Reset state whenever the modal is (re)opened.
  useEffect(() => {
    if (!open) return;
    setLoaded(false);
    setSubmitted(false);
    setShowFallback(false);
    loadCountRef.current = 0;

    // Slow-network / ad-blocker fallback: after 6s with no load, offer new-tab link.
    const t = window.setTimeout(() => {
      if (loadCountRef.current === 0) setShowFallback(true);
    }, 6000);
    return () => window.clearTimeout(t);
  }, [open]);

  // Auto-close after success confirmation.
  useEffect(() => {
    if (!submitted) return;
    const t = window.setTimeout(() => onOpenChange(false), 3500);
    return () => window.clearTimeout(t);
  }, [submitted, onOpenChange]);

  // The 2-load heuristic is the standard cross-origin workaround for detecting
  // a form submission inside a third-party iframe: Zoho serves its post-submit
  // "thank you" as a new document, which triggers a second `load` event. We
  // can't read anything from the iframe (SOP), only observe that a navigation
  // happened. Revisit if Zoho ever changes its redirect behavior.
  const handleLoad = () => {
    loadCountRef.current += 1;
    if (loadCountRef.current === 1) {
      setLoaded(true);
    } else if (loadCountRef.current >= 2) {
      setSubmitted(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl p-0 gap-0 bg-ivory overflow-hidden"
        closeButtonClassName="data-[state=open]:bg-gilt data-[state=open]:text-ink"
        iconClassName="text-gilt h-6 w-6"
      >
        <DialogHeader className="bg-ink text-gilt px-6 py-5 space-y-1">
          <DialogTitle className="font-display text-2xl text-gilt">Reserve Your Spot</DialogTitle>
          <DialogDescription className="text-gilt/70 text-[13px] tracking-wide">
            {projectName}
          </DialogDescription>
        </DialogHeader>

        <div className="bg-ink relative" aria-busy={!loaded && !submitted}>
          {!src ? (
            <div className="px-6 py-16 text-center text-gilt/60 text-sm">
              Subscription form is not configured yet.
            </div>
          ) : submitted ? (
            <div
              role="status"
              aria-live="polite"
              className="h-[70vh] flex flex-col items-center justify-center text-center px-8 gap-5"
            >
              <div className="h-14 w-14 rounded-full bg-gilt/15 flex items-center justify-center">
                <Check className="h-7 w-7 text-gilt" strokeWidth={1.5} />
              </div>
              <div className="font-display text-2xl text-ivory max-w-md">
                Thank you — we'll be in touch about {projectName}.
              </div>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="mt-2 text-[12px] tracking-[0.25em] uppercase text-gilt/70 hover:text-gilt border-b border-gilt/40 hover:border-gilt pb-1"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="relative">
              {/* Loading overlay — sits above iframe until it fires its first load event */}
              {!loaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-ink text-gilt/70">
                  <Loader2 className="h-6 w-6 animate-spin text-gilt" strokeWidth={1.5} />
                  <div className="text-[12px] tracking-[0.25em] uppercase">Loading form…</div>
                  {showFallback && (
                    <a
                      href={src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 text-[12px] text-gilt hover:text-ivory border-b border-gilt/40 hover:border-ivory pb-1"
                    >
                      Trouble loading? Open in a new tab
                      <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
                    </a>
                  )}
                </div>
              )}
              <iframe
                title={`Subscribe — ${projectName}`}
                src={src}
                loading="lazy"
                onLoad={handleLoad}
                className={`w-full h-[70vh] border-0 block transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
