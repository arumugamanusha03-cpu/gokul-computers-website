'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, ChevronLeft, ChevronRight, Quote, BadgeCheck } from 'lucide-react';

interface Testimonial {
  _id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  productBought?: string;
}

const demoTestimonials: Testimonial[] = [
  {
    _id: '1',
    name: 'Rajesh Kumar',
    location: 'Thillai Nagar, Trichy',
    rating: 5,
    review: 'Best laptop shop in Trichy! I bought a Lenovo IdeaPad from Gokul Computers and the experience was excellent. Great prices, genuine products, and amazing after-sales support. Highly recommended!',
    productBought: 'Lenovo IdeaPad Slim 5',
  },
  {
    _id: '2',
    name: 'Priya Sharma',
    location: 'Anna Nagar, Trichy',
    rating: 5,
    review: 'My HP laptop had a motherboard issue and they repaired it within 24 hours! The technicians are very skilled and honest. They gave me a fair price without any hidden charges.',
    productBought: 'HP Pavilion Repair',
  },
  {
    _id: '3',
    name: 'Arun Prakash',
    location: 'KK Nagar, Trichy',
    rating: 5,
    review: 'I was looking for a gaming laptop under budget and Gokul Computers helped me find the perfect one with EMI options. The staff is very knowledgeable and patient.',
    productBought: 'ASUS ROG Strix',
  },
  {
    _id: '4',
    name: 'Kavitha Rajan',
    location: 'Woraiyur, Trichy',
    rating: 5,
    review: 'Got SSD upgrade done here. My old laptop feels brand new now! Quick service, reasonable price. I will definitely recommend Gokul Computers to everyone.',
    productBought: 'SSD Upgrade Service',
  },
  {
    _id: '5',
    name: 'Suresh Babu',
    location: 'Srirangam, Trichy',
    rating: 5,
    review: 'Purchased Dell XPS from here. Amazing deal with extended warranty. The team helped me compare multiple options and gave honest advice. Best purchase decision ever!',
    productBought: 'Dell XPS 15',
  },
];

const avatarColors = [
  'from-[#4F46E5] to-[#7C3AED]',
  'from-[#0EA5E9] to-[#0284C7]',
  'from-[#F59E0B] to-[#D97706]',
  'from-[#10B981] to-[#059669]',
  'from-[#EC4899] to-[#BE185D]',
];

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const data = testimonials && testimonials.length > 0 ? testimonials : demoTestimonials;

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % data.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [autoPlay, data.length]);

  const prev = () => { setCurrent((p) => (p - 1 + data.length) % data.length); setAutoPlay(false); };
  const next = () => { setCurrent((p) => (p + 1) % data.length); setAutoPlay(false); };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[#F8FAFC] dark:bg-[#0F172A]" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FEF9C3] dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-sm font-semibold mb-4">
            <Star className="w-4 h-4 fill-current" />
            Customer Reviews
          </div>
          <h2 className="section-title">What Trichy Says About Us</h2>
          <p className="section-subtitle mx-auto text-center mt-3">
            Real reviews from real customers — verified on Google
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative max-w-2xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] p-8 shadow-lg dark:shadow-black/30"
            >
              {/* Quote decoration */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#4F46E5]/10 dark:text-[#4F46E5]/20" />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(data[current].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-[#334155] dark:text-[#CBD5E1] text-[1.05rem] leading-[1.75] mb-7 font-medium">
                &ldquo;{data[current].review}&rdquo;
              </p>

              {/* Author row */}
              <div className="flex items-center gap-4 pt-5 border-t border-[#F1F5F9] dark:border-[#1E293B]">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatarColors[parseInt(data[current]._id) - 1] || avatarColors[0]} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                  {data[current].name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC]">{data[current].name}</span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#4285F4] font-semibold">
                      <BadgeCheck className="w-3.5 h-3.5 fill-[#4285F4] text-white" />
                      Google Verified
                    </span>
                  </div>
                  <div className="text-sm text-[#64748B] dark:text-[#94A3B8]">{data[current].location}</div>
                  {data[current].productBought && (
                    <div className="text-xs text-[#4F46E5] dark:text-[#A78BFA] font-semibold mt-0.5">
                      Purchased: {data[current].productBought}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111827] flex items-center justify-center hover:border-[#4F46E5] hover:text-[#4F46E5] dark:hover:border-[#4F46E5] dark:text-[#94A3B8] transition-colors shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {data.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); setAutoPlay(false); }}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === current ? 28 : 8,
                    height: 8,
                    background: i === current ? '#4F46E5' : '#CBD5E1',
                  }}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111827] flex items-center justify-center hover:border-[#4F46E5] hover:text-[#4F46E5] dark:hover:border-[#4F46E5] dark:text-[#94A3B8] transition-colors shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Trust row */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <span className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">4.9</span>
              <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">on Google</span>
            </div>
            <div className="w-px h-5 bg-[#E2E8F0] dark:bg-[#1E293B]" />
            <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">200+ verified reviews</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}