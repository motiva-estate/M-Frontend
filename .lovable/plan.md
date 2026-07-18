## Goal

Turn the static `Testimonial` block into a morphing carousel that cycles through 4 owner quotes with an editorial blur-crossfade, auto-advances every 6s, and offers dot controls. Stats row below stays as-is.

## File

`src/components/motiva/Testimonial.tsx` (single-file change).

## Quotes (Motiva voice, tied to residences in `src/data/projects.ts`)

1. **Elena Söderberg — Owner, Saoirse Villa (Old GRA)**
   "Motiva didn't sell us a house. They listened for a year, then drew the one we didn't know how to describe."
2. **Adaeze Okonkwo — Owner, Harmony Terraces (Life Camp, Abuja)**
   "Every detail was considered before we ever asked. The house arrived already knowing us."
3. **Tunde Bakare — Owner, Linea Row (Ikoyi)**
   "Two years in and nothing has aged. That is the quietest luxury I know."
4. **Ngozi & Femi Adeyemi — Owners, Ember Court (Katampe)**
   "We came for the address. We stayed for the way they still answer the phone."

(User can swap any before build if preferred.)

## Interaction

- **Auto-advance:** 6s per quote, pauses on hover and on focus-within.
- **Manual:** 4 dot buttons under the quote — `aria-label="Show testimonial N"`, `aria-current` on active.
- **Keyboard:** dots are real `<button>`s; arrow-key nav optional (skip for now to keep scope tight).
- **Reduced motion:** `prefers-reduced-motion` → no blur, instant swap, no auto-advance (static first quote with dots).

## Morph animation

Blur + fade crossfade, ~700ms, `cubic-bezier(0.2, 0.7, 0.2, 1)`:

- Outgoing: `opacity 1 → 0`, `filter blur(0) → blur(8px)`, `translateY(0 → -6px)`.
- Incoming: reverse, staggered 120ms after outgoing starts.
- Both quote and attribution line animate together as one group so name/residence morph in sync.
- Absolutely-positioned stacked layers inside a `relative` wrapper with a fixed min-height (measured from tallest quote at md breakpoint) to prevent layout jump.

Implemented with Tailwind utilities + inline `style={{ transition, filter, opacity, transform }}` — no new deps. State: `const [i, setI] = useState(0)` + `useEffect` interval.

## Attribution update

Current single line becomes: `{name}` · thin divider · `Owner, {residence}` — same styling tokens (`text-ink`, `text-ink/60`, `tracking-[0.2em] uppercase text-[11px]`).

## Non-goals

- No SVG goo filter, no background portrait / Ken Burns (kept editorial per your brand).
- No changes to the stats row, section chrome, or surrounding sections.
- No new data file — quotes live inline in `Testimonial.tsx` as a typed const array.

## Technical notes

- Uses existing tokens only (`ink`, `ivory`, `gilt`) — no hex.
- `min-h-[…]` sized generously for the longest quote at each breakpoint so morph never nudges the stats row.
- Interval cleared on unmount and reset when user clicks a dot (restart 6s timer from that quote).
