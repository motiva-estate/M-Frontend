import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";

type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Resolve a Sanity image OR a plain URL string OR an external image object
 * into a single URL. Returns undefined when nothing is set.
 */
export function resolveImage(
  field: unknown,
  opts?: { width?: number; height?: number },
): string | undefined {
  if (!field) return undefined;
  if (typeof field === "string") return field;
  if (typeof field === "object" && field !== null) {
    const anyField = field as Record<string, unknown>;
    if (typeof anyField.url === "string") return anyField.url as string;
    if (anyField._type === "image" || anyField.asset) {
      let img = urlFor(field as SanityImageSource);
      if (opts?.width) img = img.width(opts.width);
      if (opts?.height) img = img.height(opts.height);
      return img.auto("format").url();
    }
  }
  return undefined;
}
