'use client';

import { useState } from 'react';
import { Upload, Trash2, Image, Plus } from 'lucide-react';

const demoGallery = [
  { _id: '1', title: 'Main Showroom', category: 'showroom', emoji: '🏪' },
  { _id: '2', title: 'Laptop Display', category: 'showroom', emoji: '💻' },
  { _id: '3', title: 'Lenovo Collection', category: 'products', emoji: '🔴' },
  { _id: '4', title: 'Happy Customer', category: 'customers', emoji: '😊' },
  { _id: '5', title: 'Repair Center', category: 'services', emoji: '🔧' },
  { _id: '6', title: 'Gaming Laptops', category: 'products', emoji: '🎮' },
];

export default function AdminGallery() {
  const [gallery, setGallery] = useState(demoGallery);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'showroom', 'products', 'customers', 'services'];

  const filtered = activeCategory === 'all' ? gallery : gallery.filter((g) => g.category === activeCategory);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-[#F8FAFC]">Gallery</h1>
          <p className="text-gray-500 text-sm mt-1">{gallery.length} images</p>
        </div>
        <button className="flex items-center gap-2 bg-[#4F46E5] hover:bg-[#B91C1C] text-white font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Upload className="w-4 h-4" />
          Upload Images
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
              activeCategory === cat ? 'bg-[#4F46E5] text-white' : 'bg-white dark:bg-[#111827] border border-gray-200 dark:border-[#1E293B] text-gray-600 dark:text-[#CBD5E1] hover:border-[#4F46E5]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {/* Upload Area */}
        <div className="col-span-2 md:col-span-1">
          <div className="aspect-square border-2 border-dashed border-gray-300 dark:border-[#1E293B] rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[#4F46E5] transition-colors">
            <Plus className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-xs text-gray-500 text-center">Add Image</span>
          </div>
        </div>

        {filtered.map((item) => (
          <div key={item._id} className="group relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl">{item.emoji}</div>
                <div className="text-xs text-gray-500 mt-1 px-1 truncate">{item.title}</div>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                <Trash2 className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="absolute bottom-2 left-2 right-2">
              <span className="badge bg-black/50 text-white text-xs capitalize">{item.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
