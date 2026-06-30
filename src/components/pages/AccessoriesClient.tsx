'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShoppingCart, MessageCircle, ArrowRight, Cpu, Zap, Star } from 'lucide-react';
import { formatPrice, getWhatsAppUrl } from '@/lib/utils';
import { ACCESSORY_IMAGES } from '@/lib/productImages';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';

const CATEGORIES = [
  { key: 'all',     label: 'All Products' },
  { key: 'memory',  label: 'RAM & Storage' },
  { key: 'input',   label: 'Keyboards & Mice' },
  { key: 'power',   label: 'Chargers & Batteries' },
  { key: 'carry',   label: 'Bags & Cooling' },
  { key: 'display', label: 'Monitors & Printers' },
];

const ACCESSORIES = [
  { id: 'a1',  name: 'Kingston 16GB DDR5 RAM',          brand: 'Kingston', category: 'memory',  price: 4999,  originalPrice: 6499,  image: ACCESSORY_IMAGES.ram,        desc: 'DDR5 4800MHz · Laptop SODIMM',      inStock: true  },
  { id: 'a2',  name: 'Samsung 512GB NVMe SSD',          brand: 'Samsung',  category: 'memory',  price: 4799,  originalPrice: 5999,  image: ACCESSORY_IMAGES.ssd,        desc: '970 EVO Plus · M.2 PCIe 3.0',      inStock: true  },
  { id: 'a3',  name: 'WD Blue 1TB HDD',                 brand: 'WD',       category: 'memory',  price: 3299,  originalPrice: 3999,  image: ACCESSORY_IMAGES.hdd,        desc: '5400 RPM · 2.5" SATA',             inStock: true  },
  { id: 'a4',  name: 'Corsair 32GB DDR5 RAM',           brand: 'Corsair',  category: 'memory',  price: 8999,  originalPrice: 11999, image: ACCESSORY_IMAGES.ram,        desc: 'DDR5 5200MHz · Vengeance',         inStock: true  },
  { id: 'a5',  name: 'HP Wireless Keyboard & Mouse',    brand: 'HP',       category: 'input',   price: 1299,  originalPrice: 1799,  image: ACCESSORY_IMAGES.keyboard,   desc: '2.4GHz Wireless · Silent Keys',    inStock: true  },
  { id: 'a6',  name: 'Logitech M235 Wireless Mouse',   brand: 'Logitech', category: 'input',   price: 999,   originalPrice: 1299,  image: ACCESSORY_IMAGES.mouse,      desc: '1000 DPI · 12-month battery',      inStock: true  },
  { id: 'a7',  name: 'Lenovo Original 65W Charger',    brand: 'Lenovo',   category: 'power',   price: 1899,  originalPrice: 2499,  image: ACCESSORY_IMAGES.charger,    desc: 'USB-C PD 65W · Original',          inStock: true  },
  { id: 'a8',  name: 'Dell 45W USB-C Adapter',         brand: 'Dell',     category: 'power',   price: 2299,  originalPrice: 2999,  image: ACCESSORY_IMAGES.charger,    desc: 'USB-C 45W · Universal',            inStock: true  },
  { id: 'a9',  name: 'HP Battery 11.4V 56Wh',          brand: 'HP',       category: 'power',   price: 2999,  originalPrice: 3999,  image: ACCESSORY_IMAGES.battery,    desc: 'Original · Pavilion Compatible',   inStock: false },
  { id: 'a10', name: 'Lenovo Laptop Backpack 15.6"',   brand: 'Lenovo',   category: 'carry',   price: 1499,  originalPrice: 1999,  image: ACCESSORY_IMAGES.bag,        desc: 'Water-resistant · USB Charging Port', inStock: true },
  { id: 'a11', name: 'Targus Laptop Cooling Pad',      brand: 'Targus',   category: 'carry',   price: 1799,  originalPrice: 2299,  image: ACCESSORY_IMAGES.coolpad,    desc: '4 Fans · RGB · Adjustable Height', inStock: true  },
  { id: 'a12', name: 'Dell 24" FHD IPS Monitor',       brand: 'Dell',     category: 'display', price: 12999, originalPrice: 15999, image: ACCESSORY_IMAGES.monitor,    desc: '1920x1080 · 75Hz · HDMI VGA',      inStock: true  },
  { id: 'a13', name: 'HP LaserJet Pro Printer',        brand: 'HP',       category: 'display', price: 8999,  originalPrice: 10999, image: ACCESSORY_IMAGES.printer,    desc: 'Black & White · Wi-Fi · Duplex',   inStock: true  },
  { id: 'a14', name: 'Sony WH-1000XM5 Headphones',    brand: 'Sony',     category: 'input',   price: 24990, originalPrice: 29990, image: ACCESSORY_IMAGES.headphones, desc: 'ANC · 30hr Battery · Hi-Res',      inStock: true  },
  { id: 'a15', name: 'Logitech C920 HD Webcam',        brand: 'Logitech', category: 'input',   price: 5999,  originalPrice: 7499,  image: ACCESSORY_IMAGES.webcam,     desc: '1080p · Dual Mic · Auto Focus',    inStock: true  },
  { id: 'a16', name: 'ADATA 256GB SSD',                brand: 'ADATA',    category: 'memory',  price: 1999,  originalPrice: 2699,  image: ACCESSORY_IMAGES.ssd,        desc: 'SATA III · 2.5" · 550MB/s',        inStock: true  },
];

function AccessoryImage({ src, name, brand }: { src: string; name: string; brand: string }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [tries, setTries] = useState(0);

  // Fallback chain of reliable product images per category keyword
  const fallbacks = [
    `https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=90&fit=crop&auto=format`,
    `https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=90&fit=crop&auto=format`,
  ];

  const handleError = () => {
    if (tries < fallbacks.length) {
      setImgSrc(fallbacks[tries]);
      setTries(t => t + 1);
    }
  };

  return (
    <div className="relative w-full h-full">
      <Image
        src={imgSrc}
        alt={name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        onError={handleError}
        unoptimized
      />
    </div>
  );
}

export default function AccessoriesClient() {
  const [active, setActive] = useState('all');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { addItem } = useCartStore();

  const filtered = active === 'all' ? ACCESSORIES : ACCESSORIES.filter(a => a.category === active);

  const handleAddToCart = (item: typeof ACCESSORIES[0]) => {
    addItem({
      _id: item.id,
      name: item.name,
      slug: item.id,
      brand: item.brand,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      inStock: item.inStock,
    });
    toast.success('Added to cart!');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] pt-20 md:pt-24 pb-12 md:pb-20">
      <div className="container-custom">

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#4F46E5]/10 text-[#4F46E5] rounded-full text-xs font-bold mb-4 uppercase tracking-wide">
            <Zap className="w-3.5 h-3.5" />
            Accessories & Spare Parts
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight mb-3">
            Everything Your Laptop Needs
          </h1>
          <p className="text-[#64748B] dark:text-[#94A3B8] text-lg max-w-xl mx-auto leading-relaxed">
            Genuine accessories, compatible spare parts, and premium upgrades — all at the best prices.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                active === cat.key
                  ? 'bg-[#4F46E5] text-white shadow-lg shadow-[#4F46E5]/25'
                  : 'bg-white dark:bg-[#111827] text-[#64748B] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#4F46E5] hover:text-[#4F46E5] dark:hover:border-[#4F46E5] dark:hover:text-[#A78BFA]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {filtered.map((item, i) => {
            const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
            const savings = item.originalPrice - item.price;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  background: 'linear-gradient(160deg,#ffffff 0%,#f8fafc 100%)',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 40px rgba(79,70,229,0.12), 0 2px 8px rgba(0,0,0,0.06)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(79,70,229,0.25)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'; (e.currentTarget as HTMLDivElement).style.borderColor = '#E2E8F0'; }}
              >
                {/* Image area — white bg, product contained */}
                <div className="relative h-48 bg-white flex items-center justify-center overflow-hidden">
                  <AccessoryImage src={item.image} name={item.name} brand={item.brand} />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    <span className="px-2 py-0.5 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white text-[10px] font-bold rounded-md shadow-sm">
                      {discount}% OFF
                    </span>
                    {!item.inStock && (
                      <span className="px-2 py-0.5 bg-[#64748B] text-white text-[10px] font-bold rounded-md">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 flex-1 flex flex-col bg-white">
                  {/* Brand tag */}
                  <span className="text-[10px] font-bold text-[#4F46E5] bg-[#EEF2FF] px-2.5 py-0.5 rounded-full self-start mb-2.5 uppercase tracking-wide">
                    {item.brand}
                  </span>

                  <h3 className="font-bold text-[#0F172A] text-sm leading-snug mb-1 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#64748B] mb-3 flex-1 leading-relaxed">{item.desc}</p>

                  {/* Price block */}
                  <div className="mb-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-extrabold text-[#0F172A]">{formatPrice(item.price)}</span>
                      <span className="text-xs text-[#94A3B8] line-through">{formatPrice(item.originalPrice)}</span>
                    </div>
                    <span className="text-xs font-semibold text-[#22C55E]">You save {formatPrice(savings)}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-[10px] text-[#94A3B8] ml-1">(4.8)</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => { if (item.inStock) handleAddToCart(item); }}
                      disabled={!item.inStock}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={item.inStock ? {
                        background: 'linear-gradient(135deg,#4F46E5,#7C3AED)',
                        color: '#fff',
                        boxShadow: '0 4px 12px rgba(79,70,229,0.3)',
                      } : { background: '#E2E8F0', color: '#94A3B8' }}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <a
                      href={getWhatsAppUrl(`Hello Gokul Computers,\nI'm interested in: ${item.name} (${formatPrice(item.price)})\nPlease confirm availability.`)}
                      target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-[#25D366] hover:bg-[#1DB954] text-white rounded-xl transition-colors shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 relative rounded-2xl overflow-hidden p-10 text-white text-center" style={{ background: 'linear-gradient(135deg,#4F46E5 0%,#7C3AED 100%)' }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="relative z-10">
            <Cpu className="w-10 h-10 mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl font-extrabold mb-2">Need a Specific Part?</h2>
            <p className="text-indigo-100 mb-6 max-w-md mx-auto text-sm leading-relaxed">
              We source original and compatible spare parts for all major laptop brands. Call or WhatsApp us for custom orders.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={getWhatsAppUrl("Hello Gokul Computers, I need a specific laptop spare part. Can you help?")}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#4F46E5] font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp for Custom Order
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-xl border border-white/30 transition-colors"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}