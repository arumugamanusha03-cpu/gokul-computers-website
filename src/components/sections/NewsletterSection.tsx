'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubscribed(true);
        toast.success('Successfully subscribed to our newsletter!');
      } else {
        toast.error('Already subscribed or invalid email.');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white dark:bg-[#111827]" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="bg-gradient-to-br from-[#0A84FF] to-blue-700 rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 text-white text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/5 rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full" />
          </div>
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-3">Stay Updated!</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Get the latest laptop deals, tech news, and exclusive offers from Gokul Computers directly in your inbox.
            </p>
            {subscribed ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center gap-3 bg-white/20 rounded-2xl px-6 py-4 max-w-md mx-auto"
              >
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold">Thank you! You&apos;re subscribed.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/30 transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors disabled:opacity-70"
                >
                  {loading ? 'Subscribing...' : (
                    <>Subscribe <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            )}
            <p className="text-blue-200 text-xs mt-4">No spam ever. Unsubscribe anytime.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
