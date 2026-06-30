'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Users, Heart, Target, Eye, Award } from 'lucide-react';

const timeline = [
  { year: '1993', title: 'Founded', desc: 'Gokul Computers established in Trichy, Tamil Nadu' },
  { year: '1998', title: 'Expansion', desc: 'Expanded to a larger showroom in Thillai Nagar' },
  { year: '2005', title: 'Lenovo Partnership', desc: 'Became authorized Lenovo dealer for Trichy region' },
  { year: '2010', title: 'Service Center', desc: 'Launched dedicated laptop repair service center' },
  { year: '2015', title: '1000+ Customers', desc: 'Milestone of serving 1000+ satisfied customers' },
  { year: '2018', title: 'Digital Expansion', desc: 'Launched online enquiry and customer portal' },
  { year: '2020', title: 'AMC Services', desc: 'Started Annual Maintenance Contract services' },
  { year: '2024', title: 'Present Day', desc: '5000+ customers, 10000+ products sold, still growing!' },
];

const team = [
  { name: 'Gokul', role: 'Founder & Director', exp: '31+ Years', emoji: '👨‍💼' },
  { name: 'Technical Team', role: 'Certified Engineers', exp: '15+ Years Avg', emoji: '🔧' },
  { name: 'Sales Team', role: 'Product Specialists', exp: '10+ Years Avg', emoji: '💼' },
];

const achievements = [
  { icon: Trophy, title: 'Lenovo Authorized Dealer', desc: 'Official Lenovo partner for Trichy region' },
  { icon: Award, title: 'Best Laptop Store', desc: 'Voted best laptop store in Trichy multiple times' },
  { icon: Users, title: '5000+ Happy Customers', desc: 'Our ever-growing family of satisfied customers' },
  { icon: Heart, title: 'Community Trust', desc: '31 years of honest business in Trichy' },
];

export default function AboutPage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="pt-20 min-h-screen bg-[#F8FAFC] dark:bg-[#020617]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 md:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4F46E5]/20 text-red-300 rounded-full text-sm font-semibold mb-6">
                Our Story
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                31 Years of Trust,<br />
                <span className="text-[#4F46E5]">Excellence & Service</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                Gokul Computers was founded in 1993 with a simple mission: to provide Trichy with the best laptops at honest prices, backed by exceptional service. Three decades later, we remain Trichy&apos;s most trusted laptop destination.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-9xl mb-4">🏪</div>
              <div className="text-xl font-semibold text-gray-300">Gokul Computers</div>
              <div className="text-[#4F46E5] font-bold">Est. 1993 | Trichy, Tamil Nadu</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container-custom py-16" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="glass-card border-l-4 border-[#4F46E5]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#4F46E5]/10 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-[#4F46E5]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F8FAFC]">Our Mission</h2>
            </div>
            <p className="text-gray-600 dark:text-[#94A3B8] leading-relaxed">
              To provide Trichy with access to the latest and best laptops from all major brands, offering honest pricing, genuine products, expert repair services, and after-sales support that builds long-term trust with every customer.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="glass-card border-l-4 border-[#0A84FF]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#0A84FF]/10 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-[#0A84FF]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F8FAFC]">Our Vision</h2>
            </div>
            <p className="text-gray-600 dark:text-[#94A3B8] leading-relaxed">
              To be the #1 laptop destination in Tamil Nadu, known for our expertise, integrity, and customer-first approach. We envision a future where every person in Trichy gets the right technology at the right price.
            </p>
          </motion.div>
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-[#F8FAFC] text-center mb-8">Our Achievements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="glass-card text-center group hover:scale-105"
              >
                <div className="w-14 h-14 bg-[#4F46E5]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#4F46E5] transition-colors">
                  <a.icon className="w-7 h-7 text-[#4F46E5] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-[#F8FAFC] mb-2">{a.title}</h3>
                <p className="text-sm text-gray-500 dark:text-[#94A3B8]">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-[#F8FAFC] text-center mb-10">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-[#4F46E5]/20 hidden md:block" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="glass-card inline-block">
                      <div className="text-[#4F46E5] font-bold text-lg">{item.year}</div>
                      <div className="font-bold text-gray-900 dark:text-[#F8FAFC]">{item.title}</div>
                      <div className="text-sm text-gray-500 dark:text-[#94A3B8]">{item.desc}</div>
                    </div>
                  </div>
                  <div className="hidden md:flex w-10 h-10 bg-[#4F46E5] rounded-full items-center justify-center flex-shrink-0 z-10 shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-[#F8FAFC] text-center mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="glass-card text-center hover:scale-105 group"
              >
                <div className="text-6xl mb-4">{member.emoji}</div>
                <h3 className="font-bold text-gray-900 dark:text-[#F8FAFC] text-lg mb-1">{member.name}</h3>
                <div className="text-[#4F46E5] font-semibold text-sm mb-1">{member.role}</div>
                <div className="text-gray-500 text-sm">{member.exp}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
