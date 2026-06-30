'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, ArrowUp, X, ChevronRight, Mail, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { getWhatsAppUrl, PHONE } from '@/lib/utils';

const QUICK_MESSAGES = [
  { icon: '💻', label: 'Laptop Recommendation', msg: 'Hi! I need help choosing the right laptop for my needs.' },
  { icon: '🔧', label: 'Repair Service',         msg: 'Hi! My laptop needs repair. Can you help?' },
  { icon: '🖱️', label: 'Accessories',            msg: 'Hi! I am looking for laptop accessories.' },
  { icon: '💳', label: 'EMI Details',            msg: 'Hi! I would like to know about EMI options.' },
];

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showSupport, setShowSupport]     = useState(false);
  const [visible, setVisible]             = useState(true);
  const [typing, setTyping]               = useState(false);
  const lastScrollY                       = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setShowScrollTop(y > 400);
      setVisible(y < 100 || y < lastScrollY.current);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showSupport) {
      setTyping(true);
      const t = setTimeout(() => setTyping(false), 1800);
      return () => clearTimeout(t);
    }
  }, [showSupport]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* AI Assistant — bottom left, premium glassmorphism */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed bottom-[72px] md:bottom-6 left-4 md:left-6 z-50"
          >
            <Link
              href="/assistant"
              className="relative group flex items-center justify-center"
              style={{ width: "clamp(44px,10vw,52px)", height: "clamp(44px,10vw,52px)" }}
              aria-label="AI Assistant"
            >
              {/* Gradient border glow */}
              <span
                className="absolute inset-0 rounded-2xl opacity-70 group-hover:opacity-100 transition-opacity"
                style={{
                  background: 'linear-gradient(135deg,#4F46E5,#7C3AED)',
                  padding: 1.5,
                  borderRadius: '0.875rem',
                }}
              />
              {/* Glass body */}
              <span
                className="relative z-10 flex items-center justify-center w-full h-full rounded-[13px] backdrop-blur-xl shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-indigo-500/30 group-hover:shadow-2xl"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  border: '1.5px solid rgba(79,70,229,0.35)',
                }}
              >
                <Sparkles className="w-5 h-5 text-[#4F46E5]" />
              </span>
              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0F172A] text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                AI Assistant
              </span>
              {/* Ambient glow */}
              <span className="absolute inset-0 rounded-2xl bg-[#4F46E5]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right side dock */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed bottom-[72px] md:bottom-6 right-4 md:right-6 z-50 flex flex-col items-end gap-2.5 md:gap-3"
          >
            {/* Scroll to top */}
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  onClick={scrollToTop}
                  className="w-10 h-10 md:w-11 md:h-11 bg-white/85 dark:bg-[#111827]/85 backdrop-blur-xl rounded-xl shadow-lg border border-white/60 dark:border-[#1E293B] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 text-[#4F46E5] dark:text-[#A78BFA]"
                  aria-label="Scroll to top"
                >
                  <ArrowUp className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* WhatsApp support widget */}
            <div className="relative flex flex-col items-end">
              {/* Support Panel */}
              <AnimatePresence>
                {showSupport && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 12 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                    className="absolute bottom-[68px] right-0 w-[min(320px,calc(100vw-2rem))] rounded-2xl overflow-hidden shadow-2xl mb-2"
                    style={{
                      background: 'rgba(255,255,255,0.96)',
                      backdropFilter: 'blur(24px)',
                      border: '1px solid rgba(255,255,255,0.7)',
                    }}
                  >
                    {/* Header */}
                    <div
                      style={{ background: 'linear-gradient(135deg,#128C7E,#25D366)' }}
                      className="p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        {/* Agent avatar */}
                        <div className="relative">
                          <div className="w-11 h-11 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-xl flex-shrink-0">
                            👨‍💼
                          </div>
                          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-300 border-2 border-green-700 rounded-full" />
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm leading-tight">Gokul Computers</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
                            <p className="text-green-100 text-[11px]">Online · Replies instantly</p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowSupport(false)}
                        className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Chat area */}
                    <div className="p-4" style={{ background: '#ECE5DD' }}>
                      {/* Greeting bubble */}
                      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-[#1a1a1a] shadow-sm mb-1 max-w-[85%]">
                        👋 Hi! How can I help you today?
                      </div>

                      {/* Typing indicator */}
                      <AnimatePresence>
                        {typing && (
                          <motion.div
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm mt-2 max-w-[60px] flex items-center gap-1"
                          >
                            {[0,1,2].map(i => (
                              <motion.span
                                key={i}
                                className="w-2 h-2 bg-[#94A3B8] rounded-full block"
                                animate={{ y: [0,-4,0] }}
                                transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
                              />
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Quick reply buttons */}
                    <div className="p-4 bg-white border-t border-[#F1F5F9]">
                      <p className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-3">Quick Replies</p>
                      <div className="space-y-2">
                        {QUICK_MESSAGES.map(q => (
                          <a
                            key={q.label}
                            href={getWhatsAppUrl(q.msg)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] hover:border-[#25D366] hover:bg-green-50 transition-all text-sm text-[#0F172A] font-medium group"
                          >
                            <span className="flex items-center gap-2.5">
                              <span className="text-base">{q.icon}</span>
                              {q.label}
                            </span>
                            <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#25D366] group-hover:translate-x-0.5 transition-all" />
                          </a>
                        ))}
                      </div>

                      <div className="flex flex-col gap-2 mt-3">
                        <a
                          href={getWhatsAppUrl('Hello Gokul Computers, I need help!')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm transition-all hover:brightness-110"
                          style={{ background: 'linear-gradient(135deg,#128C7E,#25D366)' }}
                        >
                          <MessageCircle className="w-4 h-4" />
                          Start WhatsApp Chat
                        </a>
                        <div className="flex gap-2">
                          <a
                            href={`tel:${PHONE}`}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white font-semibold text-xs transition-all hover:brightness-110"
                            style={{ background: 'linear-gradient(135deg,#4F46E5,#7C3AED)' }}
                          >
                            <Phone className="w-3.5 h-3.5" />
                            Call Store
                          </a>
                          <a
                            href="mailto:gokulcomputers@gmail.com"
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-semibold rounded-xl transition-colors text-xs"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            Email Us
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* WhatsApp FAB */}
              <button
                onClick={() => setShowSupport(prev => !prev)}
                className="relative w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300"
                style={{ background: 'linear-gradient(135deg,#128C7E,#25D366)' }}
                aria-label="WhatsApp Support"
              >
                <MessageCircle className="w-6 h-6 text-white" />
                <span className="absolute inset-0 rounded-2xl border-2 border-[#25D366] animate-ping opacity-25" />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center shadow-md">
                  <span className="text-[9px] text-white font-bold">1</span>
                </span>
              </button>
            </div>

            {/* Call FAB */}
            <motion.a
              href={`tel:${PHONE}`}
              className="relative w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group"
              style={{ background: 'linear-gradient(135deg,#4F46E5,#7C3AED)' }}
              aria-label="Call us"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5 md:w-6 md:h-6 text-white" />
              <span className="absolute inset-0 rounded-2xl border-2 border-indigo-400/60 animate-pulse" />
              <span className="absolute -top-10 right-0 bg-[#0F172A] text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                Call Now
              </span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}