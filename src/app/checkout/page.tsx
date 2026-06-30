import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import CheckoutClient from '@/components/checkout/CheckoutClient';

export const metadata: Metadata = { title: 'Checkout' };

export default function CheckoutPage() {
  return (
    <PageLayout>
      <CheckoutClient />
    </PageLayout>
  );
}
