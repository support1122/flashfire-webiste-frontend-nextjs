import { NextRequest, NextResponse } from 'next/server';
import { sendRedditCAPIEvent, RedditCAPIEventParams } from '@/lib/redditCAPI';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  let body: Partial<RedditCAPIEventParams> & { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }

  const { eventType, clickId, email, userAgent, orderId, value, currency } = body;

  if (!eventType) {
    return NextResponse.json({ error: 'eventType is required' }, { status: 400 });
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    null;

  try {
    await sendRedditCAPIEvent({
      eventType,
      clickId: clickId ?? null,
      email: email ?? null,
      ipAddress: ip,
      userAgent: userAgent ?? req.headers.get('user-agent') ?? null,
      orderId: orderId ?? null,
      value,
      currency,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Reddit CAPI route] failed:', err);
    return NextResponse.json({ error: 'capi_failed' }, { status: 502 });
  }
}
