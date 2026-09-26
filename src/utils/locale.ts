/**
 * Locale routing helpers.
 *
 * `/` serves the default (US) content and stays the canonical, indexed URL —
 * it's what crawlers always see (middleware never geo-redirects bots) and
 * what any visitor whose country can't be determined lands on. `/en-us` is
 * an explicit mirror of the exact same content (every page re-exports its
 * root counterpart) for parity with `/en-ca`, `/en-gb` and `/en-au`, and real
 * US visitors ARE redirected there by the middleware, same as CA, UK/EU and
 * AU visitors get sent to their trees. Its pages still canonicalize back to the
 * root URL, so it never competes with `/` for search ranking even though it
 * now carries real traffic. Everything that needs to build a country-aware
 * link or pick country-specific content should go through here rather than
 * hard-coding `"/en-ca"` checks, so adding a locale stays a one-line change.
 */

export type Locale = "us" | "ca" | "uk" | "au";

export const US_PREFIX = "/en-us";
export const CANADA_PREFIX = "/en-ca";
export const UK_PREFIX = "/en-gb";
export const AU_PREFIX = "/en-au";

/**
 * Every non-default locale prefix. Matching is on segment boundaries (see
 * getLocalePrefix), so order does not matter: `/en-ca` never matches `/en-cash`.
 */
export const LOCALE_PREFIXES = [CANADA_PREFIX, UK_PREFIX, AU_PREFIX, US_PREFIX] as const;

export type LocalePrefix = (typeof LOCALE_PREFIXES)[number] | "";

/** Country codes that should be served the UK tree: GB + the 27 EU member states. */
export const UK_EU_COUNTRY_CODES = new Set([
  "GB", // United Kingdom
  "AT", // Austria
  "BE", // Belgium
  "BG", // Bulgaria
  "HR", // Croatia
  "CY", // Cyprus
  "CZ", // Czechia
  "DK", // Denmark
  "EE", // Estonia
  "FI", // Finland
  "FR", // France
  "DE", // Germany
  "GR", // Greece
  "HU", // Hungary
  "IE", // Ireland
  "IT", // Italy
  "LV", // Latvia
  "LT", // Lithuania
  "LU", // Luxembourg
  "MT", // Malta
  "NL", // Netherlands
  "PL", // Poland
  "PT", // Portugal
  "RO", // Romania
  "SK", // Slovakia
  "SI", // Slovenia
  "ES", // Spain
  "SE", // Sweden
]);

/**
 * Returns the locale prefix a path is served under, or `""` for the default
 * (US) tree. Matches on segment boundaries so `/en-cash` is not treated as
 * `/en-ca`.
 */
export function getLocalePrefix(pathname: string | null | undefined): LocalePrefix {
  if (!pathname) return "";
  for (const prefix of LOCALE_PREFIXES) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return prefix;
    }
  }
  return "";
}

export function getLocale(pathname: string | null | undefined): Locale {
  const prefix = getLocalePrefix(pathname);
  if (prefix === CANADA_PREFIX) return "ca";
  if (prefix === UK_PREFIX) return "uk";
  if (prefix === AU_PREFIX) return "au";
  return "us";
}

export function isCanadaPath(pathname: string | null | undefined): boolean {
  return getLocalePrefix(pathname) === CANADA_PREFIX;
}

export function isUKPath(pathname: string | null | undefined): boolean {
  return getLocalePrefix(pathname) === UK_PREFIX;
}

export function isAUPath(pathname: string | null | undefined): boolean {
  return getLocalePrefix(pathname) === AU_PREFIX;
}

export function isUSPath(pathname: string | null | undefined): boolean {
  return getLocalePrefix(pathname) === US_PREFIX;
}

/** True for any non-default locale tree. */
export function isLocalizedPath(pathname: string | null | undefined): boolean {
  return getLocalePrefix(pathname) !== "";
}

/** Strips a leading locale prefix, so `/en-gb/pricing` becomes `/pricing`. */
export function stripLocalePrefix(pathname: string | null | undefined): string {
  if (!pathname) return "/";
  const prefix = getLocalePrefix(pathname);
  if (!prefix) return pathname;
  const rest = pathname.slice(prefix.length);
  return rest === "" ? "/" : rest;
}

/**
 * Rewrites an internal href into the locale tree the user is currently in.
 * External links and already-prefixed paths are returned untouched.
 */
export function localizeHref(href: string, pathname: string | null | undefined): string {
  if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href;
  }
  const prefix = getLocalePrefix(pathname);
  if (!prefix) return href;
  if (getLocalePrefix(href)) return href;
  return `${prefix}${href}`;
}

/** True when the path is the home page of whichever tree it belongs to. */
export function isLocaleHome(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const prefix = getLocalePrefix(pathname);
  return pathname === "/" || pathname === prefix || pathname === `${prefix}/`;
}
