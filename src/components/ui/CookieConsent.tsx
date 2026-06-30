'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Check } from 'lucide-react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('gokul-cookie-consent');
    if (!consent) {
      setTimeout(() => setShow(true), 2500);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('gokul-cookie-consent', 'accepted');
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem('gokul-cookie-consent', 'declined');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-40"
        >
          <div className="glass rounded-2xl p-5 shadow-2xl border border-white/50">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-[#4F46E5]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Cookie className="w-5 h-5 text-[#4F46E5]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">We use cookies</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  We use cookies to improve your experience. By using our site, you agree to our privacy policy.
                </p>
              </div>
              <button onClick={decline} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-3">
              <button
                onClick={decline}
                className="flex-1 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="flex-1 flex items-center justify-center gap-1 py-2 bg-[#4F46E5] text-white text-xs font-semibold rounded-xl hover:bg-[#B91C1C] transition-colors"
              >
                <Check className="w-3 h-3" />
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
