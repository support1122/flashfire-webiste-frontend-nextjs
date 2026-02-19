/**
 * Google Ads Conversion Tracking Helper
 * 
 * Similar to Meta Pixel tracking, this provides helper functions
 * to track Google Ads conversion events throughout the application.
 * 
 * Required: Set GOOGLE_ADS_CONVERSION_ID in your environment variables
 * Format: AW-XXXXXXXXX (e.g., AW-1234567890)
 */

// Google Ads Conversion ID - Set this in your environment variables
// Format: AW-XXXXXXXXX
// Next.js automatically replaces NEXT_PUBLIC_* env vars at build time
export const GOOGLE_ADS_CONVERSION_ID = 
  (typeof window !== 'undefined' 
    ? (window as any).__NEXT_DATA__?.env?.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID 
    : '') || '';

/**
 * Track a page view event
 */
export const pageview = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      send_to: GOOGLE_ADS_CONVERSION_ID,
    });
  }
};

/**
 * Track a conversion event
 * 
 * @param eventName - Google Ads event name (e.g., 'conversion', 'schedule', 'lead')
 * @param options - Event parameters (value, currency, transaction_id, etc.)
 */
export const event = (eventName: string, options: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      send_to: GOOGLE_ADS_CONVERSION_ID,
      ...options,
    });
  }
};

/**
 * Track a conversion with conversion label
 * This is the standard way to track Google Ads conversions
 * 
 * @param conversionLabel - Your Google Ads conversion label (e.g., 'schedule_meeting', 'lead_form')
 * @param options - Additional event parameters
 */
export const conversion = (conversionLabel: string, options: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_CONVERSION_ID}/${conversionLabel}`,
      ...options,
    });
  }
};

/**
 * Track Schedule event (meeting booking)
 * Maps to Meta Pixel's "Schedule" event
 */
export const trackSchedule = (options: {
  value?: number;
  currency?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  transactionId?: string;
  [key: string]: any;
} = {}) => {
  const {
    value = 0,
    currency = 'USD',
    email,
    firstName,
    lastName,
    transactionId,
    ...rest
  } = options;

  // Track as conversion event
  // Conversion Label: 06-oCNjI9_obEOLL8J1C (from Google Ads)
  conversion('06-oCNjI9_obEOLL8J1C', {
    value,
    currency,
    transaction_id: transactionId,
    // User data for enhanced conversions (optional but recommended)
    ...(email && { email_address: email.toLowerCase() }),
    ...(firstName && { first_name: firstName }),
    ...(lastName && { last_name: lastName }),
    ...rest,
  });
};

/**
 * Track Lead event
 * Maps to Meta Pixel's "Lead" event
 */
export const trackLead = (options: {
  value?: number;
  currency?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  transactionId?: string;
  [key: string]: any;
} = {}) => {
  const {
    value = 0,
    currency = 'USD',
    email,
    firstName,
    lastName,
    transactionId,
    ...rest
  } = options;

  conversion('lead_form', {
    value,
    currency,
    transaction_id: transactionId,
    ...(email && { email_address: email.toLowerCase() }),
    ...(firstName && { first_name: firstName }),
    ...(lastName && { last_name: lastName }),
    ...rest,
  });
};

/**
 * Track Purchase event
 * Maps to Meta Pixel's "Purchase" event
 */
export const trackPurchase = (options: {
  value: number;
  currency?: string;
  transactionId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  [key: string]: any;
}) => {
  const {
    value,
    currency = 'USD',
    transactionId,
    email,
    firstName,
    lastName,
    ...rest
  } = options;

  conversion('purchase', {
    value,
    currency,
    transaction_id: transactionId,
    ...(email && { email_address: email.toLowerCase() }),
    ...(firstName && { first_name: firstName }),
    ...(lastName && { last_name: lastName }),
    ...rest,
  });
};
