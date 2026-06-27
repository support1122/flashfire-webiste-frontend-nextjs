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

  const event: Record<string, unknown> = {
    event_at: Date.now(), // Unix epoch milliseconds as required by Reddit API v3
    action_source: 'SERVER',
    type: { tracking_type: eventType },
  };

  if (clickId) event.click_id = clickId;
  if (orderId) event.event_id = orderId; // deduplication key

  const user: Record<string, unknown> = {};
  if (email) user.email = hashEmail(email);
  if (ipAddress) user.ip_address = ipAddress;
  if (userAgent) user.user_agent = userAgent;
  if (Object.keys(user).length > 0) event.user = user;

  if (value !== undefined) {
    event.custom_data = { value, currency };
  }

  const payload = {
    data: {
      events: [event],
    },
  };

  const response = await fetch(
    `https://ads-api.reddit.com/api/v3/pixels/${PIXEL_ID}/conversion_events`,
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
