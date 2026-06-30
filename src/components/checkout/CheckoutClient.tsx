'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  CheckCircle, ChevronRight, Package,
  CreditCard, Truck, Shield, ArrowLeft, Phone,
  MapPin, User, Banknote, Smartphone,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

/* ── Zod schema ──────────────────────────────────────────────────── */
const schema = z.object({
  firstName : z.string().min(2, 'Required'),
  lastName  : z.string().min(1, 'Required'),
  phone     : z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  email     : z.string().email('Enter a valid email'),
  line1     : z.string().min(5, 'Required'),
  line2     : z.string().optional(),
  city      : z.string().min(2, 'Required'),
  state     : z.string().min(2, 'Required'),
  pincode   : z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit pincode'),
  payment   : z.enum(['cod','upi','razorpay','emi','bank_transfer']),
});
type FormData = z.infer<typeof schema>;

const DELIVERY_THRESHOLD = 50000;
const DELIVERY_CHARGE    = 499;
const TAX_RATE           = 0.18;

const STEPS = ['Information', 'Address', 'Payment & Review'];

const paymentOptions = [
  { value: 'cod',           label: 'Cash on Delivery',   icon: Banknote,    desc: 'Pay when your order arrives' },
  { value: 'razorpay',      label: 'Pay Online',         icon: CreditCard,  desc: 'Cards, UPI, NetBanking via Razorpay' },
  { value: 'upi',           label: 'UPI Transfer',       icon: Smartphone,  desc: 'GPAY, PhonePe, Paytm, etc.' },
  { value: 'bank_transfer', label: 'Bank Transfer',      icon: Truck,       desc: 'NEFT / RTGS / IMPS' },
  { value: 'emi',           label: 'EMI Enquiry',        icon: Phone,       desc: 'No-cost EMI — we\'ll call you' },
] as const;

declare global {
  interface Window {
    Razorpay: new (opts: Record<string, unknown>) => { open(): void };
  }
}

export default function CheckoutClient() {
  const router     = useRouter();
  const { items, subtotal: getSubtotal, clearCart } = useCartStore();
  const [step, setStep]       = useState(0);
  const [loading, setLoading] = useState(false);

  const subtotal       = getSubtotal();
  const deliveryCharge = subtotal >= DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const tax            = Math.round(subtotal * TAX_RATE);
  const total          = subtotal + deliveryCharge + tax;

  const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { payment: 'cod' },
  });

  const payment = watch('payment');

  const nextStep = async () => {
    const fields: (keyof FormData)[][] = [
      ['firstName','lastName','phone','email'],
      ['line1','city','state','pincode'],
    ];
    const valid = await trigger(fields[step]);
    if (valid) setStep(s => s + 1);
  };

  const loadRazorpay = () =>
    new Promise<boolean>((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const onSubmit = async (data: FormData) => {
    if (!items.length) { toast.error('Your cart is empty'); return; }
    setLoading(true);

    try {
      /* ── Build order payload ── */
      const orderPayload = {
        items: items.map(i => ({
          productId: i._id,
          name: i.name,
          brand: i.brand,
          image: i.image,
          price: i.price,
          quantity: i.quantity,
        })),
        address: {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
          line1: data.line1,
          line2: data.line2,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
        },
        subtotal,
        deliveryCharge,
        tax,
        total,
        paymentMethod: data.payment,
      };

      /* ── Razorpay flow ── */
      if (data.payment === 'razorpay') {
        const loaded = await loadRazorpay();
        if (!loaded) { toast.error('Payment gateway unavailable'); setLoading(false); return; }

        const rzRes = await fetch('/api/razorpay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: total, receipt: `rcp_${Date.now()}` }),
        });
        const rzData = await rzRes.json();

        if (!rzData.orderId) { toast.error('Payment init failed'); setLoading(false); return; }

        await new Promise<void>((resolve, reject) => {
          const rz = new window.Razorpay({
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
            amount: rzData.amount,
            currency: rzData.currency,
            order_id: rzData.orderId,
            name: 'Gokul Computers',
            description: 'Laptop Purchase',
            prefill: { name: `${data.firstName} ${data.lastName}`, email: data.email, contact: data.phone },
            theme: { color: '#4F46E5' },
            handler: async (response: Record<string, string>) => {
              // Verify signature
              const vRes = await fetch('/api/razorpay', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                }),
              });
              const vData = await vRes.json();
              if (!vData.verified) { reject(new Error('Payment verification failed')); return; }

              Object.assign(orderPayload, {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
              });
              resolve();
            },
            modal: { ondismiss: () => reject(new Error('Payment cancelled')) },
          });
          rz.open();
        });
      }

      /* ── Create order in DB ── */
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
      const result = await res.json();

      if (!res.ok) throw new Error(result.error || 'Order failed');

      clearCart();
      router.push(`/order-success?orderId=${result.order.orderId}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!items.length) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">No items to checkout</h2>
          <Link href="/products" className="btn-primary inline-flex">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      <div className="container-custom max-w-5xl">
        {/* Back */}
        <Link href="/cart" className="inline-flex items-center gap-1.5 text-sm text-[#64748B] hover:text-[#4F46E5] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>

        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-10">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    i < step ? 'bg-[#4F46E5] text-white' :
                    i === step ? 'bg-[#4F46E5] text-white ring-4 ring-[#4F46E5]/20' :
                    'bg-[#F1F5F9] text-[#94A3B8]'
                  }`}
                >
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-sm font-semibold hidden sm:block ${i === step ? 'text-[#0F172A]' : 'text-[#94A3B8]'}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-3 ${i < step ? 'bg-[#4F46E5]' : 'bg-[#E2E8F0]'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-8">
          {/* ── Form ── */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">

              {/* Step 0 — Customer Info */}
              {step === 0 && (
                <motion.div key="step0" initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-20 }}
                  className="bg-white rounded-2xl border border-[#F1F5F9] p-7 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#FEF2F2] rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 text-[#4F46E5]" />
                    </div>
                    <h2 className="font-extrabold text-[#0F172A] text-lg">Customer Information</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="First Name" error={errors.firstName?.message}>
                      <input {...register('firstName')} placeholder="Rajesh" className="input-field" />
                    </Field>
                    <Field label="Last Name" error={errors.lastName?.message}>
                      <input {...register('lastName')} placeholder="Kumar" className="input-field" />
                    </Field>
                    <Field label="Phone Number" error={errors.phone?.message} className="col-span-2 sm:col-span-1">
                      <input {...register('phone')} placeholder="9876543210" maxLength={10} className="input-field" />
                    </Field>
                    <Field label="Email Address" error={errors.email?.message} className="col-span-2 sm:col-span-1">
                      <input {...register('email')} placeholder="you@example.com" type="email" className="input-field" />
                    </Field>
                  </div>
                  <button type="button" onClick={nextStep} className="btn-primary mt-6">
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {/* Step 1 — Address */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-20 }}
                  className="bg-white rounded-2xl border border-[#F1F5F9] p-7 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#EFF6FF] rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#0A84FF]" />
                    </div>
                    <h2 className="font-extrabold text-[#0F172A] text-lg">Shipping Address</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Address Line 1" error={errors.line1?.message} className="col-span-2">
                      <input {...register('line1')} placeholder="House No, Street, Area" className="input-field" />
                    </Field>
                    <Field label="Address Line 2 (Optional)" className="col-span-2">
                      <input {...register('line2')} placeholder="Landmark, Colony (optional)" className="input-field" />
                    </Field>
                    <Field label="City" error={errors.city?.message}>
                      <input {...register('city')} placeholder="Trichy" className="input-field" />
                    </Field>
                    <Field label="State" error={errors.state?.message}>
                      <input {...register('state')} placeholder="Tamil Nadu" className="input-field" />
                    </Field>
                    <Field label="Pincode" error={errors.pincode?.message}>
                      <input {...register('pincode')} placeholder="620018" maxLength={6} className="input-field" />
                    </Field>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button type="button" onClick={() => setStep(0)} className="btn-outline">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button type="button" onClick={nextStep} className="btn-primary">
                      Continue <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2 — Payment + Review */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-20 }}
                  className="space-y-5">
                  {/* Payment methods */}
                  <div className="bg-white rounded-2xl border border-[#F1F5F9] p-7 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-[#F0FDF4] rounded-xl flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-green-600" />
                      </div>
                      <h2 className="font-extrabold text-[#0F172A] text-lg">Payment Method</h2>
                    </div>
                    <div className="space-y-3">
                      {paymentOptions.map(opt => {
                        const Icon = opt.icon;
                        return (
                          <label key={opt.value}
                            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              payment === opt.value
                                ? 'border-[#4F46E5] bg-[#FEF2F2]'
                                : 'border-[#F1F5F9] hover:border-[#E2E8F0]'
                            }`}
                          >
                            <input type="radio" value={opt.value} {...register('payment')} className="sr-only" />
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              payment === opt.value ? 'bg-[#4F46E5]' : 'bg-[#F8FAFC]'
                            }`}>
                              <Icon className={`w-5 h-5 ${payment === opt.value ? 'text-white' : 'text-[#64748B]'}`} />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-[#0F172A] text-sm">{opt.label}</div>
                              <div className="text-[0.75rem] text-[#94A3B8]">{opt.desc}</div>
                            </div>
                            {payment === opt.value && (
                              <CheckCircle className="w-5 h-5 text-[#4F46E5] flex-shrink-0" />
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className="btn-outline">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          Placing Order…
                        </span>
                      ) : (
                        <>Place Order — {formatPrice(total)}</>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* ── Order summary sidebar ── */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-[#F1F5F9] p-6 shadow-sm sticky top-24">
              <h3 className="font-extrabold text-[#0F172A] mb-4 tracking-tight">Your Order</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1 scrollbar-hidden">
                {items.map(item => (
                  <div key={item._id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[#F8FAFC] border border-[#F1F5F9] flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} width={48} height={48} className="object-contain p-1" unoptimized />
                      ) : (
                        <Package className="w-6 h-6 text-[#CBD5E1]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[0.8rem] font-semibold text-[#0F172A] line-clamp-1">{item.name}</div>
                      <div className="text-[0.7rem] text-[#94A3B8]">Qty: {item.quantity}</div>
                    </div>
                    <div className="text-[0.8rem] font-bold text-[#0F172A] flex-shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#F1F5F9] mt-4 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-[#64748B]">
                  <span>Subtotal</span><span className="font-medium text-[#0F172A]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>Delivery</span>
                  <span className={deliveryCharge === 0 ? 'font-medium text-green-600' : 'font-medium text-[#0F172A]'}>
                    {deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}
                  </span>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>GST (18%)</span><span className="font-medium text-[#0F172A]">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between font-extrabold text-[#0F172A] border-t border-[#F1F5F9] pt-2 mt-1">
                  <span>Total</span>
                  <span className="text-[#4F46E5] text-lg">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#F1F5F9]">
                <Shield className="w-4 h-4 text-green-500 flex-shrink-0" />
                <p className="text-[0.7rem] text-[#94A3B8]">100% secure checkout. Your data is encrypted.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label, error, className, children,
}: {
  label: string; error?: string; className?: string; children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ''}`}>
      <label className="text-[0.8125rem] font-semibold text-[#334155]">{label}</label>
      {children}
      {error && <p className="text-[0.75rem] text-[#4F46E5]">{error}</p>}
    </div>
  );
}
