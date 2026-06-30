import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import TrackOrderClient from '@/components/checkout/TrackOrderClient';

export const metadata: Metadata = { title: 'Track Your Order' };

export default function TrackOrderPage() {
  return (
    <PageLayout>
      <TrackOrderClient />
    </PageLayout>
  );
}
