'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Trash2, Plus, Minus, ArrowRight,
  ArrowLeft, Package, Tag, Shield,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

const DELIVERY_THRESHOLD = 50000; // free delivery above this
const DELIVERY_CHARGE    = 499;
const TAX_RATE           = 0.18;

export default function CartClient() {
  const { items, removeItem, updateQty, clearCart } = useCartStore();
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const subtotal        = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const deliveryCharge  = subtotal >= DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const tax             = Math.round(subtotal * TAX_RATE);
  const total           = subtotal + deliveryCharge + tax;

  const handleRemove = (id: string, name: string) => {
    removeItem(id);
    toast.success(`Removed "${name}" from cart`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md px-6"
        >
          <div className="w-24 h-24 bg-[#FEF2F2] rounded-3xl flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-12 h-12 text-[#4F46E5]" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#0F172A] mb-3 tracking-tight">Your cart is empty</h2>
          <p className="text-[#64748B] mb-8">Add products to your cart to continue shopping.</p>
          <Link href="/products" className="btn-primary inline-flex">
            <ArrowLeft className="w-4 h-4" />
            Browse Products
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[2rem] font-extrabold text-[#0F172A] tracking-tight">Shopping Cart</h1>
            <p className="text-[#64748B] mt-1">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
          </div>
          <button
            onClick={() => { clearCart(); toast.success('Cart cleared'); }}
            className="text-sm text-[#64748B] hover:text-[#4F46E5] transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            Clear all
          </button>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* ── Items list ── */}
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {items.map((item) => {
                const lineTotal = item.price * item.quantity;
                const hasImage = !imgErrors[item._id] && item.image;

                return (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -40, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.28 }}
                    className="bg-white rounded-2xl border border-[#F1F5F9] p-5 flex gap-5 shadow-sm"
                  >
                    {/* Image */}
                    <div className="w-28 h-28 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9] flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {hasImage ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={112}
                          height={112}
                          className="object-contain w-full h-full p-2"
                          onError={() => setImgErrors(p => ({ ...p, [item._id]: true }))}
                          unoptimized
                        />
                      ) : (
                        <Package className="w-10 h-10 text-[#CBD5E1]" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <span className="inline-block text-[0.7rem] font-bold text-[#4F46E5] bg-[#FEF2F2] px-2 py-0.5 rounded-md mb-1">
                            {item.brand}
                          </span>
                          <h3 className="font-bold text-[#0F172A] text-sm leading-snug line-clamp-2">
                            {item.name}
                          </h3>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[0.75rem] text-[#94A3B8] line-through">
                                {formatPrice(item.originalPrice)}
                              </span>
                              <span className="text-[0.7rem] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                                {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                              </span>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleRemove(item._id, item.name)}
                          className="flex-shrink-0 w-8 h-8 rounded-lg text-[#94A3B8] hover:text-[#4F46E5] hover:bg-[#FEF2F2] flex items-center justify-center transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Qty stepper */}
                        <div className="flex items-center gap-0 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl overflow-hidden">
                          <button
                            onClick={() => updateQty(item._id, item.quantity - 1)}
                            className="w-9 h-9 flex items-center justify-center text-[#64748B] hover:text-[#4F46E5] hover:bg-[#FEF2F2] transition-colors"
                            aria-label="Decrease"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-10 text-center text-sm font-bold text-[#0F172A]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item._id, item.quantity + 1)}
                            className="w-9 h-9 flex items-center justify-center text-[#64748B] hover:text-[#4F46E5] hover:bg-[#FEF2F2] transition-colors"
                            aria-label="Increase"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Line total */}
                        <div className="text-right">
                          <div className="font-extrabold text-[#0F172A] text-lg tracking-tight">
                            {formatPrice(lineTotal)}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-[0.7rem] text-[#94A3B8]">
                              {formatPrice(item.price)} each
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Continue shopping */}
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] hover:text-[#4F46E5] transition-colors mt-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

          {/* ── Order Summary ── */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-[#F1F5F9] p-6 shadow-sm sticky top-24">
              <h2 className="font-extrabold text-[#0F172A] text-lg mb-5 tracking-tight">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-[#475569]">
                  <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="font-semibold text-[#0F172A]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#475569]">
                  <span>Delivery</span>
                  {deliveryCharge === 0 ? (
                    <span className="font-semibold text-green-600">FREE</span>
                  ) : (
                    <span className="font-semibold text-[#0F172A]">{formatPrice(deliveryCharge)}</span>
                  )}
                </div>
                <div className="flex justify-between text-[#475569]">
                  <span>GST (18%)</span>
                  <span className="font-semibold text-[#0F172A]">{formatPrice(tax)}</span>
                </div>

                {deliveryCharge > 0 && (
                  <div className="flex items-center gap-2 bg-[#F0FDF4] border border-green-100 rounded-xl p-3 mt-2">
                    <Tag className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <p className="text-[0.75rem] text-green-700 font-medium">
                      Add {formatPrice(DELIVERY_THRESHOLD - subtotal)} more for FREE delivery
                    </p>
                  </div>
                )}

                <div className="border-t border-[#F1F5F9] pt-3 mt-1 flex justify-between">
                  <span className="font-extrabold text-[#0F172A]">Total</span>
                  <span className="font-extrabold text-[#4F46E5] text-xl">{formatPrice(total)}</span>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary w-full mt-6 justify-center">
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-3 mt-5 pt-5 border-t border-[#F1F5F9]">
                <div className="flex items-center gap-1.5 text-[0.7rem] text-[#94A3B8]">
                  <Shield className="w-3.5 h-3.5 text-green-500" />
                  Secure Checkout
                </div>
                <div className="w-px h-4 bg-[#E2E8F0]" />
                <div className="flex items-center gap-1.5 text-[0.7rem] text-[#94A3B8]">
                  <Package className="w-3.5 h-3.5 text-[#0A84FF]" />
                  Easy Returns
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
