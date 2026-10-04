import { apiUrl } from './apiBase';
import { UK_COUNTRY_CODES, EU_COUNTRY_CODES } from './locale';

const STORAGE_KEY = 'ff_country_code_v1';
const CANADA_CODE = 'CA';

export function getCachedCountryCode(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v;
  } catch {
    return null;
  }
}

export function cacheCountryCode(code: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    // ignore storage errors
  }
}

export async function fetchCountryCode(): Promise<string | null> {
  try {
    const res = await fetch(apiUrl('/api/geo'), {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    });
    if (!res.ok) {
      console.warn('[CountryDetection] Backend response not ok:', res.status);
      return null;
    }
    const data = await res.json();
    return (data?.countryCode as string) || null;
  } catch (e) {
    console.error('[CountryDetection] Fetch failed:', e);
    return null;
  }
}

export function detectCountryFallback(): string {
  if (typeof window === 'undefined') return 'US';
  
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Check timezone for Canada
    const canadaTimezones = [
      'America/Toronto', 'America/Vancouver', 'America/Montreal',
      'America/Edmonton', 'America/Winnipeg', 'America/Halifax',
      'America/St_Johns', 'America/Regina', 'America/Yellowknife',
      'America/Goose_Bay', 'America/Glace_Bay', 'America/Moncton',
      'America/Nipigon', 'America/Thunder_Bay', 'America/Atikokan',
      'America/Rainy_River', 'America/Cambridge_Bay', 'America/Creston',
      'America/Dawson', 'America/Dawson_Creek', 'America/Fort_Nelson',
      'America/Inuvik', 'America/Whitehorse'
    ];
    
    if (canadaTimezones.some(tz => timezone.includes(tz))) {
      return 'CA';
    }

    // Check timezone for the UK / EU. Europe/* covers every member state, so
    // exclude the handful of non-EU Europe/* zones rather than listing all 27.
    if (timezone.startsWith('Europe/') && !NON_EU_EUROPE_TIMEZONES.has(timezone)) {
      return 'GB';
    }

    // NOTE: deliberately no `navigator.language` inference here.
    // Language is not location. `en-GB` is an extremely common browser
    // language on Android and Chrome in India, and mapping it to `GB` sent
    // Indian visitors to the UK site. Likewise `fr-CA` does not mean Canada.
    // The timezone checks above are the only client-side signals that
    // actually correlate with location.

    return 'US';
  } catch {
    return 'US';
  }
}

/** Europe/* zones that are NOT in the UK or the EU, so they keep the US site. */
const NON_EU_EUROPE_TIMEZONES = new Set([
  'Europe/Moscow', 'Europe/Kaliningrad', 'Europe/Samara', 'Europe/Volgograd',
  'Europe/Saratov', 'Europe/Ulyanovsk', 'Europe/Astrakhan', 'Europe/Kirov',
  'Europe/Kyiv', 'Europe/Kiev', 'Europe/Uzhgorod', 'Europe/Zaporozhye',
  'Europe/Minsk', 'Europe/Istanbul', 'Europe/Zurich', 'Europe/Oslo',
  'Europe/Reykjavik', 'Europe/Vaduz', 'Europe/Belgrade', 'Europe/Sarajevo',
  'Europe/Skopje', 'Europe/Podgorica', 'Europe/Tirane', 'Europe/Chisinau',
  'Europe/Gibraltar', 'Europe/Guernsey', 'Europe/Jersey', 'Europe/Isle_of_Man',
  'Europe/Andorra', 'Europe/Monaco', 'Europe/San_Marino', 'Europe/Vatican',
  'Europe/Busingen', 'Europe/Mariehamn',
]);

export function shouldRedirectToCanada(pathname: string, countryCode: string | null): boolean {
  if (countryCode === CANADA_CODE && pathname === '/') {
    return true;
  }
  return false;
}

export function shouldRedirectToUK(pathname: string, countryCode: string | null): boolean {
  if (countryCode && pathname === '/' && UK_COUNTRY_CODES.has(countryCode)) {
    return true;
  }
  return false;
}

export function shouldRedirectToEU(pathname: string, countryCode: string | null): boolean {
  if (countryCode && pathname === '/' && EU_COUNTRY_CODES.has(countryCode)) {
    return true;
  }
  return false;
}

