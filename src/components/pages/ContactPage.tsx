'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Mail, MessageCircle, Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { getWhatsAppUrl } from '@/lib/utils';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
        toast.success('Message sent! We will get back to you soon.');
        setForm({ name: '', phone: '', email: '', message: '' });
      } else {
        toast.error('Failed to send. Please try again.');
      }
    } catch {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-[#F8FAFC] dark:bg-[#020617]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in <span className="text-[#4F46E5]">Touch</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Visit us at our store or reach out via call, WhatsApp, or email. We&apos;re here to help!
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F8FAFC] mb-6">Contact Information</h2>

              <div className="space-y-4">
                <div className="glass-card flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#4F46E5]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#4F46E5]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-[#F8FAFC] mb-1">Our Address</h3>
                    <p className="text-gray-600 dark:text-[#94A3B8] text-sm leading-relaxed">
                      No B-7, Vignesh Plaza,<br />
                      Near Domino&apos;s Pizza, 1st Cross,<br />
                      Thillai Nagar, Trichy - 620018<br />
                      Tamil Nadu, India
                    </p>
                  </div>
                </div>

                <div className="glass-card flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#4F46E5]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#4F46E5]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-[#F8FAFC] mb-1">Phone Number</h3>
                    <a href="tel:07947130911" className="text-[#4F46E5] font-semibold text-lg hover:underline">
                      07947130911
                    </a>
                  </div>
                </div>

                <div className="glass-card flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-[#F8FAFC] mb-1">WhatsApp</h3>
                    <a
                      href={getWhatsAppUrl("Hello Gokul Computers,\nI would like to enquire about your products/services.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 font-semibold hover:underline"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>

                <div className="glass-card flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#0A84FF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#0A84FF]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-[#F8FAFC] mb-1">Business Hours</h3>
                    <p className="text-gray-600 dark:text-[#94A3B8] text-sm">
                      Monday – Sunday<br />
                      <span className="font-semibold text-gray-900 dark:text-[#F8FAFC]">9:30 AM – 8:00 PM</span><br />
                      <span className="text-green-600 text-xs">Open All Days</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Google Maps Embed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl overflow-hidden shadow-lg h-64"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.0!2d78.7047!3d10.7905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ3JzI1LjgiTiA3OMKwNDInMTYuOSJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Gokul Computers Location"
              />
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="glass-card">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F8FAFC] mb-6">Send Us a Message</h2>
              {sent ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-[#F8FAFC] mb-2">Message Sent!</h3>
                  <p className="text-gray-500">We&apos;ll get back to you within 24 hours.</p>
                  <button onClick={() => setSent(false)} className="mt-4 btn-primary">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-[#CBD5E1] mb-1">Full Name *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-[#CBD5E1] mb-1">Phone Number *</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Your phone number" required className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-[#CBD5E1] mb-1">Email Address</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-[#CBD5E1] mb-1">Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="How can we help you?" rows={5} required className="input-field resize-none" />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base">
                    {loading ? 'Sending...' : (
                      <><Send className="w-5 h-5" /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
