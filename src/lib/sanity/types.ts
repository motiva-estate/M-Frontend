export type ProjectStatus = "pre-sale" | "ongoing" | "delivered";
export type LandStatus = "available" | "reserved" | "sold";
export type PropertyType = "Villa" | "Apartment" | "Townhouse" | "Penthouse";

export interface SanityImageRef {
  _type?: "image";
  asset?: { _ref: string; _type: "reference" };
}

export type ImageLike = SanityImageRef | { url?: string; caption?: string } | string | null | undefined;

export interface SanityProject {
  _id: string;
  title: string;
  slug: string;
  tagline?: string;
  location?: string;
  city?: string;
  propertyType?: PropertyType;
  projectStatus: ProjectStatus;
  phaseLabel?: string;
  buildingType?: string;
  beds?: number;
  baths?: number;
  description?: string;
  amenities?: string[];
  coords?: string;
  nearby?: string[];
  faq?: { q: string; a: string }[];
  cover?: ImageLike;
  coverUrl?: string;
  gallery?: ImageLike[];
  isPriceInternal?: boolean;
  featured?: boolean;
  order?: number;
}

export interface SanityLand {
  _id: string;
  name: string;
  slug: string;
  location?: string;
  estate?: string;
  status: LandStatus;
  sizes?: number[];
  description?: string;
  estateAmenities?: string[];
  cover?: ImageLike;
  coverUrl?: string;
  gallery?: ImageLike[];
  order?: number;
}

export interface SanityContactInfo {
  primaryEmail?: string;
  secondaryEmail?: string;
  primaryPhone?: string;
  whatsappNumber?: string;
  offices?: { label?: string; address?: string; phone?: string }[];
  socialLinks?: { platform?: string; url?: string }[];
}
