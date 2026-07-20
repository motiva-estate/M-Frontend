import { createClient } from "@sanity/client";

export const SANITY_PROJECT_ID =
  import.meta.env.VITE_SANITY_PROJECT_ID ?? "znx01lol";
export const SANITY_DATASET =
  import.meta.env.VITE_SANITY_DATASET ?? "production";
export const SANITY_API_VERSION = "2024-10-01";

// Read-only CDN client. No token — public site never writes to Sanity.
export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: true,
  perspective: "published",
});
