'use client';

import Link from 'next/link';
import {
  Laptop, Phone, MapPin, Clock, MessageCircle, ArrowRight, ChevronRight,
} from 'lucide-react';
import { getWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from '@/lib/utils';

const SocialIcons = {
  facebook: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  instagram: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  whatsapp: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  ),
  youtube: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
    </svg>
  ),
  linkedin: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
};

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/accessories', label: 'Accessories' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

const services = [
  'Laptop Sales', 'Laptop Repair', 'Motherboard Repair',
  'RAM Upgrade', 'SSD Upgrade', 'Data Recovery',
  'Printer Repair', 'Desktop Assembly', 'AMC Services',
];

const brands = ['Lenovo', 'HP', 'Dell', 'Acer', 'ASUS', 'Apple', 'MSI'];

const socials = [
  { key: 'facebook'  as const, href: '#', label: 'Facebook',  hoverBg: 'hover:bg-blue-600',   hoverText: 'hover:text-white' },
  { key: 'instagram' as const, href: '#', label: 'Instagram', hoverBg: 'hover:bg-pink-600',   hoverText: 'hover:text-white' },
  { key: 'whatsapp'  as const, href: getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE), label: 'WhatsApp', hoverBg: 'hover:bg-[#25D366]', hoverText: 'hover:text-white' },
  { key: 'youtube'   as const, href: '#', label: 'YouTube',   hoverBg: 'hover:bg-red-600',    hoverText: 'hover:text-white' },
  { key: 'linkedin'  as const, href: '#', label: 'LinkedIn',  hoverBg: 'hover:bg-blue-700',   hoverText: 'hover:text-white' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#4F46E5]/6 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#7C3AED]/6 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        <div className="container-custom py-10 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">

            {/* Brand Column */}
            <div className="lg:col-span-1 text-center sm:text-left">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl flex items-center justify-center shadow-lg">
                  <Laptop className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg text-white leading-none">
                    Gokul <span className="bg-gradient-to-r from-[#818CF8] to-[#A78BFA] bg-clip-text text-transparent">Computers</span>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5">Trichy&apos;s Trusted Laptop Destination</div>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Your one-stop solution for all laptop needs in Trichy. Lenovo Authorized Dealer with 31+ years of experience serving 5000+ happy customers.
              </p>
              <div className="flex gap-2.5 justify-center sm:justify-start">
                {socials.map(({ key, href, label, hoverBg, hoverText }) => {
                  const Icon = SocialIcons[key];
                  return (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      className={`w-9 h-9 rounded-lg bg-gray-800 text-gray-400 ${hoverBg} ${hoverText} flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-gradient-to-b from-[#4F46E5] to-[#7C3AED] rounded-full" />
                Quick Links
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#A78BFA] transition-colors group"
                    >
                      <ChevronRight className="w-3 h-3 text-[#7C3AED] opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-gradient-to-b from-[#4F46E5] to-[#7C3AED] rounded-full" />
                Our Services
              </h3>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service}>
                    <Link
                      href="/services"
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#A78BFA] transition-colors group"
                    >
                      <ChevronRight className="w-3 h-3 text-[#7C3AED] opacity-0 group-hover:opacity-100 transition-opacity" />
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-gradient-to-b from-[#4F46E5] to-[#7C3AED] rounded-full" />
                Contact Info
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#818CF8]" />
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    No B-7, Vignesh Plaza,<br />
                    Near Domino&apos;s Pizza,<br />
                    1st Cross, Thillai Nagar,<br />
                    Trichy - 620018
                  </p>
                </div>
                <a href="tel:07947130911" className="flex gap-3 hover:text-[#A78BFA] transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-gray-800 group-hover:bg-[#4F46E5]/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-[#818CF8]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium text-gray-300 group-hover:text-[#A78BFA]">07947130911</p>
                  </div>
                </a>
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-[#818CF8]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Working Hours</p>
                    <p className="text-sm font-medium text-gray-300">9:30 AM – 8:00 PM</p>
                    <p className="text-xs text-gray-500">All Days Open</p>
                  </div>
                </div>
                <a
                  href={getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#1DB954] text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </a>
              </div>
            </div>
          </div>

          {/* Brands */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-xs text-gray-500 text-center mb-4">Authorized Dealers &amp; Service Partners</p>
            <div className="flex flex-wrap justify-center gap-4">
              {brands.map((brand) => (
                <span
                  key={brand}
                  className="px-4 py-1.5 bg-gray-800 text-gray-400 rounded-lg text-xs font-semibold border border-gray-700 hover:border-[#7C3AED]/50 hover:text-[#A78BFA] transition-all cursor-default"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="container-custom py-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <p className="text-xs text-gray-500 text-center md:text-left">
                © {new Date().getFullYear()} Gokul Computers. All rights reserved. Trichy, Tamil Nadu.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/privacy-policy" className="text-xs text-gray-500 hover:text-[#A78BFA] transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="text-xs text-gray-500 hover:text-[#A78BFA] transition-colors">Terms of Service</Link>
                <Link href="/sitemap.xml" className="text-xs text-gray-500 hover:text-[#A78BFA] transition-colors">Sitemap</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}