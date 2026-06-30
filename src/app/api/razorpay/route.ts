import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Lazily initialise Razorpay only when the env keys are present
function getRazorpay() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return null;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Razorpay = require('razorpay');
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

/* POST /api/razorpay  — create a Razorpay order */
export async function POST(req: NextRequest) {
  try {
    const { amount, currency = 'INR', receipt } = await req.json();

    const rz = getRazorpay();
    if (!rz) {
      return NextResponse.json(
        { error: 'Payment gateway not configured' },
        { status: 503 }
      );
    }

    const order = await rz.orders.create({
      amount: Math.round(amount * 100), // paise
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
    });

    return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (err) {
    console.error('Razorpay order create error:', err);
    return NextResponse.json({ error: 'Failed to create payment order' }, { status: 500 });
  }
}

/* PUT /api/razorpay  — verify payment signature */
export async function PUT(req: NextRequest) {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = await req.json();
    const keySecret = process.env.RAZORPAY_KEY_SECRET || '';

    const body = `${razorpayOrderId}|${razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(body)
      .digest('hex');

    const isValid = expectedSignature === razorpaySignature;
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    return NextResponse.json({ verified: true });
  } catch (err) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
