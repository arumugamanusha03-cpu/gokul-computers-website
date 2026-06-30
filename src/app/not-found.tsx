import Link from 'next/link';
import { Laptop, ArrowLeft, Phone, MessageCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl mb-6">🔍</div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4F46E5]/10 text-[#4F46E5] rounded-full text-sm font-semibold mb-4">
          404 - Page Not Found
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-[#F8FAFC] mb-4">
          Oops! This page doesn&apos;t exist.
        </h1>
        <p className="text-gray-600 dark:text-[#94A3B8] mb-8">
          The page you&apos;re looking for seems to have gone missing. But don&apos;t worry — our laptops are all right here!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/" className="btn-primary flex items-center gap-2 justify-center">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <Link href="/products" className="btn-outline flex items-center gap-2 justify-center">
            <Laptop className="w-5 h-5" />
            Browse Products
          </Link>
        </div>
        <div className="flex items-center justify-center gap-4">
          <a href="tel:07947130911" className="flex items-center gap-2 text-sm text-[#4F46E5] font-semibold hover:underline">
            <Phone className="w-4 h-4" />
            07947130911
          </a>
          <a href="https://wa.me/917947130911" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-green-600 font-semibold hover:underline">
            <MessageCircle className="w-4 h-4" />
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}
