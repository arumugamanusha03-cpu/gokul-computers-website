'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Laptop, Cpu, HardDrive, Database, Printer, Monitor, Shield, Wrench,
  ArrowRight, Clock, CheckCircle, Phone, MessageCircle, ChevronDown, ChevronUp,
} from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';
import EnquiryModal from '@/components/products/EnquiryModal';

const services = [
  {
    id: 'sales',
    icon: Laptop,
    title: 'Laptop Sales',
    description: 'We offer a wide range of new and refurbished laptops from all major brands. As a Lenovo Authorized Dealer, we guarantee genuine products with original manufacturer warranty.',
    features: ['All major brands available', 'Original manufacturer warranty', 'EMI options available', 'Exchange offers', 'Genuine accessories'],
    duration: 'Immediate',
    color: 'from-[#4F46E5] to-red-700',
  },
  {
    id: 'repair',
    icon: Wrench,
    title: 'Laptop Repair',
    description: 'Expert laptop repair service for all brands and models. From screen replacement to software issues, our certified technicians handle everything.',
    features: ['Screen replacement', 'Keyboard repair', 'Charging port fix', 'Software issues', 'Virus removal', 'OS reinstall'],
    duration: '24-48 Hours',
    color: 'from-blue-500 to-blue-700',
  },
  {
    id: 'motherboard',
    icon: Cpu,
    title: 'Motherboard Repair',
    description: 'Advanced chip-level motherboard repair and diagnostics. Our specialized technicians can fix complex motherboard issues that others cannot.',
    features: ['Chip-level repair', 'BGA rework', 'Power IC replacement', 'Diagnostics', 'GPU repair', 'BIOS flashing'],
    duration: '3-5 Days',
    color: 'from-purple-500 to-purple-700',
  },
  {
    id: 'ram',
    icon: Monitor,
    title: 'RAM Upgrade',
    description: 'Upgrade your laptop RAM for better multitasking and performance. We provide genuine RAM modules with warranty.',
    features: ['All DDR variants', 'Performance testing', 'Genuine modules', 'Same day service', 'Compatibility check'],
    duration: '1-2 Hours',
    color: 'from-green-500 to-green-700',
  },
  {
    id: 'ssd',
    icon: HardDrive,
    title: 'SSD Upgrade',
    description: 'Replace your old HDD with a fast SSD for instant speed improvement. Boot in seconds and enjoy faster application loading.',
    features: ['M.2 NVMe & SATA', 'Data migration', 'OS cloning', 'Performance boost', 'Genuine SSDs only'],
    duration: '2-4 Hours',
    color: 'from-yellow-500 to-yellow-700',
  },
  {
    id: 'printer',
    icon: Printer,
    title: 'Printer Repair',
    description: 'All printer brands and models repaired. Inkjet, laser, and multifunction printers. Toner and ink refilling services also available.',
    features: ['All printer brands', 'Ink refilling', 'Toner replacement', 'Drum cleaning', 'Paper jam fix'],
    duration: '1-3 Days',
    color: 'from-orange-500 to-orange-700',
  },
  {
    id: 'data',
    icon: Database,
    title: 'Data Recovery',
    description: 'Professional data recovery from damaged hard drives, SSDs, and memory cards. We recover data even from physically damaged storage devices.',
    features: ['HDD & SSD recovery', 'Physical damage', 'Deleted files', 'Formatted drives', 'Memory card recovery'],
    duration: '2-7 Days',
    color: 'from-teal-500 to-teal-700',
  },
  {
    id: 'amc',
    icon: Shield,
    title: 'AMC Services',
    description: 'Annual Maintenance Contract for businesses, schools, and institutions. Regular maintenance, priority service, and cost-effective solutions.',
    features: ['Priority service', 'Regular maintenance', 'On-site visits', 'Cost savings', '24/7 support call'],
    duration: 'Annual Contract',
    color: 'from-indigo-500 to-indigo-700',
  },
];

const faqs = [
  { q: 'How long does laptop repair usually take?', a: 'Most repairs are completed within 24-48 hours. Complex issues like motherboard repair may take 3-5 days. We always give you an estimated time before starting the work.' },
  { q: 'Do you provide warranty on repairs?', a: 'Yes! We provide 30-90 day warranty on all repair work depending on the service. Parts replaced also come with manufacturer warranty.' },
  { q: 'Do you offer home pickup service?', a: 'Yes, we offer home pickup and delivery for laptop repairs within Trichy city for a nominal charge. Call us to schedule a pickup.' },
  { q: 'What brands do you service?', a: 'We service all major laptop brands including Lenovo, HP, Dell, Acer, ASUS, Apple, MSI, Samsung, and more.' },
  { q: 'Can you recover data from a crashed hard drive?', a: 'Yes, we have specialized tools for data recovery from crashed or damaged hard drives, SSDs, and memory cards. Success rate depends on the extent of damage.' },
  { q: 'What payment methods do you accept?', a: 'We accept cash, UPI (GPay, PhonePe, Paytm), card payments, and bank transfers. EMI is available for purchases above ₹10,000.' },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <div className="pt-20 min-h-screen bg-[#F8FAFC] dark:bg-[#020617]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 md:py-20">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4F46E5]/20 text-red-300 rounded-full text-sm font-semibold mb-6">
              <Wrench className="w-4 h-4" />
              Expert Services
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Complete Laptop <span className="text-[#4F46E5]">Solutions</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              From sales to repair, upgrades to data recovery — we handle everything with 31+ years of expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setShowEnquiry(true)} className="btn-primary">
                Book a Service
              </button>
              <a
                href={getWhatsAppUrl("Hello Gokul Computers,\nI need laptop service. Please guide me.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container-custom py-16" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card group hover:scale-105"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-gray-900 dark:text-[#F8FAFC]">{service.title}</h3>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#4F46E5] font-semibold mb-3">
                <Clock className="w-3 h-3" /> {service.duration}
              </div>
              <p className="text-sm text-gray-600 dark:text-[#94A3B8] mb-4 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-1.5">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-gray-600 dark:text-[#94A3B8]">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowEnquiry(true)}
                className="mt-4 w-full py-2 border-2 border-[#4F46E5] text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                Book Service <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-[#111827] py-16">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-[#F8FAFC] mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-500">Got questions? We&apos;ve got answers.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-[#F8FAFC] text-sm pr-4">{faq.q}</h3>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-[#4F46E5] flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                </div>
                {openFaq === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 text-sm text-gray-600 dark:text-[#94A3B8] leading-relaxed pt-3 border-t border-gray-200 dark:border-[#1E293B]"
                  >
                    {faq.a}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <EnquiryModal isOpen={showEnquiry} onClose={() => setShowEnquiry(false)} productName="Service Enquiry" />
    </div>
  );
}
