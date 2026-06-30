'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Heart, Eye, MessageCircle, ArrowRight, Zap, CreditCard, ShoppingCart,
} from 'lucide-react';
import { formatPrice, getWhatsAppUrl } from '@/lib/utils';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';

interface FeaturedProductsProps {
  products?: Product[];
}

const demoProducts: (Partial<Product> & {
  imageUrl: string;
  glowColor: string;
  accentColor: string;
})[] = [
  {
    _id: '1',
    name: 'Lenovo IdeaPad Slim 5',
    slug: 'lenovo-ideapad-slim-5',
    brand: 'Lenovo',
    category: 'Student',
    price: 55990,
    originalPrice: 65990,
    processor: 'Intel Core i5-12th Gen',
    ram: '16GB DDR5',
    storage: '512GB SSD',
    display: '15.6" FHD IPS',
    warranty: '1 Year',
    inStock: true,
    isNew: true,
    isFeatured: true,
    images: [],
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=90&fit=crop&auto=format',
    glowColor: 'rgba(79,70,229,0.25)',
    accentColor: '#4F46E5',
  },
  {
    _id: '2',
    name: 'HP Pavilion Gaming 15',
    slug: 'hp-pavilion-gaming-15',
    brand: 'HP',
    category: 'Gaming',
    price: 79990,
    originalPrice: 89990,
    processor: 'AMD Ryzen 5 7535HS',
    ram: '16GB DDR5',
    storage: '512GB SSD',
    display: '15.6" FHD 144Hz',
    graphics: 'NVIDIA RTX 4050',
    warranty: '1 Year',
    inStock: true,
    isNew: false,
    isFeatured: true,
    images: [],
    imageUrl: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&q=90&fit=crop&auto=format',
    glowColor: 'rgba(0,150,214,0.25)',
    accentColor: '#0096D6',
  },
  {
    _id: '3',
    name: 'Dell XPS 15 9530',
    slug: 'dell-xps-15-9530',
    brand: 'Dell',
    category: 'Business',
    price: 149990,
    originalPrice: 169990,
    processor: 'Intel Core i7-13th Gen',
    ram: '32GB DDR5',
    storage: '1TB NVMe SSD',
    display: '15.6" OLED 3.5K',
    graphics: 'NVIDIA RTX 4060',
    warranty: '2 Years',
    inStock: true,
    isNew: true,
    isFeatured: true,
    images: [],
    imageUrl: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=90&fit=crop&auto=format',
    glowColor: 'rgba(10,132,255,0.25)',
    accentColor: '#0A84FF',
  },
  {
    _id: '4',
    name: 'ASUS ROG Strix G16',
    slug: 'asus-rog-strix-g16',
    brand: 'ASUS',
    category: 'Gaming',
    price: 109990,
    originalPrice: 129990,
    processor: 'Intel Core i9-13th Gen',
    ram: '32GB DDR5',
    storage: '1TB SSD',
    display: '16" QHD 240Hz',
    graphics: 'NVIDIA RTX 4070',
    warranty: '2 Years',
    inStock: true,
    isNew: false,
    isFeatured: true,
    images: [],
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=90&fit=crop&auto=format',
    glowColor: 'rgba(118,255,3,0.2)',
    accentColor: '#76FF03',
  },
];

const brandColors: Record<string, string> = {
  Lenovo: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
  HP: 'bg-blue-50 text-blue-700 border border-blue-100',
  Dell: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
  ASUS: 'bg-green-50 text-green-700 border border-green-100',
  Acer: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  Apple: 'bg-gray-100 text-gray-700 border border-gray-200',
  MSI: 'bg-yellow-50 text-yellow-700 border border-yellow-100',
};

type DemoProduct = typeof demoProducts[0];

function ProductImage({ product, index }: { product: DemoProduct; index: number }) {
  const [hasError, setHasError] = useState(false);

  if (!hasError && product.imageUrl) {
    return (
      <Image
        src={product.imageUrl}
        alt={product.name || product.brand || 'Laptop'}
        width={400}
        height={260}
        className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
        style={{
          filter: `drop-shadow(0 12px 28px ${product.glowColor})`,
        }}
        onError={() => setHasError(true)}
        unoptimized
        priority={index < 2}
      />
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4">
      <div
        className="w-32 h-20 rounded-xl border flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.6)', borderColor: product.accentColor + '33' }}
      >
        <div className="text-center">
          <div className="text-xs font-bold" style={{ color: product.accentColor }}>{product.brand}</div>
          <div className="text-[10px] text-gray-500 mt-0.5">{product.name}</div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { addItem, toggleWishlist: toggleWL, isWishlisted } = useCartStore();

  const rawProducts = products && products.length > 0 ? products : demoProducts;

  const displayProducts = rawProducts.map((p, i) => ({
    ...p,
    imageUrl: (p as DemoProduct).imageUrl || '',
    glowColor: (p as DemoProduct).glowColor || 'rgba(0,0,0,0.1)',
    accentColor: (p as DemoProduct).accentColor || '#4F46E5',
    _index: i,
  }));

  const handleAddToCart = (product: typeof displayProducts[0]) => {
    addItem({
      _id: product._id as string,
      name: product.name as string,
      slug: product.slug as string,
      brand: product.brand as string,
      price: product.price as number,
      originalPrice: product.originalPrice,
      image: product.imageUrl,
      inStock: product.inStock ?? true,
    });
    toast.success(`Added to cart!`);
  };

  const toggleWishlist = (id: string) => {
    toggleWL(id);
    toast.success(isWishlisted(id) ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const getDiscount = (price: number, original?: number) => {
    if (!original) return null;
    return Math.round(((original - price) / original) * 100);
  };

  const getEmi = (price: number) => `₹${Math.round(price / 30).toLocaleString('en-IN')}/mo`;

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[#F8FAFC] dark:bg-[#020617]" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-3"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4F46E5]/10 text-[#4F46E5] rounded-full text-sm font-semibold mb-3">
              <Zap className="w-4 h-4" />
              Featured Products
            </div>
            <h2 className="section-title text-[#0F172A] dark:text-[#F8FAFC]">Top Picks for You</h2>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-2 text-[#4F46E5] font-semibold hover:gap-3 transition-all group"
          >
            View All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {displayProducts.slice(0, 4).map((product, i) => {
            const discount = getDiscount(product.price as number, product.originalPrice);
            const emi = getEmi(product.price as number);
            return (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-2xl overflow-hidden bg-white dark:bg-[#111827] border border-[#F1F5F9] dark:border-[#1E293B] transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
                style={{
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px ${product.glowColor}, 0 4px 24px rgba(0,0,0,0.08)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)';
                }}
              >
                {/* Image Area */}
                <div
                  className="relative overflow-hidden h-52 flex items-center justify-center"
                  style={{
                    background: `radial-gradient(ellipse at 50% 60%, ${product.glowColor} 0%, rgba(248,250,252,1) 70%)`,
                  }}
                >
                  <ProductImage product={product} index={i} />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    {product.isNew && (
                      <span className="badge badge-success text-[10px]">New</span>
                    )}
                    {discount && (
                      <span className="badge badge-primary text-[10px]">{discount}% OFF</span>
                    )}
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 z-10">
                    <button
                      onClick={() => toggleWishlist(product._id as string)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-lg transition-colors ${
                        isWishlisted(product._id as string)
                          ? 'bg-[#4F46E5] text-white'
                          : 'bg-white text-gray-600 hover:bg-[#4F46E5] hover:text-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted(product._id as string) ? 'fill-current' : ''}`} />
                    </button>
                    <Link
                      href={`/products/${product.slug}`}
                      className="w-8 h-8 rounded-lg bg-white text-gray-600 hover:bg-[#0A84FF] hover:text-white flex items-center justify-center shadow-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`badge text-[10px] ${brandColors[product.brand as string] || 'bg-gray-100 text-gray-700'}`}>
                      {product.brand}
                    </span>
                    <span className="badge bg-[#F1F5F9] text-[#64748B] dark:bg-[#1E293B] dark:text-[#94A3B8] text-[10px]">
                      {product.category}
                    </span>
                  </div>

                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-bold text-[#0F172A] dark:text-[#F8FAFC] text-sm mb-2 line-clamp-2 hover:text-[#4F46E5] transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="text-xs text-[#64748B] dark:text-[#94A3B8] space-y-0.5 mb-3 flex-1">
                    <div>{product.processor}</div>
                    <div>{product.ram} • {product.storage}</div>
                    <div>{product.display}</div>
                    {product.graphics && <div className="font-medium" style={{ color: product.accentColor }}>{product.graphics}</div>}
                  </div>

                  {/* Price Row */}
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC]">
                      {formatPrice(product.price as number)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-[#94A3B8] line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* EMI line */}
                  <div className="flex items-center gap-1 mb-3">
                    <CreditCard className="w-3 h-3 text-green-500" />
                    <span className="text-[10px] text-green-600 font-semibold">EMI from {emi} · 0% Interest</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 text-white text-xs font-semibold rounded-lg transition-colors"
                      style={{ background: product.accentColor, color: product.accentColor === '#76FF03' ? '#000' : '#fff' }}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                    <a
                      href={getWhatsAppUrl(`Hello Gokul Computers,\nI'm interested in: ${product.name}\nPrice: ${formatPrice(product.price as number)}\nPlease share more details.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex-shrink-0"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
