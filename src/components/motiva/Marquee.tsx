const items = [
  "Architectural Digest",
  "Dezeen",
  "Wallpaper*",
  "Dwell",
  "The World of Interiors",
  "Monocle",
  "Frame",
  "Domus",
];

export function Marquee() {
  const doubled = [...items, ...items];
  return (
    <section className="border-y border-ink/10 py-8 overflow-hidden bg-ivory">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10 mb-6">
        <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50">
          Featured in
        </div>
      </div>
      <div className="flex gap-20 whitespace-nowrap marquee">
        {doubled.map((t, i) => (
          <span
            key={i}
            className="font-display text-xl text-ink/40"
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}
