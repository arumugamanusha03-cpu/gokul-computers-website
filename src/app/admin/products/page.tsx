'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Package, Filter, Eye } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const demoProducts = [
  { _id: '1', name: 'Lenovo IdeaPad Slim 5', brand: 'Lenovo', category: 'Student', price: 55990, inStock: true, isFeatured: true, views: 234 },
  { _id: '2', name: 'HP Pavilion Gaming 15', brand: 'HP', category: 'Gaming', price: 79990, inStock: true, isFeatured: true, views: 189 },
  { _id: '3', name: 'Dell XPS 15', brand: 'Dell', category: 'Business', price: 149990, inStock: true, isFeatured: true, views: 145 },
  { _id: '4', name: 'ASUS ROG Strix G16', brand: 'ASUS', category: 'Gaming', price: 109990, inStock: false, isFeatured: false, views: 98 },
  { _id: '5', name: 'Apple MacBook Air M2', brand: 'Apple', category: 'Business', price: 114900, inStock: true, isFeatured: true, views: 267 },
];

export default function AdminProducts() {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);

  const filtered = demoProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-[#F8FAFC]">Products</h1>
          <p className="text-gray-500 text-sm mt-1">{demoProducts.length} products total</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[#4F46E5] hover:bg-[#B91C1C] text-white font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-[#1E293B] p-4 mb-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E293B] bg-gray-50 dark:bg-[#1E293B] text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] dark:text-[#F8FAFC]"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-[#1E293B] text-gray-600 dark:text-[#CBD5E1] rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-[#1E293B] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 dark:border-[#1E293B]">
              <tr>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Brand</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Views</th>
                <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Package className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-[#F8FAFC] text-sm">{product.name}</div>
                        {product.isFeatured && <span className="text-xs text-[#4F46E5] font-medium">Featured</span>}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="badge badge-primary text-xs">{product.brand}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600 dark:text-[#94A3B8]">{product.category}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-gray-900 dark:text-[#F8FAFC] text-sm">{formatPrice(product.price)}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`badge text-xs ${product.inStock ? 'badge-success' : 'bg-red-100 text-red-600'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Eye className="w-3 h-3" />
                      {product.views}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
