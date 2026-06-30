'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Gamepad2, GraduationCap, Briefcase, Monitor, Headphones, Cpu, Wrench, ArrowRight,
} from 'lucide-react';

const categories = [
  {
    icon: Gamepad2,
    label: 'Gaming Laptops',
    href: '/products?category=gaming',
    description: 'High performance for gamers',
    color: 'from-indigo-500 to-orange-500',
    bg: 'bg-indigo-50 dark:bg-indigo-950/20',
    count: '50+ Models',
  },
  {
    icon: GraduationCap,
    label: 'Student Laptops',
    href: '/products?category=student',
    description: 'Affordable & reliable choices',
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    count: '80+ Models',
  },
  {
    icon: Briefcase,
    label: 'Business Laptops',
    href: '/products?category=business',
    description: 'Professional grade laptops',
    color: 'from-gray-600 to-gray-800',
    bg: 'bg-gray-50 dark:bg-[#1E293B]/40',
    count: '40+ Models',
  },
  {
    icon: Monitor,
    label: 'Desktop Computers',
    href: '/products?category=desktop',
    description: 'Powerful desktop solutions',
    color: 'from-purple-500 to-indigo-500',
    bg: 'bg-purple-50 dark:bg-purple-950/20',
    count: '30+ Configs',
  },
  {
    icon: Headphones,
    label: 'Accessories',
    href: '/products?category=accessories',
    description: 'Bags, mice, keyboards & more',
    color: 'from-green-500 to-teal-500',
    bg: 'bg-green-50 dark:bg-green-950/20',
    count: '200+ Items',
  },
  {
    icon: Cpu,
    label: 'Laptop Parts',
    href: '/products?category=parts',
    description: 'Genuine OEM parts',
    color: 'from-yellow-500 to-amber-500',
    bg: 'bg-yellow-50 dark:bg-yellow-950/20',
    count: '500+ Parts',
  },
  {
    icon: Wrench,
    label: 'Repair Services',
    href: '/services',
    description: 'Expert repair & upgrades',
    color: 'from-[#4F46E5] to-indigo-700',
    bg: 'bg-indigo-50 dark:bg-indigo-950/20',
    count: '10+ Services',
  },
];

export default function CategoriesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[#F8FAFC] dark:bg-[#020617]" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A84FF]/10 text-[#0A84FF] rounded-full text-sm font-semibold mb-4">
            Shop By Category
          </div>
          <h2 className="section-title text-gray-900 dark:text-[#F8FAFC]">
            Find What You Need
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Browse our wide range of products and services tailored for every need
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link href={cat.href} className="block group">
                <div className="glass-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 text-center h-full !p-4 md:!p-6">
                  <div className={`w-16 h-16 rounded-2xl ${cat.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                      <cat.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="font-bold text-gray-900 dark:text-[#F8FAFC] text-sm mb-1">{cat.label}</div>
                  <div className="text-xs text-gray-500 dark:text-[#94A3B8] mb-2">{cat.description}</div>
                  <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#4F46E5] group-hover:gap-2 transition-all">
                    {cat.count}
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
