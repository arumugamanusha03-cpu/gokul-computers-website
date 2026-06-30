'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Share2, Phone, MessageCircle, ChevronRight, Star, Shield,
  Cpu, HardDrive, Monitor, CheckCircle, Package, ArrowLeft,
  ZoomIn, X, ChevronLeft, ShoppingCart,
} from 'lucide-react';
import { formatPrice, getWhatsAppUrl } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import EnquiryModal from '@/components/products/EnquiryModal';
import { getProductImages, getProductThumbnail } from '@/lib/productImages';
import toast from 'react-hot-toast';

const demoProduct = {
  _id: '1',
  name: 'Lenovo IdeaPad Slim 5',
  slug: 'lenovo-ideapad-slim-5',
  brand: 'Lenovo',
  category: 'Student Laptop',
  price: 55990,
  originalPrice: 65990,
  processor: 'Intel Core i5-1235U (12th Gen)',
  ram: '16GB DDR5',
  storage: '512GB NVMe SSD',
  display: '15.6" FHD IPS Anti-Glare',
  graphics: 'Intel Iris Xe Graphics',
  os: 'Windows 11 Home',
  warranty: '1 Year Onsite Warranty',
  inStock: true,
  isNew: true,
  description: 'The Lenovo IdeaPad Slim 5 is a versatile laptop designed for students and professionals. With the latest 12th Gen Intel processor and stunning display, it delivers exceptional performance for all your daily tasks.',
  features: [
    '12th Gen Intel Core i5 Processor',
    '16GB DDR5 RAM for smooth multitasking',
    '512GB NVMe SSD for fast boot and load times',
    '15.6" FHD IPS Display with 300 nits brightness',
    'Backlit keyboard for typing in low light',
    'Fast charging â€” 80% in 1 hour',
    'Wi-Fi 6 and Bluetooth 5.1',
    'Fingerprint reader for secure login',
  ],
  specifications: {
    'Processor': 'Intel Core i5-1235U, Up to 4.4GHz, 10 Cores',
    'RAM': '16GB DDR5 4800MHz',
    'Storage': '512GB M.2 NVMe SSD',
    'Display': '15.6" FHD (1920×1080) IPS, 300 nits',
    'Graphics': 'Intel Iris Xe Graphics',
    'OS': 'Windows 11 Home (64-bit)',
    'Battery': '56Wh, Up to 8 hours',
    'Weight': '1.62 kg',
    'Connectivity': 'Wi-Fi 6, Bluetooth 5.1',
    'Ports': '2× USB-A 3.2, 1× USB-C, HDMI, SD Card, 3.5mm Audio',
    'Color': 'Storm Grey / Sand',
    'Warranty': '1 Year Onsite Warranty',
  },
};

const emiOptions = [
  { months: 3,  interest: 0,  monthly: Math.round(55990 / 3) },
  { months: 6,  interest: 0,  monthly: Math.round(55990 / 6) },
  { months: 12, interest: 12, monthly: Math.round((55990 * 1.12) / 12) },
  { months: 24, interest: 15, monthly: Math.round((55990 * 1.15) / 24) },
];

interface ProductDetailProps { slug: string }

export default function ProductDetail({ slug }: ProductDetailProps) {
  const [activeImg, setActiveImg]     = useState(0);
  const [lightbox, setLightbox]       = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [activeTab, setActiveTab]     = useState<'specs' | 'features' | 'emi'>('specs');
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [zoomed, setZoomed]           = useState(false);
  const [zoomPos, setZoomPos]         = useState({ x: 50, y: 50 });

  const { addItem, toggleWishlist, isWishlisted } = useCartStore();

  const product  = demoProduct;
  const images   = getProductImages(product.slug, product.brand);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const wishlisted = isWishlisted(product._id);

  /* â”€â”€ Keyboard nav for lightbox â”€â”€ */
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowLeft')  setLightboxIdx(i => (i - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setLightboxIdx(i => (i + 1) % images.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, images.length]);

  const openLightbox = (i: number) => { setLightboxIdx(i); setLightbox(true); };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    addItem({
      _id: product._id,
      name: product.name,
      slug: product.slug,
      brand: product.brand,
      price: product.price,
      originalPrice: product.originalPrice,
      image: images[0],
      inStock: product.inStock,
    });
    toast.success('Added to cart!');
  };

  const handleWishlist = () => {
    toggleWishlist(product._id);
    toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] pt-8 pb-20">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#64748B] dark:text-[#94A3B8] mb-4">
          <Link href="/" className="hover:text-[#4F46E5]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/products" className="hover:text-[#4F46E5]">Products</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#0F172A] dark:text-[#F8FAFC] font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-[#64748B] dark:text-[#94A3B8] hover:text-[#4F46E5] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* â”€â”€ Left: Premium Image Gallery â”€â”€ */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#111827] border border-[#F1F5F9] dark:border-[#1E293B] shadow-sm cursor-zoom-in group"
              style={{ aspectRatio: '4/3' }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setZoomed(true)}
              onMouseLeave={() => setZoomed(false)}
              onClick={() => openLightbox(activeImg)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImg}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[activeImg]}
                    alt={product.name}
                    fill
                    className={`object-cover transition-transform duration-200 ${zoomed ? 'scale-150' : 'scale-100'}`}
                    style={zoomed ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
                    priority
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>

              {/* Zoom hint */}
              <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm text-white text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <ZoomIn className="w-3.5 h-3.5" />
                Click to enlarge
              </div>

              {/* Nav arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={e => { e.stopPropagation(); setActiveImg(i => (i - 1 + images.length) % images.length); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 dark:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#0F172A] dark:text-[#F8FAFC]" />
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); setActiveImg(i => (i + 1) % images.length); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 dark:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronRight className="w-5 h-5 text-[#0F172A] dark:text-[#F8FAFC]" />
                  </button>
                </>
              )}

              {/* Dot indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={e => { e.stopPropagation(); setActiveImg(i); }}
                      className={`rounded-full transition-all ${i === activeImg ? 'w-5 h-2 bg-[#4F46E5]' : 'w-2 h-2 bg-white/60'}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hidden">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    i === activeImg
                      ? 'border-[#4F46E5] shadow-md shadow-[#4F46E5]/20'
                      : 'border-[#F1F5F9] dark:border-[#1E293B] hover:border-[#4F46E5]/50'
                  }`}
                >
                  <Image src={img} alt={`${product.name} view ${i + 1}`} fill className="object-cover" unoptimized />
                </button>
              ))}
            </div>

            {/* Brand trust strip */}
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-[#111827] rounded-xl border border-[#F1F5F9] dark:border-[#1E293B]">
              <Shield className="w-5 h-5 text-green-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">Authorised Reseller</p>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Official warranty • Genuine product • GST invoice</p>
              </div>
            </div>
          </div>

          {/* â”€â”€ Right: Product Info â”€â”€ */}
          <div>
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#4F46E5] text-white">
                {product.brand}
              </span>
              {product.isNew && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  New Launch
                </span>
              )}
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                {discount}% OFF
              </span>
            </div>

            <h1 className="text-2xl md:text-[1.85rem] font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-tight mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-[#64748B] dark:text-[#94A3B8]">(124 reviews)</span>
              <span className="text-sm text-[#64748B] dark:text-[#94A3B8]">·</span>
              <span className="text-sm font-medium text-green-600">{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
            </div>

            <p className="text-[#475569] dark:text-[#CBD5E1] text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
                {formatPrice(product.price)}
              </span>
              <span className="text-xl text-[#94A3B8] line-through">{formatPrice(product.originalPrice)}</span>
            </div>
            <p className="text-sm text-green-600 font-semibold mb-6">
              You save {formatPrice(product.originalPrice - product.price)} ({discount}% off)
            </p>

            {/* Quick Specs grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: Cpu,       label: 'Processor', value: product.processor.split('(')[0].trim() },
                { icon: Monitor,   label: 'RAM',        value: product.ram },
                { icon: HardDrive, label: 'Storage',    value: product.storage },
                { icon: Monitor,   label: 'Display',    value: product.display },
              ].map((spec) => (
                <div key={spec.label} className="flex items-center gap-3 bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#F1F5F9] dark:border-[#1E293B] rounded-xl p-3">
                  <div className="w-8 h-8 bg-[#4F46E5]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <spec.icon className="w-4 h-4 text-[#4F46E5]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-[#64748B] dark:text-[#94A3B8]">{spec.label}</div>
                    <div className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC] truncate">{spec.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Warranty banner */}
            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-xl border border-green-200 dark:border-green-900 mb-6">
              <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm font-medium text-green-700 dark:text-green-400">{product.warranty}</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#4F46E5]/25 hover:shadow-[#4F46E5]/40 hover:-translate-y-0.5"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={() => setShowEnquiry(true)}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 border-2 border-[#4F46E5] text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white font-bold rounded-xl transition-all"
                >
                  Enquire Now
                </button>
              </div>
              <div className="flex gap-3">
                <a
                  href={getWhatsAppUrl(`Hello Gokul Computers,\nI'm interested in: ${product.name}\nPrice: ${formatPrice(product.price)}\nPlease share availability and more details.`)}
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#1DB954] text-white font-semibold rounded-xl transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <a
                  href="tel:07947130911"
                  className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-[#0A84FF] text-[#0A84FF] hover:bg-[#0A84FF] hover:text-white font-semibold rounded-xl transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleWishlist}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-semibold transition-all ${
                    wishlisted
                      ? 'bg-[#4F46E5] text-white border-[#4F46E5]'
                      : 'border-[#E2E8F0] dark:border-[#1E293B] text-[#64748B] dark:text-[#94A3B8] hover:border-[#4F46E5] hover:text-[#4F46E5]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                  {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                </button>
                <button
                  onClick={() => { navigator.clipboard?.writeText(window.location.href); toast.success('Link copied!'); }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#E2E8F0] dark:border-[#1E293B] text-[#64748B] dark:text-[#94A3B8] hover:border-[#0A84FF] hover:text-[#0A84FF] font-semibold transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>

            {/* Store info */}
            <div className="p-4 bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#F1F5F9] dark:border-[#1E293B] rounded-xl text-sm space-y-1.5">
              <div className="flex items-center gap-2 text-[#64748B] dark:text-[#94A3B8]">
                <Package className="w-4 h-4" />
                <span>Available at Gokul Computers, Thillai Nagar, Trichy</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="font-medium">In Stock â€” Ready for immediate pickup</span>
              </div>
            </div>
          </div>
        </div>

        {/* â”€â”€ Tabs â”€â”€ */}
        <div className="mt-12">
          <div className="flex gap-1 border-b border-[#E2E8F0] dark:border-[#1E293B] mb-6">
            {[
              { key: 'specs',    label: 'Specifications' },
              { key: 'features', label: 'Features' },
              { key: 'emi',      label: 'EMI Options' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as 'specs' | 'features' | 'emi')}
                className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all -mb-px ${
                  activeTab === tab.key
                    ? 'border-[#4F46E5] text-[#4F46E5]'
                    : 'border-transparent text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'specs' && (
                <div className="bg-white dark:bg-[#111827] rounded-2xl border border-[#F1F5F9] dark:border-[#1E293B] overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#F1F5F9] dark:divide-[#1E293B]">
                    {[0, 1].map(half => (
                      <div key={half} className={`divide-y divide-[#F1F5F9] dark:divide-[#1E293B] ${half === 1 ? 'md:pl-0' : ''}`}>
                        {Object.entries(product.specifications)
                          .filter((_, i) => (half === 0 ? i < 6 : i >= 6))
                          .map(([key, value]) => (
                            <div key={key} className="flex justify-between gap-4 px-5 py-3.5 hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A] transition-colors">
                              <span className="text-sm text-[#64748B] dark:text-[#94A3B8] font-medium whitespace-nowrap">{key}</span>
                              <span className="text-sm text-[#0F172A] dark:text-[#F8FAFC] font-semibold text-right">{value}</span>
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'features' && (
                <div className="bg-white dark:bg-[#111827] rounded-2xl border border-[#F1F5F9] dark:border-[#1E293B] p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#F1F5F9] dark:border-[#1E293B]">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[#475569] dark:text-[#CBD5E1]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'emi' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {emiOptions.map((emi) => (
                    <div key={emi.months} className="bg-white dark:bg-[#111827] border border-[#F1F5F9] dark:border-[#1E293B] rounded-2xl p-5 text-center hover:scale-105 hover:shadow-lg transition-all">
                      <div className="text-3xl font-extrabold text-[#4F46E5] mb-1">{emi.months}</div>
                      <div className="text-xs text-[#64748B] dark:text-[#94A3B8] mb-3">Months</div>
                      <div className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">{formatPrice(emi.monthly)}/mo</div>
                      <div className={`text-xs font-semibold mt-1 mb-4 ${emi.interest === 0 ? 'text-green-600' : 'text-[#64748B] dark:text-[#94A3B8]'}`}>
                        {emi.interest === 0 ? '0% Interest' : `${emi.interest}% Interest`}
                      </div>
                      <button
                        onClick={() => setShowEnquiry(true)}
                        className="w-full py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold rounded-lg transition-colors"
                      >
                        Apply for EMI
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* â”€â”€ Lightbox â”€â”€ */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
            onClick={() => setLightbox(false)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              onClick={() => setLightbox(false)}
            >
              <X className="w-5 h-5" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                  onClick={e => { e.stopPropagation(); setLightboxIdx(i => (i - 1 + images.length) % images.length); }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                  onClick={e => { e.stopPropagation(); setLightboxIdx(i => (i + 1) % images.length); }}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <motion.div
              key={lightboxIdx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl max-h-[80vh] w-full mx-16"
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIdx]}
                alt={product.name}
                width={1200}
                height={800}
                className="w-full h-full object-contain rounded-xl"
                unoptimized
              />
            </motion.div>

            {/* Lightbox thumbnails */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setLightboxIdx(i); }}
                  className={`relative w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${i === lightboxIdx ? 'border-white' : 'border-white/30 opacity-50'}`}
                >
                  <Image src={img} alt="" fill className="object-cover" unoptimized />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <EnquiryModal isOpen={showEnquiry} onClose={() => setShowEnquiry(false)} productName={product.name} />
    </div>
  );
}
