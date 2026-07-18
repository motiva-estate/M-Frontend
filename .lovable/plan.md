
## Scope

Follow the Motiva Website Realignment PRD. Content-model + IA change only — no visual redesign. Reuse existing tokens (navy `ink`, champagne `gilt`) and components.

## 1. Data model changes (`src/data/projects.ts` + new `src/data/land.ts`)

**Project schema (extend)**
- Add `projectStatus: "pre-sale" | "ongoing" | "delivered"` and `phaseLabel?: string`.
- Keep existing fields for backward compat, but stop rendering `priceLabel`, `priceNaira`, `delivery`, and per-unit `price` on any pre-sale/ongoing project.
- Add `whatsappCtaText?: string` (optional override).

**Reseed real inventory** (all six as `pre-sale`, phaseLabel `"Review & planning"`):
- Lifecamp — 4 Bedroom Terrace
- Guzape — 5 Bedroom fully detached with BQ
- Gudu — 5 Bedroom fully detached with BQ
- Kaura — 4 Bedroom fully detached with BQ (separate listing)
- Kaura — 4 Bedroom Terrace with BQ (separate listing)
- Kaura — 3 Bedroom apartment (separate listing)

Remove all fabricated "delivered" residences (Saoirse, Linea Row, Ember Court, Harmony Terraces, Casa Solano, Kestrel Lodge, Aerie House, etc.) since no delivered projects actually exist. Kept covers/imagery reused across the six real listings.

**New `Land` type** (`src/data/land.ts`)
```
Land {
  slug, name, location: "Katampe Extension",
  sizes: number[] (SQM options),
  status: "available" | "reserved" | "sold",
  estateAmenities?: string[],
  photos: string[], description, whatsappCtaText?
}
```
Seed: **Lanzarote** (200/250/350/500 SQM) and **Kingspark** (250/450 SQM).

## 2. Routing / IA

- New routes:
  - `src/routes/land.tsx` — listing
  - `src/routes/land.$slug.tsx` — detail (with SQM size selector feeding WhatsApp CTA)
- Update `Nav.tsx` to insert **Land** between Residences and Services.
- Keep existing `projects.*` routes; retire fabricated slugs.

## 3. Shared components

- `StatusBadge.tsx` — renders "Pre-sale — enquire for current pricing" / "Ongoing — {phaseLabel}" / "Delivered". For land: Available / Reserved / Sold.
- `PaymentPlanBlock.tsx` — static sitewide copy: *"Flexible payment plans available — typically 12 months for properties, 3–4 months for land. Terms negotiable — contact us to discuss."* Rendered on every project + land detail near CTA.
- `WhatsAppCta.tsx` — builds `https://wa.me/2348153242398?text=` with pre-filled `"Hello Motiva, I'd like to enquire about {name} ({size} SQM)."`
- Enquiry form (existing `ContactCTA` + `contact.tsx`) accepts a `?project=` query param, rendered as read-only "Regarding:" field and passed as hidden input.

## 4. Page-level changes

**Home (`routes/index.tsx`)**
- Hero copy audit: no "portfolio delivered" language, keep "Est. 2010".
- Featured Residences module: show all six pre-sale cards with status badge + WhatsApp CTA, no price/date.
- New **Land teaser** module linking to `/land` (2-card strip: Lanzarote, Kingspark).
- **Testimonial**: replace with founder/process-credibility block (three-step phase indicator: Approvals → Plans approved → Construction). Delete fabricated quotes carousel.
- Stat counters: replace "120 Homes Delivered / Est. 2010 / 2 Cities" with honest ones — "6 Residences in pre-sale / 2 Land parcels / Est. 2010 / Lagos & Abuja" (or drop the delivered counter entirely).

**Residences listing (`routes/projects.index.tsx`)**
- Optional status filter chips (Pre-sale / Ongoing / Delivered).
- Cards for pre-sale/ongoing: name, location, unit type, phase label, WhatsApp CTA — no price, no date.

**Residence detail (`routes/projects.$slug.tsx`)**
- Status badge at top.
- Hide price/delivery/units-with-prices for pre-sale/ongoing.
- Per-project amenities (already per-project; leave as-is).
- `PaymentPlanBlock` near CTA. Primary CTA = WhatsApp pre-filled with project name. Secondary CTA = enquiry form link with `?project=slug`.

**Land listing (`routes/land.tsx`)** & **detail (`routes/land.$slug.tsx`)**
- Same tone as Residences. Card shows location, sizes-available range, status. Detail page has SQM selector, description, PaymentPlanBlock, WhatsApp CTA pre-filled with parcel + size.

**Contact (`routes/contact.tsx`)**
- Keep interest categories. Read `?project=` from URL, show as read-only "Regarding:" field.

## 5. Removed / untouched

Untouched: Method, Pillars, Gallery, Journal, Footer, About, typography, spacing, tokens.
Removed: Testimonial component's fabricated quotes (replaced by credibility block), fabricated delivered residences, `.lovable/plan.md` (superseded).

## Out of scope (per PRD §12)

- Subscriber portal / login / dashboard
- Automated payment reminders
- Search/filter across large catalogue
- Any pricing calculator

## Technical notes

- Keep existing `Project` shape's optional fields to avoid touching Residences/Featured components' props; add new required fields with sensible defaults.
- All copy uses `text-ink`, `text-ink/60`, `bg-ivory`, `text-gilt` — no hex.
- WhatsApp number sourced from `ContactCTA.tsx` (`+234 815 324 2398`).
- Land routes use flat file naming: `land.tsx`, `land.$slug.tsx`.
