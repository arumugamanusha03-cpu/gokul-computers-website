'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Package, CheckCircle, Truck, MapPin,
  Clock, MessageCircle, Phone,
} from 'lucide-react';
import { formatPrice, getWhatsAppUrl, PHONE } from '@/lib/utils';
import type { Order } from '@/types';
import { format } from 'date-fns';

const STATUS_STEPS = [
  { key: 'confirmed',        label: 'Order Confirmed',  desc: 'We have received your order',              icon: CheckCircle },
  { key: 'processing',       label: 'Processing',       desc: 'Your order is being prepared',             icon: Package },
  { key: 'packed',           label: 'Packed',           desc: 'Order has been packed & ready to ship',   icon: Package },
  { key: 'shipped',          label: 'Shipped',          desc: 'Your order is on the way',                icon: Truck },
  { key: 'out_for_delivery', label: 'Out for Delivery', desc: 'Arriving today — stay home!',             icon: Truck },
  { key: 'delivered',        label: 'Delivered',        desc: 'Package delivered successfully',          icon: CheckCircle },
];

export default function TrackOrderClient() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder]     = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = orderId.trim().toUpperCase();
    if (!id) return;
    setLoading(true);
    setError('');
    setOrder(null);
    try {
      const res  = await fetch(`/api/orders/${id}`);
      const data = await res.json();
      if (!res.ok || !data.order) {
        setError('Order not found. Please check your Order ID and try again.');
      } else {
        setOrder(data.order);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentStep = order
    ? Math.max(0, STATUS_STEPS.findIndex(s => s.key === order.status))
    : -1;

  const isTerminal = order?.status === 'cancelled' || order?.status === 'refunded';

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      <div className="container-custom max-w-2xl">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#FEF2F2] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-[#4F46E5]" />
          </div>
          <h1 className="text-[2rem] font-extrabold text-[#0F172A] tracking-tight mb-2">Track Your Order</h1>
          <p className="text-[#64748B]">Enter your Order ID to get real-time updates on your delivery.</p>
        </div>

        {/* Search form */}
        <form onSubmit={handleTrack} className="bg-white rounded-2xl border border-[#F1F5F9] p-6 shadow-sm mb-6">
          <label className="block text-sm font-semibold text-[#334155] mb-2">Order ID</label>
          <div className="flex gap-3">
            <input
              value={orderId}
              onChange={e => setOrderId(e.target.value)}
              placeholder="e.g. GKL1A2B3C4D"
              className="input-field flex-1"
              autoFocus
            />
            <button
              type="submit"
              disabled={loading || !orderId.trim()}
              className="btn-primary px-5 flex-shrink-0"
            >
              {loading ? (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
              ) : (
                <Search className="w-4 h-4" />
              )}
              {!loading && 'Track'}
            </button>
          </div>
          {error && (
            <p className="mt-3 text-sm text-[#4F46E5] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full flex-shrink-0" />
              {error}
            </p>
          )}
        </form>

        {/* Order result */}
        <AnimatePresence>
          {order && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-5"
            >
              {/* Order header card */}
              <div className="bg-white rounded-2xl border border-[#F1F5F9] p-6 shadow-sm">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-sm text-[#94A3B8] mb-0.5">Order ID</p>
                    <p className="font-extrabold text-[#0F172A] text-lg tracking-wider">{order.orderId}</p>
                    <p className="text-sm text-[#64748B] mt-1">
                      Placed on {format(new Date(order.createdAt), 'dd MMM yyyy, hh:mm a')}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${
                      isTerminal
                        ? 'bg-[#FEF2F2] text-[#4F46E5]'
                        : order.status === 'delivered'
                          ? 'bg-[#DCFCE7] text-green-700'
                          : 'bg-[#FEF9C3] text-yellow-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        isTerminal ? 'bg-[#4F46E5]' :
                        order.status === 'delivered' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      {order.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                    <p className="text-[#4F46E5] font-extrabold text-xl mt-1">{formatPrice(order.total)}</p>
                  </div>
                </div>
              </div>

              {/* Timeline — skip if cancelled/refunded */}
              {!isTerminal && (
                <div className="bg-white rounded-2xl border border-[#F1F5F9] p-7 shadow-sm">
                  <h3 className="font-bold text-[#0F172A] mb-6">Delivery Timeline</h3>
                  <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-[#F1F5F9]" />
                    <div
                      className="absolute left-5 top-5 w-0.5 bg-[#4F46E5] transition-all duration-700"
                      style={{ height: currentStep >= 0 ? `${(currentStep / (STATUS_STEPS.length - 1)) * 100}%` : 0 }}
                    />

                    <div className="space-y-6">
                      {STATUS_STEPS.map((step, i) => {
                        const done   = i <= currentStep;
                        const active = i === currentStep;
                        const Icon   = step.icon;
                        return (
                          <div key={step.key} className="flex items-start gap-5">
                            <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                              done   ? 'bg-[#4F46E5] border-[#4F46E5]' :
                              active ? 'bg-white border-[#4F46E5]' :
                                       'bg-white border-[#E2E8F0]'
                            }`}>
                              <Icon className={`w-4 h-4 ${done ? 'text-white' : 'text-[#CBD5E1]'}`} />
                            </div>
                            <div className={`flex-1 pb-1 ${done ? '' : 'opacity-40'}`}>
                              <p className={`font-semibold text-sm ${done ? 'text-[#0F172A]' : 'text-[#94A3B8]'}`}>
                                {step.label}
                              </p>
                              <p className="text-[0.75rem] text-[#94A3B8]">{step.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Est. delivery */}
                  <div className="flex items-center gap-2 mt-6 pt-5 border-t border-[#F1F5F9]">
                    <Clock className="w-4 h-4 text-[#4F46E5] flex-shrink-0" />
                    <span className="text-sm text-[#64748B]">
                      Estimated delivery:{' '}
                      <strong className="text-[#0F172A]">
                        {format(new Date(order.estimatedDelivery), 'EEEE, dd MMM yyyy')}
                      </strong>
                    </span>
                  </div>
                </div>
              )}

              {/* Delivery address */}
              <div className="bg-white rounded-2xl border border-[#F1F5F9] p-6 shadow-sm">
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
                </div>
              </div>

              {/* Items */}
              <div className="bg-white rounded-2xl border border-[#F1F5F9] p-6 shadow-sm">
                <h3 className="font-bold text-[#0F172A] mb-4">Ordered Items ({order.items.reduce((s, i) => s + i.quantity, 0)})</h3>
                <div className="space-y-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center gap-4 py-2 border-b border-[#F8FAFC] last:border-0">
                      <div>
                        <p className="font-semibold text-[#0F172A] text-sm">{item.name}</p>
                        <p className="text-[0.75rem] text-[#94A3B8]">{item.brand} · Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-[#0F172A] flex-shrink-0">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={getWhatsAppUrl(`Hi, I need help with my order: ${order.orderId}`)}
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-5 bg-[#25D366] hover:bg-[#1DB954] text-white font-semibold rounded-xl transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Support
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-5 bg-white border border-[#E2E8F0] hover:border-[#4F46E5] text-[#0F172A] font-semibold rounded-xl transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 text-[#4F46E5]" />
                  Call Us
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
