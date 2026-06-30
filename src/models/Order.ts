import mongoose, { Schema, Document } from 'mongoose';
import type { OrderStatus, PaymentMethod, PaymentStatus } from '@/types';

export interface IOrder extends Document {
  orderId: string;
  items: {
    productId: string;
    name: string;
    brand: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  address: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  subtotal: number;
  deliveryCharge: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  status: OrderStatus;
  estimatedDelivery: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, required: true, unique: true },
    items: [
      {
        productId: String,
        name: String,
        brand: String,
        image: String,
        price: Number,
        quantity: Number,
      },
    ],
    address: {
      firstName: String,
      lastName: String,
      phone: String,
      email: String,
      line1: String,
      line2: String,
      city: String,
      state: String,
      pincode: String,
    },
    subtotal: Number,
    deliveryCharge: { type: Number, default: 0 },
    tax: Number,
    total: Number,
    paymentMethod: {
      type: String,
      enum: ['cod', 'upi', 'razorpay', 'emi', 'bank_transfer'],
      default: 'cod',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    status: {
      type: String,
      enum: ['confirmed', 'processing', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'refunded'],
      default: 'confirmed',
    },
    estimatedDelivery: Date,
    notes: String,
  },
  { timestamps: true }
);

OrderSchema.index({ orderId: 1 });
OrderSchema.index({ 'address.email': 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
