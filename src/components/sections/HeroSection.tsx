'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Cpu, Wrench, Package, Zap, CreditCard,
  ArrowRight, Phone, ChevronRight, ChevronLeft, CheckCircle,
} from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';

/* â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

const features = [
  { icon: Shield,      text: 'Lenovo Authorized Partner' },
  { icon: Package,     text: 'Multi Brand Laptop Sales'  },
  { icon: Cpu,         text: 'Genuine Accessories & Parts'},
  { icon: Wrench,      text: 'Expert Repair Services'    },
  { icon: Zap,         text: 'Upgrades & Customization'  },
  { icon: CreditCard,  text: 'EMI Available'             },
];

const slides = [
  {
    brand: 'Apple',
    model: 'MacBook Pro M3',
    tag: 'Creative Pro',
    price: '₹1,99,990',
    emi: '₹6,667/mo',
    specs: ['Apple M3 Pro chip', '18 GB Unified Memory', '512 GB SSD', '14" Liquid Retina XDR'],
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=720&q=85&fit=crop&auto=format',
    accent: '#6E6E73',
    glow: 'rgba(110,110,115,0.22)',
    bg: 'linear-gradient(150deg,#1C1C1E 0%,#2C2C2E 100%)',
  },
  {
    brand: 'ASUS ROG',
    model: 'Strix G16',
    tag: 'Gaming Legend',
    price: '₹1,09,990',
    emi: '₹3,667/mo',
    specs: ['Intel Core i9-13th Gen', '32 GB DDR5', '1 TB SSD', '16" QHD 240 Hz'],
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=720&q=85&fit=crop&auto=format',
    accent: '#76FF03',
    glow: 'rgba(118,255,3,0.20)',
    bg: 'linear-gradient(150deg,#050F05 0%,#0E230E 100%)',
  },
  {
    brand: 'Lenovo',
    model: 'ThinkPad X1 Carbon',
    tag: 'Business Elite',
    price: '₹1,49,990',
    emi: '₹4,999/mo',
    specs: ['Intel Core i7-13th Gen', '16 GB LPDDR5', '512 GB SSD', '14" IPS Anti-Glare'],
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=720&q=85&fit=crop&auto=format',
    accent: '#4F46E5',
    glow: 'rgba(79,70,229,0.22)',
    bg: 'linear-gradient(150deg,#0D0B2A 0%,#1A1456 100%)',
  },
  {
    brand: 'Dell',
    model: 'XPS 15 9530',
    tag: 'Premium Power',
    price: '₹1,29,990',
    emi: '₹4,333/mo',
    specs: ['Intel Core i7-13th Gen', '32 GB DDR5', '1 TB NVMe SSD', '15.6" OLED 3.5K'],
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=720&q=85&fit=crop&auto=format',
    accent: '#0A84FF',
    glow: 'rgba(10,132,255,0.22)',
    bg: 'linear-gradient(150deg,#000814 0%,#001A33 100%)',
  },
  {
    brand: 'HP',
    model: 'Pavilion Gaming 15',
    tag: 'Gaming Beast',
    price: '₹79,990',
    emi: '₹2,666/mo',
    specs: ['AMD Ryzen 5 7535HS', '16 GB DDR5', '512 GB SSD', '15.6" FHD 144 Hz'],
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=720&q=85&fit=crop&auto=format',
    accent: '#0096D6',
    glow: 'rgba(0,150,214,0.22)',
    bg: 'linear-gradient(150deg,#000A1A 0%,#001433 100%)',
  },
];

const stats = [
  { value: '5000+', label: 'Happy Customers' },
  { value: '10K+',  label: 'Products Sold'   },
  { value: '4.9★',  label: 'Google Rating'   },
];

/* â”€â”€ Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export default function HeroSection() {
  const [active, setActive]       = useState(0);
  const [imgErr, setImgErr]       = useState<Record<number, boolean>>({});
  const [paused, setPaused]       = useState(false);

  const next = useCallback(() => setActive(p => (p + 1) % slides.length), []);
  const prev = useCallback(() => setActive(p => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [paused, next]);

  const slide = slides[active];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: 68,
        background: "linear-gradient(135deg,#ffffff 0%,#f8fafc 50%,#eef2ff 100%)",
      }}
    >

      {/* Dark mode gradient overlay */}
      <div className="absolute inset-0 pointer-events-none hidden dark:block" style={{ background: "linear-gradient(135deg,#020617 0%,#0f172a 50%,#111827 100%)" }} />
      {/* soft colour blobs */}
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-[#4F46E5]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-96 h-96 rounded-full bg-[#7C3AED]/5 blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20 items-center min-h-[calc(100dvh-64px)] py-10 lg:py-16">

          {/* â”€â”€ LEFT â”€â”€ */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 flex flex-col text-center lg:text-left items-center lg:items-start"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 self-center lg:self-start px-3.5 py-1.5 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] mb-5">
              <span className="w-2 h-2 rounded-full bg-[#4F46E5] animate-pulse" />
              <span className="text-[0.8rem] font-semibold text-[#4F46E5] tracking-wide">
                31+ Years of Trusted Service
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-extrabold text-[#0F172A] dark:text-[#F8FAFC] leading-[1.1] tracking-[-0.03em] mb-5" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
              Trichy&apos;s{' '}
              <span className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">Trusted</span>
              <br />
              <span className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">Laptop</span> Destination
            </h1>

            {/* Subtext */}
            <p className="text-[1.05rem] text-[#64748B] dark:text-[#94A3B8] leading-relaxed mb-8 max-w-lg">
              Your one-stop solution for all laptop needs.{' '}
              <strong className="text-[#0F172A] dark:text-[#F8FAFC] font-semibold">Lenovo Authorized Dealer</strong>{' '}
              serving Trichy since 1993.
            </p>

            {/* Feature checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-8 w-full">
              {features.map((f) => (
                <div key={f.text} className="flex items-center gap-2.5 text-left">
                  <CheckCircle className="w-4 h-4 text-[#4F46E5] flex-shrink-0" />
                  <span className="text-[0.875rem] font-medium text-[#334155] dark:text-[#CBD5E1]">{f.text}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8 w-full sm:w-auto">
              <Link href="/products" className="btn-primary w-full sm:w-auto justify-center">
                Explore Products
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={getWhatsAppUrl('Hello Gokul Computers,\nI would like a free consultation for laptop purchase.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[0.875rem] font-semibold text-[0.9375rem] border transition-all duration-200 hover:-translate-y-px w-full sm:w-auto"
                style={{
                  background: 'rgba(79,70,229,0.06)',
                  borderColor: 'rgba(79,70,229,0.3)',
                  color: '#4F46E5',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'rgba(79,70,229,0.12)';
                  el.style.borderColor = '#4F46E5';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'rgba(79,70,229,0.06)';
                  el.style.borderColor = 'rgba(79,70,229,0.3)';
                }}
              >
                <Phone className="w-4 h-4" />
                Free Consultation
              </a>
            </div>

            {/* Stats row */}
            <div className="flex items-stretch gap-0 border border-[#E2E8F0] dark:border-[#1E293B] rounded-2xl overflow-hidden bg-white/60 dark:bg-[#111827]/60 backdrop-blur-sm">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col items-center justify-center px-6 py-4 min-w-[90px] ${i < stats.length - 1 ? 'border-r border-[#E2E8F0] dark:border-[#1E293B]' : ''}`}
                >
                  <div className="text-[1.4rem] font-extrabold text-[#4F46E5] leading-none whitespace-nowrap">{s.value}</div>
                  <div className="text-[0.7rem] text-[#64748B] dark:text-[#94A3B8] mt-1 whitespace-nowrap text-center leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* â”€â”€ RIGHT â€” Product Carousel â”€â”€ */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 w-full"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Card */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.97, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: -16 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="relative rounded-[28px] overflow-hidden select-none"
                  style={{
                    background: slide.bg,
                    boxShadow: `0 40px 80px ${slide.glow}, 0 0 0 1px rgba(255,255,255,0.06)`,
                  }}
                >
                  {/* glow orbs inside card */}
                  <div
                    className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-25 pointer-events-none"
                    style={{ background: slide.accent }}
                  />
                  <div
                    className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full blur-3xl opacity-15 pointer-events-none"
                    style={{ background: slide.accent }}
                  />

                  <div className="relative z-10 p-7 pb-6">
                    {/* Top meta row */}
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        {/* tag */}
                        <div
                          className="inline-block px-3 py-1 rounded-full text-[0.7rem] font-bold tracking-wide mb-2"
                          style={{
                            background: `${slide.accent}20`,
                            color: slide.accent,
                            border: `1px solid ${slide.accent}30`,
                          }}
                        >
                          {slide.tag}
                        </div>
                        <div className="text-white font-extrabold text-[1.6rem] leading-tight tracking-tight">
                          {slide.brand}
                        </div>
                        <div className="text-white/55 text-sm font-medium mt-0.5">{slide.model}</div>
                      </div>

                      {/* EMI badge */}
                      <div
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[0.75rem] font-bold"
                        style={{
                          background: 'rgba(0,200,100,0.12)',
                          color: '#00C864',
                          border: '1px solid rgba(0,200,100,0.25)',
                        }}
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        EMI {slide.emi}
                      </div>
                    </div>

                    {/* Product image â€” floating */}
                    <div className="relative flex justify-center items-end" style={{ minHeight: 230 }}>
                      {/* shadow ellipse under laptop */}
                      <div
                        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-6 rounded-full blur-2xl"
                        style={{ background: slide.glow, opacity: 0.7 }}
                      />
                      <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        className="relative w-full max-w-[300px]"
                      >
                        {imgErr[active] ? (
                          /* Graceful fallback */
                          <div
                            className="w-full h-44 rounded-2xl flex items-center justify-center border"
                            style={{
                              background: 'rgba(255,255,255,0.05)',
                              borderColor: `${slide.accent}30`,
                            }}
                          >
                            <div className="text-center px-6">
                              <div className="text-white/30 text-xs font-mono mb-1">{slide.brand}</div>
                              <div className="text-white/60 font-bold">{slide.model}</div>
                            </div>
                          </div>
                        ) : (
                          <Image
                            src={slide.image}
                            alt={`${slide.brand} ${slide.model}`}
                            width={600}
                            height={380}
                            className="object-contain w-full"
                            style={{ filter: `drop-shadow(0 24px 40px ${slide.glow})` }}
                            priority={active === 0}
                            onError={() => setImgErr(p => ({ ...p, [active]: true }))}
                            unoptimized
                          />
                        )}
                      </motion.div>
                    </div>

                    {/* Spec pills */}
                    <div className="flex flex-wrap gap-1.5 mt-5 mb-5">
                      {slide.specs.map(s => (
                        <span
                          key={s}
                          className="px-2.5 py-1 rounded-lg text-[0.68rem] font-semibold"
                          style={{
                            background: 'rgba(255,255,255,0.07)',
                            color: 'rgba(255,255,255,0.65)',
                            border: '1px solid rgba(255,255,255,0.10)',
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Price + CTA */}
                    <div
                      className="flex items-center justify-between pt-5 border-t"
                      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                    >
                      <div>
                        <div className="text-white/40 text-[0.7rem] uppercase tracking-wider mb-0.5">
                          Starting from
                        </div>
                        <div className="text-white font-extrabold text-[1.75rem] leading-none tracking-tight">
                          {slide.price}
                        </div>
                      </div>
                      <Link
                        href="/products"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[0.85rem] font-bold transition-all hover:scale-105 active:scale-95"
                        style={{
                          background: slide.accent,
                          color: slide.accent === '#76FF03' ? '#000' : '#fff',
                          boxShadow: `0 8px 24px ${slide.glow}`,
                        }}
                      >
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next */}
              <button
                onClick={prev}
                aria-label="Previous"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-sm flex items-center justify-center text-white transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-sm flex items-center justify-center text-white transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-5">
              {slides.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Slide ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? 24 : 8,
                    height: 8,
                    background: i === active ? slide.accent : '#CBD5E1',
                  }}
                />
              ))}
            </div>

            {/* Brand strip */}
            <div className="mt-7 pt-7 border-t border-[#E2E8F0] dark:border-[#1E293B]">
              <p className="text-center text-[0.7rem] font-semibold text-[#94A3B8] uppercase tracking-widest mb-4">
                All Major Brands Available
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Lenovo','HP','Dell','Acer','ASUS','Apple','MSI'].map(b => (
                  <span
                    key={b}
                    className="px-4 py-1.5 rounded-lg bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] text-[0.78rem] font-semibold text-[#475569] dark:text-[#94A3B8] shadow-sm"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
