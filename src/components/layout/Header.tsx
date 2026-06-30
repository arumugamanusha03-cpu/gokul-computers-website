'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, Search, Menu, X, Laptop, ShoppingCart, Sun, Moon, Home, Package, Wrench, Star, Info, Mail, Zap, Tag } from 'lucide-react';
import { getWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';

function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem('gokul-theme');
    const isDark = stored ? stored === 'dark' : false;
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);
  const toggle = () => {
    setDark(prev => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('gokul-theme', next ? 'dark' : 'light');
      return next;
    });
  };
  return { dark, toggle };
}

const navLinks = [
  { href: '/',           label: 'Home',        icon: Home },
  { href: '/products',   label: 'Products',    icon: Package },
  { href: '/accessories',label: 'Accessories', icon: Zap },
  { href: '/brands',     label: 'Brands',      icon: Tag },
  { href: '/services',   label: 'Services',    icon: Wrench },
  { href: '/about',      label: 'About',       icon: Info },
  { href: '/blog',       label: 'Blog',        icon: Star },
  { href: '/contact',    label: 'Contact',     icon: Mail },
];

export default function Header() {
  const [isScrolled, setIsScrolled]     = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery]   = useState('');
  const pathname    = usePathname();
  const searchRef   = useRef<HTMLInputElement>(null);
  const totalItems  = useCartStore((s) => s.totalItems)();
  const { dark, toggle: toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsMobileOpen(false); setIsSearchOpen(false); }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  useEffect(() => { if (isSearchOpen) searchRef.current?.focus(); }, [isSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#020617]/95 backdrop-blur-xl shadow-sm border-b border-[#F1F5F9] dark:border-[#1E293B]'
            : 'bg-white/85 dark:bg-[#020617]/85 backdrop-blur-md'
        }`}
        style={{ height: 64 }}
      >
        <div className="container-custom h-full flex items-center justify-between gap-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group" aria-label="Gokul Computers">
            <div className="w-8 h-8 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all flex-shrink-0">
              <Laptop className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-[0.95rem] tracking-tight text-[#0F172A] dark:text-[#F8FAFC] whitespace-nowrap">
              Gokul <span className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">Computers</span>
            </span>
          </Link>

          {/* Desktop Nav — xl+ only */}
          <nav className="hidden xl:flex items-center gap-0.5 flex-1 justify-center">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 rounded-lg text-[0.8375rem] font-medium transition-colors duration-150 whitespace-nowrap ${
                    active
                      ? 'text-[#4F46E5] dark:text-[#A78BFA]'
                      : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-[#EEF2FF] dark:bg-[#4F46E5]/10 rounded-lg -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-[#64748B] dark:text-[#94A3B8] hover:text-[#4F46E5] dark:hover:text-[#A78BFA] hover:bg-[#EEF2FF] dark:hover:bg-[#4F46E5]/10 transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            </button>

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(p => !p)}
              className="p-2 rounded-xl text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors"
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 rounded-xl text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-[18px] h-[18px]" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white text-[10px] font-bold rounded-full px-1 leading-none">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {/* WhatsApp — md+ */}
            <a
              href={getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-[#25D366] hover:bg-[#1DB954] text-white text-[0.8rem] font-semibold rounded-xl transition-all hover:shadow-md"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4 flex-shrink-0" />
              <span className="hidden lg:inline">WhatsApp</span>
            </a>

            {/* Call — md+ */}
            <a
              href="tel:07947130911"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:brightness-110 text-white text-[0.8rem] font-semibold rounded-xl transition-all hover:shadow-md"
              aria-label="Call Now"
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span className="hidden lg:inline">Call Now</span>
            </a>

            {/* Hamburger — below xl */}
            <button
              onClick={() => setIsMobileOpen(p => !p)}
              className="xl:hidden p-2 rounded-xl text-[#475569] dark:text-[#94A3B8] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors"
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileOpen
                  ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="w-5 h-5" /></motion.span>
                  : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="w-5 h-5" /></motion.span>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute top-full inset-x-0 bg-white dark:bg-[#020617] border-b border-[#F1F5F9] dark:border-[#1E293B] shadow-lg"
            >
              <div className="container-custom py-3">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search laptops, accessories..."
                    className="w-full pl-11 pr-28 py-3 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#111827] text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] text-sm outline-none focus:border-[#4F46E5] focus:bg-white dark:focus:bg-[#0F172A] transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:brightness-110 transition-all"
                  >
                    Search
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Search Backdrop */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/10"
            onClick={() => setIsSearchOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer — full screen glassmorphism */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm xl:hidden"
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,85vw)] xl:hidden flex flex-col"
              style={{
                background: 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(32px)',
                borderLeft: '1px solid rgba(226,232,240,0.8)',
                boxShadow: '-24px 0 60px rgba(0,0,0,0.12)',
              }}
            >
              {/* Dark mode drawer */}
              <div className="dark:hidden absolute inset-0 rounded-none" />
              <div
                className="hidden dark:block absolute inset-0"
                style={{ background: 'rgba(2,6,23,0.97)', borderLeft: '1px solid rgba(30,41,59,0.8)' }}
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Drawer header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#F1F5F9] dark:border-[#1E293B]" style={{ paddingTop: 20 }}>
                  <Link href="/" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-lg flex items-center justify-center">
                      <Laptop className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="font-bold text-sm text-[#0F172A] dark:text-[#F8FAFC]">
                      Gokul <span className="text-[#4F46E5]">Computers</span>
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-2 rounded-xl text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Nav links */}
                <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                  {navLinks.map((link, i) => {
                    const active = pathname === link.href;
                    const Icon = link.icon;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                            active
                              ? 'bg-[#EEF2FF] dark:bg-[#4F46E5]/15 text-[#4F46E5] dark:text-[#A78BFA]'
                              : 'text-[#475569] dark:text-[#94A3B8] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
                          }`}
                        >
                          <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-[#4F46E5]' : 'text-[#94A3B8]'}`} />
                          {link.label}
                          {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Bottom actions */}
                <div className="px-4 pb-6 pt-4 border-t border-[#F1F5F9] dark:border-[#1E293B] space-y-3">
                  {/* Theme toggle row */}
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B]">
                    <span className="text-sm font-medium text-[#475569] dark:text-[#94A3B8]">
                      {dark ? 'Dark Mode' : 'Light Mode'}
                    </span>
                    <button
                      onClick={toggleTheme}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] shadow-sm transition-all"
                    >
                      {dark ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-[#4F46E5]" />}
                      {dark ? 'Light' : 'Dark'}
                    </button>
                  </div>

                  {/* CTA buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#1DB954] text-white text-sm font-bold rounded-xl transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                    <a
                      href="tel:07947130911"
                      className="flex items-center justify-center gap-2 py-3 text-white text-sm font-bold rounded-xl transition-all hover:brightness-110"
                      style={{ background: 'linear-gradient(135deg,#4F46E5,#7C3AED)' }}
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}