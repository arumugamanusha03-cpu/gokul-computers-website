import { Metadata } from 'next';
import { Suspense } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import ProductsClient from '@/components/products/ProductsClient';

export const metadata: Metadata = {
  title: 'Products - Laptops, Accessories & More',
  description: 'Browse our wide range of laptops, accessories, and parts from Lenovo, HP, Dell, Acer, ASUS, Apple and more at Gokul Computers, Trichy.',
};

export default function ProductsPage() {
  return (
    <PageLayout>
      <div className="pt-20 min-h-screen bg-[#F8FAFC] dark:bg-[#020617]">
        <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="w-8 h-8 border-2 border-[#4F46E5] border-t-transparent rounded-full animate-spin" /></div>}>
          <ProductsClient />
        </Suspense>
      </div>
    </PageLayout>
  );
}
