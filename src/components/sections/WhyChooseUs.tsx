'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Shield, Clock, Award, CreditCard, Truck, HeadphonesIcon,
  CheckCircle, Star, Zap, Users,
} from 'lucide-react';

const reasons = [
  {
    icon: Award,
    title: 'Lenovo Authorized Dealer',
    description: 'Official Lenovo partner with genuine products, warranties and after-sales support.',
    color: 'from-[#4F46E5] to-indigo-700',
    bg: 'bg-indigo-50 dark:bg-indigo-950/20',
  },
  {
    icon: Clock,
    title: '31+ Years of Trust',
    description: 'Over three decades of serving Trichy with honest pricing and expert knowledge.',
    color: 'from-blue-500 to-blue-700',
    bg: 'bg-blue-50 dark:bg-blue-950/20',
  },
  {
    icon: Shield,
    title: 'Genuine Products Only',
    description: 'Every laptop and accessory is 100% genuine with manufacturer warranty.',
    color: 'from-green-500 to-green-700',
    bg: 'bg-green-50 dark:bg-green-950/20',
  },
  {
    icon: CreditCard,
    title: 'Easy EMI Options',
    description: 'Flexible EMI plans available with 0% interest on select products.',
    color: 'from-purple-500 to-purple-700',
    bg: 'bg-purple-50 dark:bg-purple-950/20',
  },
  {
    icon: HeadphonesIcon,
    title: 'Expert After-Sales Support',
    description: 'Dedicated support team for all your post-purchase queries and issues.',
    color: 'from-orange-500 to-orange-700',
    bg: 'bg-orange-50 dark:bg-orange-950/20',
  },
  {
    icon: Zap,
    title: 'Quick Repair Turnaround',
    description: 'Most repairs completed within 24-48 hours by certified technicians.',
    color: 'from-yellow-500 to-yellow-700',
    bg: 'bg-yellow-50 dark:bg-yellow-950/20',
  },
];

const testimonialHighlight = [
  { name: 'Rajesh Kumar', text: 'Best laptop shop in Trichy! Great prices and genuine products.', rating: 5 },
  { name: 'Priya Sharma', text: 'My Lenovo laptop was repaired in just one day. Excellent service!', rating: 5 },
  { name: 'Arun Prakash', text: 'EMI made it affordable. Very happy with the purchase.', rating: 5 },
];

export default function WhyChooseUs() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white dark:bg-[#111827] relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4F46E5]/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/3 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4F46E5]/10 text-[#4F46E5] rounded-full text-sm font-semibold mb-4">
            <CheckCircle className="w-4 h-4" />
            Why Choose Us
          </div>
          <h2 className="section-title text-gray-900 dark:text-[#F8FAFC]">
            Trichy&apos;s Most Trusted<br />
            <span className="text-[#4F46E5]">Laptop Partner</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            We&apos;re not just a store â€” we&apos;re your technology partner for life
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-16">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card group hover:scale-105"
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl ${reason.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center`}>
                    <reason.icon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-[#F8FAFC] mb-2 text-base">{reason.title}</h3>
                  <p className="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">{reason.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mini Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="rounded-3xl p-6 md:p-8 text-white" style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6" />
            <h3 className="font-bold text-xl">What Our Customers Say</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonialHighlight.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
              >
                <div className="flex mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  ))}
                </div>
                <p className="text-white/90 text-sm italic mb-3">&quot;{t.text}&quot;</p>
                <p className="text-white font-semibold text-sm">â€” {t.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
