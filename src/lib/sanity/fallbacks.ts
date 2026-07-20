// Local image fallbacks by slug — used while the Sanity dataset is being
// populated with real imagery. `resolveImage` returns Sanity URLs first;
// these fill in when a document has no cover/gallery yet.
import r1 from "@/assets/motiva/residence-1.jpg";
import r2 from "@/assets/motiva/residence-2.jpg";
import r3 from "@/assets/motiva/residence-3.jpg";
import g1 from "@/assets/motiva/gallery-1.jpg";
import g2 from "@/assets/motiva/gallery-2.jpg";
import g3 from "@/assets/motiva/gallery-3.jpg";
import g4 from "@/assets/motiva/gallery-4.jpg";
import g5 from "@/assets/motiva/gallery-5.jpg";
import g6 from "@/assets/motiva/gallery-6.jpg";
import harmonyTerraces from "@/assets/motiva/uploads/harmony-terraces.jpg";
import lineaRow from "@/assets/motiva/uploads/linea-row.jpg";
import emberCourt from "@/assets/motiva/uploads/ember-court.jpg";
import extra1 from "@/assets/motiva/uploads/MotivaSocial5.jpg";
import extra2 from "@/assets/motiva/uploads/MotivaSocial10(1).jpg";
import extra6 from "@/assets/motiva/uploads/MotivaSocial24.jpg";

export const projectImageFallbacks: Record<string, { cover: string; gallery: string[] }> = {
  "lifecamp-4br-terrace": { cover: harmonyTerraces, gallery: [harmonyTerraces, g1, g3, g5, g2, g6] },
  "guzape-5br-detached": { cover: lineaRow, gallery: [lineaRow, g2, g4, g6, g1, g5] },
  "gudu-5br-detached": { cover: extra6, gallery: [extra6, g3, g1, g4, g5, g6] },
  "kaura-4br-detached": { cover: r1, gallery: [r1, g1, g3, g5, g6, g2] },
  "kaura-4br-terrace": { cover: r2, gallery: [r2, g2, g4, g5, g6, g1] },
  "kaura-3br-apartment": { cover: r3, gallery: [r3, emberCourt, g5, g3, g1, g6] },
};

export const landImageFallbacks: Record<string, { cover: string; gallery: string[] }> = {
  lanzarote: { cover: extra1, gallery: [extra1, g6, g5, g1] },
  kingspark: { cover: extra2, gallery: [extra2, g4, g3, g2] },
};

const PLACEHOLDER = g1;

export function projectCover(slug: string, resolved?: string) {
  return resolved ?? projectImageFallbacks[slug]?.cover ?? PLACEHOLDER;
}

export function projectGallery(slug: string, resolved: string[]) {
  if (resolved.length > 0) return resolved;
  return projectImageFallbacks[slug]?.gallery ?? [PLACEHOLDER];
}

export function landCover(slug: string, resolved?: string) {
  return resolved ?? landImageFallbacks[slug]?.cover ?? PLACEHOLDER;
}

export function landGallery(slug: string, resolved: string[]) {
  if (resolved.length > 0) return resolved;
  return landImageFallbacks[slug]?.gallery ?? [PLACEHOLDER];
}
