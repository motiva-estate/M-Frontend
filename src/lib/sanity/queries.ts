import { queryOptions } from "@tanstack/react-query";
import { sanityClient } from "./client";
import type { SanityContactInfo, SanityLand, SanityProject } from "./types";

const PROJECT_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  tagline,
  location,
  city,
  propertyType,
  projectStatus,
  phaseLabel,
  buildingType,
  beds,
  baths,
  description,
  amenities,
  coords,
  nearby,
  faq,
  cover,
  coverUrl,
  gallery,
  isPriceInternal,
  featured,
  order
}`;

const LAND_PROJECTION = `{
  _id,
  name,
  "slug": slug.current,
  location,
  estate,
  status,
  sizes,
  description,
  estateAmenities,
  cover,
  coverUrl,
  gallery,
  order
}`;

// ─── Projects ─────────────────────────────────────────────

export const projectsQueryOptions = queryOptions({
  queryKey: ["sanity", "projects"],
  queryFn: () =>
    sanityClient.fetch<SanityProject[]>(
      `*[_type == "project"] | order(order asc, _createdAt asc) ${PROJECT_PROJECTION}`,
    ),
});

export const featuredProjectsQueryOptions = queryOptions({
  queryKey: ["sanity", "projects", "featured"],
  queryFn: () =>
    sanityClient.fetch<SanityProject[]>(
      `*[_type == "project" && featured == true] | order(order asc) ${PROJECT_PROJECTION}`,
    ),
});

export const projectBySlugQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["sanity", "project", slug],
    queryFn: () =>
      sanityClient.fetch<SanityProject | null>(
        `*[_type == "project" && slug.current == $slug][0] ${PROJECT_PROJECTION}`,
        { slug },
      ),
  });

// ─── Land ─────────────────────────────────────────────────

export const landQueryOptions = queryOptions({
  queryKey: ["sanity", "land"],
  queryFn: () =>
    sanityClient.fetch<SanityLand[]>(
      `*[_type == "land"] | order(order asc, _createdAt asc) ${LAND_PROJECTION}`,
    ),
});

export const landBySlugQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["sanity", "land", slug],
    queryFn: () =>
      sanityClient.fetch<SanityLand | null>(
        `*[_type == "land" && slug.current == $slug][0] ${LAND_PROJECTION}`,
        { slug },
      ),
  });

// ─── Contact info (singleton) ─────────────────────────────

export const contactInfoQueryOptions = queryOptions({
  queryKey: ["sanity", "contactInfo"],
  queryFn: () =>
    sanityClient.fetch<SanityContactInfo | null>(
      `*[_type == "contactInfo"][0]{
        primaryEmail,
        secondaryEmail,
        primaryPhone,
        whatsappNumber,
        offices,
        socialLinks
      }`,
    ),
});
