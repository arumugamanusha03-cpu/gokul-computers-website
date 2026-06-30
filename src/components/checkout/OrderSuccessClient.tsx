'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CheckCircle, Package, MapPin, Clock, ArrowRight,
  Phone, MessageCircle, Truck,
} from 'lucide-react';
import { formatPrice, getWhatsAppUrl } from '@/lib/utils';
import type { Order } from '@/types';
import { format } from 'date-fns';

const STATUS_STEPS = [
  { key: 'confirmed',       label: 'Order Confirmed',    icon: CheckCircle },
  { key: 'processing',      label: 'Processing',         icon: Package     },
  { key: 'packed',          label: 'Packed',             icon: Package     },
  { key: 'shipped',         label: 'Shipped',            icon: Truck       },
  { key: 'out_for_delivery',label: 'Out for Delivery',   icon: Truck       },
  { key: 'delivered',       label: 'Delivered',          icon: CheckCircle },
];

export default function OrderSuccessClient() {
  const params  = useSearchParams();
  const orderId = params.get('orderId');
  const [order, setOrder]     = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) { setLoading(false); return; }
    fetch(`/api/orders/${orderId}`)
      .then(r => r.json())
      .then(d => setOrder(d.order ?? null))
      .finally(() => setLoading(false));
  }, [orderId]);

  const currentStep = order
    ? STATUS_STEPS.findIndex(s => s.key === order.status)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin w-10 h-10 text-[#4F46E5]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <p className="text-[#64748B]">Loading your order…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      <div className="container-custom max-w-3xl">

        {/* Success header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 20 }}
            className="w-20 h-20 bg-[#DCFCE7] rounded-full flex items-center justify-center mx-auto mb-5"
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>
          <h1 className="text-[2.2rem] font-extrabold text-[#0F172A] tracking-tight mb-2">
            Order Placed!
          </h1>
          <p className="text-[#64748B] text-lg">
            Thank you! We&apos;ve received your order and will process it shortly.
          </p>
          {order && (
            <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-white border border-[#F1F5F9] rounded-xl shadow-sm">
              <span className="text-[#94A3B8] text-sm">Order ID:</span>
              <span className="font-extrabold text-[#0F172A] tracking-wider">{order.orderId}</span>
            </div>
          )}
        </motion.div>

        {order ? (
          <div className="space-y-5">
            {/* Order tracker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-[#F1F5F9] p-7 shadow-sm"
            >
              <h2 className="font-extrabold text-[#0F172A] mb-6">Order Status</h2>
              <div className="flex items-start gap-0 overflow-x-auto pb-2 scrollbar-hidden">
                {STATUS_STEPS.map((s, i) => {
                  const done    = i <= currentStep;
                  const active  = i === currentStep;
                  const Icon    = s.icon;
                  return (
                    <div key={s.key} className="flex items-center flex-1 min-w-0 last:flex-none">
                      <div className="flex flex-col items-center gap-2 flex-shrink-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                          done   ? 'bg-[#4F46E5] border-[#4F46E5]' :
                          active ? 'bg-white border-[#4F46E5]' :
                                   'bg-white border-[#E2E8F0]'
                        }`}>
                          <Icon className={`w-4 h-4 ${done ? 'text-white' : 'text-[#94A3B8]'}`} />
                        </div>
                        <span className={`text-[0.65rem] font-semibold text-center w-16 leading-tight ${done ? 'text-[#4F46E5]' : 'text-[#94A3B8]'}`}>
                          {s.label}
                        </span>
                      </div>
                      {i < STATUS_STEPS.length - 1 && (
                        <div className={`flex-1 h-0.5 mt-[-18px] mx-1 ${i < currentStep ? 'bg-[#4F46E5]' : 'bg-[#E2E8F0]'}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Details grid */}
            <div className="grid md:grid-cols-2 gap-5">
              {/* Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl border border-[#F1F5F9] p-6 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-[#4F46E5]" />
                  <h3 className="font-bold text-[#0F172A]">Delivery Address</h3>
                </div>
                <div className="text-sm text-[#64748B] leading-relaxed">
                  <p className="font-semibold text-[#0F172A]">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p>{order.address.line1}</p>
                  {order.address.line2 && <p>{order.address.line2}</p>}
                  <p>{order.address.city}, {order.address.state} – {order.address.pincode}</p>
                  <p className="mt-1">📞 {order.address.phone}</p>
                </div>
              </motion.div>

              {/* Delivery info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                className="bg-white rounded-2xl border border-[#F1F5F9] p-6 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-[#4F46E5]" />
                  <h3 className="font-bold text-[#0F172A]">Order Details</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Payment</span>
                    <span className="font-semibold text-[#0F172A] capitalize">
                      {order.paymentMethod.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Total Paid</span>
                    <span className="font-extrabold text-[#4F46E5]">{formatPrice(order.total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Est. Delivery</span>
                    <span className="font-semibold text-[#0F172A]">
                      {format(new Date(order.estimatedDelivery), 'dd MMM yyyy')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Items</span>
                    <span className="font-semibold text-[#0F172A]">
                      {order.items.reduce((s, i) => s + i.quantity, 0)}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl border border-[#F1F5F9] p-6 shadow-sm"
            >
              <h3 className="font-bold text-[#0F172A] mb-4">Ordered Items</h3>
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-4 py-2 border-b border-[#F8FAFC] last:border-0">
                    <div>
                      <p className="font-semibold text-[#0F172A] text-sm">{item.name}</p>
                      <p className="text-[0.75rem] text-[#94A3B8]">{item.brand} · Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-[#0F172A]">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link href="/track-order" className="btn-outline flex-1 justify-center">
                <Package className="w-4 h-4" />
                Track Order
              </Link>
              <a
                href={getWhatsAppUrl(`Hi Gokul Computers, I placed an order (${order.orderId}) and need assistance.`)}
                target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-5 bg-[#25D366] hover:bg-[#1DB954] text-white font-semibold rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Support
              </a>
              <Link href="/products" className="btn-primary flex-1 justify-center">
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        ) : (
          /* No order found */
          <div className="text-center">
            <p className="text-[#64748B] mb-6">Could not find order details.</p>
            <Link href="/" className="btn-primary inline-flex">Go Home</Link>
          </div>
        )}
      </div>
    </div>
  );
}
