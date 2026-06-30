import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { nanoid } from '@/lib/nanoid';
import { addDays, format } from 'date-fns';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const { items, address, subtotal, deliveryCharge, tax, total, paymentMethod } = body;

    if (!items?.length || !address || !total) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const orderId = `GKL${Date.now().toString(36).toUpperCase()}${nanoid(4)}`;
    const estimatedDelivery = addDays(new Date(), paymentMethod === 'cod' ? 7 : 5);

    const order = await Order.create({
      orderId,
      items,
      address,
      subtotal,
      deliveryCharge: deliveryCharge ?? 0,
      tax,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
      status: 'confirmed',
      estimatedDelivery,
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (err) {
    console.error('Order create error:', err);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const orderId = searchParams.get('orderId');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const query: Record<string, unknown> = {};
    if (email) query['address.email'] = email;
    if (orderId) query.orderId = orderId;
    if (status) query.status = status;

    const [orders, total] = await Promise.all([
      Order.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Order.countDocuments(query),
    ]);

    return NextResponse.json({ orders, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error('Order fetch error:', err);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
