'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Image } from 'lucide-react';

const galleryItems = [
  { id: '1', category: 'showroom', emoji: '🏪', title: 'Main Showroom', desc: 'Our spacious showroom at Thillai Nagar' },
  { id: '2', category: 'showroom', emoji: '💻', title: 'Laptop Display', desc: 'All major brands on display' },
  { id: '3', category: 'showroom', emoji: '🏷️', title: 'Brand Corner', desc: 'Lenovo authorized display area' },
  { id: '4', category: 'products', emoji: '🔴', title: 'Lenovo Collection', desc: 'Latest Lenovo laptops' },
  { id: '5', category: 'products', emoji: '🔵', title: 'HP Range', desc: 'HP laptops and accessories' },
  { id: '6', category: 'products', emoji: '💙', title: 'Dell XPS', desc: 'Dell XPS premium lineup' },
  { id: '7', category: 'products', emoji: '🍎', title: 'Apple Corner', desc: 'MacBook collection' },
  { id: '8', category: 'products', emoji: '⚡', title: 'Gaming Laptops', desc: 'ROG, Katana & more' },
  { id: '9', category: 'customers', emoji: '😊', title: 'Happy Customer', desc: 'Customer with new laptop' },
  { id: '10', category: 'customers', emoji: '🎉', title: 'Bulk Order', desc: 'Corporate laptop delivery' },
  { id: '11', category: 'customers', emoji: '👨‍💼', title: 'Business Client', desc: 'Business laptop consultation' },
  { id: '12', category: 'services', emoji: '🔧', title: 'Repair Center', desc: 'Our expert repair workshop' },
  { id: '13', category: 'services', emoji: '💿', title: 'SSD Installation', desc: 'SSD upgrade in progress' },
  { id: '14', category: 'services', emoji: '🖥️', title: 'Desktop Assembly', desc: 'Custom PC build' },
  { id: '15', category: 'services', emoji: '🔬', title: 'Diagnostics', desc: 'Motherboard diagnostics' },
  { id: '16', category: 'showroom', emoji: '📦', title: 'Accessories', desc: 'Wide range of accessories' },
];

const categories = ['all', 'showroom', 'products', 'customers', 'services'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = galleryItems.filter((item) =>
    activeCategory === 'all' || item.category === activeCategory
  );

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevItem = () => lightboxIndex !== null && setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  const nextItem = () => lightboxIndex !== null && setLightboxIndex((lightboxIndex + 1) % filtered.length);

  return (
    <div className="pt-20 min-h-screen bg-[#F8FAFC] dark:bg-[#020617]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-semibold mb-4">
              <Image className="w-4 h-4" />
              Photo Gallery
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-[#4F46E5]">Showroom</span> & Services
            </h1>
            <p className="text-gray-300 text-lg">
              Take a visual tour of Gokul Computers — Trichy&apos;s favorite laptop destination
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Category Filter */}
        <div className="flex gap-3 mb-8 justify-center flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
                activeCategory === cat
                  ? 'bg-[#4F46E5] text-white shadow-md'
                  : 'bg-white dark:bg-[#1E293B] text-gray-600 dark:text-[#CBD5E1] border border-gray-200 dark:border-[#1E293B] hover:border-[#4F46E5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="break-inside-avoid cursor-pointer group"
              onClick={() => openLightbox(i)}
            >
              <div className={`relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 ${i % 3 === 0 ? 'h-52' : 'h-36'}`}>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-2">{item.emoji}</div>
                    <div className="text-xs font-medium text-gray-600 dark:text-[#94A3B8] px-2">{item.title}</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                  <span className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">View</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors" onClick={closeLightbox}>
              <X className="w-8 h-8" />
            </button>
            <button className="absolute left-4 text-white hover:text-gray-300 transition-colors" onClick={(e) => { e.stopPropagation(); prevItem(); }}>
              <ChevronLeft className="w-10 h-10" />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#111827] rounded-3xl p-8 max-w-lg w-full text-center"
            >
              <div className="text-9xl mb-4">{filtered[lightboxIndex].emoji}</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-[#F8FAFC] mb-2">{filtered[lightboxIndex].title}</h3>
              <p className="text-gray-500 capitalize">{filtered[lightboxIndex].category} • {filtered[lightboxIndex].desc}</p>
              <div className="mt-4 text-sm text-gray-400">{lightboxIndex + 1} / {filtered.length}</div>
            </motion.div>
            <button className="absolute right-4 text-white hover:text-gray-300 transition-colors" onClick={(e) => { e.stopPropagation(); nextItem(); }}>
              <ChevronRight className="w-10 h-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
