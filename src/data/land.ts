import g6 from "@/assets/motiva/gallery-6.jpg";
import g5 from "@/assets/motiva/gallery-5.jpg";
import g4 from "@/assets/motiva/gallery-4.jpg";
import g3 from "@/assets/motiva/gallery-3.jpg";
import g2 from "@/assets/motiva/gallery-2.jpg";
import g1 from "@/assets/motiva/gallery-1.jpg";
import extra1 from "@/assets/motiva/uploads/MotivaSocial5.jpg";
import extra2 from "@/assets/motiva/uploads/MotivaSocial10(1).jpg";

export type LandStatus = "available" | "reserved" | "sold";

export interface LandParcel {
  slug: string;
  name: string;
  location: string;
  estate: string;
  status: LandStatus;
  sizes: number[]; // SQM options
  cover: string;
  photos: string[];
  description: string;
  estateAmenities?: string[];
  whatsappCtaText?: string;
}

export const landParcels: LandParcel[] = [
  {
    slug: "lanzarote",
    name: "Lanzarote",
    location: "Katampe Extension, Abuja",
    estate: "Katampe Extension",
    status: "available",
    sizes: [200, 250, 350, 500],
    cover: extra1,
    photos: [extra1, g6, g5, g1],
    description:
      "Estate land within Katampe Extension. Lanzarote parcels are offered at four sizes — the plot you choose feeds directly into the current allocation and pricing conversation with a Motiva specialist.",
    estateAmenities: [
      "Basketball court",
      "Swimming pool",
      "General estate facilities",
      "Estate security",
    ],
  },
  {
    slug: "kingspark",
    name: "Kingspark",
    location: "Katampe Extension, Abuja",
    estate: "Katampe Extension",
    status: "available",
    sizes: [250, 450],
    cover: extra2,
    photos: [extra2, g4, g3, g2],
    description:
      "Estate land within Katampe Extension. Kingspark parcels are offered at two sizes, held within a small, considered estate footprint.",
    estateAmenities: ["Estate security", "Paved access", "General estate facilities"],
  },
];

export function getLand(slug: string) {
  return landParcels.find((l) => l.slug === slug);
}
