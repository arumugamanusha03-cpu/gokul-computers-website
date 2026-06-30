'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Star, Shield } from 'lucide-react';

const brands = [
  {
    name: 'Lenovo',
    emoji: '🔴',
    description: 'Official Lenovo Authorized Dealer for Trichy. IdeaPad, ThinkPad, Legion, and Yoga series available.',
    highlights: ['Authorized Dealer', 'Widest range', 'Best warranty support', 'ThinkPad Business', 'Legion Gaming'],
    color: 'from-red-500 to-red-700',
    bg: 'bg-red-50 dark:bg-red-950/20',
    tag: 'Authorized Partner',
  },
  {
    name: 'HP',
    emoji: '🔵',
    description: 'Complete HP range from budget Laptops to gaming Pavilion series. HP Authorized Service Partner.',
    highlights: ['Pavilion series', 'Envy Premium', 'Spectre Ultrabook', 'Gaming range', 'ProBook Business'],
    color: 'from-blue-500 to-blue-700',
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    tag: 'All Models',
  },
  {
    name: 'Dell',
    emoji: '💙',
    description: 'Dell XPS, Inspiron, Vostro, and Alienware gaming laptops at best prices with genuine warranty.',
    highlights: ['XPS Premium', 'Inspiron Budget', 'Vostro Business', 'Alienware Gaming', 'G Series Gaming'],
    color: 'from-indigo-500 to-indigo-700',
    bg: 'bg-indigo-50 dark:bg-indigo-950/20',
    tag: 'Premium Laptops',
  },
  {
    name: 'Acer',
    emoji: '🟢',
    description: 'Affordable and reliable Acer laptops. Aspire, Swift, Nitro gaming and Predator series.',
    highlights: ['Aspire Budget', 'Swift Ultrabook', 'Nitro Gaming', 'Predator Gaming', 'ConceptD'],
    color: 'from-green-500 to-green-700',
    bg: 'bg-green-50 dark:bg-green-950/20',
    tag: 'Value for Money',
  },
  {
    name: 'ASUS',
    emoji: '⚡',
    description: 'ASUS laptops from budget VivoBook to premium ROG gaming and ZenBook ultrabooks.',
    highlights: ['ROG Gaming', 'TUF Gaming', 'ZenBook Ultra', 'VivoBook Budget', 'ProArt Studio'],
    color: 'from-blue-600 to-blue-800',
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    tag: 'Innovation',
  },
  {
    name: 'Apple',
    emoji: '🍎',
    description: 'Genuine Apple MacBook Air and MacBook Pro with M2 and M3 chips. Complete accessories too.',
    highlights: ['MacBook Air M2', 'MacBook Air M3', 'MacBook Pro M3', 'Mac Mini', 'Apple Accessories'],
    color: 'from-gray-600 to-gray-800',
    bg: 'bg-gray-50 dark:bg-[#1E293B]/40',
    tag: 'Premium Quality',
  },
  {
    name: 'MSI',
    emoji: '🔥',
    description: 'MSI gaming laptops for hardcore gamers. Katana, Raider, and Stealth series for all gaming needs.',
    highlights: ['Katana Gaming', 'Raider Extreme', 'Stealth Ultra-slim', 'Creator Series', 'Prestige Business'],
    color: 'from-yellow-500 to-orange-600',
    bg: 'bg-yellow-50 dark:bg-yellow-950/20',
    tag: 'Gaming Champion',
  },
];

export default function BrandsPage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <div className="pt-20 min-h-screen bg-[#F8FAFC] dark:bg-[#020617]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4F46E5]/20 text-red-300 rounded-full text-sm font-semibold mb-4">
              <Shield className="w-4 h-4" />
              Authorized Brands
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              All Major <span className="text-[#4F46E5]">Brands</span> Under One Roof
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Shop from 7+ top laptop brands with genuine products, manufacturer warranty, and expert guidance.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="container-custom py-16" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="glass-card group hover:scale-105"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-16 h-16 rounded-2xl ${brand.bg} flex items-center justify-center flex-shrink-0 text-4xl group-hover:scale-110 transition-transform`}>
                  {brand.emoji}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-[#F8FAFC]">{brand.name}</h2>
                    {brand.name === 'Lenovo' && (
                      <span className="badge badge-primary text-xs">Authorized</span>
                    )}
                  </div>
                  <span className={`text-xs font-semibold bg-gradient-to-r ${brand.color} bg-clip-text text-transparent`}>
                    {brand.tag}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-[#94A3B8] leading-relaxed mb-4">
                {brand.description}
              </p>

              <div className="space-y-1.5 mb-5">
                {brand.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2 text-xs text-gray-600 dark:text-[#94A3B8]">
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${brand.color}`} />
                    {h}
                  </div>
                ))}
              </div>

              <Link
                href={`/products?brand=${brand.name}`}
                className={`flex items-center gap-2 w-full justify-center py-2.5 rounded-xl text-white text-sm font-semibold bg-gradient-to-r ${brand.color} hover:opacity-90 transition-opacity`}
              >
                Shop {brand.name} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
