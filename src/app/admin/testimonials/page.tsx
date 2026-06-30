'use client';

import { useState } from 'react';
import { Star, Plus, Trash2, Eye, EyeOff } from 'lucide-react';

const demoTestimonials = [
  { _id: '1', name: 'Rajesh Kumar', location: 'Thillai Nagar', rating: 5, review: 'Best laptop shop in Trichy!', featured: true, createdAt: '2024-03-15' },
  { _id: '2', name: 'Priya Sharma', location: 'Anna Nagar', rating: 5, review: 'Excellent service and genuine products.', featured: true, createdAt: '2024-03-10' },
  { _id: '3', name: 'Arun Prakash', location: 'KK Nagar', rating: 4, review: 'Good selection, helpful staff.', featured: false, createdAt: '2024-02-28' },
];

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState(demoTestimonials);

  const toggleFeatured = (id: string) => {
    setTestimonials((prev) => prev.map((t) => t._id === id ? { ...t, featured: !t.featured } : t));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-[#F8FAFC]">Testimonials</h1>
          <p className="text-gray-500 text-sm mt-1">{testimonials.length} total, {testimonials.filter((t) => t.featured).length} featured</p>
        </div>
        <button className="flex items-center gap-2 bg-[#4F46E5] hover:bg-[#B91C1C] text-white font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Plus className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <div key={t._id} className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-[#1E293B] p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-bold text-gray-900 dark:text-[#F8FAFC]">{t.name}</div>
                <div className="text-xs text-gray-500">{t.location}</div>
              </div>
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-[#94A3B8] mb-4 italic">&quot;{t.review}&quot;</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{new Date(t.createdAt).toLocaleDateString('en-IN')}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleFeatured(t._id)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${t.featured ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {t.featured ? <><Eye className="w-3 h-3" /> Featured</> : <><EyeOff className="w-3 h-3" /> Hidden</>}
                </button>
                <button className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
