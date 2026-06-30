'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, Tag, ArrowRight, BookOpen, Search } from 'lucide-react';

const demoBlogs = [
  {
    _id: '1',
    title: 'Best Laptops Under ₹50,000 in 2024',
    slug: 'best-laptops-under-50000-2024',
    excerpt: 'Looking for a great laptop without breaking the bank? Here are our top picks for the best laptops under ₹50,000 available at Gokul Computers, Trichy.',
    coverImage: null,
    author: 'Gokul Computers',
    category: 'Buying Guide',
    tags: ['laptop', 'budget', 'buying guide'],
    views: 1240,
    createdAt: '2024-03-15',
    readTime: '5 min',
    emoji: '💻',
  },
  {
    _id: '2',
    title: 'Gaming Laptop Buying Guide 2024',
    slug: 'gaming-laptop-buying-guide-2024',
    excerpt: 'Everything you need to know before buying a gaming laptop. From GPU to display refresh rate, we cover it all in this comprehensive guide.',
    coverImage: null,
    author: 'Gokul Computers',
    category: 'Gaming',
    tags: ['gaming', 'laptop', 'guide'],
    views: 980,
    createdAt: '2024-03-10',
    readTime: '8 min',
    emoji: '🎮',
  },
  {
    _id: '3',
    title: 'SSD vs HDD: Which is Better for Your Laptop?',
    slug: 'ssd-vs-hdd-which-is-better',
    excerpt: 'The age-old question: SSD or HDD? We break down the pros and cons of each storage type to help you make the right decision for your needs.',
    coverImage: null,
    author: 'Gokul Computers',
    category: 'Tech Tips',
    tags: ['ssd', 'hdd', 'storage', 'upgrade'],
    views: 750,
    createdAt: '2024-02-28',
    readTime: '4 min',
    emoji: '💾',
  },
  {
    _id: '4',
    title: 'Lenovo vs HP: Which Brand is Better in 2024?',
    slug: 'lenovo-vs-hp-comparison-2024',
    excerpt: 'Lenovo and HP are two of the most popular laptop brands. We compare them across build quality, performance, value and after-sales support.',
    coverImage: null,
    author: 'Gokul Computers',
    category: 'Comparison',
    tags: ['lenovo', 'hp', 'comparison'],
    views: 620,
    createdAt: '2024-02-20',
    readTime: '6 min',
    emoji: '⚖️',
  },
  {
    _id: '5',
    title: 'Student Laptop Guide: Best Picks for College',
    slug: 'student-laptop-guide-college-2024',
    excerpt: 'Going to college? Here are the best laptops for students with good battery life, portability, and performance — all within a student budget.',
    coverImage: null,
    author: 'Gokul Computers',
    category: 'Student',
    tags: ['student', 'college', 'laptop'],
    views: 890,
    createdAt: '2024-02-15',
    readTime: '5 min',
    emoji: '🎓',
  },
  {
    _id: '6',
    title: 'How to Speed Up Your Old Laptop with SSD Upgrade',
    slug: 'speed-up-laptop-ssd-upgrade',
    excerpt: 'Your old laptop feeling slow? An SSD upgrade can give it new life. Here\'s everything you need to know about the process and what to expect.',
    coverImage: null,
    author: 'Gokul Computers',
    category: 'Tech Tips',
    tags: ['ssd', 'upgrade', 'speed'],
    views: 1100,
    createdAt: '2024-02-10',
    readTime: '4 min',
    emoji: '⚡',
  },
];

const categories = ['All', 'Buying Guide', 'Gaming', 'Tech Tips', 'Comparison', 'Student'];

export default function BlogListPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const filtered = demoBlogs.filter((b) => {
    if (activeCategory !== 'All' && b.category !== activeCategory) return false;
    if (search && !b.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="pt-20 min-h-screen bg-[#F8FAFC] dark:bg-[#020617]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A84FF]/20 text-blue-300 rounded-full text-sm font-semibold mb-4">
              <BookOpen className="w-4 h-4" />
              Tech Blog
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Laptop <span className="text-[#0A84FF]">Insights</span> & Guides
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Expert advice, buying guides, and tech tips from Gokul Computers
            </p>
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20 transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12" ref={ref}>
        {/* Category Filter */}
        <div className="flex gap-3 mb-8 overflow-x-auto scrollbar-hidden pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#0A84FF] text-white shadow-md'
                  : 'bg-white dark:bg-[#1E293B] text-gray-600 dark:text-[#CBD5E1] border border-gray-200 dark:border-[#1E293B] hover:border-[#0A84FF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((blog, i) => (
            <motion.article
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="product-card group"
            >
              {/* Cover Image */}
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl">{blog.emoji}</div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge bg-[#0A84FF]/10 text-[#0A84FF] text-xs">{blog.category}</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {blog.readTime}
                  </span>
                </div>

                <Link href={`/blog/${blog.slug}`}>
                  <h2 className="font-bold text-gray-900 dark:text-[#F8FAFC] mb-2 line-clamp-2 hover:text-[#0A84FF] transition-colors">
                    {blog.title}
                  </h2>
                </Link>

                <p className="text-sm text-gray-500 dark:text-[#94A3B8] line-clamp-2 mb-4">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-[#1E293B]">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="flex items-center gap-1 text-xs font-semibold text-[#0A84FF] hover:gap-2 transition-all"
                  >
                    Read More <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-[#F8FAFC] mb-2">No articles found</h3>
            <p className="text-gray-500">Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  );
}
