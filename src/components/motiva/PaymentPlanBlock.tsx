export function PaymentPlanBlock({ className = "" }: { className?: string }) {
  return (
    <div className={`border border-ink/10 bg-ivory p-6 md:p-8 ${className}`}>
      <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-4">
        Payment plans
      </div>
      <p className="text-[15px] leading-relaxed text-ink/80">
        Flexible payment plans available — typically <span className="text-ink font-medium">12 months for properties</span>,{" "}
        <span className="text-ink font-medium">3–4 months for land</span>. Terms are negotiable —{" "}
        contact us to discuss what works for you.
      </p>
    </div>
  );
}
