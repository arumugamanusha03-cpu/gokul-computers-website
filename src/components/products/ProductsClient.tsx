'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, Grid3X3, List, Heart, Eye, MessageCircle,
  SlidersHorizontal, X, ShoppingCart, CreditCard, Zap,
} from 'lucide-react';
import { formatPrice, getWhatsAppUrl } from '@/lib/utils';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { getProductThumbnail, BRAND_IMAGES } from '@/lib/productImages';
import toast from 'react-hot-toast';

const brands    = ['Lenovo', 'HP', 'Dell', 'Acer', 'ASUS', 'Apple', 'MSI'];
const categories = ['Gaming', 'Student', 'Business', 'Desktop', 'Accessories', 'Parts'];
const rams       = ['4GB', '8GB', '16GB', '32GB', '64GB'];
const storages   = ['256GB', '512GB', '1TB', '2TB'];
const sortOptions = [
  { value: 'newest',     label: 'Newest First' },
  { value: 'price_asc',  label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'popular',    label: 'Most Popular' },
];

const demoProducts: Partial<Product>[] = [
  { _id: '1', name: 'Lenovo IdeaPad Slim 5', slug: 'lenovo-ideapad-slim-5', brand: 'Lenovo', category: 'Student', price: 55990, originalPrice: 65990, processor: 'Intel Core i5-12th Gen', ram: '16GB', storage: '512GB SSD', display: '15.6" FHD IPS', warranty: '1 Year', inStock: true, isNew: true, isFeatured: true },
  { _id: '2', name: 'HP Pavilion Gaming 15', slug: 'hp-pavilion-gaming-15', brand: 'HP', category: 'Gaming', price: 79990, originalPrice: 89990, processor: 'AMD Ryzen 5 7535HS', ram: '16GB', storage: '512GB SSD', display: '15.6" FHD 144Hz', graphics: 'RTX 4050', warranty: '1 Year', inStock: true, isNew: false, isFeatured: true },
  { _id: '3', name: 'Dell XPS 15 9530', slug: 'dell-xps-15-9530', brand: 'Dell', category: 'Business', price: 149990, originalPrice: 169990, processor: 'Intel Core i7-13th Gen', ram: '32GB', storage: '1TB NVMe SSD', display: '15.6" OLED 3.5K', graphics: 'RTX 4060', warranty: '2 Years', inStock: true, isNew: true, isFeatured: true },
  { _id: '4', name: 'ASUS ROG Strix G16', slug: 'asus-rog-strix-g16', brand: 'ASUS', category: 'Gaming', price: 109990, originalPrice: 129990, processor: 'Intel Core i9-13th Gen', ram: '32GB', storage: '1TB SSD', display: '16" QHD 240Hz', graphics: 'RTX 4070', warranty: '2 Years', inStock: true, isNew: false, isFeatured: true },
  { _id: '5', name: 'Acer Aspire 5', slug: 'acer-aspire-5', brand: 'Acer', category: 'Student', price: 42990, originalPrice: 49990, processor: 'AMD Ryzen 5', ram: '8GB', storage: '256GB SSD', display: '15.6" FHD', warranty: '1 Year', inStock: true, isNew: false, isFeatured: false },
  { _id: '6', name: 'Apple MacBook Air M2', slug: 'apple-macbook-air-m2', brand: 'Apple', category: 'Business', price: 114900, originalPrice: 124900, processor: 'Apple M2', ram: '8GB', storage: '256GB SSD', display: '13.6" Liquid Retina', warranty: '1 Year', inStock: true, isNew: false, isFeatured: true },
  { _id: '7', name: 'Lenovo ThinkPad X1 Carbon', slug: 'lenovo-thinkpad-x1-carbon', brand: 'Lenovo', category: 'Business', price: 149990, originalPrice: 179990, processor: 'Intel Core i7-12th Gen', ram: '16GB', storage: '512GB SSD', display: '14" IPS', warranty: '3 Years', inStock: true, isNew: true, isFeatured: true },
  { _id: '8', name: 'MSI Katana GF66', slug: 'msi-katana-gf66', brand: 'MSI', category: 'Gaming', price: 89990, originalPrice: 99990, processor: 'Intel Core i7-12th Gen', ram: '16GB', storage: '512GB SSD', display: '15.6" FHD 144Hz', graphics: 'RTX 3060', warranty: '1 Year', inStock: false, isNew: false, isFeatured: false },
];

const brandColors: Record<string, { bg: string; text: string }> = {
  Lenovo: { bg: 'bg-indigo-50 dark:bg-indigo-950/30',   text: 'text-[#4F46E5]' },
  HP:     { bg: 'bg-blue-50 dark:bg-blue-950/30',  text: 'text-blue-700 dark:text-blue-400' },
  Dell:   { bg: 'bg-indigo-50 dark:bg-indigo-950/30', text: 'text-indigo-700 dark:text-indigo-400' },
  ASUS:   { bg: 'bg-green-50 dark:bg-green-950/30', text: 'text-green-700 dark:text-green-400' },
  Acer:   { bg: 'bg-emerald-50 dark:bg-emerald-950/30', text: 'text-emerald-700 dark:text-emerald-400' },
  Apple:  { bg: 'bg-gray-100 dark:bg-[#1E293B]',   text: 'text-gray-700 dark:text-[#CBD5E1]' },
  MSI:    { bg: 'bg-yellow-50 dark:bg-yellow-950/30', text: 'text-yellow-700 dark:text-yellow-400' },
};

/* â”€â”€ Single product card image â”€â”€ */
function ProductCardImage({ product }: { product: Partial<Product> }) {
  const [error, setError] = useState(false);
  const src = getProductThumbnail(product.slug || '', product.brand || '');

  if (error) {
    const bc = brandColors[product.brand || ''] || { bg: 'bg-gray-100 dark:bg-[#1E293B]', text: 'text-gray-600 dark:text-[#94A3B8]' };
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center gap-2 ${bc.bg}`}>
        <div className="w-20 h-12 rounded-lg border border-current/20 flex items-center justify-center">
          <span className={`text-xs font-bold ${bc.text}`}>{product.brand}</span>
        </div>
        <span className="text-[10px] text-[#94A3B8]">{product.name}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={product.name || 'Laptop'}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      onError={() => setError(true)}
      unoptimized
    />
  );
}

/* â”€â”€ Quick View Modal â”€â”€ */
function QuickViewModal({ product, onClose }: { product: Partial<Product>; onClose: () => void }) {
  const { addItem } = useCartStore();
  const src = getProductThumbnail(product.slug || '', product.brand || '');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="bg-white dark:bg-[#111827] rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image */}
          <div className="relative h-64 sm:h-full min-h-[240px] bg-[#F8FAFC] dark:bg-[#0F172A]">
            <Image src={src} alt={product.name || ''} fill className="object-cover" unoptimized />
          </div>

          {/* Info */}
          <div className="p-6 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-bold text-[#4F46E5] bg-[#FEF2F2] px-2.5 py-1 rounded-full">
                {product.brand}
              </span>
              <button onClick={onClose} className="text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="font-extrabold text-[#0F172A] dark:text-[#F8FAFC] text-lg leading-tight mb-2">
              {product.name}
            </h3>

            <div className="text-xs text-[#64748B] dark:text-[#94A3B8] space-y-0.5 mb-4 flex-1">
              <div><span className="font-medium text-[#0F172A] dark:text-[#F8FAFC]">CPU:</span> {product.processor}</div>
              <div><span className="font-medium text-[#0F172A] dark:text-[#F8FAFC]">RAM:</span> {product.ram}</div>
              <div><span className="font-medium text-[#0F172A] dark:text-[#F8FAFC]">Storage:</span> {product.storage}</div>
              <div><span className="font-medium text-[#0F172A] dark:text-[#F8FAFC]">Display:</span> {product.display}</div>
              {product.graphics && <div><span className="font-medium text-[#0F172A] dark:text-[#F8FAFC]">GPU:</span> {product.graphics}</div>}
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC]">{formatPrice(product.price!)}</span>
              {product.originalPrice && <span className="text-sm text-[#94A3B8] line-through">{formatPrice(product.originalPrice)}</span>}
            </div>
            <p className="text-xs text-green-600 font-semibold mb-4">
              EMI from ₹{Math.round(product.price! / 12).toLocaleString('en-IN')}/month · 0% Interest
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  addItem({ _id: product._id!, name: product.name!, slug: product.slug!, brand: product.brand!, price: product.price!, originalPrice: product.originalPrice, image: src, inStock: product.inStock ?? true });
                  toast.success('Added to cart!');
                  onClose();
                }}
                className="flex items-center justify-center gap-2 py-3 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold rounded-xl transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
              <Link href={`/products/${product.slug}`} onClick={onClose} className="flex items-center justify-center py-2.5 border-2 border-[#4F46E5] text-[#4F46E5] font-semibold rounded-xl hover:bg-[#FEF2F2] transition-colors text-sm">
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode]     = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [quickView, setQuickView]   = useState<Partial<Product> | null>(null);
  const [products]                  = useState<Partial<Product>[]>(demoProducts);

  const { addItem, toggleWishlist, isWishlisted } = useCartStore();

  const [filters, setFilters] = useState({
    search:   searchParams.get('search') || '',
    brand:    searchParams.get('brand')  || '',
    category: searchParams.get('category') || '',
    ram: '', storage: '', sortBy: 'newest', minPrice: '', maxPrice: '',
  });

  const activeFilterCount = [filters.brand, filters.category, filters.ram, filters.storage].filter(Boolean).length;

  const updateFilter = (key: string, value: string) =>
    setFilters(prev => ({ ...prev, [key]: value }));

  const clearFilters = () =>
    setFilters({ search: '', brand: '', category: '', ram: '', storage: '', sortBy: 'newest', minPrice: '', maxPrice: '' });

  const filteredProducts = products.filter(p => {
    if (filters.search && !p.name?.toLowerCase().includes(filters.search.toLowerCase()) &&
        !p.brand?.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.brand && p.brand !== filters.brand) return false;
    if (filters.category && p.category?.toLowerCase() !== filters.category.toLowerCase()) return false;
    if (filters.ram && p.ram !== filters.ram) return false;
    if (filters.storage && !p.storage?.includes(filters.storage)) return false;
    if (filters.minPrice && p.price! < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && p.price! > parseInt(filters.maxPrice)) return false;
    return true;
  });

  const getDiscount = (price: number, original?: number) =>
    original ? Math.round(((original - price) / original) * 100) : null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] pt-8 pb-20">
      <div className="container-custom">
        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#4F46E5]/10 text-[#4F46E5] rounded-full text-xs font-bold mb-3">
            <Zap className="w-3.5 h-3.5" />
            All Products
          </div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight mb-1">
            Laptop Collection
          </h1>
          <p className="text-[#64748B] dark:text-[#94A3B8]">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Search & Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
            <input
              type="text"
              value={filters.search}
              onChange={e => updateFilter('search', e.target.value)}
              placeholder="Search laptops, brandsâ€¦"
              className="input-field pl-12"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all font-semibold text-sm ${
                showFilters || activeFilterCount > 0
                  ? 'bg-[#4F46E5] text-white border-[#4F46E5]'
                  : 'border-[#E2E8F0] dark:border-[#1E293B] text-[#0F172A] dark:text-[#F8FAFC] hover:border-[#4F46E5]'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-white text-[#4F46E5] rounded-full text-xs font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <select
              value={filters.sortBy}
              onChange={e => updateFilter('sortBy', e.target.value)}
              className="input-field w-auto text-sm"
            >
              {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <div className="flex rounded-xl border-2 border-[#E2E8F0] dark:border-[#1E293B] overflow-hidden">
              {(['grid', 'list'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`p-3 transition-colors ${viewMode === mode ? 'bg-[#4F46E5] text-white' : 'text-[#64748B] hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]'}`}
                >
                  {mode === 'grid' ? <Grid3X3 className="w-4 h-4" /> : <List className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white dark:bg-[#111827] border border-[#F1F5F9] dark:border-[#1E293B] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[#0F172A] dark:text-[#F8FAFC]">Filter Products</h3>
                  {activeFilterCount > 0 && (
                    <button onClick={clearFilters} className="text-sm text-[#4F46E5] flex items-center gap-1 font-semibold">
                      <X className="w-4 h-4" /> Clear All
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#64748B] dark:text-[#94A3B8] mb-2">Brand</label>
                    <select value={filters.brand} onChange={e => updateFilter('brand', e.target.value)} className="input-field text-sm">
                      <option value="">All Brands</option>
                      {brands.map(b => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#64748B] dark:text-[#94A3B8] mb-2">Category</label>
                    <select value={filters.category} onChange={e => updateFilter('category', e.target.value)} className="input-field text-sm">
                      <option value="">All Categories</option>
                      {categories.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#64748B] dark:text-[#94A3B8] mb-2">RAM</label>
                    <select value={filters.ram} onChange={e => updateFilter('ram', e.target.value)} className="input-field text-sm">
                      <option value="">Any RAM</option>
                      {rams.map(r => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#64748B] dark:text-[#94A3B8] mb-2">Storage</label>
                    <select value={filters.storage} onChange={e => updateFilter('storage', e.target.value)} className="input-field text-sm">
                      <option value="">Any Storage</option>
                      {storages.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#64748B] dark:text-[#94A3B8] mb-2">Min Price</label>
                    <input type="number" value={filters.minPrice} onChange={e => updateFilter('minPrice', e.target.value)} placeholder="₹ Min" className="input-field text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#64748B] dark:text-[#94A3B8] mb-2">Max Price</label>
                    <input type="number" value={filters.maxPrice} onChange={e => updateFilter('maxPrice', e.target.value)} placeholder="₹ Max" className="input-field text-sm" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filter Tags */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { key: 'brand', label: filters.brand },
              { key: 'category', label: filters.category },
              { key: 'ram', label: filters.ram ? `RAM: ${filters.ram}` : '' },
              { key: 'storage', label: filters.storage ? `Storage: ${filters.storage}` : '' },
            ].filter(f => f.label).map(f => (
              <span key={f.key} className="flex items-center gap-1 px-3 py-1 bg-[#4F46E5] text-white text-xs font-bold rounded-full">
                {f.label}
                <button onClick={() => updateFilter(f.key, '')}><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-[#F1F5F9] dark:bg-[#1E293B] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-[#94A3B8]" />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC] mb-2">No products found</h3>
            <p className="text-[#64748B] dark:text-[#94A3B8] mb-6">Try adjusting your filters or search query</p>
            <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {filteredProducts.map((product, i) => {
              const p        = product as Product;
              const discount = getDiscount(p.price, p.originalPrice);
              const emi      = `₹${Math.round(p.price / 12).toLocaleString('en-IN')}/mo`;
              const bc       = brandColors[p.brand] || { bg: 'bg-gray-100 dark:bg-[#1E293B]', text: 'text-gray-600 dark:text-[#94A3B8]' };

              return (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`group bg-white dark:bg-[#111827] border border-[#F1F5F9] dark:border-[#1E293B] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/8 flex ${viewMode === 'list' ? 'flex-row' : 'flex-col'}`}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden bg-[#F8FAFC] dark:bg-[#0F172A] flex-shrink-0 ${viewMode === 'list' ? 'w-48 h-auto' : 'h-48 w-full'}`}>
                    <ProductCardImage product={p} />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                      {p.isNew && <span className="px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded-md">New</span>}
                      {discount && <span className="px-2 py-0.5 bg-[#4F46E5] text-white text-[10px] font-bold rounded-md">{discount}% OFF</span>}
                      {!p.inStock && <span className="px-2 py-0.5 bg-[#94A3B8] text-white text-[10px] font-bold rounded-md">Out of Stock</span>}
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-3 group-hover:translate-x-0 z-10">
                      <button
                        onClick={() => { toggleWishlist(p._id); toast.success(isWishlisted(p._id) ? 'Removed from wishlist' : 'Added to wishlist'); }}
                        className={`w-8 h-8 rounded-lg shadow-lg flex items-center justify-center transition-colors ${isWishlisted(p._id) ? 'bg-[#4F46E5] text-white' : 'bg-white text-[#64748B] hover:bg-[#4F46E5] hover:text-white'}`}
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted(p._id) ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => setQuickView(p)}
                        className="w-8 h-8 rounded-lg bg-white text-[#64748B] hover:bg-[#0A84FF] hover:text-white shadow-lg flex items-center justify-center transition-colors"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex gap-2 mb-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${bc.bg} ${bc.text}`}>
                        {p.brand}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#F1F5F9] dark:bg-[#1E293B] text-[#64748B] dark:text-[#94A3B8]">
                        {p.category}
                      </span>
                    </div>

                    <Link href={`/products/${p.slug}`}>
                      <h3 className="font-bold text-[#0F172A] dark:text-[#F8FAFC] text-sm mb-2 hover:text-[#4F46E5] transition-colors line-clamp-2 leading-snug">
                        {p.name}
                      </h3>
                    </Link>

                    <div className="text-xs text-[#64748B] dark:text-[#94A3B8] space-y-0.5 mb-3 flex-1">
                      <div>{p.processor}</div>
                      <div>{p.ram} • {p.storage}</div>
                      <div>{p.display}</div>
                      {p.graphics && <div className="font-semibold text-[#0A84FF]">{p.graphics}</div>}
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-lg font-extrabold text-[#0F172A] dark:text-[#F8FAFC]">{formatPrice(p.price)}</span>
                      {p.originalPrice && <span className="text-xs text-[#94A3B8] line-through">{formatPrice(p.originalPrice)}</span>}
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      <CreditCard className="w-3 h-3 text-green-500" />
                      <span className="text-[10px] text-green-600 dark:text-green-400 font-semibold">EMI from {emi} · 0% Interest</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          if (!p.inStock) return;
                          const src = getProductThumbnail(p.slug, p.brand);
                          addItem({ _id: p._id, name: p.name, slug: p.slug, brand: p.brand, price: p.price, originalPrice: p.originalPrice, image: src, inStock: p.inStock });
                          toast.success('Added to cart!');
                        }}
                        disabled={!p.inStock}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] disabled:bg-[#94A3B8] text-white text-xs font-bold rounded-xl transition-colors"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        {p.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                      <a
                        href={getWhatsAppUrl(`Hello Gokul Computers,\nI'm interested in: ${p.name}\nPrice: ${formatPrice(p.price)}`)}
                        target="_blank" rel="noopener noreferrer"
                        className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-[#25D366] hover:bg-[#1DB954] text-white rounded-xl transition-colors"
                        title="WhatsApp Enquiry"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />}
      </AnimatePresence>
    </div>
  );
}
