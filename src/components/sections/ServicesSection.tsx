'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Laptop, Cpu, HardDrive, Database, Printer, Monitor, Shield, ArrowRight, Zap,
} from 'lucide-react';

const services = [
  {
    icon: Laptop,
    title: 'Laptop Sales',
    description: 'New & refurbished laptops from all major brands at best prices.',
    color: 'from-[#4F46E5] to-indigo-700',
    href: '/services#sales',
  },
  {
    icon: Zap,
    title: 'Laptop Repair',
    description: 'Fast and reliable repair service for all laptop brands and models.',
    color: 'from-blue-500 to-blue-700',
    href: '/services#repair',
  },
  {
    icon: Cpu,
    title: 'Motherboard Repair',
    description: 'Expert motherboard diagnostics and repair by certified technicians.',
    color: 'from-purple-500 to-purple-700',
    href: '/services#motherboard',
  },
  {
    icon: Monitor,
    title: 'RAM Upgrade',
    description: 'Boost your laptop performance with genuine RAM upgrades.',
    color: 'from-green-500 to-green-700',
    href: '/services#ram',
  },
  {
    icon: HardDrive,
    title: 'SSD Upgrade',
    description: 'Replace HDD with fast SSD for instant speed improvement.',
    color: 'from-yellow-500 to-yellow-700',
    href: '/services#ssd',
  },
  {
    icon: Printer,
    title: 'Printer Repair',
    description: 'All printer brands serviced â€” inkjet, laser, and multifunction.',
    color: 'from-orange-500 to-orange-700',
    href: '/services#printer',
  },
  {
    icon: Database,
    title: 'Data Recovery',
    description: 'Professional data recovery from hard drives and SSDs.',
    color: 'from-teal-500 to-teal-700',
    href: '/services#data',
  },
  {
    icon: Shield,
    title: 'AMC Services',
    description: 'Annual Maintenance Contract for businesses and institutions.',
    color: 'from-indigo-500 to-indigo-700',
    href: '/services#amc',
  },
];

export default function ServicesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white dark:bg-[#111827]" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A84FF]/10 text-[#0A84FF] rounded-full text-sm font-semibold mb-3">
              Our Services
            </div>
            <h2 className="section-title text-gray-900 dark:text-[#F8FAFC]">
              Complete Laptop Solutions
            </h2>
          </div>
          <Link
            href="/services"
            className="flex items-center gap-2 text-[#4F46E5] font-semibold hover:gap-3 transition-all group"
          >
            View All Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link href={service.href} className="block group">
                <div className="glass-card hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-[#F8FAFC] text-sm mb-2">{service.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-[#94A3B8] leading-relaxed">{service.description}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#4F46E5] group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-3 h-3" />
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
