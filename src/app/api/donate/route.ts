import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: '2025-07-30.basil' }) : null;

export async function POST(req: Request) {
  try {
    if (!stripe) return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
    const { amount, currency = 'YER', frequency = 'once', name, email, note } = await req.json();
    if (!amount || amount <= 0) return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });

    const unitAmount = Math.round(Number(amount) * 100);
    if (frequency === 'monthly') {
      const product = await stripe.products.create({ name: `Monthly Donation` });
      const price = await stripe.prices.create({ unit_amount: unitAmount, currency, recurring: { interval: 'month' }, product: product.id });
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [{ price: price.id, quantity: 1 }],
        customer_email: email,
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/donation-success`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/donation-cancel`,
        metadata: { name, note },
      });
      return NextResponse.json({ url: session.url });
    } else {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [{ price_data: { currency, product_data: { name: 'One-time Donation' }, unit_amount: unitAmount }, quantity: 1 }],
        customer_email: email,
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/donation-success`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/donation-cancel`,
        metadata: { name, note },
      });
      return NextResponse.json({ url: session.url });
    }
  } catch {
    return NextResponse.json({ error: 'Stripe error' }, { status: 500 });
  }
}


