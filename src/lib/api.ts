/**
 * M-Frontend public API helper.
 *
 * Only unauthenticated / public endpoints are called from the frontend.
 * The enquiry creation endpoint requires no JWT.
 *
 * Set VITE_API_BASE_URL in your .env (e.g. http://localhost:4000/api in dev,
 * https://api.motivaestate.com/api in production).
 */

const BASE =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ||
  "http://localhost:4000/api";

export interface EnquiryPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
  /** Sanity project id or title — stored as propertyId on the enquiry record */
  propertyId?: string;
}

/**
 * Submit a public enquiry.
 * Maps to POST /api/enquiries/public — no auth required.
 * Throws with a user-readable message on failure.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<void> {
  const res = await fetch(`${BASE}/enquiries/public`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.message) msg = body.message;
    } catch {
      /* ignore parse error */
    }
    throw new Error(msg);
  }
}
