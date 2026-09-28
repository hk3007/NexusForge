import { NextRequest, NextResponse } from 'next/server';
import { dodo, TIER_PRODUCT_IDS } from '@/lib/dodo';
import { getMonsoonPrice, MONSOON_START } from '@/lib/pricing';

export async function POST(req: NextRequest) {
  const { name, email, teamName, eventId } = await req.json();

  if (!name || !email || !eventId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  if (eventId !== 'ctf01') {
    return NextResponse.json({ error: 'This event is not open for registration yet' }, { status: 400 });
  }

  // Optional: stop sales once the event has started
  if (Date.now() > new Date(MONSOON_START).getTime()) {
    return NextResponse.json({ error: 'Registration is closed' }, { status: 400 });
  }

  const tier = getMonsoonPrice(Date.now()); // server decides the price
  const productId = TIER_PRODUCT_IDS[tier.id];

  if (!productId) {
    return NextResponse.json({ error: 'Pricing not configured' }, { status: 500 });
  }

  try {
    const session = await dodo.checkoutSessions.create({
      product_cart: [{ product_id: productId, quantity: 1 }],
      customer: { email, name },
      metadata: {
        eventId,
        name,
        email,
        teamName: teamName || '',
        tierLabel: tier.label,
      },
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/register/success`,
    });

    return NextResponse.json({ url: session.checkout_url });
  } catch (err) {
    console.error('Dodo checkout error:', err);
    return NextResponse.json({ error: 'Could not start checkout' }, { status: 500 });
  }
}