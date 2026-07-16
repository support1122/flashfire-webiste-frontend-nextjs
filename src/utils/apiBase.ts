/**
 * Single source of truth for backend API URLs.
 *
 * The deployed NEXT_PUBLIC_API_BASE_URL ends with a trailing slash, and call sites
 * across this repo disagreed on whether to add their own "/" — producing
 * "https://api.flashfirejobs.com//api/..." in production, which Express does NOT
 * match (verified live: //api/geo, //api/track/page-visit and
 * //api/campaigns/track/button-click all returned 404 while the single-slash forms
 * worked). Button clicks, geo detection and page-visit analytics were silently lost.
 *
 * This helper normalizes the base once so no call site ever has to care how the env
 * var is formatted.
 *
 * NOTE: SignupModal deliberately POSTs to the bare base URL (the backend registers
 * `app.post('/')` for signups) — that call site does not use this helper on purpose.
 */
export function apiUrl(path: string): string {
  const base = (
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.flashfirejobs.com"
  ).replace(/\/+$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
