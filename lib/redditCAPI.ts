import crypto from 'crypto';

const PIXEL_ID = process.env.REDDIT_PIXEL_ID || 'a2_j8tdb9hlk690';
const CAPI_TOKEN = process.env.REDDIT_CAPI_TOKEN || '';

export function hashEmail(email: string | null | undefined): string | null {
  if (!email) return null;
  return crypto.createHash('sha256').update(email.trim().toLowerCase()).digest('hex');
}

export interface RedditCAPIEventParams {
  eventType: 'Purchase' | 'Lead' | 'SignUp' | 'AddToCart' | 'ViewContent' | 'PageVisit';
  clickId?: string | null;
  email?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  orderId?: string | null;
  value?: number;
  currency?: string;
}

export async function sendRedditCAPIEvent(params: RedditCAPIEventParams): Promise<void> {
  if (!CAPI_TOKEN) {
    console.warn('[Reddit CAPI] REDDIT_CAPI_TOKEN not set — skipping');
    return;
  }

  const { eventType, clickId, email, ipAddress, userAgent, orderId, value, currency = 'USD' } = params;

  const payload = {
    test_mode: false,
    events: [
      {
        event_at: new Date().toISOString(),
        event_type: { tracking_type: eventType },
        ...(clickId ? { click_id: clickId } : {}),
        user: {
          ...(email ? { email: hashEmail(email) } : {}),
          ...(ipAddress ? { ip_address: ipAddress } : {}),
          ...(userAgent ? { user_agent: userAgent } : {}),
        },
        custom_event_source: 'SERVER',
        ...(orderId ? { order_id: orderId } : {}),
        ...(value !== undefined ? { value, currency } : {}),
      },
    ],
  };

  const response = await fetch(
    `https://ads-api.reddit.com/api/v2.0/conversions/events/${PIXEL_ID}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('[Reddit CAPI] Error:', response.status, errorText);
    throw new Error(`Reddit CAPI failed: ${response.status}`);
  }

  const result = await response.json();
  console.log('[Reddit CAPI] Success:', result);
}
