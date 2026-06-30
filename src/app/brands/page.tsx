import { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import BrandsPage from '@/components/pages/BrandsPage';

export const metadata: Metadata = {
  title: 'Laptop Brands - Lenovo, HP, Dell, ASUS, Apple & More',
  description: 'Shop from all major laptop brands at Gokul Computers, Trichy. Lenovo Authorized Dealer with best prices.',
};

export default function Brands() {
  return (
    <PageLayout>
      <BrandsPage />
    </PageLayout>
  );
}
