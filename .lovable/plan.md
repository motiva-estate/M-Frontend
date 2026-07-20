
## Scope

Follow Appendix A of the Sanity + Lovable Migration PRD. This is a **data-source migration only** — no visual redesign, no admin/CMS build here (the admin app is a separate project at `90a3f278-aec4-4d50-a55b-f113ef3e2121`). The Lovable public site stops sourcing content from `src/data/*.ts` and starts reading from Sanity, using a read-only CDN token.

## 1. Connect Sanity (prerequisite)

- Connect the Sanity MCP connector (`mcp--connect` with `connector_id: "sanity"`).
- Use the MCP tools to fetch the `projectId`, dataset (`production`), and current schema. Do not ask the user for a project ID.
- Ask the MCP tool to add the app's Lovable preview + published origins as CORS origins (no credentials).
- If the Sanity project has no schema yet, seed it (see §3). If it already has the schema, just read it.

## 2. Install client + create Sanity module

- `bun add @sanity/client @sanity/image-url`
- `src/lib/sanity/client.ts` — read-only CDN client (`useCdn: true`, no token). Never bundles a write token — the public site is strictly read-only per PRD §7.
- `src/lib/sanity/image.ts` — `urlFor()` builder for native Sanity images.
- `src/lib/sanity/queries.ts` — typed GROQ queries for every content type used.
- `src/lib/sanity/types.ts` — TS types matching the schema below.

## 3. Sanity schema (expected)

Documents matching PRD §5 and Appendix A:

- **project** — `title, slug, city, propertyType, projectStatus: 'pre-sale'|'ongoing'|'delivered', phaseLabel, buildingType, description, amenities[], cover (image), gallery[] (image or url), isPriceInternal (bool), featured, order`
- **land** — `name, slug, location, sizeOptions[] (number, SQM), status: 'available'|'reserved'|'sold', estateAmenities[], description, cover, gallery[]`
- **gallery** — `image|url, caption, category, order`
- **testimonial** — `authorName, authorTitle, quote, rating, avatar`
- **faq** — `question, answer, category, order`
- **service** — `title, slug, summary, body (portable text), icon, order`
- **leadershipEntry** — `name, role, bio, photo, order`
- **achievement** — `title, description, year, order`
- **companyInfo** (singleton) — `foundingYear, mission, vision, stats`
- **contactInfo** (singleton) — `primaryEmail, primaryPhone, whatsappNumber, offices[], socialLinks`

If schema exists, adapt query field names to match what MCP reports back. Seed the 6 residences + 2 parcels (Lifecamp, Guzape, Gudu, Kaura×3, Lanzarote, Kingspark) only if the Sanity dataset is empty.

## 4. Asset handling (PRD §6)

- Sanity native `image` fields → `urlFor(img).width(...).url()`.
- Fields typed as URL strings (Cloudinary / S3) → render `<img src={url}>` directly, never through `urlFor()`.
- Add a small helper `resolveImage(field)` that detects `_type === 'image'` vs string and returns a URL, so cards/detail pages don't branch.

## 5. Loader + component wiring

Convert every content-driven route from `src/data/*` to Sanity via TanStack Query + loaders (per the query-integration knowledge). Each route ships `queryOptions` used by both `loader` (`ensureQueryData`) and component (`useSuspenseQuery`).

Routes touched:
- `src/routes/index.tsx` — hero copy, featured residences, land teaser, journal/gallery slices.
- `src/routes/projects.index.tsx` + `projects.$slug.tsx` — residence list + detail.
- `src/routes/land.index.tsx` + `land.$slug.tsx` — land list + detail.
- `src/routes/services.tsx`, `about.tsx`, `gallery.tsx`, `faq.tsx`, `contact.tsx`, `journal.tsx`.
- Nav / Footer — read `contactInfo` singleton.

Every route with a loader keeps its `errorComponent` + `notFoundComponent`; `head()` metadata is derived from loader data for detail pages (og:image = cover).

## 6. Price / date rules (PRD §9)

- **Never render a numeric price** on any page, regardless of what fields exist. Check `isPriceInternal` and treat any project with it (or projects without it explicitly `false`) as price-hidden. Existing `PaymentPlanBlock` and WhatsApp CTA stay.
- Residence + land cards continue to show `projectStatus` + `phaseLabel` via `StatusBadge`, not fixed dates.
- Detail pages end in the WhatsApp CTA (already implemented) pre-filled with the item's name / SQM.

## 7. Retire local data

- Delete `src/data/projects.ts`, `src/data/land.ts` after routes are fully migrated and typecheck passes. Leave `src/data/estimator.ts` etc. alone.
- Nothing in `components/motiva/*` should import from `@/data/*` afterwards — the fetchers become the only source.

## 8. Deferred (per PRD §4, §8)

- No `homepageSections` or `seo` document types wired.
- No subscriber portal, no S3 signed-URL flow, no CRM.
- No writes from this app — no write token, no `createServerFn` mutation surface, no Sanity Studio embedded.
- Admin app changes live in the referenced remix project, not here.

## Technical notes

- `useCdn: true` + `apiVersion: '2024-10-01'`.
- Env vars: `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET` (both public — Sanity project IDs and dataset names are not secrets on read-only CDN access).
- All queries live in `src/lib/sanity/queries.ts` as named GROQ strings; components import query + type only.
- Query keys: `['sanity', 'projects']`, `['sanity', 'project', slug]`, etc., so `queryClient.invalidateQueries({ queryKey: ['sanity'] })` clears everything on demand.
- Design tokens (`ink` / `gilt`) unchanged. No new colors, fonts, or components.
- Update `.lovable/plan.md` to reflect the new data source.

## Open dependency

The Sanity project must exist and be reachable via MCP before I can generate accurate queries. If MCP returns no schema, first step of implementation is to define the schema documents in Sanity via the MCP `create_schema` tool, then seed the confirmed inventory.
