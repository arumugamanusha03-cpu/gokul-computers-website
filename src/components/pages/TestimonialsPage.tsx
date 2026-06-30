'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  { name: 'Rajesh Kumar', location: 'Thillai Nagar, Trichy', rating: 5, review: 'Best laptop shop in Trichy! I bought a Lenovo IdeaPad from Gokul Computers and the experience was excellent. Great prices, genuine products, and amazing after-sales support. Highly recommended!', product: 'Lenovo IdeaPad Slim 5', emoji: '👨‍💼' },
  { name: 'Priya Sharma', location: 'Anna Nagar, Trichy', rating: 5, review: 'My HP laptop had a motherboard issue and they repaired it within 24 hours! The technicians are very skilled and honest. They gave me a fair price without any hidden charges.', product: 'HP Repair Service', emoji: '👩‍💻' },
  { name: 'Arun Prakash', location: 'KK Nagar, Trichy', rating: 5, review: 'I was looking for a gaming laptop under budget and Gokul Computers helped me find the perfect one with EMI options. The staff is very knowledgeable and patient.', product: 'ASUS ROG Strix', emoji: '🎮' },
  { name: 'Kavitha Rajan', location: 'Woraiyur, Trichy', rating: 5, review: 'Got SSD upgrade done here. My old laptop feels brand new now! Quick service, reasonable price. I will definitely recommend Gokul Computers to everyone.', product: 'SSD Upgrade', emoji: '👩‍🔬' },
  { name: 'Suresh Babu', location: 'Srirangam, Trichy', rating: 5, review: 'Purchased Dell XPS from here. Amazing deal with extended warranty. The team helped me compare multiple options and gave honest advice. Best purchase decision ever!', product: 'Dell XPS 15', emoji: '👨‍💻' },
  { name: 'Meena Krishnan', location: 'Ariyamangalam, Trichy', rating: 5, review: 'My daughter needed a laptop for college. The team suggested the perfect Lenovo IdeaPad within our budget. Excellent guidance and genuine product. Very happy!', product: 'Lenovo IdeaPad 3', emoji: '👩‍🎓' },
  { name: 'Vijay Raj', location: 'Palakarai, Trichy', rating: 4, review: 'Good collection and competitive prices. Staff is helpful and professional. The laptop I bought works perfectly. Will visit again for accessories.', product: 'HP Laptop', emoji: '👨‍🎓' },
  { name: 'Lakshmi Narayan', location: 'Trichy', rating: 5, review: 'Bought Apple MacBook Pro from here. Got it at the best price in Trichy! Genuine product with full warranty. Service was fast and professional.', product: 'Apple MacBook Pro', emoji: '👩‍🎨' },
  { name: 'Dinesh Babu', location: 'Manachanallur, Trichy', rating: 5, review: 'Data recovery service is top notch! Lost all my important project files from crashed HDD but Gokul Computers recovered 95% of my data. Life saver!', product: 'Data Recovery Service', emoji: '💾' },
];

export default function TestimonialsPage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <div className="pt-20 min-h-screen bg-[#F8FAFC] dark:bg-[#020617]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 py-16 border-b border-yellow-200 dark:border-[#1E293B]">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-sm font-semibold mb-4">
              <Star className="w-4 h-4 fill-current" />
              Customer Reviews
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-[#F8FAFC] mb-4">
              What Trichy Says <span className="text-yellow-500">About Us</span>
            </h1>
            <p className="text-gray-600 dark:text-[#94A3B8] text-lg max-w-2xl mx-auto">
              5000+ happy customers can&apos;t be wrong. Read their genuine experiences with Gokul Computers.
            </p>
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />)}
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-[#F8FAFC]">4.9</span>
              <span className="text-gray-500">/ 5.0 rating</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="container-custom py-16" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="glass-card relative hover:scale-105"
            >
              <Quote className="absolute top-4 right-4 w-10 h-10 text-[#4F46E5]/10" />
              <div className="flex mb-3">
                {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-gray-700 dark:text-[#CBD5E1] text-sm leading-relaxed italic mb-4">
                &quot;{t.review}&quot;
              </p>
              {t.product && (
                <div className="badge badge-primary text-xs mb-4">
                  Bought: {t.product}
                </div>
              )}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-[#1E293B]">
                <div className="w-10 h-10 bg-gradient-to-br from-[#4F46E5] to-red-700 rounded-full flex items-center justify-center text-xl">
                  {t.emoji}
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-[#F8FAFC] text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
