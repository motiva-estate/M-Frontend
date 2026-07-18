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
import extra6 from "@/assets/motiva/uploads/MotivaSocial24.jpg";

// Real inventory per Motiva Website Realignment PRD (July 2026).
// All buildings are pre-sale — in Review & Planning. No published prices.
// No committed delivery dates. Every project routes to a WhatsApp enquiry.

export type ProjectStatus = "pre-sale" | "ongoing" | "delivered";
export type PropertyType = "Villa" | "Apartment" | "Townhouse" | "Penthouse";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  location: string;
  city: string;
  projectStatus: ProjectStatus;
  phaseLabel?: string;
  propertyType: PropertyType;
  beds: number;
  baths: number;
  buildingType: string;
  cover: string;
  gallery: string[];
  description: string;
  amenities: string[];
  coords: string;
  nearby: string[];
  faq: { q: string; a: string }[];
  featured?: boolean;
  whatsappCtaText?: string;
}

export const projects: Project[] = [
  {
    slug: "lifecamp-4br-terrace",
    name: "Lifecamp Terrace",
    tagline: "A four-bedroom terrace, quietly composed.",
    location: "Life Camp, Abuja",
    city: "Abuja",
    projectStatus: "pre-sale",
    phaseLabel: "Review & planning",
    propertyType: "Townhouse",
    beds: 4,
    baths: 5,
    buildingType: "4 Bedroom Terrace",
    cover: harmonyTerraces,
    gallery: [harmonyTerraces, g1, g3, g5, g2, g6],
    description:
      "A four-bedroom terrace at Life Camp, drawn as a single quiet volume — considered rooms, deep private balconies, and a rear garden held in shade.",
    amenities: [
      "Private off-street parking",
      "Rear garden",
      "Chef's kitchen",
      "Family lounge",
      "Fitted wardrobes",
      "Backup power",
      "Estate CCTV",
    ],
    coords: "N 9°06′ · E 7°25′",
    nearby: ["Jabi Lake Mall — 10 min", "Central Business District — 15 min"],
    faq: [
      {
        q: "What stage is this project at?",
        a: "Pre-sale — currently in review and planning. Contact us for the current allocation and terms.",
      },
      {
        q: "Are prices published?",
        a: "Pricing moves with approvals and inflation, so we quote current terms per enquiry over WhatsApp.",
      },
    ],
    featured: true,
  },
  {
    slug: "guzape-5br-detached",
    name: "Guzape Detached",
    tagline: "A five-bedroom detached home, quietly held.",
    location: "Guzape, Abuja",
    city: "Abuja",
    projectStatus: "pre-sale",
    phaseLabel: "Review & planning",
    propertyType: "Villa",
    beds: 5,
    baths: 6,
    buildingType: "5 Bedroom fully detached with BQ",
    cover: lineaRow,
    gallery: [lineaRow, g2, g4, g6, g1, g5],
    description:
      "A five-bedroom detached residence at Guzape with dedicated boys' quarters — arranged as a single family volume with a lift option and private landscaping.",
    amenities: [
      "Lift option",
      "Swimming pool",
      "Private garage",
      "Chef's kitchen",
      "Boys' quarters",
      "Estate security",
      "Backup power",
    ],
    coords: "N 9°02′ · E 7°31′",
    nearby: ["Transcorp Hilton — 10 min", "Nnamdi Azikiwe Airport — 45 min"],
    faq: [
      {
        q: "When will construction begin?",
        a: "Currently in review and planning. Construction kicks off subject to approvals and subscriber commitments.",
      },
    ],
    featured: true,
  },
  {
    slug: "gudu-5br-detached",
    name: "Gudu Detached",
    tagline: "A five-bedroom detached home in Gudu.",
    location: "Gudu, Abuja",
    city: "Abuja",
    projectStatus: "pre-sale",
    phaseLabel: "Review & planning",
    propertyType: "Villa",
    beds: 5,
    baths: 6,
    buildingType: "5 Bedroom fully detached with BQ",
    cover: extra6,
    gallery: [extra6, g3, g1, g4, g5, g6],
    description:
      "A generous five-bedroom detached home in Gudu with boys' quarters and a family-scaled plot — designed for households that entertain and grow.",
    amenities: [
      "Boys' quarters",
      "Private garage",
      "Chef's kitchen",
      "Family lounge",
      "Fitted wardrobes",
      "Backup power",
      "Estate security",
    ],
    coords: "N 9°02′ · E 7°28′",
    nearby: ["Wuse Market — 8 min", "Central Business District — 12 min"],
    faq: [
      {
        q: "Is a payment plan available?",
        a: "Yes — flexible plans typically over 12 months. Terms are negotiable per subscriber.",
      },
    ],
    featured: true,
  },
  {
    slug: "kaura-4br-detached",
    name: "Kaura Detached",
    tagline: "A four-bedroom detached family home.",
    location: "Kaura, Abuja",
    city: "Abuja",
    projectStatus: "pre-sale",
    phaseLabel: "Review & planning",
    propertyType: "Villa",
    beds: 4,
    baths: 5,
    buildingType: "4 Bedroom fully detached with BQ",
    cover: r1,
    gallery: [r1, g1, g3, g5, g6, g2],
    description:
      "A four-bedroom detached residence in Kaura with dedicated boys' quarters — a quieter footprint sized for the modern Abuja family.",
    amenities: [
      "Boys' quarters",
      "Private parking",
      "Chef's kitchen",
      "Family lounge",
      "Fitted wardrobes",
      "Backup power",
    ],
    coords: "N 8°58′ · E 7°28′",
    nearby: ["Nnamdi Azikiwe Airport — 25 min", "Central Business District — 22 min"],
    faq: [
      {
        q: "How does this differ from the other Kaura listings?",
        a: "This is the fully detached typology. Kaura also has a terrace and an apartment listing — each a separate development.",
      },
    ],
  },
  {
    slug: "kaura-4br-terrace",
    name: "Kaura Terrace",
    tagline: "A four-bedroom terrace with BQ.",
    location: "Kaura, Abuja",
    city: "Abuja",
    projectStatus: "pre-sale",
    phaseLabel: "Review & planning",
    propertyType: "Townhouse",
    beds: 4,
    baths: 5,
    buildingType: "4 Bedroom Terrace with BQ",
    cover: r2,
    gallery: [r2, g2, g4, g5, g6, g1],
    description:
      "A four-bedroom terrace at Kaura arranged along a shared paved court, each home held as a single quiet volume with a dedicated BQ.",
    amenities: [
      "Boys' quarters",
      "Off-street parking",
      "Chef's kitchen",
      "Family lounge",
      "Fitted wardrobes",
      "Backup power",
    ],
    coords: "N 8°58′ · E 7°28′",
    nearby: ["Nnamdi Azikiwe Airport — 25 min", "Central Business District — 22 min"],
    faq: [
      {
        q: "Are the terraces sold individually?",
        a: "Yes — each home is separately titled at handover.",
      },
    ],
  },
  {
    slug: "kaura-3br-apartment",
    name: "Kaura Apartments",
    tagline: "A three-bedroom apartment residence.",
    location: "Kaura, Abuja",
    city: "Abuja",
    projectStatus: "pre-sale",
    phaseLabel: "Review & planning",
    propertyType: "Apartment",
    beds: 3,
    baths: 3,
    buildingType: "3 Bedroom apartment",
    cover: r3,
    gallery: [r3, emberCourt, g5, g3, g1, g6],
    description:
      "A three-bedroom apartment residence at Kaura — measured, contemporary, and priced for the emerging Abuja family that wants proximity without compromise.",
    amenities: [
      "Shared courtyard",
      "Off-street parking",
      "Chef's kitchen",
      "Fitted wardrobes",
      "Backup power",
      "CCTV + intercom",
    ],
    coords: "N 8°58′ · E 7°28′",
    nearby: ["Nnamdi Azikiwe Airport — 25 min", "Central Business District — 22 min"],
    faq: [
      {
        q: "Is this a rental or purchase?",
        a: "Sold outright, with sub-deeds issued at handover.",
      },
    ],
  },
];

export const cities = Array.from(new Set(projects.map((p) => p.city)));
export const propertyTypes: PropertyType[] = ["Villa", "Apartment", "Townhouse", "Penthouse"];
export const statuses: ProjectStatus[] = ["pre-sale", "ongoing", "delivered"];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
