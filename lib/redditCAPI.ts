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
  conversionId?: string | null; // must match transactionId sent from pixel for deduplication
  value?: number;
  currency?: string;
}

export async function sendRedditCAPIEvent(params: RedditCAPIEventParams): Promise<void> {
  if (!CAPI_TOKEN) {
    console.warn('[Reddit CAPI] REDDIT_CAPI_TOKEN not set — skipping');
    return;
  }

  const { eventType, clickId, email, ipAddress, userAgent, conversionId, value, currency = 'USD' } = params;

  const event: Record<string, unknown> = {
    event_at: Date.now(), // Unix epoch milliseconds
    action_source: 'SERVER',
    type: { tracking_type: eventType },
  };

  if (clickId) event.click_id = clickId;

  // User identifiers (matched against Reddit's logged-in users)
  const user: Record<string, unknown> = {};
  if (email) user.email = hashEmail(email);
  if (ipAddress) user.ip_address = ipAddress;
  if (userAgent) user.user_agent = userAgent;
  if (Object.keys(user).length > 0) event.user = user;

  // Metadata — conversion_id is required for pixel+CAPI deduplication
  const metadata: Record<string, unknown> = {};
  if (conversionId) metadata.conversion_id = conversionId;
  if (value !== undefined) {
    metadata.value = value;
    metadata.currency = currency;
  }
  if (Object.keys(metadata).length > 0) event.metadata = metadata;

  const payload = {
    test_id: 't2_2hbge82ka5', // TEMPORARY — remove before final production deploy
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
