import { Suspense } from 'react';
import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import OrderSuccessClient from '@/components/checkout/OrderSuccessClient';

export const metadata: Metadata = { title: 'Order Placed Successfully' };

export default function OrderSuccessPage() {
  return (
    <PageLayout>
      <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center pt-20"><span className="text-[#64748B]">Loading…</span></div>}>
        <OrderSuccessClient />
      </Suspense>
    </PageLayout>
  );
}
