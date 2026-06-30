import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import CartClient from '@/components/cart/CartClient';

export const metadata: Metadata = { title: 'My Cart' };

export default function CartPage() {
  return (
    <PageLayout>
      <CartClient />
    </PageLayout>
  );
}
