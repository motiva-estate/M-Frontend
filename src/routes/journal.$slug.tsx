import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowUpRight, ArrowLeft, Clock, Calendar } from "lucide-react";
import { journalEntryBySlugQueryOptions, journalEntriesQueryOptions } from "@/lib/sanity/queries";
import { resolveImage } from "@/lib/sanity/image";
import { journalImage } from "@/lib/sanity/fallbacks";
import { usePageReveal } from "@/hooks/use-page-reveal";

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://www.motivaestate.com";

export const Route = createFileRoute("/journal/$slug")({
  loader: async ({ params, context }) => {
    const entry = await context.queryClient.ensureQueryData(
      journalEntryBySlugQueryOptions(params.slug),
    );
    if (!entry) throw notFound();
    // Pre-fetch related entries for the sidebar
    await context.queryClient.ensureQueryData(journalEntriesQueryOptions);
    return { entry };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.entry.title} — Motiva Journal` },
            {
              name: "description",
              content:
                loaderData.entry.excerpt ??
                `${loaderData.entry.title} — editorial from the Motiva studio on architecture and real estate in Nigeria.`,
            },
            { property: "og:title", content: `${loaderData.entry.title} — Motiva Journal` },
            {
              property: "og:description",
              content:
                loaderData.entry.excerpt ??
                "Editorial from the Motiva studio on architecture and real estate.",
            },
            {
              property: "og:image",
              content:
                resolveImage(loaderData.entry.cover) ??
                loaderData.entry.coverUrl ??
                `${BASE_URL}/og.png`,
            },
            { property: "og:type", content: "article" },
            {
              property: "article:published_time",
              content: loaderData.entry.publishedAt ?? "",
            },
            {
              name: "keywords",
              content: [
                loaderData.entry.category,
                "real estate Nigeria",
                "architecture Abuja",
                "property investment Lagos",
                "Ogun State real estate",
                "Motiva Estate",
              ]
                .filter(Boolean)
                .join(", "),
            },
          ],
          scripts: [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: loaderData.entry.title,
                description: loaderData.entry.excerpt,
                image:
                  resolveImage(loaderData.entry.cover) ??
                  loaderData.entry.coverUrl ??
                  undefined,
                datePublished: loaderData.entry.publishedAt,
                author: {
                  "@type": "Organization",
                  name: "Motiva Estate Company",
                  url: BASE_URL,
                },
                publisher: {
                  "@type": "Organization",
                  name: "Motiva Estate Company",
                  logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.ico` },
                },
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": `${BASE_URL}/journal/${loaderData.entry.slug}`,
                },
              }),
            },
          ],
        }
      : {
          meta: [
            { title: "Entry not found — Motiva Journal" },
            { name: "robots", content: "noindex" },
          ],
        },
  notFoundComponent: () => (
    <div className="min-h-[60vh] flex items-center justify-center px-6 text-center">
      <div>
        <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6">
          404 · Not found
        </div>
        <h1 className="font-display text-4xl text-ink mb-4">Entry not in the archive.</h1>
        <p className="text-ink/60 mb-8 max-w-sm mx-auto">
          This journal entry may have been moved or removed.
        </p>
        <Link
          to="/journal"
          className="text-[13px] tracking-wide bg-ink text-ivory px-5 py-2 rounded-full hover:bg-ink/90"
        >
          Back to the journal
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-[60vh] flex items-center justify-center px-6 text-center">
      <div>
        <h1 className="font-display text-4xl text-ink mb-4">Didn't load.</h1>
        <p className="text-ink/60">{error.message}</p>
      </div>
    </div>
  ),
  component: JournalEntry,
});

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("en-US", { day: "numeric", month: "long", year: "numeric" });
}

function JournalEntry() {
  usePageReveal();
  const { slug } = Route.useParams();
  const { data: entry } = useSuspenseQuery(journalEntryBySlugQueryOptions(slug));
  const { data: allEntries } = useSuspenseQuery(journalEntriesQueryOptions);

  const post = entry!;
  const cover = journalImage(post.slug, resolveImage(post.cover) ?? post.coverUrl);
  const date = formatDate(post.publishedAt);

  // Up to 3 related entries from the same category, excluding current
  const related = allEntries
    .filter((e) => e.slug !== slug && (post.category ? e.category === post.category : true))
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <div className="relative h-[55svh] min-h-[400px] bg-ink overflow-hidden">
        <img
          src={cover}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-ink/80" />
        <div className="relative z-10 h-full mx-auto max-w-[1500px] px-6 md:px-10 flex flex-col">
          {/* Breadcrumb */}
          <nav className="pt-28 md:pt-32 flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-ivory/70">
            <Link to="/" className="hover:text-ivory">Motiva</Link>
            <span>/</span>
            <Link to="/journal" className="hover:text-ivory">Journal</Link>
            <span>/</span>
            <span className="text-ivory truncate max-w-[200px]">{post.title}</span>
          </nav>
          <div className="mt-auto pb-14 md:pb-20">
            <div className="flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-ivory/60 mb-5">
              {post.category && <span>{post.category}</span>}
              {post.category && date && <span className="h-px w-4 bg-ivory/30" />}
              {date && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" strokeWidth={1.5} />
                  {date}
                </span>
              )}
              {post.readingTime && (
                <>
                  <span className="h-px w-4 bg-ivory/30" />
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3" strokeWidth={1.5} />
                    {post.readingTime}
                  </span>
                </>
              )}
            </div>
            <h1 className="font-display text-[2.2rem] md:text-[3.5rem] leading-[1.05] tracking-[-0.02em] text-ivory max-w-3xl">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="py-16 md:py-24">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10 grid md:grid-cols-12 gap-12 lg:gap-20">
          {/* Article body */}
          <article className="md:col-span-7 lg:col-span-8">
            {post.excerpt && !post.body && (
              <p className="font-display text-xl md:text-2xl text-ink/80 leading-relaxed mb-10 pb-10 border-b border-ink/10">
                {post.excerpt}
              </p>
            )}
            {post.body ? (
              <div
                className={[
                  "prose prose-ink max-w-none",
                  "prose-headings:font-display prose-headings:tracking-tight",
                  "prose-p:text-ink/80 prose-p:leading-relaxed prose-p:text-[15px]",
                  "prose-a:text-ink prose-a:underline prose-a:underline-offset-4",
                  "prose-blockquote:border-l-gilt prose-blockquote:font-display prose-blockquote:text-xl",
                  "prose-img:rounded-sm",
                ].join(" ")}
              >
                {/* Body is stored as plain text / markdown in Sanity.
                    Render as pre-formatted paragraphs split by double newline. */}
                {post.body.split(/\n\n+/).map((para, i) => (
                  <p key={i}>{para.trim()}</p>
                ))}
              </div>
            ) : (
              !post.excerpt && (
                <p className="text-ink/50 italic text-[14px]">
                  Full article coming soon.
                </p>
              )
            )}

            {/* Back link */}
            <div className="mt-14 pt-10 border-t border-ink/10">
              <Link
                to="/journal"
                className="inline-flex items-center gap-2 text-[13px] tracking-wide text-ink/60 hover:text-ink transition-colors"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                Back to the journal
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="md:col-span-5 lg:col-span-4">
            <div className="sticky top-28 space-y-10">
              {/* CTA */}
              <div className="bg-ink text-ivory p-8">
                <div className="text-[10px] tracking-[0.3em] uppercase text-ivory/50 mb-4">
                  Begin a conversation
                </div>
                <p className="font-display text-2xl text-ivory leading-snug mb-6">
                  Interested in a Motiva residence?
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 border-b border-ivory/50 pb-1 text-[13px] tracking-wide text-ivory hover:border-ivory transition-colors"
                >
                  Enquire now <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
                </Link>
              </div>

              {/* Related entries */}
              {related.length > 0 && (
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-ink/50 mb-6">
                    More from the journal
                  </div>
                  <ul className="space-y-6">
                    {related.map((r) => {
                      const rSlug = r.slug ?? r._id;
                      const rSrc = journalImage(r.slug, resolveImage(r.cover) ?? r.coverUrl);
                      return (
                        <li key={r._id}>
                          <Link
                            to="/journal/$slug"
                            params={{ slug: rSlug }}
                            className="group flex gap-4 items-start"
                          >
                            <div className="w-20 h-20 shrink-0 overflow-hidden bg-mist">
                              <img
                                src={rSrc}
                                alt={r.title}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              {r.category && (
                                <div className="text-[9px] tracking-[0.3em] uppercase text-ink/40 mb-1">
                                  {r.category}
                                </div>
                              )}
                              <div className="font-display text-[14px] leading-snug text-ink group-hover:text-ink/70 transition-colors line-clamp-2">
                                {r.title}
                              </div>
                              {r.readingTime && (
                                <div className="mt-1 text-[11px] text-ink/40">{r.readingTime}</div>
                              )}
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <Link
                    to="/journal"
                    className="mt-8 inline-flex items-center gap-2 text-[12px] tracking-wide text-ink/60 border-b border-ink/20 pb-0.5 hover:text-ink hover:border-ink transition-colors"
                  >
                    All entries <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </Link>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
