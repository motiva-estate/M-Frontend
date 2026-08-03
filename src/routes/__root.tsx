import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import ogImage from "@/assets/motiva/brand/og.png";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // ── Primary meta ──────────────────────────────────────────────────────
      { title: "Motiva Estate Company — Real Estate in Lagos, Abuja & Ogun State" },
      {
        name: "description",
        content:
          "Motiva Estate Company — Nigeria's fully integrated real-estate practice since 2010. Premium residences, land investment, property management and brokerage across Lagos, Abuja and Ogun State.",
      },
      { name: "author", content: "Motiva Estate Company" },
      {
        name: "keywords",
        content:
          "real estate Nigeria, property for sale Abuja, houses for sale Lagos, Ogun State property, land for sale Abuja, luxury homes Nigeria, real estate investment Nigeria, property developer Abuja, buy house Lagos, Katampe Extension land, Motiva Estate, integrated real estate, property management Nigeria, off-plan houses Abuja, pre-sale residences Nigeria",
      },
      // ── Geo targeting ────────────────────────────────────────────────────
      { name: "geo.region", content: "NG" },
      { name: "geo.placename", content: "Abuja, Lagos, Ogun State" },
      { name: "geo.position", content: "9.0765;7.3986" },
      { name: "ICBM", content: "9.0765, 7.3986" },
      // ── Open Graph ────────────────────────────────────────────────────────
      { property: "og:site_name", content: "Motiva Estate Company" },
      { property: "og:locale", content: "en_NG" },
      {
        property: "og:title",
        content: "Motiva Estate Company — Real Estate in Lagos, Abuja & Ogun State",
      },
      {
        property: "og:description",
        content:
          "Premium residences, land investment and property management across Lagos, Abuja and Ogun State. Fully integrated real-estate solutions since 2010.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.motivaestate.com" },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Motiva Estate Company — premium real estate in Nigeria",
      },
      // ── Twitter / X ───────────────────────────────────────────────────────
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@motivaestate" },
      {
        name: "twitter:title",
        content: "Motiva Estate Company — Real Estate in Lagos, Abuja & Ogun State",
      },
      {
        name: "twitter:description",
        content:
          "Premium residences, land investment and property management across Lagos, Abuja and Ogun State.",
      },
      { name: "twitter:image", content: ogImage },
      // ── Search engine directives ─────────────────────────────────────────
      {
        name: "robots",
        content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      { name: "googlebot", content: "index, follow" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // Icons
      { rel: "icon", href: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      // Web manifest
      { rel: "manifest", href: "/site.webmanifest" },
      // Canonical
      { rel: "canonical", href: "https://www.motivaestate.com" },
      // Fonts
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600&family=Inter+Tight:wght@300;400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "@id": "https://www.motivaestate.com/#organization",
          name: "Motiva Estate Company",
          alternateName: ["MEC", "Motiva Estate", "Motiva Real Estate"],
          url: "https://www.motivaestate.com",
          logo: {
            "@type": "ImageObject",
            url: "https://www.motivaestate.com/apple-touch-icon.png",
            width: 512,
            height: 512,
          },
          image: ogImage,
          foundingDate: "2010",
          email: "askme@motivaestate.com",
          telephone: "+234-815-324-2398",
          description:
            "Motiva Estate Company delivers fully integrated real-estate solutions across Lagos, Abuja and Ogun State since 2010 — development, advisory, property and facilities management, project delivery and brokerage.",
          areaServed: [
            {
              "@type": "State",
              name: "Abuja",
              containedInPlace: { "@type": "Country", name: "Nigeria" },
            },
            {
              "@type": "State",
              name: "Lagos",
              containedInPlace: { "@type": "Country", name: "Nigeria" },
            },
            {
              "@type": "State",
              name: "Ogun State",
              containedInPlace: { "@type": "Country", name: "Nigeria" },
            },
          ],
          address: [
            {
              "@type": "PostalAddress",
              streetAddress: "5 OP Fingesi Street, Utako",
              addressLocality: "Abuja",
              addressRegion: "FCT",
              addressCountry: "NG",
            },
            {
              "@type": "PostalAddress",
              streetAddress: "11 Michael Adebamowo, Olorunda Estate, Ketu",
              addressLocality: "Lagos",
              addressCountry: "NG",
            },
          ],
          sameAs: [
            "https://www.instagram.com/motivaestate",
            "https://www.linkedin.com/company/motivaestate",
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Real Estate Services",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: "Property Development" },
              },
              {
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: "Real Estate Advisory" },
              },
              {
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: "Property Management" },
              },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Project Delivery" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Property Brokerage" } },
            ],
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
