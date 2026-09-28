import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'standardwebhooks';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const webhook = new Webhook(process.env.DODO_PAYMENTS_WEBHOOK_KEY!);

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  try {
    await webhook.verify(rawBody, {
      'webhook-id': req.headers.get('webhook-id') || '',
      'webhook-signature': req.headers.get('webhook-signature') || '',
      'webhook-timestamp': req.headers.get('webhook-timestamp') || '',
    });
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const payload = JSON.parse(rawBody);

  if (payload.type === 'payment.succeeded') {
    const data = payload.data;
    const meta = data.metadata || {};

    const { error } = await supabaseAdmin.from('registrations').upsert(
      {
        event_id: meta.eventId || 'ctf01',
        name: meta.name || data.customer?.name || 'Unknown',
        email: meta.email || data.customer?.email,
        team_name: meta.teamName || null,
        tier_label: meta.tierLabel || null,
        amount_cents: data.total_amount ?? null,
        currency: data.currency ?? 'USD',
        payment_id: data.payment_id,
        payment_status: 'paid',
      },
      { onConflict: 'payment_id' }
    );

    if (error) {
      console.error('Supabase insert failed:', error);
      // Non-2xx makes Dodo retry the webhook
      return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}