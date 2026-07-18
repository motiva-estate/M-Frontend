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
import saoirseVilla from "@/assets/motiva/uploads/saoirse-villa.jpg";
import emberCourt from "@/assets/motiva/uploads/ember-court.jpg";
import extra1 from "@/assets/motiva/uploads/MotivaSocial5.jpg";
import extra2 from "@/assets/motiva/uploads/MotivaSocial10(1).jpg";
import extra3 from "@/assets/motiva/uploads/MotivaSocial8.jpg";
import extra4 from "@/assets/motiva/uploads/MotivaSocial9.jpg";
import extra5 from "@/assets/motiva/uploads/MotivaSocial10.jpg";
import extra6 from "@/assets/motiva/uploads/MotivaSocial24.jpg";

// const harmonyTerracesUrl = harmonyTerraces.url;
// const lineaRowUrl = lineaRow.url;
// const saoirseVillaUrl = saoirseVilla.url;
// const emberCourtUrl = emberCourt.url;

export type ProjectStatus = "Available" | "Selling" | "Off-plan" | "Sold out";
export type PropertyType = "Villa" | "Apartment" | "Townhouse" | "Penthouse" | "Land";
export type Listing = "Buy" | "Rent" | "Off-plan";

export interface Unit {
  name: string;
  type: string;
  size: string;
  price: string;
  status: "Available" | "Reserved" | "Sold";
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  location: string;
  city: string;
  status: ProjectStatus;
  listing: Listing;
  propertyType: PropertyType;
  priceNaira: number; // used for filtering
  priceLabel: string;
  beds: number;
  baths: number;
  sqft: number;
  delivery: string;
  cover: string;
  gallery: string[];
  description: string;
  amenities: string[];
  paymentPlans: { name: string; discount: string; term: string; note: string }[];
  units: Unit[];
  coords: string;
  nearby: string[];
  faq: { q: string; a: string }[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "harmony-terraces",
    name: "Harmony Terraces",
    tagline: "A quiet run of four terraced homes.",
    location: "Life Camp, Abuja",
    city: "Abuja",
    status: "Selling",
    listing: "Buy",
    propertyType: "Townhouse",
    priceNaira: 295_000_000,
    priceLabel: "from ₦295M",
    beds: 4,
    baths: 5,
    sqft: 3800,
    delivery: "Q4 2026",
    cover: harmonyTerraces,
    gallery: [harmonyTerraces, lineaRow, saoirseVilla, emberCourt, g1, g3],
    description:
      "Four contemporary terraced homes composed along a shared paved court, framed by louvred timber screens and deep private balconies. Each unit reads as a single quiet volume — white render, graphite base, warm oak accents.",
    amenities: [
      "Private off-street parking",
      "Rooftop terrace",
      "Chef's kitchen",
      "Family lounge",
      "Fitted wardrobes",
      "Backup power (solar + inverter)",
      "Estate CCTV",
      "Fibre internet",
    ],
    paymentPlans: [
      { name: "Outright", discount: "6% off", term: "0–30 days", note: "Single payment" },
      { name: "6 months", discount: "—", term: "6 installments", note: "25% initial" },
      { name: "12 months", discount: "—", term: "12 installments", note: "30% initial" },
    ],
    units: [
      { name: "Terrace 01", type: "4-bed townhouse", size: "3,800 sqft", price: "₦295M", status: "Available" },
      { name: "Terrace 02", type: "4-bed townhouse", size: "3,800 sqft", price: "₦305M", status: "Available" },
      { name: "Terrace 03", type: "4-bed townhouse", size: "3,900 sqft", price: "₦315M", status: "Reserved" },
      { name: "Terrace 04", type: "4-bed townhouse", size: "3,900 sqft", price: "₦325M", status: "Available" },
    ],
    coords: "N 6°26′ · E 3°28′",
    nearby: ["Lekki Conservation Centre — 8 min", "Circle Mall — 6 min", "Admiralty Way — 4 min"],
    faq: [
      { q: "Are the terraces sold individually?", a: "Yes, each of the four units is titled and sold on its own C of O." },
      { q: "Can I customise the finishes?", a: "Early buyers select from three curated Motiva finish palettes at no extra cost." },
    ],
    featured: true,
  },
  {
    slug: "linea-row",
    name: "Linea Row",
    tagline: "Four vertical villas, warm lit at dusk.",
    location: "Guzape, Abuja",
    city: "Abuja",
    status: "Off-plan",
    listing: "Off-plan",
    propertyType: "Townhouse",
    priceNaira: 340_000_000,
    priceLabel: "from ₦340M",
    beds: 4,
    baths: 5,
    sqft: 4200,
    delivery: "Q1 2027",
    cover: lineaRow,
    gallery: [lineaRow, harmonyTerraces, emberCourt, saoirseVilla, g2, g5],
    description:
      "A precise composition of four vertical townhouses arranged along a single line — copper-fluted entry portals, cantilevered balconies, and warm interior glow that reads as a lantern at dusk. Designed for the family that entertains upstairs.",
    amenities: [
      "Private garage",
      "Cinema-ready family room",
      "Rooftop lounge",
      "Chef's kitchen with pantry",
      "Guest suite on ground",
      "Fitted wardrobes",
      "Solar + inverter",
      "Concierge gatehouse",
    ],
    paymentPlans: [
      { name: "Outright", discount: "7% off", term: "0–30 days", note: "Single payment" },
      { name: "12 months", discount: "3% off", term: "12 installments", note: "20% initial" },
      { name: "24 months", discount: "—", term: "24 installments", note: "25% initial" },
    ],
    units: [
      { name: "Row 01", type: "4-bed townhouse", size: "4,200 sqft", price: "₦340M", status: "Available" },
      { name: "Row 02", type: "4-bed townhouse", size: "4,200 sqft", price: "₦355M", status: "Available" },
      { name: "Row 03", type: "4-bed townhouse", size: "4,300 sqft", price: "₦370M", status: "Reserved" },
      { name: "Row 04", type: "4-bed townhouse", size: "4,300 sqft", price: "₦385M", status: "Available" },
    ],
    coords: "N 6°26′ · E 3°28′",
    nearby: ["Lekki Phase 1 — 4 min", "Ikate Market — 3 min", "Admiralty Way — 6 min"],
    faq: [
      { q: "When is completion?", a: "Q1 2027, with quarterly build progress inspections open to buyers." },
      { q: "Is there a show unit?", a: "Row 02 will be dressed as the show unit from Q3 2026." },
    ],
    featured: true,
  },
  {
    slug: "saoirse-villa",
    name: "Saoirse Villa",
    tagline: "A three-storey villa framed by palms.",
    location: "Kingspark, Katampe",
    city: "Abuja",
    status: "Selling",
    listing: "Buy",
    propertyType: "Villa",
    priceNaira: 25_000_000,
    priceLabel: "from ₦25M",
    beds: 5,
    baths: 6,
    sqft: 7200,
    delivery: "Move-in ready",
    cover: saoirseVilla,
    gallery: [saoirseVilla, extra1, extra2, extra3, extra4, extra5],
    description:
      "A single-family villa arranged across three storeys, with an oversized cantilevered study, a covered rooftop pergola, and full-height glazing that opens onto a mature garden. Composed in white render, graphite panels, and walnut cladding.",
    amenities: [
      "Rooftop pergola",
      "Study with garden view",
      "Chef's kitchen + prep kitchen",
      "Home cinema",
      "Guest wing",
      "Two-car garage",
      "Staff quarters",
      "Full solar array",
    ],
    paymentPlans: [
      { name: "Outright", discount: "8% off", term: "0–30 days", note: "Single payment" },
      { name: "6 months", discount: "3% off", term: "6 installments", note: "40% initial" },
      { name: "12 months", discount: "—", term: "12 installments", note: "40% initial" },
    ],
    units: [
      { name: "Saoirse", type: "2-bed villa", size: "250 sqft", price: "₦25M", status: "Available" },
      { name: "Saoirse", type: "3-bed villa", size: "450 sqft", price: "₦45M", status: "Available" },
    ],
    coords: "N 9°02′ · E 7°31′",
    nearby: ["Paradise Valley Zeberced", "Transcorp Hilton — 8 min", "Nnamdi Azikiwe Airport — 45 min"],
    faq: [
      { q: "Is it sold with a C of O?", a: "Yes, a full Certificate of Occupancy is issued at handover." },
      { q: "Can I view the villa?", a: "Yes — private inspections are available every weekday between 10am and 4pm." },
    ],
    featured: true,
  },
  {
    slug: "gudu-court",
    name: "Gudu Court",
    tagline: "4 Bedroom Terrace Duplex fully furnished with BQ",
    location: "Gudu, Abuja",
    city: "Abuja",
    status: "Selling",
    listing: "Buy",
    propertyType: "Apartment",
    priceNaira: 165_000_000,
    priceLabel: "from ₦165M",
    beds: 4,
    baths: 4,
    sqft: 1950,
    delivery: "Move-in ready",
    cover: extra6,
    gallery: [extra6, harmonyTerraces, saoirseVilla, lineaRow, g3, g2],
    description:
      "A quiet three-storey block of six apartments — timber-textured panels, deep-set balconies, and a shared paved forecourt. Each home is a compact, considered plan with full-height glazing to the garden side.",
    amenities: [
      "Shared courtyard parking",
      "Private balconies",
      "Chef's kitchen",
      "Fitted wardrobes",
      "Backup power",
      "CCTV + intercom",
      "Fibre internet",
    ],
    paymentPlans: [
      { name: "Outright", discount: "5% off", term: "0–30 days", note: "Single payment" },
      { name: "18 months", discount: "—", term: "12 installments", note: "50% initial" },
    ],
    units: [
      { name: "Apt G1", type: "4-bed apartment", size: "1,950 sqft", price: "₦165M", status: "Available" },
      { name: "Apt G2", type: "4-bed apartment", size: "1,950 sqft", price: "₦170M", status: "Available" },
      { name: "Apt F1", type: "4-bed apartment", size: "1,980 sqft", price: "₦180M", status: "Reserved" },
      { name: "Apt F2", type: "4-bed apartment", size: "1,980 sqft", price: "₦180M", status: "Available" },
      { name: "Apt S1", type: "4-bed apartment", size: "2,050 sqft", price: "₦195M", status: "Available" },
      { name: "Apt S2", type: "4-bed apartment", size: "2,050 sqft", price: "₦195M", status: "Sold" },
    ],
    coords: "N 9°04′ · E 7°29′",
    nearby: ["Wuse Market — 5 min", "Jabi Lake Mall — 10 min", "Central Business District — 12 min"],
    faq: [
      { q: "Are the apartments sold or rented?", a: "Sold outright, with individual sub-deeds issued at handover." },
      { q: "Is service charge included?", a: "A modest annual service charge covers estate power, security, and grounds." },
    ],
  },
  {
    slug: "ember-court",
    name: "Ember Court",
    tagline: "Six apartments in a warm timber-clad block.",
    location: "Obasanjo Otta, Ogun",
    city: "Otta",
    status: "Selling",
    listing: "Buy",
    propertyType: "Apartment",
    priceNaira: 65_000_000,
    priceLabel: "from ₦65M",
    beds: 3,
    baths: 3,
    sqft: 1950,
    delivery: "Move-in ready",
    cover: emberCourt,
    gallery: [emberCourt, harmonyTerraces, saoirseVilla, lineaRow, g3, g2],
    description:
      "A quiet three-storey block of six apartments — timber-textured panels, deep-set balconies, and a shared paved forecourt. Each home is a compact, considered plan with full-height glazing to the garden side.",
    amenities: [
      "Shared courtyard parking",
      "Private balconies",
      "Chef's kitchen",
      "Fitted wardrobes",
      "Backup power",
      "CCTV + intercom",
      "Fibre internet",
    ],
    paymentPlans: [
      { name: "Outright", discount: "5% off", term: "0–30 days", note: "Single payment" },
      { name: "12 months", discount: "—", term: "12 installments", note: "25% initial" },
      { name: "24 months", discount: "—", term: "24 installments", note: "30% initial" },
    ],
    units: [
      { name: "Apt G1", type: "3-bed apartment", size: "1,950 sqft", price: "₦165M", status: "Available" },
      { name: "Apt G2", type: "3-bed apartment", size: "1,950 sqft", price: "₦170M", status: "Available" },
      { name: "Apt F1", type: "3-bed apartment", size: "1,980 sqft", price: "₦180M", status: "Reserved" },
      { name: "Apt F2", type: "3-bed apartment", size: "1,980 sqft", price: "₦180M", status: "Available" },
      { name: "Apt S1", type: "3-bed apartment", size: "2,050 sqft", price: "₦195M", status: "Available" },
      { name: "Apt S2", type: "3-bed apartment", size: "2,050 sqft", price: "₦195M", status: "Sold" },
    ],
    coords: "N 9°04′ · E 7°29′",
    nearby: ["Wuse Market — 5 min", "Jabi Lake Mall — 10 min", "Central Business District — 12 min"],
    faq: [
      { q: "Are the apartments sold or rented?", a: "Sold outright, with individual sub-deeds issued at handover." },
      { q: "Is service charge included?", a: "A modest annual service charge covers estate power, security, and grounds." },
    ],
  },
  {
    slug: "casa-solano",
    name: "Casa Solano",
    tagline: "A courtyard house on the ridge.",
    location: "Banana Island, Lagos",
    city: "Lagos",
    status: "Selling",
    listing: "Buy",
    propertyType: "Villa",
    priceNaira: 850_000_000,
    priceLabel: "from ₦850M",
    beds: 4,
    baths: 5,
    sqft: 5400,
    delivery: "Q2 2027",
    cover: r1,
    gallery: [r1, g1, g3, g5, g6, g2],
    description:
      "Casa Solano is composed around a central courtyard, drawing the interior perimeter into a slow dialogue with light. Travertine, oak, and shadow. Four principal bedrooms, a library, and a private lap pool arranged along a single quiet axis.",
    amenities: [
      "Private lap pool",
      "Home cinema",
      "Wine cellar",
      "Rooftop garden",
      "Staff quarters",
      "Two-car garage",
      "Backup power (solar + inverter)",
      "24/7 estate security",
    ],
    paymentPlans: [
      { name: "Outright", discount: "8% off", term: "0–30 days", note: "Single payment" },
      { name: "6 months", discount: "3% off", term: "6 installments", note: "20% initial" },
      { name: "12 months", discount: "—", term: "12 installments", note: "20% initial" },
      { name: "24 months", discount: "+2%", term: "24 installments", note: "30% initial" },
    ],
    units: [
      { name: "Unit A01", type: "4-bed villa", size: "5,400 sqft", price: "₦850M", status: "Available" },
      { name: "Unit A02", type: "4-bed villa", size: "5,400 sqft", price: "₦865M", status: "Reserved" },
      { name: "Unit A03", type: "4-bed villa", size: "5,600 sqft", price: "₦880M", status: "Available" },
      { name: "Unit A04", type: "4-bed villa", size: "5,400 sqft", price: "₦850M", status: "Sold" },
    ],
    coords: "N 6°26′ · E 3°26′",
    nearby: [
      "Banana Island Yacht Club — 4 min",
      "Ikoyi Golf Club — 12 min",
      "Landmark Beach — 18 min",
      "Murtala Muhammed Intl. Airport — 45 min",
    ],
    faq: [
      { q: "Is the C of O available?", a: "Yes, a global Certificate of Occupancy has been issued for the estate; per-unit deeds are executed on completion." },
      { q: "Can I inspect the site before buying?", a: "Yes. Book a private inspection any weekday, or a Saturday guided tour of the show-home." },
      { q: "Are units financed?", a: "We accept outright and structured installment plans up to 24 months. Mortgage introductions on request." },
    ],
    featured: true,
  },
  {
    slug: "kestrel-lodge",
    name: "Kestrel Lodge",
    tagline: "Three homes on a sloping brief.",
    location: "Maitama, Abuja",
    city: "Abuja",
    status: "Available",
    listing: "Buy",
    propertyType: "Townhouse",
    priceNaira: 420_000_000,
    priceLabel: "from ₦420M",
    beds: 3,
    baths: 4,
    sqft: 4100,
    delivery: "Move-in ready",
    cover: r2,
    gallery: [r2, g2, g4, g6, g1, g5],
    description:
      "A quiet cluster of three terraced homes stepping down a wooded plot in Maitama. Board-formed concrete, warm brass, and long horizon glazing. Compact, considered, and complete.",
    amenities: ["Landscaped garden", "Study", "Chef's kitchen", "Family lounge", "Backup power", "Estate security", "Fibre internet"],
    paymentPlans: [
      { name: "Outright", discount: "5% off", term: "0–30 days", note: "Single payment" },
      { name: "6 months", discount: "—", term: "6 installments", note: "25% initial" },
      { name: "12 months", discount: "—", term: "12 installments", note: "30% initial" },
    ],
    units: [
      { name: "Terrace 01", type: "3-bed townhouse", size: "4,100 sqft", price: "₦420M", status: "Available" },
      { name: "Terrace 02", type: "3-bed townhouse", size: "4,100 sqft", price: "₦435M", status: "Available" },
      { name: "Terrace 03", type: "3-bed townhouse", size: "4,300 sqft", price: "₦450M", status: "Reserved" },
    ],
    coords: "N 9°05′ · E 7°30′",
    nearby: ["Maitama Amusement Park — 6 min", "Transcorp Hilton — 10 min", "Nnamdi Azikiwe Airport — 40 min"],
    faq: [
      { q: "What's the delivery status?", a: "All three terraces are complete and inspection-ready." },
      { q: "Are pets allowed?", a: "Yes, the estate is pet-friendly with dedicated green space." },
    ],
    featured: true,
  },
  {
    slug: "aerie-house",
    name: "Aerie House",
    tagline: "A five-bedroom for a family that entertains.",
    location: "Ikoyi, Lagos",
    city: "Lagos",
    status: "Sold out",
    listing: "Buy",
    propertyType: "Villa",
    priceNaira: 1_400_000_000,
    priceLabel: "₦1.4B",
    beds: 5,
    baths: 6,
    sqft: 8200,
    delivery: "Delivered 2025",
    cover: r3,
    gallery: [r3, g5, g4, g6, g3, g1],
    description:
      "The largest of the Aerie series. Five bedrooms, a double-height great room, a covered outdoor kitchen, and a 25-metre lap pool. Delivered and owner-occupied.",
    amenities: ["25m lap pool", "Outdoor kitchen", "Guest wing", "Home gym", "Sauna", "Panic room", "EV charging", "Full solar array"],
    paymentPlans: [
      { name: "Resale", discount: "—", term: "Broker-managed", note: "Waitlist open" },
    ],
    units: [{ name: "Aerie House", type: "5-bed villa", size: "8,200 sqft", price: "₦1.4B", status: "Sold" }],
    coords: "N 6°27′ · E 3°26′",
    nearby: ["Falomo Bridge — 3 min", "Muri Okunola Park — 5 min", "Silverbird Galleria — 8 min"],
    faq: [
      { q: "Is this available?", a: "The residence is sold. We maintain a private waitlist for resale enquiries." },
    ],
  },
  {
    slug: "orin-heights",
    name: "Orin Heights",
    tagline: "42 apartments in the sky above Oniru.",
    location: "Oniru, Lagos",
    city: "Lagos",
    status: "Off-plan",
    listing: "Off-plan",
    propertyType: "Apartment",
    priceNaira: 220_000_000,
    priceLabel: "from ₦220M",
    beds: 2,
    baths: 3,
    sqft: 1800,
    delivery: "Q4 2027",
    cover: g5,
    gallery: [g5, g1, g2, g3, g4, g6],
    description:
      "A 14-storey residential tower composed as a stack of quiet floors above Oniru. 2- and 3-bed apartments, a resident's sky lounge, and a lap pool at level 12.",
    amenities: ["Sky pool", "Concierge", "Coworking lounge", "Gym", "Underground parking", "Fibre internet", "Chiller AC", "Fire suppression"],
    paymentPlans: [
      { name: "Outright", discount: "10% off", term: "0–30 days", note: "Single payment" },
      { name: "12 months", discount: "5% off", term: "12 installments", note: "20% initial" },
      { name: "24 months", discount: "—", term: "24 installments", note: "25% initial" },
      { name: "36 months", discount: "+3%", term: "36 installments", note: "30% initial" },
    ],
    units: [
      { name: "2BR Type A", type: "2-bed apartment", size: "1,800 sqft", price: "₦220M", status: "Available" },
      { name: "2BR Type B", type: "2-bed apartment", size: "1,900 sqft", price: "₦240M", status: "Available" },
      { name: "3BR Type C", type: "3-bed apartment", size: "2,400 sqft", price: "₦310M", status: "Available" },
      { name: "Sky suite", type: "3-bed penthouse", size: "3,600 sqft", price: "₦520M", status: "Reserved" },
    ],
    coords: "N 6°26′ · E 3°28′",
    nearby: ["Landmark Beach — 6 min", "Oniru Market — 3 min", "VI business district — 10 min"],
    faq: [
      { q: "When is delivery?", a: "Q4 2027, with progress inspections open to buyers every quarter." },
      { q: "Are the finishes negotiable?", a: "Early buyers choose from three curated finish palettes at no extra cost." },
    ],
    featured: true,
  },
  {
    slug: "mira-house",
    name: "Mira House",
    tagline: "A single-storey pavilion by the water.",
    location: "Old GRA, Port Harcourt",
    city: "Port Harcourt",
    status: "Selling",
    listing: "Buy",
    propertyType: "Villa",
    priceNaira: 380_000_000,
    priceLabel: "from ₦380M",
    beds: 4,
    baths: 4,
    sqft: 4600,
    delivery: "Q1 2027",
    cover: g4,
    gallery: [g4, g6, g2, g1, g5, g3],
    description:
      "A calm horizontal composition on a mature garden plot. Four bedrooms arranged around a shaded central lanai, with the pool set into the long axis.",
    amenities: ["Pool", "Lanai", "Chef's kitchen", "Study", "Garden", "Backup power", "Security post"],
    paymentPlans: [
      { name: "Outright", discount: "6% off", term: "0–30 days", note: "Single payment" },
      { name: "12 months", discount: "—", term: "12 installments", note: "25% initial" },
    ],
    units: [
      { name: "Mira 01", type: "4-bed villa", size: "4,600 sqft", price: "₦380M", status: "Available" },
      { name: "Mira 02", type: "4-bed villa", size: "4,600 sqft", price: "₦395M", status: "Available" },
    ],
    coords: "N 4°49′ · E 7°02′",
    nearby: ["Pleasure Park — 8 min", "PH Polo Club — 12 min", "PH Intl. Airport — 40 min"],
    faq: [{ q: "Are there title documents?", a: "Yes, C of O per unit is issued at completion." }],
  },
  {
    slug: "cove-penthouse",
    name: "Cove Penthouse",
    tagline: "The top three floors of the Cove tower.",
    location: "Eko Atlantic, Lagos",
    city: "Lagos",
    status: "Available",
    listing: "Rent",
    propertyType: "Penthouse",
    priceNaira: 95_000_000,
    priceLabel: "₦95M / year",
    beds: 4,
    baths: 5,
    sqft: 6800,
    delivery: "Move-in ready",
    cover: g2,
    gallery: [g2, g6, g5, g1, g3, g4],
    description:
      "A triplex penthouse crowning the Cove tower on the Eko Atlantic waterfront. Private lift, four bedrooms, a private plunge pool, and a wrap terrace above the Atlantic.",
    amenities: ["Private lift", "Plunge pool", "Wrap terrace", "Chef's kitchen", "Wine room", "Two parking bays", "Concierge"],
    paymentPlans: [
      { name: "Annual lease", discount: "—", term: "12 months", note: "One year advance" },
      { name: "2-year lease", discount: "5% off", term: "24 months", note: "One year advance + escrow" },
    ],
    units: [{ name: "Cove PH", type: "4-bed penthouse", size: "6,800 sqft", price: "₦95M/yr", status: "Available" }],
    coords: "N 6°24′ · E 3°23′",
    nearby: ["Eko Boulevard — 2 min", "Beach promenade — 3 min", "VI business district — 10 min"],
    faq: [{ q: "Is it furnished?", a: "Yes, the penthouse is fully furnished to Motiva's Cove specification." }],
    featured: true,
  },
   {
    slug: "atelier-lofts",
    name: "Atelier Lofts",
    tagline: "Twelve loft residences above Yaba.",
    location: "Yaba, Lagos",
    city: "Lagos",
    status: "Off-plan",
    listing: "Off-plan",
    propertyType: "Apartment",
    priceNaira: 135_000_000,
    priceLabel: "from ₦135M",
    beds: 1,
    baths: 2,
    sqft: 1200,
    delivery: "Q3 2027",
    cover: g1,
    gallery: [g1, g3, g2, g5, g6, g4],
    description:
      "Twelve open-plan loft apartments above a ground-floor coffee bar and gallery. Double-height ceilings, exposed structure, and a shared roof garden.",
    amenities: ["Ground-floor café", "Roof garden", "Bike storage", "Coworking corner", "Backup power"],
    paymentPlans: [
      { name: "Outright", discount: "8% off", term: "0–30 days", note: "Single payment" },
      { name: "12 months", discount: "—", term: "12 installments", note: "25% initial" },
      { name: "24 months", discount: "—", term: "24 installments", note: "30% initial" },
    ],
    units: [
      { name: "Loft 101", type: "1-bed loft", size: "1,200 sqft", price: "₦135M", status: "Available" },
      { name: "Loft 102", type: "1-bed loft", size: "1,250 sqft", price: "₦142M", status: "Available" },
      { name: "Loft 201", type: "1-bed loft", size: "1,300 sqft", price: "₦150M", status: "Reserved" },
    ],
    coords: "N 6°30′ · E 3°22′",
    nearby: ["University of Lagos — 5 min", "Yaba Tech — 8 min", "Third Mainland Bridge — 6 min"],
    faq: [{ q: "Is this suitable for short-let?", a: "Yes, the estate is licensed for owner-occupied and short-let use, subject to Motiva's standards." }],
  },
  {
    slug: "ridge-parkland",
    name: "Ridge Parkland",
    tagline: "Serviced plots on the Abuja ridge.",
    location: "Katampe Extension, Abuja",
    city: "Abuja",
    status: "Selling",
    listing: "Buy",
    propertyType: "Land",
    priceNaira: 120_000_000,
    priceLabel: "from ₦120M / plot",
    beds: 0,
    baths: 0,
    sqft: 6500,
    delivery: "Titled, serviced",
    cover: g6,
    gallery: [g6, g5, g1, g4, g2, g3],
    description:
      "Twenty-eight fully serviced residential plots along a landscaped ridge, with paved access roads, drainage, water, and pre-installed power. C of O issued.",
    amenities: ["Paved roads", "Perimeter fencing", "Estate gatehouse", "Underground utilities", "Streetlighting"],
    paymentPlans: [
      { name: "Outright", discount: "7% off", term: "0–30 days", note: "Single payment" },
      { name: "6 months", discount: "—", term: "6 installments", note: "30% initial" },
      { name: "12 months", discount: "—", term: "12 installments", note: "40% initial" },
    ],
    units: [
      { name: "Plot 03", type: "Serviced plot", size: "650 sqm", price: "₦120M", status: "Available" },
      { name: "Plot 04", type: "Serviced plot", size: "700 sqm", price: "₦135M", status: "Available" },
      { name: "Plot 05", type: "Serviced plot", size: "820 sqm", price: "₦165M", status: "Reserved" },
    ],
    coords: "N 9°06′ · E 7°28′",
    nearby: ["Jabi Lake Mall — 12 min", "Central Business District — 18 min"],
    faq: [{ q: "Can I build my own home?", a: "Yes, subject to Motiva's estate design guidelines to maintain architectural coherence." }],
  },
];

export const cities = Array.from(new Set(projects.map((p) => p.city)));
export const propertyTypes: PropertyType[] = ["Villa", "Apartment", "Townhouse", "Penthouse", "Land"];
export const listings: Listing[] = ["Buy", "Rent", "Off-plan"];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
